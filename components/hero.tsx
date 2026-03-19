import { Logo } from './logo'
import { WaitlistForm } from './waitlist-form'

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-12 py-24 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div className="flex flex-col gap-8 max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-foreground">
              Walk in prepared.
              <br />
              Walk out clear.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-muted max-w-[50ch]">
              Pharelo helps you organize your thoughts before every appointment,
              capture what matters during the visit, and understand everything after.
            </p>
            <div className="max-w-md">
              <WaitlistForm id="hero-email" />
            </div>
          </div>

          {/* Right — Abstract illustration */}
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-80 h-80">
              {/* Organic blob shapes */}
              <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full" fill="none">
                <ellipse cx="160" cy="170" rx="130" ry="120" fill="currentColor" className="text-gold-mist/15" />
                <ellipse cx="180" cy="140" rx="100" ry="90" fill="currentColor" className="text-bronze/8" transform="rotate(15 180 140)" />
                <ellipse cx="140" cy="190" rx="80" ry="70" fill="currentColor" className="text-gold-mist/10" transform="rotate(-10 140 190)" />
              </svg>
              {/* Beacon mark floating */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <Logo size={120} />
              </div>
            </div>
          </div>

          {/* Mobile — small decorative accent */}
          <div className="lg:hidden flex justify-center -mt-4" aria-hidden="true">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 128 128" className="absolute inset-0 w-full h-full" fill="none">
                <ellipse cx="64" cy="68" rx="52" ry="48" fill="currentColor" className="text-gold-mist/12" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <Logo size={48} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
