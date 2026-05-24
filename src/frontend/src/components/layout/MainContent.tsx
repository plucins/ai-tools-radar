import type { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4 pl-0">
      <main className="flex-1 rounded-3xl border border-border/40 bg-card/30 p-10 backdrop-blur-sm shadow-[0_0_60px_hsl(var(--primary)/0.08),inset_0_0_0_1px_hsl(var(--primary)/0.06)]">
        {children}
      </main>
    </div>
  )
}
