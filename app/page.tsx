import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TheProblemDim } from "@/components/the-problem-dim"
import { HowItWorks } from "@/components/how-it-works"
import { WhoItsFor } from "@/components/who-its-for"
import { MeetBeacon } from "@/components/meet-beacon"
import { ComingSoon } from "@/components/coming-soon"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TheProblemDim />
        <HowItWorks />
        <WhoItsFor />
        <MeetBeacon />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  )
}
