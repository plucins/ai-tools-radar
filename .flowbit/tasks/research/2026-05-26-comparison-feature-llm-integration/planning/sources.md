# Research Sources

## Codebase Sources

### Backend — Comparison Module

| File | Purpose |
|---|---|
| `src/backend/src/comparison/comparison.module.ts` | Verify `imports` (must add `LlmModule`) and `providers` (must add `PromptBuilderService`) |
| `src/backend/src/comparison/comparison.service.ts` | Confirm async pipeline, LlmService call, JSON parsing, fallback logic |
| `src/backend/src/comparison/comparison.controller.ts` | Confirm whether `compare()` is async and returns `Promise<ComparisonResult>` |
| `src/backend/src/comparison/prompt.builder.ts` | Confirm `PromptBuilderService` is `@Injectable()` and exports `buildComparisonMessages()` |
| `src/backend/src/comparison/dto/compare-tools.dto.ts` | Confirm `model?: string` field is present with correct validators |
| `src/backend/src/comparison/comparison.service.spec.ts` | Audit all test cases — identify which are stale after the async refactor |

### Backend — LLM Module

| File | Purpose |
|---|---|
| `src/backend/src/llm/llm.module.ts` | Confirm `LlmService` is exported (so `ComparisonModule` can import it) |
| `src/backend/src/llm/llm.service.ts` | Confirm OpenAI `/v1/chat/completions` call, `Authorization: Bearer` header, model override logic |
| `src/backend/src/llm/dto/llm.dto.ts` | Confirm `ChatMessage`, `LlmCompletionRequest` (messages array), `LlmCompletionResponse` interfaces |

### Backend — Configuration

| File | Purpose |
|---|---|
| `src/backend/src/app.module.ts` | Confirm `LlmModule` and `ComparisonModule` are both registered |
| `src/backend/src/config/env.validation.ts` (or equivalent) | Confirm `OLLAMA_API_KEY` Joi rule and mapped key name |
| `src/backend/src/config/ollama.config.ts` (or equivalent) | Confirm `ConfigService` key namespace `ollama.apiKey` → `process.env.OLLAMA_API_KEY` |
| `src/backend/.env.example` | Confirm `OLLAMA_API_KEY`, `OLLAMA_BASE_URL`, `LLM_MODE` are documented |

### Frontend — Types

| File | Purpose |
|---|---|
| `src/frontend/src/types/comparison.ts` | Confirm missing fields: `recommendation`, `comparedTools`, `criteria`, `model?` on request |
| `src/frontend/src/types/tool.ts` | Reference — understand `Tool` interface used in comparisons |
| `src/frontend/src/types/model.ts` | Confirm `ModelListResponse` — used by `useModels` hook |

### Frontend — Components

| File | Purpose |
|---|---|
| `src/frontend/src/components/comparison/ComparisonResult.tsx` | Confirm which fields are rendered; identify missing sections (recommendation, criteria table, tool cards) |
| `src/frontend/src/components/comparison/ComparisonPanel.tsx` | Confirm props interface — does it need a `model` prop or does it only trigger comparison? |
| `src/frontend/src/components/layout/Sidebar.tsx` | Confirm `selectedModel` state; confirm it is NOT currently passed via Outlet context |
| `src/frontend/src/components/layout/MainLayout.tsx` | Confirm `<Outlet />` is bare (no `context` prop) |
| `src/frontend/src/components/layout/SidebarModelStatus.tsx` | Confirm `selectedModel` display and `onModelChange` wiring |

### Frontend — Routes

| File | Purpose |
|---|---|
| `src/frontend/src/routes/ToolsPage.tsx` | Confirm `handleCompare` omits `model` field; confirm no `useOutletContext` usage yet |
| `src/frontend/src/routes/ComparisonResultPage.tsx` | Confirm how result is received (`useLocation().state`) and passed to `ComparisonResult` component |

### Frontend — Hooks & Lib

| File | Purpose |
|---|---|
| `src/frontend/src/hooks/useModels.ts` | Confirm return shape `{ models, loading }` — needed to understand what `Sidebar` has available |
| `src/frontend/src/lib/api.ts` | Confirm `comparison.compare()` call shape; confirm it uses `ComparisonRequest` type |
| `src/frontend/src/lib/config.ts` | Confirm `API_BASE_URL` export used in `api.ts` |

