# UI Mockups: EPIC 3 — Tool Selection Workspace

**Generated**: 2026-05-24  
**Task Path**: `.flowbit/tasks/development/2026-05-24-tool-selection-workspace/`  
**Feature Type**: Full Redesign (ToolsPage replaced; new AddToolModal; ComparisonPanel redesigned)

---

## Overview

### UI Requirements Summary

| Element | Status | Component |
|---|---|---|
| Hero / intro block | NEW | inline JSX in `ToolsPage` |
| 5-slot selection grid | NEW | `ToolSlotGrid` (new) |
| Empty slot placeholder | NEW | inline in `ToolSlotGrid` |
| Filled slot (slot mode card) | MODIFIED | `ToolCard` with `mode="slot"` |
| Skeleton slot | NEW | shadcn `Skeleton` |
| "Add Tool" trigger button | NEW | `Button` (existing) |
| Add Tool modal | NEW | `AddToolModal` (new file) |
| Search input (modal) | NEW | shadcn `Input` |
| Category filter pills (modal) | NEW | `Badge` (existing, clickable) |
| Tool grid (modal, browser mode) | MODIFIED | `ToolCard` with `mode="browser"` |
| Comparison CTA block | REDESIGNED | `ComparisonPanel` (reworked) |
| Progress stages (CTA) | NEW | inline in `ComparisonPanel` |

### Integration Strategy

**Decision**: ToolsPage becomes a full workspace — Hero → Slot Grid → CTA Block. All tool browsing is modal-only. ToolList is removed from the page (stays as internal modal utility).

**Rationale**: The current flat list + panel pattern buries the comparison workflow. Surfacing 5 explicit slots makes the selection limit discoverable, and modal browsing keeps the workspace uncluttered.

---

## Existing Layout Analysis

### Application Structure

The app is a two-column `h-screen overflow-hidden` layout: a fixed 260 px sidebar on the left and a `flex-1 overflow-y-auto` main content area on the right (with `p-8` padding). The sidebar stacks `SidebarLogo → Separator → SidebarNav → SidebarModelStatus` vertically.

**Key Existing Components**

| Role | Component | Path |
|---|---|---|
| App shell | `MainLayout` | `components/layout/MainLayout.tsx` |
| Left rail | `Sidebar` | `components/layout/Sidebar.tsx` |
| Logo mark | `SidebarLogo` | `components/layout/SidebarLogo.tsx` |
| Navigation | `SidebarNav` + `SidebarNavItem` | `components/layout/SidebarNav.tsx` |
| Model status | `SidebarModelStatus` | `components/layout/SidebarModelStatus.tsx` |
| Scrollable body | `MainContent` | `components/layout/MainContent.tsx` |
| Card shell | `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription` | `components/ui/card.tsx` |
| CTA button | `Button` (default / outline / ghost variants) | `components/ui/button.tsx` |
| Category label | `Badge` (default / secondary / outline variants) | `components/ui/badge.tsx` |
| Error notice | `Alert` + `AlertTitle` + `AlertDescription` | `components/ui/alert.tsx` |
| Empty feedback | `EmptyState` (PackageOpen icon) | `components/ui/EmptyState.tsx` |
| Loading shimmer | `LoadingState` | `components/ui/LoadingState.tsx` |
| Tick box | `Checkbox` | `components/ui/checkbox.tsx` |
| Divider | `Separator` | `components/ui/separator.tsx` |

### Identified Patterns

- **Neon active state**: `border border-primary/30 bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]` — used in `SidebarNavItem`; reuse on selected slots and active CTA.
- **Selected ring**: `ring-2 ring-primary` — used on `ToolCard`; reuse for browser-mode selection.
- **Card shell**: dark `bg-card/50 backdrop-blur-sm border-border/50` — used in `SidebarModelStatus`; reuse for slot cards.
- **Model status glow**: `shadow-[0_0_6px_#10B981]` on the online dot — same technique for the "active" CTA glow.
- **Framer Motion**: `whileHover={{ scale: 1.02 }}` / `whileTap={{ scale: 0.98 }}` — used on `SidebarNavItem`; reuse on ToolCard, slot placeholders, modal cards.
- **Icon library**: Lucide React — `Scale`, `LayoutGrid`, `BookOpen`, `Info`, `Layers`, `ChevronRight`, `PackageOpen` already imported; add `Plus`, `X`, `Search`, `Loader2`, `CheckCircle2`, `Sparkles`.

---

## Mockups

---

### Mockup 1 — Full App Shell (reference skeleton)

**Context**: The persistent two-column shell that wraps all subsequent states.

