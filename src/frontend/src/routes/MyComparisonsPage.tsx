import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { History, X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { api } from '@/lib/api'
import type { SavedComparisonMeta } from '@/types/comparison'

export function MyComparisonsPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<SavedComparisonMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    api.comparison.history
      .list()
      .then((list) => {
        if (!cancelled) setData(list)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load comparisons')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <History className="h-6 w-6 text-primary" aria-hidden="true" />
        <h1 className="text-2xl font-bold">My Comparisons</h1>
      </div>

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

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <EmptyState
          title="No saved comparisons"
          description="Run a comparison to see it saved here."
        />
      )}

      {!loading && data.length > 0 && (
        <AnimatePresence mode="popLayout">
          {data.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15 }}
              onClick={() => navigate(`/comparisons/${item.id}`)}
              className="cursor-pointer rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.05)] hover:border-primary/30 hover:bg-card/80 transition-colors"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {item.tools.map((tool) => (
                  <Badge key={tool} className="border border-primary/30 bg-primary/15 text-primary">
                    {tool}
                  </Badge>
                ))}
                {item.model && (
                  <Badge className="bg-secondary text-secondary-foreground rounded-full">
                    {item.model}
                  </Badge>
                )}
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                {new Date(item.generatedAt).toLocaleString()}
              </p>
              {item.summary && (
                <p className="line-clamp-2 text-sm text-foreground/80">{item.summary}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}
