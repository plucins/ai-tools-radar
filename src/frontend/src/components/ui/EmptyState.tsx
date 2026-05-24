import { PackageOpen } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No results',
  description = 'Nothing to display here.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
      <PackageOpen className="h-10 w-10" />
      <div className="text-center">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}
