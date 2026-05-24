import { AnimatePresence, motion } from 'framer-motion'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Tool } from '@/types/tool'
import { ToolCard } from './ToolCard'

interface ToolListProps {
  tools: Tool[]
  mode?: 'browser'
  selectedIds?: Set<string>
  pendingIds?: Set<string>
  disabledIds?: Set<string>
  onToggle?: (id: string) => void
}

export function ToolList({ tools, mode, selectedIds, pendingIds, disabledIds, onToggle }: ToolListProps) {
  if (tools.length === 0) {
    return <EmptyState title="No tools found" description="No tools are available yet." />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, delay: index * 0.05 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
          >
            <ToolCard
              tool={tool}
              mode={mode ?? 'browser'}
              selected={pendingIds?.has(tool.id) ?? selectedIds?.has(tool.id) ?? false}
              disabled={disabledIds?.has(tool.id) ?? false}
              onToggle={onToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
