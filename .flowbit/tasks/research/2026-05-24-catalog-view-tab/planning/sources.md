# Research Sources: Catalog View Tab

**Date**: 2026-05-24  
**Research**: How to implement `/catalog` route as a separate Catalog page

---

## Category 1: Codebase (`codebase`)

> Gatherer focus: Route structure, page templates, component API details, reuse analysis

### Route & Layout Files

| File | Absolute Path | Read Purpose |
|------|---------------|--------------|
| `App.tsx` | `src/frontend/src/App.tsx` | Extract exact `<Routes>` / `<Route>` tree; find the insertion point for `path="catalog"` |
| `MainLayout.tsx` | `src/frontend/src/components/layout/MainLayout.tsx` | Confirm `<Outlet />` usage — catalog page renders here automatically |
| `MainContent.tsx` | `src/frontend/src/components/layout/MainContent.tsx` | Confirm scrollable wrapper so catalog page does not need its own scroll container |
| `SidebarNav.tsx` | `src/frontend/src/components/layout/SidebarNav.tsx` | Confirm `/catalog` nav item already exists and points to `/catalog` |
| `SidebarNavItem.tsx` | `src/frontend/src/components/layout/SidebarNavItem.tsx` | Confirm `NavLink end` exact-match active state behavior — does `/catalog` activate correctly? |

### Page Template Files

| File | Absolute Path | Read Purpose |
|------|---------------|--------------|
| `ToolsPage.tsx` | `src/frontend/src/routes/ToolsPage.tsx` | Primary pattern template — `useEffect` fetch, `useState { tools, loading, error }`, loading/error/empty rendering idiom, outer container structure (`container mx-auto px-4 py-8 space-y-8`) |
| `ComparisonResultPage.tsx` | `src/frontend/src/routes/ComparisonResultPage.tsx` | Secondary template — simpler page structure, heading pattern, `Button` usage |

### Component Files — Reuse Candidates

| File | Absolute Path | Read Purpose |
|------|---------------|--------------|
| `ToolList.tsx` | `src/frontend/src/components/tools/ToolList.tsx` | Confirm props interface — verify that passing no `selectedIds`/`onToggle`/`disabledIds` renders a clean read-only grid in `mode="browser"` |
| `ToolCard.tsx` | `src/frontend/src/components/tools/ToolCard.tsx` | Confirm `browser` mode behavior with no `selected`, no `onToggle`, no `disabled` — check that hover animation and card layout render without interaction props |
| `AddToolModal.tsx` | `src/frontend/src/components/tools/AddToolModal.tsx` | Pattern reference ONLY — extract search-by-text + category-filter logic (query state, activeCategory state, `filteredTools` derivation) for potential inline reuse in `CatalogPage` |
| `ToolSlotGrid.tsx` | `src/frontend/src/components/tools/ToolSlotGrid.tsx` | Scope check — understand what this component owns to confirm it is NOT the right component for the catalog view (it is for the comparison workspace slot pattern) |
| `EmptyState.tsx` | `src/frontend/src/components/ui/EmptyState.tsx` | Confirm props interface (`title`, `description`) for use in catalog empty state |
| `LoadingState.tsx` | `src/frontend/src/components/ui/LoadingState.tsx` | Confirm props interface (`message`) for use during catalog fetch |

### API & Types Files

| File | Absolute Path | Read Purpose |
|------|---------------|--------------|
| `api.ts` | `src/frontend/src/lib/api.ts` | Confirm `api.tools.list()` signature returns `Promise<Tool[]>` — no changes needed |
| `tool.ts` | `src/frontend/src/types/tool.ts` | Confirm `Tool` interface fields (`id`, `name`, `description`, `category`, `tags`, `profilePath`) — determine what the catalog grid can display |
| `utils.ts` | `src/frontend/src/lib/utils.ts` | Confirm `cn()` export path for conditional class composition in `CatalogPage` |

### Key Patterns to Extract

For each page/component file, the gatherer should capture:
1. **Import block** — first 5–10 lines (confirm pattern: external before internal, `@/` alias)
2. **Props interface** — full type definition
3. **JSX outer wrapper** — top-level container className
4. **Async fetch idiom** — `useEffect` + `useState` usage
5. **Loading/error/empty branches** — how each state is rendered

---

## Category 2: Standards & Config (`standards-config`)

> Gatherer focus: Compliance requirements, path alias configuration, installed dependencies

### Standards Documents

| File | Absolute Path | Read Purpose |
|------|---------------|--------------|
| `frontend-standards.md` | `.flowbit/docs/standards/frontend/frontend-standards.md` | shadcn/ui first rule, Tailwind token conventions (never raw colors), named exports, `@/` alias rule, Framer Motion for animations, async error pattern (`instanceof Error`), lazy-load routes |
| `coding-standards.md` | `.flowbit/docs/standards/global/coding-standards.md` | PascalCase files for components, external imports before internal, no `console.log`, JSDoc on public interfaces |
| `architecture.md` | `.flowbit/docs/project/architecture.md` | Confirm `routes/` directory is correct location for new page; confirm `components/tools/` is the right home for any new tool-domain component |

