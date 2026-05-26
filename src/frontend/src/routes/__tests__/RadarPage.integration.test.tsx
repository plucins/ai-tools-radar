/**
 * Integration tests for RadarPage (Group E — E.1)
 *
 * Three focused tests:
 *  1. api.radar.get() called exactly once on mount
 *  2. Clicking tool point navigates to /catalog/<id>
 *  3. RadarBeam <g> element has CSS animation referencing radar-scan keyframe
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import type { RadarData } from '@/types/radar'

// ── Fixture data ─────────────────────────────────────────────────────────────

const FIXTURE: RadarData = {
  tools: [
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      description: 'AI coding assistant',
      x: 60,
      y: 60,
      ring: 'core',
      quadrant: 'engineering',
      color: '#A855F7',
    },
  ],
  rings: [
    { id: 'core',  label: 'CORE',  radius: 80,  color: '#6366f1', description: 'Actively used' },
    { id: 'adopt', label: 'ADOPT', radius: 160, color: '#22c55e', description: 'Ready to adopt' },
    { id: 'trial', label: 'TRIAL', radius: 240, color: '#f59e0b', description: 'Worth trialling' },
    { id: 'watch', label: 'WATCH', radius: 320, color: '#94a3b8', description: 'Monitoring' },
  ],
  quadrants: [
    { id: 'engineering', label: 'Engineering', startAngle: 0,   endAngle: 90  },
    { id: 'research',    label: 'Research',    startAngle: 90,  endAngle: 180 },
    { id: 'automation',  label: 'Automation',  startAngle: 180, endAngle: 270 },
    { id: 'design',      label: 'Design',      startAngle: 270, endAngle: 360 },
  ],
}

// ── Mocks ─────────────────────────────────────────────────────────────────────

// Mock api module so we never hit the network
vi.mock('@/lib/api', () => ({
  api: {
    radar: {
      get: vi.fn(),
    },
  },
}))

vi.mock('@/components/radar/RadarChart', () => ({
  RadarChart: ({ onToolClick }: { onToolClick: (id: string) => void }) => (
    <button data-testid="radar-chart-click" onClick={() => onToolClick('github-copilot')}>
      tool-point
    </button>
  ),
}))

// Framer Motion passthrough so animations don't break jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement('div', props, children),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) =>
      React.createElement('li', props, children),
  },
}))

// Capture navigate calls
const navigateMock = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

import { api } from '@/lib/api'
import { RadarPage } from '../RadarPage'
import { RadarBeam } from '@/components/radar/RadarBeam'

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter initialEntries={['/radar']}>{ui}</MemoryRouter>)
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('RadarPage integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(api.radar.get).mockResolvedValue(FIXTURE)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ── Test 1 ──────────────────────────────────────────────────────────────────
  it('calls api.radar.get() exactly once on mount (no duplicate calls)', async () => {
    // Arrange + Act
    renderWithRouter(<RadarPage />)

    // Wait for data to load (chart renders when data arrives)
    await waitFor(() => {
      expect(screen.getByTestId('radar-chart-click')).toBeInTheDocument()
    })

    // Assert: exactly one API call
    expect(api.radar.get).toHaveBeenCalledTimes(1)
  })

  // ── Test 2 ──────────────────────────────────────────────────────────────────
  it('clicking a tool point navigates to /catalog/<id>', async () => {
    const user = userEvent.setup()

    // Arrange + Act
    renderWithRouter(<RadarPage />)

    await waitFor(() => {
      expect(screen.getByTestId('radar-chart-click')).toBeInTheDocument()
    })

    // Click the mocked tool-point button which calls onToolClick('github-copilot')
    await user.click(screen.getByTestId('radar-chart-click'))

    // Assert: navigate was called with the correct route
    expect(navigateMock).toHaveBeenCalledWith('/catalog/github-copilot')
    expect(navigateMock).toHaveBeenCalledTimes(1)
  })

  // ── Test 3 ──────────────────────────────────────────────────────────────────
  it('RadarBeam <g> element carries CSS animation referencing a spin/rotation keyframe', () => {
    // Render RadarBeam directly inside an SVG (required for SVG element rendering in jsdom)
    const { container } = render(
      <svg>
        <RadarBeam cx={200} cy={200} outerRadius={180} />
      </svg>,
    )

    // Find the <g> element — it is the animated wrapper
    const gEl = container.querySelector('g')
    expect(gEl).not.toBeNull()

    // The animation style references 'radar-scan' — a CSS keyframe that rotates 360°
    const animationStyle = gEl!.style.animation
    expect(animationStyle).toBeTruthy()
    expect(animationStyle).toMatch(/radar-scan/)

    // Also assert pointer-events: none so clicks pass through to tool points
    expect(gEl!.style.pointerEvents).toBe('none')
  })
})
