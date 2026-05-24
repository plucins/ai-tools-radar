# Backend Standards — AI Tools Radar

## Stack

| Concern | Technology |
|---|---|
| Framework | NestJS + TypeScript |
| Validation | `class-validator` + `class-transformer` (DTOs) or Zod schemas |
| Config | `@nestjs/config` (`ConfigModule.forRoot`) |
| LLM | Ollama via HTTP; abstracted behind `LlmService` |
| Testing | Jest + `@nestjs/testing` |

## Module Structure

- Each domain feature lives in its own NestJS module directory:  
  `src/<feature>/<feature>.module.ts`, `<feature>.controller.ts`, `<feature>.service.ts`.
- `AppModule` only imports feature modules — no business logic in `AppModule`.
- Shared utilities (guards, filters, interceptors, pipes) live in `src/common/`.

### Feature-per-Module NestJS Organization
Each API feature has its own directory containing a dedicated `*.controller.ts`, `*.service.ts`, and `*.module.ts`. Do not mix feature concerns across directories.
- **Evidence**: 3/3 sampled feature directories follow this structure: `comparison/`, `health/`, `tools/`
- **Confidence**: 85 (code-patterns)

### DTO Files in `dto/` Subdirectory
Backend DTOs live in a `dto/` subdirectory within their feature module and use the `.dto.ts` file suffix.
- **Evidence**: 4/4 sampled DTO files follow this structure
- **Example**: `src/backend/src/comparison/dto/compare-tools.dto.ts`
- **Confidence**: 84 (code-patterns)

## File Naming

### Kebab-case for All Backend Files
All backend source files use kebab-case basenames including NestJS suffix variants. Evidence: 22/22 sampled files follow this.
- Examples: `comparison.controller.ts`, `global-exception.filter.ts`, `env.validation.ts`, `compare-tools.dto.ts`
- **Confidence**: 88 (code-patterns)

## API Design

- REST endpoints follow `/<resource>` (noun, plural) with standard HTTP verbs.
- All endpoints are versioned via URL prefix `/api/v1/` or NestJS versioning.
- Request bodies are validated via DTOs decorated with `class-validator` constraints; invalid requests return `400` with structured error details.
- Successful responses use consistent envelope shape:
  ```json
  { "data": <payload> }
  ```
- Error responses are handled globally by `HttpExceptionFilter`:
  ```json
  { "statusCode": 4xx|5xx, "message": "...", "error": "..." }
  ```

### Unversioned Controller Paths
NestJS controllers use lowercase unversioned resource names in `@Controller()`. No URI version prefixes unless explicitly decided.
- **Evidence**: 3/3 sampled controllers: `@Controller('tools')`, `@Controller('comparison')`, `@Controller('health')`
- **Example**:
  ```typescript
  // ✅ Correct
  @Controller('tools')

  // ❌ Wrong — no version prefix yet
  @Controller('v1/tools')
  ```
- **Confidence**: 74 (code-patterns)

## LLM Integration

- `LlmService` is the single point of contact for LLM calls. Controllers must never call Ollama directly.
- `LLM_MODE` env variable controls behaviour:
  - `mock` — returns deterministic placeholder data; zero external dependencies.
  - `ollama` — calls `OLLAMA_BASE_URL` with model `OLLAMA_MODEL`; honours `OLLAMA_TIMEOUT_MS`.
- Switching modes must require **no frontend changes** and **no code changes** — only `.env` update.
- LLM errors must be caught and converted to meaningful HTTP errors; never leak raw Ollama error bodies to the client.

## Configuration

- All configurable values (ports, CORS origins, LLM settings) are read from `ConfigService`.
- Never call `process.env` directly in service or controller code — use `ConfigService` injection.
- `.env.example` must stay in sync with all required env vars.

## TypeScript Configuration