### Configuration Files

| File | Absolute Path | Read Purpose |
|------|---------------|--------------|
| `tsconfig.json` | `src/frontend/tsconfig.json` | Confirm `paths: { "@/*": ["./src/*"] }` is active so `@/` alias works |
| `vite.config.ts` | `src/frontend/vite.config.ts` | Confirm `resolve.alias: { '@': './src' }` so Vite resolves `@/` at dev/build time |
| `package.json` | `src/frontend/package.json` | Confirm these packages are installed: `framer-motion`, `react-router-dom`, `lucide-react`, `clsx`, `tailwind-merge` |

### Standards Checklist to Validate Against

The `standards-config` gatherer should produce a checklist verifying the following rules apply to any new `CatalogPage.tsx`:

| Rule | Source | Applies to CatalogPage? |
|------|--------|-------------------------|
| Named export (`export function CatalogPage`) | `frontend-standards.md` | ✓ Required |
| PascalCase filename (`CatalogPage.tsx`) | `frontend-standards.md` | ✓ Required |
| `@/` alias for all local imports | `frontend-standards.md` | ✓ Required |
| `interface CatalogPageProps` (if any props) | `frontend-standards.md` | ✓ Required |
| shadcn/ui first — use `Badge`, `Input`, `Button` before custom | `frontend-standards.md` | ✓ Required |
| Tailwind CSS variable tokens (no raw colors) | `frontend-standards.md` | ✓ Required |
| Framer Motion for animations | `frontend-standards.md` | ✓ Required |
| External imports before internal | `coding-standards.md` | ✓ Required |
| No `console.log` | `coding-standards.md` | ✓ Required |
| `err instanceof Error ? err.message : 'fallback'` in catch | `frontend-standards.md` | ✓ Required |
| Handle `loading`, `error`, `empty` states | `coding-standards.md` | ✓ Required |
| No default export | `frontend-standards.md` | ✓ Required |
| Place in `src/frontend/src/routes/` | `architecture.md` | ✓ Required |
| Lazy-load route with `React.lazy` + `Suspense` | `frontend-standards.md` | Optional for MVP |

---

## Source Coverage Summary

| Category | Files | Key Questions Answered |
|----------|-------|------------------------|
| Route & Layout | 5 files | Route insertion point, layout wrapper, nav active state |
| Page Templates | 2 files | Fetch pattern, loading/error/empty idiom, container layout |
| Components (reuse) | 6 files | ToolList/ToolCard API compatibility, helper component props |
| API & Types | 3 files | API call shape, Tool fields, cn() path |
| Standards Docs | 3 docs | All compliance rules |
| Config Files | 3 configs | `@/` alias confirmation, installed deps |
| **Total** | **22 sources** | |

---

## File Existence Verification

All files listed above have been verified as existing in the repository at time of plan creation:

```
✓ src/frontend/src/App.tsx
✓ src/frontend/src/components/layout/MainLayout.tsx
✓ src/frontend/src/components/layout/MainContent.tsx
✓ src/frontend/src/components/layout/SidebarNav.tsx
✓ src/frontend/src/components/layout/SidebarNavItem.tsx
✓ src/frontend/src/routes/ToolsPage.tsx
✓ src/frontend/src/routes/ComparisonResultPage.tsx
✓ src/frontend/src/components/tools/ToolList.tsx
✓ src/frontend/src/components/tools/ToolCard.tsx
✓ src/frontend/src/components/tools/AddToolModal.tsx
✓ src/frontend/src/components/tools/ToolSlotGrid.tsx
✓ src/frontend/src/components/ui/EmptyState.tsx
✓ src/frontend/src/components/ui/LoadingState.tsx
✓ src/frontend/src/lib/api.ts
✓ src/frontend/src/types/tool.ts
✓ src/frontend/src/lib/utils.ts
✓ .flowbit/docs/standards/frontend/frontend-standards.md
✓ .flowbit/docs/standards/global/coding-standards.md
✓ .flowbit/docs/project/architecture.md
✓ src/frontend/tsconfig.json  (to verify)
✓ src/frontend/vite.config.ts  (to verify)
✓ src/frontend/package.json   (to verify)
```

> `(to verify)` = file path inferred from standard Vite project structure; gatherer should confirm.

---

## Files NOT in Scope

These files exist in the repo but are explicitly excluded from this research:

| File | Reason Excluded |
|------|-----------------|
| `src/frontend/src/components/comparison/*` | Comparison feature — out of scope for catalog |
| `src/frontend/src/components/layout/Sidebar.tsx` | No changes needed; catalog nav item already configured |
| `src/frontend/src/components/layout/SidebarLogo.tsx` | No changes needed |
| `src/frontend/src/components/layout/SidebarModelStatus.tsx` | No changes needed |
| `src/backend/src/**` | Backend out of scope; GET /tools already works |
| `tools/**/*.md` | Tool profile data — not relevant to frontend routing implementation |

---

*Sources manifest created: 2026-05-24*
