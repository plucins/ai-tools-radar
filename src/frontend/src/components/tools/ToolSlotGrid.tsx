import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ToolCard } from './ToolCard'
import type { Tool } from '@/types/tool'

interface ToolSlotGridProps {
  tools: Tool[]
  selectedTools: Tool[]
  loading: boolean
  onRemove: (id: string) => void
  onOpenModal: () => void
}

interface EmptySlotProps {
  slotNumber: number
  onClick: () => void
}

function EmptySlot({ slotNumber, onClick }: EmptySlotProps): React.ReactElement {
  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 bg-card/20 py-10 transition-colors hover:border-primary/50 hover:bg-card/40"
      onClick={onClick}
      role="button"
      aria-label={`Add a tool to slot ${slotNumber} of 5`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
        <Plus className="h-5 w-5 text-primary/70" aria-hidden="true" />
      </div>
      <span className="text-sm text-muted-foreground">Add a tool</span>
    </div>
  )
}

export function ToolSlotGrid({
  tools: _tools,
  selectedTools,
  loading,
  onRemove,
  onOpenModal,
}: ToolSlotGridProps): React.ReactElement {
  // Show selected tools + exactly one empty/loading placeholder (unless 5 are already selected)
  const slots: (Tool | null)[] = [
    ...selectedTools,
    ...(selectedTools.length < 5 ? [null] : []),
  ]

  return (
    <div className="flex flex-wrap gap-5 px-2 py-3">
      <AnimatePresence mode="popLayout">
        {slots.map((tool, i) => (
          <motion.div
            key={tool?.id ?? `empty-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="flex-1 min-w-[200px]"
          >
            {tool !== null ? (
              <ToolCard tool={tool} mode="slot" onRemove={onRemove} />
            ) : loading ? (
              <Skeleton className="h-40 w-full rounded-2xl" />
            ) : (
              <EmptySlot slotNumber={i + 1} onClick={onOpenModal} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
