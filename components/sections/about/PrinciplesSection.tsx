'use client'

import { motion } from 'framer-motion'

const principles = [
  { id: '01', text: 'Build to learn, not just to finish.' },
  { id: '02', text: 'Clear is better than clever.' },
  { id: '03', text: 'Make something real before making it perfect.' },
  { id: '04', text: "If you can't explain it simply, you don't understand it yet." },
  { id: '05', text: 'The work teaches you more than any plan.' },
  { id: '06', text: "Say no to most things. Yes means something." },
]

export default function PrinciplesSection() {
  return (
    <section className="py-28 px-6 bg-ink">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-paper/25 uppercase tracking-widest block mb-20"
        >
          What I believe
        </motion.span>

        <div className="border-t border-paper/10">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
              className="group flex items-center gap-8 border-b border-paper/10 py-8 hover:pl-3 transition-all duration-200 cursor-default"
            >
              <span className="font-body text-xs text-paper/20 tracking-widest shrink-0 w-6">
                {p.id}
              </span>
              <p className="font-heading text-2xl md:text-3xl font-medium text-paper/70 group-hover:text-paper transition-colors duration-200 leading-snug">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
