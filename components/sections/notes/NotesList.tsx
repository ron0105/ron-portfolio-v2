'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { NoteMeta } from '@/lib/content'

export default function NotesList({ notes }: { notes: NoteMeta[] }) {
  return (
    <section className="px-5 sm:px-6 pb-28 bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-border">
          {notes.map((note, index) => (
            <motion.div
              key={note.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
              className="border-b border-border"
            >
              <Link href={`/notes/${note.slug}`} className="block py-8 group cursor-pointer">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-body text-xs text-muted/50">{note.date}</span>
                      <span className="block w-5 h-px bg-border" />
                      <span className="font-body text-xs text-muted/40">{note.readTime}</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold leading-snug text-ink group-hover:text-accent transition-colors duration-200">
                      {note.title}
                    </h2>
                    <p className="font-body text-base text-muted leading-relaxed mt-2 max-w-xl">
                      {note.excerpt}
                    </p>
                  </div>
                  <span className="shrink-0 text-muted mt-8 transition-transform duration-200 group-hover:translate-x-1">
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
