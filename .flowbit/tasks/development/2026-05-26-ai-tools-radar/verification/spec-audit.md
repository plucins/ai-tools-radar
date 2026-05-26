# Specification Audit — AI Tools Radar Visualization

**Audited by**: Spec Auditor Agent  
**Date**: 2026-05-26  
**Spec version**: `implementation/spec.md` (24.2 KB, ~600 lines)  
**Task path**: `.flowbit/tasks/development/2026-05-26-ai-tools-radar`

---

## Verdict

> **⚠️ PASS-WITH-CONCERNS**

The specification is well-structured and comprehensive for MVP delivery. All five functional requirement areas are traceable to spec sections. However, **one critical formula bug** and **one unresolved implementation gap** could block a developer or produce silently wrong runtime behavior. Several cross-document inconsistencies add unnecessary confusion. These concerns must be resolved before implementation begins.

---

## Summary

| Severity | Count | Must-fix before coding? |
|---|---|---|
| 🔴 Critical | 1 | Yes |
| 🟡 Warning | 7 | Recommended |
| 🔵 Info | 7 | No (awareness only) |

---

## 🔴 Critical Issues

### CRIT-1 — Polar-to-Cartesian Formula Is Wrong

**Location**: `spec.md` → "Technical Approach → Polar-to-Cartesian Calculation (Backend)"  
**Spec text**:
```
θ = midpoint of quadrant's angular range (radians)
x = ring.radius × sin(θ) + jitter
y = ring.radius × cos(θ) + jitter
```

**Evidence of bug**: The example mock data table in the same spec section contradicts this formula.

Verification using the spec's own example data:

| Tool | Ring | Quadrant | Expected (spec formula `x=r·sin`, `y=r·cos`) | Actual in example |
|---|---|---|---|---|
| `github-copilot` | CORE (r=25) | engineering 0–90° (θ=45°) | (17.7, 17.7) | (18, 18) ✅ coincidentally matches |
| `claude` | CORE (r=25) | research 90–180° (θ=135°) | **(+17.7, −17.7)** = lower-right quadrant | **(−15, +22)** = upper-left quadrant ❌ |
| `langchain` | TRIAL (r=75) | automation 180–270° (θ=225°) | **(−53, +53)** = upper-left | **(−55, −42)** = lower-left ❌ |
| `midjourney` | ADOPT (r=50) | design 270–360° (θ=315°) | **(−35, +35)** = upper-left | **(+32, −38)** = lower-right ❌ |

The example data is consistent with **standard Cartesian polar conversion**:

```
x = radius × cos(θ)   // 0° = East / right, CCW positive
y = radius × sin(θ)
```

The spec formula has **sin and cos swapped**, and the `RadarQuadrant` interface comment reinforces the confusion:

```typescript
/** Degrees from 12 o'clock, clockwise */
startAngle: number
```

