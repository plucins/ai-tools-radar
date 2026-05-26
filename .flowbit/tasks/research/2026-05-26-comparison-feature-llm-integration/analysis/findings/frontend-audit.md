# Frontend Audit — Comparison Feature & selectedModel Propagation

**Research question**: What frontend changes are needed to complete the comparison feature, including the selectedModel propagation issue?

**Source category**: FRONTEND-AUDIT  
**Files audited**: 9 files  
**Date**: 2026-05-26

---

## Backend Reference Model (Ground Truth)

Before auditing the frontend, the backend's actual response shape was confirmed from:
- `src/backend/src/comparison/dto/compare-tools.dto.ts` — request DTO
- `src/backend/src/comparison/comparison.service.ts` — response interface

### Backend `CompareToolsDto` (request)
```typescript
// src/backend/src/comparison/dto/compare-tools.dto.ts
export class CompareToolsDto {
  toolIds: string[];      // required, 2–5 items
  model?: string;         // optional — selects Ollama model
}
```

### Backend `ComparisonResult` (response)
```typescript
// src/backend/src/comparison/comparison.service.ts
export interface ComparedTool {
  toolId: string;
  toolName: string;
  strengths: string[];
  weaknesses: string[];
  score: number;          // 1–10, clamped
}

export interface CriterionRating {
  toolId: string;
  score: number;
  comment: string;
}

export interface Criterion {
  name: string;
  description: string;
  ratings: CriterionRating[];
}

export interface ComparisonResult {
  tools: string[];
  summary: string;
  recommendation: string;     // ← MISSING from frontend type
  generatedAt: string;
  comparedTools: ComparedTool[];  // ← MISSING from frontend type
  criteria: Criterion[];          // ← MISSING from frontend type
}
```

---

## File-by-File Analysis

---

### 1. `src/frontend/src/types/comparison.ts`

**Current state:**
```typescript
export interface ComparisonRequest {
  toolIds: string[]
}

export interface ComparisonResult {
  tools: string[]
  summary: string
  generatedAt: string
}
```

**What is missing:**

1. `ComparisonRequest` does not include `model?: string`. The backend's `CompareToolsDto` accepts it as an optional field. Without it, the TypeScript type does not allow callers to include the model in the request body.

2. `ComparisonResult` is missing three fields that the backend always returns:
   - `recommendation: string` — the LLM's pick / recommendation text
   - `comparedTools: ComparedTool[]` — per-tool score + strengths + weaknesses
   - `criteria: Criterion[]` — structured evaluation criteria with per-tool ratings

3. Supporting interfaces `ComparedTool`, `CriterionRating`, and `Criterion` do not exist at all in the frontend types.

**What the correct implementation should be:**
```typescript
export interface ComparisonRequest {
  toolIds: string[]
  model?: string          // ADD: passes selected Ollama model to backend
}

export interface ComparedTool {
  toolId: string
  toolName: string
  strengths: string[]
  weaknesses: string[]
  score: number           // 1–10
}

export interface CriterionRating {
  toolId: string
  score: number
  comment: string
}

export interface Criterion {
  name: string
  description: string
  ratings: CriterionRating[]
}

export interface ComparisonResult {
  tools: string[]
  summary: string
  recommendation: string        // ADD
  generatedAt: string
  comparedTools: ComparedTool[] // ADD
  criteria: Criterion[]         // ADD
}
```

**Confidence**: High (100%) — backend interfaces read directly.

---

### 2. `src/frontend/src/components/comparison/ComparisonResult.tsx`

**Current state:**
```tsx
export function ComparisonResult({ result }: ComparisonResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comparison: {result.tools.join(' vs ')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-none whitespace-pre-wrap text-sm leading-6 text-foreground">
          {result.summary}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Generated: {new Date(result.generatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}
```

**What is missing:**

1. **`recommendation` section** — the backend's top-level recommendation string is not rendered at all.

