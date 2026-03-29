import Image from 'next/image'
import { MotionWrapper } from './motion-wrapper'

const scenarios = [
  'You forgot the one question that mattered.',
  'The doctor talked fast and you nodded along.',
  'You left and couldn\u2019t remember what they said.',
  'You got home and realized you missed half the story.',
]

export function TheProblem() {
  return (
    <section className="relative px-6 md:px-12 py-32 md:py-44 overflow-hidden">
      {/* Background photo — desaturated, faded into warm linen */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/waiting-room.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(247,243,236,0.88) 0%, rgba(247,243,236,0.8) 50%, rgba(247,243,236,0.92) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="md:grid md:grid-cols-[1fr_1.8fr] md:gap-16 lg:gap-24">
          {/* Left — anchor phrase */}
          <MotionWrapper>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-snug md:sticky md:top-32">
              You{'\u2019'}ve been there.
            </p>
          </MotionWrapper>

          {/* Right — scenarios with warm dividers */}
          <div className="mt-12 md:mt-0 flex flex-col">
            {scenarios.map((text, i) => (
              <MotionWrapper key={i} variant="fade-up" staggerIndex={i}>
                <div className="py-8 md:py-10 border-t border-border">
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground-muted">
                    {text}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
