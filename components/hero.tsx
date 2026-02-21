"use client"

import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16 md:px-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 md:gap-6 items-center text-center">
          <span className="inline-block text-sm tracking-widest uppercase text-warm-secondary/50 font-sans md:text-base">
            For the people holding it all together
          </span>

          <h1 className="font-serif text-[2.5rem] leading-[1.08] md:text-6xl lg:text-7xl text-dark-slate tracking-tight text-balance">
            You shouldn't have to hold it all in your {" "}
            <span className="text-warm-orange">head.</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-warm-secondary">
            Pharelo helps you prepare for medical visits, stay present during them, and make sure nothing important goes unsaid.
          </p>

          <a
            href="#waitlist"
            className="self-center inline-flex items-center gap-2 rounded-full bg-warm-orange px-6 py-3 text-base font-medium text-white hover:bg-warm-orange/90 transition-colors duration-200"
          >
            Join the waitlist <span aria-hidden="true">→</span>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="mt-10 md:mt-12 flex justify-center animate-float">
      <button
        onClick={() => document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" })}
        className="flex flex-col items-center gap-2 bg-transparent border-0 cursor-pointer rounded p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-secondary/50"
      >
        <span className="text-xs tracking-widest uppercase text-warm-secondary/50 font-sans">
          See how it works
        </span>
        <ChevronDown
          className="w-4 h-4 text-warm-secondary/40"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>
      </div>
    </section>
  )
}
