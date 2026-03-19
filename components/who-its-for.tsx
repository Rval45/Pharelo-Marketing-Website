import { ScrollReveal } from './scroll-reveal'

const scenarios = [
  {
    headline: 'Managing a chronic condition',
    description: 'You see three specialists, a primary care doctor, and a therapist. Each has a piece of the puzzle, but none of them see the whole picture. Pharelo helps you carry the full story into every room.',
  },
  {
    headline: 'Caring for a parent',
    description: 'You\u2019re coordinating appointments, medications, and follow-ups for someone who can\u2019t always do it themselves. Pharelo keeps track so you can focus on being there.',
  },
  {
    headline: 'Facing a big appointment',
    description: 'The specialist visit you\u2019ve been waiting weeks for. You have twenty minutes and a hundred questions. Pharelo helps you walk in with a plan and walk out with answers.',
  },
]

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <span className="text-xs font-medium uppercase tracking-widest text-bronze">Who it{'\u2019'}s for</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight text-foreground max-w-lg">Built for the moments that matter most</h2>
        </ScrollReveal>

        <div className="mt-16 flex flex-col">
          {scenarios.map((scenario, i) => (
            <ScrollReveal
              key={i}
              className="reveal stagger"
              style={{ '--index': i } as React.CSSProperties}
            >
              <div className={`py-10 md:py-12 border-t border-border ${i % 2 === 1 ? 'md:pl-24' : ''}`}>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{scenario.headline}</h3>
                <p className="text-base leading-relaxed text-muted max-w-[55ch]">{scenario.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
