"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Send, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LighthouseIcon } from "@/components/lighthouse-icon"

const faqs = [
  {
    question: "I\u2019m having trouble logging in. What should I do?",
    answer:
      "Try resetting your password using the \u201cForgot password\u201d link on the login screen. If the issue persists, contact us and we\u2019ll help you regain access to your account.",
  },
  {
    question: "How do I delete my account or personal data?",
    answer:
      "You can request account deletion directly from the app\u2019s settings, or email us at team@pharelo.com. We\u2019ll process your request and confirm deletion within 5 business days.",
  },
  {
    question: "Is my health information safe?",
    answer:
      "Yes. All health-related data is encrypted in transit and at rest. We never sell your data to third parties. See our Privacy Policy for full details on how we handle your information.",
  },
  {
    question: "How do I manage or cancel my subscription?",
    answer:
      "Subscriptions are managed through your Apple ID. Go to Settings \u2192 Apple ID \u2192 Subscriptions on your iPhone to view, modify, or cancel your Pharelo subscription.",
  },
  {
    question: "How can I share feedback or suggest a feature?",
    answer:
      "We\u2019d love to hear from you. Use the contact form below or email us directly. Every piece of feedback helps shape the future of Pharelo.",
  },
]

export default function SupportPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("sending")
    // Simulate send -- replace with real endpoint
    setTimeout(() => setFormState("sent"), 1200)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-14 md:py-20">
          {/* Back link */}
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-warm-secondary/50 transition-colors hover:text-warm-orange"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          {/* Page header */}
          <div className="mb-12 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LighthouseIcon className="h-6 w-6 text-warm-orange" strokeWidth={1.5} />
              <h1 className="font-serif text-3xl text-dark-slate md:text-4xl tracking-tight">
                Support
              </h1>
            </div>
            <p className="text-sm leading-relaxed text-warm-secondary max-w-lg">
              Pharelo helps caregivers prepare for medical appointments with confidence.
              If you need help with your account, have a technical issue, billing question,
              or just want to share feedback, we&apos;re here for you.
            </p>
          </div>

          {/* Direct contact */}
          <section className="mb-14">
            <div className="flex items-center gap-3 rounded-xl bg-card-surface border border-soft-gold/20 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warm-orange/10">
                <Mail className="h-4 w-4 text-warm-orange" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-warm-secondary/50 uppercase tracking-wide">
                  Email us directly
                </span>
                <a
                  href="mailto:team@pharelo.com"
                  className="text-sm font-medium text-dark-slate transition-colors hover:text-warm-orange"
                >
                  team@pharelo.com
                </a>
              </div>
            </div>
          </section>

          {/* Contact form */}
          <section className="mb-14">
            <h2 className="font-serif text-xl text-dark-slate mb-1">Send us a message</h2>
            <p className="text-xs text-warm-secondary/50 mb-6">
              We typically respond within 1&ndash;2 business days.
            </p>

            {formState === "sent" ? (
              <div className="flex flex-col items-center gap-3 rounded-xl bg-teal-muted border border-teal/15 px-6 py-10 text-center">
                <CheckCircle2 className="h-8 w-8 text-teal" strokeWidth={1.5} />
                <p className="font-serif text-lg text-dark-slate">
                  Message received
                </p>
                <p className="text-sm text-warm-secondary max-w-xs">
                  Thank you for reaching out. We&apos;ll get back to you within 1&ndash;2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs text-warm-secondary/60 uppercase tracking-wide">
                      Name <span className="text-warm-orange">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="rounded-lg border border-soft-gold/30 bg-card-surface px-3.5 py-2.5 text-sm text-dark-slate placeholder:text-warm-secondary/30 transition-colors focus:border-warm-orange/50 focus:outline-none focus:ring-2 focus:ring-warm-orange/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs text-warm-secondary/60 uppercase tracking-wide">
                      Email <span className="text-warm-orange">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="rounded-lg border border-soft-gold/30 bg-card-surface px-3.5 py-2.5 text-sm text-dark-slate placeholder:text-warm-secondary/30 transition-colors focus:border-warm-orange/50 focus:outline-none focus:ring-2 focus:ring-warm-orange/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs text-warm-secondary/60 uppercase tracking-wide">
                    Subject <span className="text-warm-orange">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="How can we help?"
                    className="rounded-lg border border-soft-gold/30 bg-card-surface px-3.5 py-2.5 text-sm text-dark-slate placeholder:text-warm-secondary/30 transition-colors focus:border-warm-orange/50 focus:outline-none focus:ring-2 focus:ring-warm-orange/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-warm-secondary/60 uppercase tracking-wide">
                    Message <span className="text-warm-orange">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your issue or share your feedback..."
                    className="resize-none rounded-lg border border-soft-gold/30 bg-card-surface px-3.5 py-2.5 text-sm text-dark-slate placeholder:text-warm-secondary/30 transition-colors focus:border-warm-orange/50 focus:outline-none focus:ring-2 focus:ring-warm-orange/10"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-warm-orange px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-warm-orange-hover disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto sm:self-start"
                >
                  {formState === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-xl text-dark-slate mb-6">
              Frequently asked questions
            </h2>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-soft-gold/20 bg-card-surface overflow-hidden transition-shadow hover:shadow-sm hover:shadow-warm-orange/5"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-medium text-dark-slate pr-4">
                        {faq.question}
                      </span>
                      <span
                        className="shrink-0 text-warm-secondary/30 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm leading-relaxed text-warm-secondary">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
