import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Sans, Instrument_Serif } from 'next/font/google';

import { meta, contact, service, weLoveYou } from '@/lib/content';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { Cursor } from '@/components/layout/Cursor';
import './globals.css';

// ──────────────────────────────────────────────────────────
// Fonts — self-hosted via next/font/google for zero CLS + privacy
// ──────────────────────────────────────────────────────────

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

// ──────────────────────────────────────────────────────────
// Metadata
// ──────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(meta.canonical),
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: meta.canonical,
  },
  applicationName: 'Open Door Fellowship',
  keywords: [
    'Open Door Fellowship',
    'church Spring City TN',
    'recovery ministry Tennessee',
    'Christian recovery community',
    'come as you are',
    'Spring City church',
  ],
  authors: [{ name: 'Open Door Fellowship' }],
  creator: 'Open Door Fellowship',
  publisher: 'Open Door Fellowship',
  openGraph: {
    type: 'website',
    title: meta.title,
    description: meta.description,
    url: meta.canonical,
    siteName: 'Open Door Fellowship',
    locale: 'en_US',
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: 'Open Door Fellowship — Come As You Are',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: meta.themeColor,
};

// ──────────────────────────────────────────────────────────
// JSON-LD structured data — Church schema for local SEO
// ──────────────────────────────────────────────────────────

const churchSchema = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  '@id': `${meta.canonical}/#church`,
  name: 'Open Door Fellowship',
  alternateName: 'ODF',
  url: meta.canonical,
  logo: `${meta.canonical}/icon-512.png`,
  image: `${meta.canonical}${meta.ogImage}`,
  description: weLoveYou.closing,
  telephone: contact.phones[0].tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.region,
    postalCode: contact.address.postal,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.6890,
    longitude: -84.8602,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:30',
      closes: '12:00',
    },
  ],
  sameAs: [contact.social.facebook],
  knowsLanguage: 'en-US',
} as const;

// ──────────────────────────────────────────────────────────
// Root layout
// ──────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Structured data for local-SEO and rich result eligibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
        />
      </head>
      <body>
        <LenisProvider>
          {/* Custom magnetic cursor — desktop only, skipped on touch + reduced-motion */}
          <Cursor />
          {/* Grain overlay sits above the canvas but below content + cursor */}
          <div aria-hidden className="grain-overlay" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
