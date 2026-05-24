import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Tool } from '@/types/tool'

interface ToolCardProps {
  tool: Tool
  selected: boolean
  onToggle: (id: string) => void
}

export function ToolCard({ tool, selected, onToggle }: ToolCardProps) {
  return (
    <Card className={selected ? 'ring-2 ring-primary' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{tool.name}</CardTitle>
          <Checkbox
            checked={selected}
            onCheckedChange={() => onToggle(tool.id)}
            aria-label={`Select ${tool.name}`}
          />
        </div>
        <CardDescription>{tool.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
        {tool.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
