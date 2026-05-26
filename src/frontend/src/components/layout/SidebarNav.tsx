import { Scale, LayoutGrid, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SidebarNavItem } from '@/components/layout/SidebarNavItem'

interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  to: string
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'compare', label: 'Compare', icon: Scale, to: '/' },
  { id: 'catalog', label: 'Catalog', icon: LayoutGrid, to: '/catalog', end: false },
  { id: 'radar', label: 'Radar', icon: Activity, to: '/radar', end: false },
]

export function SidebarNav() {
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <SidebarNavItem key={item.id} to={item.to} label={item.label} icon={item.icon} end={item.end} />
      ))}
    </nav>
  )
}
