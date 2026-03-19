import { ScrollReveal } from './scroll-reveal'
import { ChatDemo } from './chat-demo'

export function MeetBeacon() {
  return (
    <section id="beacon" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <ScrollReveal>
            <div className="flex flex-col gap-5 md:sticky md:top-32">
              <span className="text-xs font-medium uppercase tracking-widest text-bronze">Your AI companion</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">Meet Beacon</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted max-w-[50ch]">
                Beacon surfaces personalized suggestions before your visit and generates clear summaries after. Like a friend who remembers everything your doctor said.
              </p>
            </div>
          </ScrollReveal>
          <div className="md:pt-8">
            <ChatDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
