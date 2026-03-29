'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { WaitlistForm } from './waitlist-form'

export function Hero() {
  const prefersReduced = useReducedMotion()

  const spring = { type: 'spring' as const, stiffness: 80, damping: 20 }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background photo — spans right ~60%, fades left into background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/Pharelo-Hero-1.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient fade: solid background on left, transparent on right */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, #F7F3EC 30%, rgba(247,243,236,0.85) 50%, rgba(247,243,236,0.3) 75%, rgba(247,243,236,0.15) 100%)`,
          }}
        />
        {/* Top and bottom fades for clean edges */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, #F7F3EC 0%, transparent 15%, transparent 85%, #F7F3EC 100%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-12 py-24 md:py-0">
        <div className="max-w-xl">
          {/* Headline */}
          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-foreground"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            Walk in prepared.
            <br />
            Walk out clear.
          </motion.h1>

          {/* Body */}
          <motion.p
            className="mt-8 text-lg md:text-xl leading-relaxed text-foreground-muted max-w-[50ch]"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            Pharelo helps you organize your thoughts before every appointment,
            capture what matters during the visit, and understand everything after.
          </motion.p>

          {/* Waitlist form */}
          <motion.div
            className="mt-10 max-w-md"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
          >
            <WaitlistForm id="hero-email" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
