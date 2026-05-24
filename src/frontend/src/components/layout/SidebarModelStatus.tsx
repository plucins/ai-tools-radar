import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface SidebarModelStatusProps {
  modelName?: string
  isOnline?: boolean
}

export function SidebarModelStatus({
  modelName = 'mistral:latest',
  isOnline = true,
}: SidebarModelStatusProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_6px_#10B981]' : 'bg-muted-foreground'}`}
          aria-label={isOnline ? 'Online' : 'Offline'}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-medium text-foreground">Ollama (Local)</span>
          <span className="truncate text-xs text-muted-foreground">Model: {modelName}</span>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </CardContent>
    </Card>
  )
}
