import type { ComparisonRequest, ComparisonResult } from '@/types/comparison'
import type { Tool } from '@/types/tool'
import { API_BASE_URL } from './config'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `HTTP ${response.status}`)
  }

  return (await response.json()) as T
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
  },
}
