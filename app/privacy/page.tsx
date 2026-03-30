import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy \u2014 Pharelo',
  description: 'How Pharelo handles your data and protects your privacy.',
  alternates: { canonical: 'https://pharelo.com/privacy' },
}

const sections = [
  { title: 'Data we collect', content: 'We collect information you provide directly, such as account details, appointment notes, and voice recordings you choose to capture. We also collect usage data to improve the app experience.' },
  { title: 'How we use it', content: 'Your data is used to power the features you rely on \u2014 organizing appointments, generating summaries, and helping you prepare for visits. We do not sell your data to third parties.' },
  { title: 'Health data', content: 'Pharelo may process health-related information you choose to enter. This data is treated with the highest level of care and encrypted both in transit and at rest. We comply with applicable health data regulations.' },
  { title: 'Third-party services', content: 'We use select third-party services to operate Pharelo, including cloud hosting and AI processing. These partners are bound by strict data protection agreements.' },
  { title: 'Your rights', content: 'You have the right to access, correct, or delete your personal data at any time. You can also request a copy of your data or ask us to stop processing it.' },
  { title: 'Contact', content: 'If you have questions about this policy, please reach out to us at team@pharelo.com.' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-[65ch] px-6 py-14 md:py-20">
          <Link href="/" className="group mb-10 inline-flex items-center gap-2 py-2 text-sm text-foreground-subtle transition-colors hover:text-foreground">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>
          <div className="mb-12 flex flex-col gap-2">
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">Privacy policy</h1>
            <p className="text-xs text-foreground-subtle">Last updated: February 2026</p>
          </div>
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <article key={section.title} className="flex flex-col gap-2 border-t border-border pt-6">
                <h2 className="font-serif text-lg text-foreground">{section.title}</h2>
                <p className="text-sm leading-relaxed text-foreground-muted">{section.content}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
