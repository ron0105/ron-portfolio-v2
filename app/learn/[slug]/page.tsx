import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Prose from '@/components/ui/Prose'
import { getEpisode, getEpisodes } from '@/lib/content'

export function generateStaticParams() {
  return getEpisodes().map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = getEpisode(slug)
  if (!ep) return {}
  return {
    title: `${ep.meta.title} — Learn With Ron`,
    description: ep.meta.excerpt,
  }
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ep = getEpisode(slug)
  if (!ep) notFound()

  const next = getEpisodes().find((e) => e.episode === ep.meta.episode + 1)
  const prev = getEpisodes().find((e) => e.episode === ep.meta.episode - 1)

  return (
    <main>
      <Nav />
      <article className="px-5 sm:px-6 pt-28 sm:pt-40 pb-20 bg-paper">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/learn"
              className="font-body text-xs text-muted uppercase tracking-widest hover:text-ink transition-colors duration-200"
            >
              ← Learn With Ron
            </Link>
            <span className="block w-5 h-px bg-border" />
            <span className="font-body text-xs text-accent tracking-widest tabular-nums">
              EP {String(ep.meta.episode).padStart(3, '0')}
            </span>
            <span className="font-body text-xs text-muted/60">{ep.meta.date}</span>
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight text-ink mb-8">
            {ep.meta.question}
          </h1>

          <a
            href={ep.meta.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-border rounded-lg px-5 py-3 mb-12 group hover:border-ink transition-colors duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-body text-sm text-ink">Watch the full episode on YouTube</span>
            <span className="text-muted transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>

          <Prose content={ep.content} />

          <div className="mt-14 border-l-2 border-accent pl-6">
            <span className="font-body text-xs text-muted uppercase tracking-widest block mb-3">
              The verdict
            </span>
            <p className="font-heading text-xl md:text-2xl font-medium text-ink leading-snug">
              {ep.meta.verdict}
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row justify-between gap-6">
            {prev ? (
              <Link
                href={`/learn/${prev.slug}`}
                className="font-heading text-lg font-semibold text-ink hover:text-accent transition-colors duration-200"
              >
                ← Ep {String(prev.episode).padStart(3, '0')}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/learn/${next.slug}`}
                className="font-heading text-lg font-semibold text-ink hover:text-accent transition-colors duration-200"
              >
                Ep {String(next.episode).padStart(3, '0')} →
              </Link>
            ) : (
              <a
                href="https://www.youtube.com/@learn_withron"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-lg font-semibold text-ink hover:text-accent transition-colors duration-200"
              >
                Next episode drops on YouTube →
              </a>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
