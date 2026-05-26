# Decision Log — AI Tool Comparison Feature

This log captures architecture decision records (MADR format) for the AI Tools Radar comparison feature. Each ADR documents a significant design choice, the alternatives considered, and the rationale for the decision made.

---

## ADR-001: Text-Based Comparison Over Numeric Scores

### Status
Accepted

### Context

The initial `ComparisonResult` data model used numeric scores: each compared tool received an overall `score: number`, and each evaluation criterion had a `ratings[]` array containing per-tool numeric `score` values (e.g. `score: 8.2` on a 10-point scale). The frontend was designed to render these as progress bars or radial charts.

The product owner explicitly rejected this model after reviewing early wireframes. The concern was that numeric scores are a form of false precision: a score of 8.2 vs 7.9 implies a measurement accuracy that no LLM-generated comparison can deliver. Scores also obscure the actual reason a tool does or does not support a feature, which is the information a developer actually needs.

### Decision Drivers

- Developer trust: precise numbers imply rigorous measurement; text descriptions are honest about their source
- LLM output quality: LLMs are better at generating explanatory text than calibrated numeric scores
- Actionability: "supports MCP via server protocol" is more useful than "score: 8/10"
- UI clarity: ✓/✗ + description is scannable in a table; bar charts add visual noise without information gain
- Reversibility: it is easier to add a numeric derived field later than to remove one that users have anchored to

### Considered Options

1. **Numeric score model** (`comparedTools[].score: number`, `criteria[].ratings[].score: number`)
2. **Text-only narrative** (pure prose comparison, no structured grid)
3. **Boolean availability + text description** (`available: boolean`, `description: string` per feature per tool) ← **chosen**
4. **Tier classification** (e.g. "Full", "Partial", "None" enum per feature)

### Decision Outcome

Chosen option: **3 — Boolean availability + text description**, because it provides scannable ✓/✗ structure (answering "does this tool have this feature?") while the `description` string carries the nuance needed to understand *how* or *why* — without implying false quantitative precision.

Option 2 was too unstructured for comparison use cases. Option 4 (tiers) would require agreeing on enum semantics up front and complicates LLM prompting without delivering more value than a simple boolean + prose.

### Consequences

#### Good
- No LLM calibration needed — booleans are unambiguous instructions
- Frontend cell rendering is simple: `available ? <CheckIcon> : <XIcon>` + `<p>{description}</p>`
- The model is honest about its nature: text from an LLM, not a measurement
- Scores cannot be gamed or over-interpreted by readers

#### Bad
- Cannot rank tools by aggregate score — a developer wanting "just tell me the best tool" gets prose, not a number
- A/B comparison across many tools (>4) is harder without a numeric summary
- "Partial support" nuance (feature exists but is limited) requires the `description` field to carry that context rather than a dedicated tier value

---

## ADR-002: Static + Dynamic Section Strategy

### Status
Accepted

### Context

The comparison result is rendered as a tabbed interface, where each tab represents a dimension of comparison (e.g. "Core Features", "Pricing"). Two extreme approaches were possible: (a) always render exactly the same N tabs regardless of tool content, or (b) let the LLM decide all section IDs freely. The product owner specified a third path: define 4 canonical base sections that are always present, and allow the LLM to add extras if the documentation warrants them.

The 4 canonical sections align with the primary H2 headers found in tool markdown profiles (`## Features`, `## Pricing`, `## Integrations`, `## Limitations`) and map to the most common questions developers ask when evaluating tools.

### Decision Drivers

- Predictability: users expect at least the 4 core tabs to always be there
- Flexibility: some tools (e.g. enterprise security tools) have rich compliance/security docs that merit a dedicated tab
- Frontend simplicity: `sections.map(…)` renders any array generically — no special-case code for extra tabs
- LLM guidance: bounding the enumerated section IDs in the prompt reduces hallucination of irrelevant section names

### Considered Options

1. **Fixed 4 sections only** — prompt LLM to always produce exactly `["features", "pricing", "integrations", "limitations"]`; reject extras
2. **Fully dynamic sections** — LLM chooses all section IDs freely; no enumeration constraint
3. **Static base + LLM extras** — enumerate the 4 base IDs; allow LLM to append up to 3 extra sections ← **chosen**
4. **Section library** — define ~10 candidate sections; LLM selects which ones apply

### Decision Outcome

Chosen option: **3 — Static base + LLM extras**, because it satisfies the predictability requirement (developers always find the 4 expected tabs) while preserving flexibility for tool-specific dimensions. The constraint of naming 4 static IDs in the prompt makes LLM output more consistent while still allowing genuine domain variation.

Option 1 was too rigid — security-focused tool comparisons genuinely benefit from a dedicated tab. Option 2 produced inconsistent tab names across comparisons. Option 4 added prompt complexity without meaningful benefit over option 3.

### Consequences

#### Good
- Users always see the same 4 base tabs regardless of which tools are compared
- Dynamic extra tabs work without any frontend code change
- System prompt complexity is modest — enumerate 4 IDs and add a permissive clause
- Section `id` values from the 4 static sections are predictable for any future client-side logic

#### Bad
- LLM may add spurious extra sections if the prompt is not carefully constrained (cap at 7 total)
- If a tool's markdown lacks one of the 4 static sections, the LLM may produce a low-quality tab with sparse data — content truncation strategy should warn rather than silently omit
- Ordering of tabs is LLM-controlled beyond the 4 base sections; minor inconsistency is possible

---

## ADR-003: Hybrid Feature Granularity

### Status
Accepted

### Context

Within each section tab, the design must decide how much detail to show and in what form. Two options were primarily considered: (a) a plain feature-level table with only boolean + description per cell, and (b) a hybrid that adds a section-level prose summary paragraph above the table. The product owner confirmed option (b) — the "hybrid" — during Phase 5 gate review.

