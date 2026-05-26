# Research Brief — Comparison Feature & LiteLLM Integration

**Date**: 2026-05-26  
**Research Type**: Mixed (Technical + Requirements)  
**Task Directory**: `.flowbit/tasks/research/2026-05-26-comparison-feature-llm-integration/`

---

## Research Question

What is the current implementation state of the comparison feature ("Start Comparing"),
what gaps remain to deliver a working end-to-end flow per epics #5/#6/#7, and what is
the correct data model and integration approach for LiteLLM proxy?

---

## Context

During the session on 2026-05-26, partial implementation was begun for epics #5/#6/#7
of the AI Tools Radar project. The following work was partially completed in-session:

- `LlmService` updated to use OpenAI `/v1/chat/completions` format
- `PromptBuilderService` created (new file)
- `ComparisonService` rewritten to be async, call LlmService, parse JSON
- `CompareToolsDto` extended with optional `model` field
- `LlmCompletionRequest` refactored from `prompt: string` to `messages: ChatMessage[]`

**Not yet completed**:
- `ComparisonModule` not updated (missing LlmModule import, PromptBuilderService provider)
- `ComparisonController` not updated (still sync)
- Frontend `types/comparison.ts` not yet expanded to full model
- Frontend `ComparisonResult.tsx` component not yet updated
- `selectedModel` from Sidebar not yet passed to ToolsPage (routing issue with `<Outlet/>`)
- `ComparisonRequest` frontend type missing `model` field
- Tests for new async comparison behavior not updated

---

## Scope

### Included
- Backend comparison pipeline: `ComparisonModule`, `ComparisonService`, `LlmService`, `PromptBuilderService`
- Frontend comparison flow: `ToolsPage`, `ComparisonResultPage`, `ComparisonResult.tsx`
- LiteLLM proxy API contract (`/v1/chat/completions`, `/models`)
- Full `ComparisonResult` data model definition
- `selectedModel` propagation from `Sidebar` → `ToolsPage`
- Issues #5, #6, #7 acceptance criteria coverage
- Existing tests that need updating

### Excluded
- Radar feature
- Tool profile editing
- Authentication
- CI/CD pipeline

### Constraints
- NestJS + TypeScript strict; class-validator for validation (no zod)
- React + Vite + TypeScript; react-router-dom v6 (Outlet context pattern)
- LiteLLM proxy exposes OpenAI-compatible API at `https://litellm.proxy.innovatingtogether.online`
- `OLLAMA_API_KEY` env var holds the LiteLLM API key

---

## Success Criteria

1. Complete inventory of all changed files and their current state
2. Explicit list of remaining gaps before the feature works end-to-end
3. Confirmed data model contract (TypeScript interfaces) for backend → frontend
4. Confirmed approach for `selectedModel` state propagation (Outlet context)
5. List of tests that need to be added/updated
6. Confidence: HIGH (all claims backed by code evidence)

---

## Research Sub-Questions

| # | Sub-Question | Type | Priority |
|---|---|---|---|
| 1 | What is the exact current state of each changed backend file? | Technical | High |
| 2 | What remains to wire the ComparisonModule correctly? | Technical | High |
| 3 | What is the final agreed ComparisonResult data model? | Requirements | High |
| 4 | How should selectedModel flow from Sidebar to API call? | Technical | High |
| 5 | What frontend changes are still needed? | Technical | High |
| 6 | Which existing tests break and what new tests are needed? | Technical | Medium |
| 7 | Are there any LiteLLM proxy quirks to account for? | Literature | Medium |
