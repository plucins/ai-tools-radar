# Frontend Standards — AI Tools Radar

## Stack

| Concern | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State | React built-ins (useState, useContext); no global store unless justified |
| HTTP | Native `fetch` or lightweight wrapper; base URL via `VITE_API_BASE_URL` |

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

- Use **Tailwind utility classes** directly in JSX; avoid separate CSS files except for global resets.
- Design language: dark navy/black backgrounds, purple/electric-blue accents, glassmorphism panels, soft glow effects, large rounded corners (`18px–32px`).
- Color palette reference (see `docs/front-look-and-feel.md`):
  - Background: `#020617`, `#030712`, `#081120`
  - Purple: `#8B5CF6`, `#7C3AED`, `#A855F7`
  - Blue: `#3B82F6`, `#2563EB`
  - Text primary: `#FFFFFF`; secondary: `#9CA3AF`
- Use `cn()` (clsx + tailwind-merge) for conditional class composition.
- No hard-coded pixel sizes in Tailwind classes if a spacing-scale token covers the need.

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
The intended UI style is a dark, glassmorphic interface. Use:
- backdrop blur (`backdrop-blur-*`)
- radial gradients with low opacity
- low-opacity borders
- dark translucent layer backgrounds
- layered glow/neon accent effects

Avoid: bright flat colors, sharp edges, heavy box shadows, skeuomorphic styling.
- **Source**: `docs/front-look-and-feel.md`
- **Confidence**: 87 (docs)

### Use Framer Motion for Animations
For UI animations and transitions, use Framer Motion. This is the recommended animation library per the project's design guidance (`docs/front-look-and-feel.md`).
- **Confidence**: 82 (docs)

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
