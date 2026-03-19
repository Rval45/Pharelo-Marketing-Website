// Variant A: Photo + Layered Cards — real imagery with floating app surfaces

import Image from 'next/image'
import { CheckCircle, Circle, Waveform, Sparkle } from '@phosphor-icons/react/dist/ssr'

export function HeroVariantA() {
  return (
    <div className="relative w-[440px] h-[480px]">
      {/* Photo — warm, human, anchor visual */}
      <div className="absolute top-4 right-0 w-[320px] h-[400px] rounded-[1.75rem] overflow-hidden shadow-[0_20px_50px_-16px_rgba(61,43,31,0.12)]">
        <Image
          src="/images/Pharelo-Hero-1.webp"
          alt="Two people smiling, reviewing health notes together"
          fill
          className="object-cover"
          sizes="320px"
          priority
        />
        {/* Soft fade into background on left edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(245,240,232,0.85) 0%, rgba(245,240,232,0) 35%, transparent 100%)',
          }}
        />
        {/* Subtle bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(245,240,232,0.5) 0%, transparent 30%)',
          }}
        />
      </div>

      {/* Floating card — Beacon suggestion, overlapping photo top-left */}
      <div
        className="hero-layer absolute top-0 left-0 w-[240px] rounded-2xl border border-border/40 bg-cream-light/95 backdrop-blur-sm p-4 shadow-[0_16px_40px_-12px_rgba(61,43,31,0.1),inset_0_1px_0_rgba(255,252,247,0.6)] z-10"
        style={{ transform: 'rotate(-1.5deg) translateZ(0)' }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <Sparkle size={13} className="text-bronze" weight="fill" />
          <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            Beacon
          </span>
        </div>
        <p className="text-[11px] text-foreground/80 leading-relaxed">
          Based on your last visit, you may want to ask about the follow-up lab results.
        </p>
      </div>

      {/* Floating card — Checklist, overlapping photo bottom-left */}
      <div
        className="hero-layer absolute bottom-6 -left-2 w-[250px] rounded-2xl border border-border/40 bg-cream-light/95 backdrop-blur-sm p-4 shadow-[0_20px_44px_-14px_rgba(61,43,31,0.1),inset_0_1px_0_rgba(255,252,247,0.6)] z-10"
        style={{ transform: 'rotate(1deg) translateZ(0)' }}
      >
        <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground mb-2.5">
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

      {/* Floating card — Recording snippet, bottom-right overlapping photo edge */}
      <div
        className="hero-layer absolute bottom-32 right-[-12px] w-[200px] rounded-2xl border border-border/40 bg-cream-light/95 backdrop-blur-sm p-4 shadow-[0_16px_36px_-12px_rgba(61,43,31,0.08),inset_0_1px_0_rgba(255,252,247,0.6)] z-10"
        style={{ transform: 'rotate(2deg) translateZ(0)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Waveform size={13} className="text-bronze" weight="fill" />
          <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            Recorded
          </span>
        </div>
        <div className="flex items-end gap-[2px] h-6 mb-2">
          {[0.3, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.85, 0.55].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-bronze/30"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-muted italic leading-relaxed">
          &ldquo;...check again in three months...&rdquo;
        </p>
      </div>
    </div>
  )
}

export function HeroVariantACompact() {
  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Photo */}
      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-[0_12px_32px_-10px_rgba(61,43,31,0.1)]">
        <Image
          src="/images/Pharelo-Hero-1.webp"
          alt="Two people smiling, reviewing health notes together"
          fill
          className="object-cover"
          sizes="300px"
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(245,240,232,0.6) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Single overlapping card */}
      <div className="relative -mt-10 mx-4 rounded-xl border border-border/40 bg-cream-light/95 backdrop-blur-sm p-3.5 shadow-[0_12px_28px_-8px_rgba(61,43,31,0.08),inset_0_1px_0_rgba(255,252,247,0.6)] z-10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkle size={12} className="text-bronze" weight="fill" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Beacon
          </span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">
          You may want to ask about the follow-up lab results.
        </p>
      </div>
    </div>
  )
}
