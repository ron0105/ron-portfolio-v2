'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { thinking } from '@/lib/data'

function PostEntry({
  post,
  index,
}: {
  post: (typeof thinking)[0]
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="border-b border-border"
    >
      {/* Collapsed row : always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left py-8 group cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-xs text-muted/50 uppercase tracking-widest">
                {post.id}
              </span>
              <span className="block w-5 h-px bg-border" />
              <span className="font-body text-xs text-muted/50">{post.date}</span>
              <span className="font-body text-xs text-muted/40">{post.readTime}</span>
            </div>
            <h2
              className={`font-heading text-2xl md:text-3xl font-semibold leading-snug transition-colors duration-200 ${
                open ? 'text-accent' : 'text-ink group-hover:text-accent'
              }`}
            >
              {post.title}
            </h2>
            {/* Preview excerpt : only when collapsed */}
            <AnimatePresence>
              {!open && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-body text-base text-muted leading-relaxed mt-2 max-w-xl"
                >
                  {post.excerpt}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Arrow */}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className={`shrink-0 mt-8 text-xl leading-none transition-colors duration-200 ${
              open ? 'text-accent' : 'text-muted group-hover:text-ink'
            }`}
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-10 max-w-xl">
              {/* Body paragraphs */}
              <div className="space-y-4 mb-8">
                {post.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-base md:text-lg text-ink/75 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Takeaway */}
              <div className="border-l-2 border-accent pl-5">
                <p className="font-body text-base md:text-lg text-ink font-medium leading-relaxed">
                  {post.takeaway}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PostList() {
  return (
    <section className="py-12 px-6 bg-paper border-t border-border">
      <div className="max-w-2xl mx-auto">
        <div className="border-t border-border">
          {thinking.map((post, i) => (
            <PostEntry key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
