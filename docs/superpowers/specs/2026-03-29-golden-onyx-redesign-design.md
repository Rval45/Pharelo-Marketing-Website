# Golden Onyx Marketing Website Redesign

**Date:** 2026-03-29
**Scope:** Design refresh — apply Golden Onyx design system tokens, rework layouts and animations for premium feel. Same sections and content, elevated execution.

---

## Decisions

- **Fonts:** DM Serif Display (headings) + Inter (body/UI) per Golden Onyx spec
- **Motion:** Add Framer Motion for spring physics, staggered orchestration, layout transitions
- **Hero:** Rethought — full-width asymmetric with background photo fade, floating cards moved below fold
- **Approach:** Option B — design refresh, not a full content rethink

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `background` | `#F7F3EC` | Page background (warm linen) |
| `surface` | `#FDF8F3` | Cards, modals, elevated containers |
| `foreground` | `#2C2416` | Primary text (earth.800) |
| `foreground-muted` | `rgba(44,36,22,0.6)` | Secondary text |
| `foreground-subtle` | `rgba(44,36,22,0.3)` | Tertiary text, placeholders |
| `peach-500` | `#D4935A` | Primary accent, CTAs, links |
| `peach-600` | `#C47840` | Hover states, large text accent |
| `peach-700` | `#A86330` | Small text accent (WCAG AA all sizes) |
| `teal-600` | `#298282` | Success, checkmarks, completion |
| `coral` | `#D4785C` | Urgency, active/live status |
| `sage` | `#7BA68A` | Ready, answered states |
| `error` | `#F43F5E` | Destructive actions |
| `warning` | `#F59E0B` | Caution states |
| `success` | `#10B981` | Semantic success (emerald) |
| `border` | `rgba(44,36,22,0.08)` | Subtle warm borders |

### Shadows (warm amber-tinted, no cold grays)

```
shadow-xs:  0 1px 2px rgba(160,110,50,0.04)
shadow-sm:  0 1px 3px rgba(160,110,50,0.06)
shadow-md:  0 4px 12px rgba(160,110,50,0.08)
shadow-lg:  0 12px 32px rgba(160,110,50,0.1)
shadow-xl:  0 20px 40px -15px rgba(160,110,50,0.12)
```

### Typography

- **Headings:** DM Serif Display, weight 400, color foreground
- **Body/UI:** Inter, weight 400/600, color foreground / foreground-muted
- **Display:** `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body:** `text-base leading-relaxed max-w-[65ch]`
- **Button text:** 0.3px letter-spacing, Inter SemiBold
- **Tab/label:** Inter SemiBold 11px, uppercase, 0.8px tracking

### Spacing

Follow Golden Onyx scale: 2, 4, 8, 12, 16, 24, 32, 48px mapped to Tailwind utilities.

### Border Radius

- `sm`: 4px
- `md`: 8px
- `card`: 14px (card containers)
- `lg`: 16px (buttons)
- `xl`: 24px (modals, sheets)
- `full`: 9999px (pills, circles)

---

## 2. Dependencies

### Add
- `framer-motion` — spring physics, staggered reveals, layout transitions, useInView, useReducedMotion

### Change
- Replace `Cabinet Grotesk` local font with `DM Serif Display` (Google Font)
- Replace `Source Serif 4` with `DM Serif Display` (consolidate to one serif)
- Add `Inter` (Google Font) replacing Cabinet Grotesk for body/UI

### Keep
- `@phosphor-icons/react` (icon library)
- `sharp` (image optimization)
- All existing image assets

---

## 3. Global Changes

### globals.css
- Rewrite `@theme inline` block with full Golden Onyx token set
- Replace all color variables
- Replace shadow definitions with warm amber-tinted versions
- Update paper grain texture overlay tint to match `#F7F3EC`
- Remove CSS scroll-reveal keyframes (migrating to Framer Motion)
- Keep `@keyframes` for simple infinite loops (typing dots, etc.)
- Add `prefers-reduced-motion` handling note (Framer Motion handles via `useReducedMotion`)

### layout.tsx
- Swap font imports: `DM_Serif_Display` and `Inter` from `next/font/google`
- Update CSS variable names: `--font-serif` and `--font-sans`
- Remove Cabinet Grotesk local font loading
- Remove Source Serif 4 import

### Scroll Reveal System
- Replace current CSS-based `scroll-reveal.tsx` (IntersectionObserver + CSS classes) with a Framer Motion wrapper using `useInView` + `motion.div`
- Default animation: spring with `stiffness: 80, damping: 20`
- Support variants: fade-up, slide-left, slide-right
- Support `staggerChildren` for list/grid reveals
- Gate all motion behind `useReducedMotion`

### Interactive Elements (global)
- Hover: `-translate-y-[1px]` lift + shadow-md transition
- Active: `scale-[0.98]` tactile press
- Focus: `ring-2 ring-peach-500/40 ring-offset-2 ring-offset-background`

---

## 4. Section-by-Section Changes

### Header
- Font: Inter for nav links, DM Serif Display for brand name
- Background: `#F7F3EC` with `backdrop-blur-xl` + `bg-background/80` on scroll
- CTA button: peach-500 fill, white text, `rounded-2xl` (16px), tactile press feedback
- Nav link hover: peach-700 underline reveal
- Scroll border: `1px solid` border token
- Entrance: Framer Motion fade-down with spring on mount

