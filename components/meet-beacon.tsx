import { MotionWrapper } from './motion-wrapper'
import { ChatDemo } from './chat-demo'

export function MeetBeacon() {
  return (
    <section
      id="beacon"
      className="section-dark glow-peach relative overflow-hidden px-6 md:px-12 py-24 md:py-40"
    >
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <MotionWrapper>
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit rounded-full bg-peach-500/15 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                Your AI companion
              </span>
              <h2 className="on-dark-heading font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
                Meet Beacon
              </h2>
              <p className="on-dark-body text-lg md:text-xl leading-relaxed max-w-[48ch]">
                Beacon surfaces personalized suggestions before your visit and generates clear summaries after. Like a friend who remembers everything your doctor said.
              </p>
            </div>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.15}>
            <div className="md:pl-8">
              <ChatDemo />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
