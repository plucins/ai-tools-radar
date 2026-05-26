# Specification: AI Tools Radar Visualization

**Issue**: #9  
**Date**: 2026-05-26  
**Risk Level**: Medium  

---

## Goal

Build a new `/radar` page featuring an interactive polar radar chart that visualizes AI developer tools positioned across 4 concentric rings (CORE → ADOPT → TRIAL → WATCH) and 4 quadrants, rendered with a futuristic cyberpunk aesthetic using Recharts, custom SVG overlays, and Framer Motion animations — integrated into the existing navigation and backed by a new NestJS `RadarModule` serving mock data.

---

## User Stories

- As a developer, I want to see AI tools arranged on a visual radar chart so I can quickly assess which tools are mature vs. experimental.
- As a developer, I want to hover over a tool point to read its name, ring status, quadrant, and a brief description without leaving the radar view.
- As a developer, I want to click a tool point to navigate directly to that tool's detail page in the catalog.
- As a developer, I want a sidebar legend explaining the meaning of each ring (CORE, ADOPT, TRIAL, WATCH) so I can interpret the visualization correctly.
- As a developer, I want to access the radar from the main sidebar navigation so it is as discoverable as Compare and Catalog.

---

## Core Requirements

### FR1 — Radar Visualization
1. Render a polar coordinate chart using Recharts `ScatterChart` + `ResponsiveContainer` as the coordinate system host.
2. Draw 4 concentric ring overlays via custom SVG:  
   - CORE at 25% radius, ADOPT at 50%, TRIAL at 75%, WATCH at 100%
3. Draw 4 quadrant dividers at 0°/90°/180°/270° via custom SVG with text labels:  
   - Coding & Engineering (0–90°), Research & Knowledge (90–180°), AI Agents & Automation (180–270°), Design & Visual Creation (270–360°)
4. Plot tool points as `Scatter` data using pre-calculated Cartesian X/Y coordinates delivered by the backend.
5. Color-code tool points by ring: CORE=`#A855F7`, ADOPT=`#22C55E`, TRIAL=`#3B82F6`, WATCH=`#9CA3AF`.
6. Animate a scanning beam (full 360° CSS rotation) continuously and independently of user interactions.

### FR2 — Interactivity
7. Show a custom tooltip on tool point hover displaying: tool name, ring, quadrant, and a 1-line description.
8. Navigate to `/catalog/:id` when a tool point is clicked.
9. Apply hover effects on tool points: scale increase + glow intensity increase (Framer Motion or CSS).
10. Beam animation must not pause or change on hover or click events.

### FR3 — Navigation & Layout
11. Add a new `/radar` route in `App.tsx` nested under `MainLayout`, rendering `RadarPage`.
12. Add a "Radar" navigation item to `NAV_ITEMS` in `SidebarNav.tsx` using the `Activity` or `Radar` icon from `lucide-react`.
13. Render a `RadarLegend` sidebar component listing all 4 rings with colored circle indicators and short descriptions.
14. Responsive layout:  
    - Desktop (>1024px): legend on the left (22–26% width), chart fills rest  
    - Tablet (768–1024px): legend stacked below the chart  
    - Mobile (<768px): legend collapses to a bottom drawer or is hidden by default

### FR4 — Data Integration
15. Fetch radar data from `GET /api/radar` using a new `api.radar.get()` method in `api.ts`.
16. Handle `loading`, `error`, and `empty` states in `RadarPage` following the existing page pattern.
17. Backend `RadarService` returns mock data: 12–20 hardcoded tool points with pre-calculated Cartesian coordinates.

### FR5 — Styling & Aesthetics
18. Match existing glassmorphic cyberpunk aesthetic: `bg-card/30 backdrop-blur-sm`, neon glow shadows, `border-primary/30`.
19. Framer Motion entrance animations on `RadarPage` mount: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` with stagger.
20. All neon glow effects use `rgba` or `hsl(var(--primary)/α)` — no hard-coded hex in Tailwind class values.

---

## Visual Design

No mockups provided. Implementation follows the textual specification from Issue #9 and the established glassmorphic cyberpunk design system documented in `frontend-standards.md`.

**Color palette**:
| Token | Hex | Usage |
|---|---|---|
| CORE | `#A855F7` | Ring label, tool point, legend dot |
| ADOPT | `#22C55E` | Ring label, tool point, legend dot |
| TRIAL | `#3B82F6` | Ring label, tool point, legend dot |
| WATCH | `#9CA3AF` | Ring label, tool point, legend dot |
| Background | `#050816` / `#0B1023` | Page/chart background gradient |
| Glow (primary) | `rgba(168, 85, 247, 0.6)` | Beam + CORE glow effects |

