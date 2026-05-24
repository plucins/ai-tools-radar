# Phase 1 Clarifications

**Date**: 2026-05-24

## Responses

### 1. ToolsPage redesign scope
**Decision**: **Redesign** — Replace the current flat-list ToolsPage with the slot-based workspace design as per EPIC 3 spec:
- 5 fixed tool slots grid
- "Add Tool" modal button  
- Empty slot placeholder with "+" icon
- Selected tools shown as ToolCard within slot
- Remove button per slot

### 2. api.ts envelope bug
**Decision**: **Fix** — Fix the `TransformInterceptor` envelope unwrap bug as part of EPIC 3.
- `request<T>()` must unwrap `{data: T, timestamp: string}` and return `data` only
- This unblocks all endpoints simultaneously

### 3. ComparisonResult type mismatch
**Decision**: **Fix now** — Update backend `ComparisonService` to return the correct shape matching frontend type: `{tools: string[], summary: string, generatedAt: string}`.
- Keep the mock/LLM mode separation intact
- Just align the field names and structure
