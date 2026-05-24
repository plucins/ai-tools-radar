import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/EmptyState'
import { ToolCard } from '@/components/tools/ToolCard'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import type { Tool } from '@/types/tool'

export function CatalogPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.tools
      .list()
      .then((data) => {
        setTools(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load tools')
        setLoading(false)
      })
  }, [])

  const categories: string[] = ['All', ...new Set(tools.map((t) => t.category))]

  const filteredTools: Tool[] = tools.filter(
    (t) =>
      (activeCategory === 'All' || t.category === activeCategory) &&
      (query === '' ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))),
  )

  function handleToolClick(id: string): void {
    navigate(`/catalog/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tool Catalog</h1>
        <p className="text-base text-muted-foreground">
          Browse all available AI developer tool profiles.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          aria-label="Search tools"
        />
      </div>

      {!loading && categories.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer tracking-widest text-[10px] uppercase',
                activeCategory === cat
                  ? 'border border-primary/30 bg-primary/15 text-primary shadow-[0_0_6px_hsl(var(--primary)/0.3)]'
                  : 'hover:border-primary/20 hover:bg-primary/5 hover:text-primary/80',
              )}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.toUpperCase()}
            </Badge>
          ))}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && !error && filteredTools.length === 0 && (
        <EmptyState
          title="No tools found"
          description={
            query || activeCategory !== 'All'
              ? 'Try a different search term or category.'
              : 'No tool profiles found in the backend.'
          }
        />
      )}

      {!loading && !error && filteredTools.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, delay: index * 0.05 } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              >
                <ToolCard tool={tool} mode="browser" onToggle={handleToolClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
