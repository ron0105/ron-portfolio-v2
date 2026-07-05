'use client'

import { motion } from 'framer-motion'

export default function LearnHero() {
  return (
    <section className="min-h-[55vh] flex flex-col justify-end px-5 sm:px-6 pt-28 sm:pt-40 pb-16 sm:pb-24 bg-paper">
      <div className="max-w-6xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-muted uppercase tracking-widest block mb-10"
        >
          Learn With Ron
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
          className="font-heading font-bold text-[clamp(3rem,9vw,8rem)] leading-[1.0] tracking-tight text-ink"
        >
          I test it live<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
          className="font-body text-xl md:text-2xl text-ink/60 max-w-2xl leading-relaxed mt-10"
        >
          Every episode starts with a real question, gets tested on a live stream, and ends with an honest verdict. What you see here is what actually happened — mistakes included.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          href="https://www.youtube.com/@learn_withron"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent transition-colors duration-200 mt-8"
        >
          <span className="w-4 h-px bg-current" />
          Watch live on YouTube
        </motion.a>
      </div>
    </section>
  )
}
