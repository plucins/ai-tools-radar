# Gap Analysis: EPIC 3 — Tool Selection Workspace

**Date**: 2026-05-24
**Risk Level**: HIGH

## Task Characteristics

| Characteristic | Value |
|---|---|
| `has_reproducible_defect` | true |
| `modifies_existing_code` | true |
| `creates_new_entities` | true |
| `involves_data_operations` | true |
| `ui_heavy` | true |

## Phase Summary

All three current bugs (api.ts envelope, empty ToolsService, ComparisonResult mismatch) must be fixed before any UI work produces testable results — they form a complete end-to-end data blackout. The frontend redesign is a near-complete replacement of `ToolsPage` with a slot-based workspace, one new component (`AddToolModal`), and targeted enhancements to `ToolCard`, `ToolList`, and `ComparisonPanel`; the backend changes are localized to `ToolsService` (Markdown parsing) and `ComparisonService` (response shape alignment).

## Blocker Bugs (must fix first)

| # | File | Gap | Impact |
|---|---|---|---|
| B1 | `src/frontend/src/lib/api.ts` line 16 | No envelope unwrap | Every API call returns `{data,timestamp}` not the actual payload |
| B2 | `src/backend/src/tools/tools.service.ts` | Empty array | GET /tools always returns `[]` |
| B3 | `src/backend/src/comparison/comparison.service.ts` | Wrong response shape | Comparison result view silently renders nothing |

## Backend Gaps

| # | File | Current | Needed |
|---|---|---|---|
| BE1 | `tools.service.ts` | Empty array | Markdown parser + Tool[] from files |
| BE2 | `Tool` interface | `{id, name, description}` | `{id, name, description, category, tags, profilePath}` |
| BE3 | `comparison.service.ts` | `{toolIds, result}` | `{tools, summary, generatedAt}` |
| BE4 | Frontmatter | N/A | YAML fenced block (` ```yaml `), parse with `js-yaml` or manual regex. Structure: `name`, `description` (block scalar `>`), `category`, `tags` (list) |

## Frontend Gaps

| # | File | Current | Needed |
|---|---|---|---|
| FE1 | `api.ts` | Raw cast | Unwrap `{data, timestamp}` → return `data` |
| FE2 | `ToolsPage.tsx` | Flat list 80 lines | Full redesign: Hero → Header → 5-slot grid → CTA |
| FE3 | `ToolsPage.tsx` | No max-5 guard | `selectedIds.size >= 5` blocks addition |
| FE4 | `ToolsPage.tsx` | No modal trigger | isModalOpen state + triggers |
| FE5 | `ToolCard.tsx` | No animations | Framer Motion whileHover/whileTap, disabled prop, X button |
| FE6 | `ToolList.tsx` | Plain map | AnimatePresence + stagger |
| FE7 | `ComparisonPanel.tsx` | 22-line bar | Neon CTA, progress stages, active/disabled glow |

## New Files to Create

- `src/frontend/src/components/tools/AddToolModal.tsx` (Dialog + search + filters + tool grid)
- shadcn: Dialog, Input, Skeleton (install via `npx shadcn@latest add dialog input skeleton`)

## Decisions Needed

### Critical
1. **ToolCard dual-mode**: slot (X remove) vs modal browser (selection ring)
   - Recommendation: `mode: 'slot' | 'browser'` prop on single ToolCard
2. **Comparison progress UI placement**: inline CTA vs overlay modal vs toast
   - Recommendation: Inline in CTA block
3. **ComparisonService mock summary**: interpolated placeholder vs empty string
   - Recommendation: Interpolated placeholder (unblocks end-to-end testing)

### Important
1. **Fuzzy search**: Array.filter (no dep) vs fuse.js — default: Array.filter
2. **ToolList on ToolsPage**: remove (spec-aligned) vs keep as secondary — default: remove