```
╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║  BROWSER VIEWPORT  —  MainLayout  [components/layout/MainLayout.tsx]   (h-screen overflow-hidden) ║
╠══════════════════════╦═══════════════════════════════════════════════════════════════════════════╣
║  Sidebar [w-260px]   ║  MainContent [flex-1 overflow-y-auto]                                     ║
║  [components/layout/ ║  [components/layout/MainContent.tsx]                                      ║
║   Sidebar.tsx]       ║                                                                            ║
║                      ║  <main class="p-8">                                                       ║
║  ┌──────────────────┐║                                                                            ║
║  │ [⬡] AI ToolComp │║   ← ToolsPage content rendered here (Outlet)                              ║
║  │   are            │║                                                                            ║
║  └──────────────────┘║                                                                            ║
║   SidebarLogo        ║                                                                            ║
║  ────────────────────║                                                                            ║
║   Separator          ║                                                                            ║
║                      ║                                                                            ║
║  ┌──────────────────┐║                                                                            ║
║  │⚖  Compare  ●    │║   ← active: neon glow ring, bg-primary/10                                ║
║  └──────────────────┘║                                                                            ║
║  ┌──────────────────┐║                                                                            ║
║  │⊞  Catalog        │║                                                                            ║
║  └──────────────────┘║                                                                            ║
║  ┌──────────────────┐║                                                                            ║
║  │📖 My Comparisons │║                                                                            ║
║  └──────────────────┘║                                                                            ║
║  ┌──────────────────┐║                                                                            ║
║  │ℹ  About          │║                                                                            ║
║  └──────────────────┘║                                                                            ║
║   SidebarNav         ║                                                                            ║
║                      ║                                                                            ║
║  ╔══════════════════╗║                                                                            ║
║  ║ ● Ollama (Local) ║║   ← online dot: bg-green-500 shadow-[0_0_6px_#10B981]                   ║
║  ║ Model: mistral:… ║║                                                                            ║
║  ╚══════════════════╝║                                                                            ║
║   SidebarModelStatus ║                                                                            ║
╚══════════════════════╩═══════════════════════════════════════════════════════════════════════════╝

Legend:  ● = active nav item (neon glow)   ╔╗╚╝ = shadcn Card (dark bg)
         ⚖ ⊞ 📖 ℹ = Lucide icons (Scale, LayoutGrid, BookOpen, Info)
```

---

### Mockup 2 — Workspace: Empty State (0 tools selected)

**Context**: User arrives at `/` for the first time. No tools chosen yet. Five dashed placeholder slots.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  MainContent  <main p-8>                                                                         │
│  ToolsPage [routes/ToolsPage.tsx]  — FULLY REDESIGNED                                           │
│                                                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  ✦  Hero Block  (NEW — inline JSX)                                                        │  │
│  │                                                                                            │  │
│  │  Compare AI Developer Tools                               [+ Add Tool]  ← Button(default) │  │
│  │  Pick up to 5 tools and run a side-by-side AI analysis.               size="sm"           │  │
│  │                                                                        components/ui/      │  │
│  │                                                                        button.tsx          │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  Tool Selection Slots  (NEW — ToolSlotGrid component)                                     │  │
│  │  grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3                                     │  │
│  │                                                                                            │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐  │  │
│  │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │  │
│  │  ┆                         ┆  ┆                         ┆  ┆                         ┆  │  │
│  │  ┆          [+]            ┆  ┆          [+]            ┆  ┆          [+]            ┆  │  │
│  │  ┆        Add a tool       ┆  ┆        Add a tool       ┆  ┆        Add a tool       ┆  │  │
│  │  ┆       Slot 1 of 5       ┆  ┆       Slot 2 of 5       ┆  ┆       Slot 3 of 5       ┆  │  │
│  │  ┆                         ┆  ┆                         ┆  ┆                         ┆  │  │
│  │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │  │
│  │  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘  │  │
│  │      Empty Slot (×3)               onClick → openModal()          cursor-pointer          │  │
│  │                                                                                            │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐                                │  │
│  │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │                                │  │
│  │  ┆                         ┆  ┆                         ┆                                │  │
│  │  ┆          [+]            ┆  ┆          [+]            ┆                                │  │
│  │  ┆        Add a tool       ┆  ┆        Add a tool       ┆                                │  │
│  │  ┆       Slot 4 of 5       ┆  ┆       Slot 5 of 5       ┆                                │  │
│  │  ┆                         ┆  ┆                         ┆                                │  │
│  │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ │                                │  │
│  │  └─────────────────────────┘  └─────────────────────────┘                                │  │
│  │      Empty Slot (×2)                                                                      │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  Comparison CTA Block  (REDESIGNED — ComparisonPanel)                                     │  │
│  │  opacity-50  [DISABLED — < 2 tools]                                                       │  │
│  │                                                                                            │  │
│  │  ◎  Select at least 2 tools to start a comparison                                         │  │
│  │                                        [Start Comparing ↗]  ← Button disabled/dimmed      │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Annotations:
  [+]          = Lucide Plus icon (h-6 w-6 text-muted-foreground)
  ┄ ┆          = dashed border: border-2 border-dashed border-border/50
  Slot click   → sets isModalOpen=true in ToolsPage state
  [+ Add Tool] → same: sets isModalOpen=true
  Grid uses same gap-4 + responsive cols as existing ToolList
