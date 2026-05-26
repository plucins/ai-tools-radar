# Synthesis — Comparison Feature + LiteLLM Integration

**Research question**: What is the current implementation state of the comparison feature ("Start Comparing"), what gaps remain to deliver a working end-to-end flow per epics #5/#6/#7, and what is the correct data model and integration approach for LiteLLM proxy?

**Synthesized from**: 4 findings files (backend-audit, frontend-audit, test-audit, requirements-audit)  
**Date**: 2026-05-26

---

## 1. Executive Summary

The comparison feature is architecturally sound but blocked from running by two critical DI wiring bugs in a single backend file. The frontend has a data contract mismatch — the `ComparisonResult` TypeScript interface is an outdated stub that covers only 3 of the 6 fields the backend returns, and `selectedModel` is siloed in a component that cannot share it with the page that makes the API call.

Additionally, the user has explicitly rejected numeric scores in favour of a richer text-based tab/section model (`ComparisonSection[]` → `FeatureRow[]` → `FeatureValue[]`). This new model has been defined (requirements-audit.md §AMENDMENT) but has **not yet been implemented** in either the backend service/prompt or the frontend types/component — meaning the entire `ComparisonResult` data contract needs to be replaced before meaningful work on the result view can proceed.

Issue #7 (LLM abstraction layer) is fully complete. Issues #5 and #6 are partially done — routing, API client, loading states, and error handling are all working; the gaps are entirely in the data model and result rendering layer.

---

## 2. Cross-Source Analysis

### 2.1 Validated Findings (confirmed by ≥ 2 independent sources)

| Finding | Sources | Confidence |
|---------|---------|------------|
| `comparison.module.ts` missing `LlmModule` in imports | backend-audit §GAP-1 + test-audit §Root Cause A | **HIGH** |
| `comparison.module.ts` missing `PromptBuilderService` in providers | backend-audit §GAP-2 + test-audit §Root Cause A | **HIGH** |
| `types/comparison.ts` frontend is a stub (only `tools`, `summary`, `generatedAt`) | frontend-audit §File 1 + requirements-audit §5 + test-audit §Root Cause B | **HIGH** |
| `selectedModel` state is trapped in `Sidebar.tsx` | frontend-audit §File 4 | **HIGH** |
| LiteLLM endpoint `/v1/chat/completions` already correctly used in `llm.service.ts:71` | requirements-audit §4 + backend-audit §File 6 | **HIGH** |
| All 5 `comparison.service.spec.ts` tests are broken | test-audit §1 | **HIGH** |
| Issue #7 is 100% complete — LLM abstraction is fully implemented | requirements-audit §3 + backend-audit §Files 6–11 | **HIGH** |
| The OLD data model uses numeric scores; USER REJECTED this in favour of text-based sections | requirements-audit §AMENDMENT | **HIGH** (explicit user decision) |

### 2.2 Contradictions Identified and Resolved

| Contradiction | Resolution |
|--------------|------------|
| `requirements-audit` (§5) defines the OLD score-based `ComparisonResult` model, then §AMENDMENT supersedes it | The AMENDMENT is the authoritative model. The old score-based model in §5 was the starting point; the NEW model in §AMENDMENT is what must be implemented. All "fix" instructions referencing scores are therefore outdated. |
| `frontend-audit` describes gap fixes relative to the OLD score-based model | These fixes are still directionally correct (lift model state, add `model?` to request, expand result type) but the specific TypeScript interfaces must use the NEW amended model, not the old score-based one. |
| `test-audit` describes test fixes/new tests that reference `comparedTools`, `criteria`, and `score` fields | These tests were written against the OLD model. They must be rewritten against the NEW model (`sections`, `toolSummaries`, `FeatureRow`, `FeatureValue`). The test patterns (DI setup, `await`, mock structure) remain valid; only the assertion targets change. |

### 2.3 Confidence Assessment by Area

| Area | Confidence | Reason |
|------|------------|--------|
| Backend module wiring gaps | HIGH | Direct code reading; NestJS error messages are deterministic |
| Frontend state propagation gaps | HIGH | Direct code reading; standard React pattern |
| LiteLLM contract | HIGH | OpenAPI spec fetched directly from live server |
| Old data model (score-based) | HIGH | Backend interfaces read directly |
| New data model (section/feature-row) | HIGH | Explicit user decision documented in requirements-audit §AMENDMENT |
| Test breakage analysis | HIGH | Line-by-line comparison of old vs new constructor signature |
| Test breakage count (21 new tests) | MEDIUM | Written against old model; count may change slightly with new model |
| Prompt strategy for new model | MEDIUM | Not yet tested; based on analogous prompt patterns |

