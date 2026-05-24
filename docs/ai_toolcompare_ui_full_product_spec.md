# AI ToolCompare — Extended Product & UI Specification


# 30. Main Page Functional Architecture

The homepage is not only a static comparison screen — it functions as the core workflow hub of the application.

The UX is designed around a simple multi-step process:

1. Discover tools
2. Select tools
3. Configure comparison
4. Run AI analysis
5. Review generated comparison
6. Save/export/share results

The current screen shown in the screenshot represents the "Tool Selection" stage.

---

# 31. Homepage Functional Blocks

The homepage is composed of several logical UI and functional sections.

## Structure Overview

```text
Homepage
├── Sidebar Navigation
│
└── Main Workspace
    ├── Theme Controls
    ├── Hero / Introduction Block
    ├── Tool Selection Workspace
    │   ├── Selected Tools Header
    │   ├── Tool Slots Grid
    │   ├── Add Tool Actions
    │   └── Tool Management
    │
    └── Comparison CTA Block
```

---

# 32. Functional Purpose of Each Block

## Sidebar Navigation

Provides navigation between major application modules.

### Navigation Modules

- Compare
- Catalog
- My Comparisons
- About

---

## Model Status Block

Displays:
- Current local LLM
- Runtime status
- Current model
- Health indicator

Potential future features:
- GPU usage
- Model switching
- Download management

---

## Hero / Introduction Block

Explains:
- What the platform does
- AI comparison workflow
- Local-first architecture
- Privacy advantages

---

# 33. Core Functional Area — Tool Selection Workspace

This is the central interactive area of the application.

Responsibilities:
- Selecting tools
- Managing comparison queue
- Preparing AI analysis
- Displaying tool metadata

---

# 34. Tool Selection System

Maximum:
- 5 tools simultaneously

State indicator:
`Selected tools (2/5)`

---

## Tool Slot States

### Empty
Dashed placeholder.

### Hover
Enhanced glow and scale.

### Selected
Fully rendered tool card.

### Loading
Skeleton loader with shimmer effect.

### Error
Red glow and retry state.

---

# 35. Tool Card Functionalities

Each tool card supports:

- Remove tool
- Open details
- Show metadata
- Quick preview
- Category labeling

---

## Metadata

```json
{
  "name": "Claude Code",
  "description": "Agentic coding assistant with full codebase understanding, autonomous multi-step execution, and deep tool integration — available in terminal, IDEs, desktop, and web.",
  "category": "cli",
  "tags": ["Coding Agent", "Developer Tools"]
}
```

Data are stored in @tools catalog inside individual <category>/<tool-name>.md

---

# 36. Planned Tool Addition Flow

## Step 1 — User Clicks Add Tool

Triggers:
- Empty slot
- Top-right Add Tool button

---

## Step 2 — Open Tool Selection Modal

Centered modal with:
- Background blur
- Glow border
- Large search field
- Filters
- Tool results

---

# 37. Tool Selection Modal Structure

```text
Tool Selection Modal
├── Header
├── Search
├── Filters
├── Tool Grid
└── Footer Actions
```

---

# 38. Search Functionality

Search should support:
- Fuzzy search
- Tags
- Categories

---

# 39. Filtering System

## Categories
- distinc categories from avaliable elements

## Tags
- distinc tags from avaliable elements

---

# 40. Tool Grid Design

Each result card contains:
```json
{
  "name": "Claude Code",
  "description": "Agentic coding assistant with full codebase understanding, autonomous multi-step execution, and deep tool integration — available in terminal, IDEs, desktop, and web.",
  "category": "cli",
  "tags": ["Coding Agent", "Developer Tools"]
}
```

Hover effects:
- Glow
- Elevation

---

# 41. Tool Addition Logic

When adding a tool:
- Animate card into slot
- Update counter
- Prevent duplicates
- Prevent overflow beyond 5 tools

---

# 42. Comparison Readiness Validation

Start Comparing button becomes active only when:
- At least 2 tools selected

Disabled state:
- Dimmed
- Reduced glow

Active state:
- Full neon glow
- Hover animations

---

# 43. Start Comparing Workflow

## Validation
Checks:
- Metadata availability
- Model readiness
- Comparison constraints

---

## AI Analysis Generation

Backend tasks:
- Feature extraction
- Benchmark analysis
- Capability comparison
- Recommendation generation

---

## Progress UI

Example:

```text
Analyzing tools...
████████░░ 80%
```

Stages:
- Gathering metadata
- Comparing features
- Generating summary

---

