import React from 'react'
import type { RadarQuadrant, RadarQuadrantId } from '@/types/radar'

interface RadarQuadrantsProps {
  quadrants: RadarQuadrant[]
  cx: number
  cy: number
  outerRadius: number
}

const LINE_COLOR = 'rgba(168, 85, 247, 0.2)'
const LABEL_COLOR = 'rgba(216, 180, 254, 1)'     // bright violet-300 — fully opaque for glow
/** Pixels between the outer ring edge and the label group centre */
const LABEL_GAP = 80

const ICON_SIZE = 16
const ICON_SCALE = ICON_SIZE / 24

function IconCode2({ transform }: { transform: string }) {
  return (
    <g transform={transform} fill="none" stroke={LABEL_COLOR} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18 22 12 16 6" />
      <path d="M8 6 2 12 8 18" />
    </g>
  )
}

function IconSearch({ transform }: { transform: string }) {
  return (
    <g transform={transform} fill="none" stroke={LABEL_COLOR} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </g>
  )
}

function IconBot({ transform }: { transform: string }) {
  return (
    <g transform={transform} fill="none" stroke={LABEL_COLOR} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </g>
  )
}

function IconPalette({ transform }: { transform: string }) {
  return (
    <g transform={transform} fill="none" stroke={LABEL_COLOR} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      <circle cx="13.5" cy="6.5" r="1" fill={LABEL_COLOR} stroke="none" />
      <circle cx="17.5" cy="10.5" r="1" fill={LABEL_COLOR} stroke="none" />
      <circle cx="8.5" cy="7.5" r="1" fill={LABEL_COLOR} stroke="none" />
      <circle cx="6.5" cy="12.5" r="1" fill={LABEL_COLOR} stroke="none" />
    </g>
  )
}

function QuadrantIcon({ id, cx: x, cy: y }: { id: RadarQuadrantId; cx: number; cy: number }) {
  // Translate so the 24×24 icon is centred at (x, y), then scale down to ICON_SIZE
  const transform = `translate(${x - ICON_SIZE / 2}, ${y - ICON_SIZE / 2}) scale(${ICON_SCALE})`
  switch (id) {
    case 'engineering': return <IconCode2 transform={transform} />
    case 'research':    return <IconSearch transform={transform} />
    case 'automation':  return <IconBot transform={transform} />
    case 'design':      return <IconPalette transform={transform} />
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Renders 2 divider lines (horizontal + vertical) and 4 quadrant labels
 * positioned *outside* the outermost ring, each with a matching icon and an
 * italic serif "flow" font for improved readability.
 */
const RadarQuadrants = React.memo(function RadarQuadrants({
  quadrants,
  cx,
  cy,
  outerRadius,
}: RadarQuadrantsProps) {
  const labelRadius = outerRadius + LABEL_GAP

  const labelPositions = quadrants.map((q) => {
    const midAngleDeg = (q.startAngle + q.endAngle) / 2
    const midAngleRad = (midAngleDeg * Math.PI) / 180
    return {
      ...q,
      lx: cx + labelRadius * Math.cos(midAngleRad),
      // SVG y-axis is inverted compared to mathematical convention
      ly: cy - labelRadius * Math.sin(midAngleRad),
    }
  })

  return (
    <g>
      {/* Glow filter for labels */}
      <defs>
        <filter id="glow-label" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Horizontal divider */}
      <line
        x1={cx - outerRadius}
        y1={cy}
        x2={cx + outerRadius}
        y2={cy}
        stroke={LINE_COLOR}
        strokeWidth={1}
      />
      {/* Vertical divider */}
      <line
        x1={cx}
        y1={cy - outerRadius}
        x2={cx}
        y2={cy + outerRadius}
        stroke={LINE_COLOR}
        strokeWidth={1}
      />
      {/* Quadrant labels — icon above, text below, glow on the whole group */}
      {labelPositions.map((q) => (
        <g key={q.id} style={{ userSelect: 'none' }} filter="url(#glow-label)">
          <QuadrantIcon id={q.id} cx={q.lx} cy={q.ly - 11} />
          <text
            x={q.lx}
            y={q.ly + 10}
            fill={LABEL_COLOR}
            fontSize={12}
            fontStyle="italic"
            fontFamily="Georgia, 'Palatino Linotype', Palatino, serif"
            fontWeight="300"
            letterSpacing={1.2}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {q.label}
          </text>
        </g>
      ))}
    </g>
  )
})

export { RadarQuadrants }
export default RadarQuadrants
