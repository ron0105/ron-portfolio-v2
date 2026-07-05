import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import Prose from '@/components/ui/Prose'
import { getNote, getNotes } from '@/lib/content'

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return {}
  return {
    title: `${note.meta.title} — Rohan Tiwarekar`,
    description: note.meta.excerpt,
  }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  const others = getNotes().filter((n) => n.slug !== slug)
  const next = others[0]

  return (
    <main>
      <Nav />
      <article className="px-5 sm:px-6 pt-28 sm:pt-40 pb-20 bg-paper">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/notes"
              className="font-body text-xs text-muted uppercase tracking-widest hover:text-ink transition-colors duration-200"
            >
              ← Notes
            </Link>
            <span className="block w-5 h-px bg-border" />
            <span className="font-body text-xs text-muted/60">{note.meta.date}</span>
            <span className="font-body text-xs text-muted/40">{note.meta.readTime}</span>
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight text-ink mb-12">
            {note.meta.title}
          </h1>

          <Prose content={note.content} />

          <div className="mt-14 border-l-2 border-accent pl-6">
            <span className="font-body text-xs text-muted uppercase tracking-widest block mb-3">
              Takeaway
            </span>
            <p className="font-heading text-xl md:text-2xl font-medium text-ink leading-snug">
              {note.meta.takeaway}
            </p>
          </div>

          {next && (
            <div className="mt-20 pt-10 border-t border-border">
              <span className="font-body text-xs text-muted uppercase tracking-widest block mb-4">
                Read next
              </span>
              <Link
                href={`/notes/${next.slug}`}
                className="font-heading text-2xl font-semibold text-ink hover:text-accent transition-colors duration-200"
              >
                {next.title} →
              </Link>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </main>
  )
}
