# Gap Analysis: AI Tools Radar Comparison Feature (Epics #5/#6/#7)

**Date**: 2026-05-26  
**Task**: Implement full end-to-end comparison feature — fix 2 DI bugs, replace score-based data model with ComparisonSection/FeatureRow/FeatureValue, rewrite prompt, lift selectedModel state, rewrite ComparisonResult.tsx as tabbed UI, fix/create all tests.

---

## Summary

- **Risk Level**: Medium-High
- **Estimated Effort**: Medium-High
- **Detected Characteristics**: has_reproducible_defect, modifies_existing_code, creates_new_entities, involves_data_operations, ui_heavy

The feature is ~60–70% complete structurally, but **broken end-to-end** at runtime due to 2 DI wiring bugs and a wholesale data model mismatch. The backend pipeline architecture is sound; only the wiring and model are wrong. The frontend has an independent state isolation problem that silently drops the user's model selection. 11 existing source files require changes; 4–5 new files must be created; all 5 comparison service tests are failing.

---

## Task Characteristics

| Characteristic | Value | Evidence |
|---------------|-------|---------|
| Has reproducible defect | **Yes** | 2 NestJS DI bugs crash app at startup; 5 spec tests ALL FAILING |
| Modifies existing code | **Yes** | 9 existing files need direct edits |
| Creates new entities | **Yes** | tabs.tsx, FeatureTable.tsx, ToolSummaryCard.tsx, prompt.builder.spec.ts, llm.service.spec.ts |
| Involves data operations | **Yes** | ComparisonResult data model replacement (CRUD-style: read comparison results) |
| UI heavy | **Yes** | ComparisonResult.tsx full rewrite; tabbed UI with feature grid, cards, recommendation callout |

---

## Gaps Identified

### Critical — Blocks App Startup

#### GAP-CRIT-1: `comparison.module.ts` missing `LlmModule` import
- **File**: `src/backend/src/comparison/comparison.module.ts`, line 7
- **Current**: `imports: [ToolsModule]`
- **Required**: `imports: [ToolsModule, LlmModule]`
- **Runtime error**: `Nest can't resolve dependencies of the ComparisonService (?). LlmService at index [1] not available in ComparisonModule context.`
- **Impact**: ANY call to `POST /comparison` crashes app startup

#### GAP-CRIT-2: `comparison.module.ts` missing `PromptBuilderService` in providers
- **File**: `src/backend/src/comparison/comparison.module.ts`, line 9
- **Current**: `providers: [ComparisonService]`
- **Required**: `providers: [ComparisonService, PromptBuilderService]`
- **Runtime error**: `Nest can't resolve dependencies of the ComparisonService (?). PromptBuilderService at index [2] not available.`
- **Impact**: Same file as CRIT-1; total diff is 4 lines

> Both CRIT-1 and CRIT-2 are in the same 11-line file. Combined fix: add 1 import line + `LlmModule` to imports array + `PromptBuilderService` to providers array.

---

### High — Wrong Data Model (feature broken even after DI fix)

#### GAP-HIGH-1: `comparison.service.ts` exports old score-based interfaces
- **File**: `src/backend/src/comparison/comparison.service.ts`, lines 7–34
- **Current**: `ComparedTool` (has `score: number`, `strengths[]`, `weaknesses[]`), `CriterionRating` (has `score: number`), `Criterion`, `ComparisonResult` (has `comparedTools[]`, `criteria[]`)
- **Required**: Replace all 4 interfaces with `FeatureValue`, `FeatureRow`, `ComparisonSection`, `ToolSummary`, `ComparisonResult` (no scores anywhere)
- **Cascades to**: `parseAndValidateLlmResponse()`, `buildFallback()`, consumers

