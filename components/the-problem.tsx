import { ScrollReveal } from './scroll-reveal'

const scenarios = [
  'You forgot the one question that mattered.',
  'The doctor talked fast and you nodded along.',
  'You left and couldn\u2019t remember what they said.',
  'You got home and realized you missed half the story.',
]

export function TheProblem() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[42ch] text-center">
        <ScrollReveal>
          <p className="font-serif text-3xl md:text-4xl italic text-foreground leading-snug">
            You{'\u2019'}ve been there.
          </p>
        </ScrollReveal>

        <div className="mt-16 flex flex-col gap-0">
          {scenarios.map((text, i) => (
            <ScrollReveal
              key={i}
              className="reveal stagger"
              style={{ '--index': i } as React.CSSProperties}
            >
              <div className="py-6 border-t border-border first:border-t-0">
                <p className="text-lg md:text-xl leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
