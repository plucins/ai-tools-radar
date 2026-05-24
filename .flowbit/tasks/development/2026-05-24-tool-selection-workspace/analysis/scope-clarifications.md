# Phase 2 Scope Clarifications

**Date**: 2026-05-24

## Critical Decisions

### Decision 1: ToolCard dual-mode interaction
**Choice**: `mode: 'slot' | 'browser'` prop on single ToolCard
- Slot mode: shows X remove button (top-right corner)
- Browser mode (modal): shows selection ring, no X button
- Rationale: DRY — single domain concept, cleaner API

### Decision 2: Comparison progress UI placement
**Choice**: Inline in CTA block
- Stage label + animated progress bar within the Comparison CTA area
- Stages: "Gathering metadata" → "Comparing features" → "Generating summary"
- No new overlay or toast component needed

### Decision 3: ComparisonService mock summary
**Choice**: Interpolated placeholder
- When LLM_MODE=mock, return: `"Mock comparison of [Tool1] vs [Tool2] (and N more). This is a placeholder result generated in mock mode."`
- Unblocks full end-to-end testing without a running LLM

## Important Decisions (defaults accepted)

### Fuzzy search implementation
**Decision**: `Array.filter` + `String.includes` (case-insensitive)
- No `fuse.js` dependency — sufficient for 3–50 tools

### ToolList on ToolsPage
**Decision**: Remove `ToolList` from redesigned `ToolsPage`
- Browsing moves to `AddToolModal` exclusively
- Matches EPIC 3 layout spec exactly
