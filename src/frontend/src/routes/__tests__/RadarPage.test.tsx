import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { RadarData } from '@/types/radar'

// Mock the API module
vi.mock('@/lib/api', () => ({
  api: {
    radar: {
      get: vi.fn(),
    },
  },
}))

// Mock RadarChart — Group C runs in parallel; it may not exist yet
vi.mock('@/components/radar/RadarChart', () => ({
  RadarChart: () => <div data-testid="radar-chart" />,
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li {...props}>{children}</li>,
  },
}))

import { api } from '@/lib/api'
import { RadarPage } from '../RadarPage'

const FIXTURE: RadarData = {
  tools: [
    {
      id: 'copilot',
      name: 'GitHub Copilot',
      description: 'AI coding assistant',
      x: 100,
      y: 100,
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

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter initialEntries={['/radar']}>{ui}</MemoryRouter>)
}

describe('RadarPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders loading skeleton while data is fetching', () => {
    // Arrange: return a never-resolving promise to keep loading state
    vi.mocked(api.radar.get).mockReturnValue(new Promise(() => {}))

    // Act
    renderWithRouter(<RadarPage />)

    // Assert: loading skeleton is present (Skeleton renders divs with animate-pulse class)
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders RadarChart after successful data fetch', async () => {
    // Arrange
    vi.mocked(api.radar.get).mockResolvedValue(FIXTURE)

    // Act
    renderWithRouter(<RadarPage />)

    // Assert: wait for chart to appear
    await waitFor(() => {
      expect(screen.getByTestId('radar-chart')).toBeInTheDocument()
    })
  })
})
