# Standards & Configuration Compliance Findings
## Research Question: What standards and configuration constraints apply to implementing a Catalog view page in the AI Tools Radar frontend?

**Source category**: `standards-config`
**Gathered**: 2026-05-24
**Sources analysed**: 6 files — `frontend-standards.md`, `coding-standards.md`, `architecture.md`, `tech-stack.md`, `tsconfig.json` + `tsconfig.app.json`, `package.json`

---

## 1. File & Component Naming

### Standard
**Source**: `frontend-standards.md` § "Component Structure" and § "PascalCase Component Files"

- All React component and route files use **PascalCase filenames**.
- The filename must match the exported component name exactly (e.g. `ToolCard.tsx`, `ComparisonResultPage.tsx`).
- Non-PascalCase (`kebab-case`) is reserved for lib/utility files (`api.ts`, `utils.ts`, `config.ts`).
- **Confidence**: 86 (code-patterns — 9/9 sampled files conform)

**Source**: `coding-standards.md` § "File & Module Naming"
> "Files use `kebab-case`" — this applies to **non-component** files. For React components the frontend-standards PascalCase rule takes precedence (confirmed by existing routes: `ToolsPage.tsx`, `ComparisonResultPage.tsx`).

### Application to CatalogPage
| Decision | Requirement |
|---|---|
| New route/page file | `CatalogPage.tsx` (PascalCase, not `catalog-page.tsx` or `index.tsx`) |
| Exported component | `export function CatalogPage(...)` — named export, matching filename |
| Sub-components extracted for the page | Also PascalCase: `CatalogToolCard.tsx`, `CatalogFilterBar.tsx`, etc. |

---

## 2. shadcn/ui-First Rule

### Standard
**Source**: `frontend-standards.md` § "shadcn/ui First — No Custom Components Without Checking"

> Before building any new UI component, check whether shadcn/ui already provides a suitable one. Only create a custom component when no shadcn/ui component covers the use case.

**Workflow enforced**:
1. Check https://ui.shadcn.com/docs/components first
2. If match → `npx shadcn@latest add <component>`
3. Only if no match → create custom in `src/components/ui/` or relevant feature dir

**Directly applicable shadcn/ui components for a Catalog page**:

| UI Need | shadcn/ui Component | Import Path |
|---|---|---|
| Tool result cards | `Card`, `CardHeader`, `CardContent`, `CardFooter` | `@/components/ui/card` |
| Primary action buttons | `Button` | `@/components/ui/button` |
| Category/view tabs | `Tabs` | `@/components/ui/tabs` |
| Search or filter input | `Input`, `Label` | `@/components/ui/input` |
| Status feedback | `Badge` | `@/components/ui/badge` |
| Loading skeleton | `Skeleton` | `@/components/ui/skeleton` |
| Empty state | (custom `EmptyState` already exists) | `@/components/ui/EmptyState` |
| Scroll container | `ScrollArea` | `@/components/ui/scroll-area` |
| Dividers | `Separator` | `@/components/ui/separator` |
| Error/warning messages | `Alert`, `AlertDescription`, `AlertTitle` | `@/components/ui/alert` |

**Rule**: Do **not** write a custom `<MyCard>` or `<FilterButton>` if the above shadcn/ui components cover the need.

---

## 3. Async State Management Pattern

### Standard
**Source**: `frontend-standards.md` § "Data Fetching & Async State"

- **No React Query or global store** — the stack explicitly says: "React built-ins (`useState`, `useContext`); no global store unless justified."
- **Required triple-state shape**: every data-fetching hook exposes `{ data, loading, error }`.
- **All three states must be rendered** — never assume the happy path.
- **API base URL**: consume via `import.meta.env.VITE_API_BASE_URL` (via `@/lib/api` or `@/lib/config`); never hardcode `localhost`.

