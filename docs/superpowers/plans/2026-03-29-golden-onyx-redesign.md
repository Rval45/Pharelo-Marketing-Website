# Golden Onyx Marketing Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the "Golden Onyx" design system to the Pharelo marketing website — new colors, typography, warm shadows, Framer Motion animations, and reworked hero layout.

**Architecture:** Bottom-up approach: install dependencies and lay foundation tokens first (globals.css, layout.tsx, motion wrapper), then update each component from outer shell (header/footer) inward to content sections. Each task produces a compilable, visually verifiable state.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4 (inline @theme), Framer Motion, DM Serif Display + Inter (Google Fonts), TypeScript

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `package.json` | Add framer-motion dependency |
| Modify | `app/layout.tsx` | Swap fonts to DM Serif Display + Inter |
| Modify | `app/globals.css` | Full token rewrite — colors, shadows, typography, animations |
| Modify | `app/page.tsx` | Update skip-link classes, section-fade divider classes |
| Create | `components/motion-wrapper.tsx` | Framer Motion scroll reveal (replaces scroll-reveal.tsx) |
| Delete | `components/scroll-reveal.tsx` | Replaced by motion-wrapper.tsx |
| Modify | `components/header.tsx` | Golden Onyx tokens + Framer entrance |
| Modify | `components/footer.tsx` | Dark warm earth.800 background inversion |
| Modify | `components/waitlist-form.tsx` | Peach-500 button, surface card, warm focus rings |
| Modify | `components/hero.tsx` | Full rethink — asymmetric photo fade hero |
| Modify | `components/hero-variant-a.tsx` | Floating feature cards section (below hero) |
| Modify | `components/the-problem.tsx` | Token refresh + motion wrapper swap |
| Modify | `components/how-it-works.tsx` | Phase pills + token refresh + motion |
| Modify | `components/app-mockup.tsx` | Surface background + warm shadow |
| Modify | `components/meet-beacon.tsx` | Token refresh + motion wrapper |
| Modify | `components/chat-demo.tsx` | Message styling — peach accents, teal beacon label |
| Modify | `components/signals.tsx` | Chart recolor (peach/teal/coral) + motion |
| Modify | `components/who-its-for.tsx` | Asymmetric grid rework + motion |
| Modify | `components/final-cta.tsx` | Left-align + token refresh + motion |

---

### Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install framer-motion**

```bash
pnpm add framer-motion
```

- [ ] **Step 2: Verify installation**

```bash
pnpm list framer-motion
```

Expected: `framer-motion` version listed (11.x or later)

- [ ] **Step 3: Verify dev server still compiles**

```bash
pnpm dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: HTTP 200

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add framer-motion dependency"
```

---

### Task 2: Swap Fonts — DM Serif Display + Inter

**Files:**
- Modify: `app/layout.tsx`

Replace the entire file with:

- [ ] **Step 1: Rewrite layout.tsx with new fonts**

```tsx
import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pharelo — Walk in prepared. Walk out clear.',
  description:
    'Pharelo helps you prepare for medical appointments, capture what matters during visits, and understand everything after.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSerif.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify dev server compiles with new fonts**

```bash
pnpm dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: HTTP 200. Page renders with Inter body text and DM Serif Display available for serif elements.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: swap fonts to DM Serif Display + Inter (Golden Onyx)"
```

---

### Task 3: Rewrite globals.css with Golden Onyx Tokens

**Files:**
- Modify: `app/globals.css`

Replace the entire file contents with the Golden Onyx token set. This is the largest single change — it rewires every color, shadow, and animation.

- [ ] **Step 1: Write the new globals.css**

```css
@import 'tailwindcss';

@theme inline {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-serif: var(--font-dm-serif), 'Georgia', serif;

  /* Golden Onyx — Colors */
  --color-background: #F7F3EC;
  --color-surface: #FDF8F3;
  --color-foreground: #2C2416;
  --color-foreground-muted: rgba(44, 36, 22, 0.6);
  --color-foreground-subtle: rgba(44, 36, 22, 0.3);
  --color-peach-500: #D4935A;
  --color-peach-600: #C47840;
  --color-peach-700: #A86330;
  --color-teal-600: #298282;
  --color-coral: #D4785C;
  --color-sage: #7BA68A;
  --color-error: #F43F5E;
  --color-warning: #F59E0B;
  --color-success: #10B981;
  --color-border: rgba(44, 36, 22, 0.08);

  /* Warm amber-tinted shadows */
  --shadow-xs: 0 1px 2px rgba(160, 110, 50, 0.04);
  --shadow-sm: 0 1px 3px rgba(160, 110, 50, 0.06);
  --shadow-md: 0 4px 12px rgba(160, 110, 50, 0.08);
  --shadow-lg: 0 12px 32px rgba(160, 110, 50, 0.1);
  --shadow-xl: 0 20px 40px -15px rgba(160, 110, 50, 0.12);

  /* Animations (kept for non-Framer elements) */
  --animate-fade-up: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-fade-in: fade-in 0.6s ease both;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  * {
    border-color: var(--color-border);
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
  }
}

