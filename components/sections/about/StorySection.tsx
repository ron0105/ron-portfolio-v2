'use client'

import { motion } from 'framer-motion'

const blocks = [
  {
    label: 'How I got here',
    content: [
      "I didn't start as a developer. I started as someone who kept having ideas and couldn't find anyone to build them — so I learned to build them myself.",
      "That became The Adda Labs: a Mumbai-based studio where I test AI-powered products and workflows with real clients before turning them into something bigger.",
      "AI didn't change what I do — it changed how fast I do it. The ideas still have to be good. The judgment still has to be mine.",
    ],
  },
  {
    label: 'How I think',
    content: [
      "I'd rather try something once than plan it for a month. I write things down, change my mind fast, and start before I'm ready.",
      "The best way to understand AI is to use it on real problems — not in demos. I run it live, in front of clients, in front of a camera.",
      "Design and building are the same conversation. If it looks broken, it probably is. If it feels right, it usually works.",
    ],
  },
  {
    label: 'What drives me',
    content: [
      "I want to build things that feel like they should have existed already. The kind of product that makes you ask: why wasn't this here before?",
      "I'm most interested in Indian founders and small businesses — they have real problems, real urgency, and almost no good AI tooling built for their context.",
      "Learn With Ron is where I document this: live AI sessions, real mistakes, honest takes on what actually works vs. what just sounds good on LinkedIn.",
    ],
  },
]

export default function StorySection() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
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
