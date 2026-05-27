import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const ORBITS = [
  { radius: 36, count: 4, duration: 3.2, particleSize: 4, opacity: 0.8 },
  { radius: 56, count: 6, duration: 5.0, particleSize: 3, opacity: 0.5 },
  { radius: 76, count: 8, duration: 7.5, particleSize: 2, opacity: 0.3 },
]

interface OrbitProps {
  radius: number
  count: number
  duration: number
  particleSize: number
  opacity: number
}

function OrbitRing({ radius, count, duration, particleSize, opacity }: OrbitProps) {
  const diameter = radius * 2
  return (
    <motion.div
      className="absolute"
      style={{
        width: diameter,
        height: diameter,
        top: '50%',
        left: '50%',
        marginTop: -radius,
        marginLeft: -radius,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360
        const rad = (angle * Math.PI) / 180
        const x = radius + radius * Math.cos(rad) - particleSize / 2
        const y = radius + radius * Math.sin(rad) - particleSize / 2
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              width: particleSize,
              height: particleSize,
              left: x,
              top: y,
              opacity,
              boxShadow: `0 0 ${particleSize * 2}px hsl(var(--primary) / 0.8)`,
            }}
            animate={{ opacity: [opacity * 0.4, opacity, opacity * 0.4] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * (1.6 / count),
            }}
          />
        )
      })}
    </motion.div>
  )
}

export function MagicLoader() {
  return (
    <div className="relative flex h-[160px] w-[160px] items-center justify-center">
      {/* Outer glow bloom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 160,
          height: 160,
          background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.18) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Orbit rings */}
      {ORBITS.map((orbit, i) => (
        <OrbitRing key={i} {...orbit} />
      ))}

      {/* Central icon */}
      <motion.div
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/40"
        style={{ boxShadow: '0 0 24px hsl(var(--primary) / 0.5)' }}
        animate={{ scale: [1, 1.12, 1], boxShadow: ['0 0 24px hsl(var(--primary) / 0.5)', '0 0 40px hsl(var(--primary) / 0.8)', '0 0 24px hsl(var(--primary) / 0.5)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Comparing tools"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </div>
  )
}
