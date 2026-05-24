# Testing Standards — AI Tools Radar

## Philosophy

- Tests are **first-class code** — apply the same quality bar as production code.
- Prefer testing **behaviour over implementation**: test what the unit does, not how it is wired internally.
- Every new feature must ship with tests. Every bug fix must include a regression test.

## Test Types & Coverage Targets

| Layer | Type | Tool | Coverage Target |
|---|---|---|---|
| Backend services | Unit | Jest | ≥ 80 % line coverage |
| Backend controllers | Integration | `@nestjs/testing` | Happy path + error paths |
| Frontend utilities / hooks | Unit | Vitest + RTL | ≥ 80 % line coverage |
| Frontend components | Component smoke | React Testing Library | Critical user flows |
| End-to-end | (future) | Playwright | Key user journeys |

## Backend Unit Test File Convention

Backend unit tests live under `src/` alongside the code they test and use the `.spec.ts` file suffix. E2E tests live separately under `test/` with their own Jest config (`jest-e2e.json`). Never mix unit and e2e tests.

- **Evidence**: `package.json`: `jest.rootDir: src`, `jest.testRegex: .*\.spec\.ts$`, `scripts.test:e2e` uses `./test/jest-e2e.json`
- **Example**: `src/health/health.controller.spec.ts` (unit), `test/app.e2e-spec.ts` (e2e)
- **Confidence**: 84 (config)

## Naming Conventions

- Test files: `<subject>.spec.ts` (colocated with source) or `<subject>.test.ts` in `__tests__/`.
- Test suite: `describe('<ClassName or function name>', ...)`.
- Test case: `it('should <expected behaviour> when <condition>', ...)`.

## Test Structure (AAA)

```
Arrange — set up data, mocks, and system under test
Act     — invoke the unit
Assert  — verify the result
```
Keep each test focused on one behaviour. Split into multiple `it` blocks rather than one large test.

## Mocking

- **Backend:** Use Jest `jest.fn()` / `jest.spyOn()`. Inject mocks via NestJS `overrideProvider`.
- **Frontend:** Use `vi.fn()` (Vitest) or `jest.fn()`. Mock `fetch` / API calls at the module boundary with `msw` or manual mocks.
- Never mock the module under test itself.
- Reset mocks between tests (`jest.resetAllMocks()` in `afterEach` or via config `clearMocks: true`).

## What NOT to Test

- Framework internals (NestJS DI wiring, React reconciler).
- Pure configuration files.
- Trivial getters/setters with zero logic.

## CI Requirements

- All tests must pass before merging to `main`.
- Test commands:
  - Backend: `npm run test` (from `src/backend/`)
  - Frontend: `npm run test` (from `src/frontend/`)
- No `--watch` or `--only` flags in CI; run the full suite.
- Test failures are blocking — do not merge with skipped (`xit`, `xdescribe`) tests unless explicitly documented with a linked issue.

## Snapshot Testing

- Use snapshot tests sparingly — only for stable, intentional UI structures.
- Update snapshots intentionally (`--updateSnapshot`) and include the diff in the PR description.

## LLM / External Services

- All LLM calls are mocked in unit and integration tests. Use `LLM_MODE=mock` for local runs.
- Tests must never make real HTTP calls to Ollama or any external service.
