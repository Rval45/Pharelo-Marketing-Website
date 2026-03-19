import { WaitlistForm } from './waitlist-form'
import { HeroVariantA } from './hero-variant-a'
import { HeroVariantB } from './hero-variant-b'
import { HeroVariantC } from './hero-variant-c'
import { HeroSwitcher } from './hero-switcher'

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-12 py-24 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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

          {/* Right — Variant switcher (desktop) */}
          <div className="hidden lg:flex items-center justify-center">
            <HeroSwitcher>
              {/* Variant A: Layered Paper Depth */}
              <div className="relative">
                <div
                  className="absolute -inset-12 rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <HeroVariantA />
              </div>

              {/* Variant B: Kinetic Typography */}
              <div className="relative flex items-center">
                <HeroVariantB />
              </div>

              {/* Variant C: Signal Rings */}
              <div className="relative">
                <div
                  className="absolute -inset-8 rounded-full opacity-20 blur-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <HeroVariantC />
              </div>
            </HeroSwitcher>
          </div>

          {/* Mobile — show Variant A only (most compact) */}
          <div className="lg:hidden flex justify-center -mt-2">
            <div className="w-[280px] scale-[0.8] origin-top">
              <HeroVariantA />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