This comment implies a compass/bearing convention, but the example data uses standard math orientation (0° = 3 o'clock, CCW). The two conventions are mutually inconsistent.

**Impact**: If a developer implements the spec formula literally, all tools except those near 45° offsets will render in the **wrong quadrant**. The visualization will silently appear "spread across the chart" but with incorrect domain assignments — undetectable without a test that cross-checks tool quadrant label against visual position.

**Recommendation**: Replace the formula with the correct version and update the `RadarQuadrant` comment:

```typescript
// Correct formula (standard Cartesian, 0° = East, CCW)
x = radius * Math.cos(theta_radians) + jitter
y = radius * Math.sin(theta_radians) + jitter

// Update RadarQuadrant comment to:
/** Degrees CCW from 3 o'clock (standard Cartesian). engineering=0–90°, research=90–180°, automation=180–270°, design=270–360° */
startAngle: number
```

---

## 🟡 Warnings

### WARN-1 — `onToolClick` Callback Cannot Be Passed Through Recharts `shape` Renderer

**Location**: `spec.md` → "Component API → RadarPoints"  
**Spec text**:
```typescript
interface RadarPointsProps {
  cx?: number
  cy?: number
  payload?: RadarToolPoint
  onToolClick: (toolId: string) => void   // ← custom prop
}
```

**Problem**: `RadarPoints` is used as a Recharts `<Scatter shape={...}>` custom renderer. Recharts only injects its own calculated props (`cx`, `cy`, `payload`, `fill`, etc.) into shape renderers. **Custom props like `onToolClick` are not passed through by Recharts internals.**

A developer following the spec literally would write:
```tsx
<Scatter data={tools} shape={<RadarPoints onToolClick={onToolClick} />} />
```
…but `onToolClick` will be `undefined` at runtime inside `RadarPoints` because Recharts does not propagate non-standard props through the shape pipeline.

**Impact**: Click navigation silently fails — no error, no warning, the chart renders perfectly but clicking does nothing. This is a medium-risk hidden implementation gap.

**Recommendation**: The spec must specify the implementation pattern. Two valid options:

```tsx
// Option A — closure (recommended, simplest)
shape={(props) => <RadarPoints {...props} onToolClick={onToolClick} />}

// Option B — React Context (if callback needs to be deeply nested)
// Provide onToolClick via a RadarChartContext, consume in RadarPoints
```

Add a note to the `RadarChart` component API section explaining which pattern to use.

---

### WARN-2 — `shadcn Sheet` Component Not Installed

**Location**: `spec.md` → Assumption #5: "Mobile legend drawer uses shadcn `Sheet` (`npx shadcn@latest add sheet` if not yet installed)."

**Evidence**:
```bash
ls src/frontend/src/components/ui/
# alert.tsx  badge.tsx  button.tsx  card.tsx  checkbox.tsx  dialog.tsx
# EmptyState.tsx  input.tsx  LoadingState.tsx  select.tsx  separator.tsx
# skeleton.tsx
```

`sheet.tsx` is **not present**. The assumption says "if not yet installed" but the spec never includes the install command in the dependency setup section ("Dependencies to Install"). A developer following the implementation guide would miss this step and encounter a runtime import error when rendering the mobile legend.

**Recommendation**: Add `npx shadcn@latest add sheet` to the "Dependencies to Install" section alongside `npm install recharts`.

---

### WARN-3 — Cross-Document Component List Inconsistency (4 Components Missing from Gap Analysis)

**Location**: `gap-analysis.md` → "4. Radar Visualization Components" vs. `spec.md` → "File Structure"

The gap analysis **Required** components section lists only:
- `RadarChart.tsx`
- `RadarLegend.tsx`
- `RadarTooltip.tsx` (optional)

The spec's file structure lists **6 components**:
- `RadarChart.tsx`, `RadarRings.tsx`, `RadarQuadrants.tsx`, `RadarPoints.tsx`, `RadarBeam.tsx`, `RadarLegend.tsx`

**Missing from gap analysis**: `RadarRings`, `RadarQuadrants`, `RadarPoints`, `RadarBeam` — which are substantial sub-components with their own described APIs in the spec. The gap analysis also states "Frontend: 5 files (RadarPage, 3 components, types)" in its Architectural Impact section, contradicting the spec's 8 frontend files.

**Impact**: A developer using gap-analysis as a checklist would build an incomplete feature (no rings, no quadrant dividers, no beam animation). This inconsistency can cause missed scope.

**Recommendation**: Update the gap analysis "Radar Visualization Components" section to list all 6 components. The spec is the authoritative document; the gap analysis needs to be synchronized.

---

### WARN-4 — `@types/recharts` Install Instruction Contradicts Spec

**Location**:  
- `gap-analysis.md` → "Next Steps": `npm install --save-dev @types/recharts`  
- `spec.md` → Assumption #2: "recharts v2.x provides built-in TypeScript types, no separate @types/ package needed"  
- `spec.md` → "Dependencies to Install": only `npm install recharts`

**Evidence**: Recharts v2.x ships with bundled TypeScript declarations; `@types/recharts` is an unmaintained community package for Recharts v1.x and is explicitly deprecated. Installing it alongside Recharts v2 causes type conflicts.

**Impact**: Developer following gap-analysis installs a conflicting package, gets TypeScript errors at compile time.

**Recommendation**: Remove `npm install --save-dev @types/recharts` from gap-analysis "Next Steps" (section already incorrect). The spec is correct; the gap analysis is wrong here.

---

### WARN-5 — `RadarToolPoint` Interface Has Extra Fields in Gap Analysis vs. Spec

**Location**: `gap-analysis.md` → "5. Radar Data Types" vs. `spec.md` → "TypeScript Interfaces"

Gap analysis defines:
```typescript
export interface RadarToolPoint {
  ...
  status: string      // ← NOT in spec
  url: string         // ← NOT in spec
}
```

Spec defines:
```typescript
export interface RadarToolPoint {
  id: string
  name: string
  description: string
  x: number
  y: number
  ring: RadarRingId
  quadrant: RadarQuadrantId
  color: string
  // no 'status', no 'url'
}
```

**Impact**: A developer using the gap analysis interface will add two unnecessary fields. The backend `RadarToolPointDto` would also need to be reconciled. The `url` field is particularly confusing since the spec already uses `id` for navigation (`/catalog/:id`).

**Recommendation**: The spec interface is correct and authoritative. Add a note to gap-analysis that its `RadarToolPoint` snippet is outdated and the spec's `types/radar.ts` section is the definitive source.

---

### WARN-6 — `RadarTooltip` Location Left Ambiguous

**Location**: `spec.md` → "Component API → RadarTooltip":  
> "inline in `RadarChart.tsx` or extracted"

This is explicitly undefined. The testing section references `RadarTooltip` rendering behavior as a test target. The gap analysis lists it as "optional if Recharts default suffices."

**Impact**: Ambiguity about file existence creates: (a) inconsistent test file targeting, (b) potential import/export issues, (c) unclear ownership boundary.

**Recommendation**: Make a definitive decision. Given the spec describes a non-trivial tooltip with badge styling, a ring-colored badge, and glassmorphic card — a dedicated `RadarTooltip.tsx` file is strongly recommended. Update the spec to state: "Extract as `RadarTooltip.tsx` in `components/radar/`."

---

### WARN-7 — Mobile Touch Tooltip Strategy Unspecified

**Location**: `technical-clarifications.md` → "Risk 4: Mobile Touch Interactions":  
> "Detect touch device, switch to tap-to-show tooltip pattern, consider long-press for tooltip on mobile"

This risk is acknowledged but there is **no corresponding implementation specification** in `spec.md`. The spec's FR2 only says "Show a custom tooltip on tool point hover" without addressing touch devices. This is a gap between risk acknowledgment and spec coverage.

**Impact**: Developer will either skip mobile tooltip (leaving a blank UX on mobile) or implement an arbitrary solution without spec guidance, causing potential review/rework.

**Recommendation**: Add a spec section under FR2: "On touch devices, show tooltip on tap (first tap shows tooltip, second tap navigates). Use `ontouchstart` detection or the `@media (pointer: coarse)` query." Even a simple "defer mobile tooltip to post-MVP" decision is acceptable — the spec just needs to be explicit.

---

## 🔵 Info

### INFO-1 — Jitter Is Unspecified as Deterministic vs. Random

**Location**: `spec.md` → "Polar-to-Cartesian Calculation": "jitter: ±8 units random per tool"

"Random" is ambiguous. If truly random (e.g., `Math.random()`), each API call returns different coordinates — tools visually "jump" on page reload. If seed-based/deterministic, coordinates are stable.

**Recommendation**: Specify "deterministic jitter using tool index as seed" (e.g., `(index * 7) % 8 - 4`) so tool positions are stable across requests.

---

### INFO-2 — `@keyframes radar-scan` Definition Location Not Specified

**Location**: `spec.md` → "Animation Architecture"  
The CSS `@keyframes radar-scan` block is shown but the file to define it in is not stated. The project has `src/frontend/src/index.css` and `tailwind.config.js` (which defines custom `glow-pulse` animation), but the spec doesn't direct the developer to either.

**Recommendation**: Add one sentence: "Define `@keyframes radar-scan` in `src/frontend/src/index.css` as a custom CSS block, or register it as a Tailwind plugin animation in `tailwind.config.js` following the `glow-pulse` precedent."

---

### INFO-3 — `frontend-standards.md` States React 18, Project Is React 19

**Location**: `frontend-standards.md` → Stack table: "React 18 + TypeScript"  
**Evidence**: `package.json`: `"react": "^19.2.6"`

This pre-existing discrepancy in the standards document is immaterial to the radar feature (Recharts 2.x and all specified patterns work on React 19). However, a developer reading the standards doc may be confused about whether React 19-specific APIs (e.g., new `use()` hook) are available.

**Recommendation**: Update `frontend-standards.md` to reflect React 19. Not a blocker for this task.

---

### INFO-4 — Accessibility Fully Deferred With No Placeholder Guidance

**Location**: `spec.md` → "Out of Scope": "Accessibility (keyboard navigation, screen reader ARIA labels) — deferred to post-implementation verification"

No placeholder `aria-label` attributes, no `role="img"` on the SVG, and no keyboard handler stubs are requested. Given that the chart will contain interactive elements (`onClick` on SVG `<circle>` elements), omitting even basic `role="button"` and `tabIndex` attributes could make this inaccessible to keyboard users from day one.

**Recommendation**: Consider adding a minimum viable accessibility spec item: "SVG tool point circles should have `role='button'`, `tabIndex={0}`, and `aria-label={tool.name}` to enable keyboard focus." This is 3 lines of code and avoids a hard-to-retrofit accessibility debt.

---

### INFO-5 — Gap Analysis "Modified: 2 files" Is a Typo

**Location**: `gap-analysis.md` → "Architectural Impact": "Modified: 2 files (App.tsx, SidebarNav.tsx, api.ts, app.module.ts)"

The text says "2 files" but lists 4. This is clearly a copy-paste error and creates minor confusion.

**Recommendation**: Correct to "Modified: 4 files".

---

### INFO-6 — `React.memo` on `RadarBeam` Is Misleading

**Location**: `spec.md` → "RadarBeam" component: "Memoized with `React.memo`"

`RadarBeam` drives its animation via CSS and receives no data props. `React.memo` prevents re-renders when props are unchanged — but since `RadarBeam` takes only Recharts-injected dimensional props (`width?`, `height?`), memoization is only effective if the chart container doesn't resize. For a CSS-animated component, memoization offers minimal benefit and may mislead developers into thinking it addresses animation performance (it doesn't — CSS animations run independently of React rendering).

