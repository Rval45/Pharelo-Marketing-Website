'use client'

import { useEffect, useRef } from 'react'

export function ScrollReveal({
  children,
  className = 'reveal',
  threshold = 0.15,
  style,
}: {
  children: React.ReactNode
  className?: string
  threshold?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
