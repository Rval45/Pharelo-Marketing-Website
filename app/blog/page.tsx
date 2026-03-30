import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import { MotionWrapper } from '@/components/motion-wrapper'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Blog — Pharelo',
  description:
    'Practical guides for caregivers navigating medical appointments and managing healthcare for loved ones.',
  alternates: { canonical: 'https://pharelo.com/blog' },
  openGraph: {
    title: 'Blog — Pharelo',
    description:
      'Practical guides for caregivers navigating medical appointments and managing healthcare for loved ones.',
    url: 'https://pharelo.com/blog',
    siteName: 'Pharelo',
    type: 'website',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <section className="px-6 md:px-12 pb-24 md:pb-44">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <MotionWrapper>
          <div className="max-w-2xl pb-16 md:pb-24">
            <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-peach-700">
              Blog
            </span>
            <h1 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-foreground">
              Guides for the people
              <br />
              who show up.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted max-w-[50ch]">
              Practical advice for caregivers navigating medical appointments,
              managing a parent's healthcare, and making sense of it all.
            </p>
          </div>
        </MotionWrapper>

        {/* Posts */}
        {posts.length === 0 ? (
          <MotionWrapper variant="fade-up">
            <div className="py-20 text-center">
              <p className="text-lg text-foreground-muted">
                New articles coming soon.
              </p>
            </div>
          </MotionWrapper>
        ) : (
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <MotionWrapper key={post.slug} variant="fade-up" staggerIndex={i}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block border-t border-border py-10 md:py-14"
                >
                  <div className="md:grid md:grid-cols-[1fr_auto] md:gap-12 items-start">
                    <div>
                      <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                        {post.category}
                      </span>
                      <h2 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-peach-600 transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-foreground-muted max-w-[60ch]">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-2 flex items-center gap-6 shrink-0">
                      <div className="flex flex-col items-end gap-1 text-sm text-foreground-subtle">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <ArrowRight
                        size={20}
                        weight="bold"
                        className="text-foreground-subtle group-hover:text-peach-600 group-hover:translate-x-1 transition-all duration-200 hidden md:block"
                      />
                    </div>
                  </div>
                </Link>
              </MotionWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
