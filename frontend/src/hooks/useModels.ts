import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { ModelInfo } from '@/types/model'

interface UseModelsResult {
  models: ModelInfo[]
  loading: boolean
  error: string | null
}

export function useModels(): UseModelsResult {
  const [models, setModels] = useState<ModelInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchModels() {
      setLoading(true)
      setError(null)
      try {
        const response = await api.models.list()
        if (!cancelled) {
          setModels(response.data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load models')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void fetchModels()

    return () => {
      cancelled = true
    }
  }, [])

  return { models, loading, error }
}
