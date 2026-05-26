# Phase 1 Clarifications

**Date**: 2026-05-26  
**Source**: Codebase analysis + research artifacts

## No blocking clarifications required

The research artifacts (research-report.md, high-level-design.md, decision-log.md) are HIGH confidence
and answer all critical architectural questions. ADR-001 through ADR-004 are accepted decisions.

## Key Findings from Code Analysis (supplements research)

### Finding 1 — mockComplete() heuristic will break after prompt rewrite [IMPLEMENTATION NOTE]

**Location**: `src/backend/src/llm/llm.service.ts` — `mockComplete()` method  
**Issue**: The current mock mode checks `if (messages[0].content.includes('comparedTools'))` to decide
whether to return structured comparison JSON. After the system prompt is rewritten for the new model
(using `sections`, `toolSummaries` — no `comparedTools`), this check will fail and mock mode will
return plain text, causing `buildFallback()` to always trigger in mock mode.  
**Resolution**: During implementation (Group B), update `mockComplete()` to:
- Check for `"sections"` or `"toolSummaries"` in system prompt instead
- Return mock JSON matching the new `ComparisonResult` model shape

### Finding 2 — ComparisonSection.summary?: string discrepancy [RESOLVED]

**Issue**: §6.2 of research-report.md omits `summary?: string` from the backend `ComparisonSection`
interface, but HLD and ADR-003 (Hybrid Feature Granularity) explicitly include it.  
**Resolution**: Use HLD version — `summary?: string` is present on `ComparisonSection` in both
frontend and backend interfaces. ADR-003 is authoritative.

### Finding 3 — CompareToolsDto has ArrayMaxSize(5) not 4 [MINOR]

**Issue**: Research report states max 4 tools; the actual DTO has `@ArrayMaxSize(5)`.  
**Resolution**: Keep the existing `@ArrayMaxSize(5)` validation — no change needed.

### Finding 4 — Sub-component file structure [IMPLEMENTATION NOTE]

The HLD describes `FeatureTable` and `ToolSummaryCard` as separate components. These will be created
as sub-components within `src/frontend/src/components/comparison/`:
- `FeatureTable.tsx` — feature grid per section
- `ToolSummaryCard.tsx` — per-tool prose summary card
This follows the project's "one component per file" convention.