```

---

### Mockup 3 — Workspace: Partial State (3 of 5 slots filled)

**Context**: User has added 3 tools. 2 empty slots remain. CTA becomes active (≥ 2 tools).

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ToolsPage — Partial State (selectedIds.size === 3)                                              │
│                                                                                                  │
│  Compare AI Developer Tools                                        [+ Add Tool]                  │
│  Pick up to 5 tools and run a side-by-side AI analysis.                                          │
│                                                                                                  │
│  ╔══════════════════════════╗  ╔══════════════════════════╗  ╔══════════════════════════╗        │
│  ║  GitHub Copilot       [✕]║  ║  Cursor               [✕]║  ║  Claude Code          [✕]║        │
│  ║  ─────────────────────  ║  ║  ─────────────────────  ║  ║  ─────────────────────  ║        │
│  ║  [IDE Assistant]        ║  ║  [IDE Assistant]        ║  ║  [CLI Agent]            ║        │
│  ║  ─────────────────────  ║  ║  ─────────────────────  ║  ║  ─────────────────────  ║        │
│  ║  AI pair-programmer     ║  ║  AI-first code editor   ║  ║  Terminal-based coding  ║        │
│  ║  integrated into VS     ║  ║  built on VSCode…       ║  ║  agent from Anthropic…  ║        │
│  ║  Code…                  ║  ║                         ║  ║                         ║        │
│  ║  ─────────────────────  ║  ║  ─────────────────────  ║  ║  ─────────────────────  ║        │
│  ║  [copilot] [vscode]     ║  ║  [cursor] [editor]      ║  ║  [cli] [anthropic]      ║        │
│  ╚══════════════════════════╝  ╚══════════════════════════╝  ╚══════════════════════════╝        │
│   ToolCard mode="slot"          ring-2 ring-primary               [✕] = X (remove) button        │
│   whileHover scale:1.02         shadow neon glow                  onClick → removeTool(id)       │
│                                                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────┐                                      │
│  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄│  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄│                                      │
│  ┆          [+]             ┆  ┆          [+]             ┆                                      │
│  ┆        Add a tool        ┆  ┆        Add a tool        ┆                                      │
│  ┆       Slot 4 of 5        ┆  ┆       Slot 5 of 5        ┆                                      │
│  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄│  │ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄│                                      │
│  └──────────────────────────┘  └──────────────────────────┘                                      │
│                                                                                                  │
│  ╔═══════════════════════════════════════════════════════════════════════════════════════════╗   │
│  ║  Comparison CTA Block  —  ACTIVE  (selectedIds.size >= 2)                                 ║   │
│  ║  border-primary/30 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]               ║   │
│  ║                                                                                           ║   │
│  ║  ✦  3 tools selected  ·  Ready to compare                    [▶ Start Comparing]         ║   │
│  ║                                                               Button(default) size="lg"   ║   │
│  ╚═══════════════════════════════════════════════════════════════════════════════════════════╝   │
│   ComparisonPanel  [components/comparison/ComparisonPanel.tsx]                                   │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Annotations:
  ╔╗╚╝ filled cards = ToolCard mode="slot"  (ring-2 ring-primary on selected state)
  [✕]  = Button variant="ghost" size="icon"  top-right of card  onClick → removeTool(tool.id)
  Neon CTA box activates when selectedIds.size >= 2  (border-primary/30 + glow shadow)
  [▶ Start Comparing] → handleCompare()  disabled={selectedIds.size < 2 || comparing}
  Badge pills [IDE Assistant] [CLI Agent] = Badge component  variant="secondary" or colored
```

---

### Mockup 4 — Workspace: Full State (5 of 5 slots filled)

**Context**: All 5 slots filled. "Add Tool" button is disabled. Neon CTA at full intensity.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ToolsPage — Full State (selectedIds.size === 5)                                                 │
│                                                                                                  │
│  Compare AI Developer Tools                          [+ Add Tool]  ← disabled opacity-40        │
│  Pick up to 5 tools and run a side-by-side AI analysis.                                          │
│                                                                                                  │
│  ╔══════════════════════════╗  ╔══════════════════════════╗  ╔══════════════════════════╗        │
│  ║  GitHub Copilot       [✕]║  ║  Cursor               [✕]║  ║  Claude Code          [✕]║        │
│  ║  [IDE Assistant]        ║  ║  [IDE Assistant]        ║  ║  [CLI Agent]            ║        │
│  ║  AI pair-programmer…    ║  ║  AI-first code editor…  ║  ║  Terminal-based agent…  ║        │
│  ║  [copilot] [vscode]     ║  ║  [cursor] [editor]      ║  ║  [cli] [anthropic]      ║        │
│  ╚══════════════════════════╝  ╚══════════════════════════╝  ╚══════════════════════════╝        │
│                                                                                                  │
│  ╔══════════════════════════╗  ╔══════════════════════════╗                                      │
│  ║  Windsurf             [✕]║  ║  Codeium              [✕]║                                      │
│  ║  [IDE Assistant]        ║  ║  [Code Completion]      ║                                      │
│  ║  Agentic IDE by        ║  ║  Free AI coding toolkit ║                                      │
│  ║  Codeium…               ║  ║  for all editors…       ║                                      │
│  ║  [agentic] [ide]        ║  ║  [free] [completion]    ║                                      │
│  ╚══════════════════════════╝  ╚══════════════════════════╝                                      │
│                                                                                                  │
│  ╔═══════════════════════════════════════════════════════════════════════════════════════════╗   │
│  ║  ✦  5 tools selected  ·  Maximum reached                     [▶ Start Comparing]         ║   │
│  ║  Slots full — remove a tool to add another                                                ║   │
│  ╚═══════════════════════════════════════════════════════════════════════════════════════════╝   │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Annotations:
  [+ Add Tool] button → disabled={selectedIds.size >= 5}  (pointer-events-none opacity-40)
  No empty slots rendered — grid shows exactly 5 filled ToolCards
  CTA block stays fully active (neon glow at max intensity)
  Helper hint text: "Slots full — remove a tool to add another" (text-muted-foreground text-xs)
