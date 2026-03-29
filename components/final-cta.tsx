import Image from 'next/image'
import { MotionWrapper } from './motion-wrapper'
import { WaitlistForm } from './waitlist-form'

export function FinalCTA() {
  return (
    <section id="waitlist" className="relative px-6 md:px-12 py-32 md:py-48 overflow-hidden">
      {/* Background photo — vignette fade into warm linen */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/walking-out.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Strong vignette from all edges */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(247,243,236,0.85) 0%, rgba(247,243,236,0.7) 40%, rgba(247,243,236,0.9) 100%),
              linear-gradient(to right, rgba(247,243,236,0.6) 0%, transparent 30%, transparent 70%, rgba(247,243,236,0.6) 100%)
            `,
          }}
        />
      </div>

      {/* Subtle peach gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 40%, rgba(212,147,90,0.03) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <MotionWrapper>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-tight text-foreground">
              Your next appointment
              <br />
              deserves better.
            </h2>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.1}>
            <p className="mt-6 text-lg text-foreground-muted max-w-md">
              Join the waitlist and be the first to know when Pharelo is ready.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.2}>
            <div className="mt-10 max-w-md">
              <WaitlistForm id="cta-email" />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