### NestJS Decorator Requirements
Backend TypeScript must always keep `emitDecoratorMetadata: true` and `experimentalDecorators: true` in `tsconfig.json`. These are required for NestJS dependency injection and cannot be removed.
- **Confidence**: 83 (config)

### Strict Null Checks Required
Backend TypeScript enforces `strictNullChecks: true` and `forceConsistentCasingInFileNames: true`. Note: `noImplicitAny` is currently `false` (plan to enable once stubs are replaced with real implementations).
- **Confidence**: 82 (config)

### Node-targeted TypeScript Configuration
Backend TypeScript targets `ES2023`, uses `nodenext` module resolution, and `commonjs` source type in ESLint. Do not change these to browser-compatible settings.
- **Evidence**: `tsconfig.json`: `module: nodenext`, `moduleResolution: nodenext`, `target: ES2023`
- **Confidence**: 80 (config)

## CORS

- CORS is configured for the local frontend origin only (`CORS_ORIGIN` env var).
- Do not use wildcard `*` in production configuration.

## Error Handling

- Use NestJS `HttpException` subclasses (`NotFoundException`, `BadRequestException`, etc.) to throw domain errors.
- A global `HttpExceptionFilter` catches all unhandled exceptions and formats the error envelope.
- Log errors at `error` level via NestJS `Logger`; include request context.

## Code Style

### Relative Imports for Backend Internal Modules
Backend source files use relative imports for internal modules, never a path alias.
- **Evidence**: 13/13 sampled backend files with internal imports use relative paths
- **Example**:
  ```typescript
  // ✅ Correct
  import { ComparisonService } from './comparison.service';
  import { LlmService } from '../llm/llm.service';

  // ❌ Wrong
  import { ComparisonService } from '@/comparison/comparison.service';
  ```
- **Confidence**: 88 (code-patterns)

### Single Quotes and Trailing Commas
All backend TypeScript code uses single-quoted strings and trailing commas everywhere valid. Enforced by Prettier config.
- **Evidence**: `src/backend/.prettierrc`: `singleQuote: true`, `trailingComma: all`
- **Confidence**: 85 (config)

### Prettier as ESLint Errors
Backend linting treats all Prettier formatting violations as ESLint errors. Run `npm run format` and `npm run lint` before committing.
- **Evidence**: `eslint.config.mjs` imports `eslint-plugin-prettier/recommended`, `prettier/prettier` set to `error` with `endOfLine: auto`
- **Confidence**: 84 (config)

### Interfaces for Exported Structural Types
When declaring exported structural types, prefer `interface` over `type` alias.
- **Evidence**: 6/6 sampled backend files with exported types use `interface`, 0 use `type` alias
- **Example**:
  ```typescript
  // ✅ Correct
  export interface HealthStatus { status: string }

  // ❌ Wrong
  export type HealthStatus = { status: string }
  ```
- **Confidence**: 82 (code-patterns)

### Async/Await Over Promise Chains
Use `async/await` for all asynchronous backend code. Do not use `.then()` chains.
- **Evidence**: 2/2 sampled async backend files use `async/await`, 0/22 files use `.then()`
- **Confidence**: 66 (code-patterns)

### Use Auto-fix Scripts for Formatting
Use the project's built-in scripts rather than manual editor formatting:
- `npm run format` — runs Prettier over all `src/**/*.ts` and `test/**/*.ts`
- `npm run lint` — runs ESLint with `--fix` across `src`, `apps`, `libs`, `test`
- **Confidence**: 81 (config)

## Security

- No secrets in source. `.env` is git-ignored.
- Validate and sanitise all user input via DTOs before passing to services.
- Do not expose internal stack traces in production error responses.

## Testing (Backend-Specific)

See `standards/testing/testing-standards.md` for the full policy. Backend-specific notes:
- Unit test all services with mocked dependencies.
- Integration test controllers using `@nestjs/testing` `TestingModule` with real (in-memory) pipes/filters.
- Mock `LlmService` in all tests that do not specifically test LLM integration.
