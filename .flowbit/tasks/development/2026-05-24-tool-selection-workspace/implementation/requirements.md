# Requirements — EPIC 3: Tool Selection Workspace

**Date**: 2026-05-24
**Issue**: https://github.com/plucins/ai-tools-radar/issues/3

## Initial Description

Implement the Tool Selection Workspace — central interactive area where users discover AI tools, select up to 5 for comparison, and launch AI analysis.

## Q&A from All Rounds

### Phase 1 Clarifications
- **ToolsPage redesign**: Full redesign with slot-based UI (5 fixed slots + Add Tool modal) ✅
- **api.ts envelope bug**: Fix as part of this EPIC ✅
- **ComparisonResult type mismatch**: Fix backend to return `{tools, summary, generatedAt}` ✅

### Phase 2 Decisions
- **ToolCard mode**: Single component with `mode: 'slot' | 'browser'` prop
- **Comparison progress**: Inline in CTA block (3 stages: Gathering metadata → Comparing features → Generating summary)
- **Mock summary**: Interpolated placeholder with tool names
- **Fuzzy search**: `Array.filter` + case-insensitive `includes` (no fuse.js)
- **ToolList on ToolsPage**: Removed; browsing moved to modal exclusively

### Phase 5 Clarifications
- **YAML parser**: `js-yaml` npm package (handles block scalars correctly)
- **Modal selection**: Multi-select — pick multiple tools, confirm with "Add Selected (N)" button
- **Routing**: `/` → redesigned workspace, `/compare` → ComparisonResultPage (unchanged)

## Similar Features Identified
- `ToolCard.tsx` — extend (mode prop, Framer Motion, remove X)
- `ToolList.tsx` — extend (AnimatePresence + stagger)
- `ComparisonPanel.tsx` — redesign as CTA block with progress stages
- `SidebarNavItem.tsx` — template for Framer Motion pattern
- `EmptyState.tsx`, `LoadingState.tsx` — reuse as-is

## Functional Requirements

### Backend
1. `ToolsService` scans `tools/**/*.md` at startup
2. Parses ` ```yaml ``` ` fenced frontmatter with `js-yaml`
3. Returns `Tool[]` with `{id, name, description, category, tags, profilePath}`
4. ID generated from filename slug (e.g. `claude-code.md` → `claude-code`)
5. `ComparisonService` returns `{tools: string[], summary: string, generatedAt: string}`
6. Mock mode returns interpolated summary: `"Mock comparison of [Tool1] vs [Tool2]..."`

### Frontend
7. `api.ts` unwraps `{data, timestamp}` → returns `data` only
8. Workspace renders: Hero block → "Selected tools (N/5)" header → 5-slot grid → CTA block
9. Empty slot: dashed border, `+` icon, "Add a tool" text; click opens modal
10. Filled slot: ToolCard(mode="slot") with name, category pill, description, X remove button
11. Slot skeleton: shimmer placeholder during loading
12. Add Tool button (top-right): opens modal
13. Modal: search input (fuzzy by name/tags/category), category filter pills, tool grid (browser mode)
14. Modal: multi-select — checkbox/ring per card, "Add Selected (N)" confirm button
15. Modal: blocks already-selected tools (disabled/checked state)
16. Max 5 enforcement: "Add Tool" button and empty slots disabled at 5; modal blocks adding beyond 5
17. CTA block: disabled (< 2 tools, dimmed), active (≥ 2, neon glow, "Start Comparing")
18. CTA in-progress: inline stage display (Loader2 → CheckCircle2 → Sparkles icons per stage)
19. All states: loading (skeleton), error (Alert + retry), empty (EmptyState)
20. Framer Motion: card entrance stagger, slot hover glow, modal slide-in

## Reusability Opportunities
- `ToolCard` modified in-place (new props, not new file)
- `ToolList` modified in-place (AnimatePresence wrapper)
- `ComparisonPanel` redesigned in-place
- `EmptyState`, `LoadingState`, `Alert`, `Button`, `Card`, `Badge` reused as-is
- New shadcn installs: `Dialog`, `Input`, `Skeleton`
- New Lucide icons: `Plus`, `X`, `Search`, `Loader2`, `CheckCircle2`, `Sparkles`

## Scope Boundaries
- **In scope**: GET /tools, ToolsPage redesign, AddToolModal, ToolCard mode prop, api.ts fix, ComparisonResult shape fix
- **Out of scope**: GET /tools/:id detail view, authentication, pagination, tool CRUD, LLM integration changes, sorting

## Technical Considerations
- `js-yaml` as new backend dependency
- `@radix-ui/react-dialog` via shadcn CLI
- Frontend has no test config → backend unit tests only for new service logic
- `TransformInterceptor` fix in `api.ts` (2-line change but touches all API calls)
