# Codebase Implementation Findings
## Research Question: How to implement a Catalog view as `/catalog` route

**Date**: 2026-05-24  
**Source Category**: codebase  
**Files Analyzed**: 14

---

## 1. File-by-File Analysis

---

### 1.1 `src/frontend/src/App.tsx`

**Pattern established**: React Router v6 nested routing with `<BrowserRouter>` + `<Routes>`. A single layout route at `"/"` wraps all page routes via `<Outlet />`.

```tsx
// App.tsx — full content (17 lines)
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ComparisonResultPage } from './routes/ComparisonResultPage'
import { ToolsPage } from './routes/ToolsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="compare" element={<ComparisonResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

**Reuse for CatalogPage**:
- Add `<Route path="catalog" element={<CatalogPage />} />` as a child of the `<Route path="/">` layout route — exactly parallel to the existing `compare` route.
- `MainLayout` (sidebar + content area) is automatically inherited; no layout changes needed.

**Constraints / conventions**:
- All page routes are **relative paths** (no leading `/`) inside the layout route.
- The index route (`/`) is `ToolsPage`; `catalog` must be a separate named child.
- Import pattern for a new page: named export, imported at the top of `App.tsx`.

**Answer to Q4 — exact insertion point**:
```tsx
// BEFORE (line 12):
<Route path="compare" element={<ComparisonResultPage />} />

// AFTER:
<Route path="compare" element={<ComparisonResultPage />} />
<Route path="catalog" element={<CatalogPage />} />
```
Import line to add at the top of `App.tsx`:
```tsx
import { CatalogPage } from './routes/CatalogPage'
```

---

### 1.2 `src/frontend/src/components/layout/SidebarNav.tsx`

**Pattern established**: Static `NAV_ITEMS` array rendered via `SidebarNavItem`. The `/catalog` entry **already exists** in the array.

```tsx
const NAV_ITEMS: NavItem[] = [
  { id: 'compare',        label: 'Compare',        icon: Scale,      to: '/' },
  { id: 'catalog',        label: 'Catalog',         icon: LayoutGrid, to: '/catalog' },   // ← ALREADY PRESENT
  { id: 'my-comparisons', label: 'My Comparisons',  icon: BookOpen,   to: '/my-comparisons' },
  { id: 'about',          label: 'About',            icon: Info,       to: '/about' },
]
```

**Reuse for CatalogPage**: No changes needed. The sidebar nav item already exists and will automatically become active when the route `/catalog` is registered in `App.tsx`. The `LayoutGrid` icon from `lucide-react` is already imported.

**Constraints**: The `to: '/catalog'` value must exactly match the route path registered in `App.tsx`. Currently mismatched (no route registered yet → clicking Catalog leads to no match / blank page).

**EPIC 3 conflict risk**: `SidebarNav.tsx` is **owned by this task** — Group 4-5 should not need to modify it. If "My Comparisons" or "About" pages are added by other groups, they would append to the `NAV_ITEMS` array, which does not conflict with the `/catalog` entry.

---

### 1.3 `src/frontend/src/components/layout/SidebarNavItem.tsx`

**Pattern established**: Uses React Router's `<NavLink>` with `end` prop. Active state is provided by NavLink's render prop `({ isActive })`.

```tsx
import { NavLink } from 'react-router-dom'