**Recommendation**: Keep the memo but add a clarifying comment: "Memoized to prevent re-renders on parent state changes; animation is CSS-driven and unaffected by React rendering cycles."

---

### INFO-7 — Assumption #1 (Tool IDs Match Catalog Slugs) Is Untested

**Location**: `spec.md` → Assumption #1: "Tool IDs in mock data match slugs resolvable by the existing GET /tools/:id route (navigation will work end-to-end)."

**Evidence**: The example mock data uses IDs like `github-copilot`, `cursor`, `claude`, `perplexity`, `langchain`, `autogpt`, `midjourney`, `figma-ai`. The actual tool catalog is file-based (loaded from `data/tools/` YAML files).

This assumption is not verified in the spec or tests. If the mock IDs don't match real catalog file basenames, clicking a tool point navigates to a 404.

**Recommendation**: Add a test case: "Each `id` in `RadarService.getRadarData().tools` must correspond to a file in `data/tools/` that `ToolsService.findOne(id)` can resolve without throwing `NotFoundException`." This is a one-shot integration assertion that catches data contract drift.

---

## Completeness Check

| Requirement | Traceable to Spec | Notes |
|---|---|---|
| FR1.1 — ScatterChart + ResponsiveContainer | ✅ `spec.md §FR1 #1` | |
| FR1.2 — 4 concentric rings at 25/50/75/100 | ✅ `spec.md §FR1 #2` | |
| FR1.3 — 4 quadrant dividers with labels | ✅ `spec.md §FR1 #3` | |
| FR1.4 — Tool points with backend coords | ✅ `spec.md §FR1 #4` | |
| FR1.5 — Ring-based color coding | ✅ `spec.md §FR1 #5` | |
| FR1.6 — Animated scanning beam | ✅ `spec.md §FR1 #6` | |
| FR2.7 — Hover tooltip (name, ring, quadrant, desc) | ✅ `spec.md §FR2 #7` | |
| FR2.8 — Click navigates to /catalog/:id | ✅ `spec.md §FR2 #8` | WARN-1 applies |
| FR2.9 — Hover effects (scale + glow) | ✅ `spec.md §FR2 #9` | |
| FR2.10 — Beam independent of interactions | ✅ `spec.md §FR2 #10` | |
| FR3.11 — /radar route in App.tsx | ✅ `spec.md §FR3 #11` | |
| FR3.12 — Radar nav item in sidebar | ✅ `spec.md §FR3 #12` | |
| FR3.13 — RadarLegend sidebar component | ✅ `spec.md §FR3 #13` | |
| FR3.14 — Responsive layout (desktop/tablet/mobile) | ✅ `spec.md §FR3 #14` | WARN-7 applies to mobile |
| FR4.15 — api.radar.get() method | ✅ `spec.md §FR4 #15` | |
| FR4.16 — loading/error/empty states | ✅ `spec.md §FR4 #16` | |
| FR4.17 — Mock 12–20 tool points | ✅ `spec.md §FR4 #17` | |
| FR5.18 — Glassmorphic styling | ✅ `spec.md §FR5 #18` | |
| FR5.19 — Framer Motion entrance animations | ✅ `spec.md §FR5 #19` | |
| FR5.20 — No hard-coded hex in Tailwind | ✅ `spec.md §FR5 #20` | |

