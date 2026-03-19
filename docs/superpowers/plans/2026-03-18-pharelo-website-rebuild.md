# Pharelo Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the entire Pharelo marketing website with a warm cream/bronze/gold aesthetic, Source Serif 4 + Cabinet Grotesk typography, CSS-only motion, and a spacious premium feel.

**Architecture:** Next.js 16 static export with Tailwind CSS v4. All motion via CSS animations + IntersectionObserver in isolated `"use client"` leaf components. 5 client components (header, waitlist-form, chat-demo, scroll-reveal, support-faq). Everything else is server-rendered.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, @phosphor-icons/react, Source Serif 4 (Google Fonts), Cabinet Grotesk (self-hosted), Cloudflare Workers deployment.

**Spec:** `docs/superpowers/specs/2026-03-18-pharelo-website-rebuild-design.md`

---

## Phase 1: Foundation

### Task 1: Clean dependencies and install new ones

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove unused dependencies**

```bash
pnpm remove @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels recharts sonner vaul zod class-variance-authority tailwind-merge tw-animate-css
```

- [ ] **Step 2: Install new dependencies**

```bash
pnpm add @phosphor-icons/react@^2.1.0
```

- [ ] **Step 3: Verify package.json is clean**

Expected remaining deps: `@vercel/analytics`, `autoprefixer`, `clsx`, `next`, `react`, `react-dom`, `@phosphor-icons/react`. DevDeps: `@tailwindcss/postcss`, `@types/node`, `@types/react`, `@types/react-dom`, `postcss`, `tailwindcss`, `typescript`.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: clean dependencies for website rebuild"
```

---

### Task 2: Download Cabinet Grotesk font files

**Files:**
- Create: `public/fonts/CabinetGrotesk-Regular.woff2`
- Create: `public/fonts/CabinetGrotesk-Medium.woff2`

- [ ] **Step 1: Download fonts from Fontshare**

```bash
mkdir -p public/fonts
# Download Cabinet Grotesk Regular and Medium .woff2 files from https://www.fontshare.com/fonts/cabinet-grotesk
# Place them in public/fonts/
curl -L "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500&display=swap" -o /tmp/cabinet-grotesk-css.txt
```

If the curl approach doesn't yield direct .woff2 URLs, manually download from Fontshare website and place the .woff2 files in `public/fonts/`. Fontshare license permits free commercial use.

- [ ] **Step 2: Verify files exist**

```bash
ls -la public/fonts/
```

Expected: Two .woff2 files present.

- [ ] **Step 3: Commit**

```bash
git add public/fonts/
git commit -m "chore: add Cabinet Grotesk font files (Fontshare, commercial license)"
```

---

### Task 3: Delete old component files

**Files:**
- Delete: All files in `components/` directory
- Delete: `components/ui/` directory
- Delete: `styles/globals.css`
- Delete: `lib/utils.ts`

- [ ] **Step 1: Remove old components and utilities**

```bash
rm -rf components/*
rm -rf components/ui/
rm -f styles/globals.css
rm -rf lib/
```

- [ ] **Step 2: Verify clean state**

```bash
ls components/
ls lib/ 2>/dev/null || echo "lib/ removed"
ls styles/ 2>/dev/null || echo "styles/ removed"
```

Expected: `components/` is empty. `lib/` and `styles/` don't exist.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove all old components for full rebuild"
```

---

### Task 4: Rewrite globals.css with new design system

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Write new globals.css**

```css
@import 'tailwindcss';

@theme inline {
  --font-sans: var(--font-cabinet), system-ui, sans-serif;
  --font-serif: var(--font-source-serif), 'Georgia', serif;

  --color-background: #F5F0E8;
  --color-foreground: #3D2B1F;
  --color-cream-light: #FFFCF7;
  --color-bronze: #8B6914;
  --color-bronze-hover: #6B4F0E;
  --color-gold-mist: #C9A227;
  --color-muted: rgba(61, 43, 31, 0.6);
  --color-muted-foreground: rgba(61, 43, 31, 0.3);
  --color-border: rgba(61, 43, 31, 0.1);

  --animate-fade-up: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  --animate-fade-in: fade-in 0.6s ease both;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}

/* Scroll reveal base state */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Slide-in variants for zig-zag sections */
.reveal-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-left.visible,
.reveal-right.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Stagger delay via CSS custom property */
.stagger {
  transition-delay: calc(var(--index, 0) * 120ms);
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

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Hero mesh gradient drift */
@keyframes gradient-drift {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

.hero-gradient {
  background:
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(201, 162, 39, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 70% 60%, rgba(139, 105, 20, 0.04) 0%, transparent 70%);
  background-size: 200% 200%;
  animation: gradient-drift 25s ease-in-out infinite;
}

/* Chat bubble entrance */
@keyframes chat-in {
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.chat-bubble {
  opacity: 0;
  animation: chat-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* Typing indicator dots */
@keyframes typing-dot {
  0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-2px); }
}

.typing-dot-1 { animation: typing-dot 1.4s ease-in-out infinite; }
.typing-dot-2 { animation: typing-dot 1.4s ease-in-out 0.2s infinite; }
.typing-dot-3 { animation: typing-dot 1.4s ease-in-out 0.4s infinite; }

/* SVG line draw */
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

/* Tactile button feedback */
button:active:not(:disabled),
[role="button"]:active:not(:disabled) {
  transform: scale(0.98);
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

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .reveal,
  .reveal-left,
  .reveal-right {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .hero-gradient {
    animation: none;
  }
  .animate-float {
    animation: none;
  }
  .chat-bubble {
    animation: none;
    opacity: 1;
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
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: rewrite globals.css with new design system"
```

---

### Task 5: Rewrite layout.tsx with new fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write new layout.tsx**

```tsx
import type { Metadata, Viewport } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const cabinetGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/CabinetGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CabinetGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-cabinet',
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
  themeColor: '#F5F0E8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${sourceSerif.variable} ${cabinetGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

Note: The `@theme` block in globals.css uses `var(--font-cabinet)` and `var(--font-source-serif)` which are the CSS variable names injected by `next/font` via the `.variable` class names set in `layout.tsx`. These must match exactly.

- [ ] **Step 2: Verify build doesn't crash**

```bash
pnpm build 2>&1 | head -20
```

This will likely fail because `app/page.tsx` still imports deleted components. That's expected — we'll fix it in later tasks.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: rewrite layout with Source Serif 4 + Cabinet Grotesk"
```

---

## Phase 2: Shared Components

### Task 6: Create the beacon logo SVG component

**Files:**
- Create: `components/logo.tsx`

- [ ] **Step 1: Write the logo component**

The beacon mark is an abstract vertical form with radiating light arcs. 2-3 SVG paths: a central beacon body (warm-bark/foreground color) with curved arcs above it (gold-mist color). Rounded terminals, organic feel.

```tsx
export function Logo({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pharelo"
    >
      {/* Beacon body — tapered vertical form */}
      <path
        d="M24 38c0 0-4-2-5-8-1-6 0-12 1-16 .5-2 1.5-4 4-4s3.5 2 4 4c1 4 2 10 1 16-1 6-5 8-5 8z"
        fill="currentColor"
        className="text-foreground"
      />
      {/* Outer light arc */}
      <path
        d="M10 16c2-6 7-10 14-10s12 4 14 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold-mist"
        fill="none"
      />
      {/* Inner light arc */}
      <path
        d="M15 18c1.5-4 4.5-6.5 9-6.5s7.5 2.5 9 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold-mist"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
```

This is a starting point — refine the SVG paths during implementation for a more polished organic look. The key constraints: must be legible at 24px, uses `currentColor` with Tailwind color classes, no sharp corners.

- [ ] **Step 2: Commit**

```bash
git add components/logo.tsx
git commit -m "feat: add abstract beacon logo SVG component"
```

---

### Task 7: Create scroll-reveal wrapper component

**Files:**
- Create: `components/scroll-reveal.tsx`

- [ ] **Step 1: Write the IntersectionObserver wrapper**

```tsx
'use client'

import { useEffect, useRef } from 'react'

export function ScrollReveal({
  children,
  className = 'reveal',
  threshold = 0.15,
  style,
}: {
  children: React.ReactNode
  className?: string
  threshold?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/scroll-reveal.tsx
git commit -m "feat: add scroll-reveal IntersectionObserver wrapper"
```

---

### Task 8: Create waitlist form component

**Files:**
- Create: `components/waitlist-form.tsx`

- [ ] **Step 1: Write the Loops waitlist form**

Port the existing Loops integration from `coming-soon.tsx` into a standalone reusable form component. Same endpoint, same rate limiting, updated styling.

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
      <div className="rounded-2xl border border-bronze/20 bg-cream-light px-6 py-6 animate-success">
        <div className="flex items-center justify-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" className="text-bronze/30" />
            <path
              d="M9 14.5l3.5 3.5 6.5-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-bronze animate-checkmark"
              style={{ strokeDasharray: 24, strokeDashoffset: 24 }}
            />
          </svg>
          <p className="font-serif text-xl text-foreground">
            You{'\u2019'}re on the list.
          </p>
        </div>
        <p className="mt-1.5 text-sm text-muted text-center">
          We{'\u2019'}ll be in touch when it{'\u2019'}s time.
        </p>
      </div>
    )
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:border-border sm:bg-cream-light sm:p-1.5"
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
          className="h-14 flex-1 rounded-full border border-border bg-cream-light px-6 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-bronze/30 sm:border-0 sm:bg-transparent sm:focus:ring-0 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-14 rounded-full bg-bronze px-8 text-base font-medium text-cream-light transition-colors hover:bg-bronze-hover disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Joining\u2026' : 'Join the waitlist'}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/waitlist-form.tsx
git commit -m "feat: add waitlist form with Loops integration"
```

---

### Task 9: Create header component

**Files:**
- Create: `components/header.tsx`

- [ ] **Step 1: Write the sticky header with mobile menu**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { List, X } from '@phosphor-icons/react'
import { Logo } from './logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
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
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#waitlist"
              className="rounded-full bg-bronze px-5 py-2 text-sm font-medium text-cream-light transition-colors hover:bg-bronze-hover"
            >
              Join waitlist
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
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
        <nav className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-muted transition-colors hover:text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#waitlist"
            className="mt-2 rounded-full bg-bronze px-5 py-3 text-center text-sm font-medium text-cream-light transition-colors hover:bg-bronze-hover"
            onClick={() => setMenuOpen(false)}
          >
            Join waitlist
          </a>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/header.tsx
git commit -m "feat: add sticky header with mobile menu"
```

---

### Task 10: Create footer component

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Write the footer**

```tsx
import Link from 'next/link'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Logo size={24} />
              <span className="text-base font-serif text-foreground tracking-tight">
                Pharelo
              </span>
            </div>
            <p className="text-sm text-muted max-w-xs">
              Walk in prepared. Walk out clear.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Legal
              </span>
              <Link href="/privacy" className="text-sm text-muted transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted transition-colors hover:text-foreground">
                Terms
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Contact
              </span>
              <Link href="/support" className="text-sm text-muted transition-colors hover:text-foreground">
                Support
              </Link>
              <a
                href="mailto:team@pharelo.com"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                team@pharelo.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Pharelo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add footer component"
```

---

## Phase 3: Landing Page Sections

### Task 11: Create hero section

**Files:**
- Create: `components/hero.tsx`

- [ ] **Step 1: Write the hero with split layout and abstract illustration**

```tsx
import { Logo } from './logo'
import { WaitlistForm } from './waitlist-form'

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 md:px-12 py-24 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div className="flex flex-col gap-8 max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-foreground">
              Walk in prepared.
              <br />
              Walk out clear.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-muted max-w-[50ch]">
              Pharelo helps you organize your thoughts before every appointment,
              capture what matters during the visit, and understand everything after.
            </p>
            <div className="max-w-md">
              <WaitlistForm id="hero-email" />
            </div>
          </div>

          {/* Right — Abstract illustration */}
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-80 h-80">
              {/* Organic blob shapes */}
              <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full" fill="none">
                <ellipse cx="160" cy="170" rx="130" ry="120" fill="currentColor" className="text-gold-mist/15" />
                <ellipse cx="180" cy="140" rx="100" ry="90" fill="currentColor" className="text-bronze/8" transform="rotate(15 180 140)" />
                <ellipse cx="140" cy="190" rx="80" ry="70" fill="currentColor" className="text-gold-mist/10" transform="rotate(-10 140 190)" />
              </svg>
              {/* Beacon mark floating */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <Logo size={120} />
              </div>
            </div>
          </div>

          {/* Mobile — small decorative accent */}
          <div className="lg:hidden flex justify-center -mt-4" aria-hidden="true">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 128 128" className="absolute inset-0 w-full h-full" fill="none">
                <ellipse cx="64" cy="68" rx="52" ry="48" fill="currentColor" className="text-gold-mist/12" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <Logo size={48} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: add hero section with split layout and illustration"
```

---

### Task 12: Create the-problem section

**Files:**
- Create: `components/the-problem.tsx`

- [ ] **Step 1: Write the emotional narrative section**

```tsx
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
```

Note: The `stagger` class applies `transition-delay: calc(var(--index) * 120ms)` from globals.css. The `--index` CSS custom property is set inline on each item. Since `ScrollReveal` wraps each item individually, each gets its own IntersectionObserver — the stagger delay handles the visual cascade.

- [ ] **Step 2: Commit**

```bash
git add components/the-problem.tsx
git commit -m "feat: add problem narrative section"
```

---

### Task 13: Create app mockup component

**Files:**
- Create: `components/app-mockup.tsx`

- [ ] **Step 1: Write the stylized phone frame with slot for content**

```tsx
export function AppMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      {/* Phone frame */}
      <div className="rounded-[2rem] border border-border bg-cream-light p-3 shadow-[0_20px_40px_-15px_rgba(61,43,31,0.08)]">
        {/* Screen notch */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-1 rounded-full bg-border" />
        </div>
        {/* Screen content */}
        <div className="rounded-[1.25rem] bg-background overflow-hidden min-h-[380px]">
          {children}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/app-mockup.tsx
git commit -m "feat: add app mockup phone frame component"
```

---

### Task 14: Create how-it-works section

**Files:**
- Create: `components/how-it-works.tsx`

- [ ] **Step 1: Write the zig-zag three-phase section**

```tsx
import { ScrollReveal } from './scroll-reveal'
import { AppMockup } from './app-mockup'
import { CheckSquare, Waveform, ListChecks } from '@phosphor-icons/react/dist/ssr'

const phases = [
  {
    id: 'before',
    label: 'Before your visit',
    headline: 'Prepare with confidence',
    description:
      'Build a checklist of questions, symptoms, and topics you want to cover. Never walk in empty-handed again.',
    mockup: 'checklist',
    textSide: 'left' as const,
  },
  {
    id: 'during',
    label: 'During your visit',
    headline: 'Capture every detail',
    description:
      'Record your appointment with live transcription. Stay present in the conversation while Pharelo keeps track.',
    mockup: 'recording',
    textSide: 'right' as const,
  },
  {
    id: 'after',
    label: 'After your visit',
    headline: 'Understand what happened',
    description:
      'Get a clear summary of what was discussed, what was decided, and what to do next. Share it with family or your care team.',
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
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Appointment prep
        </span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
            item.checked ? 'bg-bronze border-bronze' : 'border-muted-foreground'
          }`}>
            {item.checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l2.5 2.5L9 1" stroke="#FFFCF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className={`text-sm leading-snug ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
            {item.text}
          </span>
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
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Recording
        </span>
      </div>
      {/* Waveform bars */}
      <div className="flex items-end justify-center gap-[3px] h-12">
        {[0.3, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.85, 0.55, 0.75, 0.95, 0.45, 0.65, 0.35, 0.8, 0.5, 0.7].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-bronze/40"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
      {/* Transcript preview */}
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
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Visit summary
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="rounded-lg bg-cream-light p-3 border border-border">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Key takeaway</p>
          <p className="text-xs text-foreground leading-relaxed">
            Cholesterol slightly elevated. Dosage adjustment recommended.
          </p>
        </div>
        <div className="rounded-lg bg-cream-light p-3 border border-border">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Action items</p>
          <p className="text-xs text-foreground leading-relaxed">
            Follow-up blood work in 3 months. New prescription starts Monday.
          </p>
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
              <div
                key={phase.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
              >
                {/* Text */}
                <ScrollReveal
                  className={`reveal ${isLeft ? 'md:order-1' : 'md:order-2'}`}
                >
                  <div className="flex flex-col gap-4">
                    <span className="text-xs font-medium uppercase tracking-widest text-bronze">
                      {phase.label}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
                      {phase.headline}
                    </h2>
                    <p className="text-base leading-relaxed text-muted max-w-[50ch]">
                      {phase.description}
                    </p>
                  </div>
                </ScrollReveal>

                {/* Mockup */}
                <ScrollReveal
                  className={`${isLeft ? 'reveal-right md:order-2' : 'reveal-left md:order-1'}`}
                >
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
```

- [ ] **Step 2: Commit**

```bash
git add components/how-it-works.tsx
git commit -m "feat: add how-it-works zig-zag section with app mockups"
```

---

### Task 15: Create meet-beacon section with chat demo

**Files:**
- Create: `components/meet-beacon.tsx`
- Create: `components/chat-demo.tsx`

- [ ] **Step 1: Write the chat demo client component**

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
          // Start the chat sequence
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
          <div
            className={`rounded-2xl px-4 py-3 max-w-[85%] ${
              msg.sender === 'beacon'
                ? 'bg-cream-light border border-border text-foreground'
                : 'bg-bronze/10 text-foreground'
            }`}
          >
            {msg.sender === 'beacon' && (
              <span className="block text-[10px] font-medium uppercase tracking-widest text-bronze mb-1">
                Beacon
              </span>
            )}
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}

      {/* Typing indicator */}
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
```

- [ ] **Step 2: Write the meet-beacon server component wrapper**

```tsx
import { ScrollReveal } from './scroll-reveal'
import { ChatDemo } from './chat-demo'

export function MeetBeacon() {
  return (
    <section id="beacon" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Intro text */}
          <ScrollReveal>
            <div className="flex flex-col gap-5 md:sticky md:top-32">
              <span className="text-xs font-medium uppercase tracking-widest text-bronze">
                Your AI companion
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
                Meet Beacon
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-muted max-w-[50ch]">
                Beacon surfaces personalized suggestions before your visit and
                generates clear summaries after. Like a friend who remembers
                everything your doctor said.
              </p>
            </div>
          </ScrollReveal>

          {/* Chat demo */}
          <div className="md:pt-8">
            <ChatDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/chat-demo.tsx components/meet-beacon.tsx
git commit -m "feat: add Meet Beacon section with animated chat demo"
```

---

### Task 16: Create signals section

**Files:**
- Create: `components/signals.tsx`

- [ ] **Step 1: Write the signals section with SVG data visualization**

```tsx
import { ScrollReveal } from './scroll-reveal'

export function Signals() {
  return (
    <section id="signals" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <ScrollReveal>
            <div className="flex flex-col gap-5">
              <span className="text-xs font-medium uppercase tracking-widest text-bronze">
                Health insights
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
                See what your visits reveal
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-muted max-w-[50ch]">
                Signals tracks health themes across your appointments over time.
                Patterns emerge that a single visit can{'\u2019'}t show — giving you
                and your care team a fuller picture.
              </p>
            </div>
          </ScrollReveal>

          {/* Organic data visualization */}
          <ScrollReveal className="reveal">
            <div className="relative">
              <svg
                viewBox="0 0 400 240"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Organic curved lines — health themes over time */}
                {/* Sleep quality — gold */}
                <path
                  d="M20 180 C60 170, 100 120, 160 130 S260 90, 340 60 L380 50"
                  stroke="#C9A227"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="line-draw"
                  fill="none"
                />
                {/* Medication response — bronze muted */}
                <path
                  d="M20 160 C80 150, 120 170, 180 140 S280 120, 340 100 L380 90"
                  stroke="#8B6914"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="line-draw"
                  opacity="0.5"
                  fill="none"
                />
                {/* Energy levels — foreground muted */}
                <path
                  d="M20 200 C70 190, 130 160, 190 170 S290 130, 340 140 L380 120"
                  stroke="#3D2B1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="line-draw"
                  opacity="0.25"
                  fill="none"
                />
              </svg>

              {/* Theme labels */}
              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-gold-mist" />
                  <span className="text-xs text-muted">Sleep quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-bronze/50" />
                  <span className="text-xs text-muted">Medication response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded-full bg-foreground/25" />
                  <span className="text-xs text-muted">Energy levels</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/signals.tsx
git commit -m "feat: add Signals section with organic SVG data viz"
```

---

### Task 17: Create who-its-for section

**Files:**
- Create: `components/who-its-for.tsx`

- [ ] **Step 1: Write the scenario section**

```tsx
import { ScrollReveal } from './scroll-reveal'

const scenarios = [
  {
    headline: 'Managing a chronic condition',
    description:
      'You see three specialists, a primary care doctor, and a therapist. Each has a piece of the puzzle, but none of them see the whole picture. Pharelo helps you carry the full story into every room.',
  },
  {
    headline: 'Caring for a parent',
    description:
      'You\u2019re coordinating appointments, medications, and follow-ups for someone who can\u2019t always do it themselves. Pharelo keeps track so you can focus on being there.',
  },
  {
    headline: 'Facing a big appointment',
    description:
      'The specialist visit you\u2019ve been waiting weeks for. You have twenty minutes and a hundred questions. Pharelo helps you walk in with a plan and walk out with answers.',
  },
]

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <span className="text-xs font-medium uppercase tracking-widest text-bronze">
            Who it{'\u2019'}s for
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight text-foreground max-w-lg">
            Built for the moments that matter most
          </h2>
        </ScrollReveal>

        <div className="mt-16 flex flex-col">
          {scenarios.map((scenario, i) => (
            <ScrollReveal
              key={i}
              className="reveal stagger"
              style={{ '--index': i } as React.CSSProperties}
            >
              <div
                className={`py-10 md:py-12 border-t border-border ${
                  i % 2 === 1 ? 'md:pl-24' : ''
                }`}
              >
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                  {scenario.headline}
                </h3>
                <p className="text-base leading-relaxed text-muted max-w-[55ch]">
                  {scenario.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/who-its-for.tsx
git commit -m "feat: add who-its-for scenario section"
```

---

### Task 18: Create final CTA section

**Files:**
- Create: `components/final-cta.tsx`

- [ ] **Step 1: Write the closing CTA block**

```tsx
import { ScrollReveal } from './scroll-reveal'
import { WaitlistForm } from './waitlist-form'

export function FinalCTA() {
  return (
    <section id="waitlist" className="relative px-6 md:px-12 py-24 md:py-36">
      {/* Warmer background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(201,162,39,0.03))',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight">
            Your next appointment
            <br />
            deserves better.
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="reveal stagger"
          style={{ '--index': 1 } as React.CSSProperties}
        >
          <p className="mt-6 text-lg text-muted max-w-md mx-auto">
            Join the waitlist and be the first to know when Pharelo is ready.
          </p>
        </ScrollReveal>

        <ScrollReveal
          className="reveal stagger"
          style={{ '--index': 2 } as React.CSSProperties}
        >
          <div className="mt-10 max-w-md mx-auto">
            <WaitlistForm id="cta-email" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/final-cta.tsx
git commit -m "feat: add final CTA section"
```

---

## Phase 4: Page Assembly

### Task 19: Wire up the landing page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx with new components**

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
      <Header />
      <main>
        <Hero />
        <TheProblem />
        <HowItWorks />
        <MeetBeacon />
        <Signals />
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
git commit -m "feat: wire up landing page with all new sections"
```

---

### Task 20: Redesign privacy page

**Files:**
- Modify: `app/privacy/page.tsx`

- [ ] **Step 1: Rewrite with new styling**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy \u2014 Pharelo',
  description: 'How Pharelo handles your data and protects your privacy.',
}

const sections = [
  {
    title: 'Data we collect',
    content:
      'We collect information you provide directly, such as account details, appointment notes, and voice recordings you choose to capture. We also collect usage data to improve the app experience.',
  },
  {
    title: 'How we use it',
    content:
      'Your data is used to power the features you rely on \u2014 organizing appointments, generating summaries, and helping you prepare for visits. We do not sell your data to third parties.',
  },
  {
    title: 'Health data',
    content:
      'Pharelo may process health-related information you choose to enter. This data is treated with the highest level of care and encrypted both in transit and at rest. We comply with applicable health data regulations.',
  },
  {
    title: 'Third-party services',
    content:
      'We use select third-party services to operate Pharelo, including cloud hosting and AI processing. These partners are bound by strict data protection agreements.',
  },
  {
    title: 'Your rights',
    content:
      'You have the right to access, correct, or delete your personal data at any time. You can also request a copy of your data or ask us to stop processing it.',
  },
  {
    title: 'Contact',
    content:
      'If you have questions about this policy, please reach out to us at team@pharelo.com.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-[65ch] px-6 py-14 md:py-20">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="mb-12 flex flex-col gap-2">
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
              Privacy policy
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: February 2026
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <article key={section.title} className="flex flex-col gap-2 border-t border-border pt-6">
                <h2 className="font-serif text-lg text-foreground">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/privacy/page.tsx
git commit -m "feat: redesign privacy page with new brand styling"
```

---

### Task 21: Redesign terms page

**Files:**
- Modify: `app/terms/page.tsx`

- [ ] **Step 1: Rewrite with new styling**

Same structure as privacy page but with terms content. Keep the existing section data.

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service \u2014 Pharelo',
  description: 'Terms governing the use of Pharelo.',
}

const sections = [
  {
    title: 'Acceptance of terms',
    content:
      'By accessing or using Pharelo, you agree to be bound by these terms. If you do not agree, please do not use the app.',
  },
  {
    title: 'Description of service',
    content:
      'Pharelo is a mobile application designed to help you prepare for, document, and follow up on medical appointments. The app provides organizational tools, AI-assisted question preparation, and appointment summaries.',
  },
  {
    title: 'Medical disclaimer',
    content:
      'Pharelo is not a medical device and does not provide medical advice, diagnosis, or treatment. The AI features are designed to help you organize your thoughts and form questions \u2014 not to replace professional medical guidance. Always consult with a qualified healthcare provider.',
  },
  {
    title: 'User accounts',
    content:
      'You are responsible for maintaining the security of your account credentials. You agree to provide accurate information and to update it as needed. We reserve the right to suspend accounts that violate these terms.',
  },
  {
    title: 'Limitation of liability',
    content:
      'Pharelo is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the app, including but not limited to medical decisions made based on information organized through Pharelo.',
  },
  {
    title: 'Changes to terms',
    content:
      'We may update these terms from time to time. Continued use of Pharelo after changes are posted constitutes acceptance of the revised terms.',
  },
  {
    title: 'Contact',
    content:
      'If you have questions about these terms, please reach out to us at team@pharelo.com.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-[65ch] px-6 py-14 md:py-20">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="mb-12 flex flex-col gap-2">
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
              Terms of service
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: February 2026
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <article key={section.title} className="flex flex-col gap-2 border-t border-border pt-6">
                <h2 className="font-serif text-lg text-foreground">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/terms/page.tsx
git commit -m "feat: redesign terms page with new brand styling"
```

---

### Task 22: Redesign support page

**Files:**
- Modify: `app/support/page.tsx`

- [ ] **Step 1: Rewrite — remove fake form, keep FAQ and contact email**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SupportFAQ } from '@/components/support-faq'

export const metadata: Metadata = {
  title: 'Support \u2014 Pharelo',
  description: 'Get help with Pharelo. Contact us or browse frequently asked questions.',
}

const faqs = [
  {
    question: 'I\u2019m having trouble logging in. What should I do?',
    answer:
      'Try resetting your password using the \u201cForgot password\u201d link on the login screen. If the issue persists, contact us and we\u2019ll help you regain access to your account.',
  },
  {
    question: 'How do I delete my account or personal data?',
    answer:
      'You can request account deletion directly from the app\u2019s settings, or email us at team@pharelo.com. We\u2019ll process your request and confirm deletion within 5 business days.',
  },
  {
    question: 'Is my health information safe?',
    answer:
      'Yes. All health-related data is encrypted in transit and at rest. We never sell your data to third parties. See our Privacy Policy for full details on how we handle your information.',
  },
  {
    question: 'How do I manage or cancel my subscription?',
    answer:
      'Subscriptions are managed through your Apple ID. Go to Settings \u2192 Apple ID \u2192 Subscriptions on your iPhone to view, modify, or cancel your Pharelo subscription.',
  },
  {
    question: 'How can I share feedback or suggest a feature?',
    answer:
      'We\u2019d love to hear from you. Email us directly at team@pharelo.com. Every piece of feedback helps shape the future of Pharelo.',
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-[65ch] px-6 py-14 md:py-20">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="mb-12 flex flex-col gap-3">
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
              Support
            </h1>
            <p className="text-sm leading-relaxed text-muted max-w-lg">
              Need help with Pharelo? We{'\u2019'}re here for you.
            </p>
          </div>

          {/* Contact email */}
          <section className="mb-14">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-cream-light px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bronze/10">
                <EnvelopeSimple size={18} className="text-bronze" weight="fill" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  Email us
                </span>
                <a
                  href="mailto:team@pharelo.com"
                  className="text-sm font-medium text-foreground transition-colors hover:text-bronze"
                >
                  team@pharelo.com
                </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-xl text-foreground mb-6">
              Frequently asked questions
            </h2>
            <SupportFAQ faqs={faqs} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Create the FAQ client component**

```tsx
// components/support-faq.tsx
'use client'

import { useState } from 'react'

export function SupportFAQ({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
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
              <span className="text-sm font-medium text-foreground pr-4">
                {faq.question}
              </span>
              <span
                className="shrink-0 text-muted-foreground transition-transform duration-200 text-lg"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pb-4">
                <p className="text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/support/page.tsx components/support-faq.tsx
git commit -m "feat: redesign support page - remove fake form, keep FAQ"
```

---

## Phase 5: Cleanup and Build

### Task 23: Clean up remaining old files

**Files:**
- Delete: `components/ui/` (if still exists)
- Delete: `styles/` directory (if still exists)
- Delete: `lib/` directory (if still exists)
- Delete: `hooks/` directory (if exists and unused)

- [ ] **Step 1: Remove any remaining old directories**

```bash
rm -rf components/ui/ styles/ lib/ hooks/
```

- [ ] **Step 2: Remove old image assets no longer referenced**

The old hero/problem images are no longer used. Keep favicon files.

```bash
rm -f public/images/Diaper-bag-pacifier.webp
rm -f public/images/Fridge-Mess.webp
rm -f public/images/Map-Pen-Phone.webp
rm -f public/images/New-Hero-Waiting-Room.webp
rm -f public/images/New-hero-image.webp
rm -f public/images/Pharelo-Hero-Image.png
rm -f public/images/Pharelo-Hero-Image.webp
```

- [ ] **Step 3: Remove old duplicate CSS file and theme provider**

```bash
rm -f components/theme-provider.tsx
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old assets, utilities, and unused files"
```

---

### Task 24: Build and fix errors

**Files:**
- Potentially any file with type/import errors

- [ ] **Step 1: Run the build**

```bash
pnpm build 2>&1
```

- [ ] **Step 2: Fix any TypeScript or import errors**

Common issues to watch for:
- Font file paths in `layout.tsx` — `next/font/local` expects paths relative to the file, not the project root. The `src` path `'../public/fonts/CabinetGrotesk-Regular.woff2'` should work from `app/layout.tsx`.
- Tailwind v4 color utility classes — verify that `bg-cream-light`, `text-bronze`, `text-gold-mist`, etc. are generated from the `@theme` block. If not, check that token names in `globals.css` match usage in components.
- `@phosphor-icons/react/dist/ssr` import — this is the server-component-safe import path for Phosphor icons. If it doesn't resolve, try `@phosphor-icons/react` and mark the component as client if needed.
- The `clsx` import should work since it's kept as a dependency, but we may not use it anywhere. That's fine — it's zero-cost if unused.

- [ ] **Step 3: Fix and rebuild until clean**

```bash
pnpm build 2>&1
```

Expected: Build succeeds. Static pages generated to `out/`.

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve build errors"
```

---

### Task 25: Visual verification

- [ ] **Step 1: Start dev server and verify all pages**

```bash
pnpm dev
```

Open `http://localhost:3000` and verify:
- [ ] Header: sticky, transparent-to-cream on scroll, mobile menu works
- [ ] Hero: split layout, headline left, illustration right, waitlist form submits
- [ ] The Problem: centered text, staggered fade-up on scroll
- [ ] How It Works: zig-zag layout, mockups alternate sides, scroll reveals
- [ ] Meet Beacon: chat bubbles animate in with typing indicator
- [ ] Signals: SVG lines draw on scroll
- [ ] Who It's For: staggered scenarios with alternating indent
- [ ] Final CTA: waitlist form works, warm background
- [ ] Footer: links work, correct contact email
- [ ] `/privacy`, `/terms`, `/support` — all render with new styling
- [ ] Mobile: all sections stack correctly, hamburger menu works
- [ ] `prefers-reduced-motion`: animations disabled

- [ ] **Step 2: Fix any visual issues found**

- [ ] **Step 3: Final build to verify static export**

```bash
pnpm build
```

- [ ] **Step 4: Commit any visual fixes**

```bash
git add -A
git commit -m "fix: visual polish and responsiveness adjustments"
```

---

### Task 26: Final commit — rebuild complete

- [ ] **Step 1: Verify clean git state**

```bash
git status
```

- [ ] **Step 2: Tag the rebuild**

```bash
git tag v0.2.0-rebuild
```
