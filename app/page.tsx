import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TheProblem } from "@/components/the-problem"
import { HowItWorks } from "@/components/how-it-works"
import { MeetBeacon } from "@/components/meet-beacon"
import { ComingSoon } from "@/components/coming-soon"
import { Footer } from "@/components/footer"
import { StickyMobileCTA } from "@/components/sticky-mobile-cta"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TheProblem />
        <HowItWorks />
        <MeetBeacon />
        <ComingSoon />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}
