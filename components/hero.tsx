'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { WaitlistForm } from './waitlist-form'

export function Hero() {
  const prefersReduced = useReducedMotion()

  const spring = { type: 'spring' as const, stiffness: 80, damping: 20 }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background photo — spans right ~70%, fades left into background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        initial={prefersReduced ? undefined : { opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Slow Ken Burns zoom — CSS animation for perpetual motion */}
        <div className="absolute inset-0 hero-ken-burns">
          <Image
            src="/images/hero-person-sitting.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        {/* Gradient fade: solid on left ~20%, photo dominant on right ~70% */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, #F7F3EC 22%, rgba(247,243,236,0.85) 42%, rgba(247,243,236,0.25) 62%, rgba(247,243,236,0.05) 100%)`,
          }}
        />
        {/* Top and bottom fades for clean edges */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, #F7F3EC 0%, transparent 12%, transparent 88%, #F7F3EC 100%)`,
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-12 py-24 md:py-0">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full bg-peach-500/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-peach-700"
            initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-peach-500" />
            Now in early access
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] text-foreground"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
          >
            Walk in prepared.
            <br />
            Walk out clear.
          </motion.h1>

          {/* Body */}
          <motion.p
            className="mt-7 text-lg md:text-xl leading-relaxed text-foreground-muted max-w-[46ch]"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 }}
          >
            Pharelo helps you organize your thoughts before every appointment,
            capture what matters during the visit, and understand everything after.
          </motion.p>

          {/* Waitlist form */}
          <motion.div
            className="mt-9 max-w-md"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.7 }}
          >
            <WaitlistForm id="hero-email" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