### Confirmed Pattern (from `ToolsPage.tsx` — direct evidence)
```tsx
// ✅ Canonical pattern — copy this for CatalogPage
const [tools, setTools]     = useState<Tool[]>([])
const [loading, setLoading] = useState(true)
const [error, setError]     = useState<string | null>(null)

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

### Application to CatalogPage
- Use `useState` + `useEffect` (React Query is **not installed**).
- Expose `{ tools, loading, error }` — render a `<Skeleton>` or `<LoadingState>` when `loading`, an `<Alert>` when `error`, the tool grid when data is present.
- Error narrowing: **always** `err instanceof Error ? err.message : 'fallback'` (never `err.message` directly — TypeScript strict mode bans it on `unknown`).

---

## 4. Accessibility Requirements

### Standard
**Source**: `frontend-standards.md` § "Accessibility"

- Interactive elements **must** have `aria-label` when the label is not visible text.
- Keyboard navigation must work for **all primary flows** — catalog selection and comparison trigger are explicitly called out.
- Minimum contrast ratio **4.5:1** for body text against dark backgrounds.

### Application to CatalogPage
| Element | Requirement |
|---|---|
| Tool cards (if clickable/selectable) | `aria-label="Select {tool.name}"` or visible label text |
| Filter/search inputs | Associated `<Label>` or `aria-label` |
| "Compare" / primary action buttons | Descriptive label, not just an icon |
| Tab navigation (if using shadcn `Tabs`) | shadcn/ui Tabs include ARIA roles — use as-is |
| Icon-only buttons (lucide-react icons) | Must add `aria-label` — icons have no accessible text |

---

## 5. Framer Motion — Version & API Constraints

### Installed Version
**Source**: `src/frontend/package.json`
```json
"framer-motion": "^12.40.0"
```
This is **Framer Motion v12** — a significant major version with changes from v10/v11.

### Key API constraints for v12
- **`motion` components** are the primary API: `motion.div`, `motion.li`, etc.
- **`AnimatePresence`** is still used for mount/unmount transitions — API unchanged from v10+.
- **`useAnimation`** hook available but prefer `variants` + `animate` prop for declarative control.
- **`layout` prop** for layout animations available (`layout="position"`, `layout="size"`, `layout`).
- `whileHover`, `whileTap`, `whileFocus` gesture props remain the same.
- **Import path**: `import { motion, AnimatePresence } from 'framer-motion'` (no sub-path required).

### Standard Guidance
**Source**: `frontend-standards.md` § "Use Framer Motion for Animations"
> "For UI animations and transitions, use Framer Motion. This is the recommended animation library."

### Application to CatalogPage
- Wrap tool card list items with `motion.div` for staggered entrance animations.
- Use `AnimatePresence` when filtering/searching causes cards to mount/unmount.
- Do **not** use CSS `transition` or `@keyframes` for element-level animations — Framer Motion is the standard.

---

## 6. TypeScript Strict Mode Flags

### Configuration
**Source**: `src/frontend/tsconfig.app.json` (full listing)

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Path alias** (`tsconfig.json`):
```json
"paths": { "@/*": ["./src/*"] }
```

### Flag-by-Flag Impact on CatalogPage

| Flag | What It Enforces | Pattern to Avoid |
|---|---|---|
| `strict: true` | Enables `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `noImplicitAny`, `noImplicitThis`, `alwaysStrict` | No `as any`; no implicit `any` params; null-check optional fields before access |
| `noUnusedLocals` | All declared local variables must be used | Don't declare `const foo = ...` and never reference it |
| `noUnusedParameters` | All declared function params must be used | Prefix intentionally-unused params with `_` (e.g., `_event`) |
| `noFallthroughCasesInSwitch` | Every `case` needs `break`, `return`, or `throw` | No intentional fallthrough without `// falls through` comment |
| `verbatimModuleSyntax` | `import type` must be used for type-only imports | `import type { Tool }` not `import { Tool }` for interface-only imports |
| `moduleDetection: "force"` | Every file treated as a module | All files need at least one `import`/`export` |
| `jsx: "react-jsx"` | No need to `import React` manually | Do NOT `import React from 'react'` — only import named hooks |

### Patterns Prohibited by Strict Mode
```tsx
// ❌ implicit any
function render(items) { ... }           // noImplicitAny

// ❌ accessing .message on unknown without guard
catch (err) { setError(err.message) }    // strict — err is unknown

// ❌ type-only import without 'type' keyword
import { Tool } from '@/types/tool'      // verbatimModuleSyntax violation

// ❌ unused variable
const unused = computeSomething()        // noUnusedLocals

// ❌ as any cast
const data = response as any             // violates strict + project standards
```

```tsx
// ✅ Correct patterns
import type { Tool } from '@/types/tool'

catch (err: unknown) {
  setError(err instanceof Error ? err.message : 'Failed to load catalog')
}
```

---

## 7. CSS / Tailwind Layout Conventions

### Standard
**Source**: `frontend-standards.md` § "Styling Conventions" and § "Tailwind CSS Variable Tokens"

**Core rules**:
1. **Tailwind utility classes only** in JSX — no separate `.css` files except global resets.
2. **CSS variable tokens** — never hardcode color values. Use semantic tokens:
   - `bg-background`, `text-foreground`, `border-border`
   - `text-muted-foreground`, `bg-card`, `text-card-foreground`
   - `bg-primary`, `text-primary-foreground`, `ring-ring`
