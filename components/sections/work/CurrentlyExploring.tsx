'use client'

import { motion } from 'framer-motion'

export default function CurrentlyExploring() {
  return (
    <section className="py-10 px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-body text-xs text-muted tracking-widest uppercase">
            Currently building:
          </span>
          <span className="font-body text-sm text-ink font-medium">
            The Adda Labs : a system for testing ideas before committing to them
          </span>
        </motion.div>
      </div>
    </section>
  )
}
