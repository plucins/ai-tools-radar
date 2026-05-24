import { CheckCircle2, Loader2, Sparkles } from 'lucide-react'
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
      <div className="border border-primary/30 bg-primary/10 rounded-xl p-5 shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <p className="text-sm font-medium">Comparing tools...</p>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-muted mb-4 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full bg-primary transition-all duration-500 ease-out',
              getProgressWidth(stage),
            )}
          />
        </div>

        {/* Stage indicators */}
        <div className="flex items-center justify-between mb-4">
          {STAGES.map(({ key, label }, idx) => {
            const isDone = currentStageIndex > idx
            const isActive = currentStageIndex === idx
            return (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : isActive ? (
                  <span className="text-primary animate-pulse">●</span>
                ) : (
                  <span className="text-muted-foreground">○</span>
                )}
                <span
                  className={cn(
                    isDone
                      ? 'text-green-500'
                      : isActive
                        ? 'text-primary'
                        : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>

        <Button disabled className="w-full">
          Comparing...
        </Button>
      </div>
    )
  }

  // State A: not enough tools selected
  if (selectedCount < 2) {
    return (
      <div className="border border-border/30 bg-secondary/20 rounded-xl p-5 opacity-50">
        <p className="text-sm text-muted-foreground mb-4">
          Select at least 2 tools to start comparing
        </p>
        <Button disabled>Start Comparing</Button>
      </div>
    )
  }

  // State B: ready to compare
  return (
    <div className="border border-primary/30 bg-primary/10 rounded-xl p-5 shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm font-medium">
            {selectedCount} tools selected · Ready for AI analysis
          </p>
          {selectedCount === 5 && (
            <p className="text-xs text-muted-foreground mt-1">
              Slots full — remove a tool to add another
            </p>
          )}
        </div>
      </div>
      <Button size="lg" onClick={onCompare} className="w-full">
        Start Comparing
      </Button>
    </div>
  )
}
