import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/ui/PageTransition'
import { AudioProvider } from '@/context/AudioContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rohan: Builder',
  description:
    'I build things that are taking shape. Experiments, ideas, and work in progress.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
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
        <AudioProvider>
          <PageTransition>{children}</PageTransition>
        </AudioProvider>
      </body>
    </html>
  )
}
