import { describe, it, expect, vi, beforeEach } from 'vitest'
import { expectTypeOf } from 'vitest'
import type { RadarToolPoint, RadarData, RadarRing, RadarQuadrant } from '../types/radar'
import { api } from '../lib/api'

// ---------------------------------------------------------------------------
// Type shape tests (compile-time assertions)
// ---------------------------------------------------------------------------

describe('RadarToolPoint interface shape', () => {
  it('satisfies required fields: id, name, x, y, ring, quadrant, color', () => {
    const point: RadarToolPoint = {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      description: 'AI pair programmer',
      x: 100,
      y: 200,
      ring: 'core',
      quadrant: 'engineering',
      color: '#A855F7',
    }

    expectTypeOf(point).toMatchTypeOf<RadarToolPoint>()
    expect(point.id).toBe('github-copilot')
    expect(point.name).toBe('GitHub Copilot')
    expect(point.x).toBeTypeOf('number')
    expect(point.y).toBeTypeOf('number')
    expect(point.ring).toBe('core')
    expect(point.quadrant).toBe('engineering')
    expect(point.color).toBe('#A855F7')
  })
})

describe('RadarData type structure', () => {
  it('contains all 3 arrays: tools, rings, quadrants', () => {
    const ring: RadarRing = {
      id: 'core',
      label: 'CORE',
      radius: 80,
      color: '#6366f1',
      description: 'In active use',
    }
    const quadrant: RadarQuadrant = {
      id: 'engineering',
      label: 'Engineering',
      startAngle: 0,
      endAngle: 90,
    }
    const tool: RadarToolPoint = {
      id: 'tool-1',
      name: 'Tool One',
      description: 'A tool',
      x: 10,
      y: 20,
      ring: 'adopt',
      quadrant: 'research',
      color: '#fff',
    }
    const data: RadarData = { tools: [tool], rings: [ring], quadrants: [quadrant] }

    expectTypeOf(data).toMatchTypeOf<RadarData>()
    expectTypeOf(data.tools).toMatchTypeOf<RadarToolPoint[]>()
    expectTypeOf(data.rings).toMatchTypeOf<RadarRing[]>()
    expectTypeOf(data.quadrants).toMatchTypeOf<RadarQuadrant[]>()
    expect(Array.isArray(data.tools)).toBe(true)
    expect(Array.isArray(data.rings)).toBe(true)
    expect(Array.isArray(data.quadrants)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// API client tests (runtime assertions with mocked fetch)
// ---------------------------------------------------------------------------

const mockRadarData: RadarData = {
  tools: [
    {
      id: 'copilot',
      name: 'GitHub Copilot',
      description: 'AI coding assistant',
      x: 150,
      y: 200,
      ring: 'core',
      quadrant: 'engineering',
      color: '#A855F7',
    },
  ],
  rings: [
    { id: 'core', label: 'CORE', radius: 80, color: '#6366f1', description: 'Actively used' },
  ],
  quadrants: [
    { id: 'engineering', label: 'Engineering', startAngle: 0, endAngle: 90 },
  ],
}

function makeFetchMock(data: RadarData) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({ data, timestamp: '2024-01-01T00:00:00Z' }),
    text: vi.fn().mockResolvedValue(''),
  })
}

describe('api.radar.get()', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('resolves to RadarData from a valid fixture response', async () => {
    vi.stubGlobal('fetch', makeFetchMock(mockRadarData))

    const result = await api.radar.get()

    expect(result).toEqual(mockRadarData)
    expectTypeOf(result).toMatchTypeOf<RadarData>()
  })

  it('calls the /radar path on the base URL', async () => {
    const fetchMock = makeFetchMock(mockRadarData)
    vi.stubGlobal('fetch', fetchMock)

    await api.radar.get()

    expect(fetchMock).toHaveBeenCalledOnce()
    const calledUrl: string = fetchMock.mock.calls[0][0] as string
    expect(calledUrl).toMatch(/\/radar$/)
  })
})
