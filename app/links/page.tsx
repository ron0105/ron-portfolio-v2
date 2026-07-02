import type { Metadata } from 'next'
import LinksHero from '@/components/sections/links/LinksHero'

export const metadata: Metadata = {
  title: 'Links — Rohan Tiwarekar',
  description: 'Everything I do, in one place. YouTube, X, Instagram, LinkedIn, and The Adda Labs.',
}

export default function LinksPage() {
  return <LinksHero />
}
