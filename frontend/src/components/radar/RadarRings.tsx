import React from 'react'
import type { RadarRing } from '@/types/radar'

interface RadarRingsProps {
  rings: RadarRing[]
  cx: number
  cy: number
  toPixelRadius: (r: number) => number
}

/**
 * Renders 4 concentric ring circles on the radar chart.
 * Receives resolved pixel coordinates from the parent RadarOverlay component,
 * which reads them via Recharts v3 hooks (useXAxisScale / useYAxisScale).
 */
const RadarRings = React.memo(function RadarRings({
  rings,
  cx,
  cy,
  toPixelRadius,
}: RadarRingsProps) {
  return (
    <g>
      <defs>
        {rings.map((ring) => (
          <filter key={`filter-${ring.id}`} id={`glow-ring-${ring.id}`}>
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={ring.color} />
          </filter>
        ))}
      </defs>
      {rings.map((ring) => {
        const r = toPixelRadius(ring.radius)
        return (
          <g key={ring.id}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={ring.color}
              fillOpacity={0.05}
              stroke={ring.color}
              strokeOpacity={0.3}
              filter={`url(#glow-ring-${ring.id})`}
            />
            {/* Ring label at 3 o'clock position */}
            <text
              x={cx + r + 4}
              y={cy}
              fill={ring.color}
              fontSize={10}
              dominantBaseline="middle"
              opacity={0.6}
              style={{ userSelect: 'none' }}
            >
              {ring.label}
            </text>
          </g>
        )
      })}
    </g>
  )
})

export { RadarRings }
export default RadarRings
