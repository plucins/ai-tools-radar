# Backend Audit Findings — Comparison Feature + LLM Integration

**Research question**: What is the current implementation state of the comparison feature backend, and what gaps remain?

**Audited**: 11 files  
**Date**: 2026-05-26  
**Verdict**: 2 critical DI wiring bugs will crash startup; all other code is solid and complete.

---

## File-by-File Audit

---

### 1. `comparison/comparison.service.ts`

**Status**: ✅ COMPLETE — well-implemented, no gaps

**Summary**:
- Exports interfaces `ComparedTool`, `CriterionRating`, `Criterion`, `ComparisonResult` (lines 7–34)
- `ComparisonService` is `@Injectable()`, constructor injects `ToolsService`, `LlmService`, and `PromptBuilderService` (lines 40–44)
- `compare()` method is `async` ✅ (line 46)
- Calls `toolsService.findOne()` for each toolId, builds prompt via `promptBuilder.buildComparisonMessages()`, awaits `llmService.complete()` (lines 47–54)
- `parseAndValidateLlmResponse()` (lines 69–154): strips markdown fences, parses JSON, validates shape, **never trusts model for toolId/toolName** (line 107 comment — correct security posture), maps comparedTools from server-side `toolMeta`
- `buildFallback()` (lines 156–176): gracefully degrades if LLM returns unparseable output
- `extractStringArray()` and `clampScore()` helpers are clean and correct (lines 178–185)

**Notable code quality**:
```
// Line 107: Server controls toolId and toolName — never trust the model for those
```
Correct defense against prompt-injection via LLM-controlled IDs.

**Gaps**: None.

---

### 2. `comparison/comparison.module.ts`

**Status**: ❌ CRITICAL — two DI providers missing; will crash at startup

**Current content**:
```typescript
@Module({
  imports: [ToolsModule],          // line 4 / line 6
  controllers: [ComparisonController],
  providers: [ComparisonService],  // line 9
})
export class ComparisonModule {}
```

**Gap 1 — Missing `LlmModule` import (line 6, imports array)**:
- `ComparisonService` constructor (comparison.service.ts:40–44) injects `LlmService`
- `LlmModule` is **not** listed in `ComparisonModule`'s `imports`
- NestJS cannot resolve `LlmService` within this module scope
- **Runtime effect**: NestJS will throw at startup:
  `Nest can't resolve dependencies of the ComparisonService (?). Please make sure that the argument LlmService at index [1] is available in the ComparisonModule context.`

**Gap 2 — Missing `PromptBuilderService` provider (line 9, providers array)**:
- `ComparisonService` constructor injects `PromptBuilderService` (comparison.service.ts:43)
- `PromptBuilderService` is defined in `prompt.builder.ts` and is `@Injectable()`, but it is **not registered** in any `providers` array
- **Runtime effect**: NestJS will also throw at startup:
  `Nest can't resolve dependencies of the ComparisonService (?). Please make sure that the argument PromptBuilderService at index [2] is available in the ComparisonModule context.`

**Required fix**:
```typescript
import { LlmModule } from '../llm/llm.module';
import { PromptBuilderService } from './prompt.builder';

@Module({
  imports: [ToolsModule, LlmModule],                          // add LlmModule
  controllers: [ComparisonController],
  providers: [ComparisonService, PromptBuilderService],       // add PromptBuilderService
})
export class ComparisonModule {}
```

---

### 3. `comparison/comparison.controller.ts`

**Status**: ⚠️ MINOR — `compare()` is missing `async`/`await`; not a runtime crash but a code-quality gap

**Current content**:
```typescript
@Post()
compare(@Body() dto: CompareToolsDto) {           // line 10 — not async
  return this.comparisonService.compare(dto);
}
```

**Analysis**:
- `comparisonService.compare()` returns a `Promise<ComparisonResult>` (comparison.service.ts:46)
- NestJS will implicitly await a returned Promise from a controller handler, so this **does not crash at runtime**
- However: the method is not marked `async`, meaning any `throw` from inside the service after the first `await` will be an unhandled rejection in some edge cases depending on NestJS version and exception-filter setup
- Best practice is to mark it `async` and `await` the result for proper exception propagation

**Required fix**:
```typescript
@Post()
async compare(@Body() dto: CompareToolsDto): Promise<ComparisonResult> {
  return this.comparisonService.compare(dto);
}
```

---

### 4. `comparison/prompt.builder.ts`

**Status**: ✅ COMPLETE — well-implemented, no gaps

**Summary**:
- `PromptBuilderService` is `@Injectable()` (line 8) ✅
- `buildComparisonMessages(tools: Tool[]): ChatMessage[]` builds a `[system, user]` message pair (lines 9–59)
- System prompt specifies exact JSON schema the LLM must return, including field names and types (lines 18–51) — aligns perfectly with what `parseAndValidateLlmResponse` expects
- `extractRelevantContent()` (lines 61–70): removes YAML frontmatter, truncates to 3000 chars (`MAX_TOOL_CONTENT_CHARS`) with a `[... content truncated ...]` suffix — prevents token overflow

