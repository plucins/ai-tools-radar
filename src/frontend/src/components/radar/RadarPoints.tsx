import { motion } from 'framer-motion'
import type { RadarToolPoint } from '@/types/radar'

interface RadarPointsProps {
  /** Injected by Recharts Scatter shape renderer */
  cx?: number
  cy?: number
  payload?: RadarToolPoint
  /** Closed-over callback — Recharts only injects its own props; pass via closure in shape prop */
  onToolClick: (toolId: string) => void
}

/**
 * Custom shape renderer for Recharts <Scatter shape={...} />.
 * Renders a glowing, hoverable dot for each tool on the radar.
 *
 * Usage in RadarChart:
 *   shape={(props) => <RadarPoints {...props} onToolClick={onToolClick} />}
 */
function RadarPoints({ cx = 0, cy = 0, payload, onToolClick }: RadarPointsProps) {
  if (!payload) return null

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={5}
      fill={payload.color}
      style={{
        cursor: 'pointer',
        filter: `drop-shadow(0 0 6px ${payload.color})`,
      }}
      tabIndex={0}
      role="button"
      aria-label={`${payload.name}, ${payload.ring} ring`}
      whileHover={{ scale: 1.4 }}
      onClick={() => onToolClick(payload.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToolClick(payload.id)
        }
      }}
    />
  )
}

export { RadarPoints }
export default RadarPoints
