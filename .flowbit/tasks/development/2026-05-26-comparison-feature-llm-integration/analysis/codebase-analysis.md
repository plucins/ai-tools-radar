Now I have all the data needed. Let me produce the synthesized analysis report.

---

# Codebase Analysis Report

**Date**: 2026-05-26  
**Task**: Implement full end-to-end AI Tools Radar comparison feature (epics #5/#6/#7)  
**Description**: Fix 2 critical DI bugs in comparison.module.ts, replace old score-based ComparisonResult data model with new ComparisonSection/FeatureRow/FeatureValue model (text-based, tab-rendered), rewrite prompt.builder.ts system prompt, lift selectedModel state to MainLayout via React Router Outlet context, rewrite ComparisonResult.tsx as tabbed feature-grid UI, fix/create all tests.  
**Analyzer**: codebase-analyzer skill (3 Explore agents: File Discovery, Code Analysis, Context Discovery)

---

## Summary

The comparison feature has a complete backend orchestration pipeline (Controller → Service → PromptBuilder → LlmService) that is **entirely broken at runtime** due to two NestJS DI wiring bugs in `comparison.module.ts`—`LlmModule` is not imported and `PromptBuilderService` is not registered as a provider—meaning any `POST /comparison` call results in a NestJS dependency resolution error. The backend data model (`ComparedTool`/`Criterion`/`score`) must be wholesale replaced with a new text-based `ComparisonSection`/`FeatureRow`/`FeatureValue` model across five backend files and three frontend files. The frontend has a second class of bugs: `selectedModel` is state-trapped inside `Sidebar.tsx` and never flows to `ToolsPage` or the API call, and `ComparisonResult.tsx` is a 24-line stub that renders only a `<pre>` summary. Every test touching comparison is either failing or missing.

---

## Files Identified

### Primary Files (directly require changes)

**`src/backend/src/comparison/comparison.module.ts`** (11 lines)
- NestJS module wiring for comparison feature
- **Critical**: Missing `LlmModule` in `imports[]` and `PromptBuilderService` in `providers[]`; app crashes on any comparison call

**`src/backend/src/comparison/comparison.service.ts`** (186 lines)
- Core orchestration: resolves tools → builds prompt → calls LLM → parses response → returns result
- Owns old data model interfaces (`ComparedTool`, `Criterion`, `CriterionRating`, `ComparisonResult`) — all must be replaced
- `parseAndValidateLlmResponse()` validates against old schema; `buildFallback()` produces old-model fallback — both need full rewrites

**`src/backend/src/comparison/prompt.builder.ts`** (71 lines)
- Builds `ChatMessage[]` for LLM calls
- System prompt hardcodes old JSON schema (`comparedTools`, `criteria`, `score` 1–10)
- `extractRelevantContent()` utility (strips YAML frontmatter, truncates at 3000 chars) is reusable and should be preserved

**`src/frontend/src/types/comparison.ts`** (9 lines)
- Type stub only — missing `model?: string` on `ComparisonRequest`, missing all new model fields on `ComparisonResult` (`recommendation`, `toolSummaries[]`, `sections[]`)
- Every consumer depends on this file; changing it cascades to 4 other files

**`src/frontend/src/components/comparison/ComparisonResult.tsx`** (24 lines)
- Renders only `<pre>{result.summary}</pre>` — no tabs, no feature grid, no tool summary cards, no recommendation callout
- Full rewrite required as tabbed feature-grid UI

**`src/frontend/src/components/layout/MainLayout.tsx`** (14 lines)
- Currently a pure shell: `<Sidebar /> + <Outlet />`
- Must be extended to manage `selectedModel` state and pass it to child routes via React Router `Outlet context`

**`src/frontend/src/components/layout/Sidebar.tsx`** (35 lines)
- Currently owns `selectedModel` useState — state must move to `MainLayout`
- After lift: Sidebar receives `selectedModel`/`onModelChange` as props via context

**`src/frontend/src/routes/ToolsPage.tsx`** (161 lines)
- `handleCompare()` calls `api.comparison.compare({ toolIds: [...selectedIds] })` — never passes `model`
- Must read `selectedModel` from Outlet context and pass it in the request

**`src/backend/src/comparison/comparison.service.spec.ts`** (138 lines)
- 5 tests ALL FAILING for two reasons: (1) missing `LlmService` + `PromptBuilderService` mocks in `TestingModule`, (2) tests call `service.compare(dto)` **synchronously** (no `await`) — the service is `async`
- All 5 test cases exercise the OLD model (checking `comparedTools`, `criteria`, `score`) — all must be rewritten

### Related Files (require updates or are important consumers)

**`src/backend/src/comparison/comparison.controller.ts`** (13 lines)
- `compare(@Body() dto)` is missing the `async` keyword — not a runtime bug (NestJS handles Promise returns correctly) but a code quality/consistency issue that should be fixed

**`src/backend/src/llm/llm.service.ts`** (94 lines)
- `mockComplete()` sniffs for `"comparedTools"` in the system prompt to decide whether to return structured mock JSON; when the system prompt is rewritten this heuristic will break — mock mode will silently fall back to a plain-text response, causing `parseAndValidateLlmResponse` to call `buildFallback` every time in mock mode

**`src/frontend/src/routes/ComparisonResultPage.tsx`** (31 lines)
- Consumes `ComparisonResult` type from location state and renders `<ComparisonResult result={result} />`
- No logic change needed — will automatically benefit from the ComparisonResult.tsx rewrite

**`src/frontend/src/lib/api.ts`** (46 lines)
- `api.comparison.compare(body: ComparisonRequest)` — complete and correct; will automatically pick up the `model` field once `ComparisonRequest` type is updated; no code change needed

**`src/backend/src/llm/llm.module.ts`** (8 lines)
- Correctly exports `LlmService`; no changes needed — just needs to be imported in `comparison.module.ts`

**`src/backend/src/tools/tools.module.ts`** (10 lines)
- Already imported by `comparison.module.ts` correctly; no changes needed

**`src/frontend/src/components/comparison/ComparisonPanel.tsx`** (160 lines)
- Comparison progress UI (3 stages: gathering → comparing → generating); independent of data model; no changes needed

---

## Current Functionality

### Backend Pipeline (broken by DI)

```
POST /comparison
  → ComparisonController.compare(dto)
      → ComparisonService.compare(dto)                    [async]
          → toolsService.findOne(id) × N                  [sync, throws NotFoundException]
          → promptBuilder.buildComparisonMessages(tools)  [❌ NOT IN MODULE]
          → llmService.complete({ messages, model })      [❌ NOT IN MODULE]
          → parseAndValidateLlmResponse(text, ids, meta)  [validates OLD schema]
          → returns ComparisonResult (OLD model)
```

**DI Dependency Chain — annotated:**

```
AppModule
  └── ComparisonModule
        imports:   [ToolsModule ✅]          ← LlmModule ❌ MISSING
        providers: [ComparisonService ✅]    ← PromptBuilderService ❌ MISSING
        └── ComparisonService needs:
              ToolsService      ← resolved via ToolsModule ✅
              LlmService        ← UNRESOLVABLE: LlmModule not imported ❌
              PromptBuilderService ← UNRESOLVABLE: not a provider ❌
```

**Error at startup**: `Nest can't resolve dependencies of ComparisonService (ToolsService, ?, PromptBuilderService). LlmService at index [1] not available in RootTestModule.`

### Frontend State Flow (broken by isolation)

```
MainLayout               [no state]
  ├── Sidebar            [owns selectedModel ← TRAPPED HERE]
  │     └── SidebarModelStatus (Select component)
  └── Outlet
        ├── ToolsPage    [calls compare({toolIds}) ← NO model field]
        └── ComparisonResultPage
              └── ComparisonResult  [renders <pre>summary</pre> only]
```

### LLM Mock Mode (will break on schema change)

`llm.service.ts` `mockComplete()` uses a string-sniff:
```typescript
if (systemContent.includes('"summary"') && systemContent.includes('"comparedTools"'))
```
When prompt.builder.ts system prompt is rewritten to the new schema (dropping `"comparedTools"`), this condition evaluates `false`, mock mode returns a plain-text string, `parseAndValidateLlmResponse` fails JSON parsing, and `buildFallback` is called every time. The sniff must be updated to match the new schema keywords.

### Key Components/Functions

| Component | Role | Status |
|-----------|------|--------|
| `comparison.module.ts` | DI wiring | ❌ Broken (2 bugs) |
| `ComparisonService.compare()` | Orchestration | ❌ Broken (DI crash) |
| `ComparisonService.parseAndValidateLlmResponse()` | Schema validation | ⚠️ Old model |
| `ComparisonService.buildFallback()` | Error fallback | ⚠️ Old model |
| `PromptBuilderService.buildComparisonMessages()` | Prompt assembly | ⚠️ Old schema |
| `PromptBuilderService.extractRelevantContent()` | Content util | ✅ Reusable |
| `LlmService.complete()` | LLM client | ✅ Complete |
| `LlmService.mockComplete()` | Dev mock | ⚠️ Schema-sniff will break |
| `ComparisonResult.tsx` | Result UI | ❌ Stub (summary only) |
| `MainLayout.tsx` | State lift target | ⚠️ No state |
| `Sidebar.tsx` | Model select | ⚠️ State trapped |
| `ToolsPage.handleCompare()` | API trigger | ⚠️ No model passed |

---

## Dependencies

### Backend Imports (comparison feature)

| Dependency | Purpose | Status |
|-----------|---------|--------|
| `@nestjs/common` | DI decorators, Logger, NotFoundException | ✅ |
| `@nestjs/config` | ConfigService in LlmService | ✅ |
| `ToolsService` (ToolsModule) | `findOne(id)` | ✅ wired |
| `LlmService` (LlmModule) | `complete(request)` | ❌ not wired |
| `PromptBuilderService` | `buildComparisonMessages(tools)` | ❌ not provided |
| `axios` | HTTP client in LlmService | ✅ |
| `class-validator` | DTO validation on CompareToolsDto | ✅ |

### Frontend Imports (comparison feature)

| Dependency | Purpose | Status |
|-----------|---------|--------|
| `react-router-dom` Outlet context | selectedModel lift | ❌ not yet used |
| `useModels` hook | Fetch model list | ✅ (in Sidebar) |
| `api.comparison.compare()` | POST /comparison | ✅ (but no model) |
| `shadcn/ui Tabs` | Tabbed result UI | ❌ **component not installed** |
| `shadcn/ui Card, Badge, Separator` | Result cards | ✅ available |

### Consumers (what depends on comparison)

| File | Dependency | Impact |
|------|-----------|--------|
| `ToolsPage.tsx` | calls `api.comparison.compare()` | Model field needed |
| `ComparisonResultPage.tsx` | renders `<ComparisonResult result={result} />` | Auto-inherits fix |
| `ComparisonResult.tsx` | consumes `ComparisonResult` type | Full rewrite |
| `api.ts` | imports `ComparisonRequest`, `ComparisonResult` types | Type-only update |
| `comparison.service.spec.ts` | tests `ComparisonService` | Full rewrite |

**Consumer Count**: 5 files  
**Impact Scope**: High — type change at `src/frontend/src/types/comparison.ts` cascades to all 5

---

## Test Coverage

### Existing Test Files

| File | Tests | Status |
|------|-------|--------|
| `comparison.service.spec.ts` | 5 | ❌ ALL FAILING |
| `tools.service.spec.ts` | 8 | ✅ Passing (unrelated) |
| `app.e2e-spec.ts` | 1 | ✅ Health check only |
| `prompt.builder.spec.ts` | — | ❌ Does not exist |
| `llm.service.spec.ts` | — | ❌ Does not exist |
| Frontend tests | — | ❌ None exist |

### Root Cause of comparison.service.spec.ts Failures

**Failure 1 — Missing mocks** (`beforeEach`):
```typescript
// Only mocks ToolsService + ConfigService
// Missing: LlmService mock, PromptBuilderService mock
providers: [
  ComparisonService,
  { provide: ToolsService, useValue: mockToolsService },
  { provide: ConfigService, useValue: mockConfigService },
  // ← LlmService missing → Nest can't resolve index [1]
  // ← PromptBuilderService missing → Nest can't resolve index [2]
]
```

**Failure 2 — Synchronous calls on async method**:
```typescript
const result = service.compare(dto)  // ← no await; returns Promise, not ComparisonResult
expect(result.tools).toEqual([...])  // ← always fails; result is a Promise object
```

**Failure 3 — Old model assertions** (all 5 tests check `summary` string containing tool names via a `buildMockSummary()` that no longer exists in the service, and expect fields like `comparedTools`, `score`).

### Coverage Gaps

- Zero test coverage for `PromptBuilderService`
- Zero test coverage for `LlmService` (mock mode and live mode)
- Zero test coverage for frontend components
- No e2e test for `POST /comparison` endpoint
- No test for DI wiring (module would catch it if a module-level test existed)

---

## Coding Patterns

### Naming Conventions

- **Backend services**: `PascalCaseService`, `camelCase` methods
- **Backend DTOs**: `CompareToolsDto`, class-validator decorators
- **Frontend components**: `PascalCase.tsx`, named exports
- **Frontend hooks**: `useModels`, `useEffect`/`useState` pattern
- **Types files**: flat interface declarations, `export interface`

### Architecture Patterns

- **Backend**: NestJS module-scoped DI; `@Injectable()` + constructor injection; `async/await`; `private readonly` for injected services; `Logger` for structured logging; private helper methods
- **Frontend**: React functional components; `react-router-dom` with nested routes and `Outlet`; `shadcn/ui` component library; `useState`/`useEffect` for local state; `useContext`/Outlet context for cross-cutting state
- **API layer**: `ApiEnvelope<T>` wrapper — all responses have `{ data: T, timestamp: string }`; single `request<T>()` fetch helper in `api.ts`
- **LLM integration**: OpenAI-compatible API format (`/v1/chat/completions`); mock mode via `LLM_MODE=mock` env var; Bearer token auth; configurable model per request

---

## Complexity Assessment

| Factor | Value | Level |
|--------|-------|-------|
| File Size (largest: comparison.service.ts) | 186 lines | Low |
| Backend files to change | 4 core + 2 supporting | Medium |
| Frontend files to change | 5 (types, 2 layout, 1 component, 1 route) | Medium |
| Dependencies (comparison chain) | 3 injected services | Low |
| Consumers of types/comparison.ts | 5 files | Medium |
| Test files to fix/create | 4 (1 rewrite + 3 create) | Medium |
| Shadcn/ui components to install | 1 (Tabs) | Low |

### Overall: **Moderate**

The task decomposes cleanly into 6 independent work streams (DI fix, data model, prompt, state lift, UI, tests) with well-understood interfaces at each boundary. No circular dependencies, no shared mutable state, no database migrations. The main risk is the cascading type change — `ComparisonResult` in `types/comparison.ts` is the single source of truth for 5 consumer files and the LLM JSON schema simultaneously.

---

## Key Findings

### Strengths

- **Backend pipeline is architecturally sound**: the Controller → Service → PromptBuilder → LlmService chain is correct; only wiring is broken
- **LlmService is production-ready**: complete mock + live modes, Bearer auth, configurable timeout, proper error handling
- **`extractRelevantContent()` is well-implemented**: YAML frontmatter stripping + 3000-char truncation is reusable as-is
- **`api.ts` is complete**: `ApiEnvelope` unwrapping, `CompareToolsDto.model?` field exists — just needs the type updated
- **React Router nested routes already configured**: `App.tsx` has `<Outlet />` wiring in place — Outlet context is a one-file change to `MainLayout.tsx`
- **shadcn/ui already in use**: Card, Badge, Button, Separator all available for the new feature grid UI

### Concerns

- **`tabs.tsx` is NOT installed** — the agent findings listed Tabs as available, but the actual `/components/ui/` directory has no `tabs.tsx`; this must be added before `ComparisonResult.tsx` can be rewritten
- **`llm.service.ts` mock will silently break** when the system prompt changes — `mockComplete()` sniffs for `"comparedTools"` which won't appear in the new prompt; mock mode will return a plain-text string instead of JSON, causing every dev-mode test to hit the fallback path
- **Tests are sync on an async service** — all 5 spec tests call `service.compare(dto)` without `await`; even after fixing the mock wiring, the assertions will fail unless `await` is added
- **`comparison.controller.ts` is missing `async`** — minor code quality issue; NestJS handles Promise returns from non-async methods, but it's inconsistent with the rest of the codebase
- **`ToolsPage.tsx` has no access to `selectedModel`** until the state lift is done — attempting to test the full flow before that lift will always send `model: undefined`

### Opportunities

- **New data model is more LLM-friendly**: replacing numeric scores with text-based `FeatureValue` removes a class of hallucination errors where LLMs invent arbitrary 1–10 scores
- **Outlet context pattern is idiomatic**: using `React.createContext` + `Outlet context` prop is the standard React Router v6 approach and avoids prop-drilling or a global state manager
- **New tabbed UI unlocks future sections**: a `ComparisonSection[]` model generalises naturally — new feature categories can be added by the LLM without any UI code changes

---

## Impact Assessment

### Files Requiring Changes

| File | Change Type | Scope |
|------|------------|-------|
| `comparison.module.ts` | Add 2 lines | Minimal |
| `comparison.service.ts` | Replace interfaces + rewrite 2 methods | Medium |
| `prompt.builder.ts` | Rewrite system prompt string | Medium |
| `llm.service.ts` | Fix mock sniff condition | Minimal |
| `comparison.controller.ts` | Add `async` keyword | Trivial |
| `types/comparison.ts` | Replace interfaces | Small (cascades to 5 files) |
| `MainLayout.tsx` | Add state + Outlet context | Small |
| `Sidebar.tsx` | Remove state, receive via props/context | Small |
| `ToolsPage.tsx` | Read context, pass `model` to compare | Small |
| `ComparisonResult.tsx` | Full rewrite as tabbed grid | Medium |
| `comparison.service.spec.ts` | Full rewrite (5 → ~8 tests) | Medium |

### Files Requiring Creation

| File | Purpose |
|------|---------|
| `src/frontend/src/components/ui/tabs.tsx` | shadcn/ui Tabs component (install or scaffold) |
| `src/backend/src/comparison/prompt.builder.spec.ts` | Tests for PromptBuilderService |
| `src/frontend/src/components/layout/OutletContext.ts` | Type declaration for Outlet context shape |

### Risk Level: **Low-Medium**

The two DI bugs are the only runtime blockers and are trivial fixes (2 lines each). All other changes are additive or in-place rewrites with no shared state mutations, no DB schema changes, and no API contract changes visible to callers (the `POST /comparison` endpoint URL, method, and envelope format stay the same). The main risk vector is the type cascade from `types/comparison.ts` — a missed update in any of the 5 consumers will produce a TypeScript compilation error, which is caught before runtime.

---

## Recommendations

### 1. Fix DI Bugs First (unblocks everything)

```typescript
// comparison.module.ts — exact 2-line fix:
@Module({
  imports: [ToolsModule, LlmModule],                       // ← add LlmModule
  controllers: [ComparisonController],
  providers: [ComparisonService, PromptBuilderService],    // ← add PromptBuilderService
})
```

After this fix, `POST /comparison` is callable (in mock mode) and `comparison.service.spec.ts` can be correctly scaffolded.

### 2. Define New Data Model (anchor for all other changes)

Define the new interfaces in `types/comparison.ts` first — all downstream files (backend interfaces, prompt schema, frontend components) must converge on the same shape:

```typescript
// Suggested new model (implement this before writing any other code):
export interface FeatureValue { toolId: string; value: string; note?: string }
export interface FeatureRow { feature: string; values: FeatureValue[] }
export interface ComparisonSection { title: string; rows: FeatureRow[] }
export interface ToolSummary { toolId: string; toolName: string; summary: string }
export interface ComparisonRequest { toolIds: string[]; model?: string }   // ← add model
export interface ComparisonResult {
  tools: string[]
  generatedAt: string
  recommendation: string
  toolSummaries: ToolSummary[]
  sections: ComparisonSection[]
}
```

### 3. Update Mock Sniff in LlmService

When rewriting the system prompt, update `mockComplete()` to detect the new schema. The safest approach is to check for a keyword unique to the new schema (e.g. `"sections"` or `"toolSummaries"`), or better, pass an explicit `intent` flag on `LlmCompletionRequest`:

```typescript
// Option A — new keyword sniff (minimal change):
if (systemContent.includes('"sections"') && systemContent.includes('"toolSummaries"'))

// Option B — return hardcoded new-model JSON stub regardless of sniff (more robust):
// Always return the new schema in mock mode when any structured output is requested
```

### 4. Install Tabs Component Before Rewriting ComparisonResult.tsx

The `tabs.tsx` shadcn/ui component is not present. Install via CLI or manually scaffold before implementing the tabbed UI:
```bash
npx shadcn-ui@latest add tabs
```

### 5. Lift State via Outlet Context (idiomatic React Router v6)

```typescript
// OutletContext.ts:
export interface AppOutletContext { selectedModel: string; setSelectedModel: (m: string) => void }

// MainLayout.tsx:
const [selectedModel, setSelectedModel] = useState('')
// ... initialize from useModels
return <Outlet context={{ selectedModel, setSelectedModel } satisfies AppOutletContext} />

// ToolsPage.tsx:
const { selectedModel } = useOutletContext<AppOutletContext>()
// pass to api call: { toolIds: [...selectedIds], model: selectedModel }

// Sidebar.tsx:
const { selectedModel, setSelectedModel } = useOutletContext<AppOutletContext>()
// remove local useState
```

### 6. Rewrite Tests with Proper Async Mocks

All 5 failing tests need `await`, `LlmService` mock returning new-model JSON, and `PromptBuilderService` mock. New test cases to add:
- `compare()` returns `recommendation` string
- `compare()` returns `toolSummaries` with one entry per toolId
- `compare()` returns non-empty `sections` array
- `compare()` gracefully handles LLM returning invalid JSON (fallback)
- `compare()` passes `dto.model` through to `llmService.complete()`
- `PromptBuilderService.buildComparisonMessages()` returns system + user messages
- `PromptBuilderService.extractRelevantContent()` truncates at 3000 chars

---

## Next Steps

The orchestrator should proceed directly to implementation; no further research is needed. All ambiguities are resolved. Recommended execution order:

1. **DI Fix** (`comparison.module.ts`) — unblocks runtime + tests immediately
2. **New data model** (`types/comparison.ts`) — establishes the contract for all other changes
3. **Backend model + prompt** (`comparison.service.ts` interfaces, `parseAndValidateLlmResponse`, `buildFallback`, `prompt.builder.ts` system prompt, `llm.service.ts` mock sniff) — parallel with step 4
4. **Frontend state lift** (`MainLayout.tsx`, `Sidebar.tsx`, `ToolsPage.tsx`, new `OutletContext.ts`) — parallel with step 3
5. **Install Tabs + rewrite ComparisonResult.tsx** — depends on step 2 (type) and step 4 (state lift confirms model flows)
6. **Fix/create all tests** (`comparison.service.spec.ts` rewrite, `prompt.builder.spec.ts` create) — depends on steps 1–3

---

## Output

```yaml
status: success
report_path: analysis/codebase-analysis.md
summary: "The comparison feature is fully broken by 2 DI wiring bugs in comparison.module.ts (missing LlmModule import + PromptBuilderService provider); the entire backend pipeline, all 5 tests, and the frontend UI must be rewritten around a new text-based ComparisonSection/FeatureRow/FeatureValue data model, with selectedModel state lifted from Sidebar to MainLayout via React Router Outlet context."
files_found: 20
primary_files:
  - path: src/backend/src/comparison/comparison.module.ts
    lines: 11
    relevance: high
  - path: src/backend/src/comparison/comparison.service.ts
    lines: 186
    relevance: high
  - path: src/backend/src/comparison/prompt.builder.ts
    lines: 71
    relevance: high
  - path: src/frontend/src/types/comparison.ts
    lines: 9
    relevance: high
  - path: src/frontend/src/components/comparison/ComparisonResult.tsx
    lines: 24
    relevance: high
  - path: src/frontend/src/components/layout/MainLayout.tsx
    lines: 14
    relevance: high
  - path: src/frontend/src/components/layout/Sidebar.tsx
    lines: 35
    relevance: high
  - path: src/frontend/src/routes/ToolsPage.tsx
    lines: 161
    relevance: high
  - path: src/backend/src/comparison/comparison.service.spec.ts
    lines: 138
    relevance: high
complexity: moderate
risk_level: low-medium
```

(agent_id: analysis-reporter — use write_agent to send follow-up messages)___BEGIN___COMMAND_DONE_MARKER___0