**Chart geometry** (coordinate space −100 to +100 on both axes):
- Ring radii: CORE=25, ADOPT=50, TRIAL=75, WATCH=100
- Quadrant lines: vertical and horizontal through origin
- Tool points: `r=4–6px`, glow `filter: drop-shadow(0 0 6px <ringColor>)`

---

## TypeScript Interfaces

### Frontend — `src/frontend/src/types/radar.ts`

```typescript
/** Ring status levels for the radar visualization */
export type RadarRingId = 'core' | 'adopt' | 'trial' | 'watch'

/** Quadrant categories for the radar visualization */
export type RadarQuadrantId = 'engineering' | 'research' | 'automation' | 'design'

/** A single tool plotted on the radar */
export interface RadarToolPoint {
  /** Matches tool id used in /catalog/:id */
  id: string
  name: string
  /** One-line description shown in tooltip */
  description: string
  /** Pre-calculated Cartesian X (range: −100 to +100) */
  x: number
  /** Pre-calculated Cartesian Y (range: −100 to +100) */
  y: number
  ring: RadarRingId
  quadrant: RadarQuadrantId
  /** Hex color derived from ring */
  color: string
}

/** Ring metadata for legend + SVG rendering */
export interface RadarRing {
  id: RadarRingId
  label: string
  /** Radius in coordinate space (25/50/75/100) */
  radius: number
  color: string
  /** Short description for legend */
  description: string
}

/** Quadrant metadata for SVG label rendering */
export interface RadarQuadrant {
  id: RadarQuadrantId
  label: string
  /** Degrees CCW from 3 o'clock (standard Cartesian / math convention) */
  startAngle: number
  endAngle: number
}

/** Full radar data payload from GET /api/radar */
export interface RadarData {
  tools: RadarToolPoint[]
  rings: RadarRing[]
  quadrants: RadarQuadrant[]
}
```

---

## Component API

### `RadarPage` — `src/frontend/src/routes/RadarPage.tsx`

Container page component. Owns data-fetching state; renders `RadarLegend` + `RadarChart`.

```typescript
// No external props — accessed via React Router <Route>
// Internal state: data: RadarData | null, loading: boolean, error: string | null
```

**Responsibilities**:
- `useEffect` on mount → `api.radar.get()` → sets state
- Renders loading spinner, error card, or empty state as appropriate (follow `CatalogPage` pattern)
- Framer Motion entrance animation wrapping content
- Responsive flex layout: `flex-row` (desktop) → `flex-col` (tablet/mobile)

---

### `RadarChart` — `src/frontend/src/components/radar/RadarChart.tsx`

```typescript
interface RadarChartProps {
  tools: RadarToolPoint[]
  rings: RadarRing[]
  quadrants: RadarQuadrant[]
  /** Called when user clicks a tool point */
  onToolClick: (toolId: string) => void
}
```

**Responsibilities**:
- Hosts `Recharts.ResponsiveContainer` + `Recharts.ScatterChart`
- Renders custom SVG children: `RadarRings`, `RadarQuadrants`, `RadarBeam`
- Renders `Recharts.Scatter` for tool points using `RadarPoints` shape renderer via closure:
  ```tsx
  <Scatter shape={(props) => <RadarPoints {...props} onToolClick={onToolClick} />} />
  ```
  *(Required: Recharts only injects its own props into shape renderers; custom callbacks must be closed over)*
- Renders `Recharts.Tooltip` with `RadarTooltip` as `content` prop
- Sets chart domain: `XAxis domain={[-110, 110]}`, `YAxis domain={[-110, 110]}`
- Hides default Recharts axes (tick-less, line-less)
- Memoized with `React.memo`

---

### `RadarRings` — `src/frontend/src/components/radar/RadarRings.tsx`

Custom SVG overlay rendered as a Recharts `<Customized>` component.

```typescript
interface RadarRingsProps {
  rings: RadarRing[]
  /** Recharts-injected coordinate helpers */
  xAxisMap?: Record<string, unknown>
  yAxisMap?: Record<string, unknown>
  /** Chart width/height for SVG coordinate calculation */
  width?: number
  height?: number
}
```

