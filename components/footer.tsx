import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-footer-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <span className="text-xs text-warm-secondary/35 font-sans">
          &copy; 2026 Pharelo
        </span>
        <nav
          className="flex flex-wrap items-center gap-5 md:gap-7 text-xs text-warm-secondary/35 font-sans"
          aria-label="Footer navigation"
        >
          <Link
            href="/privacy"
            className="transition-colors hover:text-warm-secondary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-warm-secondary"
          >
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-warm-secondary"
          >
            Support
          </Link>
          <a
            href="mailto:support@pharelo.com"
            className="transition-colors hover:text-warm-secondary"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
