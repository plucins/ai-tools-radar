# Requirements — Comparison Feature E2E Implementation

**Date**: 2026-05-26  
**Task**: Implement full end-to-end AI Tools Radar comparison feature (epics #5/#6/#7)

---

## Initial Description

Implement the complete end-to-end comparison feature for AI Tools Radar. Based on research of epics
#5/#6/#7. Covers: fix 2 critical DI bugs in comparison.module.ts; replace old score-based data model
with new ComparisonSection/FeatureRow/FeatureValue model; rewrite prompt.builder.ts system prompt;
lift selectedModel state to MainLayout; rewrite ComparisonResult.tsx as tabbed feature-grid UI; update all tests.

---

## Q&A — Requirements Gathering

**Q: Back navigation on result page?**  
A: Yes — comparison result page should include back navigation to the Tools page.

**Q: How to handle empty sections[] (LLM fallback)?**  
A: Show `summary` text + warning banner. Communicate that structured data couldn't be generated but still show whatever text is available.

**Q: FeatureTable column headers?**  
A: Tool names from `toolSummaries[].toolName` (resolved server-side, not raw IDs).

**Q: Loading skeleton on result page?**  
A: Yes — show a skeleton while the result mounts (in addition to ComparisonPanel progress stages).

**Q: Backend test pattern?**  
A: `@nestjs/testing` `TestingModule` with mocked dependencies (existing project pattern).

**Q: Reference components for the new UI?**  
A: shadcn/ui components: Table, Tabs, Skeleton, Accordion, Card. Use them where they fit the use case — not prescriptively.

**Q: Visual assets?**  
A: None provided. Reference HLD component tree and research-report for layout guidance.

---

## Similar Features Identified

- `ToolCard.tsx` — Card pattern with shadcn/ui `Card`, `CardHeader`, `CardContent`
- `ComparisonPanel.tsx` — multi-stage progress UI with shadcn `Badge`, conditional rendering
- `RadarPage` — full-page layout, spacing, Tailwind conventions
- Existing HLD component tree in `analysis/research-context/high-level-design.md`

---

## Functional Requirements Summary

### Backend

1. **Fix DI wiring** — `comparison.module.ts` must import `LlmModule` and provide `PromptBuilderService`
2. **Replace data model** — `ComparisonService` interfaces replace `ComparedTool/Criterion/score` with `FeatureValue/FeatureRow/ComparisonSection(+summary?)/ToolSummary/ComparisonResult`
3. **Rewrite parseAndValidateLlmResponse** — validate new model; server controls `toolId`+`toolName`; filter phantom toolIds from `values[]`
4. **Rewrite buildFallback** — return `toolSummaries[]+sections:[]`; show raw text in `summary`
5. **Rewrite system prompt** — new JSON schema in `prompt.builder.ts`; no scores; 4 static + LLM extras; per ADR-002/ADR-003
6. **Update mockComplete()** — return hardcoded new-model JSON stub unconditionally (no prompt sniff)
7. **Add async to controller** — `comparison.controller.ts` line 10

### Frontend

8. **Replace types/comparison.ts** — 6-interface model: ComparisonRequest, FeatureValue, FeatureRow, ComparisonSection(summary?), ToolSummary, ComparisonResult
9. **Lift selectedModel state** — MainLayout owns state + useModels; passes via `<Outlet context>` via new `OutletContext.ts` type
10. **Convert Sidebar to controlled** — receive selectedModel/onModelChange/models/loading as props
11. **Wire ToolsPage** — `useOutletContext<AppOutletContext>()` + pass `model: selectedModel || undefined`
12. **Rewrite ComparisonResult.tsx** — tabbed layout per research HLD:
    - Skeleton while mounting (new requirement)
    - Back navigation to tools page
    - Recommendation callout (shadcn `Alert` or highlighted card)
    - Summary prose text
    - ToolSummaryCard per tool (new component)
    - shadcn `Tabs` for sections; each tab = `FeatureTable` (new component)
    - Warning banner when `sections[]` is empty (fallback state)
    - `generatedAt` footer timestamp
13. **Create FeatureTable.tsx** — shadcn `Table`; header row = tool names from toolSummaries; rows = features; cells = ✓/✗ icon + description; row label + optional row description
14. **Create ToolSummaryCard.tsx** — shadcn `Card`; shows `bestFor`, `notIdealFor`, `keyDifferentiators` bullets; use `Badge` for differentiator chips if appropriate
15. **Create OutletContext.ts** — exports `AppOutletContext` interface `{ selectedModel: string; onModelChange: (m: string) => void }`

### Tests

16. **Rewrite comparison.service.spec.ts** — new TestingModule with 3 mocks; 10 new tests (new model assertions); await on compare()
17. **Create prompt.builder.spec.ts** — 6 tests: message count/roles, toolId embedding, content truncation, frontmatter stripping, undefined guard
18. **Create llm.service.spec.ts** — 5 tests: mock mode JSON structure, ollama HTTP call, Bearer auth, error propagation

---

## Reusability Opportunities

- `extractRelevantContent()` in `prompt.builder.ts` — **preserve unchanged** (strips frontmatter, truncates per section)
- `useModels` hook in `Sidebar.tsx` — **move to MainLayout**, not rewritten
- Existing `ComparisonPanel.tsx` progress stages — **unchanged** (not in scope)
- Existing `api.ts` comparison.compare() — **no code change needed** (type update is sufficient)

---

## Scope Boundaries

**In scope**: backend DI + data model + prompt + mock; frontend types + state lift + 3 component rewrites + 2 new components + OutletContext; all test files listed above.

**Out of scope** (per research/HLD):
- Comparison history / persistence
- Side-by-side layout modes
- Streaming LLM output
- Shareable comparison URLs
- Radar chart, tool profile authoring, authentication

---

## Technical Considerations

- `ComparisonSection.summary?` is optional — if LLM omits it, FeatureTable renders without section narrative
- `sections[]` may contain 4–7 sections (4 static + up to 3 LLM extras); UI must handle variable count
- `FeatureTable` header row resolves tool names via `toolSummaries[].toolName`, not `result.tools[]` (which contains IDs)
- `shadcn/ui Tabs` must be installed before UI implementation: `npx shadcn@latest add tabs`
- `shadcn/ui Table` may need installing too — check before implementation
- Backend strict TypeScript: `noImplicitAny: false`, `strictNullChecks: true`, `emitDecoratorMetadata: true`
- Frontend: named exports, function components, `@/` path aliases, no semicolons in TSX
