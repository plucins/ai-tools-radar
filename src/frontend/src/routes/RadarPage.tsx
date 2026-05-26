import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/EmptyState'
// RadarChart is implemented by Group C (parallel). It may not exist yet at author time —
// mock it via `vi.mock('@/components/radar/RadarChart')` in tests.
import { RadarChart } from '@/components/radar/RadarChart'
import { RadarLegend } from '@/components/radar/RadarLegend'
import { api } from '@/lib/api'
import type { RadarData } from '@/types/radar'

export function RadarPage() {
  const [data, setData] = useState<RadarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    api.radar
      .get({ signal: controller.signal })
      .then((radarData) => {
        setData(radarData)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Failed to load radar data')
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  function handleToolClick(toolId: string): void {
    navigate(`/catalog/${toolId}`)
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <Skeleton className="h-[500px] w-full rounded-2xl" />
        <div className="flex gap-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  // ── Empty ────────────────────────────────────────────────────────────────
  if (!data || data.tools.length === 0) {
    return (
      <div className="p-6">
        <EmptyState
          title="No radar data available"
          description="The radar has not been configured yet. Add tool profiles to get started."
        />
      </div>
    )
  }

  // ── Success ──────────────────────────────────────────────────────────────
  return (
    <motion.div
      // h-[calc] accounts for MainContent's p-4 (32px) + main's p-10 (80px) + own py-4 (32px)
      className="flex flex-col lg:flex-row gap-4 px-6 py-4 overflow-hidden h-[calc(100vh-124px)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop: legend left sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-[22%] min-h-0 overflow-auto">
        <RadarLegend rings={data.rings} />
      </div>

      {/* Chart — centred square that fits both dimensions.
           height: 100% anchors to the flex cross-axis; aspect-ratio: 1 derives
           an equal width; max-width: 100% prevents overflow when the container
           is narrower than it is tall (responsive / mobile). */}
      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden shadow-[0_0_80px_hsl(var(--primary)/0.2)]">
        <div style={{ height: '100%', aspectRatio: '1', maxWidth: '100%' }}>
          <RadarChart
            tools={data.tools}
            rings={data.rings}
            quadrants={data.quadrants}
            onToolClick={handleToolClick}
          />
        </div>
      </div>

      {/* Tablet/mobile: legend below chart */}
      <div className="block lg:hidden shrink-0">
        <RadarLegend rings={data.rings} />
      </div>
    </motion.div>
  )
}
