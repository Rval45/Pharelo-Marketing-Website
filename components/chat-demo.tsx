'use client'

import { useEffect, useRef, useState } from 'react'

const messages = [
  {
    sender: 'beacon',
    text: 'Based on your notes about recurring headaches, you might want to ask your doctor about potential triggers and whether imaging would be helpful.',
    delay: 0,
  },
  {
    sender: 'user',
    text: 'Good idea \u2014 I keep forgetting to bring that up.',
    delay: 800,
  },
  {
    sender: 'beacon',
    text: 'I\u2019ve added it to your checklist. After your visit, I\u2019ll summarize what was discussed so you can share it with your partner.',
    delay: 1600,
  },
]

export function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el)
          let count = 0
          function showNext() {
            if (count < messages.length) {
              setShowTyping(true)
              const delay = count === 0 ? 400 : 800
              setTimeout(() => {
                setShowTyping(false)
                count++
                setVisibleCount(count)
                if (count < messages.length) {
                  setTimeout(showNext, 600)
                }
              }, delay)
            }
          }
          showNext()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-3 max-w-md">
      {messages.slice(0, visibleCount).map((msg, i) => (
        <div
          key={i}
          className={`chat-bubble flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${
            msg.sender === 'beacon'
              ? 'bg-cream-light border border-border text-foreground'
              : 'bg-bronze/10 text-foreground'
          }`}>
            {msg.sender === 'beacon' && (
              <span className="block text-[10px] font-medium uppercase tracking-widest text-bronze mb-1">Beacon</span>
            )}
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}

      {showTyping && (
        <div className="flex justify-start">
          <div className="rounded-2xl bg-cream-light border border-border px-4 py-3">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot-2" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground typing-dot-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
