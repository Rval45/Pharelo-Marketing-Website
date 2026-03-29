import { MotionWrapper } from './motion-wrapper'

export function Signals() {
  return (
    <section id="signals" className="px-6 md:px-12 py-20 md:py-28">
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
            <div className="rounded-[14px] bg-surface p-6 shadow-lg">
              <svg viewBox="0 0 400 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 180 C60 170, 100 120, 160 130 S260 90, 340 60 L380 50" stroke="#D4935A" strokeWidth="2.5" strokeLinecap="round" className="line-draw" fill="none" />
                <path d="M20 160 C80 150, 120 170, 180 140 S280 120, 340 100 L380 90" stroke="#298282" strokeWidth="2" strokeLinecap="round" className="line-draw" opacity="0.7" fill="none" />
                <path d="M20 200 C70 190, 130 160, 190 170 S290 130, 340 140 L380 120" stroke="#D4785C" strokeWidth="2" strokeLinecap="round" className="line-draw" opacity="0.5" fill="none" />
              </svg>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-peach-500" />
                  <span className="text-xs text-foreground-muted">Sleep quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-teal-600/70" />
                  <span className="text-xs text-foreground-muted">Medication response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-coral/50" />
                  <span className="text-xs text-foreground-muted">Energy levels</span>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
