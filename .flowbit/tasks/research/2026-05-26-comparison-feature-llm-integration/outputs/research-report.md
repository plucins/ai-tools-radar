# Research Report — Comparison Feature: End-to-End Implementation Gaps & LiteLLM Integration

**Type**: Mixed research (technical audit + requirements analysis)  
**Date**: 2026-05-26  
**Confidence**: HIGH — all claims reference specific source files and line numbers

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Research Objectives](#2-research-objectives)
3. [Methodology](#3-methodology)
4. [Implementation Status](#4-implementation-status)
5. [Complete Gap List](#5-complete-gap-list)
6. [Final Data Contract](#6-final-data-contract)
7. [LiteLLM Integration](#7-litellm-integration)
8. [Implementation Checklist](#8-implementation-checklist)
9. [Prompt Strategy](#9-prompt-strategy)
10. [Acceptance Criteria Coverage](#10-acceptance-criteria-coverage)
11. [Appendices](#11-appendices)

---

## 1. Executive Summary

### What was researched
The current implementation state of the "Start Comparing" comparison feature (epics #5/#6/#7), including backend service wiring, frontend data model alignment, state propagation, test coverage, and the correct API contract for the LiteLLM proxy.

### How it was researched
Four specialist audit agents produced findings files covering: backend NestJS code (11 files), frontend React/TypeScript code (9 files), test coverage (14 spec files), and requirements from GitHub issues #5/#6/#7 + live LiteLLM OpenAPI spec.

### Key findings

1. **Two critical DI wiring bugs** in `comparison.module.ts` (lines 6 and 9) will crash app startup. This is a < 5 minute fix in one file.

2. **The old data model has been replaced.** The user rejected numeric scores. The new model uses `ComparisonSection[]` → `FeatureRow[]` → `FeatureValue[]` (text-based, tab-rendered). This new model has NOT yet been implemented anywhere — neither backend interfaces/prompt nor frontend types/component.

3. **Frontend has 2 independent gaps**: (a) the `ComparisonResult` TypeScript type is a stub covering only 3 of 6 fields; (b) `selectedModel` is trapped in `Sidebar.tsx` with no way for `ToolsPage` to read it.

4. **Issue #7 is 100% complete.** The LLM abstraction layer, mock mode, env config, and mode-switching are all correctly implemented. LiteLLM is a drop-in: only `.env` values need changing.

5. **5 existing backend tests are broken**; 21 new tests are needed — all against the new data model.

### Main conclusions

The app is 60–70% done. The skeleton works end-to-end (routing, API client, loading UI, error handling). What's missing is the correct data contract flowing through the system, the new tabbed result view rendering it, and the LLM prompt that produces it.

---

## 2. Research Objectives

**Primary research question**: What is the current implementation state of the comparison feature, what gaps remain for a working end-to-end flow per epics #5/#6/#7, and what is the correct data model and integration approach for LiteLLM?

**Sub-questions**:
1. Which backend files are broken and why?
2. What frontend changes are needed to display the full comparison result?
3. How does `selectedModel` get passed from Sidebar to the API call?
4. What is the authoritative `ComparisonResult` TypeScript interface (new model)?
5. What is the confirmed LiteLLM endpoint, auth, and response extraction path?
6. Which acceptance criteria from #5/#6/#7 are already met?

**Scope**: `src/backend/src/comparison/`, `src/backend/src/llm/`, `src/frontend/src/`, test specs, GitHub issues #5–#7, live LiteLLM OpenAPI spec.

---

## 3. Methodology

- **Backend audit**: Direct code reading of 11 NestJS files; DI resolution analysis
- **Frontend audit**: Direct code reading of 9 React/TypeScript files; state propagation tracing
- **Test audit**: Line-by-line comparison of old/new constructor signatures and method signatures
- **Requirements audit**: `gh issue view 5/6/7` + live `GET https://litellm.proxy.innovatingtogether.online/openapi.json`
- **Framework**: Mixed (Technical Component Analysis + Requirements Gap Analysis)

---

## 4. Implementation Status

### Backend Files

| File | Status | What's Needed |
|------|--------|--------------|
| `src/backend/src/comparison/comparison.module.ts` | ❌ CRITICAL BUG | Add `LlmModule` to imports; add `PromptBuilderService` to providers (lines 6, 9) |
| `src/backend/src/comparison/comparison.service.ts` | ⚠️ PARTIAL | Replace old score-based interfaces + `parseAndValidateLlmResponse` + `buildFallback` for new model; remove `clampScore`/`extractStringArray`; mark `compare()` async in controller |
| `src/backend/src/comparison/prompt.builder.ts` | ⚠️ PARTIAL | Rewrite system prompt JSON schema for new section/feature-row model (no scores) |
| `src/backend/src/comparison/comparison.controller.ts` | ⚠️ MINOR | Add `async`/`await` + return type annotation (line 10) |
| `src/backend/src/comparison/dto/compare-tools.dto.ts` | ✅ COMPLETE | No changes |
| `src/backend/src/llm/llm.service.ts` | ✅ COMPLETE | No changes |
| `src/backend/src/llm/dto/llm.dto.ts` | ✅ COMPLETE | No changes |
| `src/backend/src/config/app.config.ts` | ✅ COMPLETE | No changes |
| `src/backend/src/config/env.validation.ts` | ✅ COMPLETE | No changes |
| `src/backend/.env.example` | ✅ COMPLETE | No changes |
| `src/backend/src/app.module.ts` | ✅ COMPLETE | No changes |

### Frontend Files

| File | Status | What's Needed |
|------|--------|--------------|
| `src/frontend/src/types/comparison.ts` | ❌ REPLACE | Complete replacement with new 6-interface model (no scores) |
| `src/frontend/src/components/comparison/ComparisonResult.tsx` | ❌ REWRITE | Tabbed layout: sections as tabs, feature grid per tab, ToolSummary cards, recommendation callout |
| `src/frontend/src/components/layout/MainLayout.tsx` | ⚠️ LIFT STATE | Move `selectedModel` state here; pass via `<Outlet context={{ selectedModel }} />` |
| `src/frontend/src/components/layout/Sidebar.tsx` | ⚠️ CONTROLLED | Remove internal `selectedModel` state; accept `selectedModel`, `onModelChange`, `models`, `loading` as props |
| `src/frontend/src/routes/ToolsPage.tsx` | ⚠️ WIRE MODEL | Read `selectedModel` via `useOutletContext`; pass `model: selectedModel || undefined` in API call |
| `src/frontend/src/lib/api.ts` | ✅ COMPLETE | No changes needed (type update in `types/comparison.ts` is sufficient) |
| `src/frontend/src/routes/ComparisonResultPage.tsx` | ✅ COMPLETE | No direct changes (benefits from type + component fixes) |
| `src/frontend/src/App.tsx` | ✅ COMPLETE | No changes |

### Test Files

| File | Status | What's Needed |
|------|--------|--------------|
| `src/backend/src/comparison/comparison.service.spec.ts` | ❌ REWRITE | 5 broken tests; rewrite module setup + 10 new tests against new model |
| `src/backend/src/comparison/prompt.builder.spec.ts` | ❌ MISSING | Create new file; 6 tests (P-1 through P-6) |
| `src/backend/src/llm/llm.service.spec.ts` | ❌ MISSING | Create new file; 5 tests (L-1 through L-5) |
| `src/backend/test/app.e2e-spec.ts` | ⚠️ AT RISK | Passes only after module wiring fix; no test changes needed |
| Frontend RadarPage tests (8 tests) | ✅ UNAFFECTED | No changes |

---

## 5. Complete Gap List

### 🔴 CRITICAL — Blocks App Startup

#### CRIT-1: `comparison.module.ts` — Missing `LlmModule` in imports
- **File**: `src/backend/src/comparison/comparison.module.ts`, line 6
- **Error at runtime**: `Nest can't resolve dependencies of the ComparisonService (?). LlmService at index [1] not available in ComparisonModule context.`
- **Fix**:
  ```typescript
  import { LlmModule } from '../llm/llm.module';
  // In @Module: imports: [ToolsModule, LlmModule]
  ```

#### CRIT-2: `comparison.module.ts` — Missing `PromptBuilderService` in providers
- **File**: `src/backend/src/comparison/comparison.module.ts`, line 9
- **Error at runtime**: `Nest can't resolve dependencies of the ComparisonService (?). PromptBuilderService at index [2] not available.`
- **Fix**:
  ```typescript
  import { PromptBuilderService } from './prompt.builder';
  // In @Module: providers: [ComparisonService, PromptBuilderService]
  ```

> **Both CRIT-1 and CRIT-2 are in the same file. Total diff: ~4 lines.**

---

### 🟠 HIGH — Feature Doesn't Work (data model gaps)

#### HIGH-1: Backend `ComparisonResult` interfaces use old score-based model
- **File**: `src/backend/src/comparison/comparison.service.ts`, lines 7–34
- **Impact**: Backend returns `comparedTools[]` with numeric `score`, `strengths[]`, `weaknesses[]` and `criteria[]`. New model requires `sections[]`, `toolSummaries[]` — no scores anywhere.
- **Fix**: Replace interfaces `ComparedTool`, `CriterionRating`, `Criterion`, `ComparisonResult` with new `FeatureValue`, `FeatureRow`, `ComparisonSection`, `ToolSummary`, `ComparisonResult` (see §6).

#### HIGH-2: `prompt.builder.ts` system prompt schema uses old model
- **File**: `src/backend/src/comparison/prompt.builder.ts`, lines 18–51
- **Impact**: LLM is prompted to return `comparedTools[].score`, `criteria[].ratings[].score` etc. The new prompt must describe `sections[]`, `toolSummaries[]`, `FeatureRow[]` with no scores.
- **Fix**: Complete rewrite of the JSON schema block in `buildComparisonMessages()` system message.

#### HIGH-3: `comparison.service.ts` — `parseAndValidateLlmResponse` validates old model
- **File**: `src/backend/src/comparison/comparison.service.ts`, lines 69–154
- **Impact**: Validates and maps `comparedTools`, `criteria`, `score`, `strengths`, `weaknesses`. Must be rewritten to validate and map `sections`, `toolSummaries` for the new model.
- **Fix**: Rewrite parse/validate/map logic; remove `clampScore()` and `extractStringArray()` helpers.

#### HIGH-4: `comparison.service.ts` — `buildFallback()` uses old model
- **File**: `src/backend/src/comparison/comparison.service.ts`, lines 156–176
- **Impact**: Returns fallback `comparedTools[]` and `criteria[]`. Must return `toolSummaries[]` and `sections[]`.
- **Fix**: Rewrite fallback to use new model shape.

#### HIGH-5: Frontend `types/comparison.ts` — stub with only 3 fields
- **File**: `src/frontend/src/types/comparison.ts`
- **Impact**: `ComparisonResult` interface only has `{ tools, summary, generatedAt }`. TypeScript consumers receive no type information for `toolSummaries` or `sections`. `ComparisonRequest` missing `model?: string`.
- **Fix**: Complete replacement — see §6 for full interface definitions.

#### HIGH-6: `ComparisonResult.tsx` — renders only `summary` text
- **File**: `src/frontend/src/components/comparison/ComparisonResult.tsx`
- **Impact**: User sees a plain text blob. No tabs, no feature grid, no tool summary cards, no recommendation callout.
- **Fix**: Complete rewrite to render: `recommendation` callout, `toolSummaries` cards, tabbed `sections` with `FeatureRow` grid (available boolean → ✓/✗ + description text).

---

### 🟡 MEDIUM — Feature Incomplete

#### MED-1: `selectedModel` state trapped in `Sidebar.tsx`
- **File**: `src/frontend/src/components/layout/Sidebar.tsx`, line 4 (`useState('')`)
- **Impact**: `ToolsPage.handleCompare()` has no access to the selected model. API calls always omit the `model` field. User's model selection is silently ignored.
- **Fix**: Lift state to `MainLayout.tsx`; pass props down to `Sidebar`; thread via `<Outlet context={{ selectedModel }} />`.

#### MED-2: `MainLayout.tsx` — no shared state for `selectedModel`
- **File**: `src/frontend/src/components/layout/MainLayout.tsx`
- **Impact**: No outlet context provided; `ToolsPage` cannot access `selectedModel`.
- **Fix**: Move `useModels`, `useState`, `useEffect` from `Sidebar` to here; add `<Outlet context={{ selectedModel }} />`.

#### MED-3: `ToolsPage.tsx` — `handleCompare` never passes `model`
- **File**: `src/frontend/src/routes/ToolsPage.tsx`, `handleCompare` function
- **Impact**: API call to `POST /comparison` always omits `model`, so LiteLLM uses default model.
- **Fix**: Add `const { selectedModel } = useOutletContext<{ selectedModel: string }>()` and pass `model: selectedModel || undefined` in the API call body.

#### MED-4: `comparison.controller.ts` — `compare()` not `async`
- **File**: `src/backend/src/comparison/comparison.controller.ts`, line 10
- **Impact**: No runtime crash (NestJS awaits returned Promises), but exception propagation through NestJS exception filters can be inconsistent in edge cases.
- **Fix**: `async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult>`

---

### 🔵 LOW — Tests and Polish

#### LOW-1: `comparison.service.spec.ts` — 5 broken tests (DI + async + old model)
- **File**: `src/backend/src/comparison/comparison.service.spec.ts`
- **Root causes**: Missing `LlmService`/`PromptBuilderService` mocks in test module; missing `await` on `compare()`; assertions target removed methods (`buildMockSummary`, old fallback logic)
- **Fix**: Rewrite module setup with 3 mocks; add `await`; replace 5 old tests with 10 new tests targeting new model (N-1 through N-10 per test-audit)

#### LOW-2: `prompt.builder.spec.ts` — file doesn't exist
- **Target**: `src/backend/src/comparison/prompt.builder.spec.ts`
- **Fix**: Create new file; write tests P-1 through P-6 (message count/roles, tool id embedding, content truncation, frontmatter stripping, undefined content guard)

#### LOW-3: `llm.service.spec.ts` — file doesn't exist
- **Target**: `src/backend/src/llm/llm.service.spec.ts`
- **Fix**: Create new file; write tests L-1 through L-5 (mock mode JSON, mock mode generic, ollama HTTP call, auth header, error propagation)

---

## 6. Final Data Contract

### 6.1 Frontend TypeScript — Complete File Replacement

```typescript
// src/frontend/src/types/comparison.ts — COMPLETE REPLACEMENT (no scores)

export interface ComparisonRequest {
  toolIds: string[]
  model?: string                      // optional: pass selected LiteLLM model
}

export interface FeatureValue {
  toolId: string
  available: boolean                   // true = tool supports this feature
  description: string                  // prose description or "Not supported"
}

export interface FeatureRow {
  name: string                         // e.g. "MCP support", "Free tier", "SSO"
  description?: string                 // optional: what this feature means
  values: FeatureValue[]               // one entry per compared tool
}

export interface ComparisonSection {
  id: string                           // "features" | "pricing" | "integrations" | "limitations"
  title: string                        // display label, e.g. "Core Features"
  features: FeatureRow[]
}

export interface ToolSummary {
  toolId: string
  toolName: string
  bestFor: string                      // 1-2 sentence ideal use case
  notIdealFor: string                  // 1-2 sentence when to avoid
  keyDifferentiators: string[]         // 2-4 bullet points of unique value
}

export interface ComparisonResult {
  tools: string[]                      // toolIds — always server-controlled
  summary: string                      // 2-4 sentence overview prose
  recommendation: string               // which tool wins for which scenario
  generatedAt: string                  // ISO 8601
  toolSummaries: ToolSummary[]         // one per compared tool
  sections: ComparisonSection[]        // rendered as tabs in UI
}
```

### 6.2 Backend NestJS — Interface Replacements in `comparison.service.ts`

```typescript
// src/backend/src/comparison/comparison.service.ts
// REPLACE lines 7–34 (all old interfaces) with:

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

### 6.3 Backend `parseAndValidateLlmResponse` — New Validation Shape

```typescript
// Validation guard for the new model:
private parseAndValidateLlmResponse(
  raw: string,
  toolMeta: Map<string, { id: string; name: string }>,
  toolIds: string[],
): ComparisonResult {
  // 1. Strip markdown fences
  const clean = raw
    .replace(/^```json\s*/m, '')
    .replace(/^```\s*/m, '')
    .replace(/```\s*$/m, '')
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(clean);
  } catch {
    return this.buildFallback(raw, toolIds, toolMeta);
  }

  const p = parsed as Record<string, unknown>;

  // 2. Extract and validate top-level fields
  const summary = typeof p['summary'] === 'string' ? p['summary'] : '';
  const recommendation = typeof p['recommendation'] === 'string' ? p['recommendation'] : '';

  // 3. Map toolSummaries — server controls toolId + toolName
  const rawSummaries = Array.isArray(p['toolSummaries']) ? p['toolSummaries'] : [];
  const toolSummaries: ToolSummary[] = toolIds.map((id) => {
    const meta = toolMeta.get(id)!;
    const entry = (rawSummaries as Record<string, unknown>[]).find(
      (s) => s['toolId'] === id,
    ) ?? {};
    return {
      toolId: meta.id,          // server-controlled
      toolName: meta.name,       // server-controlled
      bestFor: typeof entry['bestFor'] === 'string' ? entry['bestFor'] : '',
      notIdealFor: typeof entry['notIdealFor'] === 'string' ? entry['notIdealFor'] : '',
      keyDifferentiators: Array.isArray(entry['keyDifferentiators'])
        ? (entry['keyDifferentiators'] as unknown[]).filter((x) => typeof x === 'string') as string[]
        : [],
    };
  });

  // 4. Map sections
  const rawSections = Array.isArray(p['sections']) ? p['sections'] : [];
  const sections: ComparisonSection[] = (rawSections as Record<string, unknown>[]).map((sec) => ({
    id: typeof sec['id'] === 'string' ? sec['id'] : 'unknown',
    title: typeof sec['title'] === 'string' ? sec['title'] : '',
    features: Array.isArray(sec['features'])
      ? (sec['features'] as Record<string, unknown>[]).map((row) => ({
          name: typeof row['name'] === 'string' ? row['name'] : '',
          description: typeof row['description'] === 'string' ? row['description'] : undefined,
          values: Array.isArray(row['values'])
            ? (row['values'] as Record<string, unknown>[])
                .filter((v) => toolIds.includes(v['toolId'] as string))  // security: only known toolIds
                .map((v) => ({
                  toolId: v['toolId'] as string,
                  available: typeof v['available'] === 'boolean' ? v['available'] : false,
                  description: typeof v['description'] === 'string' ? v['description'] : '',
                }))
            : [],
        }))
      : [],
  }));

  return {
    tools: toolIds,
    summary,
    recommendation,
    generatedAt: new Date().toISOString(),
    toolSummaries,
    sections,
  };
}
```

### 6.4 Backend `buildFallback` — New Model Shape

```typescript
private buildFallback(
  rawText: string,
  toolIds: string[],
  toolMeta: Map<string, { id: string; name: string }>,
): ComparisonResult {
  return {
    tools: toolIds,
    summary: rawText.slice(0, 500),
    recommendation: 'Could not extract structured recommendation.',
    generatedAt: new Date().toISOString(),
    toolSummaries: toolIds.map((id) => {
      const meta = toolMeta.get(id)!;
      return {
        toolId: meta.id,
        toolName: meta.name,
        bestFor: '',
        notIdealFor: '',
        keyDifferentiators: [],
      };
    }),
    sections: [],
  };
}
```

---

## 7. LiteLLM Integration

### 7.1 Confirmed Endpoint

| Property | Value | Source |
|----------|-------|--------|
| Base URL | `https://litellm.proxy.innovatingtogether.online` | `.env.example` + openapi.json |
| Chat endpoint | `/v1/chat/completions` | openapi.json; already used in `llm.service.ts:71` |
| Method | `POST` | openapi.json |
| Content-Type | `application/json` | standard |

### 7.2 Authentication

| Method | Header | Value |
|--------|--------|-------|
| Primary | `x-litellm-api-key` | API key token |
| OpenAI-compat | `Authorization` | `Bearer <token>` |

**Current backend**: `llm.service.ts:78–80` sends `Authorization: Bearer ${apiKey}` when `OLLAMA_API_KEY` is non-empty. ✅ Compatible with LiteLLM.

**Config change to activate LiteLLM**:
```env
LLM_MODE=ollama
OLLAMA_BASE_URL=https://litellm.proxy.innovatingtogether.online
OLLAMA_MODEL=<model-name-from-litellm>
OLLAMA_API_KEY=<your-litellm-api-key>
```

### 7.3 Request Format

```json
{
  "model": "llama3",
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user",   "content": "..." }
  ]
}
```

Both `model` and `messages` are **required** per openapi.json.

### 7.4 Response Extraction

```typescript
// llm.service.ts:88 — already correct, no changes needed
const content = response.data.choices[0]?.message?.content ?? '';
```

Response shape:
```json
{
  "choices": [
    { "message": { "role": "assistant", "content": "<LLM output>" }, "finish_reason": "stop" }
  ],
  "model": "llama3"
}
```

### 7.5 Zero Code Changes Required

The backend LLM client is already correct for LiteLLM. The only work is:
1. Set the 4 env vars above in `.env` (local) or deployment config
2. Verify the model name via `GET /models` with a valid API key

---

## 8. Implementation Checklist

Ordered by dependency. Items in the same group can be worked in parallel.

### Group A — Backend Module Wiring (UNBLOCKS EVERYTHING) [~5 min]

- [ ] **A-1** Edit `src/backend/src/comparison/comparison.module.ts`:
  - Add import: `import { LlmModule } from '../llm/llm.module';`
  - Add import: `import { PromptBuilderService } from './prompt.builder';`
  - Update `@Module`: `imports: [ToolsModule, LlmModule]`
  - Update `@Module`: `providers: [ComparisonService, PromptBuilderService]`

### Group B — Data Model Replacement (depends on A) [~2–3 hours]

- [ ] **B-1** Edit `src/backend/src/comparison/comparison.service.ts`:
  - Replace interfaces (lines 7–34) with new `FeatureValue`, `FeatureRow`, `ComparisonSection`, `ToolSummary`, `ComparisonResult`
  - Rewrite `parseAndValidateLlmResponse()` (lines 69–154) for new model (see §6.3)
  - Rewrite `buildFallback()` (lines 156–176) for new model (see §6.4)
  - Delete `clampScore()` and `extractStringArray()` helpers (lines 178–185)
  - Add `async` to `compare()` controller method

- [ ] **B-2** Edit `src/backend/src/comparison/prompt.builder.ts`:
  - Rewrite the JSON schema block in `buildComparisonMessages()` system message (lines 18–51)
  - New schema must describe `sections[]`, `toolSummaries[]`, `FeatureRow[]`, `FeatureValue[]`
  - Explicitly forbid scores; instruct on `available: boolean` + `description: string` pattern
  - See §9 for complete prompt strategy

- [ ] **B-3** (also needed) Add `async` to `comparison.controller.ts` line 10:
  ```typescript
  async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult>
  ```

### Group C — Frontend Types (depends on B-1) [~15 min]

- [ ] **C-1** Replace entire `src/frontend/src/types/comparison.ts` with the 6-interface definition in §6.1

### Group D — Frontend State Propagation (independent of B/C) [~30–45 min]

- [ ] **D-1** Edit `src/frontend/src/components/layout/MainLayout.tsx`:
  - Add `useModels`, `useState`, `useEffect` (lifted from Sidebar)
  - Pass `selectedModel`, `onModelChange`, `models`, `loading` as props to `<Sidebar />`
  - Change `<Outlet />` to `<Outlet context={{ selectedModel }} />`

- [ ] **D-2** Edit `src/frontend/src/components/layout/Sidebar.tsx`:
  - Remove internal `useState`, `useEffect`, `useModels` calls
  - Accept props: `selectedModel: string`, `onModelChange: (m: string) => void`, `models: Model[]`, `loading: boolean`
  - Pass through to `<SidebarModelStatus />`

- [ ] **D-3** Edit `src/frontend/src/routes/ToolsPage.tsx`:
  - Add: `const { selectedModel } = useOutletContext<{ selectedModel: string }>()`
  - Update `handleCompare`: add `model: selectedModel || undefined` to the `api.comparison.compare({...})` call

### Group E — Frontend Result View (depends on C + D) [~2–3 hours]

- [ ] **E-1** Rewrite `src/frontend/src/components/comparison/ComparisonResult.tsx`:
  - Top section: `recommendation` in a highlighted callout box
  - Next section: `summary` prose text
  - Below: `toolSummaries` cards — one per tool — showing `bestFor`, `notIdealFor`, `keyDifferentiators` bullets
  - Main section: tabbed interface (`sections` array), one tab per section
  - Each tab: feature comparison table — rows = `features`, columns = tools
  - Each cell: `available` boolean → ✓ (green) or ✗ (red/muted) + `description` text below
  - Footer: `generatedAt` timestamp

### Group F — Tests (depends on B-1, B-2; can be parallel with D/E) [~3–4 hours]

- [ ] **F-1** Rewrite `src/backend/src/comparison/comparison.service.spec.ts`:
  - New module setup: 3 mocks (`LlmService`, `PromptBuilderService`, `ToolsService`)
  - Write 10 new tests N-1 through N-10 against new model (see test-audit.md §2.1)
  - Key: N-7 must verify server-side `toolId`/`toolName` override (security invariant)

- [ ] **F-2** Create `src/backend/src/comparison/prompt.builder.spec.ts`:
  - Write 6 tests P-1 through P-6 (message count, tool id embedding, content inclusion, truncation, frontmatter strip, undefined guard)

- [ ] **F-3** Create `src/backend/src/llm/llm.service.spec.ts`:
  - Write 5 tests L-1 through L-5 (mock mode JSON, mock generic, ollama HTTP call, auth header, error propagation)

---

## 9. Prompt Strategy

### 9.1 Goals
- LLM must produce a single JSON object (no markdown prose outside fences)
- JSON must match the `ComparisonResult` shape: `sections[]`, `toolSummaries[]`
- No numeric scores anywhere in the output
- Feature descriptions must be concise (1–2 sentences per cell)
- LLM must not invent tool IDs or names (server overrides these, but shorter prompts are safer)

### 9.2 System Prompt Template

```
You are an AI tool comparison expert. Your job is to compare developer tools based on their documentation.

You MUST respond with ONLY a JSON object. No markdown prose, no explanation outside the JSON.

## OUTPUT SCHEMA

{
  "summary": string,            // 2-4 sentence overview comparing the tools
  "recommendation": string,     // Which tool for which use case (2-4 sentences)
  "toolSummaries": [
    {
      "toolId": string,         // MUST be one of: ${toolIds}
      "toolName": string,       // The tool's display name
      "bestFor": string,        // 1-2 sentences: ideal user / use case
      "notIdealFor": string,    // 1-2 sentences: when to avoid this tool
      "keyDifferentiators": string[]  // 2-4 bullet points, short phrases
    }
  ],
  "sections": [
    {
      "id": string,             // MUST be one of: "features" | "pricing" | "integrations" | "limitations"
      "title": string,          // Human-readable tab label
      "features": [
        {
          "name": string,       // Short feature name (e.g. "MCP support", "Free tier")
          "description": string,// What this feature means in 1 sentence (optional, can omit)
          "values": [
            {
              "toolId": string,     // MUST be one of: ${toolIds}
              "available": boolean, // true = tool supports / offers this; false = does not
              "description": string // How the tool implements it, or "Not supported" if available=false
            }
          ]
        }
      ]
    }
  ]
}

## RULES

1. toolSummaries MUST contain exactly one entry per tool id: ${toolIds}
2. Each section's features[].values[] MUST contain exactly one entry per tool id: ${toolIds}
3. Do NOT use numeric scores anywhere. Use boolean available + text description only.
4. Include 3–5 sections. Include 5–10 feature rows per section.
5. Features should cover the most meaningful comparison points from the tool documentation.
6. For features a tool does not have: set available=false, description="Not documented / not supported".
7. toolId values in your response MUST match exactly: ${toolIds}
8. Your entire response must be valid JSON parseable by JSON.parse().
```

### 9.3 User Message Template

```
Compare these ${n} AI developer tools:

${tools.map(t => `
### ${t.name} (id: ${t.id})
${extractedContent}
`).join('\n')}

Focus on: Core Features, Pricing, Integrations, Limitations.
```

### 9.4 Robustness Techniques

| Technique | Where | Purpose |
|-----------|-------|---------|
| Markdown fence stripping | `parseAndValidateLlmResponse` lines 1–6 | Models often wrap JSON in ` ```json ``` ` |
| `toolId` server override | `parseAndValidateLlmResponse` toolSummaries map | Prevents prompt injection via LLM-controlled IDs |
| `toolId` filter on `values[]` | `parseAndValidateLlmResponse` section map | Drops phantom tool entries the LLM hallucinated |
| `buildFallback()` | `parseAndValidateLlmResponse` catch block | Shows raw LLM text if JSON is unparseable |
| Content truncation at 3000 chars | `prompt.builder.ts extractRelevantContent()` | Prevents context window overflow |
| YAML frontmatter strip | `prompt.builder.ts extractRelevantContent()` | Tool profiles start with metadata block |
| `available: false` default | Validation logic | Guards against LLM omitting `available` field |

---

## 10. Acceptance Criteria Coverage

### Issue #5 — Comparison Result View

| # | Criterion | Status | Evidence / Gap |
|---|-----------|--------|----------------|
| 1 | After comparison user sees backend result | ✅ DONE | `ComparisonResultPage.tsx` renders `ComparisonResult` component when `location.state?.result` present |
| 2 | View shows summary and final recommendation | ⚠️ PARTIAL | `summary` renders; `recommendation` not rendered — needs HIGH-6 fix |
| 3 | View shows each compared tool with summary | ❌ OPEN | `toolSummaries` cards not implemented — needs HIGH-6 (E-1) |
| 4 | View shows comparison as tab/section grid | ❌ OPEN | `sections` tabbed UI not implemented — needs HIGH-6 (E-1) |
| 5 | User can return to tool selection | ✅ DONE | `← Back to Tools` button in `ComparisonResultPage.tsx` |
| 6 | Loading and error states shown | ✅ DONE | `ComparisonPanel.tsx` 3-stage loading; `api.ts` error propagation |

**#5 Status: 3/6 done · 1 partial · 2 open**

---

### Issue #6 — Frontend-Backend Integration

| # | Criterion | Status | Evidence / Gap |
|---|-----------|--------|----------------|
| 1 | Full flow from selection to result works locally | ⚠️ PARTIAL | End-to-end skeleton works; result view incomplete + DI bug blocks startup |
| 2 | Frontend communicates via configured API address | ✅ DONE | `lib/api.ts` uses `VITE_API_BASE_URL` from `lib/config.ts` |
| 3 | Backend returns result in established contract | ⚠️ PARTIAL | Old score-based contract implemented; new section-based contract not yet |
| 4 | Frontend correctly renders data from backend | ❌ OPEN | Old stub type + missing rendering — needs C-1 + E-1 |
| 5 | User receives error message on error | ✅ DONE | `api.ts::request()` throws on non-OK; parent handles display |
| 6 | Loading UI during generation | ✅ DONE | 3-stage loading indicator in `ComparisonPanel.tsx` |

**#6 Status: 3/6 done · 2 partial · 1 open**

---

### Issue #7 — LLM Abstraction Layer

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Comparison logic separated from LLM client | ✅ DONE | `LlmService` fully isolated; `ComparisonService` calls `this.llmService.complete()` |
| 2 | App runs in mock mode without live LLM | ✅ DONE | `LLM_MODE=mock` (default); `llm.service.ts:34–65` deterministic mock |
| 3 | Ollama/LiteLLM config documented in `.env.example` | ✅ DONE | All 5 vars present: `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `OLLAMA_API_KEY`, `OLLAMA_TIMEOUT_MS`, `LLM_MODE` |
| 4 | Switching to real LLM requires only config, no frontend changes | ✅ DONE | Frontend unaware of `LLM_MODE`; `chatComplete()` already uses correct OpenAI-compatible format |
| 5 | Frontend does not know LLM integration details | ✅ DONE | Frontend only calls `POST /comparison` |

**#7 Status: 5/5 COMPLETE ✅**

---

### Overall Progress Toward Full E2E Flow

```
████████████████████░░░░░░░░░░░░  55% complete

Done:   Routing · API client · loading UI · error handling · LLM abstraction · config/env · mock mode
Gaps:   Module wiring · new data model (backend + frontend) · result view UI · selectedModel wire-up · tests
```

---

## 11. Appendices

### A. Source Files Audited

| File | Audited By |
|------|------------|
| `src/backend/src/comparison/comparison.module.ts` | backend-audit |
| `src/backend/src/comparison/comparison.service.ts` | backend-audit |
| `src/backend/src/comparison/comparison.controller.ts` | backend-audit |
| `src/backend/src/comparison/prompt.builder.ts` | backend-audit |
| `src/backend/src/comparison/dto/compare-tools.dto.ts` | backend-audit |
| `src/backend/src/llm/llm.service.ts` | backend-audit |
| `src/backend/src/llm/dto/llm.dto.ts` | backend-audit |
| `src/backend/src/config/app.config.ts` | backend-audit |
| `src/backend/src/config/env.validation.ts` | backend-audit |
| `src/backend/.env.example` | backend-audit |
| `src/backend/src/app.module.ts` | backend-audit |
| `src/frontend/src/types/comparison.ts` | frontend-audit |
| `src/frontend/src/components/comparison/ComparisonResult.tsx` | frontend-audit |
| `src/frontend/src/components/comparison/ComparisonPanel.tsx` | frontend-audit |
| `src/frontend/src/components/layout/Sidebar.tsx` | frontend-audit |
| `src/frontend/src/components/layout/MainLayout.tsx` | frontend-audit |
| `src/frontend/src/routes/ToolsPage.tsx` | frontend-audit |
| `src/frontend/src/routes/ComparisonResultPage.tsx` | frontend-audit |
| `src/frontend/src/lib/api.ts` | frontend-audit |
| `src/frontend/src/App.tsx` | frontend-audit |
| `src/backend/src/comparison/comparison.service.spec.ts` | test-audit |
| `src/backend/test/app.e2e-spec.ts` | test-audit |
| `src/frontend/src/routes/__tests__/RadarPage.test.tsx` | test-audit |
| GitHub Issues #5, #6, #7 | requirements-audit |
| `https://litellm.proxy.innovatingtogether.online/openapi.json` | requirements-audit |

### B. Gaps and Uncertainties

| Uncertainty | Impact | Mitigation |
|-------------|--------|-----------|
| LLM prompt for new model is unproven | HIGH — if LLM doesn't reliably produce `ComparisonSection[]` JSON, fallback fires constantly | Test with a few real tool pairs immediately after implementing; iterate on prompt |
| Tool profile section headers not verified against actual `data/tools/*.md` files | MEDIUM — section id mapping (`"features"` etc.) may differ from real file headers | Read 2–3 tool profiles before implementing the prompt; adjust `extractRelevantContent()` if needed |
| LiteLLM model names unknown (models endpoint returns `[]` without auth) | LOW — affects only `OLLAMA_MODEL` value; mock mode still works | Request valid API key from LiteLLM admin; test `GET /models` with key |

### C. Key Line Number References

| Claim | File | Lines |
|-------|------|-------|
| Missing `LlmModule` import in module | `comparison.module.ts` | 6 |
| Missing `PromptBuilderService` provider | `comparison.module.ts` | 9 |
| Controller `compare()` not async | `comparison.controller.ts` | 10 |
| LLM service calls `/v1/chat/completions` | `llm.service.ts` | 71 |
| Auth header conditional | `llm.service.ts` | 78–80 |
| Content extraction path | `llm.service.ts` | 88 |
| Security comment — server controls toolId | `comparison.service.ts` | 107 |
| `buildFallback()` | `comparison.service.ts` | 156–176 |
| `clampScore()` / `extractStringArray()` | `comparison.service.ts` | 178–185 |
| YAML strip + truncation in prompt builder | `prompt.builder.ts` | 61–70 |
| Frontend type stub | `types/comparison.ts` | entire file |
| `selectedModel` trapped locally | `Sidebar.tsx` | 4 (`useState('')`) |