---

## 3. Patterns and Themes

### Pattern 1: Implementation-Complete Backend, Wiring-Incomplete Module
**Category**: Architectural  
**Description**: All backend service logic (`comparison.service.ts`, `prompt.builder.ts`, `llm.service.ts`) is feature-complete and defensively coded. The single point of failure is the NestJS module descriptor (`comparison.module.ts`), which is 2 lines short.  
**Prevalence**: Isolated to `comparison.module.ts`  
**Quality**: The logic quality is high; the omission appears to be an oversight.

### Pattern 2: Stale Frontend Type Contract
**Category**: Implementation  
**Description**: The frontend TypeScript interface (`types/comparison.ts`) lags behind the backend interface. The stub was created early and never updated. Because `api.ts` wraps responses with the frontend type, the mismatch is silent at compile time (TypeScript doesn't check runtime JSON shapes).  
**Prevalence**: Isolated to `types/comparison.ts`  
**Quality**: Needs a complete replacement to reflect the new amended model.

### Pattern 3: Localised State Without Escape Hatch
**Category**: Design  
**Description**: `Sidebar.tsx` initialises `selectedModel` with `useState` but provides no callback prop and no context, making it a dead-end from the rest of the tree. This is a standard React state-lifting antipattern.  
**Prevalence**: Isolated to `Sidebar.tsx` / `MainLayout.tsx`  
**Quality**: Straightforward to fix via React Router `useOutletContext`.

### Pattern 4: Good Security Posture on LLM Output
**Category**: Implementation  
**Description**: `comparison.service.ts` line 107 explicitly notes that `toolId` and `toolName` are always taken from server-side `toolMeta` (from `toolsService.findOne`), never from the LLM response. This prevents prompt-injection attacks where a hostile model tries to substitute tool identifiers.  
**Prevalence**: Throughout `parseAndValidateLlmResponse()`  
**Quality**: Correct and should be preserved in the new model implementation.

### Pattern 5: Data Model Mismatch Between Findings and User Intent
**Category**: Organisational  
**Description**: The requirements-audit was initially written against the old score-based model (§1–§6), then appended with a user-driven amendment (§AMENDMENT) that replaces the entire `ComparisonResult` shape. The synthesis must treat the AMENDMENT as the single source of truth.  
**Prevalence**: Cross-cutting (affects backend service, prompt builder, frontend types, test specs)  
**Quality**: Clear; the amendment is unambiguous.

---

## 4. Final Agreed Data Contract

### 4.1 New ComparisonResult TypeScript Interfaces (Frontend)

```typescript
// src/frontend/src/types/comparison.ts  — COMPLETE REPLACEMENT

export interface ComparisonRequest {
  toolIds: string[]
  model?: string                    // optional: pass selected LiteLLM model to backend
}

export interface FeatureValue {
  toolId: string
  available: boolean                // does this tool support this feature?
  description: string               // how it works, or "Not supported"
}

export interface FeatureRow {
  name: string                      // e.g. "MCP support", "Free tier"
  description?: string              // what this feature means (optional context)
  values: FeatureValue[]            // one per compared tool, in same order as tools[]
}

export interface ComparisonSection {
  id: string                        // "features" | "pricing" | "integrations" | "limitations"
  title: string                     // display label, e.g. "Core Features"
  features: FeatureRow[]
}

export interface ToolSummary {
  toolId: string
  toolName: string
  bestFor: string                   // 1-2 sentences: ideal use case
  notIdealFor: string               // 1-2 sentences: when to avoid
  keyDifferentiators: string[]      // 2-4 bullet points
}

export interface ComparisonResult {
  tools: string[]                   // toolIds — always server-controlled
  summary: string                   // 2-4 sentence overview prose
  recommendation: string            // which tool for which scenario (prose)
  generatedAt: string               // ISO 8601
  toolSummaries: ToolSummary[]      // per-tool prose cards
  sections: ComparisonSection[]     // tab-rendered feature comparison grid
}
```

### 4.2 Corresponding Backend Interfaces (NestJS)

```typescript
// src/backend/src/comparison/comparison.service.ts — REPLACE EXISTING INTERFACES

export interface FeatureValue {
  toolId: string;
  available: boolean;
  description: string;
}

export interface FeatureRow {
  name: string;
  description?: string;
  values: FeatureValue[];
}

export interface ComparisonSection {
  id: string;
  title: string;
  features: FeatureRow[];
}

export interface ToolSummary {
  toolId: string;
  toolName: string;
  bestFor: string;
  notIdealFor: string;
  keyDifferentiators: string[];
}

export interface ComparisonResult {
  tools: string[];
  summary: string;
  recommendation: string;
  generatedAt: string;
  toolSummaries: ToolSummary[];
  sections: ComparisonSection[];
}
```

---

## 5. Key Insights

### Insight 1: Two Lines Fix the Critical Backend Blocker
**Description**: The entire backend feature is blocked by missing `LlmModule` in `imports` and missing `PromptBuilderService` in `providers` — both in `comparison.module.ts`. The logic is complete and correct.  
**Supporting evidence**: backend-audit §GAP-1 and §GAP-2, `comparison.module.ts` lines 6 and 9.  
**Implication**: This is a < 5 minute fix that unblocks all backend functionality and the e2e test.  
**Confidence**: HIGH

### Insight 2: The Data Contract Change Is the Largest Scope Item
**Description**: Replacing the old score-based model with the new section/feature-row model requires coordinated changes to: backend interfaces + service parse logic + prompt builder system prompt + frontend types + `ComparisonResult.tsx` rendering + all test specs.  
**Supporting evidence**: requirements-audit §AMENDMENT; test-audit §2 (21 tests written against old model).  
**Implication**: This is the highest-effort work item and has the most cross-cutting dependencies.  
**Confidence**: HIGH

### Insight 3: `selectedModel` Propagation Requires 3 File Changes
**Description**: Lifting `selectedModel` from `Sidebar.tsx` to `MainLayout.tsx` and threading it through React Router's `useOutletContext` touches exactly 3 files. The routing structure in `App.tsx` already supports `<Outlet context>` without modification.  
**Supporting evidence**: frontend-audit §File 4, §File 5, §File 6; `App.tsx` confirmed no changes needed.  
**Implication**: Well-scoped refactor; no architectural change required.  
**Confidence**: HIGH

### Insight 4: LiteLLM Is a Drop-In Replacement for Ollama
**Description**: LiteLLM's `/v1/chat/completions` endpoint accepts the same request body and returns the same response shape as the OpenAI spec. The backend already uses this endpoint and extracts content via `choices[0].message.content`. Authentication via `Authorization: Bearer` header is also already implemented.  
**Supporting evidence**: requirements-audit §4; backend-audit §File 6 (llm.service.ts lines 71, 78–80, 88).  
**Implication**: Switching from mock to LiteLLM requires only `LLM_MODE=ollama` and `OLLAMA_BASE_URL=https://litellm.proxy.innovatingtogether.online` — no code changes.  
**Confidence**: HIGH

### Insight 5: Issue #7 Is Complete — Focus Is #5 and #6
**Description**: All 5 acceptance criteria for #7 are satisfied. The LLM abstraction layer, mock mode, env configuration, and mode-switching mechanism are all correctly implemented.  
**Supporting evidence**: requirements-audit §3, backend-audit §Files 6–11.  
**Implication**: No effort needed on #7. All remaining work is #5 (result view) and #6 (integration correctness).  
**Confidence**: HIGH

---

## 6. Relationships and Dependencies

```
┌──────────────────────────────────────────────────────────────────────┐
│  DEPENDENCY GRAPH — Comparison Feature Completion                     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [1] Fix comparison.module.ts (LlmModule + PromptBuilderService)      │
│       │                                                                │
│       ↓ (unblocks app startup + e2e test)                             │
│                                                                        │
│  [2] Replace backend ComparisonResult interfaces (new model)          │
│  [3] Rewrite prompt.builder.ts system prompt (no scores, sections)    │
│  [2+3 can be parallel]                                                │
│       │                                                                │
│       ↓ (unblocks backend logic + mock response)                      │
│                                                                        │
│  [4] Replace frontend types/comparison.ts (new model interfaces)      │
│       │                                                                │
│       ↓ (unblocks type-safe rendering)                                │
│                                                                        │
│  [5a] Lift selectedModel to MainLayout.tsx + Sidebar.tsx              │
│  [5b] ToolsPage.tsx reads selectedModel via useOutletContext           │
│  [5a+5b can be parallel with 5c]                                      │
│  [5c] Build ComparisonResult.tsx tabs/table UI for new model          │
│       │                                                                │
│       ↓ (all issues #5 + #6 resolved)                                 │
│                                                                        │
│  [6] Rewrite comparison.service.spec.ts + write new spec files        │
│       (prompt.builder.spec.ts, llm.service.spec.ts)                   │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 7. Gaps and Uncertainties

### Information Gaps

| Gap | Impact |
|-----|--------|
| The `prompt.builder.ts` system prompt schema still uses the old score-based model — the new prompt has not been written yet | Blocks the new ComparisonSection/FeatureRow response from being generated by the LLM |
| No `ComparisonResult.tsx` mockup/wireframe exists for the tabbed UI | Implementation must infer layout from the data model and issue description |
| No tool profile files were read to confirm actual section names in `data/tools/*.md` | Section id mapping (`"features"`, `"pricing"`, `"integrations"`, `"limitations"`) inferred from requirements-audit §AMENDMENT, not verified from actual files |

### Unverified Claims

| Claim | Source | Status |
|-------|--------|--------|
| LiteLLM models list returns `[]` because auth is required | requirements-audit §4 | Unverified without API key |
| `data/tools/` markdown files use section headers matching the 4 proposed section IDs | requirements-audit §AMENDMENT | Assumed but not checked |

### Unresolved Inconsistencies

| Issue | Detail |
|-------|--------|
| `comparison.service.ts` `buildFallback()` creates `comparedTools` and `criteria` entries | After the model change, fallback must generate `toolSummaries` and `sections` instead; the fallback logic needs rewriting |
| `clampScore()` helper (comparison.service.ts lines 183–185) becomes unused | Remove or repurpose with the new model |
| `extractStringArray()` helper becomes unused for `strengths`/`weaknesses` | Remove once new model is implemented |

---

## 8. Synthesis by Framework (Mixed Research)

### Technical Component Analysis

| Component | Status | Notes |
|-----------|--------|-------|
| `ComparisonModule` DI wiring | ❌ Critical fix needed | 2 lines in 1 file |
| `ComparisonService` logic | ⚠️ Needs rewrite | Old model → new model; parse/validate/fallback all change |
| `PromptBuilderService` | ⚠️ Needs rewrite | System prompt schema must match new model |
| `LlmService` | ✅ Complete | No changes needed |
| `CompareToolsDto` | ✅ Complete | No changes needed |
| `app.config.ts` / `env.validation.ts` | ✅ Complete | No changes needed |
| Frontend `types/comparison.ts` | ❌ Complete replacement | Old model → new model |
| Frontend `ComparisonResult.tsx` | ❌ Complete rewrite | Must render tabs, feature rows, tool summary cards |
| Frontend `MainLayout.tsx` | ⚠️ State lift needed | Move `selectedModel` here, pass via Outlet context |
| Frontend `Sidebar.tsx` | ⚠️ Becomes controlled | Remove internal state, receive props |
| Frontend `ToolsPage.tsx` | ⚠️ Minor addition | Read `selectedModel` via `useOutletContext`, pass to API |
| `comparison.service.spec.ts` | ❌ Complete rewrite | 5 broken, 10 new tests against new model |
| `prompt.builder.spec.ts` | ❌ New file needed | 6 tests |
| `llm.service.spec.ts` | ❌ New file needed | 5 tests |

### Requirements Coverage Analysis

| Issue | Criteria Met | Criteria Open |
|-------|-------------|--------------|
| #5 Comparison Result View | 3/6 | 3/6 (summary incomplete, comparedTools/criteria tabs missing, new model not implemented) |
| #6 Frontend-Backend Integration | 4/6 | 2/6 (full data not rendered, type mismatch) |
| #7 LLM Abstraction | 5/5 ✅ | 0/5 |

---

## 9. Conclusions

**Primary conclusion**: The comparison feature has a solid architectural foundation. There are exactly 2 classes of work remaining: (1) mechanical fixes to wiring/types/state-propagation that unblock the existing skeleton, and (2) a coordinated data-model replacement that delivers the new text-based section/tab UI.

**Secondary conclusions**:
- LiteLLM integration requires zero code changes; only `.env` config values
- Issue #7 is done; scope focus is #5 and #6
- The test suite needs 21 new tests and 5 rewrites, all against the new data model
- The highest-risk item is the new LLM prompt design — whether the LLM reliably produces the `ComparisonSection[]` JSON structure at the expected depth/length is unknown until tested

**Recommendations**:
1. Fix `comparison.module.ts` first (5 minutes, unblocks everything)
2. Define the new backend interfaces and rewrite the prompt builder system prompt
3. Update frontend types to the new model
4. Implement the tabbed result UI component
5. Lift `selectedModel` state (independent of data model work; can be parallelised)
6. Rewrite tests last (against the final settled interfaces)
