import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Marked } from 'marked'

const POSTS_DIR = path.join(process.cwd(), 'content/blog')

export type BlogHeading = {
  id: string
  text: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: number
  headings: BlogHeading[]
  html: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const blogMarked = new Marked()
blogMarked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens)
      const plain = text.replace(/<[^>]*>/g, '')
      const id = slugify(plain)
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    },
  },
})

function extractHeadings(html: string): BlogHeading[] {
  const headings: BlogHeading[] = []
  const regex = /<h2 id="([^"]+)">(.*?)<\/h2>/g
  let match
  while ((match = regex.exec(html)) !== null) {
    headings.push({ id: match[1], text: match[2].replace(/<[^>]*>/g, '') })
  }
  return headings
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 238))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

let cachedPosts: BlogPost[] | null = null

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts

  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)

    const html = blogMarked.parse(content, { async: false }) as string

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? '',
      category: data.category ?? 'Caregiving',
      readingTime: calculateReadingTime(content),
      headings: extractHeadings(html),
      html,
    }
  })

  cachedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return cachedPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
