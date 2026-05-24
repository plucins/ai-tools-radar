# Research Plan: Catalog View Tab

**Date**: 2026-05-24  
**Type**: Technical  
**Status**: Planning complete — ready for information gathering

---

## 1. Research Overview

### Research Question
How should I implement a Catalog view as a separate tab/route (`/catalog`) to display all available tools in the AI Tools Radar app, given the current state of the codebase and the in-progress EPIC 3 work?

### Classification
- **Type**: Technical (codebase analysis + implementation design)
- **Sub-type**: Narrow scope — single new page + one routing change
- **Complexity**: Low–Medium (most building blocks exist; main question is *how* to compose them)

### Scope & Boundaries

**In scope:**
- `App.tsx` routing structure (react-router-dom v7 nested routes)
- `SidebarNav.tsx` / `SidebarNavItem.tsx` active-link behavior
- Existing tools components: `ToolCard`, `ToolList`, `AddToolModal` (pattern reference)
- `ToolSlotGrid` (understand what it owns vs. what is shareable)
- Existing route pages: `ToolsPage`, `ComparisonResultPage` (as layout/pattern templates)
- `api.ts` — `api.tools.list()` already exists
- `Tool` type — `src/types/tool.ts`
- `EmptyState`, `LoadingState` — available UI helpers
- Frontend standards: shadcn/ui first, named exports, `@/` alias, `cn()`, Framer Motion

**Out of scope:**
- Backend changes (GET /tools is ready)
- LLM/comparison features
- Authentication
- Pagination (explicitly excluded by EPIC 3 spec)
- My Comparisons (`/my-comparisons`) and About (`/about`) routes (future work)

---

## 2. Methodology

### Primary Approach
**Codebase composition analysis** — examine existing artifacts to determine reuse strategy and minimal delta implementation.

The research question has a well-scoped answer: we need to identify:
1. Exact diff to `App.tsx` (add one `<Route>`)
2. Exact API call pattern (already established in `ToolsPage`)
3. Which existing components cover the catalog display need vs. which need a new mode
4. Any EPIC 3 Group 4-5 conflict risks
5. Recommended folder/file naming for the new route component

### Fallback Strategies
- If `ToolList` component has hidden coupling to comparison context → design a wrapper
- If Framer Motion stagger pattern in `ToolList` is tightly coupled to modal context → replicate pattern directly in the new page

### Analysis Framework

| Analysis Dimension | Question | Source |
|--------------------|----------|--------|
| Routing | What is the exact pattern to add a new nested route? | `App.tsx` |
| Component reuse | Can `ToolList` be used as-is for a read-only catalog? | `ToolList.tsx`, `ToolCard.tsx` |
| Data fetching | What fetch pattern should the new page follow? | `ToolsPage.tsx` |
| Layout | What wrapping/padding structure do existing pages use? | `ToolsPage.tsx`, `ComparisonResultPage.tsx`, `MainContent.tsx` |
| Filtering/search | Is search/category filter needed for MVP? | `AddToolModal.tsx` (has full search+category logic) |
| Active nav state | Will `/catalog` nav item activate automatically? | `SidebarNavItem.tsx` (NavLink `end` prop) |
| EPIC 3 conflict | Does this touch EPIC 3 Group 4-5 files? | `ToolsPage.tsx`, `App.tsx` |
| Standards compliance | Named export, PascalCase file, `@/` alias, `cn()`, Framer Motion | `frontend-standards.md` |

---

## 3. Data Sources

### Primary Codebase Sources

| File | Purpose in Research |
|------|---------------------|
| `src/frontend/src/App.tsx` | Routing — exact structure to add `/catalog` route |
| `src/frontend/src/components/layout/SidebarNav.tsx` | Nav item configuration — `/catalog` already present |
| `src/frontend/src/components/layout/SidebarNavItem.tsx` | Active-link behavior (`NavLink`, `end` prop) |
| `src/frontend/src/routes/ToolsPage.tsx` | Template — data-fetch pattern, loading/error/empty state handling, page layout |
| `src/frontend/src/routes/ComparisonResultPage.tsx` | Template — simpler page structure reference |
| `src/frontend/src/components/tools/ToolList.tsx` | Reuse candidate — grid layout, AnimatePresence, mode prop |
| `src/frontend/src/components/tools/ToolCard.tsx` | Reuse candidate — browser mode, disabled/selected behavior |
| `src/frontend/src/components/tools/AddToolModal.tsx` | Pattern reference — search + category filter logic |
| `src/frontend/src/components/tools/ToolSlotGrid.tsx` | Scoping — understand what it owns so catalog avoids overlap |
| `src/frontend/src/components/ui/EmptyState.tsx` | Reuse — empty catalog state |
| `src/frontend/src/components/ui/LoadingState.tsx` | Reuse — loading state |
| `src/frontend/src/lib/api.ts` | `api.tools.list()` — confirm API call shape |
| `src/frontend/src/types/tool.ts` | `Tool` interface — fields available for display |
| `src/frontend/src/lib/utils.ts` | `cn()` — confirm import path |

