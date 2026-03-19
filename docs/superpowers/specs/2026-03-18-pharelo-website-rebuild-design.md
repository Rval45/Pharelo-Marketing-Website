# Pharelo Website Rebuild — Design Spec

## Overview

Full rebuild of the Pharelo marketing website. Pharelo is a healthcare appointment preparation app that helps patients and caregivers walk into every doctor visit feeling prepared, informed, and empowered. The brand aesthetic is warm, human-centered, and organic — not clinical. The tone is a trusted companion, not a medical tool.

## Technical Architecture

- **Framework:** Next.js 16 with static export (`output: "export"`)
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`, CSS custom properties for brand tokens
- **Motion:** CSS animations + `IntersectionObserver` in isolated `"use client"` leaf components (no framer-motion)
- **Fonts:** Source Serif 4 (headlines, via `next/font/google`) + Cabinet Grotesk (body, via `next/font/local` with self-hosted files)
- **Icons:** `@phosphor-icons/react` (replacing current `lucide-react`)
- **Deploy:** Cloudflare Workers with Static Assets via `wrangler deploy` (existing `wrangler.toml` config)
- **Existing integrations kept:** Loops waitlist form endpoint, Vercel Analytics

### Design Parameters

- DESIGN_VARIANCE: 7 (offset/asymmetric layouts, varied spacing)
- MOTION_INTENSITY: 6 (fluid CSS transitions, scroll-triggered reveals, staggered orchestration)
- VISUAL_DENSITY: 3 (spacious, breathing, premium — art gallery mode)

## Color Palette — Golden Grove / Wada Combo #310

Strict one-CTA-color rule. Visual hierarchy comes from typography weight and opacity, not color variety.

| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#F5F0E8` | Page background |
| `--cream-light` | `#FFFCF7` | Card surfaces, elevated areas |
| `--bronze` | `#8B6914` | CTA buttons — the ONE accent color |
| `--bronze-hover` | `#6B4F0E` | CTA hover/active state |
| `--gold-mist` | `#C9A227` | Subtle highlights, logo accent, decorative elements |
| `--warm-bark` | `#3D2B1F` | Headlines, primary text |
| `--warm-bark-60` | `rgba(61,43,31,0.6)` | Body text |
| `--warm-bark-30` | `rgba(61,43,31,0.3)` | Muted/tertiary text, borders |
| `--warm-bark-10` | `rgba(61,43,31,0.1)` | Dividers, subtle borders, hover backgrounds |

## Typography

- **Headlines:** Source Serif 4, light/regular weight (300-400), `tracking-tight`, `leading-none`
- **Body:** Cabinet Grotesk, regular weight (400), `leading-relaxed`, `max-w-[65ch]`
- **Labels/Small caps:** Cabinet Grotesk, medium weight (500), `text-xs uppercase tracking-widest`
- **CTA buttons:** Cabinet Grotesk, medium weight (500)
- **No Inter.** No Instrument Serif. Clean break from current fonts.

## Pages

### 1. Landing Page (`/`)

Seven sections forming a narrative arc from problem to solution to action.

#### 01 — Hero (Split Layout)

- **Layout:** `grid grid-cols-1 lg:grid-cols-2` with asymmetric whitespace. Left-aligned content, not centered.
- **Left side:**
  - Source Serif 4 headline: "Walk in prepared. Walk out clear." (or similar — final copy TBD)
  - Cabinet Grotesk subtext explaining Pharelo's value in one sentence
  - Waitlist email input + bronze CTA button (Loops integration)
- **Right side:**
  - Abstract warm illustration: layered organic shapes in gold/cream with the beacon logo mark floating
  - Built as SVG/CSS, not raster images
- **Background:** Subtle mesh gradient in cream/gold tones with slow CSS `background-position` drift animation (25s cycle)
- **Mobile:** Stacks vertically, illustration shrinks to decorative accent above headline
- **Height:** `min-h-[100dvh]` (never `h-screen`)

#### 02 — The Problem (Emotional Narrative)

- **Layout:** Centered text block, narrow `max-w-[42ch]`, maximum breathing room
- **Content:**
  - "You've been there." opener in Source Serif 4 italic
  - 3-4 relatable scenarios as separate text blocks:
    - "You forgot the one question that mattered."
    - "The doctor talked fast and you nodded along."
    - "You left and couldn't remember what they said."
  - No cards, no boxes — just typography and whitespace
  - Subtle warm divider lines (`border-top` with `--warm-bark-10`) between scenarios
- **Motion:** Each scenario fades up with staggered `animation-delay` on scroll trigger

