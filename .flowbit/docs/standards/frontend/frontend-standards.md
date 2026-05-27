# Frontend Standards — AI Tools Radar

## Stack

| Concern | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | React built-ins (useState, useContext); no global store unless justified |
| HTTP | Native `fetch` or lightweight wrapper; base URL via `VITE_API_BASE_URL` |

> **Tailwind v4 setup:** Config lives in `src/index.css` (`@import "tailwindcss"`, `@theme {}`, `@plugin`) — there is no `tailwind.config.js`. Vite uses `@tailwindcss/vite` plugin (not PostCSS). `autoprefixer` is not required. When adding new shadcn/ui components via `npx shadcn@latest add`, the generated syntax is correct for v4 — no manual patching needed.

## Component Structure

- One component per file; filename matches the exported component name in PascalCase (e.g., `ToolCard.tsx`).
- Colocate styles, tests, and stories next to the component file.
- Extract reusable UI into `src/components/ui/` (shadcn primitives) vs domain components into `src/components/<feature>/`.
- Avoid deeply nested JSX — extract sub-components when a tree exceeds ~3 levels of meaningful nesting.

### shadcn/ui First — No Custom Components Without Checking
Before building any new UI component, check whether shadcn/ui already provides a suitable one. Only create a custom component when no shadcn/ui component covers the use case.

**Workflow:**
1. Check the shadcn/ui component list: https://ui.shadcn.com/docs/components
2. If a matching component exists → use it (add via `npx shadcn@latest add <component>` if not yet installed)
3. If no match → only then create a custom component in `src/components/ui/` or the relevant feature directory

> After running `npx shadcn@latest add <component>`, no syntax patching is needed — the project now runs Tailwind v4, which is fully compatible with shadcn-generated components.

**Examples of shadcn/ui components to prefer:**
- Buttons → `Button` (`@/components/ui/button`)
- Cards → `Card`, `CardHeader`, `CardContent`, `CardFooter`
- Dialogs → `Dialog`, `AlertDialog`
- Forms → `Form`, `Input`, `Label`, `Select`, `Checkbox`, `Switch`
- Navigation → `NavigationMenu`, `Tabs`
- Feedback → `Alert`, `Badge`, `Progress`, `Skeleton`, `Toast`
- Layout → `Separator`, `ScrollArea`, `Sheet`

**Rule:** If you find yourself writing a component that wraps a basic HTML element (button, input, card, dialog, dropdown), stop and check shadcn/ui first.

```tsx
// ✅ Correct — reuse shadcn/ui
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ❌ Wrong — custom implementation of something shadcn/ui already provides
export function MyButton({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-primary text-white rounded">{children}</button>
}
```

### PascalCase Component Files
All React component and route files use PascalCase filenames. Evidence: 9/9 sampled files follow this convention.
- Examples: `ToolCard.tsx`, `ComparisonResultPage.tsx`, `MainLayout.tsx`
- Non-PascalCase is reserved for lib/utility files: `api.ts`, `utils.ts`, `config.ts`
- **Confidence**: 86 (code-patterns)

### Functional Components Only — No Class Components
Write all React components as function components or `forwardRef` wrappers. Evidence: 15/16 sampled TSX files are function components, 0/16 are class components.
```tsx
// ✅ Correct
export function ToolCard({ tool, selected, onToggle }: ToolCardProps) {
  return <div>...</div>
}

// ❌ Wrong
class ToolCard extends React.Component { ... }
```
- **Confidence**: 87 (code-patterns)

### Named Exports for Components
Export components with named exports, not default exports. Evidence: 14/16 sampled TSX files use named exports.
```tsx
// ✅ Correct
export function ComparisonPanel({ ... }: ComparisonPanelProps) { ... }

// ❌ Wrong
export default function ComparisonPanel(...) { ... }
```
- **Confidence**: 82 (code-patterns)

