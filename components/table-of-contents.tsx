import type { BlogHeading } from '@/lib/blog'

export function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="mb-12 md:mb-16 max-w-[65ch] mx-auto">
      <p className="text-[11px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle mb-3">
        In this article
      </p>
      <ol className="flex flex-col gap-2.5 border-l border-border pl-4">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-sm text-foreground-muted hover:text-peach-600 transition-colors duration-200"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
