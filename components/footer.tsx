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
