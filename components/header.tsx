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
