'use client'

import { motion } from 'framer-motion'

const ways = [
  {
    label: 'Email',
    value: 'rohan0105@gmail.com',
    href: 'mailto:rohan0105@gmail.com',
    note: 'Best for longer conversations',
  },
  {
    label: 'GitHub',
    value: 'github.com/ron0105',
    href: 'https://github.com/ron0105',
    note: 'See what I build',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ronnnn',
    href: 'https://www.linkedin.com/in/ronnnn/',
    note: 'If you prefer it formal',
  },
]

export default function ContactHero() {
  return (
    <section className="flex flex-col px-5 sm:px-6 pt-28 sm:pt-40 pb-16 sm:pb-28 bg-paper">
      <div className="max-w-6xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-muted uppercase tracking-widest block mb-10"
        >
          Say hi
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
          className="font-heading font-bold text-[clamp(3rem,9vw,8rem)] leading-[1.0] tracking-tight text-ink mb-12"
        >
          Let&apos;s talk<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-ink/60 max-w-2xl leading-relaxed mb-14 sm:mb-24"
        >
          Whether you have an idea, want to work together, or just want to think
          out loud. I read everything and reply to most things.
        </motion.p>

        {/* Contact options */}
        <div className="border-t border-border">
          {ways.map((way, i) => (
            <motion.a
              key={way.label}
              href={way.href}
              target={way.href.startsWith('http') ? '_blank' : undefined}
              rel={way.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
              className="group flex items-center justify-between border-b border-border py-7 sm:py-10 hover:pl-3 transition-all duration-200 cursor-pointer"
            >
              <div>
                <span className="font-body text-xs text-muted uppercase tracking-widest block mb-2">
                  {way.label}
                </span>
                <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-ink group-hover:text-accent transition-colors duration-200 break-all sm:break-normal">
                  {way.value}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-body text-sm text-muted hidden md:block">
                  {way.note}
                </span>
                <span className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 inline-block">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
