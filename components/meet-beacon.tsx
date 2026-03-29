import { MotionWrapper } from './motion-wrapper'
import { ChatDemo } from './chat-demo'

export function MeetBeacon() {
  return (
    <section id="beacon" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <MotionWrapper>
            <div className="flex flex-col gap-5 md:sticky md:top-32">
              <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                Your AI companion
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">Meet Beacon</h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground-muted max-w-[50ch]">
                Beacon surfaces personalized suggestions before your visit and generates clear summaries after. Like a friend who remembers everything your doctor said.
              </p>
            </div>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.15}>
            <div className="md:pt-8">
              <ChatDemo />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
