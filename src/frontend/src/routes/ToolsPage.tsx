import { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Plus, Sparkles, X } from 'lucide-react'
import { ComparisonPanel } from '@/components/comparison/ComparisonPanel'
import type { ComparisonStage } from '@/components/comparison/ComparisonPanel'
import { AddToolModal } from '@/components/tools/AddToolModal'
import { ToolSlotGrid } from '@/components/tools/ToolSlotGrid'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/EmptyState'
import { api } from '@/lib/api'
import type { Tool } from '@/types/tool'
import type { AppOutletContext } from '@/components/layout/OutletContext'

export function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [comparing, setComparing] = useState(false)
  const [stage, setStage] = useState<ComparisonStage>(null)
  const stageTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const navigate = useNavigate()
  const { selectedModel } = useOutletContext<AppOutletContext>()

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

  const streamingEnabled = import.meta.env.VITE_COMPARISON_STREAMING !== 'false'

  async function handleCompare() {
    if (selectedIds.size < 2 || comparing || !selectedModel) return
    setComparing(true)

    if (streamingEnabled) {
      navigate('/compare', {
        state: { streaming: true, toolIds: [...selectedIds], model: selectedModel || undefined },
      })
      return
    }

    // Classic mode: animate stages while the API call runs
    setStage('gathering')
    stageTimers.current.push(setTimeout(() => setStage('comparing'), 600))
    stageTimers.current.push(setTimeout(() => setStage('generating'), 1400))

    try {
      const result = await api.comparison.compare({
        toolIds: [...selectedIds],
        model: selectedModel,
      })
      stageTimers.current.forEach(clearTimeout)
      stageTimers.current = []
      navigate('/compare', { state: { result } })
    } catch (err) {
      stageTimers.current.forEach(clearTimeout)
      stageTimers.current = []
      setError(err instanceof Error ? err.message : 'Comparison failed')
    } finally {
      setComparing(false)
      setStage(null)
    }
  }

  return (
    <div className="space-y-10">
      {/* Centered hero header */}
      <div className="flex flex-col items-center gap-4 text-center pt-4">
        <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Compare AI Developer Tools
        </h1>
        <p className="max-w-lg text-base text-muted-foreground">
          Select tools to compare and get an AI-powered analysis based on real-world capabilities,
          features, and developer experience.
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <Alert variant="destructive" className="relative">
          <button
            onClick={() => setError(null)}
            className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              Selected tools ({selectedIds.size}/5)
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              disabled={selectedIds.size >= 5}
              className="border-dashed border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Tool
            </Button>
          </div>
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
          selectedModel={selectedModel}
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
