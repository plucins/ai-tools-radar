import type { ComparisonRequest, ComparisonResult, ComparisonStreamEvent, SavedComparisonMeta } from '@/types/comparison'
import type { Tool } from '@/types/tool'
import type { ModelListResponse } from '@/types/model'
import type { RadarData } from '@/types/radar'
import { API_BASE_URL } from './config'

interface ApiEnvelope<T> {
  data: T
  timestamp: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `HTTP ${response.status}`)
  }

  const envelope = (await response.json()) as ApiEnvelope<T>
  return envelope.data
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  tools: {
    list: () => request<Tool[]>('/tools'),
    get: (id: string) => request<Tool>(`/tools/${id}`),
  },
  comparison: {
    compare: (body: ComparisonRequest) =>
      request<ComparisonResult>('/comparison', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    stream: (body: ComparisonRequest): ReadableStream<ComparisonStreamEvent> => {
      let ctrl: ReadableStreamDefaultController<ComparisonStreamEvent>
      const readable = new ReadableStream<ComparisonStreamEvent>({
        start(c) { ctrl = c },
      })

      void fetch(`${API_BASE_URL}/comparison/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (!res.ok || !res.body) {
          ctrl.error(new Error(`HTTP ${res.status}`))
          return
        }
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const event = JSON.parse(line.slice(6)) as ComparisonStreamEvent
              ctrl.enqueue(event)
              if (event.type === 'done' || event.type === 'error') {
                ctrl.close()
                return
              }
            } catch { /* skip malformed lines */ }
          }
        }
        ctrl.close()
      }).catch((err: unknown) => ctrl.error(err))

      return readable
    },
    history: {
      list: () => request<SavedComparisonMeta[]>('/comparison/history'),
      get: (id: string) => request<ComparisonResult>(`/comparison/history/${id}`),
    },
  },
  models: {
    list: () => request<ModelListResponse>('/models'),
  },
  radar: {
    get: (options?: RequestInit) => request<RadarData>('/radar', options),
  },
}