#### GAP-HIGH-2: `prompt.builder.ts` system prompt describes old schema
- **File**: `src/backend/src/comparison/prompt.builder.ts`, lines 18–51
- **Current**: System prompt JSON schema instructs LLM to return `comparedTools[].score`, `criteria[].ratings[].score`, `strengths[]`, `weaknesses[]` (score 1–10)
- **Required**: Rewrite system prompt to describe `toolSummaries[]`, `sections[]`, `features[]`, `values[].available: boolean`, `values[].description: string` — NO numeric scores
- **Impact**: LLM will produce wrong output shape; `parseAndValidateLlmResponse` will always fall back

#### GAP-HIGH-3: `comparison.service.ts` — `parseAndValidateLlmResponse()` validates old model
- **File**: `src/backend/src/comparison/comparison.service.ts`, lines 69–154
- **Current**: Validates and maps `comparedTools`, `criteria`, `score`, `clampScore()`, `extractStringArray()`
- **Required**: Rewrite to validate and map `sections[]`, `toolSummaries[]`, `FeatureRow[]`, `FeatureValue[]`; remove `clampScore()` and `extractStringArray()`

#### GAP-HIGH-4: `comparison.service.ts` — `buildFallback()` uses old model
- **File**: `src/backend/src/comparison/comparison.service.ts`, lines 156–176
- **Current**: Returns `comparedTools: toolMeta.map(...)` with `score: 5`, `strengths: []`, `weaknesses: []` and `criteria: []`
- **Required**: Return `toolSummaries: toolMeta.map(...)` with `bestFor: ''`, `notIdealFor: ''`, `keyDifferentiators: []` and `sections: []`

#### GAP-HIGH-5: `types/comparison.ts` — frontend type stub with only 3 fields
- **File**: `src/frontend/src/types/comparison.ts` (9 lines total)
- **Current**:
  ```typescript
  interface ComparisonRequest { toolIds: string[] }           // missing model?: string
  interface ComparisonResult { tools: string[]; summary: string; generatedAt: string }  // missing 3 fields
  ```
- **Required**: Complete replacement with 6 interfaces — `ComparisonRequest` (add `model?`), `FeatureValue`, `FeatureRow`, `ComparisonSection` (with `summary?`), `ToolSummary`, `ComparisonResult` (add `recommendation`, `toolSummaries`, `sections`)
- **Cascade impact**: 5 files depend on this type — `ComparisonResult.tsx`, `ComparisonResultPage.tsx`, `api.ts`, `ToolsPage.tsx`, any new components

#### GAP-HIGH-6: `ComparisonResult.tsx` — renders only plain-text summary
- **File**: `src/frontend/src/components/comparison/ComparisonResult.tsx` (24 lines)
- **Current**: Renders `<pre>{result.summary}</pre>` and a timestamp only
- **Required**: Full rewrite: recommendation callout, `toolSummaries` cards (via `ToolSummaryCard`), tabbed `sections` using shadcn/ui `Tabs`, `FeatureTable` grid per tab showing `available ? ✓ : ✗ + description`

---

### Medium — State Isolation (model selection silently ignored)

#### GAP-MED-1: `Sidebar.tsx` owns `selectedModel` state — no consumers can reach it
- **File**: `src/frontend/src/components/layout/Sidebar.tsx`, line 10
- **Current**: `const [selectedModel, setSelectedModel] = useState('')` — local state, not shared
- **Required**: Remove local state; receive `selectedModel`, `onModelChange`, `models`, `loading` as props from `MainLayout` via outlet context
- **Impact**: Every comparison call omits `model` → user's model choice is silently ignored

#### GAP-MED-2: `MainLayout.tsx` — pure shell with no shared state
- **File**: `src/frontend/src/components/layout/MainLayout.tsx` (14 lines)
- **Current**: `<Sidebar /> + <Outlet />` — no state, no context
- **Required**: Add `useState` + `useEffect` + `useModels` hook for `selectedModel`; pass via `<Outlet context={{ selectedModel, setSelectedModel }} />`; render `Sidebar` as controlled component

