'use client'

import { useState } from 'react'

export function SupportFAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="border-t border-border">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
              <span className="shrink-0 text-foreground-subtle transition-transform duration-200 text-lg" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }} aria-hidden="true">+</span>
            </button>
            {isOpen && (
              <div className="pb-4">
                <p className="text-sm leading-relaxed text-foreground-muted">{faq.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
