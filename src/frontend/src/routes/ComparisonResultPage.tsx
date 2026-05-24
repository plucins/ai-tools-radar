import { Button } from '@/components/ui/button'
import { ComparisonResult } from '@/components/comparison/ComparisonResult'
import { EmptyState } from '@/components/ui/EmptyState'
import type { ComparisonResult as ComparisonResultType } from '@/types/comparison'
import { useLocation, useNavigate } from 'react-router-dom'

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
        <EmptyState
          title="No comparison result"
          description="Go back and select tools to compare."
        />
      )}
    </div>
  )
}
