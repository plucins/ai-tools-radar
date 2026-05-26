# Requirements Audit — Comparison Feature & LLM Integration

**Research Question**: What are the exact acceptance criteria from issues #5/#6/#7, which are already met by current implementation, and which remain open? Also confirm the LiteLLM API contract.

**Sources investigated**: GitHub Issues #5, #6, #7 · Backend source files · Frontend source files · LiteLLM OpenAPI spec · `.env.example` · Architecture & backend standards docs

---

## 1. Issue #5 — EPIC 5: Widok prezentacji wyniku porównania (Comparison Result View)

**Goal**: Build the frontend view that presents the comparison result received from the backend.

### Required Frontend Data Model (from issue)

```ts
export type ComparisonResult = {
  summary: string;
  recommendation: string;
  comparedTools: Array<{
    toolId: string;
    toolName: string;
    strengths: string[];
    weaknesses: string[];
    score: number;
  }>;
  criteria: Array<{
    name: string;
    description: string;
    ratings: Array<{ toolId: string; score: number; comment: string }>;
  }>;
};
```

### Acceptance Criteria Analysis

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | After comparison user sees the result returned by backend | ✅ **DONE** | `ComparisonResultPage.tsx` renders `ComparisonResult` component when `location.state?.result` is set |
| 2 | View shows summary and final recommendation | ⚠️ **IN_PROGRESS** | `ComparisonResult.tsx` currently only renders `result.summary` and `result.generatedAt` — `recommendation` field is **not rendered** |
| 3 | View shows each compared tool with score, strengths, weaknesses | ❌ **TODO** | `ComparisonResult.tsx` has no `comparedTools` rendering; `types/comparison.ts` doesn't include `comparedTools`, `recommendation`, or `criteria` fields |
| 4 | View shows comparison criteria as table or matrix | ❌ **TODO** | No criteria table/matrix component exists |
| 5 | User can return to tool selection | ✅ **DONE** | `ComparisonResultPage.tsx` has `← Back to Tools` button that calls `navigate('/')` |
| 6 | View handles loading and error states | ✅ **DONE** | `ComparisonPanel.tsx` has full 3-stage loading UI; `ToolsPage` (parent) handles API errors |

**Gap count**: 2 TODO, 1 IN_PROGRESS, 3 DONE

**Root cause of gaps**: `src/frontend/src/types/comparison.ts` defines an **outdated/minimal** `ComparisonResult` interface that is missing `recommendation`, `comparedTools`, and `criteria` — it only has `{ tools, summary, generatedAt }`.

---

## 2. Issue #6 — EPIC 6: Integracja frontend-backend dla przepływu porównania (Frontend-Backend Integration)

**Goal**: Connect the tool-selection view with the backend comparison endpoint and the result presentation view.

### Target User Flow (from issue)
1. User opens tool view → 2. Frontend fetches tools → 3. User selects ≥2 tools → 4. User clicks "Compare" → 5. Frontend sends request → 6. Backend prepares data and calls LLM placeholder → 7. Backend returns structured result → 8. Frontend presents comparison result view

### Acceptance Criteria Analysis

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Full flow from tool selection to result presentation works locally | ⚠️ **IN_PROGRESS** | Flow works end-to-end but result view only shows summary (not full structured data) due to incomplete `ComparisonResult` type |
| 2 | Frontend communicates with backend via configured API address | ✅ **DONE** | `lib/api.ts` uses `API_BASE_URL` from `lib/config.ts` (reads `VITE_API_BASE_URL`); `api.comparison.compare()` POSTs to `/comparison` |
| 3 | Backend returns result in established contract | ✅ **DONE** | Backend `ComparisonService` returns `{ tools, summary, recommendation, generatedAt, comparedTools, criteria }` — full contract is implemented |
| 4 | Frontend correctly renders data from backend | ❌ **TODO** | Frontend type `ComparisonResult` is missing `recommendation`, `comparedTools`, `criteria`; `ComparisonResult.tsx` only renders `summary` text |
| 5 | User receives error message in case of error | ✅ **DONE** | `api.ts::request()` throws on non-ok responses; parent component handles display |
| 6 | During result generation UI shows loading state | ✅ **DONE** | `ComparisonPanel.tsx` implements full 3-stage loading indicator (gathering → comparing → generating) with progress bar |

**Gap count**: 1 TODO, 1 IN_PROGRESS, 4 DONE

**Root cause of gap**: Same as Issue #5 — `types/comparison.ts` is a stub; `ComparisonResult.tsx` needs to be expanded.

---

## 3. Issue #7 — EPIC 7: Przygotowanie projektu do podłączenia rzeczywistego Ollama (LLM Abstraction Layer)

**Goal**: Design code so that in the next step the placeholder can be swapped for a real local LLM call via Ollama (now: LiteLLM-compatible proxy) without rebuilding the architecture.

### Controlling Variable (from issue)
```env
LLM_MODE=mock   # or: ollama
```

