'use client'

import { CheckCircle, Circle, Waveform, Sparkle } from '@phosphor-icons/react'
import { MotionWrapper } from './motion-wrapper'

export function FloatingFeatureCards() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr_1fr] gap-6">
          {/* Card 1 — Beacon suggestion */}
          <MotionWrapper variant="fade-up" staggerIndex={0}>
            <div className="rounded-[14px] bg-surface/70 backdrop-blur-xl border border-white/20 p-6 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.15),0_12px_32px_rgba(160,110,50,0.1)]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkle size={14} className="text-peach-500" weight="fill" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle">
                  Beacon
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Based on your last visit, you may want to ask about the follow-up lab results.
              </p>
            </div>
          </MotionWrapper>

          {/* Card 2 — Checklist */}
          <MotionWrapper variant="fade-up" staggerIndex={1}>
            <div className="rounded-[14px] bg-surface/70 backdrop-blur-xl border border-white/20 p-6 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.15),0_12px_32px_rgba(160,110,50,0.1)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle mb-3">
                Your checklist
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={15} className="text-teal-600 shrink-0" weight="fill" />
                  <span className="text-sm text-foreground-muted line-through">Medication side effects</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Circle size={15} className="text-foreground-subtle shrink-0" />
                  <span className="text-sm text-foreground">Ask about imaging referral</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Circle size={15} className="text-foreground-subtle shrink-0" />
                  <span className="text-sm text-foreground">Discuss energy levels</span>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Card 3 — Recording snippet */}
          <MotionWrapper variant="fade-up" staggerIndex={2}>
            <div className="rounded-[14px] bg-surface/70 backdrop-blur-xl border border-white/20 p-6 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.15),0_12px_32px_rgba(160,110,50,0.1)]">
              <div className="flex items-center gap-2 mb-3">
                <Waveform size={14} className="text-peach-500" weight="fill" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle">
                  Recorded
                </span>
              </div>
              <div className="flex items-end gap-[2px] h-8 mb-3">
                {[0.3, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.85, 0.55].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-peach-500/30"
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground-muted italic leading-relaxed">
                &ldquo;...check again in three months...&rdquo;
              </p>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