All 20 requirements are traceable. No missing functional requirements.

---

## Standards Alignment Check

| Standard | Spec Alignment | Notes |
|---|---|---|
| Named exports for components | ✅ | Spec uses `export function` pattern throughout |
| Functional components only | ✅ | No class components in spec |
| `interface *Props` for all prop types | ✅ | All 7 component APIs defined |
| kebab-case backend filenames | ✅ | `radar.module.ts`, `radar-response.dto.ts` etc. |
| DTO in `dto/` subdirectory | ✅ | `radar/dto/radar-response.dto.ts` |
| Feature-per-module NestJS structure | ✅ | Full `radar/` module directory |
| No `class-validator` on GET (no request body) | ✅ | Explicitly called out in spec |
| `Logger` not `console.log` in backend | ✅ | Not explicitly specified but follows existing service pattern |
| No direct `process.env` in service/controller | ✅ | Mock data is fully static, no env vars needed |
| Tailwind CSS variable tokens (not hard-coded hex) | ⚠️ | FR5.20 covers classes; component-level SVG `fill` uses hard-coded hex (`#A855F7`) directly in coordinate calculations — acceptable for SVG but worth noting |
| shadcn/ui first before custom components | ✅ | Sheet specified for mobile drawer; tooltip uses custom component (justified: no shadcn tooltip for Recharts) |
| `≥80%` test coverage for backend services | ⚠️ | Spec targets 3–6 tests per group; `RadarService` mock service has minimal branching so coverage is achievable, but no explicit coverage target is stated for frontend |
| AAA test structure | ✅ | Testing section references this pattern |