#### GAP-MED-3: `ToolsPage.tsx` — `handleCompare` never passes `model`
- **File**: `src/frontend/src/routes/ToolsPage.tsx`, line 70
- **Current**: `api.comparison.compare({ toolIds: [...selectedIds] })` — no `model` field
- **Required**: `const { selectedModel } = useOutletContext<AppOutletContext>()` + `api.comparison.compare({ toolIds: [...selectedIds], model: selectedModel || undefined })`

#### GAP-MED-4: `comparison.controller.ts` — `compare()` missing `async` keyword
- **File**: `src/backend/src/comparison/comparison.controller.ts`, line 10
- **Current**: `compare(@Body() dto: CompareToolsDto)` — no `async`
- **Required**: `async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult>`
- **Severity**: Code quality/consistency; NestJS handles Promise returns from sync methods but exception-filter propagation can be inconsistent in edge cases

---

### Low — Tests (all broken or missing)

#### GAP-LOW-1: `comparison.service.spec.ts` — 5 tests ALL FAILING (3 root causes)
- **File**: `src/backend/src/comparison/comparison.service.spec.ts`
- **Root cause 1**: `TestingModule` providers missing `LlmService` mock and `PromptBuilderService` mock (lines 22–28) — DI resolves to same error as production
- **Root cause 2**: All 5 tests call `service.compare(dto)` **without `await`** (lines 52, 71, 94, 112, 131) — returns Promise, not result
- **Root cause 3**: All 5 assertions target removed functionality (`buildMockSummary`, old fallback shape, `comparedTools`, `criteria`)
- **Required**: Full rewrite — fix module setup with 3 mocks, add `await`, replace old assertions with ~10 new tests against new model

#### GAP-LOW-2: `prompt.builder.spec.ts` — file does not exist
- **Target**: `src/backend/src/comparison/prompt.builder.spec.ts`
- **Required**: Create new file; write 6 tests covering message count/roles, tool ID embedding in system prompt, content truncation at 3000 chars, YAML frontmatter stripping, undefined content guard

#### GAP-LOW-3: `llm.service.spec.ts` — file does not exist
- **Target**: `src/backend/src/llm/llm.service.spec.ts`
- **Required**: Create new file; write 5 tests covering mock mode JSON return, mock mode generic fallback, live HTTP call, Bearer auth header, error propagation

---

### Supporting — Will Break Silently After Prompt Rewrite

#### GAP-SUPPORT-1: `llm.service.ts` `mockComplete()` sniffs old schema keyword
- **File**: `src/backend/src/llm/llm.service.ts`, lines 46–48
- **Current**: `if (systemContent.includes('"summary"') && systemContent.includes('"comparedTools"'))`
- **Problem**: After prompt.builder.ts is rewritten, `"comparedTools"` will no longer appear in the system prompt. The condition evaluates `false` → mock mode returns a plain-text string → `parseAndValidateLlmResponse` always calls `buildFallback` in dev/test mode.
- **Required**: Update sniff to detect new schema keywords, e.g.:
  - `systemContent.includes('"sections"') && systemContent.includes('"toolSummaries"')`
  - Or: return a valid new-model JSON stub unconditionally for any structured comparison request

---

### New Files Required

#### GAP-NEW-1: `src/frontend/src/components/ui/tabs.tsx` — NOT INSTALLED
- **Verified absent**: `ls src/frontend/src/components/ui/` returns no `tabs.tsx`
- **Required**: shadcn/ui Tabs component (`npx shadcn@latest add tabs`)
- **Blocks**: `ComparisonResult.tsx` full rewrite (tabbed sections depend on this)

#### GAP-NEW-2: `src/frontend/src/components/comparison/FeatureTable.tsx` — does not exist
- **Required**: Feature comparison grid component. Props: `section: ComparisonSection`, `toolIds: string[]`. Renders feature rows with `available ? <CheckCircle> : <XCircle>` + description text using shadcn/ui `Table`.

