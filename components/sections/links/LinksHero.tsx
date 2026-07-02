'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const links = [
  {
    label: 'YouTube',
    handle: 'Learn With Ron',
    note: 'Live AI experiments, real builds',
    href: 'https://www.youtube.com/@learn_withron',
    primary: true,
  },
  {
    label: 'X',
    handle: '@build_withron',
    note: 'Quick thoughts, threads, hot takes',
    href: 'https://x.com/build_withron',
    primary: false,
  },
  {
    label: 'Instagram',
    handle: '@oldmonkpaapi',
    note: 'Life, chaos, the fun stuff',
    href: 'https://www.instagram.com/oldmonkpaapi/',
    primary: false,
  },
  {
    label: 'LinkedIn',
    handle: 'in/ronnnn',
    note: 'Founder notes, longer writing',
    href: 'https://www.linkedin.com/in/ronnnn/',
    primary: false,
  },
  {
    label: 'The Adda Labs',
    handle: 'My studio',
    note: 'AI consulting for real businesses',
    href: '/work',
    primary: false,
  },
  {
    label: 'Email',
    handle: 'rohan0105@gmail.com',
    note: 'For longer conversations',
    href: 'mailto:rohan0105@gmail.com',
    primary: false,
  },
]

export default function LinksHero() {
  return (
    <section className="min-h-screen flex flex-col px-5 sm:px-6 pt-28 sm:pt-36 pb-16 bg-paper">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-ink leading-tight">
            Rohan Tiwarekar<span className="text-accent">.</span>
          </h1>
          <p className="font-body text-base text-muted mt-4 leading-relaxed">
            Founder · Builder · Cat dad · Mumbai. Building a company with AI and filming the mistakes.
          </p>
        </motion.div>

        {/* Links */}
        <ul className="flex flex-col gap-3">
          {links.map((link, i) => {
            const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto')
            const inner = (
              <div
                className={`group flex items-center justify-between gap-4 border rounded-lg px-6 py-5 transition-all duration-200 cursor-pointer ${
                  link.primary
                    ? 'bg-ink border-ink hover:bg-accent hover:border-accent always-dark'
                    : 'bg-paper border-border hover:border-ink'
                }`}
              >
                <div>
                  <span
                    className={`font-heading font-semibold text-lg block ${
                      link.primary ? 'text-paper' : 'text-ink'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`font-body font-normal text-sm ml-3 ${
                        link.primary ? 'text-paper/60' : 'text-muted'
                      }`}
                    >
                      {link.handle}
                    </span>
                  </span>
                  <span
                    className={`font-body text-sm block mt-1 ${
                      link.primary ? 'text-paper/50' : 'text-muted/80'
                    }`}
                  >
                    {link.note}
                  </span>
                </div>
                <span
                  className={`shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                    link.primary ? 'text-paper/60' : 'text-muted'
                  }`}
                >
                  →
                </span>
              </div>
            )

            return (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
              >
                {isExternal ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link href={link.href}>{inner}</Link>
                )}
              </motion.li>
            )
          })}
        </ul>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="font-body text-xs text-muted/60 text-center mt-12"
        >
          <Link href="/" className="hover:text-ink transition-colors duration-200">
            buildwithron.com
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