---

## Risk Assessment

| Risk | Level | Notes |
|---|---|---|
| Wrong coordinates in visual output (CRIT-1) | 🔴 High | Silent failure, hard to detect without quadrant-assertion test |
| Click navigation silently fails (WARN-1) | 🟡 Medium | No error thrown, UX just broken |
| Missing Sheet component blocks mobile build (WARN-2) | 🟡 Medium | Compile error, easy to fix if caught early |
| Recharts Customized SVG alignment | 🟡 Medium | Acknowledged in spec; pixel-alignment errors possible at non-square aspect ratios |
| React 19 + Recharts 2.x compatibility | 🔵 Low | Recharts 2.x officially supports React 18; may need patch version check for React 19 |
| Animation performance on Safari/mobile | 🔵 Low | CSS `transform-origin: center` on SVG requires prefix handling |

---

## Pre-Implementation Checklist

Before coding begins, ensure these items are resolved:

- [ ] **CRIT-1**: Fix formula to `x = r·cos(θ), y = r·sin(θ)` and update `RadarQuadrant` interface comment
- [ ] **WARN-1**: Document `onToolClick` threading pattern (closure recommended) in `RadarChart` API section
- [ ] **WARN-2**: Add `npx shadcn@latest add sheet` to the "Dependencies to Install" section
- [ ] **WARN-3**: Sync gap-analysis component list with spec's 6-component architecture  
- [ ] **WARN-4**: Remove `@types/recharts` install from gap-analysis Next Steps
- [ ] **WARN-5**: Note gap-analysis `RadarToolPoint` snippet is outdated; direct developers to spec
- [ ] **WARN-6**: Decide: extract `RadarTooltip.tsx` (recommended) or keep inline — document the decision