### Props Declared as Interface *Props
When a component needs typed props, declare them as a local `interface *Props` (not inline type or type alias).
- Evidence: 7/8 sampled TSX files with props use `interface *Props`
```tsx
// ✅ Correct
interface ToolCardProps {
  tool: Tool
  selected: boolean
  onToggle: (id: string) => void
}
export function ToolCard({ tool, selected, onToggle }: ToolCardProps) { ... }
```
- **Confidence**: 80 (code-patterns)

## Imports & Paths

### Use @ Alias for All Frontend Src Imports
Use the `@/` path alias for all imports of files under `src/`. Never use long relative paths like `../../../`. The alias is configured in both `tsconfig.json` and `vite.config.ts`.
- **Evidence**: tsconfig `paths: @/* -> ./src/*`, vite `resolve.alias: @ -> ./src`. 11/14 sampled files use the alias.
```typescript
// ✅ Correct
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

// ❌ Wrong
import { Button } from '../../../components/ui/button'
```
- **Confidence**: 85 (config + code-patterns)

## Styling Conventions

- Use **Tailwind utility classes** directly in JSX; avoid separate CSS files except for global resets in `index.css`.
- Design language: dark navy/black backgrounds, purple/electric-blue accents, glassmorphism panels, soft glow effects, large rounded corners.
- Use `cn()` (clsx + tailwind-merge) for all conditional class composition.
- No hard-coded pixel sizes in Tailwind classes when a spacing-scale token covers the need.
- The app is permanently dark-mode: `<html class="dark">` is set in `index.html`. There is no light mode variant.

### Tailwind CSS Variable Tokens — Never Raw Color Values
Use Tailwind utility classes backed by CSS custom properties (e.g., `bg-background`, `text-foreground`, `border-border`). Never hardcode color values. Dark mode is class-based (`darkMode: ['class']`).
- **Evidence**: `tailwind.config.js` maps all colors to `hsl(var(--...))` tokens
```tsx
// ✅ Correct — uses design token
<div className="bg-background text-foreground rounded-lg border border-border">

// ❌ Wrong — hardcoded color
<div className="bg-gray-900 text-white rounded-lg border border-gray-700">
```
- **Confidence**: 84 (config)

### UI Aesthetic — Glassmorphic Dark Interface

The app uses a premium dark glassmorphic visual language. All new components and pages must follow these rules.

#### Color Palette (CSS variable tokens)

All colors are defined as CSS custom properties in `index.css` and consumed through Tailwind tokens. Never use raw hex or hsl values in classNames.

| Token | HSL | Approx hex | Usage |
|---|---|---|---|
| `--background` | 222 84% 5% | `#020617` | App body / base layer |
| `--card` | 222 47% 9% | `~#0d1526` | Card / panel backgrounds |
| `--primary` | 258 90% 66% | `#8B5CF6` | Purple accent — active states, badges, glows, CTAs |
| `--muted-foreground` | 220 9% 64% | `#9CA3AF` | Secondary/muted text |
| `--foreground` | 0 0% 100% | `#FFFFFF` | Primary text |
| `--border` | 258 30% 18% | `~#2a1f40` | Borders (purple-tinted) |

Blue accent (`blue-600` / `#2563EB`) is used only in CTA gradient buttons paired with `--primary`.
Green (`#10B981`) is reserved for status indicators (online dots, success states).

```tsx
// ✅ Correct
<div className="bg-background text-foreground border border-border/50">
<span className="text-primary">active</span>

// ❌ Wrong — raw colors
<div style={{ backgroundColor: '#020617' }}>
<div className="text-[#8B5CF6]">
```

#### Corner Radius

- **Cards** (`ToolCard`, `SidebarModelStatus`, etc.): `rounded-2xl` (24px)
- **Containers / full-page panels** (`MainContent`, `ComparisonPanel`): `rounded-3xl` (32px)
- **CTA buttons**: `rounded-full` (pill shape)
- **Regular action buttons**: `rounded-lg` (uses `--radius: 1.25rem` = 20px)
- **Badges / pills**: `rounded-full`

