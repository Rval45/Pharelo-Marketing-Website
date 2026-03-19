import { ScrollReveal } from './scroll-reveal'
import { AppMockup } from './app-mockup'
import { CheckSquare, Waveform, ListChecks } from '@phosphor-icons/react/dist/ssr'

const phases = [
  {
    id: 'before',
    label: 'Before your visit',
    headline: 'Prepare with confidence',
    description: 'Build a checklist of questions, symptoms, and topics you want to cover. Never walk in empty-handed again.',
    mockup: 'checklist',
    textSide: 'left' as const,
  },
  {
    id: 'during',
    label: 'During your visit',
    headline: 'Capture every detail',
    description: 'Record your appointment with live transcription. Stay present in the conversation while Pharelo keeps track.',
    mockup: 'recording',
    textSide: 'right' as const,
  },
  {
    id: 'after',
    label: 'After your visit',
    headline: 'Understand what happened',
    description: 'Get a clear summary of what was discussed, what was decided, and what to do next. Share it with family or your care team.',
    mockup: 'summary',
    textSide: 'left' as const,
  },
]

function ChecklistMockup() {
  const items = [
    { text: 'Ask about new medication side effects', checked: true },
    { text: 'Mention recurring headaches', checked: true },
    { text: 'Request updated lab work', checked: false },
    { text: 'Discuss sleep concerns', checked: false },
  ]
  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        <CheckSquare size={16} className="text-bronze" weight="fill" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Appointment prep</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${item.checked ? 'bg-bronze border-bronze' : 'border-muted-foreground'}`}>
            {item.checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l2.5 2.5L9 1" stroke="#FFFCF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className={`text-sm leading-snug ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{item.text}</span>
        </div>
      ))}
    </div>
  )
}

function RecordingMockup() {
  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <Waveform size={16} className="text-bronze" weight="fill" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Recording</span>
      </div>
      <div className="flex items-end justify-center gap-[3px] h-12">
        {[0.3, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.85, 0.55, 0.75, 0.95, 0.45, 0.65, 0.35, 0.8, 0.5, 0.7].map((h, i) => (
          <div key={i} className="w-1.5 rounded-full bg-bronze/40" style={{ height: `${h * 100}%` }} />
        ))}
      </div>
      <div className="rounded-lg bg-cream-light p-3 border border-border">
        <p className="text-xs text-muted leading-relaxed">
          &ldquo;...so the lab results came back and your cholesterol is slightly elevated. I&rsquo;d recommend we adjust the dosage and check again in three months...&rdquo;
        </p>
      </div>
    </div>
  )
}

function SummaryMockup() {
  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <ListChecks size={16} className="text-bronze" weight="fill" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Visit summary</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="rounded-lg bg-cream-light p-3 border border-border">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Key takeaway</p>
          <p className="text-xs text-foreground leading-relaxed">Cholesterol slightly elevated. Dosage adjustment recommended.</p>
        </div>
        <div className="rounded-lg bg-cream-light p-3 border border-border">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Action items</p>
          <p className="text-xs text-foreground leading-relaxed">Follow-up blood work in 3 months. New prescription starts Monday.</p>
        </div>
      </div>
    </div>
  )
}

const mockupComponents: Record<string, React.FC> = {
  checklist: ChecklistMockup,
  recording: RecordingMockup,
  summary: SummaryMockup,
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-24 md:gap-36">
          {phases.map((phase) => {
            const MockupContent = mockupComponents[phase.mockup]
            const isLeft = phase.textSide === 'left'
            return (
              <div key={phase.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <ScrollReveal className={`reveal ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-medium uppercase tracking-widest text-bronze">{phase.label}</span>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">{phase.headline}</h2>
                    <p className="text-base leading-relaxed text-muted max-w-[50ch]">{phase.description}</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal className={`${isLeft ? 'reveal-right md:order-2' : 'reveal-left md:order-1'}`}>
                  <AppMockup>
                    <MockupContent />
                  </AppMockup>
                </ScrollReveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
