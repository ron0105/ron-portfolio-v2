'use client'

import { motion } from 'framer-motion'

export default function ThinkingHero() {
  return (
    <section className="min-h-[65vh] flex flex-col justify-end px-6 pt-40 pb-24 bg-paper">
      <div className="max-w-6xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-muted uppercase tracking-widest block mb-10"
        >
          Notes &amp; ideas
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
          className="font-heading font-bold text-[clamp(3rem,9vw,8rem)] leading-[1.0] tracking-tight text-ink"
        >
          How I think<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
          className="font-body text-xl md:text-2xl text-ink/60 max-w-2xl leading-relaxed mt-10"
        >
          How I build, what I get wrong, and what I figure out along the way. Not advice. Just notes.
        </motion.p>
      </div>
    </section>
  )
}
