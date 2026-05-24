# AI ToolCompare — Detailed UI Reconstruction Specification

## Overview

This UI represents a modern dark-themed desktop web application for comparing AI developer tools. The visual language combines:

- Dark navy/black backgrounds
- Purple and electric blue accent gradients
- Glassmorphism-inspired panels
- Soft glow effects
- Rounded corners
- Minimalist typography
- High spacing consistency
- Premium SaaS aesthetic

The screen resolution shown in the screenshot appears to be approximately **1536 × 1024**.

---

# 1. Global Layout

The application is divided into two major regions:

1. **Left Sidebar Navigation**
2. **Main Content Area**

The layout uses a horizontal flex structure.

---

# 2. Application Background

## Base Background

The entire app uses a nearly black navy gradient:

- Primary tones:
  - `#020617`
  - `#030712`
  - `#050816`
  - `#081120`

There is a subtle radial glow in the center-right area.

## Decorative Effects

The background includes:

- Very subtle noise/grain texture
- Soft blue/purple bloom lighting
- Thin glowing borders around cards
- Faint radial highlights behind main sections

No strong patterns are visible.

---

# 3. Sidebar (Left Navigation Panel)

## Sidebar Dimensions

Approximate width:
- `250px–280px`

Height:
- Full viewport height

Padding:
- Around `24px`

The sidebar background is slightly lighter than the main background:
- Deep navy/black

There is a subtle vertical separation from the content area.

---

# 4. Logo Section

Located at the top-left.

## Icon

A small geometric logo:
- Purple gradient
- Looks like:
  - abstract brackets
  - chain link
  - stylized code icon

Glow effect:
- Soft purple neon glow

## App Name

Text:
`AI ToolCompare`

Typography:
- White
- Semi-bold
- Modern sans-serif

Position:
- Horizontally aligned with logo icon

---

# 5. Sidebar Navigation Menu

Vertical stack of navigation items.

Each item contains:
- Left icon
- Label text

Spacing between items:
- About `12–18px`

---

## Active Navigation Item — "Compare"

### Appearance

This item is highlighted.

Container:
- Rounded rectangle
- Dark indigo background
- Subtle purple glow
- Border with low-opacity purple

Approximate height:
- `56px`

### Icon

Scales/balance icon.

Color:
- Purple

### Text

`Compare`

Color:
- Light purple/white

---

## Inactive Items

### Catalog
### My Comparisons
### About

Each includes:
- Muted gray icon
- Muted gray text

Hover state is implied but not visible.

---

# 6. Bottom Sidebar Status Card

Located at bottom-left.

## Container

Rounded card with:
- Dark background
- Thin border
- Slight glow

Approximate dimensions:
- Width: almost full sidebar width
- Height: around `90px`

---

## Status Indicator

Small green circle:
- Indicates active status

---

## Text Content

### Main label
`Ollama (Local)`

Color:
- White

### Subtext
`Model: mistral:latest`

Color:
- Gray

---

## Arrow Icon

Right-facing chevron on the far right.

Color:
- Gray/light blue

---

# 7. Main Content Container

The main content area is centered and surrounded by large margins.

Container characteristics:

- Large rounded corners (`24px–32px`)
- Dark translucent background
- Very subtle border
- Blue/purple glow around edges

Padding:
- Generous (`32px–48px`)

---

# 8. Top Right Theme Toggle

Located in the upper-right corner of the main container.

## Appearance

Circular button:
- Dark background
- Thin border
- Small glow

Contains:
- Sun icon

Color:
- Gray/light blue

---

# 9. Main Header Section

Centered horizontally.

---

## Header Icon

Sparkles/star icon.

Color:
- Purple gradient

Placed left of the title.

---

## Main Title

Text:
`Compare AI Developer Tools`

Typography:
- Large
- Bold
- White

Approximate size:
- `48px–56px`

---

## Subtitle

Text:

`Select tools to compare and get an AI-powered analysis based on real-world capabilities, features, and developer experience.`

Characteristics:
- Center aligned
- Gray text
- Multi-line
- Medium width

---

# 10. Selected Tools Section

Main comparison selection area.

---

## Section Label

Text:
`Selected tools (2/5)`

Typography:
- White
- Medium-bold

---

# 11. Tool Cards Layout

A horizontal row of cards.

There are:

- 2 populated cards
- 3 empty placeholder cards

Gap between cards:
- Around `20px`

---

# 12. Tool Card — Cursor

## Card Container

Appearance:
- Dark card
- Rounded corners
- Subtle border
- Inner glow

Approximate dimensions:
- Width: `240px`
- Height: `320px`

---

## Close Button

Top-right corner.

Circular dark button with:
- Gray X icon

---

## Tool Icon

Large square icon.

Visual:
- Purple/blue 3D cube-like symbol

---

## Tool Name

`Cursor`

Typography:
- White
- Large
- Semi-bold

---

## Category Pill

Text:
`AI IDE`

Appearance:
- Purple pill badge
- Rounded
- Small
- Semi-transparent

---

## Description

Text:

