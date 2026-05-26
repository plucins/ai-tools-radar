import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ModelInfo } from '@/types/model'

interface SidebarModelStatusProps {
  selectedModel: string
  onModelChange: (model: string) => void
  models?: ModelInfo[]
  loading?: boolean
  isOnline?: boolean
}

export function SidebarModelStatus({
  selectedModel,
  onModelChange,
  models = [],
  loading = false,
  isOnline = true,
}: SidebarModelStatusProps) {
  return (
    <div className="flex flex-col gap-3">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_6px_#10B981]' : 'bg-muted-foreground'}`}
            aria-label={isOnline ? 'Online' : 'Offline'}
          />
          <span className="text-sm font-medium text-foreground">Ollama (Local)</span>
        </CardContent>
      </Card>

      {loading ? (
        <Skeleton className="h-9 w-full rounded-lg" />
      ) : models.length > 0 ? (
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger aria-label="Select model">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <p className="truncate text-xs text-muted-foreground">Model: {selectedModel || '—'}</p>
      )}
    </div>
  )
}
