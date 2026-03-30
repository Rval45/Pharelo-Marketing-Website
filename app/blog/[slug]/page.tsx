import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog'
import { MotionWrapper } from '@/components/motion-wrapper'
import { WaitlistForm } from '@/components/waitlist-form'
import { ReadingProgress } from '@/components/reading-progress'
import { TableOfContents } from '@/components/table-of-contents'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — Pharelo`,
    description: post.description,
    alternates: { canonical: `https://pharelo.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://pharelo.com/blog/${slug}`,
      siteName: 'Pharelo',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/images/og-image.png'],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Pharelo' },
    publisher: {
      '@type': 'Organization',
      name: 'Pharelo',
      url: 'https://pharelo.com',
    },
    mainEntityOfPage: `https://pharelo.com/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <ReadingProgress />

      <article className="px-6 md:px-12 pb-16 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          {/* Back link */}
          <MotionWrapper>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-peach-600 transition-colors duration-200 mb-10 md:mb-16"
            >
              <ArrowLeft size={16} weight="bold" />
              All posts
            </Link>
          </MotionWrapper>

          {/* Article header */}
          <header className="max-w-3xl mb-12 md:mb-20">
            <MotionWrapper>
              <span className="inline-flex w-fit rounded-full bg-peach-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.8px] text-peach-700">
                {post.category}
              </span>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.05}>
              <h1 className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-tight text-foreground">
                {post.title}
              </h1>
            </MotionWrapper>

            <MotionWrapper variant="fade-up" delay={0.1}>
              <div className="mt-5 flex items-center gap-3 text-sm text-foreground-subtle">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-foreground-subtle" />
                <span>{post.readingTime} min read</span>
              </div>
            </MotionWrapper>
          </header>

          {/* Divider */}
          <div className="section-fade mb-12 md:mb-16" />

          {/* Table of contents */}
          <MotionWrapper variant="fade-up" delay={0.12}>
            <TableOfContents headings={post.headings} />
          </MotionWrapper>

          {/* Article body */}
          <MotionWrapper variant="fade-up" delay={0.15}>
            <div
              className="prose mx-auto max-w-[65ch]"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </MotionWrapper>

          {/* CTA */}
          <div className="mx-auto max-w-[65ch] mt-20 md:mt-32">
            <div className="section-fade mb-12 md:mb-16" />
            <MotionWrapper variant="fade-up">
              <div className="max-w-md">
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-foreground">
                  Your next appointment
                  <br />
                  deserves better.
                </h2>
                <p className="mt-4 text-base text-foreground-muted">
                  Join the waitlist and be the first to know when Pharelo is
                  ready.
                </p>
                <div className="mt-8">
                  <WaitlistForm id="blog-cta-email" />
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </article>
    </>
  )
}
