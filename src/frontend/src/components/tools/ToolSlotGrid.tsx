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
      className="flex min-h-[280px] w-[220px] shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 bg-card/20 transition-colors hover:border-primary/50 hover:bg-card/40"
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
  const slots: (Tool | null)[] = Array.from({ length: 5 }, (_, i) => selectedTools[i] ?? null)

  return (
    <div className="flex gap-5 overflow-x-auto pb-2">
      <AnimatePresence mode="popLayout">
        {slots.map((tool, i) => (
          <motion.div
            key={tool?.id ?? `empty-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="shrink-0"
          >
            {tool !== null ? (
              <ToolCard tool={tool} mode="slot" onRemove={onRemove} />
            ) : loading ? (
              <Skeleton className="h-[280px] w-[220px] rounded-2xl" />
            ) : (
              <EmptySlot slotNumber={i + 1} onClick={onOpenModal} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