Never use `rounded-md` or `rounded-sm` for primary UI surfaces.

#### Backgrounds & Glassmorphism

Glass panels combine a translucent background with backdrop blur and a subtle border:

```tsx
// ✅ Glassmorphism panel
<div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-3xl">

// ✅ Card surface
<Card className="bg-card/60 backdrop-blur-sm border-border/50">

// ✅ Active/highlighted state
<div className="bg-primary/10 border border-primary/30">
```

The app body has a subtle radial glow bloom (defined in `index.css` as a `background-image` on `body`). Individual panels may add their own radial glow with an absolutely-positioned overlay div:

```tsx
<div className="relative overflow-hidden rounded-3xl ...">
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
    }}
    aria-hidden="true"
  />
  {/* panel content */}
</div>
```

#### Shadows & Glow Effects

Use soft neon glow via `shadow-[...]` arbitrary values. No hard drop shadows.

| Use case | Class |
|---|---|
| Card subtle glow | `shadow-[0_0_20px_hsl(var(--primary)/0.1)]` |
| Active nav item | `shadow-[0_0_12px_hsl(var(--primary)/0.15)]` |
| Main content container | `shadow-[0_0_60px_hsl(var(--primary)/0.08),inset_0_0_0_1px_hsl(var(--primary)/0.06)]` |
| CTA panel | `shadow-[0_0_80px_hsl(var(--primary)/0.2)]` |
| CTA button (ready state) | `shadow-[0_0_40px_hsl(var(--primary)/0.45)]` |
| CTA button hover | `shadow-[0_0_60px_hsl(var(--primary)/0.6)]` |

#### Borders

All borders are thin and semi-transparent:
- Standard: `border border-border/50`
- Glass panel: `border border-border/40`
- Active/selected: `border border-primary/30` to `border-primary/40`
- Dashed empty slots: `border-2 border-dashed border-primary/25` (hover: `border-primary/50`)

Never use solid opaque borders.

#### CTA Button Pattern

The primary call-to-action uses a gradient pill button, not a shadcn `Button`:

```tsx
<button
  onClick={onAction}
  className="flex h-14 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-blue-600 px-8 font-semibold text-white shadow-[0_0_40px_hsl(var(--primary)/0.45)] transition-all hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] hover:scale-105 active:scale-100"
>
  <Sparkles className="h-4 w-4" />
  Action Label
</button>
```

CTA panels must also include a footer: lock icon + "Private & Local • Powered by Ollama" in `text-xs text-muted-foreground/70`.

#### Navigation Item Pattern

Active nav item: `h-14 rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]`
Inactive nav item: `h-14 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground`

#### Badge / Category Pill Pattern

Category badges on tool cards use purple tinting:
```tsx
<Badge className="border border-primary/30 bg-primary/15 text-primary">
  {category}
</Badge>
```

Non-category tags use the muted secondary surface: `bg-secondary text-secondary-foreground rounded-full`.

#### Status Indicator

Online/active: `h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_6px_#10B981]`
Offline: `h-2.5 w-2.5 rounded-full bg-muted-foreground`

### Framer Motion — Animation Conventions

All UI animations use Framer Motion. Do not use CSS transitions for interactive element feedback except for simple color/opacity changes.

#### Interactive card / item hover pattern

```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
  {/* card content */}
</motion.div>
```

#### List enter/exit animations

Use `AnimatePresence` with `mode="popLayout"` for lists where items can be added or removed:

```tsx
<AnimatePresence mode="popLayout">
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
    >
      ...
    </motion.div>
  ))}
</AnimatePresence>
```

#### Color / shadow transitions

Simple hover color changes (border, background, glow) can use Tailwind's `transition-colors` or `transition-all` with a Framer Motion wrapper:
```tsx
className="transition-colors hover:border-primary/50 hover:bg-card/40"
```