```

---

### Mockup 5 — Tool Slot: All States Side-by-Side

**Context**: Detail view of all possible slot states for implementors.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  SLOT STATES  — ToolSlotGrid internals                                                           │
│                                                                                                  │
│  ① EMPTY                   ② EMPTY HOVER             ③ SKELETON (loading)                       │
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐  ┌─────────────────────┐                  │
│  │                       │  │                       │  │ ░░░░░░░░░░░░░░░░░  │                  │
│  ┆         [+]           ┆  ┆         [+]           ┆  │ ░░░░░░░░░░░░░      │                  │
│  ┆       Add a tool      ┆  ┆  ╔═══════════════╗   ┆  │                     │                  │
│  ┆      text-xs          ┆  ┆  ║ Click to open ║   ┆  │ ░░░░░░░░░░░░░░░░░  │                  │
│  ┆      muted-foreground ┆  ┆  ║   Add Tool    ║   ┆  │ ░░░░░░░             │                  │
│  │                       │  ┆  ║    Modal      ║   ┆  │                     │                  │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘  └─────────────────────┘                  │
│  border-dashed border-2     tooltip / hover ring         shadcn Skeleton shimmer                │
│  border-border/50           border-primary/50            animate-pulse                          │
│  cursor-pointer             bg-primary/5 glow             bg-muted/50 rounded-md                │
│                             scale: 1.02 (Framer)                                                 │
│                                                                                                  │
│  ④ FILLED (slot mode)                                                                            │
│  ╔══════════════════════╗                                                                        │
│  ║  GitHub Copilot   [✕]║   ← [✕] Button variant="ghost" size="icon"  absolute top-2 right-2  │
│  ║ ─────────────────── ║       onClick → removeTool(tool.id)                                   │
│  ║ [IDE Assistant]     ║       Lucide X icon  h-4 w-4                                          │
│  ║ ─────────────────── ║                                                                        │
│  ║  AI pair-programmer ║   ← CardDescription  line-clamp-2  text-sm                           │
│  ║  integrated into VS ║     text-muted-foreground                                              │
│  ║  Code with tab…     ║                                                                        │
│  ║ ─────────────────── ║                                                                        │
│  ║  [copilot] [vscode] ║   ← Tag spans  bg-secondary rounded-full px-2 py-0.5 text-xs         │
│  ╚══════════════════════╝                                                                        │
│  ring-2 ring-primary          neon: shadow-[0_0_12px_hsl(var(--primary)/0.15)]                 │
│  ToolCard mode="slot"         whileHover scale:1.02  bg-card/50 backdrop-blur-sm               │
│                                                                                                  │
│  ⑤ FILLED HOVER                                                                                  │
│  ╔══════════════════════╗                                                                        │
│  ║  GitHub Copilot  ╔✕╗ ║   ← X button appears/intensifies on hover                            │
│  ║ [IDE Assistant]  ╚═╝ ║     Button bg transitions to destructive/10                           │
│  ║  AI pair-programmer… ║     shadow-[0_0_20px_hsl(var(--primary)/0.25)]  (enhanced glow)      │
│  ║  [copilot] [vscode]  ║     scale: 1.02 via Framer Motion whileHover                         │
│  ╚══════════════════════╝                                                                        │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Component Map:
  ToolCard [components/tools/ToolCard.tsx] — add `mode: 'slot' | 'browser'` prop
  Slot mode:   shows X button (absolute top-2 right-2)  |  no checkbox
  Browser mode: shows selection ring + checkbox          |  no X button
  Skeleton:    shadcn Skeleton  (new install: npx shadcn@latest add skeleton)
```

---

### Mockup 6 — Add Tool Modal: Default State

