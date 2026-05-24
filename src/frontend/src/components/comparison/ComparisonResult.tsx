import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ComparisonResult as ComparisonResultType } from '@/types/comparison'

interface ComparisonResultProps {
  result: ComparisonResultType
}

export function ComparisonResult({ result }: ComparisonResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comparison: {result.tools.join(' vs ')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-none whitespace-pre-wrap text-sm leading-6 text-foreground">
          {result.summary}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Generated: {new Date(result.generatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}