#### GAP-NEW-3: `src/frontend/src/components/comparison/ToolSummaryCard.tsx` — does not exist
- **Required**: Per-tool prose summary card. Props: `summary: ToolSummary`. Renders `bestFor`, `notIdealFor`, `keyDifferentiators[]` using shadcn/ui `Card`.

#### GAP-NEW-4: `src/frontend/src/components/layout/OutletContext.ts` — does not exist (recommended)
- **Required**: Type declaration for shared Outlet context shape:
  ```typescript
  export interface AppOutletContext {
    selectedModel: string
    setSelectedModel: (model: string) => void
  }
  ```
- **Rationale**: Prevents implicit type contract between `MainLayout` (producer) and `ToolsPage`/`Sidebar` (consumers). Catches mismatches at compile time.

---

## Data Model Analysis

### ComparisonResult Lifecycle (READ path only — data generated by LLM)

| Operation | Backend | Frontend Type | UI Component | User Access | Status |
|-----------|---------|---------------|--------------|-------------|--------|
| GENERATE (POST) | `ComparisonService.compare()` ✅ (broken by DI) | `ComparisonRequest` ⚠️ missing `model?` | `ToolsPage.handleCompare()` ⚠️ missing model | "Start Comparing" button ✅ | ⚠️ Partially working |
| READ (render) | Returns `ComparisonResult` ⚠️ old model | `ComparisonResult` ❌ 3 fields only | `ComparisonResult.tsx` ❌ stub | `ComparisonResultPage.tsx` ✅ routed | ❌ Broken |
| DISPLAY | N/A | `FeatureValue`, `FeatureRow`, etc. ❌ missing | `FeatureTable.tsx` ❌ missing | Not accessible | ❌ Absent |

**Completeness**: 35%  
**Critical Gap**: The data generated by the backend cannot be meaningfully displayed — the frontend type covers only `summary: string` of the 6-field result, and the display component renders only that one field.

### Data Contract Discrepancy: `ComparisonSection.summary?`

A minor inconsistency was detected across research artifacts:

| Source | `ComparisonSection.summary?` field |
|--------|-----------------------------------|
| `research-report.md` §6.1 (frontend interfaces) | **Absent** |
| `high-level-design.md` TypeScript interfaces | **Present** (`summary?: string`) |
| `decision-log.md` ADR-003 | **Present** — explicitly decided to include |
| HLD system prompt schema | **Present** (`"summary": string` in sections) |

**Assessment**: The HLD interfaces and ADR-003 are authoritative. The research-report §6.1 accidentally omitted `summary?` from the frontend `ComparisonSection`. The correct implementation **must include `summary?: string`** on both frontend and backend `ComparisonSection` interfaces.

---

## User Journey Impact Assessment

### Current State (Before Changes)

| Dimension | Current | Score |
|-----------|---------|-------|
| Reachability | App crashes on compare → DI error | 1/10 |
| Discoverability | "Start Comparing" button exists but broken | 3/10 |
| Flow Integration | User selects model → model silently ignored | 2/10 |
| Multi-Persona | N/A (broken for all users) | 1/10 |

### After Changes

| Dimension | After | Score | Change |
|-----------|-------|-------|--------|
| Reachability | Flow completes: select → compare → tabbed result | 8/10 | +7 |
| Discoverability | Tabbed sections with clear feature grid | 8/10 | +5 |
| Flow Integration | Model selection flows through to LLM call | 9/10 | +7 |
| Multi-Persona | Works for all users with 2–4 tool selections | 8/10 | +7 |

**Navigation path** (after changes):  
`ToolsPage → Add Tools → Select Model in Sidebar → Start Comparing → ComparisonResultPage → Tabbed feature grid + summary cards`

---

## Defect Analysis

### Defect 1: NestJS DI Crash (CRIT-1 + CRIT-2)

**Reproduction**:
1. Start backend: `npm run start:dev` in `src/backend/`
2. Make any request to `POST /comparison`
3. **OR**: app crashes at startup if `ComparisonModule` is loaded

