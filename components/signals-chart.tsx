'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export function SignalsChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <div
      ref={ref}
      className={`rounded-[14px] bg-surface p-6 shadow-lg${isInView || prefersReduced ? ' visible' : ''}`}
    >
      <svg viewBox="0 0 400 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 180 C60 170, 100 120, 160 130 S260 90, 340 60 L380 50" stroke="#D4935A" strokeWidth="2.5" strokeLinecap="round" className="line-draw" fill="none" />
        <path d="M20 160 C80 150, 120 170, 180 140 S280 120, 340 100 L380 90" stroke="#298282" strokeWidth="2" strokeLinecap="round" className="line-draw" opacity="0.7" fill="none" />
        <path d="M20 200 C70 190, 130 160, 190 170 S290 130, 340 140 L380 120" stroke="#D4785C" strokeWidth="2" strokeLinecap="round" className="line-draw" opacity="0.5" fill="none" />
      </svg>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 rounded-full bg-peach-500" />
          <span className="text-xs text-foreground-muted">Sleep quality</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 rounded-full bg-teal-600/70" />
          <span className="text-xs text-foreground-muted">Medication response</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 rounded-full bg-coral/50" />
          <span className="text-xs text-foreground-muted">Energy levels</span>
        </div>
      </div>
    </div>
  )
}
