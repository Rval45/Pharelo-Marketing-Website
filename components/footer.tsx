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
