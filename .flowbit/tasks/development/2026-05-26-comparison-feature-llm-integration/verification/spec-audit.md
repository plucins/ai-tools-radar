# Specification Audit — Comparison Feature Full E2E Implementation

**Spec path**: `.flowbit/tasks/development/2026-05-26-comparison-feature-llm-integration/implementation/spec.md`  
**Audit date**: 2026-05-26  
**Auditor**: spec-auditor (independent verification)  
**Compliance status**: ⚠️ **Mostly Compliant** — spec is strong and well-reasoned overall, but contains **3 critical implementation blockers** and **8 additional issues** that must be resolved before the spec can be handed to an implementer with confidence.

---

## Executive Summary

The specification is comprehensive: it clearly identifies all 11 affected files, defines complete TypeScript interfaces for both frontend and backend, provides a fully-specified LLM prompt with 9 rules, enumerates all 21 tests, and cross-references 4 accepted ADRs. The risk of over-engineering or under-specification is low.

However, independent examination of the actual codebase reveals **3 critical gaps** that would cause test failures or compilation errors when followed literally:

1. Test P-5 specifies `---` YAML frontmatter that the actual code does not handle (backtick format only) — the test as written will fail.
2. `OutletContext.ts` has two different file paths in spec vs. the clarifications document — a direct import conflict.
3. The `compare()` method's call site is not updated to match the new `Map<>`-based signatures of `parseAndValidateLlmResponse` and `buildFallback`.

The remaining 8 findings are high or medium severity and, if left unaddressed, will cause type errors, duplicate UI elements, undefined references at runtime, or mislead the implementer about what code already exists.

---

## Findings

### 🔴 CRITICAL: Test P-5 specifies wrong YAML frontmatter format

**Specification Reference**: Test Requirements → Test Group 2 (prompt.builder.spec.ts), test P-5:
> "should strip YAML frontmatter from tool content — content with `---\nfoo: bar\n---\n# Title` does not include `foo: bar` in message"

**Evidence**:
```typescript
// prompt.builder.ts — actual regex (line 64)
const withoutYaml = rawContent.replace(/^```yaml[\s\S]*?```\n?/m, '');
```
```markdown
<!-- Actual tool file format (e.g. data/tools/ide/cline.md) -->
# Cline
```yaml
name: "Cline"
description: >
  ...
```
```

The actual tool files use backtick-fenced YAML (````yaml ... ` ```) not `---` dashes. The `extractRelevantContent()` regex strips backtick-fenced YAML only. A test with `---\nfoo: bar\n---\n# Title` input will **not** be stripped and will assert `false` — the test fails silently (data passes through unchanged).

**Category**: Incorrect  
**Severity**: Critical — test P-5 as written will fail on the real codebase; the assertion will never pass using `---` format.  
**Recommendation**: Change P-5 test input to use backtick YAML format:
```typescript
const content = '```yaml\nfoo: bar\n```\n# Title'
// Expect: message does not include 'foo: bar'
```
Or, alternatively, add handling for `---` frontmatter in `extractRelevantContent()` and document that intent explicitly.

---

### 🔴 CRITICAL: OutletContext.ts file path contradiction

**Specification Reference**: Section 7 (Frontend Implementation Requirements):
> **Path**: `src/frontend/src/lib/OutletContext.ts`

**Evidence — clarifications.md contradicts the spec**:
```
### Decision 3 — AppOutletContext type location
Choice: Dedicated `src/frontend/src/components/layout/OutletContext.ts`
Rationale: Clean import path; consumers don't need to import from MainLayout.
```

The spec body says `src/frontend/src/lib/OutletContext.ts` while the scope-clarifications artifact explicitly records the decision to use `src/frontend/src/components/layout/OutletContext.ts`. An implementer following the spec will create the file in `/lib/`, then write imports in `MainLayout.tsx` pointing to `@/components/layout/OutletContext` (per clarification) — or vice versa — causing TypeScript `Cannot find module` errors.

**Category**: Incorrect (internal contradiction)  
**Severity**: Critical — direct TypeScript compilation failure depending on which path the implementer chooses.  
**Recommendation**: Align the spec to one authoritative path. The clarifications.md decision (which post-dates the spec) should win: `src/frontend/src/lib/OutletContext.ts` → **replace with** `src/frontend/src/components/layout/OutletContext.ts` throughout spec Sections 7, 8, and 10.

