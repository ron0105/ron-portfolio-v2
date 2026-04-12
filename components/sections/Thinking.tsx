'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { thinking } from '@/lib/data'
import Link from 'next/link'

function ThinkingRow({
  post, index, isOpen, onToggle,
}: {
  post: (typeof thinking)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
    >
      {/* Header: always visible, strong hover */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group w-full text-left border-b border-border transition-colors duration-200 cursor-pointer"
        style={{ borderColor: isOpen ? 'rgba(13,13,13,0.2)' : '' }}
      >
        <div className="flex items-start justify-between gap-6 py-9 px-0">

          {/* Left content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-xs text-muted/50 uppercase tracking-widest shrink-0">
                {post.id}
              </span>
              {/* Accent line extends and colors on hover */}
              <motion.span
                className="block h-px bg-border"
                animate={{ width: isOpen ? 32 : 20, backgroundColor: isOpen ? '#FF4D00' : 'rgba(13,13,13,0.15)' }}
                whileHover={{ width: 32, backgroundColor: '#FF4D00' }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Title: moves right on hover, accent on open */}
            <motion.h3
              className="font-heading text-xl md:text-2xl font-semibold leading-snug mb-3"
              animate={{ x: isOpen ? 4 : 0, color: isOpen ? '#FF4D00' : '#0D0D0D' }}
              whileHover={{ x: 4, color: '#FF4D00' }}
              transition={{ duration: 0.2 }}
            >
              {post.title}
            </motion.h3>

            {/* Excerpt: fades out when open, beckons when closed */}
            <AnimatePresence initial={false}>
              {!isOpen && (
                <motion.p
                  key="excerpt"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-body text-sm text-muted leading-relaxed max-w-lg overflow-hidden"
                >
                  {post.excerpt}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Right: meta + toggle */}
          <div className="flex flex-col items-end gap-2 shrink-0 pt-8">
            <span className="font-body text-xs text-muted/50">{post.date}</span>
            <span className="font-body text-xs text-muted/50">{post.readTime}</span>

            {/* Plus / X: clearly sized, accent-colored when open */}
            <motion.div
              animate={{
                rotate: isOpen ? 45 : 0,
                color:  isOpen ? '#FF4D00' : 'rgba(13,13,13,0.4)',
              }}
              whileHover={{ color: '#FF4D00' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mt-3 font-body text-2xl leading-none inline-block"
            >
              +
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-0 pt-2 pb-12 space-y-4 max-w-2xl">
              {post.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="font-body text-base text-muted leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}

              {post.takeaway && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: post.paragraphs.length * 0.03 + 0.05 }}
                  className="mt-8 pl-5 border-l-2 border-accent"
                >
                  <p className="font-body text-sm font-medium text-ink leading-relaxed">
                    {post.takeaway}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Thinking() {
  const [openId, setOpenId] = useState<string | null>(null)
  const preview = thinking.slice(0, 3)
  const toggle  = (id: string) => setOpenId((p) => (p === id ? null : id))

  return (
    <section id="thinking" className="py-36 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
          className="mb-20"
        >
          <span className="font-body text-xs text-muted uppercase tracking-widest block mb-4">
            Think
          </span>
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-ink leading-none">
            How I think<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <div className="border-t border-border">
          {preview.map((post, i) => (
            <ThinkingRow
              key={post.id}
              post={post}
              index={i}
              isOpen={openId === post.id}
              onToggle={() => toggle(post.id)}
            />
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-3 font-body text-sm text-muted hover:text-ink transition-colors duration-200 group cursor-pointer"
          >
            Read all
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
