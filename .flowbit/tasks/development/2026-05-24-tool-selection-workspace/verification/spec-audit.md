# Specification Audit: EPIC 3 — Tool Selection Workspace

**Date**: 2026-05-24  
**Auditor**: spec-auditor agent  
**Spec file**: `implementation/spec.md`  
**Supporting files**: `implementation/requirements.md`, `analysis/gap-analysis.md`, `analysis/codebase-analysis.md`, `analysis/ui-mockups.md`, `analysis/scope-clarifications.md`, `analysis/clarifications.md`  
**Audit type**: Pre-implementation  
**Compliance status**: ⚠️ **Mostly Compliant** — 1 Critical bug, 3 High gaps, 4 Medium gaps, 3 Low gaps  

---

## Executive Summary

The specification is thorough and well-structured overall. The component APIs, acceptance criteria, state machines, and visual design sections are clear enough to implement from. However, one **Critical** error in the backend file-path claim will cause a runtime failure on first boot, and three **High-severity** inconsistencies between documents will produce ambiguous or conflicting implementations if not resolved before coding starts.

---

## Findings

---

### 🔴 CRITICAL — C1: `tools/` directory path is wrong; backend will silently serve empty catalog

**Category**: Incorrect  
**Severity**: Critical — backend startup produces no errors but serves 0 tools; acceptance criterion #2 fails  

**Spec Reference** (`spec.md` line 438–439):
```
Root: `path.join(process.cwd(), 'data', 'tools')` — `process.cwd()` is the backend working
directory (`src/backend/`)
```

**Evidence**:

1. Confirmed with live shell from `src/backend/`:
   ```
   cwd: /Users/plucins/Projects/ai-tools-radar/src/backend
   path.join(cwd, 'data', 'tools') → /Users/plucins/Projects/ai-tools-radar/src/backend/data/tools
   fs.existsSync(...) → false
   ```
2. The `tools/` directory is at the **repository root** under `data/`: `/Users/plucins/Projects/ai-tools-radar/data/tools/cli/`  
   (verified: `data/tools/cli/claude-code.md`, `github-copilot-cli.md`, `opencode.md` — all present)
3. The correct relative path from `src/backend/` to `data/tools/` is `../../data/tools` (verified via `path.relative`).

**Gap**: The spec's `process.cwd()` claim is wrong. Running `path.join(process.cwd(), 'tools')` from `src/backend/` resolves to a non-existent directory. The `ToolsService` will either throw `ENOENT` (if `readdirSync` is not guarded) or silently iterate an empty array depending on how the error handling is written — in either case, `GET /tools` returns `[]`.

**Recommended fix**: Change spec to:
```typescript
// Correct: navigate 2 levels up from src/backend/ to reach repo root
const toolsRoot = path.join(process.cwd(), '..', '..', 'data', 'tools')
```
Or equivalently: document that `process.cwd()` is **not** reliable across environments and recommend `__dirname`-based resolution (e.g. `path.join(__dirname, '..', '..', '..', '..', 'data', 'tools')`).  

The spec must also update the `profilePath` description (line 443) — if `process.cwd()` is `src/backend/`, "relative path from repo root" cannot be generated with `path.relative(process.cwd(), ...)`.

---

### 🟠 HIGH — H1: Multi-select vs single-select modal inconsistency across documents

**Category**: Ambiguous / Incorrect  
**Severity**: High — implementors reading different documents will build conflicting UIs  

**Spec Reference** (`spec.md` lines 243–262):
```typescript
// Internal state in AddToolModal:
pendingIds: Set<string>   // tools staged for add; reset to empty Set on modal open

// Max 5 enforcement:
disabled when selectedIds.size + pendingIds.size >= 5 && !pendingIds.has(t.id)

// Footer: "Add Selected (N)" button — disabled={pendingIds.size === 0}, N = pendingIds.size
// Confirm: calls onAddTools([...pendingIds])
```

