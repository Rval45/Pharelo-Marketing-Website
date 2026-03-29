import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service \u2014 Pharelo',
  description: 'Terms governing the use of Pharelo.',
}

const sections = [
  { title: 'Acceptance of terms', content: 'By accessing or using Pharelo, you agree to be bound by these terms. If you do not agree, please do not use the app.' },
  { title: 'Description of service', content: 'Pharelo is a mobile application designed to help you prepare for, document, and follow up on medical appointments. The app provides organizational tools, AI-assisted question preparation, and appointment summaries.' },
  { title: 'Medical disclaimer', content: 'Pharelo is not a medical device and does not provide medical advice, diagnosis, or treatment. The AI features are designed to help you organize your thoughts and form questions \u2014 not to replace professional medical guidance. Always consult with a qualified healthcare provider.' },
  { title: 'User accounts', content: 'You are responsible for maintaining the security of your account credentials. You agree to provide accurate information and to update it as needed. We reserve the right to suspend accounts that violate these terms.' },
  { title: 'Limitation of liability', content: 'Pharelo is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the app, including but not limited to medical decisions made based on information organized through Pharelo.' },
  { title: 'Changes to terms', content: 'We may update these terms from time to time. Continued use of Pharelo after changes are posted constitutes acceptance of the revised terms.' },
  { title: 'Contact', content: 'If you have questions about these terms, please reach out to us at team@pharelo.com.' },
]

export default function TermsPage() {
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
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">Terms of service</h1>
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