/* Subtle paper grain texture — fixed overlay, no GPU repaint */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.25;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
@media (max-width: 767px) {
  body::after {
    display: none;
  }
}

/* Section transition — subtle warm peach divider */
.section-fade {
  position: relative;
}
.section-fade::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(212, 147, 90, 0.15), transparent);
}

/* Animation keyframes */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Typing indicator dots — kept as CSS (simple infinite loop) */
@keyframes typing-dot {
  0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-2px); }
}

.typing-dot-1 { animation: typing-dot 1.4s ease-in-out infinite; }
.typing-dot-2 { animation: typing-dot 1.4s ease-in-out 0.2s infinite; }
.typing-dot-3 { animation: typing-dot 1.4s ease-in-out 0.4s infinite; }

/* SVG line draw — triggered by Framer Motion adding .visible */
.line-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1);
}
.visible .line-draw {
  stroke-dashoffset: 0;
}

/* Mobile menu */
.mobile-menu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.mobile-menu.open {
  max-height: 400px;
}

/* Tactile button feedback — peach buttons */
.btn-primary {
  transition: background-color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: var(--shadow-sm);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
button:active:not(:disabled),
[role="button"]:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
  box-shadow: var(--shadow-xs);
}

/* Nav link underline reveal */
nav a:not(.btn-primary) {
  position: relative;
}
nav a:not(.btn-primary)::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-peach-700);
  transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
nav a:not(.btn-primary):hover::after {
  width: 100%;
}

