# Technical & Architecture Clarifications
# AI Tools Radar - Issue #9
# Date: 2026-05-26

## Technical Decisions Made

### 1. Component Architecture
**Decision**: Hybrid approach
- **Structure**: RadarChart container component + extracted sub-components
- **Sub-components**:
  - `RadarRings` - Renders concentric ring overlays
  - `RadarQuadrants` - Renders quadrant dividers
  - `RadarPoints` - Renders tool point markers
  - `RadarBeam` - Renders animated scanning beam
  - `RadarLegend` - Sidebar legend component (separate from chart)
  - `RadarTooltip` - Custom tooltip content
- **Rationale**: Balances modularity with maintainability, allows independent testing of visual layers, supports reusability

### 2. Animation Coordination
**Decision**: Independent animations
- **Behavior**:
  - Scanning beam rotates continuously (360° loop, always active)
  - Tool point hover effects trigger on demand (scale + glow)
  - Entrance animations play once on page load
- **No pausing/synchronization**: Beam rotation doesn't pause on hover or click
- **Rationale**: Simplest implementation, maintains visual interest, no complex coordination logic

### 3. Color Strategy
**Decision**: Ring-based coloring
- **Mapping**:
  - **CORE** → Purple (`#A855F7` / `hsl(258 90% 66%)`)
  - **ADOPT** → Green (`#22C55E`)
  - **TRIAL** → Blue (`#3B82F6`)
  - **WATCH** → Gray (`#9CA3AF`)
- **Consistency**: All tools in same ring share the same color
- **Rationale**: Aligns with issue #9 color specifications, reinforces ring status semantics, matches existing neon purple primary theme

### 4. Responsive Behavior
**Decision**: Scale + reconfigure layout
- **Desktop (>1024px)**:
  - Sidebar legend on left (22-26% width)
  - Radar chart fills remaining space
  - Tooltip appears near cursor
- **Tablet (768-1024px)**:
  - Legend moves below chart
  - Chart scales to fit container
  - Tooltip remains functional
- **Mobile (<768px)**:
  - Legend collapses to drawer or bottom sheet
  - Chart scales to fullscreen width
  - Tooltip may show as modal/bottom sheet for better touch interaction
- **Rationale**: Maintains radar visualization across all devices, adapts layout for smaller screens, preserves core functionality

## Architecture Overview

```
RadarPage (Container)
├── RadarLegend (Sidebar on desktop, bottom on mobile)
│   └── LegendItem × 4 (CORE, ADOPT, TRIAL, WATCH)
└── RadarChart (Recharts container + custom SVG overlays)
    ├── Recharts.ResponsiveContainer
    ├── Recharts.ScatterChart (coordinate system provider)
    ├── RadarRings (Custom SVG: 4 concentric circles)
    ├── RadarQuadrants (Custom SVG: 4 radial dividers)
    ├── RadarPoints (Recharts.Scatter data points)
    ├── RadarBeam (Custom SVG: animated scan line)
    └── RadarTooltip (Recharts.Tooltip with custom content)
```

## Integration with Existing Patterns

**Follows**:
- ✅ Glassmorphic styling (`bg-card/30 backdrop-blur-sm`)
- ✅ Neon purple glow effects (`shadow-[0_0_Xpx_hsl(var(--primary)/0.2)]`)
- ✅ Framer Motion entrance animations (`motion.div` with `initial`, `animate`, `transition`)
- ✅ Tailwind CSS animations for beam rotation (`animate-spin` or custom `@keyframes`)
- ✅ Responsive container patterns (existing pages use flexbox + Tailwind breakpoints)

**Extends**:
- 🆕 Recharts library (new dependency)
- 🆕 Custom SVG overlays (new pattern for chart customization)
- 🆕 Polar coordinate visualization (new domain)

## Technical Risks & Mitigations

### Risk 1: Recharts Polar Coordinate Support
**Issue**: Recharts ScatterChart uses Cartesian coordinates, not native polar
**Mitigation**: Backend pre-calculates polar-to-Cartesian conversion, frontend just plots X/Y points

### Risk 2: SVG Layering with Recharts
**Issue**: Custom SVG overlays may not align with Recharts coordinate system
**Mitigation**: Use Recharts' `ReferenceArea` or `ReferenceLine` components where possible, ensure SVG viewBox matches chart dimensions

### Risk 3: Animation Performance
**Issue**: CSS animation + multiple SVG layers may impact performance
**Mitigation**: Use GPU-accelerated properties (`transform`, `opacity`), minimize DOM nodes, React.memo for static layers

### Risk 4: Mobile Touch Interactions
**Issue**: Hover tooltips don't work on touch devices
**Mitigation**: Detect touch device, switch to tap-to-show tooltip pattern, consider long-press for tooltip on mobile

## Next Steps

These decisions will inform the specification creation phase:
1. **Specification creator** will design detailed component APIs based on hybrid architecture
2. **Implementation planner** will break work into task groups (Backend, Components, Styling, Interactivity)
3. **Diagrams** will visualize component hierarchy and data flow
