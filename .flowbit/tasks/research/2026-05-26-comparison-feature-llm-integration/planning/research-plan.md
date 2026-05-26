# Research Plan — Comparison Feature & LiteLLM Integration

**Date**: 2026-05-26  
**Research Type**: Mixed (Technical + Requirements)  
**Task**: Audit the current implementation state of the comparison feature, identify gaps to close for a working end-to-end flow per epics #5/#6/#7, and confirm the data model and integration approach for the LiteLLM proxy.

---

## Research Overview

### Research Question (restated)
What is the current implementation state of the comparison feature ("Start Comparing"), what gaps remain to deliver a working end-to-end flow per epics #5/#6/#7, and what is the correct data model and integration approach for LiteLLM proxy?

### Research Type Classification
**Mixed** — two threads running in parallel:
- **Technical**: Audit every changed file for correctness (module wiring, controller async, frontend types, component rendering, test coverage).
- **Requirements**: Validate each gap against the acceptance criteria of issues #5, #6, #7.

### Scope & Boundaries
**In scope**: Backend `comparison/` and `llm/` modules; frontend `types/comparison.ts`, `ComparisonResult.tsx`, `Sidebar.tsx`, `MainLayout.tsx`, `ToolsPage.tsx`; the existing spec file; LiteLLM proxy contract.  
**Out of scope**: Radar feature, tool profile editing, authentication, CI/CD.

---

## Methodology

### Primary Approach: Evidence-First Code Audit

1. Read every file in scope verbatim — never rely on names or prior-session claims.
2. Compare each file's actual content against what the research brief says was "partially completed in-session".
3. Cross-reference each discrepancy against the acceptance criteria in issues #5, #6, #7.
4. Record each gap as a concrete, actionable finding with the file path, the specific line(s) that are wrong or missing, and the fix required.

### Rationale
This is primarily a **gap analysis** task, not an open exploration. The research brief already identifies the changed files and the suspected incomplete items. The right methodology is therefore a targeted line-by-line audit of a small, known set of files — not a broad codebase scan.

### Fallback Strategies
- If a file does not exist where expected, check neighbouring directories with glob/find.
- If the LiteLLM proxy is unreachable, use the OpenAI `/v1/chat/completions` schema as the authoritative contract (LiteLLM is OpenAI-compatible by design).
- If issues #5/#6/#7 are inaccessible via CLI, fall back to acceptance criteria captured in the research brief.

### Analysis Framework
For each in-scope file apply four lenses:

| Lens | Question |
|---|---|
| **Correctness** | Does the current code compile and behave as intended? |
| **Wiring** | Are all NestJS providers/imports declared? Are React context values passed? |
| **Contract alignment** | Does the TypeScript type match the backend JSON contract? |
| **Test coverage** | Does the spec test the current (post-refactor) behaviour? |

---

## Pre-Flight Findings (from direct file reads during planning)

The following gaps are already confirmed by reading the actual source files. The information-gathering phase should validate these and surface any additional issues.

### Backend Gaps

| File | Gap | Evidence |
|---|---|---|
| `comparison/comparison.module.ts` | Missing `LlmModule` in `imports` and `PromptBuilderService` in `providers` | Module only declares `imports: [ToolsModule]` and `providers: [ComparisonService]` |
| `comparison/comparison.controller.ts` | `compare()` is synchronous — returns `void`, not `Promise<ComparisonResult>` | Method body: `return this.comparisonService.compare(dto)` without `async/await` |

### Frontend Gaps

| File | Gap | Evidence |
|---|---|---|
| `types/comparison.ts` | `ComparisonResult` missing `recommendation`, `comparedTools`, `criteria` fields | Type only has `tools`, `summary`, `generatedAt` |
| `types/comparison.ts` | `ComparisonRequest` missing `model?: string` field | Type only has `toolIds` |
| `ComparisonResult.tsx` | Only renders `summary` and `generatedAt` — full rich model not rendered | JSX contains only one `<CardContent>` block with `result.summary` |
| `Sidebar.tsx` | `selectedModel` state is local — not exposed via Outlet context | State is `useState('')` inside the component; never passed to `<Outlet>` |
| `MainLayout.tsx` | `<Outlet />` has no `context` prop | `<Outlet />` used bare with no props |
| `ToolsPage.tsx` | Does not read `selectedModel` from Outlet context; API call omits `model` field | `api.comparison.compare({ toolIds: [...selectedIds] })` — no `model` key |

### Test Gaps

| File | Gap | Evidence |
|---|---|---|
| `comparison.service.spec.ts` | All 5 tests test the **old sync** service; the new service is `async`, injects `LlmService` and `PromptBuilderService`, and parses JSON | Tests call `service.compare(dto)` without `await`; module setup omits `LlmService` and `PromptBuilderService` providers; assertions check `buildMockSummary` output strings that no longer exist |

---

## Research Phases