**Context**: User clicks empty slot or "Add Tool" button. Full-screen dialog overlays workspace.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  FULL SCREEN OVERLAY  (Radix Dialog via shadcn)                                                  │
│  AddToolModal  [components/tools/AddToolModal.tsx]  — NEW FILE                                  │
│  DialogContent  max-w-3xl  max-h-[80vh]  flex flex-col                                          │
│                                                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  ╔═════════════════════════════════════════════════════════════════════════════════════╗  │  │
│  │  ║  DIALOG HEADER  [DialogHeader]                                                      ║  │  │
│  │  ║                                                                                     ║  │  │
│  │  ║  Add a Tool                                                              [✕ Close]  ║  │  │
│  │  ║  Browse the catalog and select a tool to compare                                   ║  │  │
│  │  ╚═════════════════════════════════════════════════════════════════════════════════════╝  │  │
│  │                                                                                           │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │  │
│  │  │ 🔍 Search tools...                                                                   │ │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────┘ │  │
│  │  shadcn Input  [components/ui/input.tsx]  — NEW INSTALL                                  │  │
│  │  value={query}  onChange → setQuery()  aria-label="Search tools"                         │  │
│  │                                                                                           │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │  │
│  │  │ Category filters:                                                                    │ │  │
│  │  │ [All ✓]  [IDE Assistant]  [CLI Agent]  [Code Completion]  [Review]  [Documentation] │ │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────┘ │  │
│  │  Badge  variant="default" (active) / variant="outline" (inactive)                         │  │
│  │  onClick → setActiveCategory(cat)   flex-wrap gap-2                                       │  │
│  │                                                                                           │  │
│  │  Separator                                                                                │  │
│  │  ─────────────────────────────────────────────────────────────────────────────────────── │  │
│  │                                                                                           │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────┐ │  │
│  │  │  TOOL GRID  (overflow-y-auto flex-1)                                                 │ │  │
│  │  │  grid grid-cols-1 gap-3 md:grid-cols-2                                              │ │  │
│  │  │                                                                                      │ │  │
│  │  │  ┌───────────────────────────┐  ┌───────────────────────────┐                      │ │  │
│  │  │  │  GitHub Copilot           │  │  Cursor                   │                      │ │  │
│  │  │  │  [IDE Assistant]          │  │  [IDE Assistant]          │                      │ │  │
│  │  │  │  AI pair-programmer…      │  │  AI-first code editor…    │                      │ │  │
│  │  │  │  [copilot] [vscode] [ai]  │  │  [cursor] [editor]        │                      │ │  │
│  │  │  └───────────────────────────┘  └───────────────────────────┘                      │ │  │
│  │  │   ToolCard mode="browser"        cursor-pointer hover:ring-1                        │ │  │
│  │  │                                                                                      │ │  │
│  │  │  ┌───────────────────────────┐  ┌───────────────────────────┐                      │ │  │
│  │  │  │  Windsurf                 │  │  Codeium                  │                      │ │  │
│  │  │  │  [IDE Assistant]          │  │  [Code Completion]        │                      │ │  │
│  │  │  │  Agentic IDE by…          │  │  Free AI coding toolkit…  │                      │ │  │
│  │  │  │  [agentic] [ide]          │  │  [free] [completion]      │                      │ │  │
│  │  │  └───────────────────────────┘  └───────────────────────────┘                      │ │  │
│  │  │                                                                                      │ │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                                           │  │
│  │  Separator                                                                                │  │
│  │  ─────────────────────────────────────────────────────────────────────────────────────── │  │
│  │                                                                                           │  │
│  │  DIALOG FOOTER  [DialogFooter]                                                            │  │
│  │  Showing 12 tools                              [Cancel]  [Add Selected (1)]              │  │
│  │  text-xs text-muted-foreground                  ghost     default  disabled if 0         │  │
│  │                                                                                           │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Component Map:
  Dialog, DialogContent, DialogHeader, DialogFooter = shadcn Dialog (new install)
  Input        = shadcn Input (new install)
  Badge        = components/ui/badge.tsx  (reuse — add onClick + cursor-pointer)
  ToolCard     = components/tools/ToolCard.tsx  mode="browser"
  Separator    = components/ui/separator.tsx  (reuse)
  Button       = components/ui/button.tsx  variant="ghost" + variant="default"

State in AddToolModal:
  query: string          → fuzzy filter on tool.name + tool.description + tool.tags
  activeCategory: string → "All" or specific category string
  pendingIds: Set<string> → tools staged for add (multi-select; reset to empty Set on modal open)
```

---

### Mockup 7 — Add Tool Modal: Selected State

**Context**: User clicks a tool in the browser grid. It gets a selection ring; footer count updates.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  AddToolModal — Tool Selected (browser mode selection)                                           │
│                                                                                                  │
│  ...  [same header + search + category filters as Mockup 6]  ...                                │
│                                                                                                  │
│  │  ┌───────────────────────────┐  ┌───────────────────────────┐                      │          │
│  │  │  GitHub Copilot           │  │  ╔═════════════════════╗  │                      │          │
│  │  │  [IDE Assistant]          │  │  ║  Cursor          ✓  ║  │  ← SELECTED          │          │
│  │  │  AI pair-programmer…      │  │  ║  [IDE Assistant]    ║  │    ring-2 ring-primary│          │
│  │  │  [copilot] [vscode]       │  │  ║  AI-first editor…   ║  │    bg-primary/5      │          │
│  │  └───────────────────────────┘  │  ║  [cursor] [editor]  ║  │                      │          │
│  │                                  │  ╚═════════════════════╝  │                      │          │
│  │                                  └───────────────────────────┘                      │          │
│  │   Unselected: plain Card            Selected: ring-2 ring-primary + ✓ checkmark     │          │
│  │                                     Lucide CheckCircle2 absolute top-2 right-2      │          │
│                                                                                                  │
│  FOOTER:                                                                                         │
│  Showing 12 tools                              [Cancel]  [Add Selected (1)] ←active             │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Interaction Flow:
  1. User clicks unselected ToolCard (browser mode)  → pendingIds.add(tool.id)
  2. Card shows ring-2 ring-primary + CheckCircle2 icon
  3. Footer: "Add Selected (N)" button becomes active (N = pendingIds.size)
  4. User may click more cards to stage multiple tools
  5. User clicks "Add Selected (N)" → onAddTools([...pendingIds]) callback
  6. Modal closes  → selectedIds gains new ids  → slots fill with ToolCard(slot mode)

Note: Multiple tools can be staged per modal open (multi-select add flow).
      Already-selected tools are shown as disabled/dimmed in browser grid (not hidden).
      Clicking a pending card again deselects it (pendingIds.delete(tool.id)).
```

