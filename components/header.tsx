"use client"

import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { LighthouseIcon } from "./lighthouse-icon"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)

  /**
   * Combined scroll handler: checks scroll position AND whether
   * the header overlaps a [data-theme="dark"] section by comparing
   * bounding rects directly. More reliable than IntersectionObserver
   * for a fixed-position element.
   */
  const checkScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)

    const headerBottom = 64 // approx header height
    const darkSections = document.querySelectorAll('[data-theme="dark"]')
    let isDark = false

    darkSections.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < headerBottom && rect.bottom > 0) {
        isDark = true
      }
    })

    setOverDark(isDark)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener("scroll", checkScroll, { passive: true })
    return () => window.removeEventListener("scroll", checkScroll)
  }, [checkScroll])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-400 ease-out",
        scrolled && !overDark &&
          "bg-cream/95 backdrop-blur-lg border-b border-soft-gold/15",
        scrolled && overDark &&
          "bg-dark-slate/95 backdrop-blur-lg border-b border-white/5",
        !scrolled && "bg-transparent"
      )}
      style={
        scrolled && !overDark
          ? { boxShadow: "0 1px 8px rgba(69,26,3,0.06)" }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <Link
          href="/"
          aria-label="Pharelo home"
          className="flex items-center gap-2"
        >
          <LighthouseIcon
            className={cn(
              "h-[18px] w-[18px] transition-colors duration-400 ease-out",
              overDark ? "text-teal" : "text-warm-orange"
            )}
            strokeWidth={1.5}
          />
          <span
            className={cn(
              "font-serif text-xl tracking-tight transition-colors duration-400 ease-out",
              overDark ? "text-cream" : "text-dark-slate"
            )}
          >
            Pharelo
          </span>
        </Link>
        <span
          className={cn(
            "text-xs tracking-wide uppercase font-sans transition-colors duration-400 ease-out",
            overDark ? "text-cream/35" : "text-warm-secondary/40"
          )}
        >
          Coming soon
        </span>
      </div>
    </header>
  )
}
