import type { MetadataRoute } from 'next'
import { getNotes, getEpisodes } from '@/lib/content'

const BASE = 'https://buildwithron.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/work', '/learn', '/notes', '/about', '/contact', '/links'].map(
    (p) => ({ url: `${BASE}${p}`, lastModified: new Date() })
  )
  const notes = getNotes().map((n) => ({
    url: `${BASE}/notes/${n.slug}`,
    lastModified: new Date(),
  }))
  const episodes = getEpisodes().map((e) => ({
    url: `${BASE}/learn/${e.slug}`,
    lastModified: new Date(),
  }))
  return [...staticPages, ...notes, ...episodes]
}