### Documentation Sources

| File | Purpose |
|------|---------|
| `.flowbit/docs/standards/frontend/frontend-standards.md` | shadcn/ui first, Tailwind token conventions, named exports, `@/` alias, Framer Motion |
| `.flowbit/docs/standards/global/coding-standards.md` | PascalCase filenames, kebab-case files, no `console.log`, external imports first |
| `.flowbit/docs/project/architecture.md` | Frontend component organization (`routes/`, `components/tools/`), data flow |
| `.flowbit/docs/project/tech-stack.md` | react-router v7, React 19, shadcn/ui Radix, Framer Motion version awareness |

### Configuration Sources

| File | Purpose |
|------|---------|
| `src/frontend/tsconfig.json` | Confirm `@/` path alias |
| `src/frontend/vite.config.ts` | Confirm `@/` alias resolver |
| `src/frontend/package.json` | Confirm framer-motion, react-router, lucide-react are installed |

---

## 4. Research Phases

### Phase 1: Broad Discovery (already partially complete from brief context)
- Confirm full file tree under `src/frontend/src/`
- Verify no `CatalogPage.tsx` already exists under `routes/`
- Verify EPIC 3 Group 4-5 files are not yet modified (e.g., pending `ToolsPage` rewire hasn't already happened)

### Phase 2: Targeted Reading — Core Files
1. Read `App.tsx` → extract exact Route tree structure
2. Read `SidebarNavItem.tsx` → confirm `NavLink end` behavior for active state
3. Read `ToolsPage.tsx` → extract fetch pattern, loading/error/empty rendering idiom, JSX layout structure
4. Read `ToolList.tsx` + `ToolCard.tsx` → understand all props, determine if read-only catalog use (no `onToggle`, no `selectedIds`, no `disabledIds`) works without modification
5. Read `AddToolModal.tsx` → extract search + category filter pattern for potential CatalogPage reuse

### Phase 3: Deep Dive — Component Compatibility
1. **ToolList for catalog**: Determine if passing no `selectedIds`/`onToggle` renders cleanly in `browser` mode with no selection affordance
2. **ToolCard browser mode with no interaction**: Verify hover animation, disabled state does not show when `disabled` prop is omitted
3. **Search + filter pattern**: Decide whether `CatalogPage` should inline the filter logic from `AddToolModal` (without the dialog wrapper) or whether it's MVP to launch with no filter
4. **Routing conflict check**: Confirm that adding `path="catalog"` as a sibling to `path="compare"` in the existing `Route` tree does not conflict with any pending EPIC 3 Groups 4-5 changes to `App.tsx` or `ToolsPage.tsx`

### Phase 4: Verification
1. Trace the full `NavLink` active state flow for `/catalog`: `SidebarNav` → `SidebarNavItem` → `NavLink to="/catalog"` — confirm `end` prop behavior (exact match)
2. Cross-reference all identified files to confirm no file is missed from the change set
3. Validate standards compliance checklist against all planned new/modified files

---

## 5. Gathering Strategy

### Instances: 2 (max 8)

| # | Category ID | Focus Area | Tools | Output Prefix |
|---|------------|------------|-------|---------------|
| 1 | codebase | Route structure, page templates, component reuse analysis | Grep, Glob, Read | codebase |
| 2 | standards-and-config | Frontend standards, coding standards, tsconfig/@/ alias, package.json deps | Read, Grep | standards-config |

### Rationale

The research scope is deliberately narrow — there is no ambiguity about the backend (it works), no new library to research externally, and no complex architecture decision. All answers live in the local codebase and project documentation.

**Why 2 gatherers (not 4)?**
- The codebase side is the heaviest: route files, component files, ToolsPage pattern. One focused gatherer can cover this without splitting.
- Standards + config are few files and do not overlap with codebase implementation files.
- Launching 3–4 gatherers would create artificial parallelism with no efficiency gain given the small file count (~14 core files).

**What each gatherer covers:**
1. **`codebase`** — reads `App.tsx`, `SidebarNav.tsx`, `SidebarNavItem.tsx`, `ToolsPage.tsx`, `ComparisonResultPage.tsx`, `ToolList.tsx`, `ToolCard.tsx`, `AddToolModal.tsx`, `ToolSlotGrid.tsx`, `EmptyState.tsx`, `LoadingState.tsx`, `api.ts`, `types/tool.ts`, `lib/utils.ts`
2. **`standards-config`** — reads `frontend-standards.md`, `coding-standards.md`, `architecture.md`, `tsconfig.json`, `vite.config.ts`, `package.json`

---

## 6. Analysis Framework

For each artifact, answer these specific questions:

### Routing Analysis (`App.tsx`)
- What is the exact JSX for adding `<Route path="catalog" element={<CatalogPage />} />`?
- Is there any catch-all or redirect that would intercept `/catalog`?
- Does the import pattern suggest lazy-loading should be used?

### Component Reuse Decision Matrix

| Component | Reuse verdict | Notes |
|-----------|---------------|-------|
| `ToolList` | Expected: as-is | Verify no-op when `selectedIds` / `onToggle` not passed in `browser` mode |
| `ToolCard` (browser mode) | Expected: as-is | Verify behavior with no `selected`, no `onToggle`, no `disabled` |
| `EmptyState` | As-is | Already used in ToolsPage |
| `LoadingState` | As-is | Already used in ToolsPage |
| `api.tools.list()` | As-is | Exactly what catalog needs |
| `AddToolModal` | Do NOT reuse whole — extract search/filter pattern if needed | Modal wrapper not needed for page-level catalog |
| `ToolSlotGrid` | Do NOT reuse | Slot mode for comparison workspace, not catalog browse |

### Fetch Pattern (`ToolsPage.tsx`)
- Extract the `useEffect` + `useState` pattern for `{ tools, loading, error }`
- Note exact error normalization: `err instanceof Error ? err.message : 'Failed to load tools'`

### Layout Pattern
- Note outer container: `container mx-auto px-4 py-8 space-y-8`
- Note heading pattern: `<h1 className="text-3xl font-bold tracking-tight">` 
- Confirm `MainContent` provides scrollable wrapper — no additional scroll container needed in page

### EPIC 3 Conflict Analysis
- Groups 4-5 touch: `ToolsPage.tsx` (rewire) and likely `App.tsx` if routing needs adjustment
- Catalog page adds a NEW file (`routes/CatalogPage.tsx`) and ONE new `<Route>` element — minimal surface area
- Risk: if Group 4 adds new shared state or context at `App.tsx` level, catalog route inherits it automatically (likely safe)

### Search/Filter Decision (MVP scope)
- `AddToolModal` contains full search + category filter logic
- For MVP catalog page: **recommend inline search + category filter** — it's < 30 lines of state and dramatically improves catalog usability (single source of truth: all tools with filter)
- Alternative: launch without filter, add in follow-up

---

## 7. Success Criteria

Research is complete when all of the following are answered with evidence:

- [ ] **File change set identified**: exact list of files to create and files to modify
- [ ] **Route registration pattern**: exact `<Route>` JSX to add in `App.tsx`
- [ ] **Component reuse confirmed**: ToolList and ToolCard work as-is for read-only catalog (or modification spec defined)
- [ ] **Page layout template**: container + heading structure from existing pages
- [ ] **Data fetch pattern**: `useEffect`/`useState` idiom from `ToolsPage`
- [ ] **EPIC 3 conflict check**: confirmed no overlap with Groups 4-5 pending files
- [ ] **Search/filter scope decision**: MVP scope decision with rationale
- [ ] **Active nav behavior**: `NavLink end` prop correctly activates `/catalog` item
- [ ] **Standards compliance checklist**: named export, PascalCase, `@/` alias, `cn()`, Framer Motion usage verified

---

## 8. Expected Outputs

| Output | Description |
|--------|-------------|
| `analysis/findings/codebase-implementation.md` | Route structure, component API details, fetch patterns, reuse decisions |
| `analysis/findings/standards-config-compliance.md` | Standards checklist, tsconfig alias confirmation, package deps |
| `analysis/synthesis.md` | Final implementation recommendation: files to create/modify, component composition, EPIC 3 conflict status |
| `analysis/report.md` | Human-readable research report with implementation guidance |

---

*Research plan created: 2026-05-24*
