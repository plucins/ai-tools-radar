import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RadarTooltip } from '../RadarTooltip'
import type { RadarToolPoint, RadarRing } from '@/types/radar'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockTool: RadarToolPoint = {
  id: 'github-copilot',
  name: 'GitHub Copilot',
  description: 'AI pair programmer that speeds up code authoring.',
  x: 40,
  y: 40,
  ring: 'core',
  quadrant: 'engineering',
  color: '#A855F7',
}

const mockRings: RadarRing[] = [
  { id: 'core',  label: 'CORE',  radius: 25,  color: '#6366f1', description: 'In active use' },
  { id: 'adopt', label: 'ADOPT', radius: 50,  color: '#8b5cf6', description: 'Recommended' },
  { id: 'trial', label: 'TRIAL', radius: 75,  color: '#a78bfa', description: 'Worth exploring' },
  { id: 'watch', label: 'WATCH', radius: 100, color: '#c4b5fd', description: 'Keep an eye on' },
]

// ---------------------------------------------------------------------------
// RadarTooltip tests
// ---------------------------------------------------------------------------

describe('RadarTooltip', () => {
  it('renders tool name, ring badge, quadrant label, and description when active=true', () => {
    // Arrange
    const payload = [{ payload: mockTool }]

    // Act
    const { getByText } = render(
      <RadarTooltip active={true} payload={payload} rings={mockRings} />
    )

    // Assert — all four pieces of content should be visible
    expect(getByText('GitHub Copilot')).toBeTruthy()          // tool name
    expect(getByText('CORE')).toBeTruthy()                    // ring badge label
    expect(getByText('engineering')).toBeTruthy()             // quadrant label
    expect(getByText(/AI pair programmer/)).toBeTruthy()       // description (partial match)
  })

  it('returns null when active is false', () => {
    // Arrange
    const payload = [{ payload: mockTool }]

    // Act
    const { container } = render(
      <RadarTooltip active={false} payload={payload} rings={mockRings} />
    )

    // Assert
    expect(container.firstChild).toBeNull()
  })

  it('returns null when payload is empty', () => {
    // Arrange & Act
    const { container } = render(
      <RadarTooltip active={true} payload={[]} rings={mockRings} />
    )

    // Assert
    expect(container.firstChild).toBeNull()
  })
})
