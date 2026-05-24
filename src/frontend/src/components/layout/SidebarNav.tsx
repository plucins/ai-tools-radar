import { Scale, LayoutGrid, BookOpen, Info } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SidebarNavItem } from '@/components/layout/SidebarNavItem'

interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'compare', label: 'Compare', icon: Scale, to: '/' },
  { id: 'catalog', label: 'Catalog', icon: LayoutGrid, to: '/catalog' },
  { id: 'my-comparisons', label: 'My Comparisons', icon: BookOpen, to: '/my-comparisons' },
  { id: 'about', label: 'About', icon: Info, to: '/about' },
]

export function SidebarNav() {
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <SidebarNavItem key={item.id} to={item.to} label={item.label} icon={item.icon} />
      ))}
    </nav>
  )
}
