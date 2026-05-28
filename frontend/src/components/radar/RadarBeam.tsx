import React from 'react'

interface RadarBeamProps {
  cx: number
  cy: number
  outerRadius: number
}

const BEAM_GRADIENT_ID = 'radar-beam-gradient'

/**
 * Animating radar sweep beam.
 * pointer-events: none ensures clicks pass through to tool points below.
 * Receives resolved pixel coordinates from the parent RadarOverlay component,
 * which reads them via Recharts v3 hooks (useXAxisScale / useYAxisScale).
 */
const RadarBeam = React.memo(function RadarBeam({ cx, cy, outerRadius }: RadarBeamProps) {
  return (
    <g
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: 'radar-scan 4s linear infinite',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @keyframes radar-scan {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <defs>
        <linearGradient
          id={BEAM_GRADIENT_ID}
          gradientUnits="userSpaceOnUse"
          x1={cx}
          y1={cy}
          x2={cx + outerRadius}
          y2={cy}
        >
          <stop offset="0%"   stopColor="rgba(168,85,247,0.6)" />
          <stop offset="100%" stopColor="rgba(168,85,247,0)"   />
        </linearGradient>
      </defs>
      <line
        x1={cx}
        y1={cy}
        x2={cx + outerRadius}
        y2={cy}
        stroke={`url(#${BEAM_GRADIENT_ID})`}
        strokeWidth={2}
        style={{ pointerEvents: 'none' }}
      />
    </g>
  )
})

export { RadarBeam }
export default RadarBeam
