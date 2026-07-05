import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type NoteMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  takeaway: string
}

export type EpisodeMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  episode: number
  youtubeUrl: string
  status: string
  question: string
  verdict: string
  nextTease?: string
}

export type NowItem = { text: string; href: string }
export type LiveStatus = {
  status: 'offline' | 'live' | 'scheduled'
  text: string
  href: string
}
export type NowData = {
  updated: string
  building: NowItem
  episode: NowItem
  note: NowItem
  live?: LiveStatus
}

export function getNow(): NowData | null {
  const file = path.join(CONTENT_DIR, 'now.md')
  if (!fs.existsSync(file)) return null
  const { data } = matter(fs.readFileSync(file, 'utf-8'))
  return data as NowData
}

function readCollection(collection: string) {
  const dir = path.join(CONTENT_DIR, collection)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, data, content }
    })
}

export function getNotes(): NoteMeta[] {
  return readCollection('notes')
    .map(({ slug, data }) => ({ slug, ...data }) as NoteMeta)
    .sort((a, b) => Date.parse(`1 ${b.date}`) - Date.parse(`1 ${a.date}`))
}

export function getNote(slug: string) {
  const entry = readCollection('notes').find((e) => e.slug === slug)
  if (!entry) return null
  return { meta: { slug, ...entry.data } as NoteMeta, content: entry.content }
}

export function getEpisodes(): EpisodeMeta[] {
  return readCollection('learn')
    .map(({ slug, data }) => ({ slug, ...data }) as EpisodeMeta)
    .sort((a, b) => b.episode - a.episode)
}

export function getEpisode(slug: string) {
  const entry = readCollection('learn').find((e) => e.slug === slug)
  if (!entry) return null
  return { meta: { slug, ...entry.data } as EpisodeMeta, content: entry.content }
}
