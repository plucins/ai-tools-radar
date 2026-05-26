# Implementation Plan: Comparison Feature — Full End-to-End (Epics #5/#6/#7)

## Overview

- **Total task groups:** 7
- **Total implementation steps:** ~42
- **Expected tests:** 21 new tests across 3 spec files
- **Critical pre-check:** shadcn/ui `tabs` and `table` are NOT installed (must install before Group 5)

---

## Prerequisite Checks

Before starting any group, verify current state:

```bash
# Backend: confirm 5 failing tests (DI errors)
cd src/backend && npx jest comparison.service.spec.ts --no-coverage 2>&1 | tail -20

# Frontend: confirm missing shadcn/ui components
ls src/frontend/src/components/ui/tabs.tsx   # should NOT exist
ls src/frontend/src/components/ui/table.tsx  # should NOT exist
```

---

## Implementation Steps

---

### Task Group 1: Backend — DI Fix + Data Model
**Dependencies:** None (start here)
**Files:** `comparison.module.ts`, `comparison.service.ts`, `comparison.controller.ts`
**Estimated Steps:** 8

- [x] 1.0 Complete backend core layer (module wiring + new data model)

  - [x] 1.1 Write 5 focused tests in `comparison.service.spec.ts` — these verify the new shape
    - Rewrite the `TestingModule` setup: add `LlmService` mock with `jest.fn()` for `complete()`; add `PromptBuilderService` mock with `jest.fn()` for `buildComparisonMessages()`; keep `ToolsService` mock
    - Test N-1: `compare()` returns `result.tools` equal to input `toolIds`
    - Test N-4: `compare()` sets `result.generatedAt` as ISO 8601 string (server-side, not from LLM)
    - Test N-3: `compare()` returns `result.toolSummaries.length` equal to `toolIds.length`
    - Test N-9: `compare()` calls `buildFallback` when LLM returns malformed JSON → `result.sections === []`
    - Test N-10: `compare()` does not throw when LLM returns empty string
    - Run: `cd src/backend && npx jest comparison.service.spec.ts --no-coverage` — expect all 5 to **fail** (red gate)

  - [x] 1.2 Fix `comparison.module.ts` — add missing DI wiring
    - Add `import { LlmModule } from '../llm/llm.module';`
    - Add `import { PromptBuilderService } from './prompt.builder';`
    - Add `LlmModule` to `imports: [ToolsModule, LlmModule]`
    - Add `PromptBuilderService` to `providers: [ComparisonService, PromptBuilderService]`

  - [x] 1.3 Replace backend interfaces in `comparison.service.ts` (lines 7–34)
    - Remove: `ComparedTool`, `CriterionRating`, `Criterion`, `ComparisonResult` (old)
    - Add: `FeatureValue`, `FeatureRow`, `ComparisonSection`, `ToolSummary`, `ComparisonResult` (new — from spec TypeScript Interfaces section)
    - Interfaces use semicolons; no numeric score fields anywhere

  - [x] 1.4 Rewrite `parseAndValidateLlmResponse()` in `comparison.service.ts`
    - New signature: `parseAndValidateLlmResponse(raw: string, toolMeta: Map<string, {id: string; name: string}>, toolIds: string[]): ComparisonResult`
    - Strip markdown fences (`` ```json `` / `` ``` ``)
    - `JSON.parse()` stripped text; on failure → `buildFallback(raw, toolIds, toolMeta)`
    - Type-guard `summary: string` and `recommendation: string`; on missing → `buildFallback`
    - Map `toolSummaries[]`: server overrides `toolId`/`toolName` from `toolMeta`; LLM entry looked up by `toolId` match; default empty strings if missing
    - Map `sections[]` → `features[]` → `values[]`; filter `values` to only `toolIds` known server-side (drop phantom toolIds)
    - Set `tools: toolIds` and `generatedAt: new Date().toISOString()` server-side
    - Remove helpers: `clampScore()` and `extractStringArray()` (no longer needed)

  - [x] 1.5 Rewrite `buildFallback()` in `comparison.service.ts`
    - New signature: `buildFallback(rawText: string, toolIds: string[], toolMeta: Map<string, {id: string; name: string}>): ComparisonResult`
    - Returns: `{ tools: toolIds, summary: rawText.slice(0, 500), recommendation: 'Could not extract structured recommendation.', generatedAt: new Date().toISOString(), toolSummaries: toolIds.map(id => ({ toolId: toolMeta.get(id)!.id, toolName: toolMeta.get(id)!.name, bestFor: '', notIdealFor: '', keyDifferentiators: [] })), sections: [] }`
    - Keep `this.logger.warn(...)` call

  - [x] 1.6 Update `compare()` method to use new `toolMeta: Map` and call updated signatures
    - Build `toolMeta` as `Map<string, {id, name}>` from resolved `Tool[]`
    - Pass `toolMeta` to `parseAndValidateLlmResponse()` and `buildFallback()` (new signature)
    - Ensure `await` is present on `llmService.complete()`

  - [x] 1.7 Add `async` keyword to `comparison.controller.ts`
    - Change: `compare(@Body() dto: CompareToolsDto)` → `async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult>`
    - Add `import { ComparisonResult } from './comparison.service'` if not already imported

  - [x] 1.8 Run Group 1 tests — expect green
    - `cd src/backend && npx jest comparison.service.spec.ts --no-coverage`
    - All 5 tests must pass (N-1, N-3, N-4, N-9, N-10)

