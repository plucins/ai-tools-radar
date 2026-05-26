import React from 'react'
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  useXAxisScale,
  useYAxisScale,
} from 'recharts'
import type { RadarToolPoint, RadarRing, RadarQuadrant } from '@/types/radar'
import { RadarRings } from './RadarRings'
import { RadarQuadrants } from './RadarQuadrants'
import { RadarBeam } from './RadarBeam'
import { RadarTooltip } from './RadarTooltip'
import { RadarPoints } from './RadarPoints'

interface RadarChartProps {
  tools: RadarToolPoint[]
  rings: RadarRing[]
  quadrants: RadarQuadrant[]
  onToolClick: (toolId: string) => void
}

/**
 * Resolves pixel coordinates from Recharts v3 axis scales and renders the
 * custom SVG overlay layers (rings, quadrants, beam) as direct chart children.
 *
 * In Recharts v3, <Customized> no longer injects chart context props — components
 * must use the provided hooks (useXAxisScale / useYAxisScale) instead.
 */
function RadarOverlay({
  rings,
  quadrants,
}: Pick<RadarChartProps, 'rings' | 'quadrants'>) {
  const xScale = useXAxisScale()
  const yScale = useYAxisScale()

  if (!xScale || !yScale) return null

  const cx = xScale(0) ?? 0
  const cy = yScale(0) ?? 0
  const toPixelRadius = (r: number) => Math.abs((xScale(r) ?? 0) - (xScale(0) ?? 0))

  return (
    <g>
      <RadarRings rings={rings} cx={cx} cy={cy} toPixelRadius={toPixelRadius} />
      <RadarQuadrants quadrants={quadrants} cx={cx} cy={cy} outerRadius={toPixelRadius(100)} />
      <RadarBeam cx={cx} cy={cy} outerRadius={toPixelRadius(100)} />
    </g>
  )
}

/**
 * Main radar chart component.
 * Composes Recharts primitives with custom SVG overlays (rings, quadrants, beam)
 * and a custom scatter shape (tool dots).
 *
 * onToolClick is closed over in the shape prop because Recharts only injects its
 * own props (cx, cy, payload, etc.) into shape renderers — custom callbacks must
 * come from the enclosing scope.
 */
const RadarChart = React.memo(function RadarChart({
  tools,
  rings,
  quadrants,
  onToolClick,
}: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" dataKey="x" domain={[-130, 130]} hide />
        <YAxis type="number" dataKey="y" domain={[-130, 130]} hide />
        <Tooltip content={<RadarTooltip rings={rings} />} />
        <RadarOverlay rings={rings} quadrants={quadrants} />
        <Scatter
          data={tools}
          fill="transparent"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          shape={(props: any) => <RadarPoints {...props} onToolClick={onToolClick} />}
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
})

export { RadarChart }
export default RadarChart
