"use client"

import { useState } from "react"
import { AnimateIn } from "./animate-in"
import { LighthouseIcon } from "./lighthouse-icon"

const LOOPS_FORM_URL =
  "https://app.loops.so/api/newsletter-form/cmlwtvrr749sw0iylt5k387od"

export function ComingSoon() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    const now = Date.now()
    const prev = localStorage.getItem("loops-form-timestamp")
    if (prev && Number(prev) + 60000 > now) {
      setError("Too many signups, please try again in a moment.")
      return
    }
    localStorage.setItem("loops-form-timestamp", String(now))

    setLoading(true)
    setError("")

    try {
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`,
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.message || "Something went wrong. Please try again.")
        localStorage.setItem("loops-form-timestamp", "")
      }
    } catch {
      setError("Something went wrong. Please try again.")
      localStorage.setItem("loops-form-timestamp", "")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative px-6 py-28 md:py-40 md:px-12 overflow-hidden">
      {/* Subtle lighthouse watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <LighthouseIcon
          className="h-64 w-64 md:h-80 md:w-80 text-warm-orange/[0.03]"
          strokeWidth={0.5}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <AnimateIn>
            <p className="text-xs font-medium uppercase tracking-widest text-warm-orange">
              Our promise
            </p>
          </AnimateIn>

          <AnimateIn delay={100}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-warm-bronze md:text-6xl tracking-tight">
              So nothing important goes unsaid.
            </h2>
          </AnimateIn>

          <AnimateIn delay={200}>
            <p className="mt-6 text-base leading-relaxed text-warm-secondary md:text-[17px]">
              We{"\u2019"}re building Pharelo for the people who carry more than
              they let on&mdash;and who deserve something that helps them
              carry it. Join us and we{"\u2019"}ll let you know when it{"\u2019"}s ready.
            </p>
          </AnimateIn>

          <AnimateIn delay={300}>
            {submitted ? (
              <div className="mt-10 rounded-2xl border border-teal/20 bg-teal-muted px-6 py-6">
                <p className="font-serif text-xl text-teal">
                  You{"\u2019"}re on the list.
                </p>
                <p className="mt-1.5 text-sm text-warm-secondary">
                  We{"\u2019"}ll be in touch when it{"\u2019"}s time.
                </p>
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:border-soft-gold/50 sm:bg-card-surface sm:p-1.5 sm:shadow-sm"
                >
                  <label htmlFor="waitlist-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    disabled={loading}
                    className="h-12 flex-1 rounded-full border border-soft-gold/50 bg-card-surface px-5 text-base text-dark-slate placeholder:text-warm-secondary/40 focus:outline-none focus:ring-2 focus:ring-warm-orange/30 sm:border-0 sm:bg-transparent sm:shadow-none sm:focus:ring-0 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 rounded-full bg-warm-orange px-8 text-sm font-medium text-card-surface transition-colors hover:bg-warm-orange-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Joining…" : "Join the waitlist"}
                  </button>
                </form>
                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}
              </>
            )}
          </AnimateIn>

          <AnimateIn delay={400}>
            <p className="mt-10 text-sm text-warm-secondary/40">
              Questions?{" "}
              <a
                href="mailto:team@pharelo.com"
                className="underline underline-offset-4 decoration-soft-gold/30 transition-colors hover:text-warm-orange hover:decoration-warm-orange/40"
              >
                team@pharelo.com
              </a>
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