### Hero (Rethought)
- **Layout:** Full-width asymmetric. Background photo spans right ~60%, gradient-fades left into `#F7F3EC`
- **Text:** Left-aligned in the clear left ~40%. Large DM Serif Display headline in foreground. Inter body text. Waitlist form beneath.
- **Height:** `min-h-[100dvh]`
- **Floating cards removed from hero.** They become a scroll-triggered section immediately below.
- **Entrance:** Headline springs up, body follows +100ms, form +200ms. Photo fades in with opacity spring.

### Floating Feature Cards (New sub-section below hero)
- 3 cards (Beacon suggestion, Checklist, Recording) stagger in on scroll
- Warm glassmorphism: `bg-surface/70`, `backdrop-blur-xl`, `border border-white/20`, `shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`
- Warm shadow-lg beneath each card
- Spring entrance with `staggerChildren: 0.12`
- Layout: asymmetric grid, not 3 equal columns. Use `grid-template-columns: 1.1fr 0.9fr 1fr` or similar variance

### The Problem
- Keep sticky left / scrolling right pattern
- Background image fades into `#F7F3EC`
- Scenario items: no card containers. Use `border-t border-border` top dividers with generous spacing
- Scenario headings: DM Serif Display italic, peach-700
- Framer Motion staggered scroll reveal per scenario

### How It Works
- Keep alternating zig-zag layout
- Phase labels: Inter SemiBold uppercase pills — `rounded-full`, `bg-peach-500/10`, `text-peach-700`, 0.8px letter-spacing
- Headlines: DM Serif Display, foreground
- App mockup frame: surface background with shadow-xl amber. Dynamic island and home indicator tinted to foreground
- Framer Motion `useInView` + spring per phase, sliding from respective side
- Vertical spacing: `gap-32 lg:gap-48`

### Meet Beacon (Chat Demo)
- Chat container: `bg-surface` with `rounded-3xl` (24px) and shadow-lg
- Beacon messages: `bg-background` with `border-l-2 border-peach-500`
- User messages: `bg-peach-500/10` with `rounded-2xl`
- Typing dots: peach-500
- Message entrance: Framer Motion spring with `staggerChildren: 0.15`, slight overshoot
- "Beacon" label: teal-600 text on teal-600/10 pill

### Signals (Health Trends)
- Chart lines recolored: peach-500, teal-600, coral
- Chart in surface card with warm shadow
- SVG stroke-dasharray draw triggered by Framer Motion `useInView`
- Legend: small rounded pills with color dot + Inter label
- Left text: DM Serif Display heading, Inter body

### Who It's For
- 2-column asymmetric grid: `grid-template-columns: 1.2fr 1fr`, alternating image side
- Images: `rounded-[14px]` with shadow-md, subtle warm gradient overlay
- Scenario headings: DM Serif Display
- Framer Motion staggered entrance per block
- Mobile: single column, image above text

### Final CTA
- Background image: strong vignette fade into `#F7F3EC` from all edges
- Text: left-aligned (not centered), large DM Serif Display headline
- Waitlist form: peach-500 button with warm shadow hover lift, tactile press
- Framer Motion spring stagger on scroll

### Footer
- Background: `#2C2416` (earth.800) — dark warm, inverted
- Text: `#FDF8F3` (surface)
- Logo + brand name in DM Serif Display
- Links: peach-500 on hover
- Separator: `border-t border-surface/10`
- Copyright: surface at 60% opacity

---

## 5. Component Architecture

### New Components
- `components/motion-wrapper.tsx` — `'use client'` Framer Motion scroll reveal wrapper (replaces `scroll-reveal.tsx`)

### Modified Components (all existing)
- `header.tsx` — tokens + Framer entrance
- `hero.tsx` / `hero-variant-a.tsx` — full rethink per above
- `the-problem.tsx` — tokens + divider pattern + motion
- `how-it-works.tsx` — tokens + phase pills + motion
- `app-mockup.tsx` — token refresh
- `meet-beacon.tsx` — tokens + motion
- `chat-demo.tsx` — message styling refresh
- `signals.tsx` — chart recolor + motion trigger
- `who-its-for.tsx` — grid rework + motion
- `final-cta.tsx` — left-align + tokens + motion
- `footer.tsx` — dark warm inversion
- `waitlist-form.tsx` — button styling + focus states
- `logo.tsx` — no change (already using Pharelo_Logo.png)
- `globals.css` — full token rewrite
- `layout.tsx` — font swap

### Removed
- `scroll-reveal.tsx` — replaced by `motion-wrapper.tsx`

---

## 6. WCAG Compliance

- `foreground` (#2C2416) on `surface` (#FDF8F3): 14.5:1 — AAA
- `foreground` on `background` (#F7F3EC): ~13:1 — AAA
- `peach-700` (#A86330) on `surface`: 4.7:1 — AA all sizes
- `peach-600` (#C47840) on `surface`: 3.5:1 — AA large text only (16px+ bold)
- `teal-600` (#298282) on `surface`: 4.6:1 — AA
- Footer: `surface` (#FDF8F3) on `foreground` (#2C2416): 14.5:1 — AAA
- All interactive elements maintain visible focus indicators

---

## 7. Performance

- Framer Motion: ~30KB gzipped addition to bundle
- All Framer Motion components isolated as `'use client'` leaf components
- Server Components render static layout; client components handle motion only
- `useReducedMotion` gates all spring animations
- Warm shadow transitions use `transform` and `opacity` only (GPU-accelerated)
- Static export (`output: "export"`) unchanged — Framer Motion works with SSG
