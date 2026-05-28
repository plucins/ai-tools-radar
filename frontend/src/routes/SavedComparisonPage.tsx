import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ComparisonResult } from '@/components/comparison/ComparisonResult'
import { api } from '@/lib/api'
import type { ComparisonResult as ComparisonResultType } from '@/types/comparison'

export function SavedComparisonPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<ComparisonResultType | null>(null)
  const [loading, setLoading] = useState(!id ? false : true)
  const [error, setError] = useState<string | null>(!id ? 'Invalid comparison ID' : null)

  useEffect(() => {
    if (!id) return

    let cancelled = false

    api.comparison.history
      .get(id)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load comparison')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/comparisons')}>
          ← Back to My Comparisons
        </Button>
        <h1 className="text-2xl font-bold">Saved Comparison</h1>
      </div>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="relative">
          <button
            onClick={() => setError(null)}
            className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && data && <ComparisonResult result={data} />}
    </div>
  )
}
