import { WaitlistForm } from './waitlist-form'
import { Logo } from './logo'
import { CheckCircle, Circle, Microphone, Sparkle } from '@phosphor-icons/react/dist/ssr'

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

          {/* Right — Product mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Warm glow behind phone */}
              <div
                className="absolute -inset-12 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <HeroMockup />
            </div>
          </div>

          {/* Mobile — compact mockup peek */}
          <div className="lg:hidden flex justify-center -mt-2">
            <div className="w-[220px]">
              <HeroMockupCompact />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroMockup() {
  return (
    <div className="relative w-[300px] animate-float">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border border-border/60 bg-cream-light p-3.5 shadow-[0_24px_48px_-16px_rgba(61,43,31,0.1),0_0_0_1px_rgba(255,252,247,0.4)_inset]">
        {/* Dynamic island */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-[5px] rounded-full bg-foreground/10" />
        </div>

        {/* Screen */}
        <div className="rounded-[1.5rem] bg-background overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <span className="text-[9px] text-muted-foreground">9:41</span>
            <div className="flex gap-1">
              <div className="w-3.5 h-1.5 rounded-sm bg-foreground/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            </div>
          </div>

          {/* App header */}
          <div className="px-5 pt-2 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Logo size={18} />
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Pharelo</span>
            </div>
            <p className="font-serif text-lg text-foreground leading-tight mt-2">
              Dr. Kamara
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Tuesday, March 24 at 2:30 PM
            </p>
          </div>

          {/* Beacon suggestion */}
          <div className="mx-4 mb-3 rounded-xl bg-bronze/[0.04] border border-bronze/10 px-3.5 py-2.5">
            <div className="flex items-start gap-2">
              <Sparkle size={13} className="text-bronze mt-0.5 shrink-0" weight="fill" />
              <p className="text-[11px] text-foreground/80 leading-relaxed">
                Based on your last visit, you may want to ask about the follow-up lab results.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="px-5 pb-2">
            <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-2.5">Your checklist</p>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-bronze mt-[1px] shrink-0" weight="fill" />
                <span className="text-xs text-muted-foreground line-through">Medication side effects</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-bronze mt-[1px] shrink-0" weight="fill" />
                <span className="text-xs text-muted-foreground line-through">Sleep patterns</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Circle size={15} className="text-muted-foreground/40 mt-[1px] shrink-0" />
                <span className="text-xs text-foreground">Ask about imaging referral</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Circle size={15} className="text-muted-foreground/40 mt-[1px] shrink-0" />
                <span className="text-xs text-foreground">Discuss energy levels</span>
              </div>
            </div>
          </div>

          {/* Record button */}
          <div className="px-5 pt-4 pb-5">
            <div className="flex items-center justify-center gap-2 rounded-full bg-bronze/8 py-2.5">
              <Microphone size={14} className="text-bronze" weight="fill" />
              <span className="text-xs font-medium text-bronze">Start recording</span>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center mt-2.5">
          <div className="w-24 h-1 rounded-full bg-foreground/8" />
        </div>
      </div>
    </div>
  )
}

function HeroMockupCompact() {
  return (
    <div className="rounded-[2rem] border border-border/60 bg-cream-light p-3 shadow-[0_16px_32px_-12px_rgba(61,43,31,0.08)]">
      {/* Notch */}
      <div className="flex justify-center mb-2">
        <div className="w-12 h-1 rounded-full bg-foreground/10" />
      </div>
      {/* Screen */}
      <div className="rounded-[1.25rem] bg-background overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Logo size={14} />
            <span className="text-[8px] font-medium uppercase tracking-widest text-muted-foreground">Pharelo</span>
          </div>
          <p className="font-serif text-sm text-foreground leading-tight">Dr. Kamara</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Tue, Mar 24 at 2:30 PM</p>
        </div>
        {/* Mini checklist */}
        <div className="px-4 pb-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle size={12} className="text-bronze shrink-0" weight="fill" />
              <span className="text-[10px] text-muted-foreground line-through">Medication side effects</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle size={12} className="text-muted-foreground/40 shrink-0" />
              <span className="text-[10px] text-foreground">Ask about imaging referral</span>
            </div>
          </div>
        </div>
      </div>
      {/* Home indicator */}
      <div className="flex justify-center mt-2">
        <div className="w-16 h-0.5 rounded-full bg-foreground/8" />
      </div>
    </div>
  )
}
