import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/ui/EmptyState'
import { ToolList } from './ToolList'
import type { Tool } from '@/types/tool'

interface AddToolModalProps {
  tools: Tool[]
  selectedIds: Set<string>
  isOpen: boolean
  onClose: () => void
  onAddTools: (ids: string[]) => void
}

export function AddToolModal({
  tools,
  selectedIds,
  isOpen,
  onClose,
  onAddTools,
}: AddToolModalProps): React.ReactElement {
  const [query, setQuery] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isOpen) {
      setPendingIds(new Set())
      setQuery('')
      setActiveCategory('All')
    }
  }, [isOpen])

  const categories: string[] = ['All', ...new Set(tools.map((t) => t.category))]

  const filteredTools: Tool[] = tools.filter(
    (t) =>
      (activeCategory === 'All' || t.category === activeCategory) &&
      (query === '' ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))),
  )

  const disabledIds: Set<string> = new Set<string>([
    ...selectedIds,
    ...filteredTools
      .filter(
        (t) =>
          selectedIds.size + pendingIds.size >= 5 && !pendingIds.has(t.id) && !selectedIds.has(t.id),
      )
      .map((t) => t.id),
  ])

  function handleToggle(id: string): void {
    setPendingIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (selectedIds.size + next.size < 5) {
        next.add(id)
      }
      return next
    })
  }

  function handleConfirm(): void {
    onAddTools([...pendingIds])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Tools</DialogTitle>
          <DialogDescription>Select tools to compare (max 5 total)</DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Separator />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className={activeCategory !== cat ? 'cursor-pointer' : undefined}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filteredTools.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                title="No tools found"
                description="Try a different search term or category."
              />
            </div>
          ) : (
            <ToolList
              tools={filteredTools}
              mode="browser"
              pendingIds={pendingIds}
              disabledIds={disabledIds}
              onToggle={handleToggle}
            />
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {filteredTools.length} tools
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={pendingIds.size === 0}>
              Add Selected ({pendingIds.size})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
