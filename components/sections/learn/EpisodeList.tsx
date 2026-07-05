'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { EpisodeMeta } from '@/lib/content'

/*
  The journey line — episodes as a chronological timeline.
  Each episode is a node; the open question it left behind
  sits on the connector leading to the next one.
*/
export default function EpisodeList({
  episodes,
  upcoming,
}: {
  episodes: EpisodeMeta[]
  upcoming?: { text: string; href: string } | null
}) {
  const chronological = [...episodes].sort((a, b) => a.episode - b.episode)

  return (
    <section className="px-5 sm:px-6 pb-28 bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="relative pl-8 sm:pl-12">
          {/* The line */}
          <span
            aria-hidden="true"
            className="absolute left-[5px] sm:left-[7px] top-2 bottom-0 w-px bg-border"
          />

          {chronological.map((ep, index) => (
            <div key={ep.slug} className="relative">
              {/* Node dot */}
              <span
                aria-hidden="true"
                className="absolute -left-8 sm:-left-12 top-2 w-[11px] h-[11px] sm:w-[15px] sm:h-[15px] rounded-full bg-accent border-2 border-paper"
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
              >
                <Link href={`/learn/${ep.slug}`} className="block group pb-4">
                  <div className="flex items-center gap-3 mb-3">
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
                </Link>
              </motion.div>

              {/* Connector — the question this episode opened */}
              {ep.nextTease && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="py-10 flex items-center gap-4"
                >
                  <span className="font-body text-xs text-muted/50 uppercase tracking-widest shrink-0">
                    Which opened the question
                  </span>
                  <p className="font-heading text-base md:text-lg italic text-ink/50 leading-snug">
                    &ldquo;{ep.nextTease}&rdquo;
                  </p>
                </motion.div>
              )}
            </div>
          ))}

          {/* Ghost node — the upcoming episode */}
          {upcoming && (
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 sm:-left-12 top-2 w-[11px] h-[11px] sm:w-[15px] sm:h-[15px] rounded-full border-2 border-accent border-dashed bg-paper"
              />
              <motion.a
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                href="https://www.youtube.com/@learn_withron"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-body text-xs text-muted tracking-widest">UP NEXT</span>
                  <span className="block w-5 h-px bg-border" />
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold leading-snug text-ink/60 group-hover:text-accent transition-colors duration-200">
                  {upcoming.text}
                </h2>
                <p className="font-body text-sm text-muted mt-3">
                  Catch it live on YouTube →
                </p>
              </motion.a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
