import Link from 'next/link'
import { getNow } from '@/lib/content'

const rows = [
  { key: 'building' as const, label: 'Currently building' },
  { key: 'episode' as const, label: 'This week on Learn With Ron' },
  { key: 'note' as const, label: 'Latest note' },
]

export default function NowStrip() {
  const now = getNow()
  if (!now) return null

  const live = now.live
  const isLive = live?.status === 'live'
  const isScheduled = live?.status === 'scheduled'

  return (
    <section className="bg-paper border-t border-border">
      {/* Live banner — only when live or scheduled */}
      {live && (isLive || isScheduled) && (
        <a
          href={live.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-5 sm:px-6 py-4 group transition-colors duration-200 ${
            isLive
              ? 'bg-accent hover:bg-ink always-dark'
              : 'border-b border-border hover:bg-paper-dark/40'
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              {isLive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-paper opacity-60" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isLive ? 'bg-paper' : 'bg-accent animate-pulse'
                }`}
              />
            </span>
            <span
              className={`font-body text-xs uppercase tracking-widest shrink-0 font-bold ${
                isLive ? 'text-paper' : 'text-accent'
              }`}
            >
              {isLive ? 'Live now' : 'Up next'}
            </span>
            <span
              className={`font-body text-sm truncate ${
                isLive ? 'text-paper/90' : 'text-ink/70'
              }`}
            >
              {live.text}
            </span>
            <span
              className={`ml-auto shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                isLive ? 'text-paper' : 'text-muted'
              }`}
            >
              →
            </span>
          </div>
        </a>
      )}

      <div className="px-5 sm:px-6 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <span className="font-body text-xs text-muted uppercase tracking-widest flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Right now
            </span>
            <span
              className="text-muted/60 text-lg"
              style={{ fontFamily: 'var(--font-caveat), cursive', rotate: '-1deg' }}
            >
              updated {now.updated.toLowerCase()} ✓
            </span>
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
      </div>
    </section>
  )
}
