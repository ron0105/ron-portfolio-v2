'use client'

import { motion } from 'framer-motion'

const paragraphs = [
  {
    text: 'Most people wait until they know enough to start.',
    style: 'large-light',
  },
  {
    text: 'I start to find out what I know.',
    style: 'large-accent',
  },
  {
    text: "There's a difference between making something look good and making something that actually works. I care about the second one.",
    style: 'medium-muted',
  },
  {
    text: 'The most interesting work lives at the edges — where a technical problem becomes a design choice, where a simple question turns into a product.',
    style: 'medium-muted',
  },
  {
    text: 'That is where I work.',
    style: 'medium-light',
  },
]

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
}

const styleMap: Record<string, string> = {
  'large-light':
    'font-heading text-3xl md:text-5xl font-light text-paper/75 leading-snug',
  'large-accent':
    'font-heading text-4xl md:text-6xl font-bold text-accent leading-snug',
  'medium-muted':
    'font-body text-xl md:text-2xl font-normal text-paper/50 leading-relaxed max-w-2xl',
  'medium-light':
    'font-heading text-2xl md:text-4xl font-semibold text-paper leading-snug',
}

export default function Manifesto() {
  return (
    <section className="bg-ink py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-paper/25 uppercase tracking-widest block mb-20"
        >
          Believe
        </motion.span>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
          className="space-y-12"
        >
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              variants={lineVariants}
              className={styleMap[para.style]}
            >
              {para.text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
