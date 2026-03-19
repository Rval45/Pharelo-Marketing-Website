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
            <div className="relative w-[420px] h-[420px]">
              {/* Organic blob shapes — asymmetric bezier paths */}
              <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full" fill="none">
                <path
                  d="M210 50c80 0 150 40 170 110s-10 140-70 180-130 50-190 20S30 280 30 200 130 50 210 50z"
                  fill="currentColor"
                  className="text-gold-mist/[0.07]"
                />
                <path
                  d="M250 90c60 20 100 80 90 150s-60 120-130 130-130-20-150-80 20-120 70-150 60-70 120-50z"
                  fill="currentColor"
                  className="text-bronze/[0.05]"
                />
                <path
                  d="M180 140c50-10 110 10 130 60s0 110-50 140-120 20-150-20-30-100 10-140 30-30 60-40z"
                  fill="currentColor"
                  className="text-gold-mist/[0.09]"
                />
              </svg>
              {/* Beacon mark floating */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <Logo size={100} />
              </div>
            </div>
          </div>

          {/* Mobile — small decorative accent */}
          <div className="lg:hidden flex justify-center -mt-4" aria-hidden="true">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full" fill="none">
                <path
                  d="M80 20c40 0 65 25 70 55s-10 60-40 70-60 5-75-15S15 70 35 45 50 20 80 20z"
                  fill="currentColor"
                  className="text-gold-mist/[0.08]"
                />
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