**Responsibilities**:
- Renders 4 `<circle>` elements centered on chart origin
- Maps coordinate-space radii (25/50/75/100) to pixel radii via Recharts scale functions
- Applies ring color with low opacity fill (`fill-opacity: 0.05`) and visible stroke
- Applies `filter: drop-shadow(0 0 4px <color>)` neon glow on each ring
- Renders ring label text at 3 o'clock position for each ring
- Memoized with `React.memo`

---

### `RadarQuadrants` — `src/frontend/src/components/radar/RadarQuadrants.tsx`

Custom SVG overlay rendered as a Recharts `<Customized>` component.

```typescript
interface RadarQuadrantsProps {
  quadrants: RadarQuadrant[]
  width?: number
  height?: number
  xAxisMap?: Record<string, unknown>
  yAxisMap?: Record<string, unknown>
}
```

**Responsibilities**:
- Renders 2 divider lines through chart origin (vertical + horizontal)
- Renders quadrant labels at mid-angle, near outer ring boundary
- Lines use `stroke: rgba(168,85,247,0.2)` (subtle primary color)
- Memoized with `React.memo`

---

### `RadarPoints` — `src/frontend/src/components/radar/RadarPoints.tsx`

Custom shape renderer passed to `Recharts.Scatter shape` prop.

```typescript
interface RadarPointsProps {
  /** Recharts-injected pixel coordinates */
  cx?: number
  cy?: number
  /** Full tool data payload from Recharts payload */
  payload?: RadarToolPoint
  onToolClick: (toolId: string) => void
}
```

**Responsibilities**:
- Renders a `<circle>` at `(cx, cy)` with `r=5`
- Applies ring-based fill color + neon glow filter
- CSS `cursor: pointer`
- `onClick` → calls `onToolClick(payload.id)`
- Hover: `r` scale to 7 + increased glow (CSS transition or Framer Motion `motion.circle`)

---

### `RadarBeam` — `src/frontend/src/components/radar/RadarBeam.tsx`

Custom SVG overlay rendered as a Recharts `<Customized>` component.

```typescript
interface RadarBeamProps {
  width?: number
  height?: number
  xAxisMap?: Record<string, unknown>
  yAxisMap?: Record<string, unknown>
}
```

**Responsibilities**:
- Renders a conic gradient wedge or a `<line>` from origin to outer ring boundary
- Applies CSS `animation: spin 4s linear infinite` (same direction as clock)
- Uses `rgba(168,85,247,0.6)` for beam color
- Renders a trailing fade using a `<defs><linearGradient>` or conic gradient SVG fill
- Must not interfere with pointer events on tool points (`pointer-events: none`)
- Memoized with `React.memo`

---

### `RadarLegend` — `src/frontend/src/components/radar/RadarLegend.tsx`

```typescript
interface RadarLegendProps {
  rings: RadarRing[]
}
```

**Responsibilities**:
- Renders 4 legend rows, one per ring (CORE → WATCH order)
- Each row: colored filled circle + ring label + short description
- Glassmorphic container: `bg-card/30 backdrop-blur-sm border border-primary/20 rounded-[var(--radius)]`
- On mobile: hidden by default, accessible via drawer trigger (use shadcn `Sheet` component)
- Framer Motion stagger entrance animation on items

---

### `RadarTooltip` — `src/frontend/src/components/radar/RadarTooltip.tsx`

Custom tooltip content for `Recharts.Tooltip content` prop.

```typescript
interface RadarTooltipProps {
  active?: boolean
  payload?: Array<{ payload: RadarToolPoint }>
}
```

**Renders** (when active): tool name (heading), ring badge (colored), quadrant label, 1-line description.  
**Styling**: glassmorphic card matching `ToolCard.tsx` aesthetic.

**Mobile behavior**: On touch devices (`@media (pointer: coarse)`), tooltip shows on first tap; second tap on the same tool navigates to `/catalog/:id`. On non-touch devices, tooltip shows on hover and click navigates immediately.

---

## Backend Data Contract

### `GET /api/radar`

**Controller**: `@Controller('radar')` → `@Get()` → `getRadarData()`  
**Response envelope**: `{ data: RadarResponseDto, timestamp: string }`

#### `RadarResponseDto` — `src/backend/src/radar/dto/radar-response.dto.ts`

