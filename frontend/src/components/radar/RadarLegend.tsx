import { motion } from 'framer-motion'
// TODO: Sheet is installed by Group E (npx shadcn@latest add sheet).
// The import below will resolve once Group E completes.
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { RadarRing } from '@/types/radar'

interface RadarLegendProps {
  rings: RadarRing[]
}

function RingList({ rings }: { rings: RadarRing[] }) {
  return (
    <ul className="flex flex-col gap-3" role="list">
      {rings.map((ring, index) => (
        <motion.li
          key={ring.id}
          role="listitem"
          className="flex items-start gap-3"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.25 }}
        >
          {/* Colored circle indicator */}
          <div
            data-ring-color={ring.id}
            className="mt-0.5 h-4 w-4 shrink-0 rounded-full"
            style={{ backgroundColor: ring.color }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold leading-tight text-foreground">
              {ring.label}
            </span>
            <span className="text-xs leading-snug text-muted-foreground">
              {ring.description}
            </span>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

/**
 * RadarLegend
 *
 * - Desktop (≥1024px):   rendered as a glassmorphic sidebar (hidden on smaller screens).
 * - Tablet (768–1024px): rendered inline below the chart.
 * - Mobile (<768px):     rendered inside a shadcn Sheet (bottom drawer).
 *
 * The parent RadarPage handles which version to show via responsive utility classes.
 * This component exposes itself once and the parent decides placement.
 */
export function RadarLegend({ rings }: RadarLegendProps) {
  return (
    <>
      {/* ── Desktop / Tablet inline: glassmorphic container ── */}
      <div className="hidden sm:block">
        <div className="rounded-[var(--radius)] border border-primary/20 bg-card/30 p-4 backdrop-blur-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Legend
          </h2>
          <RingList rings={rings} />
        </div>
      </div>

      {/* ── Mobile: Sheet (bottom drawer) ── */}
      <div className="block sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Activity className="h-4 w-4" />
              Legend
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-[var(--radius)] pb-8">
            <SheetHeader>
              <SheetTitle>Radar Legend</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <RingList rings={rings} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
