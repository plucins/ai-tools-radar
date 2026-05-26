# Scope Clarifications — Phase 2 Gate

**Date**: 2026-05-26

## Decisions Made

### Decision 1 — ComparisonSection.summary?: string
**Choice**: Include `summary?: string`  
**Rationale**: Matches ADR-003 (accepted) and HLD interfaces. Research-report §6.1 omission was a documentation error.  
**Impact**: Both backend and frontend `ComparisonSection` interfaces include `summary?: string`.

### Decision 2 — mockComplete() fix strategy
**Choice**: Return hardcoded new-model JSON stub unconditionally  
**Rationale**: Immune to future system prompt keyword changes; deterministic in test/dev.  
**Impact**: `llm.service.ts` `mockComplete()` no longer checks system prompt content for model detection; always returns a valid `ComparisonResult` stub using the new `sections[]/toolSummaries[]` shape.

### Decision 3 — AppOutletContext type location
**Choice**: Dedicated `src/frontend/src/components/layout/OutletContext.ts`  
**Rationale**: Clean import path; consumers don't need to import from MainLayout.  
**Impact**: New file created; `MainLayout.tsx` and `ToolsPage.tsx` (and any future route consumers) import `AppOutletContext` from this file.