```typescript
export class RadarToolPointDto {
  id: string
  name: string
  description: string
  x: number       // Cartesian, range −100 to +100
  y: number       // Cartesian, range −100 to +100
  ring: 'core' | 'adopt' | 'trial' | 'watch'
  quadrant: 'engineering' | 'research' | 'automation' | 'design'
  color: string   // Hex derived from ring
}

export class RadarRingDto {
  id: 'core' | 'adopt' | 'trial' | 'watch'
  label: string
  radius: number          // 25 | 50 | 75 | 100
  color: string           // Hex
  description: string     // Short legend text
}

export class RadarQuadrantDto {
  id: 'engineering' | 'research' | 'automation' | 'design'
  label: string
  startAngle: number      // Degrees
  endAngle: number        // Degrees
}

export class RadarResponseDto {
  tools: RadarToolPointDto[]
  rings: RadarRingDto[]
  quadrants: RadarQuadrantDto[]
}
```

**No `class-validator` required** for this read-only GET endpoint (no request body).

#### Mock Data Specification

`RadarService.getRadarData()` returns a hardcoded `RadarResponseDto` with:

- **Rings** (4 entries): CORE `r=25 #A855F7`, ADOPT `r=50 #22C55E`, TRIAL `r=75 #3B82F6`, WATCH `r=100 #9CA3AF`
- **Quadrants** (4 entries): engineering `0–90°`, research `90–180°`, automation `180–270°`, design `270–360°`
- **Tools** (12–20 entries): Distributed across all rings and quadrants. Pre-calculated coordinates using polar-to-Cartesian:
  - `x = radius × cos(θ_radians)` (where `radius` is the ring's coordinate-space value ± small jitter)
  - `y = radius × sin(θ_radians)`
  - Convention: 0° = East (3 o'clock), angles increase counterclockwise (standard math)
  - Each tool includes `id` that matches a valid slug navigable as `/catalog/:id`

**Example tool entries** (representative):
| id | name | ring | quadrant | x | y |
|---|---|---|---|---|---|
| `github-copilot` | GitHub Copilot | core | engineering | 18 | 18 |
| `cursor` | Cursor | adopt | engineering | 38 | 32 |
| `claude` | Claude | core | research | -15 | 22 |
| `perplexity` | Perplexity | adopt | research | -42 | 28 |
| `langchain` | LangChain | trial | automation | -55 | -42 |
| `autogpt` | AutoGPT | watch | automation | -78 | -62 |
| `midjourney` | Midjourney | adopt | design | 32 | -38 |
| `figma-ai` | Figma AI | trial | design | 58 | -45 |

---

## Reusable Components

### Existing Code to Leverage

| Component / Pattern | File | How to Leverage |
|---|---|---|
| Page data-fetch pattern | `src/frontend/src/routes/CatalogPage.tsx` | Copy `useState` + `useEffect` + loading/error/empty render pattern verbatim into `RadarPage` |
| Glassmorphic container | `src/frontend/src/components/tools/ToolCard.tsx` | Reuse Tailwind class combination: `bg-card/30 backdrop-blur-sm border border-primary/20 rounded-[var(--radius)]` |
| Framer Motion entrance | `src/frontend/src/components/tools/ToolCard.tsx` | Reuse `motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` pattern |
| Nav item pattern | `src/frontend/src/components/layout/SidebarNav.tsx` | Extend `NAV_ITEMS` array — no new component needed |
| API client wrapper | `src/frontend/src/lib/api.ts` | Extend `api` object with `radar: { get: () => request<RadarData>('/radar') }` |
| NestJS module structure | `src/backend/src/tools/tools.module.ts` | Copy module-controller-service structure exactly |
| Response envelope | `src/backend/src/tools/tools.controller.ts` | `RadarService.getRadarData()` returns plain object; `@nestjs/common` wraps it |
| `shadcn Sheet` | Available via shadcn/ui | Use for mobile legend drawer |

### New Components Required

| Component | Justification |
|---|---|
| `RadarChart.tsx` | No existing chart component in codebase; Recharts integration is a new pattern |
| `RadarRings.tsx` | Custom SVG overlay specific to radar domain; no existing analog |
| `RadarQuadrants.tsx` | Custom SVG overlay specific to radar domain; no existing analog |
| `RadarPoints.tsx` | Custom Recharts shape renderer; unique to scatter visualization |
| `RadarBeam.tsx` | Animated SVG scanning beam; unique visual effect not elsewhere in codebase |
| `RadarLegend.tsx` | Domain-specific legend with ring semantics; not a generic component |
| `src/frontend/src/types/radar.ts` | New domain types; no existing radar types |
| `src/backend/src/radar/` (4 files) | New backend feature module; no existing radar data service |

**New dependency**: `recharts` (no visualization library currently installed, confirmed by gap analysis).

---

## Technical Approach

### Coordinate System

The chart uses a square Cartesian space of `−110` to `+110` on both axes (10-unit padding beyond the outer ring radius of 100). Recharts `ScatterChart` provides the coordinate host with these fixed domains:

```
XAxis: domain={[-110, 110]}, hide={true}
YAxis: domain={[-110, 110]}, hide={true}
```

All SVG overlays (rings, quadrants, beam) reference the same scale so visual alignment is guaranteed.

### Polar-to-Cartesian Calculation (Backend)

The backend service pre-calculates X/Y using standard trigonometry:
```
θ = midpoint of quadrant's angular range (radians)
// Convention: 0° = East (3 o'clock), CCW positive (standard Cartesian)
x = ring.radius × cos(θ) + jitter   // jitter: deterministic offset seeded by tool index (±8 units)
y = ring.radius × sin(θ) + jitter
```

This keeps the frontend free of coordinate math and ensures consistent positioning.

### SVG Overlay Integration with Recharts

Custom SVG layers are injected using Recharts `<Customized component={...} />` inside `ScatterChart`. This gives access to Recharts-injected `xAxisMap`, `yAxisMap`, `width`, and `height` props, enabling pixel-accurate overlay positioning.

### Animation Architecture

| Layer | Technology | Trigger |
|---|---|---|
| Scanning beam rotation | CSS `@keyframes spin` via Tailwind `animate-spin` or custom keyframe | Always active |
| Tool point hover glow | CSS `transition` on SVG `filter` and `r` attribute | `mouseenter` / `mouseleave` |
| Page entrance | Framer Motion `motion.div` with `initial`/`animate` | On component mount |
| Legend items stagger | Framer Motion `motion.li` with `transition.delay` | On component mount |

### Data Flow

```
GET /api/radar
  └─ RadarController.getRadarData()
      └─ RadarService.getRadarData()  ← returns hardcoded RadarResponseDto
          └─ ApiEnvelope { data: RadarResponseDto, timestamp }

api.radar.get()               ← unwraps envelope, returns RadarData
  └─ RadarPage (useState)
      ├─ RadarLegend (rings[])
      └─ RadarChart (tools[], rings[], quadrants[], onToolClick)
          ├─ RadarRings (rings[])
          ├─ RadarQuadrants (quadrants[])
          ├─ RadarBeam ()
          ├─ Scatter (tools[] as data, shape=<RadarPoints>)
          └─ Tooltip (content=<RadarTooltip>)
```

### Navigation Integration

`App.tsx` change (additive only):
```tsx
<Route path="radar" element={<RadarPage />} />
```

`SidebarNav.tsx` change (array extension only):
```typescript
{ id: 'radar', label: 'Radar', icon: Activity, to: '/radar', end: false }
```

`api.ts` change (namespace extension only):
```typescript
radar: {
  get: () => request<RadarData>('/radar'),
},
```

`app.module.ts` change (import array addition only):
```typescript
import { RadarModule } from './radar/radar.module';
// added to imports: [..., RadarModule]
```

---

## Implementation Guidance

### Dependencies to Install

```bash
# Frontend only
cd src/frontend && npm install recharts

# Add shadcn Sheet component for mobile legend drawer (if not already installed)
cd src/frontend && npx shadcn@latest add sheet
```

`@types/recharts` is bundled with modern `recharts` (v2+) — no separate `@types/` package needed.

### File Structure

```
src/
├── frontend/src/
│   ├── routes/
│   │   └── RadarPage.tsx                    (new)
│   ├── components/radar/
│   │   ├── RadarChart.tsx                   (new)
│   │   ├── RadarRings.tsx                   (new)
│   │   ├── RadarQuadrants.tsx               (new)
│   │   ├── RadarPoints.tsx                  (new)
│   │   ├── RadarBeam.tsx                    (new)
│   │   └── RadarLegend.tsx                  (new)
│   ├── types/
│   │   └── radar.ts                         (new)
│   ├── App.tsx                              (modified — add /radar route)
│   ├── components/layout/SidebarNav.tsx     (modified — add NAV_ITEMS entry)
│   └── lib/api.ts                           (modified — add api.radar.get())
└── backend/src/
    ├── radar/
    │   ├── radar.module.ts                  (new)
    │   ├── radar.controller.ts              (new)
    │   ├── radar.service.ts                 (new)
    │   └── dto/
    │       └── radar-response.dto.ts        (new)
    └── app.module.ts                        (modified — register RadarModule)
```

### Testing Approach

2–8 focused tests per implementation step group. Tests run in isolation (new tests only per group, not the full suite).

| Group | Tests (target 3–6) |
|---|---|
| **Backend** | `RadarService.getRadarData()` returns valid shape; ring radii correct; quadrant angles non-overlapping; tool coordinates within ring bounds; endpoint `GET /api/radar` returns 200 with envelope |
| **Frontend types** | `RadarToolPoint` satisfies interface; `RadarData` contains all 3 arrays |
| **RadarChart** | Renders without crashing with minimal props; renders correct number of Scatter points; calls `onToolClick` with correct id |
| **RadarLegend** | Renders 4 ring items; displays correct colors; each item shows description |
| **Integration** | `RadarPage` renders loaded state; navigation to `/radar` from sidebar link |

### Standards Compliance

- **Global** (`coding-standards.md`): Named exports, PascalCase files, no `any`, `const` by default, external imports first, `Logger` in backend service (not `console.log`), no hard-coded URLs.
- **Frontend** (`frontend-standards.md`): Functional components only, `interface *Props` for all prop types, shadcn `Sheet` for mobile legend drawer, Tailwind CSS variable tokens (`hsl(var(--primary))`), Framer Motion patterns per spec, responsive breakpoints via Tailwind (`lg:`, `md:`, `sm:`).
- **Backend** (`backend-standards.md`): Feature-per-module structure, DTOs in `dto/` subdirectory, kebab-case filenames, `@Controller('radar')` (no version prefix), plain object return (envelope applied globally), no `process.env` direct calls.
- **Testing** (`testing-standards.md`): Unit tests as `.spec.ts` in `src/`, AAA structure, mock dependencies in controller/service tests.

---

## Out of Scope

- Real-time data from the actual tool catalog (mock service only for this release)
- Filtering by ring or quadrant
- Search / highlight tools on radar
- Export radar as PNG/SVG
- Shareable radar views with URL params
- Animation on data change (tools moving between rings)
- Multi-radar comparison views
- Accessibility (keyboard navigation, screen reader ARIA labels) — deferred to post-implementation verification

---

## Assumptions

1. Tool IDs in mock data match slugs resolvable by the existing `GET /tools/:id` route (navigation will work end-to-end).
2. `recharts` v2.x is installed — provides built-in TypeScript types, no separate `@types/recharts` needed.
3. The `Activity` icon is available from `lucide-react ^1.16.0` (already installed); if not, `Radio` or `Target` is used as fallback.
4. The Recharts `Customized` component API is used for SVG overlays (documented in Recharts v2); no unsupported SVG injection methods.
5. Mobile legend drawer uses shadcn `Sheet` (`npx shadcn@latest add sheet` if not yet installed).
6. No backend env vars are required for the radar feature — mock data is fully static.
7. Pre-calculated coordinates use a coordinate space of ±100 with ring radii 25/50/75/100; this matches the Recharts domain configured in `RadarChart`.

---

## Success Criteria

| Criterion | Measurable Outcome |
|---|---|
| Route accessible | `GET /radar` renders `RadarPage` without 404 |
| Navigation visible | "Radar" item appears in sidebar with correct active state on `/radar` |
| Chart renders | 4 rings + 4 quadrant dividers + ≥12 tool points visible on load |
| Correct colors | Each tool point color matches its ring color per spec |
| Beam animates | Scanning beam completes 360° continuously, not pausing on interaction |
| Tooltip works | Hovering a tool point shows name, ring, quadrant, and description |
| Click navigates | Clicking a tool point routes to `/catalog/:id` |
| Legend renders | 4 ring entries with correct colors and descriptions appear in legend |
| API contract | `GET /api/radar` returns `{ data: { tools, rings, quadrants }, timestamp }` |
| Error state | Forcing API failure renders user-visible error message (no blank screen) |
| Loading state | Network delay shows loading indicator, not blank/crashed view |
| Responsive | Layout switches legend position at 1024px and 768px breakpoints |
| No regressions | Existing routes (`/`, `/compare`, `/catalog`, `/catalog/:id`) unaffected |
| TypeScript | `tsc --noEmit` passes with zero errors on all new and modified files |
