import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Check, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { api } from '@/lib/api'
import type { Tool } from '@/types/tool'

export function ToolProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function handleCopy(): Promise<void> {
    if (!tool?.content) return
    await navigator.clipboard.writeText(tool.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.tools
      .get(id)
      .then((data) => {
        setTool(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load tool')
        setLoading(false)
      })
  }, [id])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/catalog')}
          aria-label="Back to catalog"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Catalog
        </Button>

        {!loading && !error && tool && (
          <Button
            variant="outline"
            className="gap-2 border-border/50 text-muted-foreground hover:text-foreground"
            onClick={handleCopy}
            aria-label="Copy Markdown to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? 'Copied!' : 'Copy Markdown'}
          </Button>
        )}
      </div>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-2xl" />
          <Skeleton className="h-4 w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4 rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="relative">
          <button
            onClick={() => setError(null)}
            className="absolute right-3 top-3 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && tool && (
        <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
          <div className="prose prose-invert max-w-none
            prose-headings:text-foreground
            prose-p:text-muted-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1
            prose-pre:bg-card/80 prose-pre:border prose-pre:border-border/50
            prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground
            prose-th:text-foreground prose-td:text-muted-foreground
            prose-hr:border-border/50">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {(tool.content ?? '').replace(/```yaml\n[\s\S]*?\n```\n?/, '')}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}