Avoid `transition-all` on elements with box-shadow glow — use Framer Motion `animate` instead to prevent performance issues.

## Data Fetching & Async State

- Every data-fetching hook exposes `{ data, loading, error }`.
- Always render all three states — never assume the happy path.
- API base URL is consumed from `import.meta.env.VITE_API_BASE_URL`; never hard-code `localhost`.

### Normalize Async Errors with instanceof Check
In API response handlers and async UI code, always narrow `unknown` errors with `instanceof Error` before accessing `.message`:
```typescript
// ✅ Correct
setError(err instanceof Error ? err.message : 'Request failed')

// ❌ Wrong — TypeScript error + runtime risk
setError(err.message)
```
- **Evidence**: 2/2 sampled frontend error-handling files follow this pattern
- **Confidence**: 68 (code-patterns)

### Dismissible Alert Messages — Always Include an X Close Button

Every `Alert` component used to display an error, warning, or informational message to the user **must** include an X button in the top-right corner that dismisses the message. This applies to all variants (`destructive`, default, and any future variants).

**Rules:**
- Add `className="relative"` to the `<Alert>` wrapper.
- Place a `<button>` with `className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"` and `aria-label="Dismiss [type]"` inside the alert.
- Use the `X` icon from `lucide-react` (`h-4 w-4`) as the button's child.
- For page-level state (`useState<string | null>` error), call `setError(null)` on click.
- For component-level alerts (no external state owner), add local `useState<boolean>` (default `true`) and set it to `false` on click.
- Import `X` from `lucide-react` alongside other icon imports.

```tsx
// ✅ Correct — page-level error with dismiss
import { X } from 'lucide-react'

{error && (
  <Alert variant="destructive" className="relative">
    <button
      onClick={() => setError(null)}
      className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
      aria-label="Dismiss error"
    >
      <X className="h-4 w-4" />
    </button>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}

// ✅ Correct — component-level info alert with local dismiss state
const [showBanner, setShowBanner] = useState(true)

{showBanner && (
  <Alert className="relative">
    <button
      onClick={() => setShowBanner(false)}
      className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
      aria-label="Dismiss recommendation"
    >
      <X className="h-4 w-4" />
    </button>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)}

// ❌ Wrong — Alert with no way to dismiss
<Alert variant="destructive">
  <AlertDescription>{error}</AlertDescription>
</Alert>
```

## Type Safety

- API response shapes must be defined as TypeScript interfaces or `zod` schemas shared with or mirrored from the backend contract.
- No `as any` casts in component or hook logic.

### Strict TypeScript Mode
Frontend TypeScript uses full strict mode via `tsconfig.app.json`: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`. Do not introduce unused variables or parameters.
- **Confidence**: 85 (config)

## Accessibility

- Interactive elements must have `aria-label` when the label is not visible text.
- Keyboard navigation must work for all primary flows (catalog selection, comparison trigger).
- Minimum contrast ratio 4.5:1 for body text against dark backgrounds.

## Performance

- Lazy-load routes with `React.lazy` + `Suspense`.
- Avoid anonymous function prop creation inside render for expensive child components.
- Images and icons use SVG or optimised PNG/WebP via Vite asset pipeline.

## Testing (Frontend-Specific)

See `standards/testing/testing-standards.md` for the full policy. Frontend-specific notes:
- Unit test pure utility functions and custom hooks.
- Component smoke tests with React Testing Library for critical UI flows.
- No Enzyme; no shallow rendering.

## Linting & Tooling

### React Hooks and Refresh ESLint Rules
Frontend linting enforces `eslint-plugin-react-hooks` (hooks rules of order/exhaustive-deps) and `eslint-plugin-react-refresh` (Vite HMR compatibility). Both must remain active in `eslint.config.js`.
- **Confidence**: 84 (config)
