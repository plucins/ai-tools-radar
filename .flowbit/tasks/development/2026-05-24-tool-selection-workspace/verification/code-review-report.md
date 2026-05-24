# Code Review Report

**Date**: 2025-05-24  
**Path**: EPIC 3 — Tool Selection Workspace  
**Scope**: quality · security · performance  
**Status**: ⚠️ Issues Found

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| Warning  | 4 |
| Info     | 5 |

**Files analysed**: 13  
**Test files**: 2 (tools.service.spec.ts, comparison.service.spec.ts)

No critical issues found. The implementation is sound overall — the four warnings are real bugs or
non-trivial risks; the five info items are clean-up opportunities that won't affect production
behaviour today but will grow into maintenance debt.

---

## Warnings

### W1 — Timer leak on successful comparison navigation
**File**: `src/frontend/src/routes/ToolsPage.tsx:66-80`  
**Category**: Bug / Resource leak

`t1` and `t2` are only cleared in the `catch` block. On the success path the component navigates
away via `navigate('/compare', …)` **without** cancelling the pending timers.

```ts
const t1 = setTimeout(() => setStage('comparing'), 400)   // not cleared on success
const t2 = setTimeout(() => setStage('generating'), 1200)  // not cleared on success

try {
  const result = await api.comparison.compare(…)
  navigate('/compare', { state: { result } })  // component unmounts here
  setComparing(false)   // ← setState on unmounted component
  setStage(null)        // ← setState on unmounted component
} catch …
```

If the API responds in < 400 ms, both timers fire after unmount. React 18 silences the warning
but the callbacks still run, wasting cycles and leaving dangling closures.

**Fix**: Call `clearTimeout(t1); clearTimeout(t2)` before `navigate()`, or move the timer
management into a `useRef`-backed cleanup in a `useEffect`.

---

### W2 — TypeScript compilation error in `skeleton.tsx`
**File**: `src/frontend/src/components/ui/skeleton.tsx:3`  
**Category**: Bug / Type safety

`React.HTMLAttributes<HTMLDivElement>` is used in the function signature but `React` is never
imported:

```ts
// skeleton.tsx — no React import
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { … }
```

The project `tsconfig.app.json` sets `"types": ["vite/client"]`, which does **not** inject a
global `React` namespace. `@types/react` 19.x removed the legacy global `React` declaration.
TypeScript will emit `Cannot find name 'React'` unless the build currently relies on
`skipLibCheck: true` silencing the diagnostics — but `skipLibCheck` only skips `.d.ts` files,
not source files.

**Fix**:
```ts
import type { HTMLAttributes } from 'react'
function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) { … }
```

---

### W3 — `profilePath` exposes server-relative filesystem paths in public API
**File**: `src/backend/src/tools/tools.service.ts:95`  
**Category**: Security / Information disclosure

Every `GET /tools` response includes a `profilePath` field computed as:

```ts
const repoRoot = path.join(__dirname, '..', '..', '..', '..')
const profilePath = path.relative(repoRoot, fullFilePath)
// e.g. "tools/claude-code/claude-code.md"
```

In a Docker/production deployment `__dirname` points into the compiled dist tree, so `repoRoot`
resolves to the container's working directory. If `TOOLS_ROOT` is mounted outside that tree,
`path.relative` produces traversal segments (`../../...`) that leak the container's internal
directory layout. Even in the normal case the field reveals the exact directory structure of the
server.

`profilePath` is not consumed by any current frontend code (the `Tool` type marks it
`profilePath?: string` and no component renders it). If it is intended for future deep-link use,
restrict it to backend-only or strip it from the serialised response.

**Fix**: Add `@Exclude()` (class-transformer) or remove the field from the `Tool` interface that
is returned by the API, or validate that `fullFilePath` is always inside `repoRoot` before
computing the relative path.

---

### W4 — No request timeout / AbortController in `api.ts`
**File**: `src/frontend/src/lib/api.ts:10-23`  
**Category**: Performance / Reliability

All `fetch` calls have no timeout or `AbortSignal`. A slow or stalled backend will hang the
browser request indefinitely, leaving the UI in a permanent loading state with no recovery path.

```ts
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,   // no signal, no timeout
  })
```

This is particularly impactful for `handleCompare` because the in-progress UI has no timeout
escape hatch.

**Fix**:
```ts
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 15_000) // 15 s
const response = await fetch(url, { signal: controller.signal, ...options })
clearTimeout(timeoutId)
```

---

## Informational