export function SidebarNavItem({ to, label, icon: Icon }: SidebarNavItemProps) {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <motion.div
          className={cn(
            'flex h-14 cursor-pointer items-center gap-3 rounded-xl px-4 transition-colors',
            isActive
              ? 'border border-primary/30 bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
          )}
        >
```

**Answer to Q10 — active state mechanism**:
- Uses **`NavLink`** (not plain `Link`) from `react-router-dom`.
- The `end` prop ensures `/catalog` does NOT stay active when navigating to child paths (e.g., `/catalog/detail/123`).
- Active styling: `border-primary/30 bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]` applied via `cn()` utility.
- Icon color: `text-primary` when active vs. `text-muted-foreground` when inactive.
- Framer Motion `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}` on the wrapping `motion.div`.

**Reuse**: No changes needed. Works automatically once the `/catalog` route is registered.

**EPIC 3 conflict risk**: None — this is a pure presentational component with no business logic.

---

### 1.4 `src/frontend/src/routes/ToolsPage.tsx`

**Pattern established**: The canonical page component pattern for this app. Manages its own async data fetch on mount, plus interactive selection, modal, and comparison state.

**Key state variables**:
```tsx
const [tools, setTools] = useState<Tool[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
const [isModalOpen, setIsModalOpen] = useState(false)
const [comparing, setComparing] = useState(false)
const [stage, setStage] = useState<ComparisonStage>(null)
```

**Answer to Q6 — state the CatalogPage must extract**:  
`ToolsPage` uses NO search/filter state — that logic lives entirely inside `AddToolModal`. The `CatalogPage` should implement its **own** `query` and `activeCategory` state (mirroring `AddToolModal`'s pattern) as **page-level state**, not inside a modal. The following state from `ToolsPage` is relevant to Catalog:
- `tools`, `loading`, `error` — identical pattern, copy verbatim.
- `selectedIds`, `isModalOpen`, `comparing`, `stage` — **NOT needed** in CatalogPage (comparison-specific).

**Data fetch pattern to copy**:
```tsx
useEffect(() => {
  setLoading(true)
  api.tools
    .list()
    .then((data) => {
      setTools(data)
      setLoading(false)
    })
    .catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Failed to load tools')
      setLoading(false)
    })
}, [])
```

**Error display pattern**:
```tsx
{error && (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

**Reuse**: The data-fetch block and error/empty rendering can be copied directly. The selection/comparison UI should be omitted.

**EPIC 3 conflict risk**: `ToolsPage.tsx` is heavily touched by Group 4 (comparison flow) and Group 5 (tool selection UI). `CatalogPage.tsx` is a **new file** — no conflict. However, if Group 4-5 refactor the `api.tools.list()` call or the `Tool` type, the Catalog page must be updated in tandem.

---

### 1.5 `src/frontend/src/routes/ComparisonResultPage.tsx`

**Pattern established**: Simpler page — no data fetch, uses `useLocation` state passed via `navigate`. Shows how a page renders entirely within `MainLayout`'s `<Outlet />` without extra layout wrappers.

```tsx
return (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm" onClick={() => navigate('/')}>
        ← Back to Tools
      </Button>
      <h1 className="text-2xl font-bold">Comparison Result</h1>
    </div>
    ...
  </div>
)
```

**Notable observation**: Root element is `<div className="space-y-6">` — no `container mx-auto` wrapper (unlike `ToolsPage` which uses `container mx-auto px-4 py-8 space-y-8`). Both patterns work — `MainContent` provides `p-8` padding.

**Reuse for CatalogPage**: Use `ToolsPage`'s `container mx-auto px-4 py-8 space-y-8` wrapper pattern since Catalog is a full-page content view like `ToolsPage`.

---

### 1.6 `src/frontend/src/components/tools/ToolCard.tsx`

**Props interface**:
```tsx
interface ToolCardProps {
  tool: Tool
  mode: 'slot' | 'browser'
  selected?: boolean
  onRemove?: (id: string) => void
  onToggle?: (id: string) => void
  disabled?: boolean
}
```

**Answer to Q3 — how to use ToolCard in read-only browser mode**:

`ToolCard` is intentionally multi-modal. In `'browser'` mode with **no** `onToggle` prop:
- The `onClick` on `motion.div` calls `onToggle?.(tool.id)` — the `?` makes it a no-op if `onToggle` is undefined.
- No `X` remove button is rendered (only rendered in `'slot'` mode).
- No `CheckCircle2` selected indicator is rendered (only shown when `selected === true`).
- No `ring-2 ring-primary` ring is applied (only when `mode === 'slot'` or `selected === true`).
- No `disabled` / `opacity-40` overlay is applied (only when `disabled === true`).

**Minimal read-only invocation**:
```tsx
<ToolCard tool={tool} mode="browser" />
```
This renders a clean, non-interactive card with name, category (as `<p>` subtitle), description (2-line clamp), and tag pills. Fully usable as-is.

**EPIC 3 conflict risk**: Group 4-5 may add new interaction modes (e.g., link-through to a detail page). If `mode` gets a new value (e.g., `'catalog'`), the CatalogPage's usage of `mode="browser"` is unaffected. If props are renamed, update CatalogPage accordingly.

---

### 1.7 `src/frontend/src/components/tools/ToolList.tsx`

**Props interface**:
```tsx
interface ToolListProps {
  tools: Tool[]
  mode?: 'browser'
  selectedIds?: Set<string>
  pendingIds?: Set<string>
  disabledIds?: Set<string>
  onToggle?: (id: string) => void
}
```

**Answer to Q2 — minimal read-only ToolList invocation**:
All props except `tools` are optional. The simplest read-only grid:
```tsx
<ToolList tools={tools} />
```
- `mode` defaults to `'browser'` (line 32: `mode ?? 'browser'`).
- All selection sets (`selectedIds`, `pendingIds`, `disabledIds`) are `undefined` → `false` for each card's `selected` and `disabled` props.
- `onToggle` is `undefined` → cards are not interactive.

**Answer to Q8 — Framer Motion animation pattern**:
```tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {tools.map((tool, index) => (
    <motion.div
      key={tool.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, delay: index * 0.05 } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
    >
      <ToolCard ... />
    </motion.div>
  ))}
</AnimatePresence>
```
- **Entrance**: fade-in + scale from 0.9 → 1.0, staggered by `index * 0.05s` (50ms per card).
- **Exit**: fade-out + scale back to 0.9, 150ms.
- `AnimatePresence` enables exit animations when cards are filtered out of the list.
- This animation runs automatically when `ToolList` is rendered; no additional configuration needed in `CatalogPage`.

**Grid layout**: `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3` — responsive 1/2/3-column grid.

**Built-in empty state**: `ToolList` renders its own `<EmptyState title="No tools found" ...>` when `tools.length === 0`. For filtered-results empty state (e.g., search returns nothing), this is handled automatically.

**EPIC 3 conflict risk**: Low. Group 4-5 primarily interact with `ToolList` through `AddToolModal`. If they add a new prop (e.g., `onCardClick`), it would be optional and backward-compatible. The CatalogPage's `<ToolList tools={filteredTools} />` call would be unaffected.

---

### 1.8 `src/frontend/src/components/tools/AddToolModal.tsx`

**Answer to Q9 — reusable search/filter logic**:

`AddToolModal` contains the **canonical search + category filter pattern**. The logic is embedded in the component (not extracted to a hook), but can be directly replicated in `CatalogPage`:

**State to replicate**:
```tsx
const [query, setQuery] = useState<string>('')
const [activeCategory, setActiveCategory] = useState<string>('All')
```

**Category derivation**:
```tsx
const categories: string[] = ['All', ...new Set(tools.map((t) => t.category))]
```

**Filter function**:
```tsx
const filteredTools: Tool[] = tools.filter(
  (t) =>
    (activeCategory === 'All' || t.category === activeCategory) &&
    (query === '' ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))),
)
```

This searches across `name`, `description`, and all `tags`. Recommended to copy verbatim into `CatalogPage`.

**UI components used in AddToolModal for search/filter bar**:
- `Search` icon (lucide-react)
- `Input` from `@/components/ui/input`
- `Badge` from `@/components/ui/badge` (for category filter pills)
- `Separator` from `@/components/ui/separator`

**What NOT to copy**: `pendingIds`, `disabledIds`, `handleToggle`, `handleConfirm`, `DialogFooter` — all comparison-selection specific.

**EPIC 3 conflict risk**: `AddToolModal.tsx` is owned by Group 4-5. If they change the filter function, the CatalogPage's independent copy is unaffected (no shared import). Consider creating a shared `useToolFilter` hook to avoid drift in the future — but out of scope for the initial CatalogPage.

---

### 1.9 `src/frontend/src/lib/api.ts`

**Answer to Q1 — how `api.tools.list()` works**:

```tsx
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `HTTP ${response.status}`)
  }
  const envelope = (await response.json()) as ApiEnvelope<T>
  return envelope.data          // ← unwraps { data: T, timestamp: string }
}

export const api = {
  tools: {
    list: () => request<Tool[]>('/tools'),   // GET /tools → Tool[]
    get: (id: string) => request<Tool>(`/tools/${id}`),
  },
  ...
}
```

- **Endpoint**: `GET ${API_BASE_URL}/tools`
- **Returns**: `Promise<Tool[]>` — unwrapped from `{ data: Tool[], timestamp: string }` envelope.
- **Error behavior**: Throws `Error` with response body text, or `HTTP ${status}` if body is empty.
- **No pagination, no query params** — returns the full tool list in one call.

**Available for future CatalogPage enhancements**: `api.tools.get(id)` is available if a detail/modal view is added later.

**EPIC 3 conflict risk**: `api.ts` may be extended by Group 4-5 (e.g., adding comparison methods). The `api.tools.list()` signature is stable. No conflict expected.

---

### 1.10 `src/frontend/src/types/tool.ts`

**Type definitions**:
```tsx
export interface Tool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  profilePath?: string       // optional — path to markdown profile
}

export interface ToolSummary {
  id: string
  name: string
  category: string
}
```

**Relevant for CatalogPage**:
- Import `Tool` for state typing: `useState<Tool[]>([])`.
- All fields rendered by `ToolCard` in `'browser'` mode: `name`, `category`, `description`, `tags`.
- `profilePath` is optional; if populated, could be used to link to a detail view from the catalog in the future.
- `ToolSummary` is not needed for the initial catalog view.

**EPIC 3 conflict risk**: Group 4-5 may add fields (e.g., `pricing`, `vendor`). Since `Tool` uses `interface` (not `type`), additions are additive and won't break CatalogPage's usage.

---

### 1.11 `src/frontend/src/components/ui/EmptyState.tsx`

**Interface**:
```tsx
interface EmptyStateProps {
  title?: string
  description?: string
}
```

**Answer to Q7 — empty state**:
```tsx
// Zero-result catalog (backend returned empty list)
<EmptyState title="No tools available" description="No tool profiles found in the backend." />

// Zero search results (filter returned nothing)
<EmptyState title="No tools found" description="Try a different search term or category." />
```

- Default values: `title = 'No results'`, `description = 'Nothing to display here.'`
- Renders centered `PackageOpen` icon + title + description text.
- Use as-is; no modifications needed.
- `ToolList` renders its own `<EmptyState>` internally when `tools.length === 0`, so if `filteredTools` is passed, the empty state is handled automatically.

---

### 1.12 `src/frontend/src/components/ui/LoadingState.tsx`

**Interface**:
```tsx
interface LoadingStateProps {
  message?: string
}
```

**Answer to Q7 — loading state**:
```tsx
<LoadingState message="Loading catalog..." />
```

- Default: `message = 'Loading...'`
- Renders centered spinning `Loader2` icon + message.
- **Key observation**: `ToolsPage` does NOT use `LoadingState` — it relies on skeleton slots in `ToolSlotGrid` during loading. `CatalogPage` has no slot concept and should use `LoadingState` directly for simplicity.

**Recommended loading guard pattern**:
```tsx
if (loading) return <LoadingState message="Loading catalog..." />
```

---

### 1.13 `src/frontend/src/components/layout/MainLayout.tsx`

**Layout structure**:
```tsx
export function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <MainContent>
        <Outlet />        {/* ← page component renders here */}
      </MainContent>
    </div>
  )
}
```

- `<Outlet />` is where routed page components are injected.
- `Sidebar` includes `SidebarNav` which already has the Catalog nav item.
- `MainContent` provides `flex-1 flex-col overflow-y-auto` + `p-8` padding.
- CatalogPage renders inside `MainContent > main`. **No layout changes needed.**

**EPIC 3 conflict risk**: None expected. Group 4-5 work on page content, not layout shell.

---

### 1.14 `src/frontend/src/components/layout/MainContent.tsx`

**Content area**:
```tsx
export function MainContent({ children }: MainContentProps) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
```

- Provides `p-8` (32px) padding on all sides.
- `overflow-y-auto` enables vertical scrolling when content exceeds viewport.
- `ToolsPage` adds its own `container mx-auto px-4 py-8` on top of the `p-8` from `MainContent` — this is intentional for centering on wide screens.
- `CatalogPage` should follow the same pattern (use `container mx-auto px-4 py-8`).

---

## 2. Specific Question Answers (Summary)

| # | Question | Answer |
|---|----------|--------|
| **Q1** | How does `api.tools.list()` work? | `GET /tools` → unwraps `ApiEnvelope<Tool[]>` → returns `Promise<Tool[]>`. Throws `Error` on non-2xx. No params. |
| **Q2** | ToolList minimal read-only usage? | `<ToolList tools={tools} />` — all other props optional, default to undefined/false. |
| **Q3** | ToolCard read-only browser mode? | `<ToolCard tool={tool} mode="browser" />` — no toggle, no badge ring, no remove button. |
| **Q4** | Where to add `<Route path="catalog">`? | As child of `<Route path="/">` in `App.tsx`, after the `compare` route. Add import at top. |
| **Q5** | Import pattern for new page? | Named export from `./routes/CatalogPage`, imported in `App.tsx` at the top. |
| **Q6** | ToolsPage search/filter state? | None in `ToolsPage` — it's in `AddToolModal`. CatalogPage must implement its own `query` + `activeCategory` state. |
| **Q7** | Loading/error/empty UI components? | `<LoadingState>`, `<Alert variant="destructive">`, `<EmptyState>` — all import from `@/components/ui/`. |
| **Q8** | Framer Motion animation in ToolList? | `AnimatePresence` + per-card `motion.div` with `initial={{ opacity:0, scale:0.9 }}`, staggered entrance by `index * 0.05s`. |
| **Q9** | AddToolModal reusable search logic? | Yes — copy `query`, `activeCategory` state + `categories` derivation + `filteredTools` filter function verbatim. |
| **Q10** | SidebarNavItem active state? | `NavLink` with `end` prop; `({ isActive })` render prop drives `cn()` conditional classes. |

---

## 3. Reuse Map

| Component / Module | Reuse Status | Notes |
|-------------------|--------------|-------|
| `ToolList` | ✅ **As-is** | `<ToolList tools={filteredTools} />` — zero config needed |
| `ToolCard` | ✅ **As-is** | Used internally by `ToolList`; no direct usage needed in CatalogPage |
| `EmptyState` | ✅ **As-is** | Two instances: no tools loaded + no search results (latter via ToolList) |
| `LoadingState` | ✅ **As-is** | `<LoadingState message="Loading catalog..." />` |
| `SidebarNav` | ✅ **No change** | `/catalog` entry already exists |
| `SidebarNavItem` | ✅ **No change** | Active state works automatically |
| `MainLayout` | ✅ **No change** | `<Outlet />` renders CatalogPage automatically |
| `MainContent` | ✅ **No change** | Provides padding and scroll |
| `api.tools.list()` | ✅ **As-is** | Direct call, same as ToolsPage |
| `Tool` type | ✅ **As-is** | Import from `@/types/tool` |
| `Alert` / `AlertTitle` / `AlertDescription` | ✅ **As-is** | Error display, same as ToolsPage |
| `Input` | ✅ **As-is** | Search bar |
| `Badge` | ✅ **As-is** | Category filter pills |
| `Separator` | ✅ **As-is** | Visual divider between search bar and category chips |
| `AddToolModal` | ⚠️ **Logic reference only** | Copy filter logic; do not import or reuse the modal itself |
| `ToolsPage` | ⚠️ **Pattern reference** | Copy data-fetch + error/empty rendering; omit selection/comparison state |
| `App.tsx` | ✏️ **Minimal edit** | Add 1 import + 1 `<Route>` line |
| `ComparisonResultPage` | ❌ **No reuse** | Different concern (result display, no fetch) |
| `ToolSlotGrid` | ❌ **Not applicable** | Comparison-specific slot UI |
| `ComparisonPanel` | ❌ **Not applicable** | Comparison-specific |

---

## 4. CatalogPage Implementation Blueprint

Based on the analysis above, the minimal correct implementation:

```tsx
// src/frontend/src/routes/CatalogPage.tsx
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { ToolList } from '@/components/tools/ToolList'
import { api } from '@/lib/api'
import type { Tool } from '@/types/tool'

export function CatalogPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  useEffect(() => {
    setLoading(true)
    api.tools
      .list()
      .then((data) => { setTools(data); setLoading(false) })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load tools')
        setLoading(false)
      })
  }, [])

  const categories: string[] = ['All', ...new Set(tools.map((t) => t.category))]

  const filteredTools: Tool[] = tools.filter(
    (t) =>
      (activeCategory === 'All' || t.category === activeCategory) &&
      (query === '' ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))),
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero block */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tool Catalog</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse all available AI tools
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading state */}
      {loading && <LoadingState message="Loading catalog..." />}

      {/* Empty catalog (backend returned no tools) */}
      {!loading && !error && tools.length === 0 && (
        <EmptyState
          title="No tools available"
          description="No tool profiles found in the backend."
        />
      )}

      {/* Search + filter + grid */}
      {!loading && tools.length > 0 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                className={activeCategory !== cat ? 'cursor-pointer' : undefined}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* ToolList handles its own filtered-empty state internally */}
          <ToolList tools={filteredTools} />
        </div>
      )}
    </div>
  )
}
```

**App.tsx diff** (2 lines only):
```tsx
// Add import at top (after existing imports):
import { CatalogPage } from './routes/CatalogPage'

// Add route inside <Route path="/">:
<Route path="catalog" element={<CatalogPage />} />
```

---

## 5. EPIC 3 Conflict Risk Assessment

### Files CatalogPage Reads But Does Not Own

| File | Owner (EPIC 3) | Risk | Mitigation |
|------|----------------|------|------------|
| `App.tsx` | Shared | **Medium** — multiple groups add routes | Feature branch; route addition is 1 line with minimal merge conflict surface |
| `ToolList.tsx` | Group 4-5 | **Low** — new optional props are backward-compatible | Only call `<ToolList tools={...} />`; avoid depending on internal implementation |
| `ToolCard.tsx` | Group 4-5 | **Low** — used indirectly via ToolList | If `mode` values change, update only if CatalogPage uses ToolCard directly (it doesn't) |
| `api.ts` | Group 4-5 | **Low** — `tools.list()` signature is stable | No risk unless `/tools` endpoint contract changes |
| `types/tool.ts` | Shared | **Low** — additive interface changes only | TypeScript will flag breaking changes at compile time |

### Files CatalogPage Owns (No Conflict)

| File | Status |
|------|--------|
| `src/frontend/src/routes/CatalogPage.tsx` | **New file** — zero conflict risk |
| `SidebarNav.tsx` | Already has `/catalog` entry — **no changes needed by any group** |

### Files to Avoid Modifying (Group 4-5 Territory)

| File | Reason |
|------|--------|
| `AddToolModal.tsx` | Group 4-5 primary surface; copy filter logic, don't touch the file |
| `ToolSlotGrid.tsx` | Comparison-specific; CatalogPage has no dependency on it |
| `ComparisonPanel.tsx` | Comparison-specific; CatalogPage has no dependency on it |
| `ToolsPage.tsx` | Group 4-5 primary surface; use as reference only |

### Recommended Branching Strategy

- **Branch name**: `feat/catalog-page`
- **Files modified**: `App.tsx` (+2 lines), `src/frontend/src/routes/CatalogPage.tsx` (new)
- **Files NOT modified**: everything else
- **Merge conflicts**: Only possible in `App.tsx` if another group adds a route simultaneously. Resolution: keep both `<Route>` additions.

---

## 6. Confidence Assessment

| Finding | Confidence | Evidence |
|---------|------------|----------|
| `<Route path="catalog">` placement | **100%** | `App.tsx` lines 10–13: clear nested structure |
| `SidebarNav` already has `/catalog` entry | **100%** | `SidebarNav.tsx` line 14: `to: '/catalog'` |
| NavLink active state via `({ isActive })` | **100%** | `SidebarNavItem.tsx` lines 1, 14–16 |
| `ToolList` is usable with just `tools` prop | **100%** | `ToolList.tsx` line 15: all props optional except `tools` |
| `ToolCard mode="browser"` is read-only with no onToggle | **100%** | `ToolCard.tsx` line 27: `onToggle?.(tool.id)` — optional chaining |
| Filter logic in AddToolModal is copy-ready | **100%** | `AddToolModal.tsx` lines 46–55: self-contained state + derivation |
| `api.tools.list()` returns `Tool[]` directly | **100%** | `api.ts` lines 10–23: envelope unwrap; line 28: `request<Tool[]>('/tools')` |
| `LoadingState` not used in ToolsPage (uses skeleton instead) | **100%** | `ToolsPage.tsx`: no `LoadingState` import present |
| Framer Motion stagger: `delay: index * 0.05` | **100%** | `ToolList.tsx` line 27: direct code citation |
| `AnimatePresence` enables exit animations on filter | **100%** | `ToolList.tsx` line 22: `<AnimatePresence>` wraps all cards |