2. **`comparedTools` section** — there is no rendering of per-tool cards showing:
   - Tool name
   - Score (e.g., 8/10)
   - Strengths list
   - Weaknesses list

3. **`criteria` table** — the structured evaluation grid (criterion name × tool rating + comment) is not rendered. This is the richest part of the LLM response.

**What the correct implementation should include:**

```tsx
// Section 1: Recommendation callout
<div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
  <p className="text-sm font-semibold text-primary mb-1">Recommendation</p>
  <p className="text-sm text-foreground">{result.recommendation}</p>
</div>

// Section 2: Summary prose
<div className="whitespace-pre-wrap text-sm">{result.summary}</div>

// Section 3: Per-tool cards
{result.comparedTools.map(tool => (
  <div key={tool.toolId}>
    <h3>{tool.toolName}</h3>
    <span>Score: {tool.score}/10</span>
    <ul>Strengths: {tool.strengths.map(s => <li>{s}</li>)}</ul>
    <ul>Weaknesses: {tool.weaknesses.map(w => <li>{w}</li>)}</ul>
  </div>
))}

// Section 4: Criteria table
<table>
  <thead>
    <tr>
      <th>Criterion</th>
      {result.comparedTools.map(t => <th key={t.toolId}>{t.toolName}</th>)}
    </tr>
  </thead>
  <tbody>
    {result.criteria.map(c => (
      <tr key={c.name}>
        <td>{c.name}</td>
        {c.ratings.map(r => (
          <td key={r.toolId}>{r.score}/10 — {r.comment}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
```

**Confidence**: High (100%) — current code read directly; backend model confirmed.

---

### 3. `src/frontend/src/components/comparison/ComparisonPanel.tsx`

**Current state:**
```typescript
interface ComparisonPanelProps {
  selectedCount: number
  loading: boolean
  stage: ComparisonStage
  onCompare: () => void
}
```

**What is missing:**

The panel itself does not need to receive `selectedModel` — its responsibility is only to trigger the comparison via `onCompare()`. The model selection occurs in Sidebar (a sibling component), and the correct place to wire `model` into the API call is `ToolsPage.handleCompare`, not ComparisonPanel.

**Optional improvement**: ComparisonPanel could display the active model name (e.g., "Powered by llama3.2") for user transparency. This would require adding a `selectedModel?: string` prop. This is a UX enhancement, not a functional blocker.

**Assessment**: No mandatory changes required for functional correctness.

**Confidence**: High (95%)

---

### 4. `src/frontend/src/components/layout/Sidebar.tsx`

**Current state:**
```tsx
export function Sidebar() {
  const { models, loading } = useModels()
  const [selectedModel, setSelectedModel] = useState('')

  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0].id)
    }
  }, [models, selectedModel])

  return (
    <aside ...>
      <SidebarLogo />
      <Separator />
      <SidebarNav />
      <SidebarModelStatus
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        ...
      />
    </aside>
  )
}
```

**What is missing:**

`selectedModel` state is **entirely local** to `Sidebar`. It is:
- Not passed to any parent via callback prop
- Not stored in a React context
- Not accessible by sibling components (`ToolsPage`, `ComparisonResultPage`)

This is the root cause of the selectedModel propagation bug. When `ToolsPage.handleCompare()` calls the API, it has no way to know which model the user selected.

**What the correct implementation should be:**

Option A (Recommended — Outlet context):
- Lift `selectedModel` state into `MainLayout`
- Remove state from `Sidebar`, pass `selectedModel` + `onModelChange` as props
- Pass `selectedModel` via React Router's `<Outlet context={{ selectedModel }} />`
- `ToolsPage` reads it via `useOutletContext<{ selectedModel: string }>()`

Option B (React context / Zustand):
- Create a `ModelContext` or Zustand store
- `Sidebar` writes to it; `ToolsPage` reads from it
- More boilerplate but avoids prop drilling through `MainLayout`

**Confidence**: High (100%) — state isolation confirmed by direct code reading.