---

### 🔴 CRITICAL: `compare()` call-site not updated for new toolMeta Map signature

**Specification Reference**: Section 2 (Backend Implementation Requirements):
> `parseAndValidateLlmResponse(raw: string, toolMeta: Map<string, { id: string; name: string }>, toolIds: string[]):`
> `buildFallback(rawText: string, toolIds: string[], toolMeta: Map<string, { id: string; name: string }>):`

**Evidence — current `compare()` method**:
```typescript
// comparison.service.ts, lines 47-66 (not mentioned in spec as needing changes)
async compare(dto: CompareToolsDto): Promise<ComparisonResult> {
  const tools = dto.toolIds.map((id) => this.toolsService.findOne(id));
  const toolMeta = tools.map((t) => ({ id: t.id, name: t.name }));  // ← Array, not Map
  
  const parsed = this.parseAndValidateLlmResponse(
    llmResponse.text,
    dto.toolIds,    // ← was 2nd arg; new signature wants toolMeta as 2nd arg
    toolMeta,       // ← was 3rd arg; was Array, now must be Map
  );
```

The spec defines new signatures for both `parseAndValidateLlmResponse` and `buildFallback` that take `Map<string, {id, name}>`, but **never specifies updating the calling code** in `compare()`. Two implementation problems:
1. `toolMeta` construction: `tools.map(...)` produces `Array<{id, name}>` — must change to `new Map(tools.map(t => [t.id, {id: t.id, name: t.name}]))`
2. Argument order change: new `parseAndValidateLlmResponse` signature puts `toolMeta` before `toolIds` — the existing call passes them in the reverse order.

**Category**: Missing (implementation step not specified)  
**Severity**: Critical — TypeScript type error at compile time; runtime failure with wrong argument order.  
**Recommendation**: Add explicit implementation note to Section 2 specifying the `compare()` changes:
```typescript
// In compare(), replace toolMeta construction:
const toolMeta = new Map(tools.map(t => [t.id, { id: t.id, name: t.name }]));
// Update parseAndValidateLlmResponse call to match new signature:
const parsed = this.parseAndValidateLlmResponse(llmResponse.text, toolMeta, dto.toolIds);
```

---

### 🟠 HIGH: `SidebarProps.models` uses wrong type (`Model[]` instead of `ModelInfo[]`)

**Specification Reference**: Section 9 (Sidebar.tsx — Convert to Controlled):
```typescript
interface SidebarProps {
  selectedModel: string
  onModelChange: (model: string) => void
  models: Model[]    // ← "Model" type specified
  loading: boolean
}
```

**Evidence**:
```typescript
// hooks/useModels.ts (lines 1-3)
import type { ModelInfo } from '@/types/model'
// returns: { models: ModelInfo[], loading, error }
```

There is no `Model` type exported anywhere in the frontend codebase. The correct type is `ModelInfo` from `@/types/model`. Using `Model[]` will produce a TypeScript "Cannot find name 'Model'" error.

The same issue appears in the "Reusable Components" table (Section on `useModels`): "Move (not recreate) `useModels` hook from `Sidebar.tsx`." — The hook is already a standalone file at `src/frontend/src/hooks/useModels.ts`; `Sidebar.tsx` merely imports it. There is nothing to "move" — `MainLayout.tsx` simply needs to add `import { useModels } from '@/hooks/useModels'`. The spec's wording "Move from Sidebar.tsx" is misleading.

**Category**: Incorrect  
**Severity**: High — TypeScript compilation error on `models: Model[]`.  
**Recommendation**: Replace `models: Model[]` with `models: ModelInfo[]` and add `import type { ModelInfo } from '@/types/model'`. Update the "Move hook" wording to "Import in MainLayout; already a standalone hook at `@/hooks/useModels`."

---

### 🟠 HIGH: Duplicate back navigation — `ComparisonResultPage.tsx` already has one

**Specification Reference**: Section 11 (ComparisonResult.tsx — Full Rewrite), item 2:
> "Back navigation — a back button/link navigating to the Tools page (`/tools` or `useNavigate(-1)`) per Q&A requirement"

**Evidence**:
```tsx
// ComparisonResultPage.tsx, lines 9-19 (actual file — not modified by spec)
export function ComparisonResultPage() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          ← Back to Tools
        </Button>
        <h1 className="text-2xl font-bold">Comparison Result</h1>
      </div>
      ...
      <ComparisonResult result={result} />   {/* ← ComparisonResult rendered here */}
```