---

### Mockup 8 — Add Tool Modal: Search Active + Empty Results

**Context**: User types a query that matches nothing (or all results filtered by category).

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  AddToolModal — Empty Search Results                                                             │
│                                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │ 🔍 supercalifragilistic█                                                                 │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                                  │
│  [All]  [IDE Assistant]  [CLI Agent]  [Code Completion]  [Review]  [Documentation]              │
│  ─────────────────────────────────────────────────────────────────────────────────────────────  │
│                                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                                                                                          │    │
│  │                          📦                                                              │    │
│  │                   No tools found                                                         │    │
│  │           Try a different search term or category.                                       │    │
│  │                                                                                          │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│   EmptyState component  [components/ui/EmptyState.tsx]  (reuse existing)                        │
│   title="No tools found"  description="Try a different search term or category."                │
│                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────────────  │
│  Showing 0 tools                                [Cancel]  [Add Selected]  ← still disabled      │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Notes:
  Reuses existing EmptyState (PackageOpen icon, title + description props)
  No new component needed — EmptyState is already flexible
  "Add Selected" stays disabled (no pendingIds) during empty search
```

---

### Mockup 9 — Comparison CTA Block: All States

**Context**: The `ComparisonPanel` block below the slot grid — three distinct states.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ComparisonPanel  [components/comparison/ComparisonPanel.tsx]  — REDESIGNED                     │
│  Full-width below ToolSlotGrid  •  Components: Button, Alert, Separator, Lucide icons           │
│                                                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  STATE A — DISABLED  (selectedIds.size < 2)                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  opacity-50  border border-border/30  bg-secondary/20  rounded-xl  p-5                   │  │
│  │                                                                                            │  │
│  │  ◎  Select at least 2 tools to start a comparison              [Start Comparing ↗]        │  │
│  │     text-muted-foreground text-sm                               Button disabled           │  │
│  │                                                                 opacity-40                │  │
│  └───────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  STATE B — ACTIVE  (selectedIds.size >= 2, not comparing)                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                                                  │
│  ╔═══════════════════════════════════════════════════════════════════════════════════════════╗   │
│  ║  border border-primary/30  bg-primary/10  rounded-xl  p-5                                ║   │
│  ║  shadow-[0_0_20px_hsl(var(--primary)/0.2)]                                               ║   │
│  ║                                                                                           ║   │
│  ║  ✦  3 tools selected · Ready for AI analysis            [▶ Start Comparing]              ║   │
│  ║     Lucide Sparkles icon  text-primary text-sm          Button(default) size="lg"        ║   │
│  ║                                                          onClick → handleCompare()        ║   │
│  ╚═══════════════════════════════════════════════════════════════════════════════════════════╝   │
│                                                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  STATE C — IN PROGRESS  (comparing === true)                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                                                  │
│  ╔═══════════════════════════════════════════════════════════════════════════════════════════╗   │
│  ║  border border-primary/30  bg-primary/10  rounded-xl  p-5  (pulsing glow)                ║   │
│  ║                                                                                           ║   │
│  ║  ⟳  Comparing tools…                                      [● Running…]  ← disabled       ║   │
│  ║     Lucide Loader2 animate-spin                            Button(default) loading        ║   │
│  ║                                                                                           ║   │
│  ║  ────────────────────────────────────────────────────────────────────────────────────    ║   │
│  ║                                                                                           ║   │
│  ║  Stages (inline progress — 3 steps):                                                     ║   │
│  ║                                                                                           ║   │
│  ║  ● Gathering metadata       ○ Comparing features       ○ Generating summary              ║   │
│  ║  ──────────────────────                                                                   ║   │
│  ║  Progress bar:  [████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░]  stage 1 of 3           ║   │
│  ║                  bg-primary h-1 rounded-full transition-all                               ║   │
│  ║                  w-[33%] → w-[66%] → w-[100%]  driven by stage state                    ║   │
│  ║                                                                                           ║   │
│  ║  Stage 2 active example:                                                                  ║   │
│  ║  ✓ Gathering metadata       ● Comparing features       ○ Generating summary              ║   │
│  ║                              ──────────────────────                                       ║   │
│  ║  [████████████████████████████████░░░░░░░░░░░░░░░░░░]  stage 2 of 3                     ║   │
│  ║                                                                                           ║   │
│  ╚═══════════════════════════════════════════════════════════════════════════════════════════╝   │
│                                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Stage State Machine:
  null         → not comparing     (STATE A or B)
  'gathering'  → stage 1 active    (progress 33%)
  'comparing'  → stage 2 active    (progress 66%)
  'generating' → stage 3 active    (progress 90%)
  → on success: navigate('/compare', { state: { result } })
  → on error:   Alert variant="destructive" shown above CTA block

Stage Icons:
  ○ = pending circle    (text-muted-foreground)
  ● = active circle     (text-primary animate-pulse)
  ✓ = CheckCircle2      (text-green-500)
  ⟳ = Loader2           (animate-spin text-primary)

Implementation Note:
  ComparisonPanel tracks `stage: null | 'gathering' | 'comparing' | 'generating'`
  Progress width is a CSS transition (transition-all duration-500 ease-out)
  Stages are simulated with setTimeout OR driven by API streaming hooks
```

