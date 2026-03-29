'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Variant = 'fade-up' | 'slide-left' | 'slide-right' | 'fade-in'

const initialStates: Record<Variant, { opacity: number; x?: number; y?: number }> = {
  'fade-up': { opacity: 0, y: 24 },
  'slide-left': { opacity: 0, x: -30 },
  'slide-right': { opacity: 0, x: 30 },
  'fade-in': { opacity: 0 },
}

export function MotionWrapper({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  staggerIndex,
}: {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  className?: string
  staggerIndex?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const computedDelay = delay + (staggerIndex ?? 0) * 0.12

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialStates[variant]}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initialStates[variant]}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: computedDelay,
      }}
    >
      {children}
    </motion.div>
  )
}
