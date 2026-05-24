import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { ComparisonPanel } from '@/components/comparison/ComparisonPanel'
import type { ComparisonStage } from '@/components/comparison/ComparisonPanel'
import { AddToolModal } from '@/components/tools/AddToolModal'
import { ToolSlotGrid } from '@/components/tools/ToolSlotGrid'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/EmptyState'
import { api } from '@/lib/api'
import type { Tool } from '@/types/tool'

export function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [comparing, setComparing] = useState(false)
  const [stage, setStage] = useState<ComparisonStage>(null)
  const navigate = useNavigate()

  const selectedTools: Tool[] = [...selectedIds]
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) as Tool[]

  useEffect(() => {
    setLoading(true)
    api.tools
      .list()
      .then((data) => {
        setTools(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load tools')
        setLoading(false)
      })
  }, [])

  const addTools = (ids: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      for (const id of ids) {
        if (next.size < 5) next.add(id)
      }
      return next
    })
    setIsModalOpen(false)
  }

  const removeTool = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  async function handleCompare() {
    if (selectedIds.size < 2 || comparing) return
    setComparing(true)
    setStage('gathering')

    const t1 = setTimeout(() => setStage('comparing'), 400)
    const t2 = setTimeout(() => setStage('generating'), 1200)

    try {
      const result = await api.comparison.compare({ toolIds: [...selectedIds] })
      clearTimeout(t1)
      clearTimeout(t2)
      navigate('/compare', { state: { result } })
    } catch (err) {
      clearTimeout(t1)
      clearTimeout(t2)
      setError(err instanceof Error ? err.message : 'Comparison failed')
      setComparing(false)
      setStage(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero block */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tools Radar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select up to 5 tools to compare with AI analysis
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={selectedIds.size >= 5}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Tool
        </Button>
      </div>

      {/* Error alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Empty catalog state */}
      {!loading && !error && tools.length === 0 && (
        <EmptyState
          title="No tools available"
          description="No tool profiles found in the backend."
        />
      )}

      {/* Slot grid — rendered immediately; slots show Skeleton while loading */}
      {(loading || tools.length > 0) && (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            Selected tools ({selectedIds.size}/5)
          </p>
          <ToolSlotGrid
            tools={tools}
            selectedTools={selectedTools}
            loading={loading}
            onRemove={removeTool}
            onOpenModal={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {/* CTA block — only show when tools are loaded */}
      {!loading && tools.length > 0 && (
        <ComparisonPanel
          selectedCount={selectedIds.size}
          loading={comparing}
          stage={stage}
          onCompare={handleCompare}
        />
      )}

      {/* Add Tool Modal */}
      <AddToolModal
        tools={tools}
        selectedIds={selectedIds}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTools={addTools}
      />
    </div>
  )
}
