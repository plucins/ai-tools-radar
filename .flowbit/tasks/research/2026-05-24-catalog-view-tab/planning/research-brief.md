# Research Brief: Catalog View Tab

**Date**: 2026-05-24  
**Type**: Technical  
**Task Path**: `.flowbit/tasks/research/2026-05-24-catalog-view-tab/`

---

## Research Question

How should I implement a Catalog view as a separate tab/route (`/catalog`) to display all available tools in the AI Tools Radar app, given the current state of the codebase and the in-progress EPIC 3 work?

---

## Context

The AI Tools Radar app is a React + NestJS monorepo. EPIC 3 (Tool Selection Workspace) is currently in progress:
- **Groups 1, 2, 3** are **complete** — backend blockers fixed, components extended, new components created
- **Groups 4, 5** are **pending** — ToolsPage rewire and verification

The sidebar nav (`SidebarNav.tsx`) already has a **"Catalog"** nav item pointing to `/catalog`, but no route or page exists for it. The app currently has two routes: `/` (ToolsPage) and `/compare` (ComparisonResultPage).

The user wants to add a read-only catalog view showing all available tools as a separate browsable tab.

---

## Scope

### In Scope
- Frontend routing structure (App.tsx, react-router-dom setup)
- Existing reusable components: ToolCard, ToolList, AddToolModal (as reference)
- Backend GET /tools endpoint (already working after EPIC 3 Group 1)
- Tool and type definitions
- Sidebar nav active state behavior (SidebarNavItem)
- Frontend standards (shadcn/ui, Tailwind, Framer Motion patterns)

### Out of Scope
- Backend changes — GET /tools already returns all tools with category/tags/profilePath
- LLM/comparison features
- Authentication or user-specific data
- Pagination (not in scope per EPIC 3 spec)

### Constraints
- Must not conflict with EPIC 3 Groups 4-5 (still pending)
- Must use existing patterns: shadcn/ui first, named exports, @/ alias, cn()
- No new backend endpoints required

---

## Success Criteria

1. Clear identification of all files to create/modify
2. Reuse strategy: which existing components can be used as-is vs need modification
3. Routing pattern aligned with App.tsx structure
4. UI layout recommendation consistent with existing pages
5. Any potential conflicts with in-progress EPIC 3 work identified
