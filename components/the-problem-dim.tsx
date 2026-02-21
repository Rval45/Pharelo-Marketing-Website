"use client"

import { useRef, useState, useEffect, useCallback } from "react"

const thoughts = [
  {
    id: "moment-1",
    content: (
      <>
        {"It\u2019s 2am and you\u2019re lying awake thinking, "}
        <em className="italic text-warm-orange">
          What if I forget to ask about the medication change?
        </em>
      </>
    ),
  },
  {
    id: "moment-2",
    content: (
      <>
        You walked out of the last appointment and realized you never said the
        most important thing.
      </>
    ),
  },
  {
    id: "moment-3",
    content: (
      <>
        You tried to tell your sister what the doctor said, and you
        couldn&apos;t remember the exact words.
      </>
    ),
  },
  {
    id: "moment-4",
    content: (
      <>
        The medications. The appointments.{" "}
        <em className="italic text-warm-orange">
          The questions that come to you in the shower.
        </em>{" "}
        All in your head. Or buried in a notes app you never open.
      </>
    ),
  },
]

export function TheProblemDim() {
  const thoughtRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const closingRef = useRef<HTMLParagraphElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [spotlightY, setSpotlightY] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [burstY, setBurstY] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  // Persist ratios across callbacks so we always compare all thoughts
  const ratiosRef = useRef<number[]>(new Array(thoughts.length).fill(0))

  // Thought intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Merge updated entries into the persistent ratios map
        entries.forEach((entry) => {
          const idx = thoughtRefs.current.indexOf(
            entry.target as HTMLParagraphElement
          )
          if (idx !== -1) {
            ratiosRef.current[idx] = entry.intersectionRatio
          }
        })

        // Pick the thought with the highest ratio across ALL elements
        let bestIndex = -1
        let bestRatio = 0
        ratiosRef.current.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = idx
          }
        })

        if (bestIndex !== -1) {
          setActiveIndex(bestIndex)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-35% 0px -35% 0px",
      }
    )

    thoughtRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Closing line observer — two observers for hysteresis:
  // 1. "Enter" observer: triggers reveal when closing line reaches the middle
  // 2. "Exit" observer: un-reveals only when closing line scrolls well below viewport
  useEffect(() => {
    const closingEl = closingRef.current
    const section = sectionRef.current
    if (!closingEl || !section) return

    // Triggers ON when the closing line reaches the center band
    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const sectionRect = section.getBoundingClientRect()
          const closingRect = closingEl.getBoundingClientRect()
          setBurstY(closingRect.top - sectionRect.top + closingRect.height / 2)
          setIsRevealed(true)
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-40% 0px -40% 0px",
      }
    )

    // Triggers OFF only when closing line is fully out of the upper 70% of viewport
    // (i.e. user has scrolled back up past it)
    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsRevealed(false)
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -30% 0px",
      }
    )

    enterObserver.observe(closingEl)
    exitObserver.observe(closingEl)
    return () => {
      enterObserver.disconnect()
      exitObserver.disconnect()
    }
  }, [])

  // Update spotlight Y position when active thought changes
  useEffect(() => {
    const section = sectionRef.current
    const activeEl = thoughtRefs.current[activeIndex]
    if (!section || !activeEl) return

    const sectionRect = section.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()
    const relativeY = elRect.top - sectionRect.top + elRect.height / 2
    setSpotlightY(relativeY)
  }, [activeIndex])

  const dur = prefersReducedMotion ? "0s" : undefined

  return (
    <section
      ref={sectionRef}
      id="main-content"
      className="relative px-6 py-24 md:py-32 md:px-12 overflow-hidden"
      style={{
        backgroundColor: isRevealed ? "#FDF6EE" : "#1A1520",
        transition: `background-color ${dur ?? "1.2s"} ease`,
      }}
      aria-labelledby="the-problem-heading"
    >


      {/* Spotlight radial gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          "--spot-y": `${spotlightY}px`,
          background: `radial-gradient(ellipse 600px 300px at 50% var(--spot-y),
            rgba(224,122,43,0.08) 0%,
            rgba(254,215,170,0.04) 30%,
            transparent 70%)`,
          opacity: isRevealed ? 0 : 1,
          transition: `--spot-y ${dur ?? "0.8s"} cubic-bezier(0.22, 1, 0.36, 1), opacity ${dur ?? "1.2s"} ease`,
        } as React.CSSProperties}
        aria-hidden="true"
      />

      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(26,21,32,0.6) 100%)",
          opacity: isRevealed ? 0 : 1,
          transition: `opacity ${dur ?? "1.2s"} ease`,
        }}
        aria-hidden="true"
      />

      {/* Reveal light burst */}
      <div
        className="absolute z-[15] pointer-events-none rounded-full"
        style={{
          left: "50%",
          top: burstY || "80%",
          width: "200vw",
          height: "200vw",
          marginLeft: "-100vw",
          marginTop: "-100vw",
          background:
            "radial-gradient(circle, rgba(253,246,238,0.9) 0%, rgba(224,122,43,0.15) 40%, transparent 70%)",
          transform: isRevealed ? "scale(3)" : "scale(0)",
          opacity: isRevealed ? 1 : 0,
          transition: prefersReducedMotion
            ? "none"
            : isRevealed
              ? "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease"
              : "transform 0.5s ease, opacity 0.4s ease",
        }}
        aria-hidden="true"
      />


      <div className="mx-auto max-w-6xl relative z-20">
        <div className="max-w-[680px] mx-auto">
          <span
            className="text-sm tracking-widest uppercase font-sans md:text-base"
            style={{
              color: isRevealed ? "rgba(146,64,14,0.45)" : "rgba(253,246,238,0.3)",
              transition: `color ${dur ?? "1.2s"} ease`,
            }}
          >
            Sound familiar?
          </span>

          <h2 id="the-problem-heading" className="sr-only">
            The experience of caregiving
          </h2>

          {thoughts.map((thought, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex

            let opacity: number
            if (isRevealed) {
              // After reveal, all thoughts are fully readable
              opacity = 1
            } else if (activeIndex === -1) {
              opacity = 1
            } else if (isActive) {
              opacity = 1
            } else if (isPast) {
              opacity = 0.10
            } else {
              opacity = 0.25
            }

            return (
              <p
                key={thought.id}
                ref={(el) => {
                  thoughtRefs.current[i] = el
                }}
                className={`font-serif text-2xl leading-[1.45] md:text-[1.75rem] md:leading-[1.5] lg:text-[2rem] lg:leading-[1.45] first:mt-14 mt-20 md:first:mt-16 md:mt-28 ${
                  isActive && !isRevealed ? "thought-active" : ""
                }`}
                style={{
                  color: isRevealed ? "#2C2438" : "#FDF6EE",
                  opacity,
                  transform: isActive || isRevealed ? "scale(1)" : "scale(0.98)",
                  filter: isActive || isRevealed ? "none" : "blur(0.5px)",
                  transition: `opacity ${dur ?? "0.7s"} ease-out, transform ${dur ?? "0.7s"} ease-out, filter ${dur ?? "0.7s"} ease-out, color ${dur ?? "1.2s"} ease`,
                }}
              >
                {thought.content}
              </p>
            )
          })}

          {/* Closing line */}
          <p
            ref={closingRef}
            className="mt-24 font-serif text-2xl leading-snug md:text-3xl md:mt-32 tracking-tight"
            style={{
              color: isRevealed ? "#9A4F0F" : "#FDF6EE",
              opacity: activeIndex === thoughts.length - 1 || isRevealed ? 1 : 0.2,
              transition: `opacity ${dur ?? "0.7s"} ease, color ${dur ?? "1.2s"} ease`,
            }}
          >
            You shouldn&apos;t have to carry all of this alone.
          </p>
        </div>
      </div>
    </section>
  )
}