**Acceptance Criteria:**
- All 5 tests in `comparison.service.spec.ts` pass
- `comparison.module.ts` imports `LlmModule` and registers `PromptBuilderService`
- `comparison.service.ts` exports the 5 new interfaces; no `score`, `clampScore`, `comparedTools`, or `criteria` references remain
- `comparison.controller.ts` has `async compare()`

---

### Task Group 2: Backend — Prompt + LLM Mock Fix
**Dependencies:** Group 1 (interfaces must exist before prompt references them)
**Files:** `prompt.builder.ts`, `llm.service.ts`
**Estimated Steps:** 5

- [x] 2.0 Complete prompt rewrite and LLM mock fix

  - [x] 2.1 Write 5 focused tests in `prompt.builder.spec.ts` (CREATE new file)
    - File: `src/backend/src/comparison/prompt.builder.spec.ts`
    - Setup: instantiate `PromptBuilderService` directly (no NestJS `TestingModule` needed — no injected deps)
    - Test P-1: returns exactly 2 messages with roles `"system"` and `"user"`
    - Test P-2: system message content includes each toolId from input
    - Test P-3: user message content includes each tool's `name` and `id`
    - Test P-4: tool with 10,000-char content → user message content for that tool is ≤3,000 chars
    - Test P-5: tool content with `` ```yaml\nname: "foo"\n``` `` prefix → output does NOT contain `name: "foo"` (YAML stripped)
    - Run: `cd src/backend && npx jest prompt.builder.spec.ts --no-coverage` — expect all 5 to **fail** (red gate; file doesn't exist yet)

  - [x] 2.2 Rewrite system prompt in `prompt.builder.ts`
    - **Preserve unchanged**: `extractRelevantContent()` private method (YAML stripping + 3000-char truncation)
    - **Preserve unchanged**: `buildComparisonMessages(tools: Tool[])` signature and `toolSections` construction
    - **Rewrite**: system message `content` string to match the template from the LLM Prompt Design section of the spec:
      - Instruct: respond with ONLY valid JSON, parseable by `JSON.parse()`
      - Include full OUTPUT SCHEMA: `summary`, `recommendation`, `toolSummaries[]` (with `bestFor`, `notIdealFor`, `keyDifferentiators[]`), `sections[]` (with `id`, `title`, `summary`, `features[]`, each feature has `name`, `description`, `values[]` with `toolId`, `available: boolean`, `description`)
      - Embed `toolIds.join(' | ')` in schema annotations and `toolIds.join(', ')` in RULES
      - Include all 9 RULES exactly as specified (no numeric scores; 4 base sections; 5-10 feature rows; etc.)
    - Update user message to use `### ${tool.name} (toolId: ${tool.id})` header format

  - [x] 2.3 Fix `mockComplete()` in `llm.service.ts`
    - Remove the string-sniffing `if` condition (`systemContent.includes('"comparedTools"')`)
    - Return hardcoded new-model JSON stub **unconditionally** for all mock-mode calls
    - Stub must include:
      - `summary`: non-empty string
      - `recommendation`: non-empty string
      - `toolSummaries`: 2 entries with placeholder `toolId` values (e.g. `"tool-a"`, `"tool-b"`) — server will override
      - `sections`: 4 entries with static IDs `"features"`, `"pricing"`, `"integrations"`, `"limitations"`, each with `title`, `summary`, and at least 2 `features[]` entries with `values[]`
      - No `comparedTools` or `criteria` keys

  - [x] 2.4 Run Group 2 tests — expect green
    - `cd src/backend && npx jest prompt.builder.spec.ts --no-coverage`
    - All 5 P-1…P-5 tests must pass

  - [x] 2.5 Smoke-test full backend stack in mock mode
    - `cd src/backend && npx jest comparison.service.spec.ts prompt.builder.spec.ts --no-coverage`
    - All 10 tests (5 + 5) must pass

**Acceptance Criteria:**
- All 5 tests in `prompt.builder.spec.ts` pass
- `prompt.builder.ts` system prompt references `sections[]`, `toolSummaries[]`, `available: boolean`; no `comparedTools`, `criteria`, or `score` references
- `llm.service.ts` `mockComplete()` returns new-model JSON stub with `sections` and `toolSummaries` keys unconditionally

---

### Task Group 3: Backend — LLM Service Tests
**Dependencies:** Group 2 (llm.service.ts must have new mockComplete before writing tests against it)
**Files:** `src/backend/src/llm/llm.service.spec.ts` (CREATE)
**Estimated Steps:** 4

- [x] 3.0 Create LLM service test file

  - [x] 3.1 Write 5 focused tests in `llm.service.spec.ts` (CREATE new file)
    - File: `src/backend/src/llm/llm.service.spec.ts`
    - Setup: `TestingModule` with `ConfigService` mock; configure mock to return `'mock'` for `ollama.mode`
    - Test L-1: mock mode → `JSON.parse(result.text)` has `sections` and `toolSummaries` keys; no `comparedTools` key
    - Test L-2: mock mode → `typeof result.text === 'string'` for arbitrary messages input (no throw)
    - Test L-3: ollama mode → verify `axios.post` called with URL containing configured `OLLAMA_BASE_URL` (mock axios with `jest.spyOn(axios, 'post')`)
    - Test L-4: ollama mode + API key set → axios called with `Authorization: Bearer <key>` header
    - Test L-5: ollama mode → when axios mock rejects, `service.complete()` rejects with the same error

  - [x] 3.2 Run Group 3 tests — expect green
    - `cd src/backend && npx jest llm.service.spec.ts --no-coverage`
    - All 5 L-1…L-5 tests must pass

  - [x] 3.3 Confirm no regressions in Groups 1–2
    - `cd src/backend && npx jest comparison.service.spec.ts prompt.builder.spec.ts llm.service.spec.ts --no-coverage`
    - All 15 tests pass

**Acceptance Criteria:**
- All 5 tests in `llm.service.spec.ts` pass
- Cumulative count: 15 backend tests passing

---

### Task Group 4: Frontend — Types + OutletContext
**Dependencies:** Group 1 (backend interfaces define the canonical shape; mirror to frontend)
**Files:** `src/frontend/src/types/comparison.ts`, `src/frontend/src/components/layout/OutletContext.ts` (CREATE)
**Estimated Steps:** 4

- [x] 4.0 Complete frontend type layer

  - [x] 4.1 Replace `src/frontend/src/types/comparison.ts` entirely
    - Remove all existing content (9-line stub)
    - Paste the 6-interface frontend model verbatim from the spec "Frontend — `types/comparison.ts`" section
    - Interfaces: `ComparisonRequest` (add `model?: string`), `FeatureValue`, `FeatureRow`, `ComparisonSection`, `ToolSummary`, `ComparisonResult` (add `toolSummaries`, `sections`; no `comparedTools`/`criteria`)
    - No semicolons in TSX/TS frontend files; use JSDoc comments as specified

  - [x] 4.2 Create `src/frontend/src/components/layout/OutletContext.ts`
    - New file — does NOT exist yet
    - Content:
      ```typescript
      export interface AppOutletContext {
        selectedModel: string
        onModelChange: (model: string) => void
      }
      ```
    - Named export only; no default export

  - [x] 4.3 Verify TypeScript compilation is clean
    - `cd src/frontend && npx tsc --noEmit 2>&1 | head -30`
    - Should show 0 errors related to `comparison.ts` or `OutletContext.ts` (other unrelated errors acceptable at this stage)

  - [x] 4.4 Verify `api.ts` auto-picks up `model?` field
    - `grep -n "ComparisonRequest\|comparison.compare" src/frontend/src/lib/api.ts`
    - Confirm the call site uses `ComparisonRequest` type — no `api.ts` changes needed (types update propagates automatically)

**Acceptance Criteria:**
- `types/comparison.ts` contains all 6 interfaces; no `score`, `comparedTools`, or `criteria` references
- `OutletContext.ts` exists and exports `AppOutletContext` interface
- `tsc --noEmit` shows no errors in the two new/changed files

---

### Task Group 5: Frontend — State Lift + shadcn/ui Prerequisites
**Dependencies:** Group 4 (OutletContext.ts must exist before MainLayout and ToolsPage can import it)
**Files:** `MainLayout.tsx`, `Sidebar.tsx`, `ToolsPage.tsx`; shadcn/ui `tabs` and `table` install
**Estimated Steps:** 7

- [x] 5.0 Complete frontend state layer + install missing UI primitives

  - [x] 5.1 Install missing shadcn/ui components (PREREQUISITE for Group 6)
    - `cd src/frontend && npx shadcn@latest add tabs` — installs `src/components/ui/tabs.tsx`
    - `cd src/frontend && npx shadcn@latest add table` — installs `src/components/ui/table.tsx`
    - Verify: `ls src/frontend/src/components/ui/tabs.tsx src/frontend/src/components/ui/table.tsx` — both must exist
    - Note: `skeleton`, `card`, `badge`, `alert` are already installed — no action needed

  - [x] 5.2 Convert `Sidebar.tsx` to controlled component
    - Remove: `useState('')` for `selectedModel`
    - Remove: `useModels()` import and call
    - Remove: `useEffect` that sets `selectedModel` from models
    - Add `SidebarProps` interface:
      ```typescript
      interface SidebarProps {
        selectedModel: string
        onModelChange: (model: string) => void
        models: ModelInfo[]
        loading: boolean
      }
      ```
    - Import `ModelInfo` from `@/hooks/useModels` (or wherever the type is exported)
    - Accept `{ selectedModel, onModelChange, models, loading }` props in function signature
    - Pass them through to `<SidebarModelStatus>` (same props it already receives)

  - [x] 5.3 Lift state to `MainLayout.tsx`
    - Add imports: `useState` from `react`; `useModels` from `@/hooks/useModels`; `AppOutletContext` from `@/components/layout/OutletContext`
    - Add inside `MainLayout()`:
      - `const { models, loading } = useModels()`
      - `const [selectedModel, setSelectedModel] = useState('')`
    - Pass props to `<Sidebar>`: `selectedModel={selectedModel}` `onModelChange={setSelectedModel}` `models={models}` `loading={loading}`
    - Change `<Outlet />` to `<Outlet context={{ selectedModel, onModelChange: setSelectedModel } satisfies AppOutletContext} />`

  - [x] 5.4 Wire `selectedModel` in `ToolsPage.tsx`
    - Add import: `useOutletContext` from `'react-router-dom'`
    - Add import: `AppOutletContext` from `'@/components/layout/OutletContext'`
    - Add inside `ToolsPage()` (after existing `useState` calls):
      `const { selectedModel } = useOutletContext<AppOutletContext>()`
    - Update `handleCompare` API call:
      ```typescript
      const result = await api.comparison.compare({
        toolIds: [...selectedIds],
        model: selectedModel || undefined,
      })
      ```

  - [x] 5.5 Verify TypeScript compilation clean
    - `cd src/frontend && npx tsc --noEmit 2>&1 | head -30`
    - Zero errors in `MainLayout.tsx`, `Sidebar.tsx`, `ToolsPage.tsx`

  - [x] 5.6 Verify `useModels` hook is not duplicated
    - `grep -rn "useModels" src/frontend/src/` — should appear in `MainLayout.tsx` only (not in `Sidebar.tsx`)

**Acceptance Criteria:**
- `tabs.tsx` and `table.tsx` exist in `src/frontend/src/components/ui/`
- `Sidebar.tsx` has no `useState`, no `useModels`, no `useEffect` — props-only
- `MainLayout.tsx` owns `selectedModel` state and passes context to `<Outlet>`
- `ToolsPage.tsx` reads `selectedModel` via `useOutletContext` and passes it in the API call
- `tsc --noEmit` clean across the 3 modified files

---

### Task Group 6: Frontend — New UI Components
**Dependencies:** Groups 4 + 5 (types must exist; shadcn/ui tabs + table must be installed)
**Files:** `FeatureTable.tsx` (CREATE), `ToolSummaryCard.tsx` (CREATE), `ComparisonResult.tsx` (REWRITE)
**Estimated Steps:** 7

- [x] 6.0 Complete frontend UI layer

  - [x] 6.1 Create `src/frontend/src/components/comparison/FeatureTable.tsx`
    - Props: `interface FeatureTableProps { section: ComparisonSection; toolSummaries: ToolSummary[] }`
    - Imports: shadcn/ui `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow` from `@/components/ui/table`; `CheckCircle2`, `XCircle` from `lucide-react`; types from `@/types/comparison`
    - Header row: `<TableHead>Feature</TableHead>` + one `<TableHead>` per `toolSummaries` entry (use `toolName`)
    - Body rows: one per `section.features` entry; first cell = feature `name` + optional `description` in `text-xs text-muted-foreground`; remaining cells = one per `row.values` entry (icon + description)
    - Available icon: `<CheckCircle2 className="h-4 w-4 text-green-500 shadow-[0_0_6px_#10B981] mb-1" />`
    - Unavailable icon: `<XCircle className="h-4 w-4 text-muted-foreground mb-1" />`
    - Empty state: when `section.features.length === 0`, render `<p className="text-muted-foreground text-sm py-4">No feature data available for this section.</p>`
    - Named export: `export function FeatureTable(...)`

  - [x] 6.2 Create `src/frontend/src/components/comparison/ToolSummaryCard.tsx`
    - Props: `interface ToolSummaryCardProps { summary: ToolSummary }`
    - Imports: `Card`, `CardContent`, `CardHeader`, `CardTitle` from `@/components/ui/card`; `Badge` from `@/components/ui/badge`; `ToolSummary` from `@/types/comparison`
    - Card: `<Card className="bg-card/60 backdrop-blur-sm border-border/50 rounded-2xl">`
    - Three sections: `bestFor` (label: "BEST FOR"), `notIdealFor` (label: "NOT IDEAL FOR"), `keyDifferentiators` (label: "KEY DIFFERENTIATORS" — renders as `Badge` chips with `border border-primary/30 bg-primary/15 text-primary rounded-full text-xs`)
    - Named export: `export function ToolSummaryCard(...)`
    - Reference: `ToolCard.tsx` glassmorphism pattern for CSS class precedents

  - [x] 6.3 Rewrite `src/frontend/src/components/comparison/ComparisonResult.tsx`
    - Props: `interface ComparisonResultProps { result: ComparisonResult }`
    - Imports: `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger` from `@/components/ui/tabs`; `Alert`, `AlertDescription` from `@/components/ui/alert`; `Skeleton` from `@/components/ui/skeleton`; `FeatureTable`, `ToolSummaryCard`; `ComparisonResult` type from `@/types/comparison`
    - Layout (top to bottom):
      1. Loading skeleton — `<Skeleton>` during initial mount
      2. Recommendation callout — `<Alert>` with `result.recommendation`
      3. Summary prose — `<p>{result.summary}</p>`
      4. ToolSummaryCard grid — `result.toolSummaries.map(s => <ToolSummaryCard key={s.toolId} summary={s} />)` in flex/grid
      5. Tabbed sections — `<Tabs defaultValue={result.sections[0]?.id}>` with `TabsList` + `TabsTrigger` per section + `TabsContent` per section containing optional `section.summary` and `<FeatureTable section={section} toolSummaries={result.toolSummaries} />`
      6. Fallback warning banner — rendered when `result.sections.length === 0`: `<Alert>` (warning variant) with message: `"Structured comparison data could not be generated. The summary above contains the LLM's raw output."`
      7. Footer — `<p className="text-xs text-muted-foreground">Generated at {new Date(result.generatedAt).toLocaleString()}</p>`
    - Named export: `export function ComparisonResult(...)`

  - [x] 6.4 Verify TypeScript compilation clean
    - `cd src/frontend && npx tsc --noEmit 2>&1 | head -30`
    - Zero errors in the 3 new/rewritten components

  - [x] 6.5 Verify no orphan imports
    - `grep -n "comparedTools\|criteria\|score" src/frontend/src/components/comparison/ComparisonResult.tsx` — must return 0 matches
    - `grep -n "comparedTools\|criteria" src/frontend/src/types/comparison.ts` — must return 0 matches

**Acceptance Criteria:**
- `FeatureTable.tsx` renders shadcn/ui Table with tool-name headers, feature rows, ✓/✗ icons
- `ToolSummaryCard.tsx` renders Card with `bestFor`, `notIdealFor`, `keyDifferentiators` as Badge chips
- `ComparisonResult.tsx` renders tabbed layout with all 7 elements; fallback banner shown when `sections === []`
- `tsc --noEmit` clean across all 3 files

---

### Task Group 7: Test Review & Gap Analysis
**Dependencies:** All previous groups (Groups 1–6)
**Files:** `comparison.service.spec.ts` (expand), `prompt.builder.spec.ts` (verify)
**Estimated Steps:** 5

- [x] 7.0 Review and fill critical test gaps

  - [x] 7.1 Expand `comparison.service.spec.ts` with remaining 5 tests (N-2, N-5, N-6, N-7, N-8)
    - Test N-2: `result.sections.map(s => s.id)` includes all 4 static section IDs (`"features"`, `"pricing"`, `"integrations"`, `"limitations"`) when LLM mock returns valid JSON
    - Test N-5: `result.recommendation` equals the value from the LLM mock JSON output
    - Test N-6: `result.summary` equals the value from the LLM mock JSON output
    - Test N-7: `result.toolSummaries[0].toolId` equals the server-side `toolMeta` value even when LLM JSON has a different `toolId` for that entry
    - Test N-8: `result.sections[0].features[0].values` contains no entries with `toolId` not in the input `toolIds` array (phantom toolId filtered out)
    - Run: `cd src/backend && npx jest comparison.service.spec.ts --no-coverage` — all 10 N-1…N-10 must pass

  - [x] 7.2 Verify `prompt.builder.spec.ts` — add P-6 if not already present
    - Test P-6: calling `buildComparisonMessages` with a tool that has `content: undefined` does not throw
    - Run: `cd src/backend && npx jest prompt.builder.spec.ts --no-coverage` — all 6 P-1…P-6 pass (5 existing + 1 new = 6 total)

  - [x] 7.3 Run full backend test suite (final gate)
    - `cd src/backend && npx jest --no-coverage`
    - All 21 backend tests pass (10 comparison.service + 6 prompt.builder + 5 llm.service)
    - Zero regressions in any other test files

  - [x] 7.4 Run full frontend TypeScript check (final gate)
    - `cd src/frontend && npx tsc --noEmit`
    - Zero TypeScript errors in the entire frontend

  - [x] 7.5 Manual smoke test in mock mode
    - Start backend: `cd src/backend && npm run start:dev` (LLM_MODE=mock default)
    - Start frontend: `cd src/frontend && npm run dev`
    - Select 2 tools on ToolsPage → click Compare → verify `/compare` renders with tabs, ToolSummaryCards, and FeatureTable grids
    - Change model in Sidebar → verify next comparison POST body includes `model` field (check network tab)

**Acceptance Criteria:**
- All 21 backend tests pass (10 + 6 + 5)
- Frontend TypeScript compiles with zero errors
- Full end-to-end flow works in mock mode: 2 tools → compare → tabbed result with sections, summaries, feature grids

---

## Execution Order

| Step | Group | Files | Depends On |
|------|-------|-------|-----------|
| 1 | Backend — DI Fix + Data Model | `comparison.module.ts`, `comparison.service.ts`, `comparison.controller.ts` | None |
| 2 | Backend — Prompt + LLM Mock Fix | `prompt.builder.ts`, `llm.service.ts` | Group 1 |
| 3 | Backend — LLM Service Tests | `llm.service.spec.ts` (CREATE) | Group 2 |
| 4 | Frontend — Types + OutletContext | `types/comparison.ts`, `OutletContext.ts` (CREATE) | Group 1 |
| 5 | Frontend — State Lift + shadcn/ui | `MainLayout.tsx`, `Sidebar.tsx`, `ToolsPage.tsx` | Group 4 |
| 6 | Frontend — New UI Components | `FeatureTable.tsx` (CREATE), `ToolSummaryCard.tsx` (CREATE), `ComparisonResult.tsx` | Groups 4+5 |
| 7 | Test Review & Gap Analysis | Expand `comparison.service.spec.ts`, verify all suites | Groups 1–6 |

> **Parallelisation note**: Groups 3 and 4 can run in parallel after Groups 1 and 2 are complete (3 depends only on 2; 4 depends only on 1). Groups 5 and 6 must be sequential.

---

## Standards Compliance

Follow project standards from `.flowbit/docs/standards/`:

### Global (`global/coding-standards.md`)
- External imports before internal imports in all files
- No `console.log` — use NestJS `Logger` on backend; no logging in frontend components
- No hard-coded URLs — use `ConfigService` / env vars for backend endpoints
- Explicit return types on all public functions

### Backend (`backend/backend-standards.md`)
- `interface` (not `type`) for all exported structural types
- Single quotes, trailing commas (Prettier enforces)
- `async/await` over `.then()` chains
- Relative imports for internal modules (e.g. `'./prompt.builder'`, not `'@/comparison/...'`)
- `strictNullChecks: true` — handle all nullable paths

### Frontend (`frontend/frontend-standards.md`)
- Named exports only (no default exports)
- `interface *Props` naming for component prop interfaces
- shadcn/ui components first (no raw HTML where a primitive exists)
- `@/` path aliases for all internal imports
- No semicolons in `.tsx`/`.ts` frontend files
- Glassmorphic dark theme — `bg-card/60 backdrop-blur-sm border-border/50` for card surfaces
- Tailwind CSS variable tokens only (e.g. `text-muted-foreground`, not raw hex colours)
- Exception: `shadow-[0_0_6px_#10B981]` is permitted as a spec-defined design token override for the green availability glow

### Testing (`testing/testing-standards.md`)
- `@nestjs/testing` `TestingModule` for all NestJS service tests
- `jest.fn()` mocks via `overrideProvider` or `useValue` in `TestingModule`
- AAA structure: Arrange / Act / Assert blocks (comments optional but recommended)
- `it('should <behaviour> when <condition>')` naming convention
- Colocated `.spec.ts` files (same directory as the source file)
- Run only the new test file after each group; full suite only at the end

---

## Notes

- **Test-driven**: Each group writes tests first (red gate), then implements to make them pass (green gate)
- **Run incrementally**: Only run the newly written tests after each group — never the full suite until Group 7
- **Mark progress**: Check off individual steps as completed using the checkboxes above
- **Reuse first**: `extractRelevantContent()` in `prompt.builder.ts` is complete — do NOT rewrite it
- **No e2e changes needed**: `app.e2e-spec.ts` automatically passes once module wiring is fixed in Group 1
- **`ComparisonResultPage.tsx` needs no changes**: It reads `location.state.result` and renders `<ComparisonResult>` — it automatically benefits from the Group 6 rewrite
- **`api.ts` needs no changes**: The `comparison.compare(body: ComparisonRequest)` call picks up `model?` automatically once `types/comparison.ts` is updated in Group 4
- **shadcn/ui install timing**: `tabs` and `table` MUST be installed in Group 5 before `FeatureTable.tsx` and `ComparisonResult.tsx` are written in Group 6
