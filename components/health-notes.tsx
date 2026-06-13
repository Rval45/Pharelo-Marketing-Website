import { NotePencil, Sparkle } from '@phosphor-icons/react/dist/ssr'

const notes = [
  {
    date: 'Mar 12',
    tag: 'Sleep',
    color: 'bg-peach-500',
    text: 'Slept poorly — woke up three times overnight.',
  },
  {
    date: 'Mar 14',
    tag: 'Medication',
    color: 'bg-teal-600',
    text: 'More energy in the morning since the dosage change.',
  },
  {
    date: 'Mar 18',
    tag: 'Energy',
    color: 'bg-coral',
    text: 'Afternoon fatigue again — started around 3pm.',
  },
  {
    date: 'Mar 21',
    tag: 'Appetite',
    color: 'bg-sage',
    text: 'Appetite noticeably better this week.',
  },
]

export function HealthNotes() {
  return (
    <div className="rounded-[18px] bg-surface p-5 md:p-6 shadow-lg ring-1 ring-foreground/[0.06]">
      {/* Page header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-peach-500/12">
            <NotePencil size={16} weight="fill" className="text-peach-700" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">Health Notes</span>
            <span className="text-[11px] text-foreground-muted">Dad &middot; March</span>
          </div>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.8px] text-foreground-muted">
          12 entries
        </span>
      </div>

      {/* Note feed */}
      <div className="flex flex-col">
        {notes.map((note) => (
          <div key={note.date} className="flex gap-3 py-3.5 border-b border-border">
            <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${note.color}`} />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.8px] text-foreground-muted">
                  {note.tag}
                </span>
                <span className="text-[11px] text-foreground-muted">{note.date}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{note.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Surfaced pattern */}
      <div className="mt-4 flex gap-2.5 rounded-2xl border border-peach-500/20 bg-peach-500/[0.07] p-3.5">
        <Sparkle size={18} weight="fill" className="mt-0.5 flex-shrink-0 text-peach-600" />
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">Pattern noticed:</span> afternoon fatigue has appeared in
          4 notes this month — worth raising at the next visit.
        </p>
      </div>
    </div>
  )
}
