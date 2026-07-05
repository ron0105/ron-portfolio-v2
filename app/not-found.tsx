import Link from 'next/link'
import Nav from '@/components/sections/Nav'

export default function NotFound() {
  return (
    <main>
      <Nav />
      <section className="min-h-screen flex flex-col justify-center px-5 sm:px-6 bg-paper">
        <div className="max-w-6xl mx-auto w-full">
          <span className="font-body text-xs text-muted uppercase tracking-widest block mb-10">
            404
          </span>
          <h1 className="font-heading font-bold text-[clamp(3rem,9vw,8rem)] leading-[1.0] tracking-tight text-ink">
            Nothing here<span className="text-accent">.</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-ink/60 max-w-2xl leading-relaxed mt-10">
            This page doesn&apos;t exist. Unlike my cat&apos;s opinion of me — that one is very real and mostly unfavourable.
          </p>
          <div className="flex items-center gap-8 mt-12">
            <Link
              href="/"
              className="font-body text-sm text-ink border border-border rounded-lg px-6 py-3 hover:border-ink transition-colors duration-200"
            >
              Back home
            </Link>
            <Link
              href="/learn"
              className="font-body text-sm text-muted hover:text-ink transition-colors duration-200"
            >
              Or watch me test things live →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
