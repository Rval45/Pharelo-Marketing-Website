import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SupportFAQ } from '@/components/support-faq'

export const metadata: Metadata = {
  title: 'Support \u2014 Pharelo',
  description: 'Get help with Pharelo. Contact us or browse frequently asked questions.',
}

const faqs = [
  { question: 'I\u2019m having trouble logging in. What should I do?', answer: 'Try resetting your password using the \u201cForgot password\u201d link on the login screen. If the issue persists, contact us and we\u2019ll help you regain access to your account.' },
  { question: 'How do I delete my account or personal data?', answer: 'You can request account deletion directly from the app\u2019s settings, or email us at team@pharelo.com. We\u2019ll process your request and confirm deletion within 5 business days.' },
  { question: 'Is my health information safe?', answer: 'Yes. All health-related data is encrypted in transit and at rest. We never sell your data to third parties. See our Privacy Policy for full details on how we handle your information.' },
  { question: 'How do I manage or cancel my subscription?', answer: 'Subscriptions are managed through your Apple ID. Go to Settings \u2192 Apple ID \u2192 Subscriptions on your iPhone to view, modify, or cancel your Pharelo subscription.' },
  { question: 'How can I share feedback or suggest a feature?', answer: 'We\u2019d love to hear from you. Email us directly at team@pharelo.com. Every piece of feedback helps shape the future of Pharelo.' },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-[65ch] px-6 py-14 md:py-20">
          <Link href="/" className="group mb-10 inline-flex items-center gap-2 py-2 text-sm text-foreground-subtle transition-colors hover:text-foreground">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>
          <div className="mb-12 flex flex-col gap-3">
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">Support</h1>
            <p className="text-sm leading-relaxed text-foreground-muted max-w-lg">Need help with Pharelo? We{'\u2019'}re here for you.</p>
          </div>
          <section className="mb-14">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-peach-500/10">
                <EnvelopeSimple size={18} className="text-peach-500" weight="fill" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-foreground-subtle uppercase tracking-widest">Email us</span>
                <a href="mailto:team@pharelo.com" className="text-sm font-medium text-foreground transition-colors hover:text-peach-500">team@pharelo.com</a>
              </div>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl text-foreground mb-6">Frequently asked questions</h2>
            <SupportFAQ faqs={faqs} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
