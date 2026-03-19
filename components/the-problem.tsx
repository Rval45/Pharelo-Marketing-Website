import { ScrollReveal } from './scroll-reveal'

const scenarios = [
  'You forgot the one question that mattered.',
  'The doctor talked fast and you nodded along.',
  'You left and couldn\u2019t remember what they said.',
  'You got home and realized you missed half the story.',
]

export function TheProblem() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="md:grid md:grid-cols-[1fr_1.8fr] md:gap-16 lg:gap-24">
          {/* Left — anchor phrase */}
          <ScrollReveal>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-snug md:sticky md:top-32">
              You{'\u2019'}ve been there.
            </p>
          </ScrollReveal>

          {/* Right — scenarios with breathing room */}
          <div className="mt-12 md:mt-0 flex flex-col">
            {scenarios.map((text, i) => (
              <ScrollReveal
                key={i}
                className="reveal stagger"
                style={{ '--index': i } as React.CSSProperties}
              >
                <div className="py-8 md:py-10 border-t border-border">
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-muted">
                    {text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
