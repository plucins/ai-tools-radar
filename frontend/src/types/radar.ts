export type RadarRingId = 'core' | 'adopt' | 'trial' | 'watch'

export type RadarQuadrantId = 'engineering' | 'research' | 'automation' | 'design'

export interface RadarToolPoint {
  id: string
  name: string
  description: string
  x: number
  y: number
  ring: RadarRingId
  quadrant: RadarQuadrantId
  color: string
}

export interface RadarRing {
  id: RadarRingId
  label: string
  radius: number
  color: string
  description: string
}

export interface RadarQuadrant {
  id: RadarQuadrantId
  label: string
  startAngle: number
  endAngle: number
}

export interface RadarData {
  tools: RadarToolPoint[]
  rings: RadarRing[]
  quadrants: RadarQuadrant[]
}
