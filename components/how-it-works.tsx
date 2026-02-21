"use client"

import { ClipboardList, Mic, FileText, Check, CalendarDays, Pause, Circle } from "lucide-react"
import { AnimateIn } from "./animate-in"

/* ------------------------------------------------------------------ */
/*  Phone mockup                                                       */
/* ------------------------------------------------------------------ */

function PhoneFrame({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative mx-auto w-[220px] md:w-[260px] rounded-[2.25rem] md:rounded-[2.5rem] bg-dark-slate p-[3px]"
      style={{
        boxShadow:
          "0 20px 50px rgba(69,26,3,0.10), 0 6px 16px rgba(69,26,3,0.05)",
      }}
    >
      <div className="rounded-[2.1rem] md:rounded-[2.35rem] bg-card-surface overflow-hidden">
        <div className="flex justify-center pt-1.5 md:pt-2">
          <div className="w-14 md:w-18 h-3.5 md:h-4.5 bg-dark-slate rounded-b-lg" />
        </div>
        <div className="flex flex-col px-3.5 md:px-4.5 pt-2 pb-4.5 md:pb-5.5 min-h-[280px] md:min-h-[340px]">
          <div className="flex items-center justify-between mb-2.5 md:mb-3">
            <span className="text-[8px] md:text-[9px] text-warm-secondary/25 font-sans tabular-nums">9:41</span>
            <div className="flex gap-0.5">
              <div className="w-2.5 h-1 rounded-full bg-warm-secondary/10" />
              <div className="w-1 h-1 rounded-full bg-warm-secondary/10" />
              <div className="w-1 h-1 rounded-full bg-warm-secondary/10" />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

/* -- Prep screen -- */
function PrepScreen() {
  const questions = [
    { text: "Ask about new medication side effects", done: true },
    { text: "Bring updated blood pressure log", done: false },
    { text: "Mention increased fatigue at night", done: false },
  ]

  return (
    <PhoneFrame ariaLabel="Pharelo prep screen showing a checklist of questions for a cardiology visit">
      <span className="font-serif text-[9px] md:text-[10px] text-warm-secondary/30 mb-2 md:mb-3">Pharelo</span>
      <div className="rounded-xl bg-cream p-3 md:p-4 border border-soft-gold/20 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-3.5 md:w-4 h-3.5 md:h-4 text-teal" strokeWidth={1.5} />
          <span className="font-serif text-[10px] md:text-xs text-dark-slate">{"\u200BMom\u2019s Visit Prep"}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays className="w-2.5 h-2.5 text-warm-secondary/30" strokeWidth={1.5} />
          <span className="text-[8px] md:text-[9px] text-warm-secondary/35 font-sans">Tuesday, Feb 24</span>
        </div>
        <div className="h-px bg-soft-gold/20" />
        <span className="text-[8px] md:text-[9px] text-warm-secondary/25 font-sans uppercase tracking-wider">
          Questions to ask
        </span>
        <div className="flex flex-col gap-2">
          {questions.map((q) => (
            <div key={q.text} className="flex items-start gap-1.5">
              <div
                className={`mt-px flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded ${
                  q.done ? "bg-teal/15 border border-teal/25" : "border border-soft-gold/30"
                }`}
              >
                {q.done && <Check className="h-2 w-2 text-teal" strokeWidth={3} />}
              </div>
              <span className={`text-[9px] md:text-[10px] leading-snug font-sans ${q.done ? "text-warm-secondary/30 line-through" : "text-dark-slate/60"}`}>
                {q.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1.5 pt-3">
        <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal/10">
          <div className="h-1 w-1 rounded-full bg-teal animate-beacon-pulse" />
        </div>
        <span className="text-[8px] md:text-[9px] text-warm-secondary/25 font-sans italic">
          {"\u200BBeacon: \u201CAnything else on your mind?\u201D"}
        </span>
      </div>
    </PhoneFrame>
  )
}

/* -- Visit screen -- */
function VisitScreen() {
  return (
    <PhoneFrame ariaLabel="Pharelo visit screen showing an active voice recording with live transcription">
      <span className="font-serif text-[9px] md:text-[10px] text-warm-secondary/30 mb-2 md:mb-3">Pharelo</span>
      <div className="rounded-xl bg-cream p-3 md:p-4 border border-soft-gold/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-3.5 md:w-4 h-3.5 md:h-4 text-warm-orange" strokeWidth={1.5} />
            <span className="font-serif text-[10px] md:text-xs text-dark-slate">Recording</span>
          </div>
          <span className="text-[9px] md:text-[10px] font-sans tabular-nums text-warm-orange font-medium">4:32</span>
        </div>
        <div className="h-px bg-soft-gold/20" />
        <div className="flex items-end justify-center gap-[3px] py-3 md:py-4" role="img" aria-label="Audio waveform visualization">
          {[0.3, 0.5, 0.8, 0.6, 1, 0.7, 0.4, 0.9, 0.5, 0.6, 0.8, 0.3, 0.7, 1, 0.6, 0.4, 0.8, 0.5].map((h, i) => (
            <div
              key={i}
              className="w-[2.5px] md:w-[3px] rounded-full bg-warm-orange/60"
              style={{ height: `${h * 28}px`, opacity: 0.4 + h * 0.6 }}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-soft-gold/15" role="img" aria-label="Pause">
            <Pause className="w-3.5 h-3.5 text-warm-secondary/40" strokeWidth={1.5} />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-orange/15 ring-2 ring-warm-orange/20" role="img" aria-label="Stop">
            <Circle className="w-4 h-4 text-warm-orange fill-warm-orange" strokeWidth={0} />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-soft-gold/15" role="img" aria-label="Notes">
            <FileText className="w-3.5 h-3.5 text-warm-secondary/40" strokeWidth={1.5} />
          </div>
        </div>
        <div className="h-px bg-soft-gold/20" />
        <div className="flex flex-col gap-1">
          <span className="text-[8px] md:text-[9px] text-warm-secondary/25 font-sans uppercase tracking-wider">Live notes</span>
          <p className="text-[9px] md:text-[10px] leading-relaxed text-dark-slate/50 font-sans">
            {"Dr. Patel recommends adjusting dosage\u2026"}
          </p>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* -- Summary screen -- */
function SummaryScreen() {
  const items = [
    { label: "Key takeaway", text: "Medication adjusted to 10mg", resolved: true },
    { label: "Next visit", text: "April 8 at 2:00 PM", resolved: true },
    { label: "Action items", text: "New prescription, blood work", resolved: false },
  ]

  return (
    <PhoneFrame ariaLabel="Pharelo summary screen showing visit takeaways, next appointment, and action items">
      <span className="font-serif text-[9px] md:text-[10px] text-warm-secondary/30 mb-2 md:mb-3">Pharelo</span>
      <div className="rounded-xl bg-cream p-3 md:p-4 border border-soft-gold/20 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 md:w-4 h-3.5 md:h-4 text-teal" strokeWidth={1.5} />
          <span className="font-serif text-[10px] md:text-xs text-dark-slate">Visit Summary</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays className="w-2.5 h-2.5 text-warm-secondary/30" strokeWidth={1.5} />
          <span className="text-[8px] md:text-[9px] text-warm-secondary/35 font-sans">{"Mom\u2019s Cardiology \u2014 Feb 24"}</span>
        </div>
        <div className="h-px bg-soft-gold/20" />
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                {item.resolved && (
                  <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-teal/15">
                    <Check className="h-1.5 w-1.5 text-teal" strokeWidth={3} />
                  </div>
                )}
                <span className="text-[8px] md:text-[9px] text-warm-secondary/25 font-sans uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <p className={`text-[9px] md:text-[10px] leading-snug font-sans ${item.resolved ? "text-dark-slate/60" : "text-warm-orange/70"}`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="h-px bg-soft-gold/20" />
        <div className="flex h-6 md:h-7 w-full items-center justify-center rounded-lg bg-teal/10 cursor-pointer transition-colors hover:bg-teal/15">
          <span className="text-[8px] md:text-[9px] text-teal font-sans font-medium">Share with family</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ------------------------------------------------------------------ */
/*  Step data                                                         */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: "01",
    title: "Prep",
    subtitle: "Before the visit",
    description:
      "You know that scattered feeling \u2014 questions half-formed, observations you\u2019re not sure matter, the fear of forgetting something important? Prep is where it all gets clear. Write it down, talk it through with Beacon, or just get it out of your head and into a place that won\u2019t forget.",
    phone: PrepScreen,
    bg: "bg-background",
  },
  {
    number: "02",
    title: "Visit",
    subtitle: "During the appointment",
    description:
      "You came prepared. Now stay present. Record the conversation, jot a quick note, snap a photo of the prescription \u2014 without losing focus on the person who matters. Your prep list is right there, and everything you capture connects back to it.",
    phone: VisitScreen,
    bg: "bg-card-surface",
  },
  {
    number: "03",
    title: "Summary",
    subtitle: "After you leave",
    description:
      "Walk away knowing what happened, what was decided, and what comes next. Every question you prepped has an answer \u2014 or a flag that it still needs one. Share it with family so no one\u2019s in the dark.",
    phone: SummaryScreen,
    bg: "bg-ice-blue",
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading">
      {/* Section header */}
      <div className="px-6 pt-16 pb-4 md:pt-24 md:pb-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AnimateIn>
            <div className="max-w-lg">
              <span className="text-sm tracking-wide uppercase text-warm-secondary/70 font-sans">
                How it works
              </span>
              <h2
                id="how-it-works-heading"
                className="mt-4 font-serif text-3xl leading-[1.12] text-dark-slate md:text-5xl tracking-tight"
              >
                Three moments.{" "}
                <span className="text-warm-secondary/80">One thread.</span>
              </h2>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Stacked panels */}
      {steps.map((step, i) => {
        const isReversed = i % 2 !== 0
        const Phone = step.phone

        return (
          <div key={step.title} className={`${step.bg} px-6 py-12 md:py-20 md:px-12`}>
            <div className="mx-auto max-w-6xl">
              <div
                className={`flex flex-col items-center gap-10 md:gap-14 lg:flex-row lg:gap-24 ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text column */}
                <div className="flex flex-1 flex-col gap-4 text-center lg:text-left">
                  <AnimateIn>
                    <span className="font-sans text-xs font-medium text-warm-secondary/45 tabular-nums tracking-wider">
                      {step.number}
                    </span>
                  </AnimateIn>

                  <AnimateIn delay={80}>
                    <h3 className="font-serif text-3xl text-dark-slate md:text-4xl tracking-tight">
                      {step.title}
                    </h3>
                  </AnimateIn>

                  <AnimateIn delay={120}>
                    <span className="text-xs tracking-wide uppercase text-warm-secondary/65 font-sans">
                      {step.subtitle}
                    </span>
                  </AnimateIn>

                  <AnimateIn delay={160}>
                    <p className="mx-auto max-w-md text-base leading-relaxed text-warm-secondary lg:mx-0 md:text-[17px]">
                      {step.description}
                    </p>
                  </AnimateIn>
                </div>

                {/* Phone column */}
                <div className="flex flex-none justify-center">
                  <AnimateIn animation="scale-in" delay={200}>
                    <Phone />
                  </AnimateIn>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
