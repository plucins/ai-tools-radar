# Gap Analysis: AI Tools Radar Visualization

**Date**: 2026-05-26  
**Task**: Implement interactive radar chart visualization for AI Tools Radar  
**Issue**: #9

---

## Summary

- **Risk Level**: Medium
- **Estimated Effort**: Medium
- **Detected Characteristics**: New UI feature with complex visualization, backend data service, and integration into existing navigation

## Task Characteristics

- **Has reproducible defect**: No (new feature development)
- **Modifies existing code**: Yes (App.tsx, SidebarNav.tsx, api.ts)
- **Creates new entities**: Yes (RadarPage, RadarModule, radar components)
- **Involves data operations**: No (mock data initially, no CRUD lifecycle)
- **UI heavy**: Yes (polar chart with animations, tooltips, click handlers)

---

## Gaps Identified

### Missing Features

#### Frontend Gaps

**1. Visualization Library** ❌
- **Current state**: No chart/visualization library installed
- **Required**: Recharts (as per clarifications.md decision)
- **Evidence**: `grep -i "recharts\|d3\|chart" src/frontend/package.json` → No matches
- **Action**: Install `recharts` + TypeScript types

**2. Radar Page Route** ❌
- **Current state**: Only 4 routes exist: `/`, `/compare`, `/catalog`, `/catalog/:id`
- **Evidence**: `src/frontend/src/App.tsx` lines 13-16 define routes; no `/radar` route present
- **Required**: New `/radar` route rendering `RadarPage.tsx`
- **Action**: Add route in `App.tsx` nested under `MainLayout`

**3. Radar Page Component** ❌
- **Current state**: No `RadarPage.tsx` exists in `/routes/`
- **Evidence**: Codebase analysis shows only 4 page components (ToolsPage, CatalogPage, ToolProfilePage, ComparisonResultPage)
- **Required**: New page component following existing patterns (loading/error/data states, useEffect data fetching)
- **Action**: Create `/src/frontend/src/routes/RadarPage.tsx`

**4. Radar Visualization Components** ❌
- **Current state**: No radar visualization components exist
- **Evidence**: No `/components/radar/` directory in codebase analysis
- **Required**:
  - `RadarChart.tsx` — Recharts polar chart with 4 rings, 4 quadrants
  - `RadarLegend.tsx` — Sidebar legend explaining status rings (CORE/ADOPT/TRIAL/WATCH)
  - `RadarTooltip.tsx` — Custom tooltip component (optional if Recharts default suffices)
- **Action**: Create `/src/frontend/src/components/radar/` directory with components

**5. Radar Data Types** ❌
- **Current state**: Existing types: `Tool`, `ComparisonResult`, `ModelInfo` (no radar types)
- **Evidence**: `src/frontend/src/types/` contains `tool.ts`, `comparison.ts`, `model.ts`
- **Required**: TypeScript interfaces for radar data structure
- **Action**: Create `/src/frontend/src/types/radar.ts` with interfaces:
  ```typescript
  export interface RadarToolPoint {
    id: string
    name: string
    x: number           // Pre-calculated polar X coordinate
    y: number           // Pre-calculated polar Y coordinate
    ring: 'core' | 'adopt' | 'trial' | 'watch'
    quadrant: 'engineering' | 'research' | 'automation' | 'design'
    color: string       // Neon color for tool point
    status: string      // Additional metadata
    url: string         // Navigation target for click
  }
  
  export interface RadarData {
    tools: RadarToolPoint[]
    rings: RadarRing[]
    quadrants: RadarQuadrant[]
  }
  
  export interface RadarRing {
    name: string
    radius: number
    color: string
  }
  
  export interface RadarQuadrant {
    id: string
    label: string
    startAngle: number
    endAngle: number
  }
  ```