**Gaps**: None. Note: This service is **complete and correct** but not wired into the module (see gap in file 2 above).

---

### 5. `comparison/dto/compare-tools.dto.ts`

**Status**: ✅ COMPLETE — correct validation

**Summary**:
- `toolIds`: `@IsArray()`, `@IsString({ each: true })`, `@ArrayMinSize(2)`, `@ArrayMaxSize(5)` (lines 11–15) — enforces 2–5 tool comparison
- `model`: `@IsOptional()`, `@IsString()`, `@MinLength(1)` (lines 17–20) — optional model override, rejects empty string

**Gaps**: None.

---

### 6. `llm/llm.service.ts`

**Status**: ✅ COMPLETE — both mock and real HTTP modes implemented

**Summary**:
- Reads config via `ConfigService` from the `'ollama'` namespace (lines 21–28): `mode`, `baseUrl`, `model`, `apiKey`, `timeoutMs`
- `complete()` dispatches to `mockComplete()` or `chatComplete()` based on `this.mode` (lines 31–38)
- `mockComplete()` (lines 40–65): detects comparison prompts by looking for `"summary"` and `"comparedTools"` in the system message, returns valid mock JSON — parseable by `ComparisonService` ✅
- `chatComplete()` (lines 67–93): uses `axios.post` to call OpenAI-compatible `/v1/chat/completions` endpoint; sets `Authorization: Bearer` header only if `apiKey` is non-empty (line 78–80); handles timeout

**Config key alignment** (LlmService ↔ app.config.ts):
| LlmService reads | app.config.ts key | Env var |
|---|---|---|
| `ollama.mode` | `ollamaConfig → mode` | `LLM_MODE` |
| `ollama.baseUrl` | `ollamaConfig → baseUrl` | `OLLAMA_BASE_URL` |
| `ollama.model` | `ollamaConfig → model` | `OLLAMA_MODEL` |
| `ollama.apiKey` | `ollamaConfig → apiKey` | `OLLAMA_API_KEY` |
| `ollama.timeoutMs` | `ollamaConfig → timeoutMs` | `OLLAMA_TIMEOUT_MS` |

All keys align correctly ✅

**Gaps**: None.

---

### 7. `llm/dto/llm.dto.ts`

**Status**: ✅ COMPLETE — clean interfaces

**Summary**:
- `ChatMessage` (lines 1–4): `role: 'system' | 'user' | 'assistant'`, `content: string`
- `LlmCompletionRequest` (lines 6–9): `messages: ChatMessage[]`, optional `model?: string`
- `LlmCompletionResponse` (lines 11–14): `text: string`, `model: string`

All interfaces used correctly across `LlmService`, `PromptBuilderService`, and `ComparisonService`.

**Gaps**: None.

---

### 8. `config/app.config.ts`

**Status**: ✅ COMPLETE — handles all required env vars including `OLLAMA_API_KEY`

**Summary**:
- `appConfig` (lines 3–7): `nodeEnv`, `port`, `frontendOrigin`
- `ollamaConfig` (lines 9–15):
  - `baseUrl` ← `OLLAMA_BASE_URL` (default `http://localhost:11434`)
  - `model` ← `OLLAMA_MODEL` (default `'llama3'`)
  - `apiKey` ← `OLLAMA_API_KEY` (default `''`) ✅ — **does handle OLLAMA_API_KEY**
  - `timeoutMs` ← `OLLAMA_TIMEOUT_MS` (default `120000`)
  - `mode` ← `LLM_MODE` (default `'mock'`)

**Gaps**: None.

---

### 9. `.env.example`

**Status**: ✅ COMPLETE — all required variables present

**Contents**:
```
NODE_ENV=development
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=                    ← empty; defaults to 'llama3' via Joi/config
OLLAMA_API_KEY=                  ← empty; optional, for authenticated endpoints
OLLAMA_TIMEOUT_MS=120000
LLM_MODE=mock
LOGO_DEV_PK=
```

`OLLAMA_MODEL` being empty is intentional — the Joi schema default (`'llama3'`) and config fallback both cover it.

**Gaps**: None.

---

### 10. `config/env.validation.ts`

**Status**: ✅ COMPLETE — validates all env vars with appropriate rules

**Summary**:
- `NODE_ENV`: valid('development', 'production', 'test'), default 'development'
- `PORT`: number, default 3000
- `FRONTEND_ORIGIN`: URI string, default 'http://localhost:5173'
- `OLLAMA_BASE_URL`: URI string, default 'http://localhost:11434'
- `OLLAMA_MODEL`: allows empty string, default 'llama3'
- `OLLAMA_API_KEY`: allows empty string, default ''
- `OLLAMA_TIMEOUT_MS`: number, default 120000
- `LLM_MODE`: valid('mock', 'ollama'), default 'mock' ✅ — will reject any invalid value at startup
- `LOGO_DEV_PK`: allows empty string, default ''

