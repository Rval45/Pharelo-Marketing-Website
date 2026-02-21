"use client"

import Image from "next/image"
import { AnimateIn } from "./animate-in"

const personas = [
  {
    image: "/images/Map-Pen-Phone.webp",
    label: "The long-distance caregiver",
    text: "Managing her mom\u2019s cardiology visits from two states away \u2014 juggling phone calls, pharmacy refills, and the guilt of not being there.",
  },
  {
    image: "/images/Diaper-bag-pacifier.webp",
    label: "The one keeping it all straight",
    text: "Tracking his son\u2019s specialist appointments across three providers, trying to make sure nothing falls through the cracks.",
  },
  {
    image: "/images/Fridge-Mess.webp",
    label: "The one who forgot to ask",
    text: "Anyone who\u2019s ever walked out of a doctor\u2019s office and thought, \u201CWait \u2014 what did they just say?\u201D",
  },
]

export function WhoItsFor() {
  return (
    <section className="px-6 py-12 md:py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <span className="text-sm tracking-wide uppercase text-warm-secondary/50 font-sans md:text-base">
            Who it&apos;s for
          </span>
        </AnimateIn>

        <AnimateIn delay={80}>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-dark-slate md:text-4xl tracking-tight max-w-xl text-balance">
            Built for the people who show up.
          </h2>
        </AnimateIn>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 list-none" role="list">
          {personas.map((persona, i) => (
            <AnimateIn
              key={i}
              delay={120 * (i + 1)}
              as="li"
              className={i === personas.length - 1 && personas.length % 2 !== 0 ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-1rem)]" : ""}
            >
              <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card-surface border border-soft-gold/20 transition-shadow duration-300 hover:shadow-lg hover:shadow-warm-orange/5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={persona.image}
                    alt={persona.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card-surface/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col gap-2 p-5 md:p-6">
                  <span className="text-xs font-sans font-medium tracking-wide uppercase text-warm-orange">
                    {persona.label}
                  </span>
                  <p className="font-serif text-base leading-relaxed text-dark-slate/80 md:text-lg">
                    {persona.text}
                  </p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </ul>

        <AnimateIn delay={650}>
          <div className="mt-14 flex flex-col items-center gap-6">
            <p className="font-serif text-2xl leading-snug text-warm-orange md:text-3xl tracking-tight text-center text-balance">
              If any of this sounds familiar, Pharelo is being built for you.
            </p>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-warm-orange px-6 py-3 text-base font-medium text-white hover:bg-warm-orange/90 transition-colors duration-200"
            >
              Join the waitlist <span aria-hidden="true">→</span>
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
