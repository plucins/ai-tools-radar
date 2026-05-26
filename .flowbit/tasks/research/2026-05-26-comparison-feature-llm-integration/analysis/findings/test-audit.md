# TEST-AUDIT Findings
**Research question:** Which existing tests are now broken by the comparison feature changes, and what new tests are needed?

**Sources audited:**
- `src/backend/src/comparison/comparison.service.spec.ts` — 5 unit tests
- `src/backend/test/app.e2e-spec.ts` — 1 e2e test
- `src/frontend/src/routes/__tests__/RadarPage.test.tsx` — 2 tests
- `src/frontend/src/routes/__tests__/RadarPage.integration.test.tsx` — 3 tests
- `src/frontend/src/routes/__tests__/RadarPage.states.test.tsx` — 3 tests
- `src/backend/src/llm/llm.service.ts` — no spec file yet
- `src/backend/src/comparison/prompt.builder.ts` — no spec file yet

---

## 1. Existing Test Analysis

### File: `comparison.service.spec.ts`

All 5 tests in this file will **BREAK** due to two root causes that affect the whole suite:

**Root Cause A — Missing DI providers.**
The new `ComparisonService` constructor signature is:
```ts
constructor(
  private readonly toolsService: ToolsService,
  private readonly llmService: LlmService,
  private readonly promptBuilder: PromptBuilderService,
)
```
The test module only registers `ToolsService` and `ConfigService`. `LlmService` and `PromptBuilderService` are absent, so `Test.createTestingModule(…).compile()` will throw a Nest DI resolution error before any test body runs.

**Root Cause B — `compare()` is now `async`.**
All five tests call `service.compare(dto)` synchronously (no `await`). They then assert on the return value in the same tick. Because `compare()` now returns `Promise<ComparisonResult>`, the assertions will run against a pending `Promise` object rather than a resolved result, causing every `expect(…)` to fail even if DI were fixed.

---

#### Test 1 — `compare() returns result with tools matching input toolIds`

**Verdict: BROKEN**

| Failure reason | Detail |
|---|---|
| DI error | `LlmService` and `PromptBuilderService` not provided in module |
| Missing `await` | `result` is a `Promise`, not `ComparisonResult` |
| Logic change | Old code returned tools from `findOne` name-lookup; new code passes raw `dto.toolIds` to the `tools` array then calls `toolsService.findOne` per id; same end result but only reachable if the mocked `LlmService.complete` is set up |

**Fix required:**
- Add `LlmService` and `PromptBuilderService` mocks to the module
- `await service.compare(dto)`
- Mock `llmService.complete` to return a valid JSON payload

---

#### Test 2 — `compare() returns generatedAt as valid ISO 8601 string`

**Verdict: BROKEN**

| Failure reason | Detail |
|---|---|
| DI error | Same as above |
| Missing `await` | `result.generatedAt` is `undefined` on a Promise object |

**Fix required:** Same DI additions + `await`; the `generatedAt` assertion logic itself remains valid once the call is awaited.

---

#### Test 3 — `compare() mock summary contains tool names`

**Verdict: BROKEN**

| Failure reason | Detail |
|---|---|
| DI error | Same as above |
| Missing `await` | Result is a Promise |
| Behaviour removed | `buildMockSummary()` (which interpolated tool names into a free-text string) no longer exists. The summary is now the LLM's `"summary"` field from parsed JSON. The mock `LlmService.complete` must return a JSON string containing the expected names for this assertion to hold |

**Fix required:** DI fix + `await` + mock `llmService.complete` to return JSON with tool names embedded in `"summary"`.

---

#### Test 4 — `compare() falls back to tool id as name when NotFoundException is thrown`

**Verdict: BROKEN**

| Failure reason | Detail |
|---|---|
| DI error | Same as above |
| Missing `await` | Same as above |
| Behaviour removed | The old `compare()` had a `try/catch` around `findOne` that substituted the id as a fallback name. The new implementation (`compare.service.ts` line 47) is `dto.toolIds.map((id) => this.toolsService.findOne(id))` with **no try/catch**. A `NotFoundException` from `findOne` will now propagate out of `compare()` as a rejected promise, not produce a result with the id as name. This test's assertion (`expect(result.tools).toEqual(['unknown-alpha', 'unknown-beta'])`) can never pass. |