**Gaps**: None.

---

### 11. `app.module.ts`

**Status**: ✅ COMPLETE — all modules registered

**Summary**:
- `ConfigModule.forRoot` with `isGlobal: true` (line 14) — all modules can use `ConfigService` without re-importing ✅
- Loads `appConfig` and `ollamaConfig` (line 15)
- Registers `envValidationSchema` (line 16) — validated at startup
- All feature modules imported: `HealthModule`, `ToolsModule`, `ComparisonModule`, `LlmModule`, `ModelsModule`, `RadarModule` (lines 20–26)

**Note**: `LlmModule` is registered at the `AppModule` level but this **does not** make it available inside `ComparisonModule`. NestJS module scoping requires `LlmModule` to be explicitly imported in `ComparisonModule`'s own `imports` array (see Gap 1 in file 2 above). `LlmModule`'s presence in `AppModule` only makes `LlmService` available to handlers/services declared directly in `AppModule`.

**Gaps**: None in this file itself.

---

## Cross-Cutting Checks

| Check | Result |
|---|---|
| Does `LlmModule` export `LlmService`? | ✅ Yes — `llm.module.ts` line 6: `exports: [LlmService]` |
| Is `LlmModule` imported in `ComparisonModule`? | ❌ NO — `comparison.module.ts` line 6 only imports `ToolsModule` |
| Is `PromptBuilderService` registered as a provider? | ❌ NO — not in any `providers` array anywhere |
| Is `ComparisonController.compare()` async? | ⚠️ NO — line 10 missing `async`; NestJS handles returned Promise but it's a code quality issue |
| Does `app.config.ts` handle `OLLAMA_API_KEY`? | ✅ Yes — `ollamaConfig` line 12: `apiKey: process.env.OLLAMA_API_KEY ?? ''` |

---

## GAPS SUMMARY

### 🔴 CRITICAL — Will crash at startup (DI resolution failures)

#### GAP-1: `comparison/comparison.module.ts` — Missing `LlmModule` in `imports`
- **File**: `src/comparison/comparison.module.ts`, line 6
- **Impact**: `ComparisonService` cannot receive `LlmService` via DI; NestJS throws at bootstrap
- **Fix**: Add `LlmModule` to imports array + add import statement for `../llm/llm.module`

#### GAP-2: `comparison/comparison.module.ts` — Missing `PromptBuilderService` in `providers`
- **File**: `src/comparison/comparison.module.ts`, line 9
- **Impact**: `ComparisonService` cannot receive `PromptBuilderService` via DI; NestJS throws at bootstrap
- **Fix**: Add `PromptBuilderService` to providers array + add import statement for `./prompt.builder`

**Both gaps are in the same file. The complete fix is:**
```typescript
// comparison.module.ts — corrected
import { Module } from '@nestjs/common';
import { ComparisonController } from './comparison.controller';
import { ComparisonService } from './comparison.service';
import { PromptBuilderService } from './prompt.builder';      // ADD
import { ToolsModule } from '../tools/tools.module';
import { LlmModule } from '../llm/llm.module';                // ADD

@Module({
  imports: [ToolsModule, LlmModule],                          // ADD LlmModule
  controllers: [ComparisonController],
  providers: [ComparisonService, PromptBuilderService],       // ADD PromptBuilderService
})
export class ComparisonModule {}
```

---

### 🟡 MINOR — Code quality / best practice

#### GAP-3: `comparison/comparison.controller.ts` — `compare()` not marked `async`
- **File**: `src/comparison/comparison.controller.ts`, line 10
- **Impact**: No runtime crash (NestJS awaits returned Promises), but reduces clarity and may affect exception-filter behavior in edge cases
- **Fix**: Add `async` keyword and `Promise<ComparisonResult>` return type annotation

---

### ✅ Everything else is complete and correct

- `comparison.service.ts` — full implementation with robust parsing and fallback
- `prompt.builder.ts` — correct prompt schema, content truncation, YAML strip
- `compare-tools.dto.ts` — proper validation
- `llm.service.ts` — both mock and real modes, correct config key usage
- `llm.dto.ts` — clean interfaces
- `app.config.ts` — all env vars mapped, including `OLLAMA_API_KEY`
- `.env.example` — all vars present
- `env.validation.ts` — all vars validated with correct types and allowances
- `app.module.ts` — all modules registered, global config

---

## Effort Estimate to Fix All Gaps

| Gap | Effort |
|---|---|
| GAP-1 + GAP-2 (module wiring) | ~5 lines changed in 1 file |
| GAP-3 (async controller) | ~1 line changed |
| **Total** | **< 10 minutes** |

The backend logic is feature-complete. Only the NestJS module wiring is broken.