---

### 5. `src/frontend/src/components/layout/MainLayout.tsx`

**Current state:**
```tsx
export function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  )
}
```

**What is missing:**

`MainLayout` renders `<Sidebar />` and `<Outlet />` as isolated subtrees with no shared state. For Option A (Outlet context), `MainLayout` must:

1. Lift `selectedModel` state here (move `useState` + `useEffect` + `useModels` from `Sidebar` to `MainLayout`)
2. Pass `selectedModel` and `onModelChange` as props to `<Sidebar />`
3. Pass `selectedModel` via outlet context: `<Outlet context={{ selectedModel }} />`

**What the correct implementation should be:**
```tsx
export function MainLayout() {
  const { models, loading } = useModels()
  const [selectedModel, setSelectedModel] = useState('')

  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0].id)
    }
  }, [models, selectedModel])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        models={models}
        loading={loading}
      />
      <MainContent>
        <Outlet context={{ selectedModel }} />
      </MainContent>
    </div>
  )
}
```

And `Sidebar` becomes a controlled component that receives these as props instead of managing its own state.

**Confidence**: High (100%)

---

### 6. `src/frontend/src/routes/ToolsPage.tsx`

**Current state:**
```typescript
async function handleCompare() {
  if (selectedIds.size < 2 || comparing) return
  setComparing(true)
  setStage('gathering')

  const t1 = setTimeout(() => setStage('comparing'), 400)
  const t2 = setTimeout(() => setStage('generating'), 1200)

  try {
    const result = await api.comparison.compare({ toolIds: [...selectedIds] })
    // ...
  }
}
```

**What is missing:**

1. `handleCompare` does not include `model` in the `api.comparison.compare(...)` call. The backend's `model` field is always silently ignored because it's never sent.