/* Waitlist success */
@keyframes success-entrance {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-success {
  animation: success-entrance 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes checkmark-draw {
  from { stroke-dashoffset: 24; }
  to { stroke-dashoffset: 0; }
}

.animate-checkmark {
  animation: checkmark-draw 0.4s ease-out 0.3s both;
}

/* Hero — staggered float for glassmorphism cards */
@keyframes layer-float {
  0%, 100% { transform: var(--layer-rotate) translateY(0px); }
  50% { transform: var(--layer-rotate) translateY(-6px); }
}
.hero-layer {
  --layer-rotate: rotate(0deg);
  animation: layer-float 7s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
.hero-layer:nth-child(1) { --layer-rotate: rotate(3deg); animation-duration: 8s; }
.hero-layer:nth-child(2) { --layer-rotate: rotate(-2deg); animation-duration: 7s; animation-delay: 0.8s; }
.hero-layer:nth-child(3) { --layer-rotate: rotate(0.5deg); animation-duration: 6.5s; animation-delay: 1.6s; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .hero-layer {
    animation: none;
  }
  .typing-dot-1, .typing-dot-2, .typing-dot-3 {
    animation: none;
    opacity: 0.5;
  }
  .line-draw {
    stroke-dashoffset: 0;
    transition: none;
  }
  .animate-success {
    animation: none;
    opacity: 1;
  }
  .animate-checkmark {
    animation: none;
    stroke-dashoffset: 0;
  }
  body::after {
    display: none;
  }
}
```

- [ ] **Step 2: Verify dev server compiles and page renders**

```bash
pnpm dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: HTTP 200. Open browser — background should now be `#F7F3EC` (slightly warmer/lighter than before). Text will be darker brown (`#2C2416`). Some elements will look broken because components still reference old token names like `cream-light` and `bronze` — that's expected and fixed in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: rewrite globals.css with Golden Onyx design tokens"
```

---

### Task 4: Create Motion Wrapper (Replaces scroll-reveal.tsx)

**Files:**
- Create: `components/motion-wrapper.tsx`
- Delete: `components/scroll-reveal.tsx`

- [ ] **Step 1: Create motion-wrapper.tsx**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Variant = 'fade-up' | 'slide-left' | 'slide-right' | 'fade-in'

const initialStates: Record<Variant, { opacity: number; x?: number; y?: number }> = {
  'fade-up': { opacity: 0, y: 24 },
  'slide-left': { opacity: 0, x: -30 },
  'slide-right': { opacity: 0, x: 30 },
  'fade-in': { opacity: 0 },
}

export function MotionWrapper({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  staggerIndex,
}: {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  className?: string
  staggerIndex?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  const computedDelay = delay + (staggerIndex ?? 0) * 0.12

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialStates[variant]}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initialStates[variant]}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: computedDelay,
      }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Delete scroll-reveal.tsx**

```bash
rm components/scroll-reveal.tsx
```

- [ ] **Step 3: Verify dev server compiles**

Note: Components still import `ScrollReveal` — the build will show import errors. That's expected. The next tasks will update each component to use `MotionWrapper` instead.

- [ ] **Step 4: Commit**

```bash
git add components/motion-wrapper.tsx
git rm components/scroll-reveal.tsx
git commit -m "feat: add Framer Motion scroll reveal wrapper, remove CSS-based scroll-reveal"
```

---

### Task 5: Update page.tsx — Skip-link and Section Dividers

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update page.tsx with new token class names**

```tsx
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { TheProblem } from '@/components/the-problem'
import { HowItWorks } from '@/components/how-it-works'
import { MeetBeacon } from '@/components/meet-beacon'
import { Signals } from '@/components/signals'
import { WhoItsFor } from '@/components/who-its-for'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-peach-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TheProblem />
        <div className="section-fade" />
        <HowItWorks />
        <div className="section-fade" />
        <MeetBeacon />
        <Signals />
        <div className="section-fade" />
        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update page.tsx skip-link to peach-500 token"
```

---

### Task 6: Update Header — Golden Onyx Tokens + Framer Entrance

**Files:**
- Modify: `components/header.tsx`

- [ ] **Step 1: Rewrite header.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { Logo } from './logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Beacon', href: '/#beacon' },
    { label: 'Signals', href: '/#signals' },
  ]

  const Wrapper = prefersReduced ? 'header' : motion.header

  return (
    <Wrapper
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
      {...(!prefersReduced && {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { type: 'spring', stiffness: 100, damping: 20 },
      })}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="text-lg font-serif text-foreground tracking-tight">
              Pharelo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#waitlist"
              className="btn-primary rounded-2xl bg-peach-500 px-5 py-2 text-sm font-semibold text-white tracking-[0.3px] hover:bg-peach-600"
            >
              Join waitlist
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2.5 -mr-1 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`mobile-menu md:hidden border-b border-border bg-background ${
          menuOpen ? 'open' : ''
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 block text-base text-foreground-muted transition-colors hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#waitlist"
            className="btn-primary mt-2 rounded-2xl bg-peach-500 px-5 py-3 text-center text-sm font-semibold text-white tracking-[0.3px] hover:bg-peach-600"
            onClick={() => setMenuOpen(false)}
          >
            Join waitlist
          </a>
        </nav>
      </div>
    </Wrapper>
  )
}
```

- [ ] **Step 2: Verify header renders in browser**

Open http://localhost:3000 — header should show with peach-500 CTA button, fade-down entrance on page load, backdrop blur on scroll.

- [ ] **Step 3: Commit**

```bash
git add components/header.tsx
git commit -m "feat: update header with Golden Onyx tokens and Framer Motion entrance"
```

---

### Task 7: Update Footer — Dark Warm Inversion

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Rewrite footer.tsx**

```tsx
import Link from 'next/link'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Logo size={24} className="brightness-0 invert" />
              <span className="text-base font-serif text-surface tracking-tight">
                Pharelo
              </span>
            </div>
            <p className="text-sm text-surface/60 max-w-xs">
              Walk in prepared. Walk out clear.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-surface/40">
                Legal
              </span>
              <Link href="/privacy" className="py-1.5 text-sm text-surface/60 transition-colors hover:text-peach-500">
                Privacy
              </Link>
              <Link href="/terms" className="py-1.5 text-sm text-surface/60 transition-colors hover:text-peach-500">
                Terms
              </Link>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-surface/40">
                Contact
              </span>
              <Link href="/support" className="py-1.5 text-sm text-surface/60 transition-colors hover:text-peach-500">
                Support
              </Link>
              <a
                href="mailto:team@pharelo.com"
                className="py-1.5 text-sm text-surface/60 transition-colors hover:text-peach-500"
              >
                team@pharelo.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-surface/10">
          <p className="text-xs text-surface/40">
            &copy; {new Date().getFullYear()} Pharelo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify footer renders — dark warm background (#2C2416), light text**

Open http://localhost:3000 and scroll to bottom. Footer should have dark earth-brown background with cream text and peach link hovers.

- [ ] **Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: update footer with dark warm earth.800 background"
```

---

### Task 8: Update Waitlist Form — Peach Buttons + Surface Card

**Files:**
- Modify: `components/waitlist-form.tsx`

- [ ] **Step 1: Rewrite waitlist-form.tsx**

```tsx
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
          className="h-14 flex-1 rounded-full border border-border bg-surface px-6 text-base text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-peach-500/40 focus:ring-offset-2 focus:ring-offset-background sm:border-0 sm:bg-transparent sm:focus:ring-0 sm:focus:ring-offset-0 disabled:opacity-50"
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
```

- [ ] **Step 2: Verify form renders — peach button, surface background, teal success state**

- [ ] **Step 3: Commit**

```bash
git add components/waitlist-form.tsx
git commit -m "feat: update waitlist form with peach buttons, surface card, teal success"
```

---

### Task 9: Rethink Hero — Asymmetric Photo Fade

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Rewrite hero.tsx**

```tsx
'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { WaitlistForm } from './waitlist-form'

export function Hero() {
  const prefersReduced = useReducedMotion()

  const spring = { type: 'spring' as const, stiffness: 80, damping: 20 }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background photo — spans right ~60%, fades left into background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/Pharelo-Hero-1.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient fade: solid background on left, transparent on right */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, #F7F3EC 30%, rgba(247,243,236,0.85) 50%, rgba(247,243,236,0.3) 75%, rgba(247,243,236,0.15) 100%)`,
          }}
        />
        {/* Top and bottom fades for clean edges */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, #F7F3EC 0%, transparent 15%, transparent 85%, #F7F3EC 100%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-12 py-24 md:py-0">
        <div className="max-w-xl">
          {/* Headline */}
          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-foreground"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            Walk in prepared.
            <br />
            Walk out clear.
          </motion.h1>

          {/* Body */}
          <motion.p
            className="mt-8 text-lg md:text-xl leading-relaxed text-foreground-muted max-w-[50ch]"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            Pharelo helps you organize your thoughts before every appointment,
            capture what matters during the visit, and understand everything after.
          </motion.p>

          {/* Waitlist form */}
          <motion.div
            className="mt-10 max-w-md"
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
          >
            <WaitlistForm id="hero-email" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify hero renders — full-width photo fading left, text left-aligned, spring entrance animations**

Open http://localhost:3000 — hero should show photo spanning right side, fading into warm linen on left. Text and form stagger in with spring physics.

- [ ] **Step 3: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: rethink hero — asymmetric photo fade with spring entrance"
```

---

### Task 10: Rework Hero Variant A — Floating Feature Cards Below Hero

**Files:**
- Modify: `components/hero-variant-a.tsx`

The floating cards are no longer in the hero. They become a standalone scroll-triggered section. Rename the export and restructure.

- [ ] **Step 1: Rewrite hero-variant-a.tsx as floating feature cards**

```tsx
'use client'

import { CheckCircle, Circle, Waveform, Sparkle } from '@phosphor-icons/react'
import { MotionWrapper } from './motion-wrapper'

export function FloatingFeatureCards() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr_1fr] gap-6">
          {/* Card 1 — Beacon suggestion */}
          <MotionWrapper variant="fade-up" staggerIndex={0}>
            <div className="rounded-[14px] bg-surface/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg shadow-[rgba(160,110,50,0.1)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.15),var(--shadow-lg)]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkle size={14} className="text-peach-500" weight="fill" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle">
                  Beacon
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Based on your last visit, you may want to ask about the follow-up lab results.
              </p>
            </div>
          </MotionWrapper>

          {/* Card 2 — Checklist */}
          <MotionWrapper variant="fade-up" staggerIndex={1}>
            <div className="rounded-[14px] bg-surface/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg shadow-[rgba(160,110,50,0.1)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.15),var(--shadow-lg)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle mb-3">
                Your checklist
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={15} className="text-teal-600 shrink-0" weight="fill" />
                  <span className="text-sm text-foreground-muted line-through">Medication side effects</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Circle size={15} className="text-foreground-subtle shrink-0" />
                  <span className="text-sm text-foreground">Ask about imaging referral</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Circle size={15} className="text-foreground-subtle shrink-0" />
                  <span className="text-sm text-foreground">Discuss energy levels</span>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Card 3 — Recording snippet */}
          <MotionWrapper variant="fade-up" staggerIndex={2}>
            <div className="rounded-[14px] bg-surface/70 backdrop-blur-xl border border-white/20 p-6 shadow-lg shadow-[rgba(160,110,50,0.1)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.15),var(--shadow-lg)]">
              <div className="flex items-center gap-2 mb-3">
                <Waveform size={14} className="text-peach-500" weight="fill" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle">
                  Recorded
                </span>
              </div>
              <div className="flex items-end gap-[2px] h-8 mb-3">
                {[0.3, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.85, 0.55].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-peach-500/30"
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground-muted italic leading-relaxed">
                &ldquo;...check again in three months...&rdquo;
              </p>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update page.tsx to use FloatingFeatureCards instead of the old hero variant**

In `app/page.tsx`, add the import and place the component right after `<Hero />`:

```tsx
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FloatingFeatureCards } from '@/components/hero-variant-a'
import { TheProblem } from '@/components/the-problem'
import { HowItWorks } from '@/components/how-it-works'
import { MeetBeacon } from '@/components/meet-beacon'
import { Signals } from '@/components/signals'
import { WhoItsFor } from '@/components/who-its-for'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-peach-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <FloatingFeatureCards />
        <TheProblem />
        <div className="section-fade" />
        <HowItWorks />
        <div className="section-fade" />
        <MeetBeacon />
        <Signals />
        <div className="section-fade" />
        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 3: Verify floating cards render below hero with staggered spring entrance on scroll**

- [ ] **Step 4: Commit**

```bash
git add components/hero-variant-a.tsx app/page.tsx
git commit -m "feat: convert hero floating cards to scroll-triggered section with glassmorphism"
```

---

### Task 11: Update The Problem — Token Refresh + Motion

**Files:**
- Modify: `components/the-problem.tsx`

- [ ] **Step 1: Rewrite the-problem.tsx**

```tsx
import Image from 'next/image'
import { MotionWrapper } from './motion-wrapper'

const scenarios = [
  'You forgot the one question that mattered.',
  'The doctor talked fast and you nodded along.',
  'You left and couldn\u2019t remember what they said.',
  'You got home and realized you missed half the story.',
]

export function TheProblem() {
  return (
    <section className="relative px-6 md:px-12 py-32 md:py-44 overflow-hidden">
      {/* Background photo — desaturated, faded into warm linen */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/waiting-room.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(247,243,236,0.88) 0%, rgba(247,243,236,0.8) 50%, rgba(247,243,236,0.92) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="md:grid md:grid-cols-[1fr_1.8fr] md:gap-16 lg:gap-24">
          {/* Left — anchor phrase */}
          <MotionWrapper>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-snug md:sticky md:top-32">
              You{'\u2019'}ve been there.
            </p>
          </MotionWrapper>

          {/* Right — scenarios with warm dividers */}
          <div className="mt-12 md:mt-0 flex flex-col">
            {scenarios.map((text, i) => (
              <MotionWrapper key={i} variant="fade-up" staggerIndex={i}>
                <div className="py-8 md:py-10 border-t border-border">
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground-muted">
                    {text}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify section renders with warm dividers and spring scroll reveals**

- [ ] **Step 3: Commit**

```bash
git add components/the-problem.tsx
git commit -m "feat: update The Problem section with Golden Onyx tokens and Framer Motion"
```

---

### Task 12: Update How It Works — Phase Pills + Motion

**Files:**
- Modify: `components/how-it-works.tsx`
- Modify: `components/app-mockup.tsx`

- [ ] **Step 1: Update app-mockup.tsx with Golden Onyx tokens**

```tsx
export function AppMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] transition-transform duration-500 ease-out md:hover:-translate-y-1">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border border-border bg-surface p-3.5 shadow-xl">
        {/* Dynamic island notch */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-[5px] rounded-full bg-foreground/10" />
        </div>
        {/* Screen content */}
        <div className="rounded-[1.5rem] bg-background overflow-hidden min-h-[380px]">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2.5">
          <div className="w-24 h-1 rounded-full bg-foreground/8" />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite how-it-works.tsx**

```tsx
import { MotionWrapper } from './motion-wrapper'
import { AppMockup } from './app-mockup'
import { CheckSquare, Waveform, ListChecks } from '@phosphor-icons/react/dist/ssr'

const phases = [
  {
    id: 'before',
    label: 'Before',
    headline: 'Prepare with confidence',
    description: 'Build a checklist of questions, symptoms, and topics you want to cover. Never walk in empty-handed again.',
    mockup: 'checklist',
    textSide: 'left' as const,
  },
  {
    id: 'during',
    label: 'During',
    headline: 'Capture every detail',
    description: 'Record your appointment with live transcription. Stay present in the conversation while Pharelo keeps track.',
    mockup: 'recording',
    textSide: 'right' as const,
  },
  {
    id: 'after',
    label: 'After',
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
        <CheckSquare size={16} className="text-peach-500" weight="fill" />
        <span className="text-xs font-semibold uppercase tracking-[0.8px] text-foreground-subtle">Appointment prep</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${item.checked ? 'bg-teal-600 border-teal-600' : 'border-foreground-subtle'}`}>
            {item.checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className={`text-sm leading-snug ${item.checked ? 'text-foreground-subtle line-through' : 'text-foreground'}`}>{item.text}</span>
        </div>
      ))}
    </div>
  )
}

function RecordingMockup() {
  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <Waveform size={16} className="text-peach-500" weight="fill" />
        <span className="text-xs font-semibold uppercase tracking-[0.8px] text-foreground-subtle">Recording</span>
      </div>
      <div className="flex items-end justify-center gap-[3px] h-12">
        {[0.3, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.85, 0.55, 0.75, 0.95, 0.45, 0.65, 0.35, 0.8, 0.5, 0.7].map((h, i) => (
          <div key={i} className="w-1.5 rounded-full bg-peach-500/40" style={{ height: `${h * 100}%` }} />
        ))}
      </div>
      <div className="rounded-lg bg-surface p-3 border border-border">
        <p className="text-xs text-foreground-muted leading-relaxed">
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
        <ListChecks size={16} className="text-peach-500" weight="fill" />
        <span className="text-xs font-semibold uppercase tracking-[0.8px] text-foreground-subtle">Visit summary</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="rounded-lg bg-surface p-3 border border-border">
          <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle mb-1">Key takeaway</p>
          <p className="text-xs text-foreground leading-relaxed">Cholesterol slightly elevated. Dosage adjustment recommended.</p>
        </div>
        <div className="rounded-lg bg-surface p-3 border border-border">
          <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-foreground-subtle mb-1">Action items</p>
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
    <section id="how-it-works" className="px-6 md:px-12 py-28 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-32 lg:gap-48">
          {phases.map((phase) => {
            const MockupContent = mockupComponents[phase.mockup]
            const isLeft = phase.textSide === 'left'
            return (
              <div key={phase.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <MotionWrapper
                  variant={isLeft ? 'fade-up' : 'slide-right'}
                  className={isLeft ? 'md:order-1' : 'md:order-2'}
                >
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                      {phase.label}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">{phase.headline}</h2>
                    <p className="text-base leading-relaxed text-foreground-muted max-w-[50ch]">{phase.description}</p>
                  </div>
                </MotionWrapper>
                <MotionWrapper
                  variant={isLeft ? 'slide-right' : 'slide-left'}
                  className={isLeft ? 'md:order-2' : 'md:order-1'}
                >
                  <AppMockup>
                    <MockupContent />
                  </AppMockup>
                </MotionWrapper>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify — phase pills render as peach rounded badges, checkmarks use teal-600, mockups have warm surface backgrounds**

- [ ] **Step 4: Commit**

```bash
git add components/how-it-works.tsx components/app-mockup.tsx
git commit -m "feat: update How It Works with phase pills, teal checkmarks, warm mockups"
```

---

### Task 13: Update Meet Beacon + Chat Demo

**Files:**
- Modify: `components/meet-beacon.tsx`
- Modify: `components/chat-demo.tsx`

- [ ] **Step 1: Rewrite meet-beacon.tsx**

```tsx
import { MotionWrapper } from './motion-wrapper'
import { ChatDemo } from './chat-demo'

export function MeetBeacon() {
  return (
    <section id="beacon" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <MotionWrapper>
            <div className="flex flex-col gap-5 md:sticky md:top-32">
              <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                Your AI companion
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">Meet Beacon</h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground-muted max-w-[50ch]">
                Beacon surfaces personalized suggestions before your visit and generates clear summaries after. Like a friend who remembers everything your doctor said.
              </p>
            </div>
          </MotionWrapper>
          <MotionWrapper variant="fade-up" delay={0.15}>
            <div className="md:pt-8">
              <ChatDemo />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite chat-demo.tsx**

```tsx
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
```

- [ ] **Step 3: Verify — chat container has surface background + rounded-3xl + shadow-lg. Beacon messages have peach left border, teal label pill. User messages have peach tint. Typing dots are peach.**

- [ ] **Step 4: Commit**

```bash
git add components/meet-beacon.tsx components/chat-demo.tsx
git commit -m "feat: update Meet Beacon with surface card, peach borders, teal label"
```

---

### Task 14: Update Signals — Chart Recolor + Motion

**Files:**
- Modify: `components/signals.tsx`

- [ ] **Step 1: Rewrite signals.tsx**

```tsx
import { MotionWrapper } from './motion-wrapper'

export function Signals() {
  return (
    <section id="signals" className="px-6 md:px-12 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <MotionWrapper>
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                Health insights
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">See what your visits reveal</h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground-muted max-w-[50ch]">
                Signals tracks health themes across your appointments over time. Patterns emerge that a single visit can{'\u2019'}t show — giving you and your care team a fuller picture.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.1}>
            <div className="rounded-[14px] bg-surface p-6 shadow-lg">
              <svg viewBox="0 0 400 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 180 C60 170, 100 120, 160 130 S260 90, 340 60 L380 50" stroke="#D4935A" strokeWidth="2.5" strokeLinecap="round" className="line-draw" fill="none" />
                <path d="M20 160 C80 150, 120 170, 180 140 S280 120, 340 100 L380 90" stroke="#298282" strokeWidth="2" strokeLinecap="round" className="line-draw" opacity="0.7" fill="none" />
                <path d="M20 200 C70 190, 130 160, 190 170 S290 130, 340 140 L380 120" stroke="#D4785C" strokeWidth="2" strokeLinecap="round" className="line-draw" opacity="0.5" fill="none" />
              </svg>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-peach-500" />
                  <span className="text-xs text-foreground-muted">Sleep quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-teal-600/70" />
                  <span className="text-xs text-foreground-muted">Medication response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-coral/50" />
                  <span className="text-xs text-foreground-muted">Energy levels</span>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify — chart lines are peach/teal/coral, chart sits in surface card with warm shadow, legend pills match**

- [ ] **Step 3: Commit**

```bash
git add components/signals.tsx
git commit -m "feat: recolor Signals chart to peach/teal/coral with surface card"
```

---

### Task 15: Update Who It's For — Asymmetric Grid + Motion

**Files:**
- Modify: `components/who-its-for.tsx`

- [ ] **Step 1: Rewrite who-its-for.tsx**

```tsx
import Image from 'next/image'
import { MotionWrapper } from './motion-wrapper'

const scenarios = [
  {
    headline: 'Managing a chronic condition',
    description: 'You see three specialists, a primary care doctor, and a therapist. Each has a piece of the puzzle, but none of them see the whole picture. Pharelo helps you carry the full story into every room.',
    image: '/images/chronic-condition.webp',
    imageAlt: 'Hands reviewing prescription bottles and medical documents',
  },
  {
    headline: 'Caring for a parent',
    description: 'You\u2019re coordinating appointments, medications, and follow-ups for someone who can\u2019t always do it themselves. Pharelo keeps track so you can focus on being there.',
    image: '/images/caring-for-parent.webp',
    imageAlt: 'Daughter walking arm-in-arm with elderly mother',
  },
  {
    headline: 'Facing a big appointment',
    description: 'The specialist visit you\u2019ve been waiting weeks for. You have twenty minutes and a hundred questions. Pharelo helps you walk in with a plan and walk out with answers.',
    image: '/images/big-appointment.webp',
    imageAlt: 'Person sitting in car, gathering thoughts before a medical visit',
  },
]

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <MotionWrapper className="mb-16">
          <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
            Who it{'\u2019'}s for
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight text-foreground">
            Built for the moments that matter most
          </h2>
        </MotionWrapper>

        <div className="flex flex-col gap-16 md:gap-24">
          {scenarios.map((scenario, i) => {
            const imageOnRight = i % 2 === 0
            return (
              <MotionWrapper key={i} variant="fade-up" staggerIndex={i}>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
                  {/* Text */}
                  <div className={imageOnRight ? 'md:order-1' : 'md:order-2'}>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                      {scenario.headline}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground-muted max-w-[50ch]">
                      {scenario.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className={imageOnRight ? 'md:order-2' : 'md:order-1'}>
                    <div className="relative w-full h-[200px] md:h-[280px] rounded-[14px] overflow-hidden shadow-md">
                      <Image
                        src={scenario.image}
                        alt={scenario.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(247,243,236,0.15) 0%, transparent 40%)' }}
                      />
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify — scenarios use alternating asymmetric 2-column grid, images have 14px radius and warm shadow, header uses peach pill label**

- [ ] **Step 3: Commit**

```bash
git add components/who-its-for.tsx
git commit -m "feat: rework Who It's For as asymmetric alternating grid"
```

---

### Task 16: Update Final CTA — Left-Aligned + Motion

**Files:**
- Modify: `components/final-cta.tsx`

- [ ] **Step 1: Rewrite final-cta.tsx**

```tsx
import Image from 'next/image'
import { MotionWrapper } from './motion-wrapper'
import { WaitlistForm } from './waitlist-form'

export function FinalCTA() {
  return (
    <section id="waitlist" className="relative px-6 md:px-12 py-32 md:py-48 overflow-hidden">
      {/* Background photo — vignette fade into warm linen */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/walking-out.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Strong vignette from all edges */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(247,243,236,0.85) 0%, rgba(247,243,236,0.7) 40%, rgba(247,243,236,0.9) 100%),
              linear-gradient(to right, rgba(247,243,236,0.6) 0%, transparent 30%, transparent 70%, rgba(247,243,236,0.6) 100%)
            `,
          }}
        />
      </div>

      {/* Subtle peach gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 40%, rgba(212,147,90,0.03) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <MotionWrapper>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-tight text-foreground">
              Your next appointment
              <br />
              deserves better.
            </h2>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.1}>
            <p className="mt-6 text-lg text-foreground-muted max-w-md">
              Join the waitlist and be the first to know when Pharelo is ready.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fade-up" delay={0.2}>
            <div className="mt-10 max-w-md">
              <WaitlistForm id="cta-email" />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify — text is left-aligned, background has vignette fade from all edges, spring stagger on scroll**

- [ ] **Step 3: Commit**

```bash
git add components/final-cta.tsx
git commit -m "feat: left-align Final CTA with vignette background and spring reveal"
```

---

### Task 17: Final Verification + Cleanup

**Files:**
- Potentially modify any files with compile errors

- [ ] **Step 1: Run the build to catch any errors**

```bash
pnpm build
```

Expected: Build succeeds. If there are any leftover references to old token names (`cream-light`, `bronze`, `bronze-hover`, `gold-mist`, `muted`, `muted-foreground`), fix them by replacing with the correct Golden Onyx tokens:
- `cream-light` → `surface`
- `bronze` → `peach-500`
- `bronze-hover` → `peach-600`
- `gold-mist` → `peach-500`
- `muted` (text color) → `foreground-muted`
- `muted-foreground` → `foreground-subtle`

- [ ] **Step 2: Search for any remaining old token references**

```bash
grep -rn "cream-light\|bg-bronze\|text-bronze\|border-bronze\|gold-mist\|text-muted\b\|text-muted-foreground" components/ app/ --include="*.tsx" --include="*.css"
```

Expected: No matches. If any found, update them to the corresponding Golden Onyx token.

- [ ] **Step 3: Open dev server and visually verify all sections**

```bash
pnpm dev
```

Check each section in browser at http://localhost:3000:
- Header: peach CTA, backdrop blur on scroll, spring entrance
- Hero: full-width photo fading left, left-aligned text, spring stagger
- Floating cards: glassmorphism, staggered spring entrance on scroll
- The Problem: warm dividers, spring reveals
- How It Works: phase pills, teal checkmarks, warm mockups
- Meet Beacon: surface chat container, peach borders, teal label
- Signals: peach/teal/coral chart lines in surface card
- Who It's For: alternating asymmetric grid
- Final CTA: left-aligned, vignette fade
- Footer: dark earth.800 background, peach link hovers

- [ ] **Step 4: Verify mobile responsiveness at 375px width**

All sections should stack to single column. No horizontal overflow. Touch targets remain accessible.

- [ ] **Step 5: Verify reduced motion**

In browser DevTools, enable `prefers-reduced-motion: reduce`. All Framer Motion animations should be disabled (static rendering). CSS infinite loops (typing dots) should stop.

- [ ] **Step 6: Delete unused Cabinet Grotesk font files**

```bash
rm public/fonts/CabinetGrotesk-Regular.woff2 public/fonts/CabinetGrotesk-Medium.woff2
```

- [ ] **Step 7: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove unused Cabinet Grotesk fonts, verify Golden Onyx build"
```