**6. Navigation Link** ❌
- **Current state**: Only 2 nav items: "Compare" (`/`), "Catalog" (`/catalog`)
- **Evidence**: `src/frontend/src/components/layout/SidebarNav.tsx` lines 13-16 show `NAV_ITEMS` array
- **Required**: New "Radar" nav item
- **Action**: Add to `NAV_ITEMS` array with icon from `lucide-react`

**7. API Client Method** ❌
- **Current state**: `api.ts` defines `tools`, `comparison`, `models` namespaces
- **Evidence**: `src/frontend/src/lib/api.ts` lines 26-42 show API structure
- **Required**: New `api.radar.get()` method
- **Action**: Add to `api` object:
  ```typescript
  radar: {
    get: () => request<RadarData>('/radar'),
  }
  ```

#### Backend Gaps

**1. Radar Module** ❌
- **Current state**: Existing modules: ToolsModule, ComparisonModule, LlmModule, ModelsModule, HealthModule
- **Evidence**: `src/backend/src/app.module.ts` lines 12-23 show imported modules; no RadarModule
- **Required**: New NestJS module for radar endpoint
- **Action**: Create `/src/backend/src/radar/` directory with:
  - `radar.module.ts`
  - `radar.controller.ts`
  - `radar.service.ts`
  - `dto/radar-response.dto.ts`

**2. Radar Controller** ❌
- **Current state**: No `/radar` endpoint exists
- **Evidence**: Codebase analysis shows only `/tools`, `/comparison`, `/models`, `/health` endpoints
- **Required**: Controller with `GET /radar` endpoint
- **Action**: Create controller following existing pattern:
  ```typescript
  @Controller('radar')
  export class RadarController {
    constructor(private readonly radarService: RadarService) {}
    
    @Get()
    getRadarData() {
      return this.radarService.getRadarData();
    }
  }
  ```

**3. Radar Service (Mock Data)** ❌
- **Current state**: No radar data service exists
- **Required**: Service returning hardcoded mock radar data
- **Action**: Create service with method returning `RadarResponseDto` containing:
  - Tool points with pre-calculated polar coordinates
  - Ring definitions (core/adopt/trial/watch with radii)
  - Quadrant definitions (engineering/research/automation/design with angles)

**4. Radar DTOs** ❌
- **Current state**: No radar DTOs exist
- **Evidence**: Existing DTOs only for tools, comparison
- **Required**: Response DTO for radar endpoint
- **Action**: Create `/src/backend/src/radar/dto/radar-response.dto.ts` mirroring frontend types

**5. Module Registration** ❌
- **Current state**: `AppModule` does not import `RadarModule`
- **Required**: Register `RadarModule` in `AppModule`
- **Action**: Add `RadarModule` to imports array in `app.module.ts`

### Incomplete Features

None — this is a net-new feature, not extending existing functionality.

### Behavioral Changes Needed

None — existing routes and features remain unchanged. This is an additive change.

---

## User Journey Impact Assessment

### Integration Points