**Fix required:**
- Decide desired behavior: either (a) restore a try/catch in `compare()` and update the test, or (b) change the test to assert the rejection. If the controller handles `NotFoundException` at the HTTP layer, the test should assert `await expect(service.compare(dto)).rejects.toThrow(NotFoundException)`.

---

#### Test 5 — `compare() summary uses "and N more" format for more than 2 tools`

**Verdict: BROKEN**

| Failure reason | Detail |
|---|---|
| DI error | Same as above |
| Missing `await` | Same as above |
| Behaviour removed | `buildMockSummary()` with its `"and N more"` logic is gone. The summary is now entirely LLM-driven. |

**Fix required:** DI fix + `await` + the assertion about `"and N more"` must be replaced. Either: mock the LLM to return a summary with that phrase, or drop this test and replace it with an assertion about the new LLM-parsed `summary` field.

---

### File: `app.e2e-spec.ts`

#### Test — `/ (GET)` health check

**Verdict: LIKELY PASSES** (no comparison logic involved)

The test boots `AppModule` and hits the root `GET /` endpoint. It does not exercise `ComparisonService`. Whether it passes depends on whether `LlmModule` and `ComparisonModule` can be instantiated at application boot (i.e., all required providers are registered in their respective modules). If `ComparisonModule` is properly wired with `LlmService` and `PromptBuilderService`, this test is unaffected by the changes.

**Risk:** If `LlmModule` or the `PromptBuilderService` provider is missing from `ComparisonModule`'s imports/providers array, the app will fail to bootstrap and this test will fail with a Nest DI error.

---

### Frontend tests (RadarPage.test.tsx / .integration.test.tsx / .states.test.tsx)

**Verdict: ALL PASS — unaffected**

These 8 tests exclusively test `RadarPage` UI behaviour (loading skeleton, chart render, navigation, error states, empty state). They mock `@/lib/api` and never touch `ComparisonService`, `LlmService`, or `PromptBuilderService`. No changes are needed.

---

## 2. New Tests Needed

### 2.1 Fix + Rewrite: `comparison.service.spec.ts`

The entire existing spec file needs a module-setup overhaul, then individual tests need updating or replacement.

---

#### Required module setup (applies to all new tests)

```ts
const mockLlmService = {
  complete: jest.fn(),
};
const mockPromptBuilder = {
  buildComparisonMessages: jest.fn().mockReturnValue([
    { role: 'system', content: 'system prompt' },
    { role: 'user', content: 'user prompt' },
  ]),
};
const mockToolsService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
};

const module = await Test.createTestingModule({
  providers: [
    ComparisonService,
    { provide: ToolsService,        useValue: mockToolsService },
    { provide: LlmService,          useValue: mockLlmService },
    { provide: PromptBuilderService, useValue: mockPromptBuilder },
  ],
}).compile();
```

---

#### New test N-1: `compare() returns tools list matching input toolIds`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **Replaces** | Test 1 (same intent, fixed) |
| **What it tests** | `result.tools` equals the dto's `toolIds` array |
| **Mock setup** | `toolsService.findOne` returns a valid `Tool`; `llmService.complete` resolves with a valid JSON string |
| **Key assertion** | `expect(result.tools).toEqual(['claude-code', 'github-copilot-cli'])` |
| **Async** | `await service.compare(dto)` |

---

#### New test N-2: `compare() returns a valid ISO 8601 generatedAt timestamp`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **Replaces** | Test 2 (same intent, fixed) |
| **What it tests** | `result.generatedAt` is a parseable ISO 8601 string |
| **Mock setup** | Same as N-1 |
| **Key assertions** | `expect(typeof result.generatedAt).toBe('string')` and `expect(new Date(result.generatedAt).toISOString()).toBe(result.generatedAt)` |

---

#### New test N-3: `compare() returns parsed summary and recommendation from LLM response`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **Replaces** | Test 3 (intent changed: summary now comes from LLM) |
| **What it tests** | `summary` and `recommendation` are taken directly from the LLM JSON payload |
| **Mock setup** | `llmService.complete` resolves with `{ text: JSON.stringify({ summary: 'S', recommendation: 'R', comparedTools: [], criteria: [] }), model: 'llama3' }` |
| **Key assertions** | `expect(result.summary).toBe('S')` and `expect(result.recommendation).toBe('R')` |

