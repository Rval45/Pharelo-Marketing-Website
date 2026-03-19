import { ScrollReveal } from './scroll-reveal'
import { WaitlistForm } from './waitlist-form'

export function FinalCTA() {
  return (
    <section id="waitlist" className="relative px-6 md:px-12 py-32 md:py-48">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,162,39,0.03))' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight">
            Your next appointment
            <br />
            deserves better.
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="reveal stagger"
          style={{ '--index': 1 } as React.CSSProperties}
        >
          <p className="mt-6 text-lg text-muted max-w-md mx-auto">
            Join the waitlist and be the first to know when Pharelo is ready.
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="reveal stagger"
          style={{ '--index': 2 } as React.CSSProperties}
        >
          <div className="mt-10 max-w-md mx-auto">
            <WaitlistForm id="cta-email" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
