import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { FeatureTable } from '@/components/comparison/FeatureTable'
import { ToolSummaryCard } from '@/components/comparison/ToolSummaryCard'
import type { ComparisonResult as ComparisonResultType } from '@/types/comparison'

interface ComparisonResultProps {
  result: ComparisonResultType
}

export function ComparisonResult({ result }: ComparisonResultProps) {
  const [mounted, setMounted] = useState(false)
  const [showRecommendation, setShowRecommendation] = useState(true)
  const [showFallbackWarning, setShowFallbackWarning] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recommendation callout */}
      {showRecommendation && (
        <Alert className="relative">
          <button
            onClick={() => setShowRecommendation(false)}
            className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Dismiss recommendation"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertDescription className="text-base font-medium">
            {result.recommendation}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary prose */}
      <p className="text-muted-foreground leading-relaxed">{result.summary}</p>

      {/* Tool summary cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.toolSummaries.map((s) => (
          <ToolSummaryCard key={s.toolId} summary={s} />
        ))}
      </div>

      {/* Tabbed sections */}
      {result.sections.length > 0 ? (
        <Tabs defaultValue={result.sections[0]?.id}>
          <div className="overflow-x-auto">
            <TabsList className="w-full">
              {result.sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {result.sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-4">
              {section.summary && (
                <p className="text-muted-foreground mb-4 text-sm">{section.summary}</p>
              )}
              <FeatureTable section={section} toolSummaries={result.toolSummaries} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        /* Fallback warning banner */
        showFallbackWarning && (
          <Alert variant="destructive" className="relative">
            <button
              onClick={() => setShowFallbackWarning(false)}
              className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              aria-label="Dismiss warning"
            >
              <X className="h-4 w-4" />
            </button>
            <AlertDescription>
              Structured comparison data could not be generated. The summary above contains the LLM&apos;s raw output.
            </AlertDescription>
          </Alert>
        )
      )}

      {/* Footer timestamp */}
      <p className="text-xs text-muted-foreground">
        Generated at {new Date(result.generatedAt).toLocaleString()}
      </p>
    </div>
  )
}
