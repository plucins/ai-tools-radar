import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RadarRings } from '../RadarRings'
import { RadarQuadrants } from '../RadarQuadrants'
import type { RadarRing, RadarQuadrant } from '@/types/radar'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockRings: RadarRing[] = [
  { id: 'core',  label: 'CORE',  radius: 25,  color: '#6366f1', description: 'In active use' },
  { id: 'adopt', label: 'ADOPT', radius: 50,  color: '#8b5cf6', description: 'Recommended' },
  { id: 'trial', label: 'TRIAL', radius: 75,  color: '#a78bfa', description: 'Worth exploring' },
  { id: 'watch', label: 'WATCH', radius: 100, color: '#c4b5fd', description: 'Keep an eye on' },
]

const mockQuadrants: RadarQuadrant[] = [
  { id: 'engineering', label: 'Engineering', startAngle: 0,   endAngle: 90  },
  { id: 'research',    label: 'Research',    startAngle: 90,  endAngle: 180 },
  { id: 'automation',  label: 'Automation',  startAngle: 180, endAngle: 270 },
  { id: 'design',      label: 'Design',      startAngle: 270, endAngle: 360 },
]

// ---------------------------------------------------------------------------
// RadarRings tests
// ---------------------------------------------------------------------------

describe('RadarRings', () => {
  it('renders exactly 4 <circle> elements when given 4 rings', () => {
    // Arrange
    const { container } = render(
      <svg>
        <RadarRings rings={mockRings} cx={200} cy={200} toPixelRadius={(r) => r * 1.8} />
      </svg>
    )

    // Act
    const circles = container.querySelectorAll('circle')

    // Assert
    expect(circles).toHaveLength(4)
  })

  it('applies correct stroke color per ring', () => {
    // Arrange
    const { container } = render(
      <svg>
        <RadarRings rings={mockRings} cx={200} cy={200} toPixelRadius={(r) => r * 1.8} />
      </svg>
    )

    // Act
    const circles = Array.from(container.querySelectorAll('circle'))

    // Assert — each circle's stroke attribute matches the corresponding ring color
    mockRings.forEach((ring, i) => {
      expect(circles[i].getAttribute('stroke')).toBe(ring.color)
    })
  })
})

// ---------------------------------------------------------------------------
// RadarQuadrants tests
// ---------------------------------------------------------------------------

describe('RadarQuadrants', () => {
  it('renders 2 divider lines through origin (vertical + horizontal)', () => {
    // Arrange
    const { container } = render(
      <svg>
        <RadarQuadrants quadrants={mockQuadrants} cx={200} cy={200} outerRadius={180} />
      </svg>
    )

    // Act
    const lines = container.querySelectorAll('line')

    // Assert
    expect(lines).toHaveLength(2)
  })
})