### Phase 1: Broad Discovery (already substantially complete via planning reads)
**Goal**: Confirm all in-scope files exist; identify any files missed in the session brief.
- Glob `src/backend/src/comparison/**` and `src/backend/src/llm/**` to list all files.
- Glob `src/frontend/src/types/**`, `src/frontend/src/components/comparison/**`, `src/frontend/src/components/layout/**`, `src/frontend/src/routes/**`.
- Check for any env/config files that may affect LiteLLM key handling (`.env.example`, `env.validation.ts`, `ollama.config.ts`).

### Phase 2: Targeted Reading
**Goal**: Confirm or refute the pre-flight findings above; collect exact line numbers and content for every gap.
- `comparison.module.ts` — verify imports and providers arrays exactly.
- `comparison.controller.ts` — verify method signature and return type.
- `types/comparison.ts` — verify interface fields exactly.
- `ComparisonResult.tsx` — verify JSX rendering logic.
- `Sidebar.tsx` + `MainLayout.tsx` — verify Outlet context flow.
- `ToolsPage.tsx` — verify `handleCompare` function and API call payload.
- `comparison.service.spec.ts` — read all test cases; confirm which ones will fail against the new async service.

### Phase 3: Deep Dive
**Goal**: Gather everything needed to write the fixes.
- Read `env.validation.ts` (or similar) to confirm how `OLLAMA_API_KEY` is mapped to `ConfigService` key `ollama.apiKey`.
- Read `ollama.config.ts` (or the config registration in `AppModule`) to confirm the config namespace.
- Confirm the Outlet context pattern: check react-router-dom v6 docs / existing usage in the codebase for `useOutletContext<T>()`.
- Confirm the `useModels` hook location and what it returns — needed to understand how `selectedModel` is currently surfaced.
- Confirm `lib/api.ts` uses the `ComparisonRequest` type from `types/comparison.ts` — so updating the type automatically fixes the API call shape.

### Phase 4: Verification
**Goal**: Confirm no additional issues lurk beyond the pre-flight findings.
- Cross-check each gap against issues #5, #6, #7 acceptance criteria.
- Confirm no other components import `ComparisonResult` type in a way that would break when the type is expanded.
- Confirm `PromptBuilderService` is not imported elsewhere as a stray provider.
- Check if there is a `ComparisonController` spec file that would also break.

---

## Gathering Strategy

### Instances: 4

| # | Category ID | Focus Area | Tools | Output Prefix |
|---|---|---|---|---|
| 1 | backend-audit | Backend comparison + LLM module files; config registration; env validation | Glob, Read, Grep | backend-audit |
| 2 | frontend-audit | Frontend types, components, routes, Outlet context pattern, api.ts | Glob, Read, Grep | frontend-audit |
| 3 | test-audit | All existing spec/test files in comparison scope; identify failing assertions | Read, Grep | test-audit |
| 4 | requirements-audit | Issues #5, #6, #7 acceptance criteria; LiteLLM proxy OpenAI contract | gh CLI, WebFetch | requirements-audit |

### Rationale
The research decomposes naturally into four independent, non-overlapping concerns that can be gathered in parallel:
- **backend-audit** and **frontend-audit** share no files.
- **test-audit** focuses only on test files and their relationship to the new implementation.
- **requirements-audit** is purely external (GitHub issues + LiteLLM docs) and has no codebase overlap.

The four categories map directly to the four analysis lenses (correctness, wiring, contract alignment, test coverage).

---

## Success Criteria

1. **Complete inventory**: Every file in scope read and confirmed current state documented.
2. **Gap list**: Each gap from the pre-flight findings confirmed or refuted with exact file path, line range, and required fix.
3. **No surprise gaps**: Phase 3 deep-dive surfaces no blockers beyond those already identified.
4. **Data model contract confirmed**: Final `ComparisonResult` TypeScript interface (backend + frontend) documented and confirmed consistent.
5. **Outlet context approach confirmed**: Exact pattern for passing `selectedModel` from `Sidebar` → `ToolsPage` documented.
6. **Test rewrite scope defined**: Full list of which existing test cases must be deleted/updated and which new ones must be added.
7. **LiteLLM contract confirmed**: Endpoint, request shape, response shape, and API key header documented.
8. **Confidence: HIGH** — all claims backed by code evidence (line numbers cited).

---

## Expected Outputs

| Output | Description |
|---|---|
| `analysis/findings/backend-audit-gaps.md` | Line-by-line gap report for backend files |
| `analysis/findings/frontend-audit-gaps.md` | Line-by-line gap report for frontend files |
| `analysis/findings/test-audit-gaps.md` | Which tests break, why, and what new tests are needed |
| `analysis/findings/requirements-audit.md` | Acceptance criteria mapping and LiteLLM contract |
| `analysis/synthesis.md` | Synthesized gap list, data model contract, Outlet context pattern, ordered implementation checklist |
