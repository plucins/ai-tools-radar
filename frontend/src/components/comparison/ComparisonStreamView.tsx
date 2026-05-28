import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ComparisonResult } from '@/components/comparison/ComparisonResult'
import { api } from '@/lib/api'
import type { ComparisonRequest, ComparisonResult as ComparisonResultType } from '@/types/comparison'
import type { ModelParams } from '@/components/comparison/ModelParamsPopover'

interface ComparisonStreamViewProps {
  toolIds: string[]
  model?: string
  modelParams?: ModelParams
}

export function ComparisonStreamView({ toolIds, model, modelParams }: ComparisonStreamViewProps) {
  const [rawText, setRawText] = useState('')
  const [result, setResult] = useState<ComparisonResultType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const body: ComparisonRequest = { toolIds, model, ...modelParams }
    const stream = api.comparison.stream(body)
    const reader = stream.getReader()
    let cancelled = false

    async function read() {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done || cancelled) break
          if (value.type === 'token') {
            setRawText((prev) => prev + value.text)
          } else if (value.type === 'done') {
            setResult(value.result)
            break
          } else if (value.type === 'error') {
            setError(value.message)
            break
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Stream failed')
        }
      }
    }

    void read()
    return () => {
      cancelled = true
      void reader.cancel()
    }
  }, [toolIds, model, modelParams])

  // Auto-scroll to bottom while streaming
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [rawText])

  if (error) {
    return (
      <Alert variant="destructive" className="relative">
        <button
          onClick={() => setError(null)}
          className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (result) {
    return <ComparisonResult result={result} />
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
        Generating comparison…
      </div>
      <pre
        ref={scrollRef}
        className="max-h-[60vh] overflow-y-auto rounded-xl border border-border/40 bg-card/40 p-4 font-mono text-xs leading-relaxed text-muted-foreground backdrop-blur-sm"
      >
        {rawText}
        <span className="animate-pulse text-primary">▋</span>
      </pre>
    </div>
  )
}