2. `ToolsPage` has no access to `selectedModel` — it cannot read it from Sidebar because state is trapped there (see Gap #4).

**What the correct implementation should be:**

After lifting state into MainLayout and passing via Outlet context:
```typescript
import { useOutletContext } from 'react-router-dom'

export function ToolsPage() {
  const { selectedModel } = useOutletContext<{ selectedModel: string }>()
  // ... rest of state ...

  async function handleCompare() {
    if (selectedIds.size < 2 || comparing) return
    setComparing(true)
    setStage('gathering')

    const t1 = setTimeout(() => setStage('comparing'), 400)
    const t2 = setTimeout(() => setStage('generating'), 1200)

    try {
      const result = await api.comparison.compare({
        toolIds: [...selectedIds],
        model: selectedModel || undefined,  // ADD: pass selected model
      })
      clearTimeout(t1)
      clearTimeout(t2)
      navigate('/compare', { state: { result } })
    } catch (err) {
      // ...
    }
  }
}
```

**Confidence**: High (100%)

---

### 7. `src/frontend/src/routes/ComparisonResultPage.tsx`

**Current state:**
```tsx
export function ComparisonResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result as ComparisonResultType | undefined

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          ← Back to Tools
        </Button>
        <h1 className="text-2xl font-bold">Comparison Result</h1>
      </div>
      {result ? (
        <ComparisonResult result={result} />
      ) : (
        <EmptyState ... />
      )}
    </div>
  )
}
```

**What is missing:**

The page structure itself is correct — it reads result from router location state and renders `<ComparisonResult />`. No structural changes needed here.

**Downstream dependency**: Once `ComparisonResult.tsx` is updated to render the full model and `ComparisonResultType` is updated in `types/comparison.ts`, this page will automatically benefit. No direct code changes needed in `ComparisonResultPage.tsx`.

**Assessment**: No mandatory changes required.

**Confidence**: High (95%)

---

### 8. `src/frontend/src/lib/api.ts`

**Current state:**
```typescript
comparison: {
  compare: (body: ComparisonRequest) =>
    request<ComparisonResult>('/comparison', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
},
```

**What is missing:**

The function itself is correctly implemented — it serializes the entire `body` object to JSON. However:

1. Because `ComparisonRequest` in `types/comparison.ts` does not include `model?: string`, TypeScript will reject any caller that passes `{ toolIds, model }`. The type constraint is the blocker, not the implementation.

2. The return type `ComparisonResult` is stale — it only has `tools`, `summary`, `generatedAt`. TypeScript consumers won't know about `recommendation`, `comparedTools`, `criteria`.

**What needs to change:**

No implementation change needed in `api.ts` itself. The fix is in `types/comparison.ts`:
- Add `model?: string` to `ComparisonRequest` → unblocks callers
- Expand `ComparisonResult` → unblocks typed consumers

After the type fix, `api.ts` will correctly serialize and type-check the full request/response.

**Confidence**: High (100%)

---

### 9. `src/frontend/src/App.tsx`

**Current state:**
```tsx
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ToolsPage />} />
          <Route path="compare" element={<ComparisonResultPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<ToolProfilePage />} />
          <Route path="radar" element={<RadarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

**What is missing:**

Nothing. The routing structure is correct. The `<Outlet context>` mechanism (used in Option A for `selectedModel` propagation) is a feature of React Router's nested routes and works with this exact structure — `MainLayout` provides context to all child routes via `<Outlet context={...} />`.

**Assessment**: No changes needed.

**Confidence**: High (100%)

---

## GAPS SUMMARY

All changes required to complete the comparison feature, ordered by dependency:

| # | File | Gap | Priority |
|---|------|-----|----------|
| 1 | `src/frontend/src/types/comparison.ts` | `ComparisonRequest` missing `model?: string` | **BLOCKER** |
| 2 | `src/frontend/src/types/comparison.ts` | `ComparisonResult` missing `recommendation`, `comparedTools`, `criteria` + 3 new interfaces | **BLOCKER** |
| 3 | `src/frontend/src/components/layout/Sidebar.tsx` | `selectedModel` state trapped locally — must be lifted to `MainLayout` as controlled component | **BLOCKER** |
| 4 | `src/frontend/src/components/layout/MainLayout.tsx` | Must lift `selectedModel` state here and pass via `<Outlet context={{ selectedModel }} />` | **BLOCKER** |
| 5 | `src/frontend/src/routes/ToolsPage.tsx` | `handleCompare` must read `selectedModel` via `useOutletContext` and pass it in API call | **BLOCKER** |
| 6 | `src/frontend/src/components/comparison/ComparisonResult.tsx` | Missing rendering of `recommendation`, `comparedTools` cards (score/strengths/weaknesses), `criteria` table | **BLOCKER** |
| 7 | `src/frontend/src/lib/api.ts` | No direct change needed — fixed by type update in gap #1 | — |
| 8 | `src/frontend/src/routes/ComparisonResultPage.tsx` | No direct change needed — benefits from gap #2 + #6 | — |
| 9 | `src/frontend/src/App.tsx` | No changes needed | — |

### Dependency order for implementation

```
Gap #1,#2  (types/comparison.ts)
    ↓
Gap #3     (Sidebar.tsx → becomes controlled, receives props)
Gap #4     (MainLayout.tsx → lifts state, provides Outlet context)
    ↓
Gap #5     (ToolsPage.tsx → reads selectedModel, passes to API)
    ↓
Gap #6     (ComparisonResult.tsx → renders full result model)
```

### Root cause of selectedModel propagation bug

`Sidebar` owns `selectedModel` as private component state with no upward escape hatch. The fix requires lifting state to `MainLayout` (the common ancestor of `Sidebar` and all page routes), then threading it down via React Router's `useOutletContext`. This is a standard React state-lifting pattern and requires changes to exactly 3 files: `Sidebar.tsx`, `MainLayout.tsx`, and `ToolsPage.tsx`.

---

*Sources: direct code reading of all 9 specified files + backend DTO/service files for ground truth.*