### I1 — `this.mode` assigned but never read
**File**: `src/backend/src/comparison/comparison.service.ts:14,20`  
**Category**: Quality / Dead code

```ts
private readonly mode: string

constructor(…) {
  this.mode = this.configService.get<string>('ollama.mode') ?? 'mock'
}
```

`this.mode` is never referenced after assignment. `noUnusedLocals` in the backend tsconfig
should catch this. The field is presumably a placeholder for the real LLM path; add a comment
or a `TODO` noting its intended use so it isn't accidentally pruned.

---

### I2 — `tools` prop accepted but discarded in `ToolSlotGrid`
**File**: `src/frontend/src/components/tools/ToolSlotGrid.tsx:7,36`  
**Category**: Quality / Dead interface field

```ts
interface ToolSlotGridProps {
  tools: Tool[]   // ← declared …
  …
}
export function ToolSlotGrid({
  tools: _tools,  // ← … but immediately aliased to _tools and never used
  …
})
```

`ToolsPage` passes the full catalogue just to satisfy this prop. Either remove the prop from
the interface (callers pass `selectedTools`, which is sufficient) or document why it is needed
for future use.

---

### I3 — Stale error banner persists when `handleCompare` is retried
**File**: `src/frontend/src/routes/ToolsPage.tsx:61-81`  
**Category**: Quality / UX

`handleCompare` never calls `setError(null)` before attempting a comparison. If the initial
tool-load or a previous comparison left an error in state, the red alert banner remains visible
throughout the next comparison attempt — even when it eventually succeeds — until the user
navigates away.

**Fix**: Add `setError(null)` at the top of `handleCompare`.

---

### I4 — `tags` array element types not validated (unsafe cast)
**File**: `src/backend/src/tools/tools.service.ts:102-104`  
**Category**: Quality / Type safety

```ts
tags: Array.isArray(parsed['tags'])
  ? (parsed['tags'] as string[])  // ← trusts YAML author
  : [],
```

The cast does not verify that array elements are strings. A YAML file with
`tags: [1, true, null]` produces a `Tag[]` with non-string elements. Downstream, the frontend
calls `tag.toLowerCase()` in the search filter — a runtime TypeError if any element is not a
string.

**Fix**:
```ts
tags: Array.isArray(parsed['tags'])
  ? (parsed['tags'] as unknown[]).filter((t): t is string => typeof t === 'string')
  : [],
```

---

### I5 — Redundant `onClose()` call in `AddToolModal.handleConfirm`
**File**: `src/frontend/src/components/tools/AddToolModal.tsx:79-82`  
**Category**: Quality / Logic clarity

```ts
function handleConfirm(): void {
  onAddTools([...pendingIds])  // ← ToolsPage.addTools() already calls setIsModalOpen(false)
  onClose()                    // ← closes again; harmless but misleading
}
```

`ToolsPage.addTools` already calls `setIsModalOpen(false)`, so the subsequent `onClose()` call
is a no-op. It is harmless but implies that `AddToolModal` must close itself, which breaks the
single-responsibility contract. Remove the `onClose()` call from `handleConfirm` and let the
parent own the close lifecycle, or remove `setIsModalOpen(false)` from `addTools` and rely
solely on `onClose` — pick one pattern and be consistent.

---

## Metrics

| Metric | Value |
|--------|-------|
| Max backend function length | 77 lines (`loadTools`) |
| Max frontend component length | 153 lines (`ToolsPage`) |
| Max nesting depth | 4 levels (`loadTools` inner loop) |
| Hardcoded secrets | 0 |
| Injection risks | 0 |
| N+1 query risks | 0 (in-memory; no DB) |
| Missing input validation | 0 (ValidationPipe + DTO covers backend) |

---

## Prioritised Recommendations

1. **(W2)** Fix the missing React import in `skeleton.tsx` — this is a compile error that may
   be masked by the current toolchain config but will surface under stricter build settings.
2. **(W1)** Cancel pending timers before navigating in `handleCompare` to eliminate the unmount
   state-update sequence and the dangling closures.
3. **(W4)** Add an AbortController with a reasonable timeout to `api.ts` to prevent indefinite
   loading states.
4. **(W3)** Remove or restrict `profilePath` from the public `Tool` API response.
5. **(I4)** Add per-element type validation on the `tags` array to prevent runtime TypeErrors in
   the frontend search filter.
6. **(I1, I5, I2)** Clean up dead code (`mode` field, duplicate close call, unused `tools` prop)
   before the LLM integration phase adds more state, to keep the service layer coherent.