---

#### New test N-4: `compare() builds fallback result when LLM returns invalid JSON`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **Replaces** | (new behaviour — no prior test) |
| **What it tests** | `parseAndValidateLlmResponse` fallback path via `buildFallback()` |
| **Mock setup** | `llmService.complete` resolves with `{ text: 'not json at all', model: 'llama3' }` |
| **Key assertions** | `expect(result.summary).toBe('not json at all'.slice(0, 500))`, `expect(result.recommendation).toBe('Could not extract structured recommendation.')`, `expect(result.comparedTools).toHaveLength(2)`, `expect(result.criteria).toEqual([])` |

---

#### New test N-5: `compare() strips markdown code fences from LLM response before parsing`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **What it tests** | Code-fence stripping in `parseAndValidateLlmResponse` (lines 79–81 of service) |
| **Mock setup** | `llmService.complete` resolves with text wrapped in ` ```json … ``` ` |
| **Key assertion** | `result.summary` equals the `summary` value inside the fenced JSON (no parse error / no fallback) |

---

#### New test N-6: `compare() throws NotFoundException (propagates from toolsService.findOne)`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **Replaces** | Test 4 (old try/catch fallback is gone) |
| **What it tests** | `findOne` exception propagates out of `compare()` as a rejected promise |
| **Mock setup** | `toolsService.findOne` throws `new NotFoundException(…)` |
| **Key assertion** | `await expect(service.compare(dto)).rejects.toThrow(NotFoundException)` |

---

#### New test N-7: `compare() uses server-controlled toolId and toolName — never trusts LLM`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **What it tests** | `comparedTools[*].toolId` and `comparedTools[*].toolName` come from `toolMeta` (from `toolsService.findOne`), even if the LLM returns different ids/names |
| **Mock setup** | LLM JSON returns `comparedTools` with wrong toolId; `toolsService.findOne` returns `{ id: 'real-id', name: 'Real Name', … }` |
| **Key assertions** | `expect(result.comparedTools[0].toolId).toBe('real-id')`, `expect(result.comparedTools[0].toolName).toBe('Real Name')` |

---

#### New test N-8: `compare() clamps LLM scores to 1–10 range`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **What it tests** | `clampScore()` applied to `comparedTools[*].score` and `criteria[*].ratings[*].score` |
| **Mock setup** | LLM JSON returns score: 0 for one tool and score: 15 for another; criteria rating with score: -5 |
| **Key assertions** | All clamped scores equal 1 or 10 respectively |

---

#### New test N-9: `compare() filters out criteria ratings for unknown tool ids`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **What it tests** | Only ratings whose `toolId` is in `dto.toolIds` are kept (service line 135) |
| **Mock setup** | LLM JSON returns a criterion with ratings for `['real-id', 'phantom-id']`; dto only has `['real-id']` |
| **Key assertion** | `expect(result.criteria[0].ratings).toHaveLength(1)` and `result.criteria[0].ratings[0].toolId === 'real-id'` |

---

#### New test N-10: `compare() returns empty comparedTools arrays for strengths/weaknesses when LLM omits them`

| Attribute | Value |
|---|---|
| **File** | `comparison.service.spec.ts` |
| **What it tests** | `extractStringArray` guards against missing/non-array `strengths` and `weaknesses` |
| **Mock setup** | LLM JSON returns `comparedTools` entry with no `strengths` / `weaknesses` fields |
| **Key assertions** | `expect(result.comparedTools[0].strengths).toEqual([])`, `expect(result.comparedTools[0].weaknesses).toEqual([])` |

---

### 2.2 New spec file: `prompt.builder.spec.ts`

**File to create:** `src/backend/src/comparison/prompt.builder.spec.ts`

---

#### New test P-1: `buildComparisonMessages() returns exactly two messages (system + user)`

| Attribute | Value |
|---|---|
| **What it tests** | Output length and message roles |
| **Key assertions** | `expect(messages).toHaveLength(2)`, `expect(messages[0].role).toBe('system')`, `expect(messages[1].role).toBe('user')` |

