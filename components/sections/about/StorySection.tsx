'use client'

import { motion } from 'framer-motion'

const blocks = [
  {
    label: 'How I got here',
    content: [
      "I didn't start as a developer. I started as someone who kept having ideas and couldn't find anyone to build them.",
      "So I figured it out myself. First design. Then code. Then how to put both together in a way that felt obvious once you saw it.",
      "I've built apps, websites, tools, and experiments. Most of them for myself. A few worked. All of them taught me something.",
    ],
  },
  {
    label: 'How I think',
    content: [
      "I try things instead of planning forever. I write things down. I change my mind when I learn something new — which is often.",
      "The best way to understand something is to build a version of it. Even a bad version. Especially a bad version.",
      "I don't separate design from building. To me, choosing how something looks is the same act as choosing how it works.",
    ],
  },
  {
    label: 'What drives me',
    content: [
      "I want to build things that feel like they should already exist. Stuff that makes people think: why didn't someone make this sooner?",
      "I'm drawn to problems that look simple but aren't. The kind where most solutions add complexity instead of removing it.",
      "I build in public because the learning is as useful as the result — for me, and hopefully for someone else too.",
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
