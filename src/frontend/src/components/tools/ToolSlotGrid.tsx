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
      className="border-2 border-dashed border-border/50 rounded-xl min-h-[180px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-border/80 transition-colors"
      onClick={onClick}
      role="button"
      aria-label={`Add a tool to slot ${slotNumber} of 5`}
    >
      <Plus className="h-6 w-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Add a tool</span>
      <span className="text-xs text-muted-foreground/60">Slot {slotNumber} of 5</span>
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
  const slots: (Tool | null)[] = Array.from({ length: 5 }, (_, i) => selectedTools[i] ?? null)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {slots.map((tool, i) => (
          <motion.div
            key={tool?.id ?? `empty-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
          >
            {tool !== null ? (
              <ToolCard tool={tool} mode="slot" onRemove={onRemove} />
            ) : loading ? (
              <Skeleton className="h-[180px] w-full rounded-xl" />
            ) : (
              <EmptySlot slotNumber={i + 1} onClick={onOpenModal} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