#### 03 — How Pharelo Works (Zig-Zag Layout)

- **Layout:** Three phases, alternating text/visual sides
  - Phase 1 (Before): text left, mockup right
  - Phase 2 (During): text right, mockup left
  - Phase 3 (After): text left, mockup right
- **Content per phase:**
  - Small caps phase label ("Before your visit", "During your visit", "After your visit")
  - Source Serif 4 phase headline
  - Cabinet Grotesk description paragraph
  - Stylized app UI mockup (built in HTML/CSS within a phone frame, not images)
- **Mockups:**
  - Before: checklist interface with checkboxes and question items
  - During: recording waveform visualization + live transcript text
  - After: summary card with key takeaways and action items
- **Motion:** Scroll-triggered fade-up per phase, mockups slide in from their respective sides
- **Mobile:** Single column, mockups full-width below text

#### 04 — Meet Beacon (Feature Spotlight)

- **Layout:** Left-aligned intro text with chat demo below/beside
- **Content:**
  - "Meet Beacon" headline in Source Serif 4
  - Description: Beacon is an intelligent assistant that surfaces personalized suggestions and generates post-visit summaries. Warm tone — "like a friend who remembers everything."
- **Chat demo:** 2-3 message exchange showing:
  - Beacon suggesting a question to ask based on recent symptoms
  - User acknowledging
  - Beacon generating a post-visit summary snippet
- **Motion:** Chat bubbles stagger in on scroll with typing indicator dots between messages (CSS animation with `animation-delay` cascade)
- **Chat demo is a `"use client"` leaf component** (`chat-demo.tsx`) for IntersectionObserver triggering

#### 05 — Signals (Organic Data Visualization)

- **Layout:** Feature card style — headline + visualization
- **Content:**
  - "See what your visits reveal" headline
  - Explanation of Signals: tracks health themes across appointments over time
- **Visualization:**
  - SVG organic curved lines (bezier paths, not straight/clinical) showing 2-3 health themes tracked over time
  - Theme labels floating alongside curves: "Sleep quality", "Medication response", "Energy levels"
  - Muted gold/bronze palette for the curves
  - CSS `stroke-dashoffset` animation draws lines on scroll trigger
- **Not clinical charts.** No axes, no gridlines. Organic, flowing, warm.

#### 06 — Who It's For (Scenario Section)

- **Layout:** 2-column offset grid with asymmetric sizing (e.g., `grid-template-columns: 1.2fr 0.8fr` or similar variance)
- **Content:** 3 scenarios, no fake personas or names:
  - Patient managing a chronic condition across specialists
  - Caregiver coordinating appointments for an aging parent
  - Someone preparing for a big specialist visit for the first time
- **Styling:** Each scenario is a short narrative paragraph with `border-top` divider, no boxed cards
- **Motion:** Staggered scroll reveal
- **Mobile:** Single column

#### 07 — Final CTA + Footer

- **CTA block:**
  - Slightly warmer background tone (e.g., `--cream` with a subtle gold gradient overlay)
  - Source Serif 4 headline: "Your next appointment deserves better."
  - Waitlist email input + bronze CTA (same Loops form as hero)
  - Generous vertical padding (`py-24` or more)
- **Footer:**
  - Nav links: Privacy, Terms, Support (anchor to respective pages)
  - Contact: team@pharelo.com
  - Copyright line
  - Minimal, generous spacing, no card or elevated surface

### 2. Privacy Page (`/privacy`)

- Full redesign with new typography and color palette
- Source Serif 4 page title, Cabinet Grotesk body text
- Clean readable layout: `max-w-[65ch]`, generous section spacing
- Proper heading hierarchy with Source Serif 4 section headers
- Same header/footer as landing page

### 3. Terms Page (`/terms`)

- Same treatment as privacy page
- Clean legal content layout with new brand styling

### 4. Support Page (`/support`)

- Same treatment as privacy/terms
- Contact information (team@pharelo.com)
- FAQ or help content if applicable
- Same header/footer

## Navigation

- **Sticky header:** Beacon logo mark (left), nav links (center-right): "How it works", "Beacon", "Signals" (smooth-scroll anchor links to landing page sections), waitlist CTA button (far right)
- **Scroll behavior:** Header background transitions from transparent to cream with subtle backdrop-blur on scroll (CSS transition, `"use client"` component for scroll state)
- **Mobile:** Hamburger icon, slide-down panel with nav links and CTA
- **Active on sub-pages:** Logo links to `/`, nav links navigate to `/#section-id`

## Logo — Abstract Beacon Mark

