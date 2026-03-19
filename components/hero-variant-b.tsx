'use client'

// Variant B: Kinetic Typography — the words ARE the product demo

import { useState, useEffect } from 'react'

const phases = [
  {
    text: 'What should I ask about these headaches?',
    label: 'Before',
    style: 'font-serif italic' as const,
  },
  {
    text: 'Recording\u2026',
    label: 'During',
    style: 'font-sans tracking-wide' as const,
  },
  {
    text: 'Here\u2019s what your doctor said.',
    label: 'After',
    style: 'font-serif' as const,
  },
]

export function HeroVariantB() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % phases.length)
        setVisible(true)
      }, 600)
    }, 3400)
    return () => clearInterval(interval)
  }, [])

  const phase = phases[activeIndex]

  return (
    <div className="relative w-full max-w-[400px] min-h-[320px] flex flex-col justify-center">
      {/* Phase indicators */}
      <div className="flex gap-6 mb-8">
        {phases.map((p, i) => (
          <span
            key={i}
            className={`text-[10px] font-medium uppercase tracking-widest transition-all duration-500 ${
              i === activeIndex
                ? 'text-bronze'
                : 'text-muted-foreground/30'
            }`}
          >
            {p.label}
          </span>
        ))}
      </div>

      {/* The cycling text */}
      <div className="relative min-h-[120px] flex items-start">
        <p
          className={`text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-foreground transition-all duration-500 ease-out ${phase.style} ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          {phase.text}
        </p>

        {/* Pulsing dot for "Recording" phase */}
        {activeIndex === 1 && visible && (
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-bronze ml-1 mt-3 recording-dot" />
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-10 flex gap-2">
        {phases.map((_, i) => (
          <div
            key={i}
            className="h-[2px] flex-1 rounded-full overflow-hidden bg-border"
          >
            <div
              className={`h-full rounded-full transition-all duration-[3400ms] ease-linear ${
                i === activeIndex
                  ? 'w-full bg-bronze/50'
                  : i < activeIndex
                    ? 'w-full bg-bronze/20'
                    : 'w-0 bg-bronze/50'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
