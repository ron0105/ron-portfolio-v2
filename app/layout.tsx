import type { Metadata } from 'next'
import { Inter, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import PageTransition from '@/components/ui/PageTransition'
import { AudioProvider } from '@/context/AudioContext'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://buildwithron.com'),
  title: {
    default: 'Rohan Tiwarekar — Founder & Builder',
    template: '%s',
  },
  description:
    'Co-founder of The Adda Labs. Building a company and filming the journey — live AI experiments, honest notes, real work.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var saved = localStorage.getItem('theme');
              var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', saved || preferred);
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="bg-paper text-ink font-body antialiased overflow-x-hidden">
        {/* Global grain: one texture across the entire page, no per-section noise */}
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none select-none z-[9999]"
          aria-hidden="true"
          style={{ opacity: 0.032, mixBlendMode: 'multiply' }}
        >
          <filter id="global-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#global-noise)" />
        </svg>
        <ThemeProvider>
          <AudioProvider>
            <PageTransition>{children}</PageTransition>
          </AudioProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
