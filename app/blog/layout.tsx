import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-peach-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="pt-24">{children}</main>
      <Footer />
    </div>
  )
}
