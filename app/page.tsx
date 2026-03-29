import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { TheProblem } from '@/components/the-problem'
import { HowItWorks } from '@/components/how-it-works'
import { MeetBeacon } from '@/components/meet-beacon'
import { Signals } from '@/components/signals'
import { WhoItsFor } from '@/components/who-its-for'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-peach-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TheProblem />
        <div className="section-fade" />
        <HowItWorks />
        <div className="section-fade" />
        <MeetBeacon />
        <Signals />
        <div className="section-fade" />
        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
