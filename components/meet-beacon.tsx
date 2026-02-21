"use client"

import { AnimateIn } from "./animate-in"
import { LighthouseIcon } from "./lighthouse-icon"

const conversation = [
  {
    from: "beacon" as const,
    text: "What\u2019s been on your mind about tomorrow\u2019s visit?",
  },
  {
    from: "user" as const,
    text: "I don\u2019t even know. There\u2019s just so much going on with her right now. I feel like I\u2019m going to walk in and blank.",
  },
  {
    from: "beacon" as const,
    text: "That happens a lot. What\u2019s the thing that keeps coming back to you \u2014 the one you\u2019d be frustrated to leave without asking?",
  },
  {
    from: "user" as const,
    text: "Honestly? I want to know if the new medication is actually doing anything. She seems the same to me, maybe worse.",
  },
  {
    from: "beacon" as const,
    text: "That\u2019s worth asking directly. Something like: \u201CHow do we know if the medication is working, and what should we be looking for at home?\u201D Want me to save that?",
  },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="h-1.5 w-1.5 rounded-full bg-cream/40 animate-typing-dot-1" />
      <div className="h-1.5 w-1.5 rounded-full bg-cream/40 animate-typing-dot-2" />
      <div className="h-1.5 w-1.5 rounded-full bg-cream/40 animate-typing-dot-3" />
    </div>
  )
}

function ChatBubble({
  from,
  text,
  delay,
}: {
  from: "beacon" | "user"
  text: string
  delay: number
}) {
  const isBeacon = from === "beacon"

  return (
    <AnimateIn delay={delay} className={`flex ${isBeacon ? "justify-start" : "justify-end"}`}>
      <div
        className={`
          max-w-[85%] md:max-w-[78%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed
          ${isBeacon
            ? "bg-white/[0.07] text-cream/90 rounded-bl-md"
            : "bg-teal/20 text-cream/95 rounded-br-md"
          }
        `}
      >
        {isBeacon && (
          <span className="mb-1.5 block text-[11px] font-medium tracking-wide uppercase text-teal/70">
            Beacon
          </span>
        )}
        {text}
      </div>
    </AnimateIn>
  )
}

export function MeetBeacon() {
  return (
    <section className="bg-dark-slate" data-theme="dark">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-start">

          {/* Left -- intro copy */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-32">
            <AnimateIn>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 ring-1 ring-teal/15">
                <LighthouseIcon className="h-5 w-5 text-teal" strokeWidth={1.5} />
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              <span className="text-sm tracking-wide text-teal/70 font-sans">
                Built into every step
              </span>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h2 className="font-serif text-4xl leading-[1.12] text-cream md:text-5xl tracking-tight">
                Beacon
              </h2>
            </AnimateIn>

            <AnimateIn delay={160}>
              <p className="text-base leading-[1.7] text-cream/55 max-w-md md:text-[17px]">
                Before a visit, you have a dozen worries and half-formed
                questions. Beacon asks the right ones to draw them out, helps
                you shape them into words a doctor can act on, and saves them
                where you won{"\u2019"}t forget. It doesn{"\u2019"}t diagnose. It doesn{"\u2019"}t
                advise. It just makes sure{" "}
                <em className="not-italic text-cream/80">
                  nothing important goes unsaid
                </em>
                .
              </p>
            </AnimateIn>
          </div>

          {/* Right -- conversational preview */}
          <div className="flex flex-col gap-3.5" role="log" aria-label="Example conversation between a caregiver and Beacon AI">
            {conversation.map((msg, i) => (
              <ChatBubble
                key={i}
                from={msg.from}
                text={msg.text}
                delay={200 + i * 200}
              />
            ))}

            {/* Typing indicator */}
            <AnimateIn delay={200 + conversation.length * 200} className="flex justify-start">
              <div className="bg-white/[0.05] rounded-2xl rounded-bl-md">
                <TypingIndicator />
              </div>
            </AnimateIn>

            {/* Disclaimer */}
            <AnimateIn delay={200 + (conversation.length + 1) * 200}>
              <p className="mt-4 text-xs text-cream/25 text-center lg:text-left">
                This is a preview of how Beacon guides you&mdash;not a real conversation.
              </p>
            </AnimateIn>
          </div>

        </div>
      </div>
    </section>
  )
}
