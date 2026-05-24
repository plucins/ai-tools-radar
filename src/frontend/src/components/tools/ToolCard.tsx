import { motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { API_BASE_URL } from '@/lib/config'
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
  const logoProxyUrl = tool.logo ? `${API_BASE_URL}/tools/${tool.id}/logo` : undefined

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        mode === 'browser' && disabled && 'pointer-events-none cursor-not-allowed opacity-40',
        mode === 'slot' && 'h-full',
      )}
      onClick={mode === 'browser' ? () => onToggle?.(tool.id) : undefined}
    >
      <Card
        className={cn(
          'relative bg-card/60 backdrop-blur-sm border-border/50',
          mode === 'slot' && 'h-full w-full shadow-[0_0_20px_hsl(var(--primary)/0.1)]',
          (mode === 'slot' || selected) &&
            'ring-1 ring-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.15)]',
        )}
      >
        {mode === 'slot' && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 h-7 w-7 rounded-full bg-background/50 hover:bg-background/80"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.(tool.id)
            }}
            aria-label={`Remove ${tool.name} from comparison`}
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        )}
        {mode === 'browser' && selected && (
          <CheckCircle2 className="absolute right-2 top-2 z-10 h-5 w-5 text-primary" />
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 pr-8">
            {logoProxyUrl && (
              <div className="h-8 w-8 shrink-0 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center overflow-hidden p-1">
                <img
                  src={logoProxyUrl}
                  alt={`${tool.name} logo`}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    ;(e.currentTarget.parentElement as HTMLDivElement).style.display = 'none'
                  }}
                />
              </div>
            )}
            <h3
              className={cn(
                'font-semibold leading-none tracking-tight',
                mode === 'slot' ? 'text-lg' : 'text-base',
              )}
            >
              {tool.name}
            </h3>
          </div>
          {mode === 'slot' && (
            <Badge
              variant="secondary"
              className="w-fit mt-1 border border-primary/30 bg-primary/15 text-primary"
            >
              {tool.category}
            </Badge>
          )}
          {mode === 'browser' && (
            <p className="text-xs text-muted-foreground">{tool.category}</p>
          )}
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{tool.description}</p>
          {tool.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
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
