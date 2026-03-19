import { WaitlistForm } from './waitlist-form'
import { HeroVariantA, HeroVariantACompact } from './hero-variant-a'

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

          {/* Right — Photo + floating cards (desktop) */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroVariantA />
          </div>

          {/* Mobile — compact photo + card */}
          <div className="lg:hidden">
            <HeroVariantACompact />
          </div>
        </div>
      </div>
    </section>
  )
}
