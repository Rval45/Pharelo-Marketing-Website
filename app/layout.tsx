import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pharelo.com'),
  title: 'Pharelo — Walk in prepared. Walk out clear.',
  description:
    'Pharelo helps you prepare for medical appointments, capture what matters during visits, and understand everything after.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Pharelo — Walk in prepared. Walk out clear.',
    description:
      'Pharelo helps you prepare for medical appointments, capture what matters during visits, and understand everything after.',
    url: 'https://pharelo.com',
    siteName: 'Pharelo',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pharelo — Walk in prepared. Walk out clear.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pharelo — Walk in prepared. Walk out clear.',
    description:
      'Pharelo helps you prepare for medical appointments, capture what matters during visits, and understand everything after.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://pharelo.com',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pharelo',
  description:
    'Pharelo helps you prepare for medical appointments, capture what matters during visits, and understand everything after.',
  url: 'https://pharelo.com',
  logo: 'https://pharelo.com/images/Pharelo_Logo.webp',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'team@pharelo.com',
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pharelo',
  description:
    'Medical appointment preparation, recording, and summary app. Organize your thoughts before visits, capture details during, and understand everything after.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS',
  url: 'https://pharelo.com',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, softwareSchema]),
          }}
        />
      </head>
      <body className={`${dmSerif.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
