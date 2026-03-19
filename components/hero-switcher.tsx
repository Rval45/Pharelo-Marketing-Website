'use client'

import { useState } from 'react'

const variants = ['A', 'B', 'C'] as const

export function HeroSwitcher({
  children,
}: {
  children: React.ReactNode[]
}) {
  const [active, setActive] = useState(0)

  return (
    <>
      {/* Switcher controls — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-border bg-cream-light/95 backdrop-blur-sm px-1.5 py-1.5 shadow-[0_8px_24px_-8px_rgba(61,43,31,0.12)]">
        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground px-2">
          Hero
        </span>
        {variants.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${
              active === i
                ? 'bg-bronze text-cream-light'
                : 'text-muted hover:text-foreground hover:bg-border/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Render active variant */}
      {children[active]}
    </>
  )
}
