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
 * Renders a glowing, hoverable dot with a name label for each tool on the radar.
 *
 * Usage in RadarChart:
 *   shape={(props) => <RadarPoints {...props} onToolClick={onToolClick} />}
 */
function RadarPoints({ cx = 0, cy = 0, payload, onToolClick }: RadarPointsProps) {
  if (!payload) return null

  return (
    <motion.g
      style={{ cursor: 'pointer' }}
      tabIndex={0}
      role="button"
      aria-label={`${payload.name}, ${payload.ring} ring`}
      whileHover={{ scale: 1.2 }}
      onClick={() => onToolClick(payload.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToolClick(payload.id)
        }
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={payload.color}
        style={{ filter: `drop-shadow(0 0 6px ${payload.color})` }}
      />
      <text
        x={cx + 9}
        y={cy + 1}
        fill={payload.color}
        fontSize={9}
        fontFamily="ui-monospace, 'Cascadia Code', monospace"
        letterSpacing={0.3}
        dominantBaseline="middle"
        style={{
          userSelect: 'none',
          filter: `drop-shadow(0 0 4px ${payload.color})`,
          opacity: 0.9,
        }}
      >
        {payload.name}
      </text>
    </motion.g>
  )
}

export { RadarPoints }
export default RadarPoints
