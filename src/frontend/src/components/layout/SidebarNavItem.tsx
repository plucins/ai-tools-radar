import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface SidebarNavItemProps {
  to: string
  label: string
  icon: LucideIcon
}

export function SidebarNavItem({ to, label, icon: Icon }: SidebarNavItemProps) {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'flex h-14 cursor-pointer items-center gap-3 rounded-xl px-4 transition-colors',
            isActive
              ? 'border border-primary/30 bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
          )}
        >
          <Icon
            className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')}
            aria-hidden="true"
          />
          <span className="text-sm font-medium">{label}</span>
        </motion.div>
      )}
    </NavLink>
  )
}
