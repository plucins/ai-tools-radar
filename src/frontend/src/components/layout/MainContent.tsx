import type { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
