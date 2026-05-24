import { EmptyState } from '@/components/ui/EmptyState'
import type { Tool } from '@/types/tool'
import { ToolCard } from './ToolCard'

interface ToolListProps {
  tools: Tool[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
}

export function ToolList({ tools, selectedIds, onToggle }: ToolListProps) {
  if (tools.length === 0) {
    return <EmptyState title="No tools found" description="No tools are available yet." />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          selected={selectedIds.has(tool.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
