import React from 'react'
import type { RadarToolPoint, RadarRing } from '@/types/radar'

interface RadarTooltipPayloadItem {
  payload: RadarToolPoint
}

interface RadarTooltipProps {
  /** Injected by Recharts Tooltip */
  active?: boolean
  /** Injected by Recharts Tooltip */
  payload?: RadarTooltipPayloadItem[]
  /** Ring metadata for badge colors and labels; pass via content={<RadarTooltip rings={rings} />} */
  rings?: RadarRing[]
  /** Optional tap handler for mobile navigation */
  onMobileTap?: (toolId: string) => void
}

/**
 * Custom Recharts Tooltip content for the radar chart.
 * Renders a glassmorphic card with tool name, ring badge, quadrant, and description.
 */
const RadarTooltip = React.memo(function RadarTooltip({
  active,
  payload,
  rings = [],
  onMobileTap,
}: RadarTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const tool = payload[0].payload
  const ring = rings.find((r) => r.id === tool.ring)

  return (
    <div
      className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-[var(--radius)] p-3"
      onTouchEnd={onMobileTap ? () => onMobileTap(tool.id) : undefined}
    >
      {/* Tool name */}
      <p className="font-bold text-sm leading-tight">{tool.name}</p>

      {/* Ring badge */}
      {ring && (
        <div className="flex items-center gap-1 mt-1">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: ring.color }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium" style={{ color: ring.color }}>
            {ring.label}
          </span>
        </div>
      )}

      {/* Quadrant label */}
      <p className="text-xs text-muted-foreground mt-1">{tool.quadrant}</p>

      {/* 1-line description */}
      <p className="text-xs mt-1 line-clamp-1 text-foreground/70">{tool.description}</p>
    </div>
  )
})

export { RadarTooltip }
export default RadarTooltip
