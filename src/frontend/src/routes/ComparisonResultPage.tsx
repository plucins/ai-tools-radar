import { Button } from '@/components/ui/button'
import { ComparisonResult } from '@/components/comparison/ComparisonResult'
import { ComparisonStreamView } from '@/components/comparison/ComparisonStreamView'
import { EmptyState } from '@/components/ui/EmptyState'
import type { ComparisonResult as ComparisonResultType } from '@/types/comparison'
import { useLocation, useNavigate } from 'react-router-dom'

export function ComparisonResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result as ComparisonResultType | undefined
  const streaming = location.state?.streaming as boolean | undefined
  const toolIds = location.state?.toolIds as string[] | undefined
  const model = location.state?.model as string | undefined

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          ← Back to Tools
        </Button>
        <h1 className="text-2xl font-bold">Comparison Result</h1>
      </div>

      {streaming && toolIds ? (
        <ComparisonStreamView toolIds={toolIds} model={model} />
      ) : result ? (
        <ComparisonResult result={result} />
      ) : (
        <EmptyState
          title="No comparison result"
          description="Go back and select tools to compare."
        />
      )}
    </div>
  )
}
