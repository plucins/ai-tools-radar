import { Button } from '@/components/ui/button'

interface ComparisonPanelProps {
  selectedCount: number
  onCompare: () => void
  loading: boolean
}

export function ComparisonPanel({ selectedCount, onCompare, loading }: ComparisonPanelProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-secondary/30 p-4">
      <p className="flex-1 text-sm">
        {selectedCount === 0
          ? 'Select tools to compare'
          : `${selectedCount} tool${selectedCount > 1 ? 's' : ''} selected`}
      </p>
      <Button onClick={onCompare} disabled={selectedCount < 2 || loading} size="sm">
        {loading ? 'Comparing...' : 'Compare'}
      </Button>
    </div>
  )
}
