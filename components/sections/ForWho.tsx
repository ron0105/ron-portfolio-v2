'use client'

import { motion } from 'framer-motion'

const items = [
  {
    id: '01',
    text: "You have an idea you can't let go of.",
    sub: "But it's still just an idea.",
  },
  {
    id: '02',
    text: 'You care more about making it real than making it perfect.',
    sub: 'First version beats no version.',
  },
  {
    id: '03',
    text: "You think most 'solutions' are too complicated.",
    sub: 'Simple things done well beat clever things done poorly.',
  },
]

export default function ForWho() {
  return (
    <section className="py-28 px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-muted uppercase tracking-widest mb-12"
        >
          You&apos;re in the right place if
        </motion.p>

        <div className="border-t border-border">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
              className="group border-b border-border py-8 md:py-10 hover:pl-2 transition-all duration-200 cursor-default"
            >
              <div className="flex items-start gap-8">
                <span className="font-body text-xs text-muted/40 tracking-widest shrink-0 w-6 pt-1.5">
                  {item.id}
                </span>
                <div>
                  <p className="font-heading text-2xl md:text-[2rem] font-semibold text-ink leading-snug group-hover:text-accent transition-colors duration-200 mb-2">
                    {item.text}
                  </p>
                  <p className="font-body text-base text-muted">
                    {item.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