---

#### New test P-2: `buildComparisonMessages() system message contains all tool ids in the schema rules section`

| Attribute | Value |
|---|---|
| **What it tests** | Tool id list is embedded in the system prompt (line 46 of prompt.builder.ts: `comparedTools must contain exactly one entry per tool id: ${toolIds}`) |
| **Mock setup** | Tools with ids `'tool-a'` and `'tool-b'` |
| **Key assertion** | `expect(messages[0].content).toContain('tool-a, tool-b')` |

---

#### New test P-3: `buildComparisonMessages() user message contains each tool's name and content`

| Attribute | Value |
|---|---|
| **What it tests** | `userMessage` includes all tool section headers and content |
| **Mock setup** | Tools with distinct names and non-empty `content` |
| **Key assertions** | `expect(messages[1].content).toContain('### ToolA (id: tool-a)')`, `expect(messages[1].content).toContain('description text')` |

---

#### New test P-4: `extractRelevantContent() truncates content longer than 3000 chars`

| Attribute | Value |
|---|---|
| **What it tests** | `MAX_TOOL_CONTENT_CHARS = 3000` truncation branch (prompt.builder.ts lines 66–69) |
| **Mock setup** | Tool with `content` of 4000 characters |
| **Key assertions** | User message section ends with `[... content truncated ...]`, total section length ≤ 3100 chars |

---

#### New test P-5: `extractRelevantContent() strips YAML frontmatter block before including content`

