import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          AI Tools Radar
        </Link>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Tools
          </Link>
          <Link to="/compare" className="transition-colors hover:text-foreground">
            Compare
          </Link>
        </nav>
      </div>
    </header>
  )
}
