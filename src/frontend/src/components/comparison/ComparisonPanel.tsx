import { CheckCircle2, Lock, Loader2, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ComparisonStage = null | 'gathering' | 'comparing' | 'generating'

interface ComparisonPanelProps {
  selectedCount: number
  loading: boolean
  stage: ComparisonStage
  onCompare: () => void
}

const STAGES: Array<{ key: NonNullable<ComparisonStage>; label: string }> = [
  { key: 'gathering', label: 'Gathering metadata' },
  { key: 'comparing', label: 'Comparing features' },
  { key: 'generating', label: 'Generating summary' },
]

const STAGE_ORDER: Record<NonNullable<ComparisonStage>, number> = {
  gathering: 0,
  comparing: 1,
  generating: 2,
}

function getProgressWidth(stage: ComparisonStage): string {
  if (stage === 'gathering') return 'w-1/3'
  if (stage === 'comparing') return 'w-2/3'
  if (stage === 'generating') return 'w-full'
  return 'w-0'
}

export function ComparisonPanel({ selectedCount, loading, stage, onCompare }: ComparisonPanelProps) {
  // State C: loading / in-progress
  if (loading) {
    const currentStageIndex = stage !== null ? STAGE_ORDER[stage] : -1

    return (
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/40 p-10 backdrop-blur-sm shadow-[0_0_80px_hsl(var(--primary)/0.2)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center gap-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
          <p className="text-lg font-semibold text-foreground">Comparing tools…</p>

          {/* Progress bar */}
          <div className="h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                'h-full rounded-full bg-primary transition-all duration-500 ease-out',
                getProgressWidth(stage),
              )}
            />
          </div>

          {/* Stage indicators */}
          <div className="flex items-center justify-center gap-8">
            {STAGES.map(({ key, label }, idx) => {
              const isDone = currentStageIndex > idx
              const isActive = currentStageIndex === idx
              return (
                <div key={key} className="flex items-center gap-1.5 text-xs">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : isActive ? (
                    <span className="animate-pulse text-primary">●</span>
                  ) : (
                    <span className="text-muted-foreground">○</span>
                  )}
                  <span
                    className={cn(
                      isDone ? 'text-green-500' : isActive ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          <Button disabled className="h-14 w-full max-w-xs rounded-full opacity-60">
            Comparing…
          </Button>
        </div>
      </div>
    )
  }

  // State A: not enough tools selected
  if (selectedCount < 2) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-border/30 bg-card/20 p-10 opacity-50">
        <div className="flex flex-col items-center gap-4 text-center">
          <Zap className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-xl font-bold text-foreground">Ready to compare?</p>
          <p className="text-sm text-muted-foreground">Select at least 2 tools to start comparing.</p>
          <Button
            disabled
            className="h-14 w-full max-w-xs rounded-full bg-primary/40 font-semibold text-primary-foreground"
          >
            <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
            Start Comparing
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Private &amp; Local • Powered by Ollama
          </p>
        </div>
      </div>
    )
  }

  // State B: ready to compare
  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/40 p-10 backdrop-blur-sm shadow-[0_0_80px_hsl(var(--primary)/0.2)]">
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-5 text-center">
        <Zap className="h-8 w-8 text-primary" aria-hidden="true" />
        <div className="space-y-2">
          <p className="text-2xl font-bold text-foreground">Ready to compare?</p>
          {selectedCount === 5 ? (
            <p className="text-sm text-muted-foreground">
              5 tools selected — slots full. Remove a tool to swap.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Our local LLM will analyze the selected tools and provide a structured comparison.
            </p>
          )}
        </div>
        <button
          onClick={onCompare}
          className="flex h-14 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-blue-600 px-8 font-semibold text-white shadow-[0_0_40px_hsl(var(--primary)/0.45)] transition-all hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] hover:scale-105 active:scale-100"
          aria-label="Start AI comparison"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Start Comparing
        </button>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Private &amp; Local • Powered by Ollama
        </p>
      </div>
    </div>
  )
}