3. **Design language** — dark navy/black glassmorphic aesthetic:
   - Backdrop blur: `backdrop-blur-sm` / `backdrop-blur-md`
   - Large rounded corners: `rounded-2xl` (18–32 px range)
   - Low-opacity borders: `border border-border/50`
   - Glow/neon accents: use ring or shadow utilities with purple/blue palette
4. **`cn()` utility** for conditional class composition — `import { cn } from '@/lib/utils'`

**Dark mode**: class-based (`darkMode: ['class']` in Tailwind config). Use semantic tokens — they adapt automatically.

### Recommended Page Layout Structure for CatalogPage
```tsx
// ✅ Compliant page layout skeleton
<div className="min-h-screen bg-background text-foreground">
  <div className="container mx-auto px-4 py-8">
    {/* page header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Catalog</h1>
    </div>
    {/* filter bar */}
    <div className="mb-6">...</div>
    {/* tool grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
    </div>
  </div>
</div>
```

| Anti-pattern | Correct Alternative |
|---|---|
| `className="bg-gray-900"` | `className="bg-background"` |
| `className="text-white"` | `className="text-foreground"` |
| `className="border-gray-700"` | `className="border-border"` |
| `className="text-gray-400"` | `className="text-muted-foreground"` |
| `style={{ color: '#8B5CF6' }}` | `className="text-primary"` or Tailwind utility |

---

## 8. Import Order Convention

### Standard
**Source**: `coding-standards.md` § "External Imports Before Internal"

> Order import blocks with third-party/external packages first, followed by project-local imports. Enforced across 17/18 frontend files.

**Source**: `frontend-standards.md` § "Use @ Alias for All Frontend Src Imports"

> Use the `@/` path alias for all imports of files under `src/`. Never use long relative paths.

### Required Import Order for CatalogPage
```tsx
// 1. React and React ecosystem (external)
import { useState, useEffect } from 'react'

// 2. Third-party libraries (external)
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter } from 'lucide-react'

// 3. Internal project imports — using @/ alias
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/EmptyState'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { Tool } from '@/types/tool'

// ❌ Wrong — never use deep relative paths
import { api } from '../../../lib/api'
// ❌ Wrong — internal before external
import { api } from '@/lib/api'
import { useState } from 'react'
```

**`verbatimModuleSyntax` interaction**: Type-only imports must use `import type`:
```tsx
import type { Tool } from '@/types/tool'          // ✅
import type { CatalogPageProps } from './types'    // ✅ (if props defined externally)
```

---

## 9. Performance Conventions

### Standard
**Source**: `frontend-standards.md` § "Performance"

- **Lazy-load routes** with `React.lazy` + `Suspense` — applies to CatalogPage as a route.
- **Avoid anonymous function prop creation** inside render for expensive child components.
- Images and icons: use SVG or optimised PNG/WebP via Vite asset pipeline.

### Application to CatalogPage
```tsx
// ✅ Lazy-load the route in App.tsx / router config
const CatalogPage = React.lazy(() => import('@/routes/CatalogPage'))

// In router:
<Suspense fallback={<LoadingState />}>
  <Route path="/catalog" element={<CatalogPage />} />
</Suspense>
```

**Memoization**:
- If tool card list is large, consider `React.memo` on `ToolCard` component.
- Use `useCallback` for `onToggle` / selection handler passed into each card to avoid re-renders.
- Do **not** over-memoize simple presentational components — only where cost is measurable.
- `noUnusedLocals` enforcement means extracted `useCallback` refs must actually be used.

---

## 10. Error Handling & Error Boundaries

### Standard
**Source**: `coding-standards.md` § "Error Handling"

> Never swallow errors silently. Frontend must handle `loading`, `error`, and `empty` states for every async operation.

**Source**: `frontend-standards.md` § "Normalize Async Errors with instanceof Check"

> Always narrow `unknown` errors with `instanceof Error` before accessing `.message`.

### Architecture-Level Error Shape
**Source**: `architecture.md` § "API Contract"

All backend errors return `ApiErrorResponse { statusCode, error, message, timestamp, path }`. The frontend should surface the `message` field.