| Dimension | Current | After | Assessment |
|-----------|---------|-------|------------|
| **Reachability** | N/A (feature doesn't exist) | Primary sidebar navigation → `/radar` | ✅ **Excellent** |
| **Discoverability** | N/A | Sidebar nav item with icon + label | ✅ **9/10** |
| **Flow Integration** | N/A | Parallel to Catalog/Compare — no disruption | ✅ **Positive** |
| **Multi-Persona** | N/A | Available to all users (same as other pages) | ✅ **Consistent** |

**Discoverability Score**: **9/10**
- **Reasoning**: Radar link will be in primary sidebar navigation, immediately visible on app load, with clear label and icon. Same discoverability as existing "Compare" and "Catalog" features.
- **Minor deduction**: Users unfamiliar with radar charts may need brief onboarding to understand visualization semantics.

### Navigation Paths

**Primary Path**: User lands on app → Sees "Radar" in sidebar → Clicks → RadarPage renders
**Alternative Path**: Direct URL access to `/radar` (shareable links)

**Evidence of Integration**:
- Sidebar navigation is always visible (fixed 260px width in `MainLayout.tsx`)
- Navigation uses React Router `NavLink` with active state detection
- Pattern matches existing "Compare" and "Catalog" items

### Patterns to Follow

**Existing Page Pattern** (from CatalogPage, ToolsPage):
```typescript
// 1. State management
const [data, setData] = useState<RadarData | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

// 2. Data fetching on mount
useEffect(() => {
  setLoading(true)
  api.radar
    .get()
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
}, [])

// 3. Conditional rendering
if (loading) return <LoadingState />
if (error) return <ErrorState message={error} />
if (!data) return <EmptyState />
```

**Styling Pattern** (glassmorphic from existing components):
- Container: `bg-card/30 backdrop-blur-sm rounded-[var(--radius)]`
- Glow effect: `shadow-[0_0_80px_hsl(var(--primary)/0.2)]`
- Neon accent: `border-primary/30`
- Use `hsl(var(--primary))` (258° 90% 66%) for chart colors

**Animation Pattern** (from ToolCard, SidebarNavItem):
- Entrance: Framer Motion with `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Hover: `whileHover={{ scale: 1.02 }}` on interactive elements
- Tap: `whileTap={{ scale: 0.98 }}`

---

## New Capability Analysis

### Integration Points

**Routing Integration**:
- Add route to `App.tsx` under `MainLayout` parent route
- Route definition: `<Route path="radar" element={<RadarPage />} />`
- Follows existing nested routing pattern

**Navigation Integration**:
- Extend `NAV_ITEMS` array in `SidebarNav.tsx`
- Choose icon from `lucide-react` (recommend `Activity` or `Radar` if available)
- Navigation item structure:
  ```typescript
  { id: 'radar', label: 'Radar', icon: Activity, to: '/radar', end: false }
  ```

**API Integration**:
- Extend `api` object in `api.ts` with new `radar` namespace
- Follows existing pattern of domain-grouped API methods
- Uses same `request<T>` wrapper with envelope unwrapping

**Backend Integration**:
- Register `RadarModule` in `AppModule` imports
- Follows NestJS module-per-feature convention
- Module is self-contained with its own controller, service, DTOs

### Patterns to Follow

**Component Organization** (follow existing structure):
```
src/frontend/src/
├── routes/
│   └── RadarPage.tsx              # NEW: Page component
├── components/
│   └── radar/                     # NEW: Domain folder
│       ├── RadarChart.tsx         # Chart visualization
│       ├── RadarLegend.tsx        # Ring legend
│       └── RadarTooltip.tsx       # Custom tooltip (optional)
├── types/
│   └── radar.ts                   # NEW: Type definitions
└── lib/
    └── api.ts                     # MODIFIED: Add radar methods
```

**Backend Organization** (follow existing structure):
```
src/backend/src/
├── radar/                         # NEW: Feature module
│   ├── radar.module.ts
│   ├── radar.controller.ts
│   ├── radar.service.ts
│   └── dto/
│       └── radar-response.dto.ts
└── app.module.ts                  # MODIFIED: Import RadarModule
```

### Architectural Impact

**Level**: **Low-Medium**

**New Files Created**: 11 files
- Frontend: 5 files (RadarPage, 3 components, types)
- Backend: 4 files (module, controller, service, DTO)
- Modified: 2 files (App.tsx, SidebarNav.tsx, api.ts, app.module.ts)

**Dependency Changes**:
- Frontend: Add `recharts` package (~150KB gzipped)
- Backend: No new dependencies (uses existing NestJS framework)

**No Breaking Changes**:
- Existing routes unchanged
- Existing components unchanged
- API contract extended (not modified)
- Backward compatible

**Complexity Increase**: Moderate
- Adds one new page (4→5 total routes)
- Adds one new backend module (5→6 total modules)
- Introduces visualization complexity (polar coordinates, SVG manipulation)

---

## Issues Requiring Decisions

### Critical (Must Decide Before Proceeding)

**1. Radar Data Calculation Responsibility**
- **Issue**: Should polar coordinates be calculated on backend or frontend?
- **Options**:
  - **A**: Backend pre-calculates X/Y coordinates + sends to frontend
  - **B**: Frontend calculates coordinates from ring/quadrant metadata
- **Recommendation**: **Option A** (Backend calculates)
- **Rationale**:
  - Matches clarification decision: "Backend delivers both tool names and coordinates"
  - Simplifies frontend component (Recharts receives ready-to-plot data)
  - Easier to test coordinate logic in isolation
  - Performance: Coordinate calculation is one-time on page load, not re-rendered

**2. Recharts Customization Depth**
- **Issue**: Recharts may not support true polar radar with concentric rings out-of-box
- **Options**:
  - **A**: Use Recharts `<RadarChart>` component as-is (limited customization)
  - **B**: Use Recharts as SVG container + manually draw rings/quadrants with SVG primitives
  - **C**: Switch to D3.js for full polar control
- **Recommendation**: **Option B** (Recharts + custom SVG)
- **Rationale**:
  - Recharts provides coordinate system + tooltip infrastructure
  - Custom SVG overlays enable concentric rings + quadrant divisions
  - Avoids D3 learning curve while maintaining design control
  - Can migrate to D3 later if needed
- **Risk**: May require deeper SVG knowledge than expected → Medium complexity

**3. Scanning Beam Animation Performance**
- **Issue**: 360° rotating beam animation could impact performance on large datasets
- **Options**:
  - **A**: CSS animation on SVG `<line>` element (GPU-accelerated)
  - **B**: Framer Motion animation (React-managed)
  - **C**: requestAnimationFrame loop (manual control)
- **Recommendation**: **Option A** (CSS animation)
- **Rationale**:
  - Best performance (GPU-accelerated, off main thread)
  - Simplest implementation (keyframe from 0deg to 360deg)
  - Matches project's use of Tailwind animations (see `glow-pulse` in tailwind.config.js)
- **Implementation**:
  ```css
  @keyframes radar-scan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .radar-beam {
    animation: radar-scan 4s linear infinite;
    transform-origin: center;
  }
  ```

### Important (Should Decide)

**4. Click Navigation Behavior**
- **Issue**: Should clicking a tool point navigate to tool detail page or open modal?
- **Options**:
  - **A**: Navigate to `/catalog/:id` (existing tool profile page)
  - **B**: Open modal overlay with tool summary
- **Default**: **Option A** (Navigate to existing page)
- **Rationale**:
  - Reuses existing `ToolProfilePage.tsx` component
  - Consistent with user expectations (click = navigate)
  - Less implementation complexity (no new modal component)
  - Users can use browser back button

**5. Initial Mock Data Scope**
- **Issue**: How many tools should be in initial mock radar data?
- **Options**:
  - **A**: 4-6 tools (one per quadrant, minimal data)
  - **B**: 12-20 tools (representative distribution)
  - **C**: Use actual tool catalog data (dynamic radar from real tools)
- **Default**: **Option B** (12-20 tools)
- **Rationale**:
  - Sufficient density to validate visualization design
  - Tests overlapping points and hover interactions
  - Not overwhelming for initial demo
  - Option C deferred to future iteration (requires tool metadata mapping to rings/quadrants)

**6. Legend Interactivity**
- **Issue**: Should clicking legend rings filter visible tools?
- **Options**:
  - **A**: Legend is read-only (visual reference only)
  - **B**: Clicking ring toggles visibility of tools in that ring
- **Default**: **Option A** (Read-only)
- **Rationale**:
  - Simpler MVP implementation
  - Filtering can be added in future iteration
  - Maintains focus on core visualization delivery

**7. Tooltip Content Depth**
- **Issue**: How much information should tooltip display on hover?
- **Options**:
  - **A**: Minimal (tool name + ring status)
  - **B**: Medium (name + ring + quadrant + 1-line description)
  - **C**: Rich (name + ring + quadrant + tags + description)
- **Default**: **Option B** (Medium)
- **Rationale**:
  - Provides context without overwhelming
  - Balances information density with readability
  - Tooltip should encourage click for full details, not replace tool profile page

---

## Recommendations

### Implementation Approach

**Phase 1: Foundation** (Estimated: 2-3 hours)
1. Install Recharts: `npm install recharts` + TypeScript types
2. Create type definitions (`radar.ts`) for data structures
3. Create backend radar module with mock service
4. Test backend endpoint: `curl http://localhost:3000/radar`

**Phase 2: Basic Visualization** (Estimated: 3-4 hours)
1. Create `RadarPage.tsx` with loading/error/data states
2. Add route to `App.tsx` and navigation to `SidebarNav.tsx`
3. Create `RadarChart.tsx` component with Recharts container
4. Render basic scatter plot with tool points (no rings/quadrants yet)
5. Verify data flow: backend → API → page → chart

**Phase 3: Radar Design** (Estimated: 4-5 hours)
1. Add custom SVG overlays for concentric rings (4 circles)
2. Add quadrant dividers (4 radial lines at 0°, 90°, 180°, 270°)
3. Style tool points with neon glow (`drop-shadow` filter)
4. Implement scanning beam animation (CSS keyframes)
5. Apply glassmorphic container styling
6. Create `RadarLegend.tsx` sidebar component

**Phase 4: Interactivity** (Estimated: 2-3 hours)
1. Add Recharts tooltip with custom content
2. Implement click handler on tool points (navigate to `/catalog/:id`)
3. Add hover effects to tool points (scale + glow intensity)
4. Test click navigation and browser back button

**Phase 5: Polish** (Estimated: 1-2 hours)
1. Add Framer Motion entrance animation to page
2. Optimize colors to match neon purple theme
3. Test responsive behavior (chart scales with container)
4. Add loading skeleton for radar chart

**Total Estimated Effort**: **12-17 hours** (Medium effort)

### Risk Assessment

**Complexity Risk**: **Medium**
- Polar coordinate system requires trigonometry
- Recharts customization may require SVG expertise
- Animation synchronization (beam rotation + tool point glows)
- **Mitigation**: Start with simple scatter plot, incrementally add rings/quadrants

**Integration Risk**: **Low**
- Clear integration points (routes, navigation, API)
- Follows established patterns (page structure, API client, NestJS modules)
- No breaking changes to existing features
- **Mitigation**: TypeScript will catch integration errors at compile time

**Regression Risk**: **Low**
- No modifications to existing pages/components
- New route is isolated (no shared state with other pages)
- Backend endpoint is standalone (no dependencies on other services)
- **Mitigation**: Existing features unaffected; manual QA of navigation links

**Design Risk**: **Medium**
- Matching glassmorphic aesthetic to SVG chart
- Neon glow effects on chart elements may require trial/error
- Tooltip styling to match existing UI
- **Mitigation**: Reference existing components (ToolCard glow pattern, Badge styling)

**Performance Risk**: **Low**
- Recharts is optimized for React rendering
- Scanning beam animation via CSS (GPU-accelerated)
- Mock data is small (12-20 points)
- **Mitigation**: Use React.memo if re-renders become issue

### Testing Recommendations

**Unit Tests** (Not currently present in codebase, but recommended):
- `RadarPage.tsx`: Renders without crashing, handles loading/error states
- `RadarChart.tsx`: Accepts data prop, renders correct number of tool points
- `radar.service.ts`: Returns expected mock data structure

**Integration Tests**:
- `GET /radar` endpoint returns valid `RadarResponseDto`
- API client `api.radar.get()` unwraps envelope correctly
- Navigation link in sidebar routes to `/radar`

**Manual QA Checklist**:
- [ ] Sidebar "Radar" link navigates to `/radar`
- [ ] Active state highlights "Radar" nav item when on page
- [ ] Radar chart renders with 4 rings + 4 quadrants
- [ ] Tool points are plotted at correct coordinates
- [ ] Scanning beam rotates 360° continuously
- [ ] Hovering tool point shows tooltip
- [ ] Clicking tool point navigates to `/catalog/:id`
- [ ] Browser back button returns to radar page
- [ ] Chart styling matches glassmorphic theme (blur, glow, neon purple)
- [ ] Page entrance animation plays on first load
- [ ] No console errors on page load

---

## Next Steps

### Immediate Actions

1. **Install Dependencies**:
   ```bash
   cd src/frontend
   npm install recharts
   npm install --save-dev @types/recharts
   ```

2. **Create Type Definitions** (`src/frontend/src/types/radar.ts`):
   - Define `RadarToolPoint`, `RadarData`, `RadarRing`, `RadarQuadrant` interfaces

3. **Scaffold Backend Module**:
   ```bash
   cd src/backend/src
   mkdir radar
   mkdir radar/dto
   touch radar/radar.module.ts
   touch radar/radar.controller.ts
   touch radar/radar.service.ts
   touch radar/dto/radar-response.dto.ts
   ```

4. **Implement Mock Service**:
   - Create `getRadarData()` method returning hardcoded 12-20 tool points
   - Pre-calculate polar coordinates (backend responsibility per decision #1)

5. **Register Backend Module**:
   - Import `RadarModule` in `AppModule`

6. **Test Backend Endpoint**:
   ```bash
   npm run start:dev
   curl http://localhost:3000/radar
   # Expected: JSON with tools array, rings array, quadrants array
   ```

7. **Create Frontend Page**:
   - Create `RadarPage.tsx` with data fetching logic
   - Add route to `App.tsx`
   - Add navigation item to `SidebarNav.tsx`

8. **Verify Navigation**:
   - Start frontend dev server
   - Click "Radar" in sidebar
   - Verify page renders (even if chart is placeholder)

### Follow-up Planning

**Future Enhancements** (Out of scope for MVP):
- Real-time data from actual tool catalog (map tools to rings/quadrants)
- Filter by quadrant (click quadrant label to hide others)
- Filter by ring (click legend to toggle visibility)
- Search tools on radar (highlight matching points)
- Export radar as PNG/SVG
- Shareable radar views (URL params encode filters)
- Animation on data change (tools move between rings)
- Multi-radar comparison (side-by-side views)

**Technical Debt**:
- Add test coverage (frontend + backend)
- Performance profiling with larger datasets (100+ tools)
- Accessibility audit (keyboard navigation, screen reader support)
- Mobile responsive design (chart scales to small screens)

---

## Appendix: Polar Coordinate Calculation

**Backend Service Example** (for `radar.service.ts`):

```typescript
private calculatePosition(ring: string, quadrant: string, index: number, total: number): { x: number, y: number } {
  // Ring radii (0-100 scale)
  const ringRadius = {
    core: 25,
    adopt: 50,
    trial: 75,
    watch: 100,
  }[ring]

  // Quadrant angle ranges
  const quadrantAngles = {
    engineering: { start: 0, end: 90 },
    research: { start: 90, end: 180 },
    automation: { start: 180, end: 270 },
    design: { start: 270, end: 360 },
  }

  // Distribute tools evenly within quadrant
  const angleRange = quadrantAngles[quadrant]
  const angleStep = (angleRange.end - angleRange.start) / (total + 1)
  const angle = angleRange.start + angleStep * (index + 1)

  // Add jitter to avoid perfect alignment (optional)
  const radiusJitter = (Math.random() - 0.5) * 10
  const angleJitter = (Math.random() - 0.5) * 5
  
  const finalRadius = ringRadius + radiusJitter
  const finalAngle = (angle + angleJitter) * (Math.PI / 180) // Convert to radians

  // Polar to Cartesian
  return {
    x: Math.cos(finalAngle) * finalRadius,
    y: Math.sin(finalAngle) * finalRadius,
  }
}
```

---

**End of Gap Analysis**
