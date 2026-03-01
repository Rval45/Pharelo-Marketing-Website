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
        <a
          href="#waitlist"
          className={cn(
            "group inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]",
            overDark
              ? "bg-teal text-dark-slate hover:bg-teal/85 hover:shadow-md hover:shadow-teal/20"
              : "bg-warm-orange text-white hover:bg-warm-orange-hover hover:shadow-md hover:shadow-warm-orange/20"
          )}
        >
          Get early access <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  )
}