**Expected**: `POST /comparison` returns comparison JSON  
**Actual**: `Error: Nest can't resolve dependencies of the ComparisonService (ToolsService, ?, PromptBuilderService). Please make sure that the argument LlmService at index [1] is available in the ComparisonModule context.`

**Root Cause**: `comparison.module.ts` line 7 imports only `[ToolsModule]` (missing `LlmModule`) and line 9 provides only `[ComparisonService]` (missing `PromptBuilderService`).

**Fix complexity**: ~4 lines in one file. Zero architectural change required.

**Regression risk**: None — both changes are additive to `@Module()` decorator arrays.

---

### Defect 2: Test Suite DI + Async Failures (GAP-LOW-1)

**Reproduction**:
1. `cd src/backend && npm test`
2. `comparison.service.spec.ts` — all 5 tests fail

**Root cause 1 (DI)**: `TestingModule` at line 22–28 provides `ToolsService` + `ConfigService` mocks but is missing `LlmService` mock and `PromptBuilderService` mock. Exact same DI error as production.

**Root cause 2 (async)**: All 5 tests call `service.compare(dto)` without `await`. The `compare()` method is `async`, so these calls return `Promise<ComparisonResult>` objects — every assertion on `result.tools`, `result.summary` etc. checks properties of a Promise object (always undefined).

**Root cause 3 (old model)**: Test assertions reference `buildMockSummary` (function removed), and expect old fields (`comparedTools`, `score`-based format).

**Regression risk from fix**: Low. Rewriting the spec file with new mocks and new assertions will not affect any other test file.

---

## Recommendations

### Execution Order (dependency-ordered)

1. **Fix DI bugs** (`comparison.module.ts`) — unblocks runtime + spec tests immediately. 2-minute fix.

2. **Install `tabs` component** (`npx shadcn@latest add tabs`) — unblocks UI rewrite. Must happen before `ComparisonResult.tsx` rewrite.

3. **Replace frontend types** (`types/comparison.ts`) — establishes the contract anchor for all downstream changes. Do before any component or API call changes.

4. **Replace backend interfaces + rewrite service methods** (`comparison.service.ts`) — `parseAndValidateLlmResponse`, `buildFallback`, remove `clampScore`/`extractStringArray`; add `toolMeta` as `Map<string, {id, name}>` parameter pattern.

5. **Rewrite system prompt** (`prompt.builder.ts`) — new JSON schema describing `sections[]`, `toolSummaries[]`, `FeatureValue.available: boolean`. Preserve `extractRelevantContent()` (already correct).

6. **Update `mockComplete()` sniff** (`llm.service.ts`) — change string check from `"comparedTools"` to `"sections" && "toolSummaries"`. Return new-model JSON stub.

7. **Lift state via Outlet context** (`MainLayout.tsx`, `Sidebar.tsx`, `ToolsPage.tsx`, new `OutletContext.ts`) — lift `useModels`/`useState` to `MainLayout`; thread via `<Outlet context>`.

8. **Rewrite UI** (`ComparisonResult.tsx`, new `FeatureTable.tsx`, new `ToolSummaryCard.tsx`) — depends on types (step 3) and Tabs component (step 2).

9. **Fix/create all tests** (`comparison.service.spec.ts` rewrite, `prompt.builder.spec.ts` create, `llm.service.spec.ts` create) — depends on steps 1–6.

10. **Add `async` to controller** (`comparison.controller.ts`) — trivial; can be done in any slot.

### Key Risks

| Risk | Severity | Mitigation |
|------|---------|-----------|
| Type cascade from `types/comparison.ts` to 5 consumers | Medium | Fix types first; TypeScript will surface any missed consumer as compile error |
| `mockComplete()` sniff update must be coordinated with prompt rewrite | Medium | Update both in the same commit; test mock mode returns parseable new-model JSON |
| `ComparisonSection.summary?` omitted from research-report §6.1 | Low | HLD and ADR-003 are authoritative; include `summary?: string` in both frontend and backend interfaces |
| `tabs.tsx` absent from shadcn/ui components | Medium | Install via CLI before starting UI rewrite; do not scaffold manually |
| `ToolSummaryCard` renders `toolName` — server-controlled field | Low | Ensure `ToolSummary.toolName` is always set by `parseAndValidateLlmResponse` from `toolMeta`, never from LLM |

