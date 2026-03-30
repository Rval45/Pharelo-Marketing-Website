import { SignalsChart } from './signals-chart'
import { MotionWrapper } from './motion-wrapper'

export function Signals() {
  return (
    <section id="signals" className="px-6 md:px-12 py-14 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <MotionWrapper>
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                Health insights
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">See what your visits reveal</h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground-muted max-w-[50ch]">
                Signals tracks health themes across your appointments over time. Patterns emerge that a single visit can{'\u2019'}t show — giving you and your care team a fuller picture.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.1}>
            <SignalsChart />
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