| Attribute | Value |
|---|---|
| **What it tests** | Regex `replace(/^```yaml[\s\S]*?```\n?/m, '')` on tool content (prompt.builder.ts line 64) |
| **Mock setup** | Tool with content starting with ` ```yaml\nkey: value\n``` ` followed by body text |
| **Key assertion** | User message does **not** contain `` ```yaml `` but **does** contain the body text |

---

#### New test P-6: `extractRelevantContent() returns empty string when tool.content is undefined`

| Attribute | Value |
|---|---|
| **What it tests** | `tool.content ?? ''` guard |
| **Mock setup** | Tool with no `content` field (or `content: undefined`) |
| **Key assertion** | User message tool section is not null/undefined; no error thrown |

---

### 2.3 New spec file: `llm.service.spec.ts`

**File to create:** `src/backend/src/llm/llm.service.spec.ts`

---

#### New test L-1: `complete() in mock mode returns structured JSON when system prompt contains schema keywords`

| Attribute | Value |
|---|---|
| **What it tests** | `mockComplete()` detection of `"summary"` and `"comparedTools"` in system message (llm.service.ts lines 46–57) |
| **Mock setup** | `ConfigService.get('ollama.mode')` returns `'mock'`; system message content includes `"summary"` and `"comparedTools"` |
| **Key assertions** | `JSON.parse(result.text)` succeeds; result has `summary`, `recommendation`, `comparedTools`, `criteria` keys |

---

#### New test L-2: `complete() in mock mode returns generic `[MOCK]` response for non-schema prompts`

| Attribute | Value |
|---|---|
| **What it tests** | Fallback branch of `mockComplete()` (lines 59–64) |
| **Mock setup** | Mode = `'mock'`; system message does not contain schema keywords |
| **Key assertion** | `result.text` starts with `'[MOCK] Response to:'` |

---

#### New test L-3: `complete() in ollama mode calls axios.post with correct URL, model, and messages`

| Attribute | Value |
|---|---|
| **What it tests** | `chatComplete()` HTTP call construction (lines 70–93) |
| **Mock setup** | Mode = `'ollama'`; mock `axios.post` to return `{ data: { choices: [{ message: { content: 'reply' } }], model: 'llama3' } }` |
| **Key assertions** | `axios.post` called with URL ending `/v1/chat/completions`, correct model, messages in body; result `text === 'reply'` |

---

#### New test L-4: `complete() in ollama mode adds Authorization header when apiKey is configured`

| Attribute | Value |
|---|---|
| **What it tests** | Conditional `Authorization` header (lines 78–80) |
| **Mock setup** | `ConfigService.get('ollama.apiKey')` returns `'sk-secret'`; mock `axios.post` |
| **Key assertion** | Captured `headers` argument includes `{ Authorization: 'Bearer sk-secret' }` |

---

#### New test L-5: `complete() in ollama mode propagates axios error as rejected promise`

| Attribute | Value |
|---|---|
| **What it tests** | No error-swallowing in `chatComplete()` |
| **Mock setup** | `axios.post` rejects with `new Error('timeout')` |
| **Key assertion** | `await expect(service.complete(request)).rejects.toThrow('timeout')` |

---

## 3. SUMMARY

### Broken existing tests

| # | File | Test description | Verdict |
|---|---|---|---|
| 1 | `comparison.service.spec.ts` | `compare() returns result with tools matching input toolIds` | **BROKEN** |
| 2 | `comparison.service.spec.ts` | `compare() returns generatedAt as valid ISO 8601 string` | **BROKEN** |
| 3 | `comparison.service.spec.ts` | `compare() mock summary contains tool names` | **BROKEN** |
| 4 | `comparison.service.spec.ts` | `compare() falls back to tool id as name when NotFoundException is thrown` | **BROKEN** |
| 5 | `comparison.service.spec.ts` | `compare() summary uses "and N more" format for more than 2 tools` | **BROKEN** |
| 6 | `app.e2e-spec.ts` | `/ (GET)` health check | **AT RISK** (passes only if module wiring is correct) |
| 7–14 | `RadarPage.{test,integration,states}.test.tsx` (8 tests) | All frontend RadarPage tests | **UNAFFECTED** |

**Total broken:** 5 confirmed broken · 1 at risk · 8 unaffected

---

### New tests to write

| ID | Spec file | Description |
|---|---|---|
| N-1 | `comparison.service.spec.ts` | `compare()` returns correct `tools` array (replaces T1) |
| N-2 | `comparison.service.spec.ts` | `compare()` returns valid ISO 8601 `generatedAt` (replaces T2) |
| N-3 | `comparison.service.spec.ts` | `compare()` returns LLM-parsed `summary` and `recommendation` (replaces T3) |
| N-4 | `comparison.service.spec.ts` | `compare()` falls back when LLM returns invalid JSON |
| N-5 | `comparison.service.spec.ts` | `compare()` strips markdown code fences before parsing |
| N-6 | `comparison.service.spec.ts` | `compare()` propagates `NotFoundException` from `findOne` (replaces T4) |
| N-7 | `comparison.service.spec.ts` | `compare()` always uses server-side toolId/toolName (replaces T5) |
| N-8 | `comparison.service.spec.ts` | `compare()` clamps LLM scores to 1–10 |
| N-9 | `comparison.service.spec.ts` | `compare()` filters criteria ratings for unknown tool ids |
| N-10 | `comparison.service.spec.ts` | `compare()` defaults strengths/weaknesses to `[]` when LLM omits them |
| P-1 | `prompt.builder.spec.ts` *(new)* | `buildComparisonMessages()` returns exactly 2 messages |
| P-2 | `prompt.builder.spec.ts` *(new)* | System message embeds all tool ids |
| P-3 | `prompt.builder.spec.ts` *(new)* | User message contains each tool's name and content |
| P-4 | `prompt.builder.spec.ts` *(new)* | Content truncated at 3000 chars with trailing marker |
| P-5 | `prompt.builder.spec.ts` *(new)* | YAML frontmatter stripped before inclusion |
| P-6 | `prompt.builder.spec.ts` *(new)* | Handles `tool.content === undefined` gracefully |
| L-1 | `llm.service.spec.ts` *(new)* | Mock mode returns structured JSON for schema-containing system prompt |
| L-2 | `llm.service.spec.ts` *(new)* | Mock mode returns `[MOCK]` prefix for generic prompts |
| L-3 | `llm.service.spec.ts` *(new)* | Ollama mode POSTs to correct URL with model and messages |
| L-4 | `llm.service.spec.ts` *(new)* | Ollama mode adds `Authorization` header when API key is set |
| L-5 | `llm.service.spec.ts` *(new)* | Ollama mode propagates axios errors |

**Total new tests: 21** (10 in existing spec, 6 in new `prompt.builder.spec.ts`, 5 in new `llm.service.spec.ts`)

---

*Evidence trail: all line number references verified against the source files at time of audit.*
