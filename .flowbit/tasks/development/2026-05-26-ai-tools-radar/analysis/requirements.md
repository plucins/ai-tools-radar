# Requirements Gathering
# AI Tools Radar - Issue #9
# Date: 2026-05-26

## Initial Description (from GitHub Issue)

Build an interactive polar radar chart visualization for AI developer tools with a futuristic cyberpunk aesthetic. The radar displays tools positioned on 4 concentric rings (CORE → ADOPT → TRIAL → WATCH) across 4 quadrants (Coding & Engineering, Research & Knowledge, AI Agents & Automation, Design & Visual Creation). Features include:
- Neon glow effects with glassmorphic styling
- Animated 360° scanning beam
- Hover tooltips and click-to-navigate functionality
- Sidebar legend explaining ring statuses
- New `/radar` page accessible from sidebar navigation

## Requirements Q&A

### Q1: User Journey - How will users discover and access the radar?
**Answer**: 
- **Discoverability**: Primary sidebar navigation item labeled "Radar" with icon
- **Access**: Single click from any page (sidebar is always visible in MainLayout)
- **Personas**: All users (same discoverability as Compare and Catalog features)
- **Workflow Integration**: Parallel to existing features, no disruption to current user flows
- **Confirmed**: New nav item added to `NAV_ITEMS` array in `SidebarNav.tsx`

### Q2: Existing Code Reuse - Similar features or patterns to reference?
**Answer**:
- **Page structure**: Reuse CatalogPage.tsx pattern (loading/error/data states, useEffect data fetching)
- **Navigation**: Follow SidebarNavItem.tsx pattern (Framer Motion hover/tap, active state detection)
- **Styling**: Reuse glassmorphic container patterns from ToolCard.tsx and CatalogPage.tsx
- **Animations**: Reuse Framer Motion entrance effects (staggered fade-in, scale transitions)
- **API integration**: Follow existing `api.tools.list()` pattern (centralized client, envelope unwrapping)
- **Backend module**: Follow ToolsModule.ts pattern (module-per-feature, controller + service + DTOs)
- **No existing charts**: No visualization library currently in codebase → Need to install Recharts

### Q3: Visual Assets - Mockups, wireframes, or screenshots?
**Answer**:
- **Issue #9** includes comprehensive textual specification (color palette, layout structure, component hierarchy)
- **No visual mockups provided** → Will rely on textual description and color codes
- **Color palette defined**:
  - Primary (CORE): `#A855F7` (neon purple)
  - ADOPT: `#22C55E` (green)
  - TRIAL: `#3B82F6` (blue)
  - WATCH: `#9CA3AF` (gray)
  - Background: `#050816`, `#0B1023`, `#111827`
  - Glow effects: `rgba(168, 85, 247, 0.6)` for purple, etc.
- **Layout described**: Left sidebar legend (22-26% width) + central radar chart
- **Skipping UI mockup generation phase** per user decision

## Functional Requirements Summary

### FR1: Radar Visualization
- **Must** display tools as points on a polar coordinate system
- **Must** render 4 concentric rings (CORE at 25%, ADOPT at 50%, TRIAL at 75%, WATCH at 100% radius)
- **Must** divide chart into 4 quadrants (Engineering 0-90°, Research 90-180°, Automation 180-270°, Design 270-360°)
- **Must** apply ring-based color coding (CORE=purple, ADOPT=green, TRIAL=blue, WATCH=gray)
- **Must** render animated scanning beam rotating 360° continuously (CSS animation, independent of interactions)

### FR2: Interactivity
- **Must** show tooltip on tool point hover (medium depth: name + ring + quadrant + 1-line description)
- **Must** navigate to `/catalog/:id` tool detail page on tool point click
- **Must** apply hover effects to tool points (scale + glow intensity increase)
- **Must not** pause beam animation on hover or click (independent animation strategy)

### FR3: Navigation & Layout
- **Must** add new `/radar` route to App.tsx under MainLayout
- **Must** add "Radar" navigation item to SidebarNav.tsx
- **Must** render sidebar legend explaining ring statuses (CORE, ADOPT, TRIAL, WATCH with colored circles + descriptions)
- **Must** position legend on left sidebar (desktop), below chart (tablet), as drawer (mobile)

### FR4: Data Integration
- **Must** fetch radar data from new `GET /api/radar` backend endpoint
- **Must** handle loading, error, and empty states (follow existing page pattern)
- **Must** backend to deliver pre-calculated X/Y coordinates (polar-to-Cartesian conversion on server)
- **Must** use mock data initially (12-20 hardcoded tool points)

