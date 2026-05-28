import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ToolSummary } from '@/types/comparison'

interface ToolSummaryCardProps {
  summary: ToolSummary
}

export function ToolSummaryCard({ summary }: ToolSummaryCardProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-border/50 rounded-2xl">
      <CardHeader>
        <CardTitle>{summary.toolName}</CardTitle>
      </CardHeader>
      <CardContent>
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Best For</p>
          <p className="text-sm">{summary.bestFor}</p>
        </section>
        <section className="mt-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Not Ideal For</p>
          <p className="text-sm">{summary.notIdealFor}</p>
        </section>
        <section className="mt-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Key Differentiators</p>
          <div className="flex flex-wrap gap-1.5">
            {summary.keyDifferentiators.map((d, i) => (
              <Badge
                key={i}
                className="border border-primary/30 bg-primary/15 text-primary rounded-full text-xs"
              >
                {d}
              </Badge>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
