import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { RadarBeam } from '../RadarBeam'
import { RadarPoints } from '../RadarPoints'
import type { RadarToolPoint } from '@/types/radar'

// ---------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------

const mockTool: RadarToolPoint = {
  id: 'github-copilot',
  name: 'GitHub Copilot',
  description: 'AI pair programmer',
  x: 40,
  y: 40,
  ring: 'core',
  quadrant: 'engineering',
  color: '#A855F7',
}

// ---------------------------------------------------------------------------
// RadarBeam tests
// ---------------------------------------------------------------------------

describe('RadarBeam', () => {
  it('renders with pointer-events: none so tool clicks are not blocked', () => {
    // Arrange
    const { container } = render(
      <svg>
        <RadarBeam cx={200} cy={200} outerRadius={180} />
      </svg>
    )

    // Act — the outermost <g> element rendered by RadarBeam carries the style
    const beamGroup = container.querySelector('g')

    // Assert
    expect(beamGroup).toBeTruthy()
    expect(beamGroup!.style.pointerEvents).toBe('none')
  })
})

// ---------------------------------------------------------------------------
// RadarPoints tests
// ---------------------------------------------------------------------------

describe('RadarPoints', () => {
  it('calls onToolClick with correct toolId when clicked', () => {
    // Arrange
    const onToolClick = vi.fn()
    const { container } = render(
      <svg>
        <RadarPoints cx={100} cy={100} payload={mockTool} onToolClick={onToolClick} />
      </svg>
    )

    // Act
    const circle = container.querySelector('circle')
    expect(circle).toBeTruthy()
    fireEvent.click(circle!)

    // Assert
    expect(onToolClick).toHaveBeenCalledOnce()
    expect(onToolClick).toHaveBeenCalledWith('github-copilot')
  })
})