### Acceptance Criteria Analysis

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Backend code separates comparison logic from LLM client | ✅ **DONE** | `LlmService` (`src/llm/llm.service.ts`) is fully isolated; `ComparisonService` calls `this.llmService.complete()` — no direct HTTP calls in comparison layer |
| 2 | App can run in mock mode without a live Ollama instance | ✅ **DONE** | `LLM_MODE=mock` (default) returns deterministic JSON mock; no external call made. Confirmed in `llm.service.ts:34–65` |
| 3 | Ollama configuration is documented in `.env.example` | ✅ **DONE** | `.env.example` contains `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `OLLAMA_API_KEY`, `OLLAMA_TIMEOUT_MS`, `LLM_MODE=mock` |
| 4 | Switching from mock to Ollama requires only config change + client implementation, no frontend changes | ✅ **DONE** | `LlmService.chatComplete()` calls OpenAI-compatible `/v1/chat/completions`; `ComparisonResult` contract is fixed; frontend is unaware of LLM mode |
| 5 | Frontend does not know integration details of LLM | ✅ **DONE** | Frontend only calls `POST /comparison`; `LLM_MODE`, Ollama URL, model selection are all backend-only concerns |

**Gap count**: 0 TODO, 0 IN_PROGRESS, 5 DONE ✅

**Note**: Issue #7 is fully resolved by the current backend architecture.

---

## 4. LiteLLM API Contract Confirmation

**Source**: `GET https://litellm.proxy.innovatingtogether.online/openapi.json`

### Available Chat Completion Endpoints

| Path | Method | Notes |
|------|--------|-------|
| `/v1/chat/completions` | POST | **Primary endpoint — use this** (OpenAI-compatible standard path) |
| `/chat/completions` | POST | Alias, also valid |
| `/openai/deployments/{model}/chat/completions` | POST | Azure-style deployment path |
| `/engines/{model}/chat/completions` | POST | Legacy engines path |

**Recommended endpoint**: `/v1/chat/completions` — already used in `LlmService.chatComplete()` at `src/backend/src/llm/llm.service.ts:71`.

### Request Body Schema

```json
{
  "model": "string",       // REQUIRED
  "messages": [            // REQUIRED — array of chat messages
    { "role": "user" | "assistant" | "system" | "tool" | "function" | "developer",
      "content": "string" }
  ],
  "frequency_penalty": null,
  "temperature": null,
  ...other optional OpenAI params
}
```

**Required fields**: `model` (string), `messages` (array)

### Authentication

| Method | Header | Value |
|--------|--------|-------|
| API Key | `x-litellm-api-key` | Bearer token (from LiteLLM `APIKeyHeader` scheme) |
| OpenAI-style | `Authorization` | `Bearer <token>` |

**Current backend implementation** uses `Authorization: Bearer ${this.apiKey}` (set via `OLLAMA_API_KEY` env var) — this is compatible. When `OLLAMA_API_KEY` is empty, no auth header is sent.

> **Note**: Models endpoint returned `[]` (empty) — likely requires auth token to list available models. The `/models` endpoint exists but requires an authenticated request.

### Response Structure

The OpenAPI spec returns `{}` schema for the 200 response (LiteLLM uses a dynamic/passthrough schema). Based on OpenAI specification (which LiteLLM proxies), the response structure is:

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "model": "llama3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0 }
}
```

**Content extraction path**: `response.data.choices[0].message.content`

**Current backend implementation** at `llm.service.ts:88` already uses this exact path:
```typescript
const content = response.data.choices[0]?.message?.content ?? '';
```

✅ **LiteLLM contract fully confirmed and correctly implemented.**

---

## 5. Recommended ComparisonResult Data Model (TypeScript)

### Backend (already implemented — `comparison.service.ts`)

```typescript
// src/backend/src/comparison/comparison.service.ts

export interface ComparedTool {
  toolId: string;
  toolName: string;
  strengths: string[];
  weaknesses: string[];
  score: number;                    // integer 1–10
}

export interface CriterionRating {
  toolId: string;
  score: number;                    // integer 1–10
  comment: string;
}

export interface Criterion {
  name: string;
  description: string;
  ratings: CriterionRating[];
}

export interface ComparisonResult {
  tools: string[];                  // toolIds array
  summary: string;
  recommendation: string;
  generatedAt: string;              // ISO 8601
  comparedTools: ComparedTool[];
  criteria: Criterion[];
}
```

### Frontend (NEEDS UPDATE — `types/comparison.ts`)

**Current state** (too minimal — missing 3 fields):
```typescript
export interface ComparisonResult {
  tools: string[]
  summary: string
  generatedAt: string
}
```

**Required state** (to match backend contract and fulfill issues #5/#6):
```typescript
// src/frontend/src/types/comparison.ts

export interface ComparisonRequest {
  toolIds: string[]
}

export interface ComparedTool {
  toolId: string
  toolName: string
  strengths: string[]
  weaknesses: string[]
  score: number
}

