import Image from 'next/image'
import { MotionWrapper } from './motion-wrapper'

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
        <MotionWrapper className="mb-16">
          <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
            Who it{'\u2019'}s for
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight text-foreground">
            Built for the moments that matter most
          </h2>
        </MotionWrapper>

        <div className="flex flex-col gap-16 md:gap-24">
          {scenarios.map((scenario, i) => {
            const imageOnRight = i % 2 === 0
            return (
              <MotionWrapper key={i} variant="fade-up" staggerIndex={i}>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
                  {/* Text */}
                  <div className={imageOnRight ? 'md:order-1' : 'md:order-2'}>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                      {scenario.headline}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground-muted max-w-[50ch]">
                      {scenario.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className={imageOnRight ? 'md:order-2' : 'md:order-1'}>
                    <div className="relative w-full h-[200px] md:h-[280px] rounded-[14px] overflow-hidden shadow-md">
                      <Image
                        src={scenario.image}
                        alt={scenario.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(247,243,236,0.15) 0%, transparent 40%)' }}
                      />
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
