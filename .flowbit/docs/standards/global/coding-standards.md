# Global Coding Standards — AI Tools Radar

## Language & Type Safety

- All source code is **TypeScript** (strict mode enabled on both frontend and backend).
- Avoid `any`; use `unknown` with type guards where the shape is not statically known.
- Prefer explicit return types on public functions and exported API handlers.
- Use `const` by default; `let` only when re-assignment is necessary.

### External Imports Before Internal
Order import blocks with third-party/external packages first, followed by project-local imports. This pattern is enforced across 17/18 frontend files and 19/19 backend files.

```typescript
// ✅ Correct
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmService } from './llm.service';

// ❌ Wrong — internal before external
import { LlmService } from './llm.service';
import { Injectable } from '@nestjs/common';
```

## Environment Configuration

- **No secrets or credentials in source code.** All runtime values (URLs, API keys, model names, ports) live in `.env` files.
- Every secret must have a corresponding entry in `.env.example` with a safe placeholder value.
- Frontend env vars are prefixed `VITE_`; backend vars are loaded via NestJS `ConfigModule`.
- Switching runtime modes (e.g., `LLM_MODE=mock` ↔ `LLM_MODE=ollama`) must require zero code changes.

## File & Module Naming

- Files use `kebab-case` (e.g., `tool-profile.service.ts`, `compare-button.tsx`).
- Barrel exports (`index.ts`) are allowed for internal module boundaries but must not re-export across package boundaries.
- Group related files by feature/domain, not by type (prefer `tools/` containing `tools.controller.ts`, `tools.service.ts` over a flat `controllers/` folder).

## Error Handling

- **Never swallow errors silently.** Log at minimum at `warn` level and propagate or surface to the user.
- Backend returns errors in a uniform JSON envelope via a global exception filter.
- Frontend must handle `loading`, `error`, and `empty` states for every async operation.

## Architecture & Module Boundaries

### Keep Frontend Decoupled From LLM
Maintain clean module boundaries so the frontend never knows LLM implementation details. The `LlmService` is backend-internal; the frontend only sees API response shapes.

### Maintain Consistent API Contracts
Keep API request/response shapes consistent between frontend and backend. Shared TypeScript interfaces (in `src/frontend/src/types/`) must mirror the backend's DTO shapes exactly.

## Git Hygiene

- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, etc.).
- Never commit `.env` (only `.env.example`).
- Branch names follow `type/short-description` (e.g., `feat/add-catalog-filter`).

## Documentation & Comments

- Public functions and interfaces must have JSDoc comments.
- Inline comments explain *why*, not *what*.
- Tool profile Markdown files are append-only — never silently replace previous assessments; use dated sections or changelog blocks.

## Prohibited Patterns

- No hard-coded port numbers, base URLs, or model identifiers in application logic.
- No `console.log` in committed code — use the NestJS `Logger` on the backend; remove debug logs before merging on the frontend.
- No superlatives or marketing language in tool profiles; describe what a tool *does* and *how*.

## Workflow & Process

### Consult Standards Index First
Before starting any implementation work, read `.flowbit/docs/INDEX.md` and the linked standards documents. This applies to all contributors and AI coding agents.