The feature table answers "does this tool have X?" while the summary paragraph answers "what's the overall story in this section?" Both questions arise when a developer evaluates tools.

### Decision Drivers

- Scannability: developers often scan a table to find the one feature that matters to them
- Context: a bare table row ("MCP support: ✓ / ✗") without narrative can be hard to interpret without reading every description cell
- LLM strength: LLMs excel at synthesis paragraphs; a summary is easier to generate reliably than a perfectly calibrated score
- Progressive disclosure: users who want quick answers scan the table; users who want narrative read the summary
- Data model symmetry: adding `summary?: string` to `ComparisonSection` is a non-breaking optional field

### Considered Options

1. **Table only** — `FeatureRow[]` grid per section, no section-level narrative
2. **Narrative only** — a prose paragraph per section, no structured feature table
3. **Hybrid: table + section summary** — `summary?: string` on `ComparisonSection` + `FeatureRow[]` table ← **chosen**
4. **Nested sections** — a summary paragraph plus sub-groupings of features within each section

### Decision Outcome

Chosen option: **3 — Hybrid (table + section summary)**, because it serves both scanning and reading use cases without overcomplicating the data model. The `summary` field on `ComparisonSection` is optional, so sections without a summary degrade gracefully.

Option 1 was rejected because bare tables can be hard to interpret holistically. Option 2 was rejected because prose alone makes it hard to quickly answer "does Tool A support feature X?". Option 4 was rejected as over-engineered for an initial release.

### Consequences

#### Good
- Scannable grid + narrative summary = two complementary ways to consume the same information
- `summary` on `ComparisonSection` is optional — if LLM omits it, the frontend renders the table only
- Follows progressive disclosure: table is visible immediately; narrative is secondary
- Consistent with how human-authored tool comparisons work (e.g. "Pricing overview: both tools offer free tiers, but limits differ significantly" above a pricing table)

#### Bad
- LLM must generate more tokens per section (table rows + summary paragraph), increasing latency
- Summary quality is variable — a generic or hallucinated summary is worse than no summary; careful prompting is required
- Rendering adds a `<p>` above each `<FeatureTable>` — minor layout complexity

---

## ADR-004: selectedModel Propagation via React Router Outlet Context

### Status
Accepted

### Context

The `selectedModel` value (which LiteLLM model the user wants the comparison to use) was initialised inside `Sidebar.tsx` as local component state. The comparison API call is made inside `ToolsPage`, which is a sibling-descendant of `Sidebar` in the render tree via `MainLayout` and `<Outlet>`. There is no direct prop path from `Sidebar` to `ToolsPage`.

Three mechanisms could thread this state:
1. React Context provider wrapping the layout
2. Lifting state to `MainLayout` and passing via React Router v6 `<Outlet context>`
3. A global state manager (Zustand, Redux, Jotai)

The codebase already uses React Router v6 with `<Outlet>` in `MainLayout`. The `useOutletContext` hook provides a typed, zero-dependency channel for parent→child route state sharing.

### Decision Drivers

- Minimal new abstractions: avoid introducing a Context provider or global store for a single shared value
- React Router alignment: the codebase already depends on react-router-dom v6; using its built-in context feature is idiomatic
- Localised change: only 3 files change (`MainLayout`, `Sidebar`, `ToolsPage`) — no new files
- Type safety: `useOutletContext<{ selectedModel: string }>()` provides compile-time checking
- `App.tsx` confirmed: no changes required — the `<Outlet>` is already in `MainLayout`, not `App.tsx`

### Considered Options

1. **React Context provider** (`createContext` + `Provider` wrapping `MainLayout` children)
2. **React Router `<Outlet context>`** — lift state to `MainLayout`, pass via `<Outlet context={{ selectedModel }}>` ← **chosen**
3. **Global state manager** (Zustand / Jotai / Redux)
4. **URL search params** — encode selected model in `?model=xxx` query string
5. **Callback prop drilling** — `MainLayout` → `Sidebar` → back up via event bus

### Decision Outcome

Chosen option: **2 — React Router `<Outlet context>`**, because it is the lowest-friction solution that fits the existing architecture. The routing layer already owns the boundary between `MainLayout` and its child routes; threading state through that boundary via the router's native mechanism is idiomatic and requires no new dependencies.

A React Context provider (option 1) would be the appropriate choice if `selectedModel` needed to be available across many parts of the tree or in deeply nested components. For a single value shared between a layout shell and its immediate child route, `useOutletContext` is less ceremony.

Option 3 (global store) is disproportionate for one derived UI value. Option 4 (URL params) would expose the model choice in the URL, which is undesirable for a transient UI preference. Option 5 (event bus) is an anti-pattern in modern React.

### Consequences

#### Good
- No new dependencies or files introduced
- Sidebar becomes a fully controlled, testable component (all state is in props, no internal `useState` for model)
- `ToolsPage` explicitly declares its dependency on `selectedModel` via `useOutletContext` — clear data flow
- Pattern is documented in React Router v6 docs and is familiar to developers who know the framework
- Easily extended: add more values to the context object without architectural change (e.g. `{ selectedModel, compareMode }`)

#### Bad
- `useOutletContext` only works in direct children of the `<Outlet>` — if a deeply nested component (not a route) needs `selectedModel`, a React Context would be needed
- Type contract between `MainLayout` (context producer) and `ToolsPage` (consumer) is implicit — no compile-time enforcement of the producer shape without an explicit shared type
- Developers unfamiliar with `useOutletContext` may find the pattern non-obvious compared to standard prop drilling or Context

---

*Last updated: 2026-05-26*  
*Decisions reference research in: `outputs/research-report.md` and `analysis/synthesis.md`*