---

## Issues Requiring Decisions

### Critical (Must Decide Before Proceeding)

1. **`ComparisonSection.summary?` field — include or exclude?**
   - **Issue**: Research-report §6.1 omits `summary?` from frontend `ComparisonSection`. ADR-003, HLD interfaces, and the HLD system prompt schema all include it.
   - **Options**:
     - A) Include `summary?: string` on `ComparisonSection` — matches ADR-003 and HLD (recommended)
     - B) Exclude `summary?` — simpler model; less LLM token usage; can add in a later sprint
   - **Recommendation**: **Option A** — ADR-003 is accepted and authoritative; the HLD system prompt already describes `"summary"` as a per-section field. Omitting it would require revising the ADR.

### Important (Should Decide)

2. **`llm.service.ts` mock sniff update strategy**
   - **Issue**: `mockComplete()` must detect when a comparison-schema request is being processed. The current keyword sniff (`"comparedTools"`) will fail silently after the prompt rewrite.
   - **Options**:
     - A) Update sniff to new keywords: `systemContent.includes('"sections"') && systemContent.includes('"toolSummaries"')` (minimal change)
     - B) Always return a full valid new-model JSON stub in mock mode regardless of sniff (more robust, simpler to test)
   - **Recommendation**: **Option B** — deterministic mock behaviour is easier to test and debug; no risk of a future prompt keyword change breaking dev mode again.

3. **Outlet context type file — named `OutletContext.ts` vs inline in `MainLayout.tsx`**
   - **Issue**: The shared Outlet context type (`AppOutletContext`) can live in a dedicated file or be inlined in `MainLayout.tsx`.
   - **Options**:
     - A) Create `src/frontend/src/components/layout/OutletContext.ts` (explicit shared type, importable by all consumers)
     - B) Inline the type in `MainLayout.tsx` and re-export it (fewer files, but couples consumers to layout import)
   - **Default**: **Option A** — explicit file follows the project's pattern of co-located type declarations; `ToolsPage` should not need to import from a layout component.

---

## Risk Assessment

| Dimension | Assessment | Level |
|-----------|-----------|-------|
| **Complexity Risk** | 11 files + 4 new; but each change is well-scoped and independent | Medium |
| **Integration Risk** | Type change cascades to 5 consumers; TypeScript compilation catches misses | Low |
| **Regression Risk** | DI fix is additive; prompt rewrite only affects LLM output format; no DB changes | Low |
| **Test Reliability** | All 5 existing tests are broken → no regression baseline; must establish one first | Medium |
| **UI Risk** | Tabs component absent; must install before rewrite | Low-Medium |
| **LLM Output Risk** | New prompt schema is more constrained (boolean fields); lower hallucination risk than numeric scores | Low |

**Overall: Medium-High** — driven by the breadth (11 files), not the depth (each individual change is well-understood and bounded).

---

## Structured Output

