import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComparisonPanel } from '@/components/comparison/ComparisonPanel'
import { ToolList } from '@/components/tools/ToolList'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LoadingState } from '@/components/ui/LoadingState'
import { api } from '@/lib/api'
import type { Tool } from '@/types/tool'

export function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [comparing, setComparing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.tools
      .list()
      .then(setTools)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load tools')
      })
      .finally(() => setLoading(false))
  }, [])

  function toggleTool(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  async function handleCompare() {
    setComparing(true)
    setError(null)

    try {
      const result = await api.comparison.compare({ toolIds: Array.from(selectedIds) })
      navigate('/compare', { state: { result } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Comparison failed')
    } finally {
      setComparing(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading tools..." />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Tools</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and compare AI developer tools.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ComparisonPanel
        selectedCount={selectedIds.size}
        onCompare={handleCompare}
        loading={comparing}
      />

      <ToolList tools={tools} selectedIds={selectedIds} onToggle={toggleTool} />
    </div>
  )
}
