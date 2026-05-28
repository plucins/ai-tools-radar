import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RadarLegend } from '../RadarLegend'
import type { RadarRing } from '@/types/radar'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li {...props}>{children}</li>,
  },
}))

const MOCK_RINGS: RadarRing[] = [
  { id: 'core', label: 'CORE', radius: 80, color: '#6366f1', description: 'In active use across our workflows' },
  { id: 'adopt', label: 'ADOPT', radius: 160, color: '#22c55e', description: 'Ready to adopt for new projects' },
  { id: 'trial', label: 'TRIAL', radius: 240, color: '#f59e0b', description: 'Worth trialling — some unknowns remain' },
  { id: 'watch', label: 'WATCH', radius: 320, color: '#94a3b8', description: 'Monitoring; not yet recommended' },
]

describe('RadarLegend', () => {
  it('renders exactly 4 ring items in CORE → WATCH order', () => {
    render(<RadarLegend rings={MOCK_RINGS} />)

    // Find all ring labels
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(4)

    // Verify order by checking label text order
    const labels = items.map((item) => item.textContent)
    expect(labels[0]).toContain('CORE')
    expect(labels[1]).toContain('ADOPT')
    expect(labels[2]).toContain('TRIAL')
    expect(labels[3]).toContain('WATCH')
  })

  it('shows a colored circle indicator matching each ring color', () => {
    render(<RadarLegend rings={MOCK_RINGS} />)

    // Each ring should have a color swatch with the ring's color as background
    const swatches = document.querySelectorAll('[data-ring-color]')
    expect(swatches).toHaveLength(4)

    expect((swatches[0] as HTMLElement).style.backgroundColor).toBe('rgb(99, 102, 241)') // #6366f1
    expect((swatches[1] as HTMLElement).style.backgroundColor).toBe('rgb(34, 197, 94)')  // #22c55e
    expect((swatches[2] as HTMLElement).style.backgroundColor).toBe('rgb(245, 158, 11)') // #f59e0b
    expect((swatches[3] as HTMLElement).style.backgroundColor).toBe('rgb(148, 163, 184)')// #94a3b8
  })

  it('shows a short description per ring item', () => {
    render(<RadarLegend rings={MOCK_RINGS} />)

    // Use getAllByText since mobile Sheet stub renders closed (no content) but desktop renders once
    expect(screen.getAllByText('In active use across our workflows').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Ready to adopt for new projects').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Worth trialling — some unknowns remain').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Monitoring; not yet recommended').length).toBeGreaterThanOrEqual(1)
  })

  it('renders a Sheet trigger button labelled "Legend" for the mobile drawer', () => {
    render(<RadarLegend rings={MOCK_RINGS} />)

    // The mobile section contains a SheetTrigger wrapping a <Button> with "Legend" text.
    // jsdom renders both desktop and mobile DOM regardless of CSS media queries,
    // so the trigger button is always present in the tree.
    const legendButtons = screen.getAllByRole('button', { name: /legend/i })
    expect(legendButtons.length).toBeGreaterThanOrEqual(1)
  })
})
