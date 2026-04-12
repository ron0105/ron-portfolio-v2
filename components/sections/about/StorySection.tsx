'use client'

import { motion } from 'framer-motion'

const blocks = [
  {
    label: 'How I got here',
    content: [
      "I didn't start as a developer. I started as someone who kept having ideas and couldn't find anyone to build them.",
      "So I just started doing it myself. First design, then code, then figuring out how to make both feel so easy you don't even notice them.",
      "I've built apps, websites, and experiments. Most were just for me. A few actually worked. All of them taught me something.",
    ],
  },
  {
    label: 'How I think',
    content: [
      "I'd rather try something once than plan it for a month. I write things down, and I change my mind as soon as I learn something new.",
      "The best way to understand something is to build it. Even a messy version. Especially a messy version.",
      "I don't separate design from building. To me, how it looks and how it works are parts of the same conversation.",
    ],
  },
  {
    label: 'What drives me',
    content: [
      "I want to build things that feel like they should have existed all along. The kind of stuff that makes you think: why wasn't this already here?",
      "I'm drawn to problems that look simple but aren't. Most solutions add complexity; I'd rather remove it.",
      "I build in public because the process is just as interesting as the result, both for me and, hopefully, for you too.",
    ],
  },
]

export default function StorySection() {
  return (
    <section className="py-28 px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
          {blocks.map((block, blockIndex) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: blockIndex * 0.08, ease: 'easeOut' }}
            >
              <span className="font-body text-xs text-muted uppercase tracking-widest block mb-8">
                {block.label}
              </span>
              <div className="space-y-6">
                {block.content.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-base md:text-lg text-ink/75 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
