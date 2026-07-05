'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { EpisodeMeta } from '@/lib/content'

export default function EpisodeList({ episodes }: { episodes: EpisodeMeta[] }) {
  return (
    <section className="px-5 sm:px-6 pb-28 bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-border">
          {episodes.map((ep, index) => (
            <motion.div
              key={ep.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
              className="border-b border-border"
            >
              <Link href={`/learn/${ep.slug}`} className="block py-10 group cursor-pointer">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-body text-xs text-accent tracking-widest tabular-nums">
                        EP {String(ep.episode).padStart(3, '0')}
                      </span>
                      <span className="block w-5 h-px bg-border" />
                      <span className="font-body text-xs text-muted/50">{ep.date}</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-4xl font-semibold leading-snug text-ink group-hover:text-accent transition-colors duration-200">
                      {ep.question}
                    </h2>
                    <p className="font-body text-base text-muted leading-relaxed mt-3 max-w-2xl">
                      {ep.excerpt}
                    </p>
                  </div>
                  <span className="shrink-0 text-muted mt-10 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