The spec marks `ComparisonResultPage.tsx` as "No changes needed." But if `ComparisonResult.tsx` also adds a back button (as specified), the rendered page will show **two "Back to Tools" buttons** — one from `ComparisonResultPage.tsx` (outer) and one from `ComparisonResult.tsx` (inner).

**Category**: Incorrect  
**Severity**: High — duplicate UI element; degrades user experience.  
**Recommendation**: Remove item 2 (back navigation) from the `ComparisonResult.tsx` rewrite spec. Back navigation belongs in `ComparisonResultPage.tsx` (the route-level shell), not in the `ComparisonResult` presentational component. The existing back button in `ComparisonResultPage.tsx` is sufficient.

---

### 🟠 HIGH: `formatDate` utility referenced but never defined

**Specification Reference**: Section 11 (ComparisonResult.tsx), item 8:
> `<p className="text-xs text-muted-foreground">Generated at {formatDate(result.generatedAt)}</p>`

**Evidence**: `src/frontend/src/lib/utils.ts` exists but `formatDate` is not present:
```typescript
// lib/utils.ts — actual contents
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```
No `formatDate` function exists anywhere in the frontend codebase. TypeScript will throw "Cannot find name 'formatDate'."

**Category**: Missing  
**Severity**: High — compilation error; blocks frontend build.  
**Recommendation**: Either (a) define the utility inline in `ComparisonResult.tsx`:
```typescript
const formatDate = (iso: string) => new Date(iso).toLocaleString()
```
or (b) specify adding `formatDate` to `src/frontend/src/lib/utils.ts` as part of this implementation step. Option (a) is simpler and aligns with the existing `ComparisonResultPage.tsx` which already uses `new Date(result.generatedAt).toLocaleString()` directly.

---

### 🟡 MEDIUM: Loading skeleton semantics are undefined for a required-prop component

**Specification Reference**: Section 11 (ComparisonResult.tsx), item 1:
> "Loading skeleton — `shadcn/ui Skeleton` shown while the component mounts (brief, covers the initial render before `result` is fully available in state)"

**Evidence**:
```typescript
// Spec-defined props interface (Section 11)
interface ComparisonResultProps {
  result: ComparisonResult   // ← non-optional; result is always present when component renders
}
```
```tsx
// ComparisonResultPage.tsx (not modified) already guards:
{result ? <ComparisonResult result={result} /> : <EmptyState ... />}
```

`ComparisonResult` only renders when `result` is defined (the page-level guard handles `undefined`). There is no loading state within the component — `result` is always a fully-hydrated object when the component is called. A skeleton on "initial mount" has zero duration: the component renders immediately with the result.

**Category**: Ambiguous  
**Severity**: Medium — unclear specification; implementer must guess the intended behaviour. May add unnecessary code or spend time debugging a skeleton that never shows.  
**Recommendation**: Either (a) remove the loading skeleton from `ComparisonResult.tsx` (the loading UI is already handled by `ComparisonPanel.tsx` on `ToolsPage`) or (b) clarify the exact trigger: e.g. "show skeleton for 200ms on mount to prevent layout flash." If skeleton is genuinely desired, add a `useEffect`/`setTimeout(clear, 200)` pattern to the spec.

---

### 🟡 MEDIUM: Navigate route path inconsistency (`/compare` vs `/comparison/result`)

**Specification Reference**: Two locations in the spec disagree:
- Sequence diagram (Architecture Diagrams section): `SPA->>SPA: navigate('/compare', { state: { result } })`
- Frontend State Flow section: `navigate('/comparison/result', { state: { result } })`

**Evidence**:
```typescript
// ToolsPage.tsx — actual code (line 73, not changed by spec)
navigate('/compare', { state: { result } })
```

The spec says `ToolsPage.tsx` is being modified to add `selectedModel`. The navigate call is already `'/compare'`. The spec should not silently change the route path in a diagram while leaving it unchanged in implementation instructions, as it suggests the implementer should change the route.

**Category**: Ambiguous  
**Severity**: Medium — may confuse the implementer into thinking a route path change is required (it is not).  
**Recommendation**: Align both diagrams to `'/compare'` (the current, correct path) and add a note: "navigate path is unchanged."

