import { Layers } from 'lucide-react'

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 shadow-[0_0_16px_hsl(var(--primary)/0.3)]">
        <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <span className="text-base font-semibold tracking-tight text-foreground">
        AI ToolCompare
      </span>
    </div>
  )
}