### Frontend — Router Setup

| File | Purpose |
|---|---|
| `src/frontend/src/App.tsx` (or `main.tsx` / router config) | Confirm route tree — verify `MainLayout` wraps `ToolsPage` via `<Outlet>`, confirming Outlet context is the right propagation mechanism |

---

## Documentation Sources

### Project Documentation
| Path | Purpose |
|---|---|
| `.flowbit/docs/project/architecture.md` | System architecture, data flow, API contract — baseline for gap comparison |
| `.flowbit/docs/standards/backend/backend-standards.md` | NestJS module structure, DTO conventions, LLM integration rules, import style |
| `.flowbit/docs/standards/frontend/frontend-standards.md` | React component conventions, Outlet context pattern, TypeScript strict mode, Tailwind tokens |
| `.flowbit/docs/standards/testing/testing-standards.md` | Test file conventions, mock policy, coverage targets — used to scope new tests |

### Code Documentation
- Inline `@Injectable()` decorator on `PromptBuilderService` — confirms it is wirable by NestJS DI
- JSDoc / inline comments in `comparison.service.ts` re: server-controlled toolId/toolName
- Comments in `llm.service.ts` re: mock mode detection logic

---

## Configuration Sources

| File | Key Variables to Check |
|---|---|
| `src/backend/.env.example` | `OLLAMA_API_KEY`, `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `LLM_MODE`, `OLLAMA_TIMEOUT_MS` |
| `src/backend/src/config/env.validation.ts` | Joi schema — how `OLLAMA_API_KEY` is validated and whether it is optional |
| `src/backend/package.json` | `axios` dependency confirmed (used for HTTP in `LlmService`) |
| `src/frontend/package.json` | `react-router-dom` version — confirm v6 to validate Outlet context pattern |
| `src/frontend/.env.example` | `VITE_API_BASE_URL` |

---

## External Sources

### LiteLLM Proxy
| Resource | URL | Purpose |
|---|---|---|
| LiteLLM proxy base URL | `https://litellm.proxy.innovatingtogether.online` | Runtime target for `OLLAMA_BASE_URL` |
| LiteLLM `/v1/models` endpoint | `https://litellm.proxy.innovatingtogether.online/v1/models` | List available models — confirm model IDs valid in `model?` field |
| LiteLLM docs — OpenAI compatibility | `https://docs.litellm.ai/docs/proxy/quick_start` | Confirm `/v1/chat/completions` request/response schema |
| OpenAI Chat Completions reference | `https://platform.openai.com/docs/api-reference/chat/create` | Authoritative schema if LiteLLM docs are unavailable |

### react-router-dom v6 Outlet Context
| Resource | URL | Purpose |
|---|---|---|
| Outlet context API | `https://reactrouter.com/en/main/hooks/use-outlet-context` | Confirm `useOutletContext<T>()` pattern — the correct approach for passing `selectedModel` from `MainLayout` → `ToolsPage` |

### Issues (GitHub)
| Resource | Command | Purpose |
|---|---|---|
| Epic #5 | `gh issue view 5` | Full acceptance criteria for the comparison result view |
| Epic #6 | `gh issue view 6` | Full acceptance criteria for frontend-backend integration flow |
| Epic #7 | `gh issue view 7` | Full acceptance criteria for LLM abstraction / mock mode |

---

## File Pattern Cheat Sheet (for glob/find during gathering)

```
# All backend comparison files
src/backend/src/comparison/**/*.ts

# All backend LLM files
src/backend/src/llm/**/*.ts

# Backend config files
src/backend/src/config/**/*.ts
src/backend/src/app.module.ts
src/backend/.env.example

# All frontend type files
src/frontend/src/types/**/*.ts

# All frontend comparison components
src/frontend/src/components/comparison/**/*.tsx

# All frontend layout components
src/frontend/src/components/layout/**/*.tsx

# All frontend routes
src/frontend/src/routes/**/*.tsx

# All frontend hooks
src/frontend/src/hooks/**/*.ts

# All test/spec files in scope
src/backend/src/comparison/**/*.spec.ts
src/frontend/src/components/comparison/**/*.test.*
src/frontend/src/routes/**/*.test.*
```