---

### Mockup 10 — Complete Interaction Flow

**Context**: End-to-end user journey from first visit to comparison launch.

```
  ┌─────────────────────┐
  │  Visit "/"           │
  │  ToolsPage loads     │
  │  0 slots filled      │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐        ┌────────────────────────────────────────┐
  │  Click empty slot   │───────▶│  AddToolModal opens (isModalOpen=true) │
  │    OR               │        │  Full tool list shown (query="")       │
  │  Click "+ Add Tool" │        │  Category = "All"                      │
  └─────────────────────┘        └───────────────────┬────────────────────┘
                                                      │
                                    ┌─────────────────▼──────────────────┐
                                    │  User types query OR picks category │
                                    │  Tool grid filters reactively       │
                                    └─────────────────┬──────────────────┘
                                                      │
                                    ┌─────────────────▼──────────────────┐
                                    │  User clicks a tool card            │
                                    │  pendingIds.add(tool.id)            │
                                    │  ring-2 ring-primary appears        │
                                    └─────────────────┬──────────────────┘
                                                      │
                          ┌───────────────────────────▼──────────────────┐
                          │  User clicks "Add Selected (N)"               │
                          │  onAddTools([...pendingIds]) called           │
                          │  Modal closes (isModalOpen=false)             │
                          │  selectedIds gains new tools                  │
                          └───────────────────────────┬──────────────────┘
                                                      │
             ┌────────────────────────────────────────▼─────────────────────────┐
             │  Slot fills: AnimatePresence exit+enter  ToolCard mode="slot"     │
             │  selectedIds.size >= 2 → CTA block activates (neon glow)          │
             │  selectedIds.size >= 5 → "+ Add Tool" disables, no empty slots    │
             └────────────────────────────────────────┬─────────────────────────┘
                                                      │
                                    ┌─────────────────▼──────────────────┐
                                    │  User clicks "▶ Start Comparing"   │
                                    │  comparing = true                   │
                                    │  Stage: null → 'gathering' → …     │
                                    └─────────────────┬──────────────────┘
                                                      │
                          ┌───────────────────────────▼──────────────────┐
                          │  api.comparison.compare({toolIds:[…]})        │
                          │  Success → navigate('/compare', {state:result})│
                          │  Error   → Alert variant="destructive"        │
                          └──────────────────────────────────────────────┘
```

---

## Reusable Components

### Layout
| Component | Path | Usage |
|---|---|---|
| `MainLayout` | `components/layout/MainLayout.tsx` | Shell — unchanged |
| `Sidebar` | `components/layout/Sidebar.tsx` | Left rail — unchanged |
| `MainContent` | `components/layout/MainContent.tsx` | `p-8` scrollable body — unchanged |

### Existing UI Components (reuse as-is)
| Component | Path | Usage in Workspace |
|---|---|---|
| `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription` | `components/ui/card.tsx` | ToolCard shell (slot + browser modes); CTA block background |
| `Button` | `components/ui/button.tsx` | "+ Add Tool" (default sm), "Start Comparing" (default lg), "Cancel" (ghost), "[✕] Remove" (ghost icon) |
| `Badge` | `components/ui/badge.tsx` | Category pill on ToolCard; category filter pills in modal (add `onClick` + `cursor-pointer`) |
| `Alert`, `AlertTitle`, `AlertDescription` | `components/ui/alert.tsx` | Error feedback (variant="destructive") above CTA block |
| `EmptyState` | `components/ui/EmptyState.tsx` | Empty search results in modal (`title`, `description` props) |
| `LoadingState` | `components/ui/LoadingState.tsx` | Initial page load while `api.tools.list()` resolves |
| `Separator` | `components/ui/separator.tsx` | Divider between search/filters and tool grid in modal |

### Modified Components
| Component | Path | Change |
|---|---|---|
| `ToolCard` | `components/tools/ToolCard.tsx` | Add `mode: 'slot' \| 'browser'` prop; slot → X remove button (no checkbox); browser → selection ring + CheckCircle2; add Framer Motion `whileHover`/`whileTap` |
| `ComparisonPanel` | `components/comparison/ComparisonPanel.tsx` | Full redesign: neon CTA; 3-stage progress bar; disabled/active/in-progress states |