### Required Error Handling Pattern for CatalogPage
```tsx
// ✅ Required error narrowing
.catch((err: unknown) => {
  setError(err instanceof Error ? err.message : 'Failed to load catalog')
  setLoading(false)
})

// ✅ Required — render the error state
{error && (
  <Alert variant="destructive">
    <AlertTitle>Failed to load tools</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

**Error boundaries**:
- Route-level `Suspense` (required for `React.lazy`) should be paired with an error boundary at the router level.
- Async fetch errors are handled via the `error` state pattern above — not via `ErrorBoundary` (which only catches render errors).

**No `console.log`**: `coding-standards.md` prohibits `console.log` in committed code. Remove debug logs before merging.

---

## Configuration Details Summary

### TypeScript Configuration
| Setting | Value | Source |
|---|---|---|
| TypeScript version | `~6.0.2` | `package.json` devDeps |
| Target | `ES2023` | `tsconfig.app.json` |
| Module | `ESNext` | `tsconfig.app.json` |
| Module resolution | `bundler` | `tsconfig.app.json` |
| JSX transform | `react-jsx` (no `React` import needed) | `tsconfig.app.json` |
| `strict` | `true` | `tsconfig.app.json` |
| `noUnusedLocals` | `true` | `tsconfig.app.json` |
| `noUnusedParameters` | `true` | `tsconfig.app.json` |
| `noFallthroughCasesInSwitch` | `true` | `tsconfig.app.json` |
| `verbatimModuleSyntax` | `true` | `tsconfig.app.json` |
| `moduleDetection` | `force` | `tsconfig.app.json` |
| `@/*` alias | `./src/*` | `tsconfig.json` paths |

### Installed Frontend Packages (relevant to CatalogPage)

| Package | Version | Usage in CatalogPage |
|---|---|---|
| `react` | `^19.2.6` | Core framework |
| `react-dom` | `^19.2.6` | Rendering |
| `react-router-dom` | `^7.15.1` | Route declaration, `useNavigate` |
| `framer-motion` | **`^12.40.0`** | Card animations, staggered entrance |
| `tailwindcss` | `^3.4.19` | All styling |
| `tailwind-merge` | `^3.6.0` | Used by `cn()` utility |
| `clsx` | `^2.1.1` | Used by `cn()` utility |
| `lucide-react` | `^1.16.0` | Icons (Search, Filter, etc.) |
| `class-variance-authority` | `^0.7.1` | CVA for variant-based component styling |
| `@radix-ui/react-checkbox` | `^1.3.3` | Selection checkboxes on tool cards |
| `@radix-ui/react-dialog` | `^1.1.15` | Modal dialogs |
| `@radix-ui/react-separator` | `^1.1.8` | Dividers |
| `@radix-ui/react-slot` | `^1.2.4` | Slot primitive (used by shadcn Button) |

**Notable absences** (not installed — do not use):
- ❌ `react-query` / `@tanstack/react-query` — use `useState` + `useEffect`
- ❌ `zustand` / `redux` / `jotai` — no global state store
- ❌ `axios` (frontend) — use native `fetch` via `@/lib/api`
- ❌ `zod` (frontend) — API shapes typed via TypeScript interfaces in `types/`

---

## Architecture Placement

### Where CatalogPage Fits
**Source**: `architecture.md` § "Frontend Key Files"

```
src/frontend/src/
├── routes/
│   ├── ToolsPage.tsx             ← existing comparison entry route (/)
│   ├── ComparisonResultPage.tsx  ← existing comparison result route (/compare)
│   └── CatalogPage.tsx           ← NEW: catalog view route (/catalog)  ← ADD HERE
├── components/
│   ├── ui/                       ← shadcn/ui primitives (reuse freely)
│   └── tools/                    ← ToolCard, ToolList (reuse/extend)
├── lib/
│   ├── api.ts                    ← call api.tools.list() for data
│   └── utils.ts                  ← cn() for class composition
└── types/
    └── tool.ts                   ← Tool interface (mirrors backend DTO)
```

### Expected Component Tree
```
CatalogPage                          ← routes/CatalogPage.tsx
├── (loading state) → Skeleton       ← @/components/ui/skeleton
├── (error state)   → Alert          ← @/components/ui/alert
├── (empty state)   → EmptyState     ← @/components/ui/EmptyState
└── (data state)
    ├── CatalogHeader                ← inline or extracted component
    ├── CatalogFilterBar             ← feature component (use shadcn Input/Select)
    └── CatalogGrid
        └── ToolCard (×N)            ← @/components/tools/ToolCard (reuse existing)
```

---

## Compliance Checklist for CatalogPage Implementation

### File & Structure
- [ ] File named `CatalogPage.tsx` (PascalCase)
- [ ] Located at `src/frontend/src/routes/CatalogPage.tsx`
- [ ] Exported as `export function CatalogPage(...)` (named export, not default)
- [ ] Props typed as `interface CatalogPageProps { ... }` (if any props needed)
- [ ] Functional component only — no class component

### shadcn/ui First
- [ ] `Card`/`CardContent` used for tool result tiles (not custom `<div className="...">` card)
- [ ] `Button` from shadcn used for all action buttons
- [ ] `Skeleton` used as loading placeholder
- [ ] `Alert` + `AlertDescription` used for error display
- [ ] `Input` + `Label` used for any search/filter fields
- [ ] `Tabs` used for any category switching (if tabbed UI)
- [ ] `Badge` used for category/tag labels on cards
- [ ] `EmptyState` reused from `@/components/ui/EmptyState` (already exists)

### Async State
- [ ] Three state variables declared: `tools`, `loading`, `error`
- [ ] `useEffect` with `api.tools.list()` call for data fetching
- [ ] Error narrowed with `err instanceof Error ? err.message : 'fallback'`
- [ ] All three states rendered: loading skeleton, error alert, data grid
- [ ] API URL comes from `api.ts` (no hardcoded `localhost` or base URL)

### TypeScript Strict Mode
- [ ] No `as any` casts anywhere in the file
- [ ] All type-only imports use `import type`
- [ ] No unused local variables or parameters (or prefixed with `_`)
- [ ] Error catch variable typed as `(err: unknown)` with instanceof guard
- [ ] All JSX `key` props set on mapped elements
- [ ] No implicit `any` — all function parameters explicitly typed
- [ ] No bare `import React` — `jsx: "react-jsx"` handles it automatically

### Styling / Tailwind
- [ ] CSS variable tokens used for all colors (`bg-background`, `text-foreground`, etc.)
- [ ] No hardcoded color values (`bg-gray-900`, `text-white`, `#8B5CF6`)
- [ ] `cn()` used for conditional class composition
- [ ] Dark glassmorphic aesthetic: `backdrop-blur-*`, `rounded-2xl`, `border-border/50`
- [ ] No separate `.css` file created

### Imports
- [ ] External/third-party imports listed first (React, framer-motion, lucide-react)
- [ ] Internal imports use `@/` alias (never `../../../`)
- [ ] Type-only imports use `import type` keyword (verbatimModuleSyntax)

### Accessibility
- [ ] Interactive cards have `aria-label` if no visible text label
- [ ] Icon-only buttons have `aria-label`
- [ ] Search input has associated `<Label>` or `aria-label`
- [ ] Keyboard navigation works for card selection

### Animations (Framer Motion v12)
- [ ] `motion.div` / `motion.li` wrapping animated elements
- [ ] `AnimatePresence` used when cards mount/unmount on filter change
- [ ] No raw CSS `transition` for element-level animations

### Performance
- [ ] Route lazy-loaded with `React.lazy` in the router config
- [ ] `React.Suspense` fallback provided at router level
- [ ] Stable callback references (`useCallback`) for handlers passed to child cards

### Error Handling
- [ ] No `console.log` statements (remove before merging)
- [ ] Error state surfaced via `Alert` component (not bare text)
- [ ] Empty state handled separately from error state

### Architecture & Module Boundaries
- [ ] No LLM implementation details referenced in frontend
- [ ] `Tool` type imported from `@/types/tool` (mirrors backend DTO)
- [ ] Data fetched exclusively via `@/lib/api` wrapper

---

## Key Risks & Gotchas

| Risk | Details |
|---|---|
| **framer-motion v12 breaking changes** | v12 is a recent major version — verify any Framer Motion API against installed v12 docs before use, especially `LazyMotion` and `MotionConfig`. |
| **`verbatimModuleSyntax` + re-exports** | If re-exporting types through a barrel `index.ts`, they must use `export type`. |
| **React 19 concurrent features** | React 19 introduces `use(Promise)` — existing `useState` + `useEffect` patterns still work and are team standard; do not switch to `use()` without team discussion. |
| **shadcn components may not be installed** | shadcn/ui is a copy-in system. `Tabs`, `Badge`, `Skeleton` may need `npx shadcn@latest add tabs badge skeleton` — verify in `src/components/ui/` before importing. |
| **`noUnusedParameters` with event handlers** | If a handler receives `e: React.MouseEvent` but doesn't use `e`, rename to `_e` to satisfy the TypeScript flag. |
| **`moduleDetection: "force"`** | Every `.tsx` file must have at least one `import` or `export`. A file with only a component declaration and no imports will fail compilation. |

---

*Gathered by information-gatherer agent | source_category: standards-config | 2026-05-24*