**Contradicting evidence** (`analysis/ui-mockups.md` Mockup 6 state annotation, line ~416):
```
pendingId: string|null → tool staged for add (single-select per modal open)
```

**Further contradiction** (`analysis/ui-mockups.md` Mockup 7 interaction flow, lines ~448–454):
```
1. User clicks unselected ToolCard → pendingId = tool.id
...
Note: Only 1 tool can be staged per modal open (single add flow).
      Re-opening modal allows adding another tool into the next empty slot.
```

**Supporting multi-select** (`implementation/requirements.md` Phase 5 Clarifications):
```
Modal selection: Multi-select — pick multiple tools, confirm with "Add Selected (N)" button
```

**Analysis**: Three sources say multi-select (`spec.md`, `requirements.md`, `scope-clarifications.md`). One source says single-select (`ui-mockups.md`). The mockups appear to be drafted earlier and not updated after the Phase 5 decision confirmed multi-select. The spec is almost certainly correct. However, implementors may follow the mockups (which are more visual and operational), causing them to build a single-select flow that passes the wrong interface to `onAddTools`.

**Recommended fix**: Update `analysis/ui-mockups.md` Mockup 6 state annotation and Mockup 7 to use `pendingIds: Set<string>` and show multiple cards selected simultaneously. The implementation should follow `spec.md`.

---

### 🟠 HIGH — H2: `ComparisonModule` must import `ToolsModule` — not specified in spec

**Category**: Missing  
**Severity**: High — NestJS DI will throw `Nest can't resolve dependencies of ComparisonService` at startup  

**Spec Reference** (`spec.md` line 468):
```
ComparisonService must inject ToolsService to resolve tool names for the mock summary.
```

**Evidence** (`src/backend/src/comparison/comparison.module.ts`):
```typescript
@Module({
  controllers: [ComparisonController],
  providers: [ComparisonService],
  // ← NO imports array; ToolsModule not imported
})
export class ComparisonModule {}
```

**Evidence** (`src/backend/src/tools/tools.module.ts`):
```typescript
@Module({
  controllers: [ToolsController],
  providers: [ToolsService],
  exports: [ToolsService],  // ← ToolsService IS exported
})
export class ToolsModule {}
```

**Gap**: `ToolsModule` already exports `ToolsService`, but `ComparisonModule` must add `ToolsModule` to its `imports` array for NestJS DI to satisfy the `ToolsService` injection into `ComparisonService`. The spec mentions injecting `ToolsService` in the service-level description but never states that `comparison.module.ts` itself must be updated. This file is not listed in the "Modified Files" table (`spec.md` lines 175–186).

**Recommended fix**: Add to the "Modified Files" table:
```
| `src/backend/src/comparison/comparison.module.ts` | Add `imports: [ToolsModule]` to wire ToolsService injection |
```

---

### 🟠 HIGH — H3: Already-selected tools should be disabled in modal, but spec hides them entirely

**Category**: Incorrect (conflict between requirements and spec)  
**Severity**: High — wrong UX behaviour; acceptance criteria interpretation differs  