`AI-first code editor with built-in chat and intelligent code generation.`

Gray text
Small font
Multi-line

---

# 13. Tool Card — Bolt.new

Same layout as Cursor card.

---

## Icon

Green gradient square with black lightning symbol.

---

## Tool Name

`Bolt.new`

White text.

---

## Category Pill

`Web Dev`

Green pill badge.

---

## Description

`AI-powered web development agent that builds and deploys full-stack apps.`

---

# 14. Empty Placeholder Tool Cards

There are three empty comparison slots.

## Appearance

Each card includes:

- Dashed border
- Rounded corners
- Dark transparent background

Center contains:

- Circular outlined button
- Plus icon

Below:
`Add a tool`

Muted gray text.

---

# 15. Add Tool Button (Top Right of Tool Section)

Positioned above/right of tool cards row.

## Appearance

Rounded rectangle button.

Border:
- Dashed purple border

Background:
- Transparent/dark

Contains:
- Plus icon
- Text: `Add Tool`

Text color:
- Purple

---

# 16. Bottom Comparison CTA Panel

Large horizontal panel below the tool cards.

This panel is visually emphasized with a purple-blue radial glow.

Rounded corners:
- Very large (`24px+`)

Padding:
- Large

---

# 17. Lightning Icon

Centered near top of CTA panel.

Purple lightning symbol.

---

# 18. CTA Title

Text:
`Ready to compare?`

Typography:
- White
- Large
- Bold

---

# 19. CTA Description

Text:

`Our local LLM will analyze the selected tools and provide a structured comparison.`

Gray text.
Centered.

---

# 20. Primary Action Button

Centered horizontally.

## Button Text

`Start Comparing`

---

## Button Appearance

Large pill-shaped button.

Gradient:
- Purple → electric blue

Strong glow:
- Blue/purple outer bloom

White text.

Contains:
- Small sparkles icon on left

Approximate dimensions:
- Width: `350px`
- Height: `64px`

---

# 21. Footer Text Inside CTA Panel

Below the button.

Text:
`Private & Local • Powered by Ollama`

Includes:
- Small lock icon

Typography:
- Small gray text

---

# 22. Typography

The UI appears to use a modern sans-serif font similar to:

- Inter
- Geist
- SF Pro
- Manrope

Characteristics:
- Clean
- Rounded
- Slightly condensed
- Medium tracking

---

# 23. Visual Style Notes

## Corners

Everything uses rounded corners:
- Cards: `18px–24px`
- Buttons: `16px–999px`
- Containers: `24px–32px`

---

## Shadows and Glow

The UI heavily relies on:
- Soft shadows
- Low-opacity neon glows
- Purple/blue bloom lighting

No hard shadows.

---

## Border Treatments

Borders are:
- Thin
- Semi-transparent
- Often purple-tinted

Placeholder cards use dashed borders.

---

## Interaction Design Language

The UI implies:
- Hover glows
- Smooth transitions
- Scale animations
- Neon emphasis on active elements

---

# 24. Approximate Color Palette

## Backgrounds

- `#020617`
- `#030712`
- `#081120`

## Purple Accent

- `#8B5CF6`
- `#7C3AED`
- `#A855F7`

## Blue Accent

- `#3B82F6`
- `#2563EB`

## Green Accent

- `#10B981`

## Text

Primary:
- `#FFFFFF`

Secondary:
- `#9CA3AF`

Muted:
- `#6B7280`

---

# 25. UI Reconstruction Guidance

To accurately reproduce this interface:

## Recommended Stack

- React
- Tailwind CSS
- Framer Motion

---

## Important Styling Details

### Use:
- backdrop blur
- radial gradients
- low-opacity borders
- dark translucent layers
- layered glow effects

### Avoid:
- bright flat colors
- sharp edges
- heavy shadows
- skeuomorphic styling

---

# 26. Component Hierarchy

```text
App
├── Sidebar
│   ├── Logo
│   ├── Navigation
│   └── Model Status Card
│
└── MainContainer
    ├── Theme Toggle
    ├── Header
    ├── Selected Tools Section
    │   ├── Tool Cards
    │   ├── Empty Slots
    │   └── Add Tool Button
    │
    └── Comparison CTA Panel
        ├── Icon
        ├── Heading
        ├── Description
        ├── CTA Button
        └── Footer Meta
```

---

# 27. Spacing System

Approximate spacing scale:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px

Large whitespace is intentionally used to create a premium aesthetic.

---

# 28. Responsive Behavior (Inferred)

The screenshot represents a desktop layout.

Expected responsive behavior:
- Sidebar collapses on tablet/mobile
- Tool cards stack vertically on smaller screens
- CTA remains centered
- Grid becomes scrollable horizontally if needed

---

# 29. Emotional / Brand Tone

The interface communicates:

- Premium AI tooling
- Developer-centric workflows
- Local/private AI execution
- Futuristic productivity
- Technical sophistication
- Calm/dark coding environment

The overall visual identity resembles modern AI/devtool products such as:
- Linear
- Vercel
- Raycast
- Warp
- Cursor
- Perplexity dark mode
