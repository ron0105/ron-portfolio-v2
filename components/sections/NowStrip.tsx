import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type NowItem = { text: string; href: string }
type NowData = {
  updated: string
  building: NowItem
  episode: NowItem
  note: NowItem
}

function getNow(): NowData | null {
  const file = path.join(process.cwd(), 'content', 'now.md')
  if (!fs.existsSync(file)) return null
  const { data } = matter(fs.readFileSync(file, 'utf-8'))
  return data as NowData
}

const rows = [
  { key: 'building' as const, label: 'Currently building' },
  { key: 'episode' as const, label: 'This week on Learn With Ron' },
  { key: 'note' as const, label: 'Latest note' },
]

export default function NowStrip() {
  const now = getNow()
  if (!now) return null

  return (
    <section className="bg-paper border-t border-border px-5 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <span className="font-body text-xs text-muted uppercase tracking-widest flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Now
          </span>
          <span className="font-body text-xs text-muted/50">Updated {now.updated}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {rows.map(({ key, label }) => {
            const item = now[key]
            return (
              <Link key={key} href={item.href} className="group block">
                <span className="font-body text-xs text-muted/60 uppercase tracking-widest block mb-3">
                  {label}
                </span>
                <p className="font-heading text-lg md:text-xl font-medium text-ink leading-snug group-hover:text-accent transition-colors duration-200">
                  {item.text}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