**Requirements Reference** (`requirements.md` line 55, functional requirement #15):
```
Modal: blocks already-selected tools (disabled/checked state)
```

**Spec Reference** (`spec.md` lines 249–256, AddToolModal filtering logic):
```typescript
filteredTools = tools.filter(t =>
  !selectedIds.has(t.id)                          // exclude already-selected ← HIDES them
  && (activeCategory === 'All' || t.category === activeCategory)
  && (query === '' || ...)
)
```

**Gap**: The requirements say already-selected tools should appear in the modal as **disabled/checked** (i.e., visible but non-interactive). The spec's filtering logic removes them from `filteredTools` entirely — they are **invisible** in the modal grid. These are distinct UX behaviours:

- "Disabled/checked state": user can see what they've already added (confirmation + discovery)
- "Hidden": user has no visual signal that a tool is already selected

The spec is internally consistent (disabled state is only for the `selectedIds.size + pendingIds.size >= 5` case), but it contradicts the requirements. Implementors will follow the spec's code example and hide already-selected tools.

**Recommended fix**: Clarify the intended behaviour. If hiding is correct, update requirements.md line 55 to say "hides already-selected tools from modal". If showing as disabled is correct, update the `filteredTools` logic to keep `selectedIds` tools but pass `disabled=true` to their `ToolCard`.

---

### 🟡 MEDIUM — M1: `ConfigService` injection missing from `ComparisonService` specification

**Category**: Incomplete  
**Severity**: Medium — violates backend standards; `process.env` would be used as a workaround  

**Spec Reference** (`spec.md` lines 452–466, ComparisonService fix):
```typescript
// Mock summary format (LLM_MODE=mock):
// "Mock comparison of Tool1 vs Tool2..."
// Tool names resolved by calling this.toolsService.findOne(id).name
```

**Standards Reference** (`spec.md` line 639):
```
backend-standards.md: ConfigService only (no process.env)
```

**Evidence** — Established pattern in `LlmService` (`src/backend/src/llm/llm.service.ts` lines 17–20):
```typescript
constructor(private readonly configService: ConfigService) {
  this.mode = this.configService.get<string>('ollama.mode') ?? 'mock';
```

**Gap**: The spec says mock mode returns an interpolated summary when `LLM_MODE=mock`, but does not specify how `ComparisonService` detects the mode. It cannot use `process.env.LLM_MODE` (violates standards). It must inject `ConfigService` and call `this.configService.get<string>('ollama.mode')`. The spec's constructor pseudocode only shows `ToolsService` injection.

The current `ComparisonService` is also synchronous (`compare()` returns `ComparisonResult`, not `Promise<ComparisonResult>`), but injecting `LlmService` for non-mock mode would make it async. This transition is not addressed in the spec.

**Recommended fix**: Update `ComparisonService` spec to show:
```typescript
constructor(
  private readonly toolsService: ToolsService,
  private readonly configService: ConfigService,  // ← add
) {
  this.mode = this.configService.get<string>('ollama.mode') ?? 'mock';
}
```
Clarify whether `compare()` becomes `async` at this stage or stays synchronous (mock-only).

---

### 🟡 MEDIUM — M2: `ToolList` interface update for modal browser mode is not specified

**Category**: Incomplete  
**Severity**: Medium — `ToolList` is used in `AddToolModal` with different props; current interface is incompatible  

**Spec Reference** (`spec.md` line 92, Component Tree):
```
├── ToolList (mode="browser") — filtered tool grid
│     └── ToolCard  mode="browser"  → onClick: toggles pendingIds
```

**Current `ToolList` interface** (`src/frontend/src/components/tools/ToolList.tsx` lines 5–9):
```typescript
interface ToolListProps {
  tools: Tool[]
  selectedIds: Set<string>    // ← used to derive selected state
  onToggle: (id: string) => void  // ← called to toggle selectedIds
}
```

**Gap**: For the modal, `ToolList` must:
1. Pass `mode="browser"` to each `ToolCard` child
2. Pass `pendingIds` (not `selectedIds`) to determine which cards show the selection ring
3. Pass a toggle callback that modifies `pendingIds`, not `selectedIds`
4. Pass `disabled=true` to cards that hit the 5-slot limit

The spec never defines the updated `ToolListProps` interface. The modified-files table (`spec.md` line 182) says "Wrap card rendering in `AnimatePresence` + stagger" only — omitting the interface change needed for modal browser mode. Implementors must infer this from the component tree diagram, which is insufficient.

**Recommended fix**: Add a "Updated `ToolList` Props" section to the Component API section, defining:
```typescript
interface ToolListProps {
  tools: Tool[]
  mode?: 'browser'                 // new — drives ToolCard mode
  selectedIds?: Set<string>        // for legacy slot-page usage (unused after redesign)
  pendingIds?: Set<string>         // new — for modal browser-mode selection rings
  disabledIds?: Set<string>        // new — for max-5 enforcement in modal
  onToggle?: (id: string) => void
}
```
Or state explicitly that `ToolList` is **only** used in the modal after redesign, and its interface is fully replaced.

---

### 🟡 MEDIUM — M3: Progress bar final stage — `w-full` (spec) vs `90%` (mockups) inconsistency

**Category**: Ambiguous  
**Severity**: Medium — visual implementation will differ from mockup  

**Spec Reference** (`spec.md` line 328):
```
Progress bar widths: 'gathering' → w-1/3, 'comparing' → w-2/3, 'generating' → w-full.
```

**Mockup Reference** (`analysis/ui-mockups.md` Mockup 9 Stage State Machine, line ~566):
```
'generating' → stage 3 active    (progress 90%)
```

**Gap**: The spec says `'generating'` reaches `w-full` (100%), but the mockups show `90%`. These produce different visual results. The mockup's 90% suggests the bar intentionally doesn't reach 100% until after success (to avoid the anti-pattern of the bar "completing" before the API responds). The spec's `w-full` does not communicate this design intention.

**Recommended fix**: Clarify which is authoritative. If `90%` is intentional (defer to 100% on navigation), update spec line 328 and add a note explaining the rationale.

---

### 🟡 MEDIUM — M4: `addTool(id)` in state management conflicts with `onAddTools(ids[])` in modal API

**Category**: Incorrect  
**Severity**: Medium — will produce a type mismatch or require silent adapter at the call site  

**Spec Reference** (`spec.md` line 360, State Management):
```
addTool(id: string): guard selectedIds.size < 5; add to selectedIds; close modal.
```

**Conflicting spec reference** (`spec.md` line 259–260, AddToolModal Component API):
```
Footer: "Add Selected (N)" button — N = pendingIds.size.
Confirm: calls onAddTools([...pendingIds]), then onClose().
```

**Gap**: `AddToolModal` calls `onAddTools` with an **array** of IDs (multi-select). But `ToolsPage` state management defines `addTool` as a function taking a **single** `id: string`. The mismatch means either:
- `onAddTools` must be wired to a loop (`ids.forEach(id => addTool(id))`)
- Or `addTool` must be renamed `addTools(ids: string[])` and loop internally

The spec does not resolve this. A multi-slot add with `addTool(id)` also risks bypassing the max-5 guard on each iteration (the guard `selectedIds.size < 5` is evaluated before the set update, so adding 3 tools rapidly to a set of 3 might fail silently after the 5th).

**Recommended fix**: Update `spec.md` State Management to replace `addTool(id: string)` with:
```typescript
addTools(ids: string[]): // guard selectedIds.size + ids.length <= 5;
                         // add all ids to selectedIds; close modal
```

---

### 🟢 LOW — L1: Retry behaviour on `GET /tools` error is ambiguous

**Category**: Ambiguous  
**Severity**: Low — minor UX ambiguity  

**Spec Reference** (`spec.md` line 510, Error Handling table):
```
GET /tools network/server error → Alert variant="destructive" with retry hint; loading=false
```

**Gap**: "retry hint" is ambiguous. Does it mean:
- A prose suggestion ("try refreshing the page") inside the Alert description?
- A `<Button>` element inside the Alert that re-triggers `GET /tools`?

The acceptance criteria (`spec.md` line 616) says: "API and comparison errors display `Alert variant='destructive'` with message" — no mention of retry. The current `ToolsPage.tsx` has no retry button (lines 67–73).

**Recommended fix**: Change "retry hint" to either "with error message and a 'Retry' button that re-fetches tools" (if actionable retry is wanted) or "with error message only" (if prose is sufficient).

---

### 🟢 LOW — L2: Slot order derived from `tools` array, not `selectedIds` insertion order

**Category**: Ambiguous  
**Severity**: Low — small UX surprise; not a blocking issue  

**Spec Reference** (`spec.md` lines 363–364):
```typescript
selectedTools: Tool[] = tools.filter(t => selectedIds.has(t.id))
// Note: order preserved via array derived from tools list filtered by selectedIds
//       in insertion order (ES6 guaranteed).
```

**Gap**: The comment claims ES6 `Set` insertion order is preserved, but `tools.filter(...)` iterates the **`tools` array**, not the `Set`. Slots are filled in the order tools appear in the API response, regardless of when the user selected them. If the API returns `[cursor, copilot, claude-code]` and the user picks claude-code first, then cursor, then copilot — their slot order will be cursor(1), copilot(2), claude-code(3) rather than the selection order claude-code(1), cursor(2), copilot(3).

This may or may not be intentional. If users expect the first slot to reflect the first tool they added, the spec's derivation is incorrect.

**Recommended fix**: Confirm intended slot ordering. If insertion order matters, use `[...selectedIds].map(id => tools.find(t => t.id === id)!)` instead of `tools.filter(...)`. If API order is acceptable, remove the misleading "insertion order" comment.

---

### 🟢 LOW — L3: `LoadingState` vs slot-level `Skeleton` during initial fetch is underspecified

**Category**: Ambiguous  
**Severity**: Low — small UX inconsistency risk  

**Spec Reference** (`spec.md` line 219):
```
Slot i empty + loading → Skeleton shimmer
```

**Spec Reference** (`spec.md` line 516, Error Handling table):
```
Empty catalog (all files fail) → tools.length === 0 after load → EmptyState in page body
```

**Reusable Components reference** (`spec.md` line 378):
```
LoadingState | Reused as-is for initial page load fallback
```

**Current implementation** (`src/frontend/src/routes/ToolsPage.tsx` lines 54–56):
```typescript
if (loading) {
  return <LoadingState message="Loading tools..." />
}
```

**Gap**: The spec mentions both `LoadingState` (page-level) and `Skeleton` (slot-level) for loading states, but doesn't define when each is shown in the redesigned page. The current page returns `<LoadingState>` for the entire component when `loading=true`, meaning the slot grid never renders during load, so slot-level Skeletons are never shown. The spec must clarify:

1. Should `LoadingState` be removed from the redesigned page (in favour of showing the slot grid with Skeletons immediately)?  
2. Or should `LoadingState` cover the entire page on first load, then Skeletons only on subsequent re-fetches?

---

## Clarification Questions

The following questions require stakeholder decisions before implementation begins:

**Q1** [from H3]: Should already-selected tools be **hidden** from the Add Tool modal grid, or **shown as disabled/checked**?  
→ requirements.md says "disabled/checked state"; spec.md filtering logic says "hidden". Pick one.

**Q2** [from M3]: Should the progress bar reach `100%` (`w-full`) on the `'generating'` stage, or stop at `90%` to avoid premature completion?  
→ spec.md says `w-full`; mockups say `90%`. 

**Q3** [from L2]: Should slot positions reflect the **order tools appear in the API response**, or the **order the user selected them**?  
→ The current spec uses API-response order (misleading comment implies insertion order).

**Q4** [from L3]: Should the redesigned `ToolsPage` show `LoadingState` (full-page loading) while `GET /tools` is in-flight, or immediately render the slot grid with `Skeleton` placeholders in each slot?

---

## Summary of All Findings

| ID | Severity | Category | Title |
|---|---|---|---|
| C1 | 🔴 Critical | Incorrect | `tools/` path resolves to `src/backend/tools/` (doesn't exist) |
| H1 | 🟠 High | Ambiguous | Multi-select (`pendingIds: Set`) vs single-select (`pendingId: string\|null`) conflict between spec and mockups |
| H2 | 🟠 High | Missing | `ComparisonModule` must import `ToolsModule` — not in modified files list |
| H3 | 🟠 High | Incorrect | Already-selected tools: requirements says disabled/visible; spec hides them |
| M1 | 🟡 Medium | Incomplete | `ConfigService` not specified for `LLM_MODE` access in `ComparisonService` |
| M2 | 🟡 Medium | Incomplete | `ToolList` interface update for modal browser mode not defined |
| M3 | 🟡 Medium | Ambiguous | Progress bar final stage: `w-full` (spec) vs `90%` (mockups) |
| M4 | 🟡 Medium | Incorrect | `addTool(id: string)` (state mgmt) vs `onAddTools(ids: string[])` (modal API) |
| L1 | 🟢 Low | Ambiguous | "Retry hint" wording — prose or actionable button? |
| L2 | 🟢 Low | Ambiguous | Slot order: API array order ≠ claimed `Set` insertion order |
| L3 | 🟢 Low | Ambiguous | `LoadingState` vs slot `Skeleton` during initial fetch not distinguished |

---

## Recommendations

### Before implementation starts (blocking)

1. **Fix C1**: Update spec line 438 to `path.join(process.cwd(), '..', '..', 'data', 'tools')` and re-derive `profilePath` consistently. Verify the path works in both `nest start` (from `src/backend/`) and `nest start:prod` (from `dist/`).

2. **Resolve H1**: Update `analysis/ui-mockups.md` Mockup 6 state and Mockup 7 to reflect `pendingIds: Set<string>` (multi-select). Delete the "Only 1 tool can be staged" note.

3. **Add H2 to modified files**: Add `src/backend/src/comparison/comparison.module.ts` to the Modified Files table with change description "Add `imports: [ToolsModule]`".

4. **Decide H3**: Align requirements.md and spec.md on whether already-selected tools are hidden or disabled in the modal.

### Before component implementation starts

5. **Fix M4**: Replace `addTool(id: string)` in the State Management section with `addTools(ids: string[])` to match the multi-select modal API.

6. **Specify M2**: Add an updated `ToolListProps` interface to the Component API section covering `mode`, `pendingIds`, and `disabledIds` props.

7. **Fix M1**: Add `ConfigService` injection to the `ComparisonService` spec and clarify whether `compare()` becomes `async`.

### Nice-to-have (can be done in-sprint)

8. **Clarify M3**: Pick progress bar final-stage percentage and document the rationale.
9. **Clarify L1**: Replace "retry hint" with explicit button vs prose distinction.
10. **Clarify L2**: Correct the misleading "ES6 Set insertion order" comment or switch to explicit insertion-order derivation.
11. **Clarify L3**: State explicitly whether redesigned `ToolsPage` uses `LoadingState` or slot `Skeleton` during initial fetch.

---

## What Is Clear and Well-Specified

The following areas are complete and implementation-ready:

- ✅ All three blocker bugs correctly identified (B1/B2/B3) with precise fix descriptions
- ✅ `ToolCard` props interface (`mode`, `selected`, `onRemove`, `onToggle`, `disabled`) fully defined  
- ✅ `ComparisonPanel` 3-state UI with Tailwind class names fully specified  
- ✅ `ToolSlotGrid` props interface and 5-slot rendering logic fully defined  
- ✅ `ComparisonStage` type and stage state machine (null → gathering → comparing → generating) complete  
- ✅ Framer Motion animation specifications (initial/animate/exit values, stagger pattern)  
- ✅ Backend `Tool` interface extension (`category`, `tags`, `profilePath`)  
- ✅ YAML frontmatter format confirmed against actual `data/tools/cli/*.md` files (block scalar `>` correctly handled by `js-yaml`)  
- ✅ Acceptance criteria are specific, testable, and cover all functional paths  
- ✅ Test requirements for `tools.service.spec.ts` are detailed and behaviour-focused  
- ✅ All new dependencies identified (`js-yaml`, `@types/js-yaml`, shadcn `dialog`/`input`/`skeleton`)  
- ✅ Standards compliance table is clear and actionable  
- ✅ Implementation order (critical path) is correct and safe
