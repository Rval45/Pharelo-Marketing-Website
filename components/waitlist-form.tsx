'use client'

import { useState } from 'react'

const LOOPS_FORM_URL =
  'https://app.loops.so/api/newsletter-form/cmlwtvrr749sw0iylt5k387od'

export function WaitlistForm({ id = 'waitlist-email' }: { id?: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    const now = Date.now()
    const prev = localStorage.getItem('loops-form-timestamp')
    if (prev && Number(prev) + 60000 > now) {
      setError('Too many signups, please try again in a moment.')
      return
    }
    localStorage.setItem('loops-form-timestamp', String(now))

    setLoading(true)
    setError('')

    try {
      const res = await fetch(LOOPS_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`,
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.message || 'Something went wrong. Please try again.')
        localStorage.setItem('loops-form-timestamp', '')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      localStorage.setItem('loops-form-timestamp', '')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[14px] border border-peach-500/20 bg-surface px-6 py-6 animate-success shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" className="text-teal-600/30" />
            <path
              d="M9 14.5l3.5 3.5 6.5-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-teal-600 animate-checkmark"
              style={{ strokeDasharray: 24, strokeDashoffset: 24 }}
            />
          </svg>
          <p className="font-serif text-xl text-foreground">
            You{'\u2019'}re on the list.
          </p>
        </div>
        <p className="mt-1.5 text-sm text-foreground-muted text-center">
          We{'\u2019'}ll be in touch when it{'\u2019'}s time.
        </p>
      </div>
    )
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:border-border sm:bg-surface sm:p-1.5"
      >
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          disabled={loading}
          className="h-14 flex-1 rounded-full border border-stone-300 bg-surface px-6 text-base text-foreground placeholder:text-foreground-subtle shadow-sm focus:outline-none focus:ring-2 focus:ring-peach-500/40 focus:ring-offset-2 focus:ring-offset-background sm:border-0 sm:bg-transparent sm:shadow-none sm:focus:ring-offset-0 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary h-14 rounded-full bg-peach-500 px-8 text-base font-semibold text-white tracking-[0.3px] hover:bg-peach-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Joining\u2026' : 'Join the waitlist'}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
    </div>
  )
}
