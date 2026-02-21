"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "fade-up-slow" | "fade-in" | "scale-in"
  as?: "div" | "span" | "li"
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  animation = "fade-up",
  as: Tag = "div",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const animationClass = {
    "fade-up": "animate-fade-up",
    "fade-up-slow": "animate-fade-up-slow",
    "fade-in": "animate-fade-in",
    "scale-in": "animate-scale-in",
  }[animation]

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(triggered && animationClass, className)}
      style={
        triggered
          ? { animationDelay: `${delay}ms` }
          : { opacity: 0 }
      }
    >
      {children}
    </Tag>
  )
}