```yaml
status: success
report_path: analysis/gap-analysis.md

risk_level: medium-high
effort_estimate: medium-high

task_characteristics:
  has_reproducible_defect: true
  modifies_existing_code: true
  creates_new_entities: true
  involves_data_operations: true
  ui_heavy: true

change_type: modificative
compatibility_requirements: moderate

reproduction_data:
  steps:
    - "Start backend: npm run start:dev in src/backend/"
    - "Call POST /comparison with any valid body"
  inputs:
    - '{"toolIds": ["claude-code", "github-copilot-cli"]}'
  expected: "200 ComparisonResult JSON"
  actual: "NestJS DI error: Nest can''t resolve dependencies of ComparisonService (?). LlmService at index [1] not available."
regression_risk_areas:
  - "comparison.module.ts changes are purely additive — zero regression risk"
  - "types/comparison.ts change cascades to 5 consumers — TypeScript will catch misses at compile time"
  - "llm.service.ts mock sniff change affects mock mode JSON shape — must update comparison.service.spec.ts in same batch"
  - "app.e2e-spec.ts health check unaffected — passes after DI fix"
root_cause_hypothesis: "DI wiring gap introduced when LlmService and PromptBuilderService were added to ComparisonService constructor but never registered in comparison.module.ts"

user_journey_impact:
  reachability_change: "+7"
  discoverability_before: 3
  discoverability_after: 8
  flow_integration: "positive"

integration_points:
  - "React Router Outlet context: MainLayout → Sidebar + ToolsPage"
  - "POST /comparison endpoint: unchanged URL, adds model? field to request body"
  - "ComparisonResultPage.tsx: auto-inherits fixes via ComparisonResult.tsx rewrite"
patterns_to_follow:
  - "shadcn/ui Card pattern: existing ComparisonResult.tsx uses Card/CardHeader/CardContent"
  - "shadcn/ui Tabs: install via CLI, matches NavigationMenu pattern already in codebase"
  - "useOutletContext pattern: documented in ADR-004; no existing usage yet — first instance"
  - "NestJS module pattern: ToolsModule already correctly imported as reference"
architectural_impact: medium

data_lifecycle_gaps:
  orphaned_operations:
    - "READ without full display: backend returns sections[]/toolSummaries[] but frontend renders only summary string"
    - "model field CREATE gap: user sets model in Sidebar but it never reaches POST /comparison"
  missing_touchpoints:
    - "FeatureTable.tsx: feature grid not yet accessible from UI"
    - "ToolSummaryCard.tsx: per-tool prose cards not yet accessible from UI"
    - "Recommendation callout: recommendation field returned by API but never rendered"
  completeness_score: 35

decisions_needed:
  critical:
    - id: "schema-summary-field"
      issue: "ComparisonSection.summary? field: research-report §6.1 omits it; ADR-003 and HLD include it"
      options:
        - "Include summary?: string on ComparisonSection (matches ADR-003 and HLD)"
        - "Exclude summary? (simpler; can add later)"
      recommendation: "Include summary?"
      rationale: "ADR-003 is accepted and authoritative. HLD system prompt already describes this field. Omitting it requires revisiting the ADR."
  important:
    - id: "mock-sniff-strategy"
      issue: "llm.service.ts mockComplete() uses keyword sniff that will break after prompt rewrite"
      options:
        - "Update sniff to new keywords (sections + toolSummaries)"
        - "Return full new-model JSON stub unconditionally in mock mode (more robust)"
      default: "Return full new-model JSON stub unconditionally"
      rationale: "Deterministic mock is easier to test and immune to future prompt keyword changes"
    - id: "outlet-context-type-location"
      issue: "Where should AppOutletContext type live?"
      options:
        - "Dedicated src/frontend/src/components/layout/OutletContext.ts"
        - "Inline type in MainLayout.tsx and re-export"
      default: "Dedicated OutletContext.ts"
      rationale: "Explicit shared type prevents ToolsPage from needing to import from a layout component"

scope_expansion_recommended: false
critical_issues:
  - "GAP-CRIT-1: LlmModule not imported in comparison.module.ts — app crashes"
  - "GAP-CRIT-2: PromptBuilderService not in providers in comparison.module.ts — app crashes"
  - "GAP-HIGH-5: frontend types/comparison.ts is a 3-field stub — TypeScript provides no guidance for new fields"
  - "GAP-HIGH-6: ComparisonResult.tsx renders only summary text — tabbed feature grid completely absent"
  - "GAP-NEW-1: tabs.tsx not installed — blocks ComparisonResult.tsx rewrite"
  - "GAP-LOW-1: all 5 comparison service tests failing — no regression baseline"
```
