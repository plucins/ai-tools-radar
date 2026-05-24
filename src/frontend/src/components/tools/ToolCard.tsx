import { motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Tool } from '@/types/tool'

interface ToolCardProps {
  tool: Tool
  mode: 'slot' | 'browser'
  selected?: boolean
  onRemove?: (id: string) => void
  onToggle?: (id: string) => void
  disabled?: boolean
}

export function ToolCard({ tool, mode, selected, onRemove, onToggle, disabled }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        mode === 'browser' && disabled && 'opacity-40 pointer-events-none cursor-not-allowed',
      )}
      onClick={mode === 'browser' ? () => onToggle?.(tool.id) : undefined}
    >
      <Card
        className={cn(
          'relative bg-card/50 backdrop-blur-sm border-border/50',
          (mode === 'slot' || selected) && 'ring-2 ring-primary',
        )}
      >
        {mode === 'slot' && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.(tool.id)
            }}
            aria-label={`Remove ${tool.name} from comparison`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {mode === 'browser' && selected && (
          <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary z-10" />
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-base pr-8">{tool.name}</CardTitle>
          {mode === 'slot' && (
            <Badge variant="secondary" className="w-fit mt-1">
              {tool.category}
            </Badge>
          )}
          {mode === 'browser' && (
            <p className="text-xs text-muted-foreground">{tool.category}</p>
          )}
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
    </motion.div>
  )
}
