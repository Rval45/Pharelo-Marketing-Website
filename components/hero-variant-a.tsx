// Variant A: Layered Paper Depth — floating app surfaces peeling apart

import { CheckCircle, Circle, Waveform, Sparkle } from '@phosphor-icons/react/dist/ssr'

export function HeroVariantA() {
  return (
    <div className="relative w-[380px] h-[420px]">
      {/* Back layer — summary card, tilted right */}
      <div
        className="hero-layer absolute top-0 right-0 w-[260px] rounded-2xl border border-border/40 bg-cream-light p-5 shadow-[0_16px_40px_-12px_rgba(61,43,31,0.06)]"
        style={{ transform: 'rotate(3deg) translateZ(0)', animationDelay: '0s' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkle size={13} className="text-bronze" weight="fill" />
          <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            Visit summary
          </span>
        </div>
        <p className="text-xs text-foreground leading-relaxed">
          Cholesterol slightly elevated. Dosage adjusted. Follow-up blood work in 3 months.
        </p>
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground">
            2 action items saved
          </p>
        </div>
      </div>

      {/* Middle layer — recording waveform, tilted left */}
      <div
        className="hero-layer absolute top-28 -left-2 w-[240px] rounded-2xl border border-border/40 bg-cream-light p-5 shadow-[0_20px_44px_-14px_rgba(61,43,31,0.08)]"
        style={{ transform: 'rotate(-2deg) translateZ(0)', animationDelay: '0.8s' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Waveform size={13} className="text-bronze" weight="fill" />
          <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            Recording
          </span>
        </div>
        <div className="flex items-end justify-start gap-[2px] h-8">
          {[0.3, 0.5, 0.8, 0.4, 0.7, 1, 0.6, 0.3, 0.9, 0.5, 0.7, 0.85, 0.4, 0.6].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-bronze/30"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
        <p className="mt-3 text-[10px] text-muted italic leading-relaxed">
          &ldquo;...we should check again in three months...&rdquo;
        </p>
      </div>

      {/* Front layer — checklist, straight */}
      <div
        className="hero-layer absolute bottom-0 left-8 w-[270px] rounded-2xl border border-border/40 bg-cream-light p-5 shadow-[0_24px_48px_-16px_rgba(61,43,31,0.1)]"
        style={{ transform: 'rotate(0.5deg) translateZ(0)', animationDelay: '1.6s' }}
      >
        <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
          Your checklist
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={14} className="text-bronze shrink-0" weight="fill" />
            <span className="text-[11px] text-muted-foreground line-through">Medication side effects</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Circle size={14} className="text-muted-foreground/40 shrink-0" />
            <span className="text-[11px] text-foreground">Ask about imaging referral</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Circle size={14} className="text-muted-foreground/40 shrink-0" />
            <span className="text-[11px] text-foreground">Discuss energy levels</span>
          </div>
        </div>
      </div>
    </div>
  )
}
