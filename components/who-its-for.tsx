import Image from 'next/image'
import { ScrollReveal } from './scroll-reveal'

const scenarios = [
  {
    headline: 'Managing a chronic condition',
    description: 'You see three specialists, a primary care doctor, and a therapist. Each has a piece of the puzzle, but none of them see the whole picture. Pharelo helps you carry the full story into every room.',
    image: '/images/chronic-condition.webp',
    imageAlt: 'Hands reviewing prescription bottles and medical documents',
  },
  {
    headline: 'Caring for a parent',
    description: 'You\u2019re coordinating appointments, medications, and follow-ups for someone who can\u2019t always do it themselves. Pharelo keeps track so you can focus on being there.',
    image: '/images/caring-for-parent.webp',
    imageAlt: 'Daughter walking arm-in-arm with elderly mother',
  },
  {
    headline: 'Facing a big appointment',
    description: 'The specialist visit you\u2019ve been waiting weeks for. You have twenty minutes and a hundred questions. Pharelo helps you walk in with a plan and walk out with answers.',
    image: '/images/big-appointment.webp',
    imageAlt: 'Person sitting in car, gathering thoughts before a medical visit',
  },
]

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="md:grid md:grid-cols-[1fr_1.6fr] md:gap-16 lg:gap-24">
          {/* Left — section header, sticky */}
          <ScrollReveal>
            <div className="md:sticky md:top-32">
              <span className="text-xs font-medium uppercase tracking-widest text-bronze">
                Who it{'\u2019'}s for
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight text-foreground">
                Built for the moments that matter most
              </h2>
            </div>
          </ScrollReveal>

          {/* Right — scenarios with photos */}
          <div className="mt-12 md:mt-0 flex flex-col">
            {scenarios.map((scenario, i) => (
              <ScrollReveal
                key={i}
                className="reveal stagger"
                style={{ '--index': i } as React.CSSProperties}
              >
                <div className="py-10 md:py-12 border-t border-border">
                  <div className="flex flex-col sm:grid sm:grid-cols-[1fr_140px] gap-6 items-start">
                    {/* Photo accent */}
                    <div className="relative w-full h-[120px] sm:w-[140px] sm:h-[140px] rounded-2xl overflow-hidden shadow-[0_8px_24px_-8px_rgba(61,43,31,0.08)] shrink-0 order-first sm:order-none">
                      <Image
                        src={scenario.image}
                        alt={scenario.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 639px) 100vw, 140px"
                      />
                      {/* Subtle warm tint overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-multiply"
                        style={{ background: 'rgba(245,240,232,0.1)' }}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                        {scenario.headline}
                      </h3>
                      <p className="text-base leading-relaxed text-muted max-w-[50ch]">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
