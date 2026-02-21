"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-10 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16 md:px-12">
      <div className="relative mx-auto max-w-6xl grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left -- copy */}
        <div className="flex flex-col gap-5 md:gap-6">
          <span className="inline-block text-sm tracking-widest uppercase text-warm-secondary/50 font-sans md:text-base">
            For the people holding it all together
          </span>

          <h1 className="font-serif text-[2.5rem] leading-[1.08] md:text-6xl lg:text-7xl text-dark-slate tracking-tight text-balance">
            You shouldn't have to hold it all in your {" "}
            <span className="text-warm-orange">head.</span>
          </h1>

          <p className="max-w-xl text-base md:text-lg leading-relaxed text-warm-secondary">
            Pharelo helps you prepare for medical visits, stay present during them, and make sure nothing important goes unsaid.
          </p>
        </div>

        {/* Right -- lighthouse illustration (desktop only) */}
        <div className="hidden lg:block relative">
          <div className="relative w-full" style={{ aspectRatio: "1408/736" }}>
            <Image
              src="/images/Pharelo-Hero-Image.webp"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
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