- Custom SVG: abstract lighthouse/beacon concept
- Organic, warm shapes — not geometric or clinical
- Uses `--gold-mist` and `--warm-bark` colors
- Works at small sizes (header) and medium sizes (hero decoration)
- Light/dark favicon variants derived from the same mark
- Apple touch icon generated from the mark

## Motion System

All motion is CSS-based. No framer-motion.

### Scroll Reveals

- Reusable `scroll-reveal.tsx` — a `"use client"` component wrapping `IntersectionObserver`
- Adds `.visible` class when element enters viewport (threshold ~0.15)
- Children use CSS transitions: `opacity 0 -> 1`, `translateY(20px) -> 0`
- Transition: `0.7s cubic-bezier(0.22, 1, 0.36, 1)`

### Staggered Entrance

- CSS custom property `--index` set on each child
- `animation-delay: calc(var(--index) * 120ms)`
- Used in: Problem scenarios, How-it-works phases, Who-it's-for scenarios, chat bubbles

### Ambient Motion

- Hero mesh gradient: `background-position` drift, 25s cycle
- Beacon mark in hero: gentle float animation (`translateY` oscillation, 6s cycle)
- Typing indicator dots: cascaded opacity/translate pulse (1.4s cycle with 0.2s stagger)

### Tactile Feedback

- Buttons on `:active`: `scale(0.98)` + slight color darken
- All transitions use `cubic-bezier(0.22, 1, 0.36, 1)` — no linear easing
- Hover states: smooth color/opacity transitions, 200ms

### Reduced Motion

- All keyframe animations wrapped in `@media (prefers-reduced-motion: reduce)` override that sets `animation: none`
- Scroll reveals still show content (just without transition)

## Component Architecture

```
components/
  logo.tsx              — SVG beacon mark, pure component
  header.tsx            — Sticky nav ("use client" for scroll state + mobile menu)
  hero.tsx              — Split hero layout (server component)
  waitlist-form.tsx     — Email input + Loops POST ("use client")
  the-problem.tsx       — Narrative section (server component)
  how-it-works.tsx      — Zig-zag phases (server component)
  app-mockup.tsx        — Stylized phone UI frame (server component)
  meet-beacon.tsx       — Beacon intro (server component)
  chat-demo.tsx         — Animated chat bubbles ("use client" for scroll trigger)
  signals.tsx           — SVG data viz (server component, CSS animation)
  who-its-for.tsx       — Scenario section (server component)
  final-cta.tsx         — Closing CTA block (server component)
  footer.tsx            — Site footer (server component)
  scroll-reveal.tsx     — IntersectionObserver wrapper ("use client")
```

### Client vs Server Split

Only four components need `"use client"`:
- `header.tsx` — scroll position tracking, mobile menu toggle
- `waitlist-form.tsx` — form state, Loops API submission
- `chat-demo.tsx` — IntersectionObserver to trigger chat animation sequence
- `scroll-reveal.tsx` — IntersectionObserver wrapper

Everything else is a server component. This keeps the JS bundle minimal for static export.

## Dependencies

### Add
- `@phosphor-icons/react` — icon library
- Cabinet Grotesk font files (self-hosted in `public/fonts/`)

### Remove
- `lucide-react` — replaced by phosphor
- `@vercel/analytics` — evaluate if still needed on Cloudflare (keep if working)
- Unused Radix primitives (keep only what's needed: none for marketing site)
- Various unused shadcn/ui dependencies

### Keep
- `next`, `react`, `react-dom` — framework
- `tailwindcss`, `@tailwindcss/postcss`, `tw-animate-css` — styling
- `tailwind-merge`, `clsx`, `class-variance-authority` — utility classes

## File Cleanup

This is a full rebuild. All existing component files in `components/` will be replaced. Existing files to delete:
- All current components (`header.tsx`, `hero.tsx`, `the-problem.tsx`, etc.)
- `styles/globals.css` (duplicate of `app/globals.css`)
- `components/ui/` directory (shadcn components not needed for marketing site)

Files to keep and modify:
- `app/layout.tsx` — update fonts, remove old imports
- `app/globals.css` — rewrite with new palette and motion system
- `app/page.tsx` — rewrite with new component imports
- `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/support/page.tsx` — rewrite
- `next.config.mjs` — keep as-is
- `wrangler.toml` — keep as-is
- `package.json` — update dependencies

## Out of Scope

- Dark mode (single warm cream theme)
- Blog or dynamic content
- User authentication or app functionality
- Analytics beyond existing Vercel Analytics
- SEO beyond basic meta tags (already handled by Next.js metadata)
- Image optimization (static export uses `unoptimized: true`)
