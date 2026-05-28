/**
 * RadarPage state tests — Group F (F.3)
 *
 * Covers gaps identified in F.2:
 *  1. Error state: API rejects → <Alert variant="destructive"> with message
 *  2. Empty state: API returns tools:[] → <EmptyState> fallback text
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import type { RadarData } from '@/types/radar'

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('@/lib/api', () => ({
  api: {
    radar: {
      get: vi.fn(),
    },
  },
}))

// Isolate RadarPage from the chart — Group C may run independently
vi.mock('@/components/radar/RadarChart', () => ({
  RadarChart: () => <div data-testid="radar-chart" />,
}))

// Framer Motion passthrough so animations do not break jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement('div', props, children),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) =>
      React.createElement('li', props, children),
  },
}))

import { api } from '@/lib/api'
import { RadarPage } from '../RadarPage'

// ── Fixtures ──────────────────────────────────────────────────────────────────

const BASE_RINGS: RadarData['rings'] = [
  { id: 'core',  label: 'CORE',  radius: 25,  color: '#A855F7', description: 'Actively used' },
  { id: 'adopt', label: 'ADOPT', radius: 50,  color: '#22C55E', description: 'Ready to adopt' },
  { id: 'trial', label: 'TRIAL', radius: 75,  color: '#3B82F6', description: 'Worth trialling' },
  { id: 'watch', label: 'WATCH', radius: 100, color: '#9CA3AF', description: 'Monitoring' },
]

const BASE_QUADRANTS: RadarData['quadrants'] = [
  { id: 'engineering', label: 'Engineering', startAngle: 0,   endAngle: 90  },
  { id: 'research',    label: 'Research',    startAngle: 90,  endAngle: 180 },
  { id: 'automation',  label: 'Automation',  startAngle: 180, endAngle: 270 },
  { id: 'design',      label: 'Design',      startAngle: 270, endAngle: 360 },
]

// ── Helper ────────────────────────────────────────────────────────────────────

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter initialEntries={['/radar']}>{ui}</MemoryRouter>)
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('RadarPage — error and empty states', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ── Test 1 ──────────────────────────────────────────────────────────────────
  it('renders a destructive alert with the error message when api.radar.get() rejects', async () => {
    // Arrange: API rejects with a meaningful error
    vi.mocked(api.radar.get).mockRejectedValue(new Error('Network request failed'))

    // Act
    renderWithRouter(<RadarPage />)

    // Assert: error alert appears with the correct message
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Network request failed')).toBeInTheDocument()
    })

    // Loading state should be gone
    expect(document.querySelectorAll('.animate-pulse').length).toBe(0)
  })

  // ── Test 2 ──────────────────────────────────────────────────────────────────
  it('renders fallback "Failed to load radar data" message when api.radar.get() rejects with a non-Error value', async () => {
    // Arrange: API rejects with a plain string (not an Error instance)
    vi.mocked(api.radar.get).mockRejectedValue('server unavailable')

    // Act
    renderWithRouter(<RadarPage />)

    // Assert: generic fallback message shown (RadarPage catches non-Error values)
    await waitFor(() => {
      expect(screen.getByText('Failed to load radar data')).toBeInTheDocument()
    })
  })

  // ── Test 3 ──────────────────────────────────────────────────────────────────
  it('renders EmptyState when api returns an empty tools array', async () => {
    // Arrange: API resolves but with zero tools
    const emptyData: RadarData = {
      tools: [],
      rings: BASE_RINGS,
      quadrants: BASE_QUADRANTS,
    }
    vi.mocked(api.radar.get).mockResolvedValue(emptyData)

    // Act
    renderWithRouter(<RadarPage />)

    // Assert: EmptyState title and description are displayed
    await waitFor(() => {
      expect(screen.getByText('No radar data available')).toBeInTheDocument()
      expect(
        screen.getByText('The radar has not been configured yet. Add tool profiles to get started.'),
      ).toBeInTheDocument()
    })

    // Chart should NOT be rendered
    expect(screen.queryByTestId('radar-chart')).not.toBeInTheDocument()
  })
})