### New Components
| Component | Path | Description |
|---|---|---|
| `ToolSlotGrid` | `components/tools/ToolSlotGrid.tsx` | Grid of 5 slots: empty placeholders + filled ToolCards + skeleton states; `AnimatePresence` for add/remove animation |
| `AddToolModal` | `components/tools/AddToolModal.tsx` | shadcn Dialog wrapper; contains search Input, category Badge filters, scrollable ToolCard grid (browser mode), DialogFooter |

### New shadcn Installs Required
```bash
npx shadcn@latest add dialog   # AddToolModal overlay
npx shadcn@latest add input    # Search field in modal
npx shadcn@latest add skeleton # Loading shimmer in slots
```

### New Lucide Icons (add to imports)
| Icon | Usage |
|---|---|
| `Plus` | [+] icon in empty slot placeholder |
| `X` | Remove button on slot-mode ToolCard |
| `Search` | 🔍 prefix in search Input |
| `Loader2` | Spinning indicator during comparison |
| `CheckCircle2` | ✓ on selected browser-mode card + completed stage |
| `Sparkles` | ✦ icon in active CTA block |

---

## Implementation Notes

### Consistency Checklist
- ✅ Slot cards use same `ring-2 ring-primary` already on `ToolCard` (reuse existing class)
- ✅ Neon glow on CTA matches `SidebarNavItem` active state pattern (`shadow-[0_0_12px_hsl(var(--primary)/0.15)]`)
- ✅ Online dot glow (`shadow-[0_0_6px_#10B981]`) pattern adapted for CTA block shadow
- ✅ Modal category filter pills use existing `Badge` component — no new component needed
- ✅ Empty slot feedback uses existing `EmptyState` — no new component needed
- ✅ `Framer Motion` already installed — `whileHover`/`whileTap` patterns from `SidebarNavItem` reused on cards and slots
- ✅ All button variants (`default`, `ghost`, `outline`) already defined in `button.tsx`
- ✅ `AnimatePresence` stagger pattern from `ToolList` reused in `ToolSlotGrid`

### Accessibility Considerations
- Empty slot: `aria-label="Add a tool to slot ${n} of 5"` on the clickable div
- Modal: `DialogTitle` for screen reader heading + `DialogDescription` for context
- Search input: `aria-label="Search tools"` + `aria-controls="tool-grid"` 
- Remove button: `aria-label={`Remove ${tool.name} from comparison`}` on [✕]
- Progress bar: `role="progressbar"` + `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Category pills: `role="radio"` + `aria-checked` in a `role="radiogroup"` group
- Keyboard: Slots and modal cards focusable via Tab; Enter/Space triggers selection

### Responsive Behavior
| Breakpoint | Slot Grid | Modal Grid | Sidebar |
|---|---|---|---|
| Mobile (< md) | `grid-cols-1` — 1 column | `grid-cols-1` — 1 column | Hidden or collapsed |
| Tablet (md) | `grid-cols-2` — 2 columns | `grid-cols-2` — 2 columns | Visible |
| Desktop (lg+) | `grid-cols-3` — 3 columns (row 1: 3, row 2: 2) | `grid-cols-2` — 2 columns | `w-[260px]` fixed |

### Animation Patterns
```
Slot add (AnimatePresence):
  initial: { opacity: 0, scale: 0.9 }
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }

Card hover (Framer Motion — same as SidebarNavItem):
  whileHover: { scale: 1.02 }
  whileTap:   { scale: 0.98 }

Progress bar (CSS only):
  transition-all duration-500 ease-out
  w-[33%] → w-[66%] → w-[100%]
```

---

## Alternatives Considered

### Option A: Persistent Tool List on Page (Rejected)
Keep `ToolList` visible on the main page alongside the 5 slots.  
**Why rejected**: Clutters the workspace; user must scroll to see CTA; violates the "workspace-first" spec decision. Modal-only browsing keeps the workspace clean.

### Option B: Slot Overflow Scrolls Horizontally (Rejected)
Display all 5 slots in a single horizontal scrollable row.  
**Why rejected**: Scroll-jacking is unexpected; slots 4-5 would be hidden by default. Grid layout ensures all slots are visible at a glance.

### Option C: Inline CTA Progress as Toast/Overlay (Rejected)
Show progress in a toast notification instead of inline CTA.  
**Why rejected**: Toast disappears and loses context; users want to watch progress in place. Inline stages in the CTA block are self-contained and dismissal-free.

### Option D: Multi-Select in Modal (Rejected)
Allow selecting multiple tools in one modal session.  
**Why rejected**: Increases modal complexity and ambiguity about slot mapping. Single-add-per-open keeps the flow simple and predictable; the spec decision is already locked.

### Option E: ToolCard as Dedicated SlotCard (Rejected)
Create a separate `SlotCard` component for the workspace.  
**Why selected instead**: `mode='slot' | 'browser'` prop on the existing `ToolCard` is sufficient. Single component, shared internals, less duplication, consistent Card shell.

---

*Generated by ui-mockup-generator — 2026-05-24*