---

### 🟡 MEDIUM: `extractRelevantContent()` description overstates actual implementation

**Specification Reference**: Section 4 (prompt.builder.ts) and Reusable Components table:
> "Preserve unchanged: `extractRelevantContent()` — strips YAML frontmatter, **splits on `\n## ` headers, extracts `['features', 'pricing', 'integrations', 'limitations', 'ai models']` sections at 750 chars/section**, returns up to 3000 chars total."

**Evidence — actual implementation** (`prompt.builder.ts`, lines 61–70):
```typescript
private extractRelevantContent(tool: Tool): string {
  const rawContent = tool.content ?? '';
  const withoutYaml = rawContent.replace(/^```yaml[\s\S]*?```\n?/m, '');
  const trimmed = withoutYaml.trim();
  if (trimmed.length <= MAX_TOOL_CONTENT_CHARS) {
    return trimmed;
  }
  return trimmed.slice(0, MAX_TOOL_CONTENT_CHARS) + '\n\n[... content truncated ...]';
}
```

The function does **not** split on `\n## ` headers or extract sections at 750 chars/section. It simply removes backtick-YAML frontmatter and truncates at 3000 characters. The spec's description is aspirational or copied from a design artifact that was not implemented. Since the spec says "Preserve unchanged," the implementer won't be writing this code — but the inaccurate description may lead to incorrect test assertions in P-4 (e.g. testing section-aware extraction that doesn't exist) or confusion about what the function does.

**Category**: Incorrect (specification over-describes actual functionality)  
**Severity**: Medium — misleads implementer; test P-4 must test actual truncation-at-3000-chars behaviour, not section-level extraction.  
**Recommendation**: Update the description to match reality:
> "`extractRelevantContent()` — strips backtick-fenced YAML frontmatter (` ```yaml ... ``` `), then truncates to ≤3000 characters total with a `[... content truncated ...]` suffix."

---

### 🟡 MEDIUM: `@ArrayMaxSize` discrepancy — spec body says 4, DTO enforces 5

**Specification Reference**: Multiple locations in spec say "2–4 tools":
- User Stories: "select 2–4 AI tools"  
- API Contract: `@ArrayMaxSize(4)` listed in constraints table (line 198)  
- Acceptance Criteria #1: "a POST /comparison with 2 valid tool IDs..."

**Evidence — actual DTO**:
```typescript
// compare-tools.dto.ts (confirmed, no changes needed per spec)
@ArrayMaxSize(5)
toolIds!: string[];
```

The clarifications.md correctly records: "Keep the existing `@ArrayMaxSize(5)` validation — no change needed." But the spec body contradicts this in the API contract table by listing `@ArrayMaxSize(4)`. This inconsistency will confuse an implementer who trusts the spec's API contract over the clarifications.

**Category**: Incorrect (spec body contradicts both actual code and clarifications)  
**Severity**: Medium — may cause implementer to change DTO to `@ArrayMaxSize(4)`, breaking existing 5-tool functionality.  
**Recommendation**: Update API contract table in spec to `@ArrayMaxSize(5)` and user stories to "2–5 AI tools." Reference the clarifications decision.

---

### 🟡 MEDIUM: `isOnline` prop handling unspecified when Sidebar becomes controlled

**Specification Reference**: Section 9 (Sidebar.tsx — Convert to Controlled):
```typescript
interface SidebarProps {
  selectedModel: string
  onModelChange: (model: string) => void
  models: Model[]      // (should be ModelInfo[])
  loading: boolean
}
```

**Evidence — current Sidebar.tsx (line 31)**:
```tsx
<SidebarModelStatus
  selectedModel={selectedModel}
  onModelChange={setSelectedModel}
  models={models}
  loading={loading}
  isOnline={!loading && models.length > 0}   // ← derived prop not in SidebarProps spec
/>
```

`SidebarModelStatus` receives an `isOnline` prop. When `Sidebar` becomes controlled and receives `models` and `loading` as props, `isOnline` can still be computed locally (`!loading && models.length > 0`) since `models` and `loading` are passed down. This will work, but the spec's `SidebarProps` interface doesn't account for it. An implementer may strip `isOnline` from the `SidebarModelStatus` call when refactoring, breaking the online indicator.

**Category**: Incomplete  
**Severity**: Medium — risk of silent UI regression (online indicator disappears).  
**Recommendation**: Add a note: "The computed `isOnline={!loading && models.length > 0}` prop passed to `SidebarModelStatus` is retained — it can be derived locally in `Sidebar` from the received `models` and `loading` props. No change to `SidebarModelStatus` is needed."

---

### 🟢 LOW: Test L-1 assertion accesses wrong property path

**Specification Reference**: Test Group 3, test L-1:
> "should return valid JSON matching new ComparisonResult schema in mock mode — `JSON.parse(result)` has `sections`, `toolSummaries` keys"

**Evidence**:
```typescript
// llm.service.ts (line 31-37)
async complete(request: LlmCompletionRequest): Promise<LlmCompletionResponse>
// LlmCompletionResponse
interface LlmCompletionResponse { text: string; model: string }
```

`complete()` returns `{ text: string, model: string }` — not a raw string. The assertion `JSON.parse(result)` should be `JSON.parse(result.text)`. Writing `JSON.parse(result)` will throw `[object Object] is not valid JSON`.

**Category**: Incorrect  
**Severity**: Low — test as described will not compile/run as written. Minor spec precision issue.  
**Recommendation**: Update L-1 assertion to: `JSON.parse(result.text)` has `sections`, `toolSummaries` keys; no `comparedTools` key.

---

### 🟢 LOW: `shadcn/ui Tabs` and `Table` are not installed — prerequisite may block frontend build

**Specification Reference**: Section "shadcn/ui Component Installation Prerequisite":
> "Verify `shadcn/ui Tabs` is installed: `npx shadcn@latest add tabs`"
> "Verify `shadcn/ui Table` is installed: `npx shadcn@latest add table`"

**Evidence**:
```
src/frontend/src/components/ui/
  alert.tsx, badge.tsx, button.tsx, card.tsx, checkbox.tsx, dialog.tsx,
  input.tsx, select.tsx, separator.tsx, sheet.tsx, skeleton.tsx
  ← NO tabs.tsx, NO table.tsx
```

`Tabs` and `Table` are confirmed absent. The spec correctly identifies this prerequisite. However, it is buried in the Test Requirements section (after all implementation steps) rather than at the top of Frontend Implementation Requirements. An implementer who follows the spec top-to-bottom will write `FeatureTable.tsx` importing from `@/components/ui/table` before installing the dependency, causing an immediate compilation failure.

**Category**: Incomplete (prerequisite ordering risk)  
**Severity**: Low — the fix is clear, just a sequencing concern.  
**Recommendation**: Move the shadcn/ui installation prerequisites to the **top** of the Frontend Implementation Requirements section (before Section 6), not after the test specifications.

---

## Summary of All Findings

| # | Finding | Category | Severity | File Affected |
|---|---------|----------|----------|---------------|
| 1 | Test P-5 uses `---` YAML format; code handles only `` ```yaml `` format | Incorrect | 🔴 Critical | `prompt.builder.spec.ts` |
| 2 | `OutletContext.ts` path contradiction: `/lib/` (spec) vs `/components/layout/` (clarifications) | Incorrect | 🔴 Critical | `OutletContext.ts`, `MainLayout.tsx`, `ToolsPage.tsx` |
| 3 | `compare()` method not updated for new `Map<>` toolMeta signature/argument order | Missing | 🔴 Critical | `comparison.service.ts` |
| 4 | `SidebarProps.models: Model[]` — `Model` type does not exist; should be `ModelInfo[]` | Incorrect | 🟠 High | `Sidebar.tsx` |
| 5 | Duplicate back navigation — `ComparisonResultPage.tsx` already has a back button | Incorrect | 🟠 High | `ComparisonResult.tsx` |
| 6 | `formatDate` utility referenced in footer but not defined or imported anywhere | Missing | 🟠 High | `ComparisonResult.tsx` |
| 7 | Loading skeleton semantics undefined for a component with a required `result` prop | Ambiguous | 🟡 Medium | `ComparisonResult.tsx` |
| 8 | Navigate path inconsistency: `/compare` vs `/comparison/result` across spec diagrams | Ambiguous | 🟡 Medium | `ToolsPage.tsx` |
| 9 | `extractRelevantContent()` described as H2-section-aware; actual code just truncates at 3000 | Incorrect | 🟡 Medium | `prompt.builder.ts` (description only) |
| 10 | API contract says `@ArrayMaxSize(4)`; actual DTO is `@ArrayMaxSize(5)`; clarifications say keep 5 | Incorrect | 🟡 Medium | `compare-tools.dto.ts` |
| 11 | `isOnline` prop on `SidebarModelStatus` not mentioned in controlled Sidebar spec | Incomplete | 🟡 Medium | `Sidebar.tsx` |
| 12 | Test L-1: `JSON.parse(result)` should be `JSON.parse(result.text)` | Incorrect | 🟢 Low | `llm.service.spec.ts` |
| 13 | `shadcn/ui Tabs` + `Table` install prerequisites appear after test specs, not before frontend steps | Incomplete | 🟢 Low | Spec ordering |

---

## What the Spec Gets Right (Strengths)

The following aspects of the specification are solid and require no changes:

- **DI bug identification** (GAP-CRIT-1/2): Exact line numbers, exact error message, exact fix — correct.
- **New TypeScript interfaces**: Both frontend (`comparison.ts`) and backend (`comparison.service.ts`) interface definitions are complete, internally consistent, and match the HLD contract.
- **LLM prompt design**: System message template, 9 rules, token budget table, and user message template are all well-specified. The `toolId` override security invariant is correctly documented.
- **Mock stub requirement**: Spec correctly identifies the string-sniff breakage and specifies the unconditional fix.
- **Security invariants**: `toolId`/`toolName` override from `toolMeta` and phantom toolId filtering are explicitly specified with clear rationale.
- **Reusable components table**: Correctly identifies `extractRelevantContent`, `ComparisonPanel.tsx`, `api.ts`, `CompareToolsDto`, and `LlmService.complete()` as no-change.
- **Test table format**: Tests N-1 through N-10, P-1 through P-6, L-1 through L-5 are clearly enumerated with ID/test/assert columns — implementable as written (except P-5 and L-1 noted above).
- **Acceptance criteria**: 6 criteria are concrete, testable, and free of ambiguity.
- **ADR alignment**: All 4 ADRs are referenced correctly; design decisions are internally consistent.

---

## Clarification Questions for Stakeholders

1. **YAML Frontmatter** (Finding #1, #9): Should `extractRelevantContent()` be enhanced to also handle `---` dashes-format frontmatter? Or should test P-5 simply be updated to use the backtick format? If enhanced, this is new implementation work beyond "preserve unchanged."

2. **OutletContext.ts path** (Finding #2): Confirm authoritative path: `src/frontend/src/lib/OutletContext.ts` or `src/frontend/src/components/layout/OutletContext.ts`? (Clarifications document says the latter; spec body says the former.)

3. **Loading Skeleton** (Finding #7): What is the intended trigger for the skeleton in `ComparisonResult.tsx`? The component receives `result` as a required prop — there is no async state inside it. Should the skeleton be removed (the progress UI in `ComparisonPanel.tsx` already covers the loading state), or is there an intended brief "shimmer on mount" effect?

4. **Max tool count** (Finding #10): The DTO enforces `@ArrayMaxSize(5)` but the spec says "2–4 tools" everywhere. Should all user-facing copy be updated to "2–5 tools," or should the DTO be changed to `@ArrayMaxSize(4)` to match the spec?

---

## Recommended Pre-Implementation Fixes (Priority Order)

1. **[Critical]** Fix test P-5 input to use `` ```yaml ``` `` format.
2. **[Critical]** Align `OutletContext.ts` file path across spec and clarifications.
3. **[Critical]** Add explicit `compare()` method update instructions: construct `Map`, update `parseAndValidateLlmResponse` call argument order.
4. **[High]** Fix `SidebarProps.models: Model[]` → `ModelInfo[]`, add correct import.
5. **[High]** Remove "back navigation" from `ComparisonResult.tsx` spec items (already present in `ComparisonResultPage.tsx`).
6. **[High]** Define `formatDate` or replace with `new Date(result.generatedAt).toLocaleString()` inline.
7. **[Medium]** Fix API contract `@ArrayMaxSize` to `5` to match DTO and clarifications.
8. **[Medium]** Add `isOnline` retention note to Sidebar conversion instructions.
9. **[Low]** Fix test L-1 to use `result.text` property.
10. **[Low]** Move shadcn/ui install prerequisites to top of Frontend Implementation Requirements.