export interface CriterionRating {
  toolId: string
  score: number
  comment: string
}

export interface Criterion {
  name: string
  description: string
  ratings: CriterionRating[]
}

export interface ComparisonResult {
  tools: string[]
  summary: string
  recommendation: string
  generatedAt: string
  comparedTools: ComparedTool[]
  criteria: Criterion[]
}
```

---

## 6. Summary: What's Needed to Close Each Issue

### Issue #5 (Comparison Result View)

**2 remaining tasks**:

1. **Expand `types/comparison.ts`** — add `recommendation`, `comparedTools`, `criteria` to `ComparisonResult` interface (see recommended model above).

2. **Expand `ComparisonResult.tsx`** — currently only renders `summary` as raw text. Must render:
   - `recommendation` section
   - `comparedTools` list/cards (each with score, strengths, weaknesses)
   - `criteria` table or matrix (tool ratings per criterion)

### Issue #6 (Frontend-Backend Integration Flow)

**1 remaining task** (same root cause as #5):

1. **Fix `types/comparison.ts`** (same change as above) — once the type is updated and `ComparisonResult.tsx` renders all fields, the full frontend-backend flow will satisfy the acceptance criteria.

### Issue #7 (LLM Abstraction Readiness)

**No remaining tasks** — fully implemented. All 5 acceptance criteria are met:
- `LlmService` is the sole LLM client
- Mock mode works without external dependencies
- `.env.example` is complete
- Mode switching is config-only
- Frontend is LLM-agnostic

---

## 7. Implementation Priority

```
Priority 1 (unblocks both #5 and #6):
  → Update src/frontend/src/types/comparison.ts

Priority 2 (closes #5 criterion 3):
  → Implement ComparedTool cards in ComparisonResult.tsx

Priority 3 (closes #5 criterion 4):
  → Implement criteria table/matrix in ComparisonResult.tsx

Priority 4 (closes #5 criterion 2 + #6 criterion 4):
  → Render recommendation field in ComparisonResult.tsx
```

---

*Gathered: 2026-05-26 | Sources: gh issue view 5/6/7, LiteLLM OpenAPI spec, codebase analysis*

---

## AMENDMENT: Revised ComparisonResult Data Model (2026-05-26)

**User decision**: Replace numeric scores with descriptive text-based comparison.

### Rationale
Tool profiles in `data/tools/` have rich structured sections: Features (tables with Feature/Description/Status), Pricing, Integrations, Interfaces, Limitations. A score like "7/10" communicates nothing — a text description of what the tool actually supports is far more useful.

### Desired UX
- Multiple **tabs** per comparison (e.g. "Features", "Pricing", "Integrations", "Limitations")
- Each tab shows a **feature comparison table**: rows = feature names, columns = tools
- Cell content = textual description (not a number) or ✓/✗ for binary availability
- Per-tool summary cards: bestFor, notIdealFor, key differentiators (prose)
- Top-level summary + recommendation remain (prose)

### Proposed New ComparisonResult Model

```typescript
// Frontend types (backend mirrors this exactly)

export interface FeatureValue {
  toolId: string
  available: boolean          // does this tool have this feature?
  description: string         // how it works, key notes, or "Not available"
}

export interface FeatureRow {
  name: string                // e.g. "Agentic loop", "MCP support", "Free tier"
  description?: string        // what this feature means (context for user)
  values: FeatureValue[]      // one per compared tool
}

export interface ComparisonSection {
  id: string                  // "features" | "pricing" | "integrations" | "limitations"
  title: string               // display label, e.g. "Core Features"
  features: FeatureRow[]
}

export interface ToolSummary {
  toolId: string
  toolName: string
  bestFor: string             // 1-2 sentences: ideal use case
  notIdealFor: string         // 1-2 sentences: when to avoid
  keyDifferentiators: string[]  // 2-4 bullet points what makes it unique
}

export interface ComparisonResult {
  tools: string[]             // toolIds
  summary: string             // 2-4 sentence overview
  recommendation: string      // which tool for which scenario
  generatedAt: string
  toolSummaries: ToolSummary[]
  sections: ComparisonSection[]  // rendered as tabs in UI
}
```

### LLM Prompt Strategy for This Model
- System prompt must provide explicit JSON schema (no scores, only text)
- Sections should be derived from tool profile content areas: Features, Pricing, Integrations, Limitations
- Feature rows should be the union of features across compared tools
- For absent features: `available: false, description: "Not supported / not documented"`
- Recommended 3-5 sections, 5-10 feature rows per section

### Sections to Extract from Tool Profiles
Based on tool profile structure:
1. **Core Features** — from `## Features / ### Core Features` section
2. **Pricing & Plans** — from `## Pricing` section
3. **Integrations** — from `## Integrations` section
4. **Limitations & Risks** — from `## Limitations & Risks` section
5. (optional) **AI Models** — from `## AI Models` section if relevant
