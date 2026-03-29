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
    <div ref={ref} className="rounded-3xl bg-surface p-5 shadow-lg flex flex-col gap-3 max-w-md">
      {messages.slice(0, visibleCount).map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${
            msg.sender === 'beacon'
              ? 'bg-background border-l-2 border-peach-500 text-foreground'
              : 'bg-peach-500/10 text-foreground'
          }`}>
            {msg.sender === 'beacon' && (
              <span className="inline-flex rounded-full bg-teal-600/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.8px] text-teal-600 mb-1.5">Beacon</span>
            )}
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}

      {showTyping && (
        <div className="flex justify-start">
          <div className="rounded-2xl bg-background border-l-2 border-peach-500 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-peach-500 typing-dot-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-peach-500 typing-dot-2" />
              <span className="w-1.5 h-1.5 rounded-full bg-peach-500 typing-dot-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
