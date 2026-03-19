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
      <Header />
      <main>
        <Hero />
        <TheProblem />
        <HowItWorks />
        <MeetBeacon />
        <Signals />
        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
