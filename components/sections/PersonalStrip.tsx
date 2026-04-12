'use client'

import { motion } from 'framer-motion'

export default function PersonalStrip() {
  return (
    <section className="py-28 px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="font-body text-xs text-muted uppercase tracking-widest mb-8"
          >
            A bit about me
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-4 mb-12"
          >
            <p className="font-heading text-3xl md:text-4xl font-bold text-ink leading-snug">
              Hi, I&apos;m Rohan.
            </p>
            <p className="font-body text-lg md:text-xl text-muted leading-relaxed">
              I like building things before they make sense.
            </p>
            <p className="font-body text-base md:text-lg text-muted/80 leading-relaxed max-w-lg">
              Most of my work starts as an idea and ends as a real experiment.
              I take initiative. I build and learn in the open.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#experiments"
              className="inline-flex items-center gap-2 bg-accent text-paper font-body text-sm font-medium px-6 py-3 hover:bg-ink transition-colors duration-200"
            >
              See what I&apos;m building
              <span className="text-paper/70">→</span>
            </a>
            <a
              href="mailto:rohan0105@gmail.com"
              className="inline-flex items-center gap-2 border border-ink text-ink font-body text-sm font-medium px-6 py-3 hover:bg-ink hover:text-paper transition-colors duration-200"
            >
              Work with me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