### FR5: Styling & Aesthetics
- **Must** match existing glassmorphic cyberpunk aesthetic (backdrop blur, neon glows, dark gradients)
- **Must** use neon purple (`#A855F7`) as primary theme color (matches existing design system)
- **Must** apply Framer Motion entrance animations (fade-in + scale with stagger)
- **Must** render chart responsively (scale + reconfigure layout for mobile)

## Reusability Opportunities

### Existing Components to Reuse
1. **MainLayout** - Already provides sidebar + outlet structure (no changes needed)
2. **SidebarNavItem** - Animated nav item with active state detection (reuse pattern, add new item)
3. **Framer Motion patterns** - Entrance animations, hover effects (copy from ToolCard.tsx)
4. **API client** - Centralized `request<T>()` wrapper (extend with `api.radar.get()`)

### Existing Backend Patterns to Reuse
1. **NestJS module structure** - Module + controller + service + DTOs (copy from ToolsModule)
2. **Global exception filter** - Uniform error responses (already configured in AppModule)
3. **Response envelope** - `{ data: T, timestamp: string }` wrapper (follow existing pattern)

### New Patterns Introduced
1. **Recharts integration** - First chart library in codebase
2. **Custom SVG overlays** - Extending Recharts with manual SVG drawing
3. **Polar coordinate calculations** - New domain logic in backend service

## Scope Boundaries (Confirmed)

### ✅ In Scope
- Interactive polar radar chart (4 rings, 4 quadrants, tool points)
- Hover tooltips + click navigation to tool detail pages
- Animated scanning beam (CSS 360° rotation)
- Sidebar legend (ring status explanations)
- New `/radar` page with navigation link
- Backend mock service (12-20 hardcoded tools with pre-calculated coordinates)
- Recharts-based visualization
- Glassmorphic cyberpunk styling
- Responsive layout (desktop, tablet, mobile)

### ❌ Out of Scope (Future Enhancements)
- Real-time data from actual tool catalog (deferred to post-MVP)
- Filtering by quadrant or ring (deferred to post-MVP)
- Search/highlight tools on radar (deferred to post-MVP)
- Export radar as PNG/SVG (deferred to post-MVP)
- Shareable radar views with URL params (deferred to post-MVP)
- Animation on data change (tools moving between rings) (deferred to post-MVP)
- Multi-radar comparison views (deferred to post-MVP)

## Technical Considerations

### Dependencies to Install
- `recharts` (React charting library)
- `@types/recharts` (TypeScript definitions)

### New Files to Create
**Frontend (7 files)**:
- `src/frontend/src/routes/RadarPage.tsx`
- `src/frontend/src/components/radar/RadarChart.tsx`
- `src/frontend/src/components/radar/RadarRings.tsx`
- `src/frontend/src/components/radar/RadarPoints.tsx`
- `src/frontend/src/components/radar/RadarBeam.tsx`
- `src/frontend/src/components/radar/RadarLegend.tsx`
- `src/frontend/src/types/radar.ts`

**Backend (4 files)**:
- `src/backend/src/radar/radar.module.ts`
- `src/backend/src/radar/radar.controller.ts`
- `src/backend/src/radar/radar.service.ts`
- `src/backend/src/radar/dto/radar-response.dto.ts`

**Modified Files (4 files)**:
- `src/frontend/src/App.tsx` (add route)
- `src/frontend/src/components/layout/SidebarNav.tsx` (add nav item)
- `src/frontend/src/lib/api.ts` (add `api.radar.get()`)
- `src/backend/src/app.module.ts` (register RadarModule)

### Performance Considerations
- **Chart rendering**: Use React.memo for static SVG layers (rings, quadrants)
- **Animation**: CSS animation for beam (GPU-accelerated), avoid JS-driven rotation
- **Data size**: Mock data limited to 12-20 points (low performance impact)
- **Responsive scaling**: Use Recharts ResponsiveContainer (handles resize efficiently)

### Accessibility Considerations (Deferred to Verification)
- Keyboard navigation for tool point selection
- Screen reader support for radar semantics
- Focus indicators for interactive elements
- ARIA labels for chart components

## Summary

**Total Requirements**: 5 functional areas, 15 must-have features
**Existing Patterns Reused**: 6 frontend + 3 backend patterns
**New Patterns Introduced**: 3 (Recharts, SVG overlays, polar coordinates)
**Files Created**: 11 new, 4 modified
**Dependencies Added**: 2 (recharts + TypeScript types)
**Estimated Complexity**: Medium (12-17 hours per gap analysis)
