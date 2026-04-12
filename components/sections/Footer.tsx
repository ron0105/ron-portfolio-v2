'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const socials = [
  { label: 'Twitter', href: 'https://x.com/buildwithron' },
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronnnn/' },
  { label: 'Email', href: 'mailto:rohan0105@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="bg-ink py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-16"
        >
          {/* CTA */}
          <div>
            <Link href="/contact">
              <p className="font-heading text-5xl md:text-7xl font-bold text-paper mb-4 leading-none hover:text-accent transition-colors duration-200 cursor-pointer">
                Let&apos;s talk<span className="text-accent">.</span>
              </p>
            </Link>
            <p className="font-body text-base text-paper/40 max-w-sm leading-relaxed">
              Whether you have an idea or just want to think out loud, my inbox is open.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Social links">
            <ul className="flex flex-col gap-4">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-body text-sm text-paper/30 hover:text-paper transition-colors duration-200 flex items-center gap-3 group cursor-pointer"
                  >
                    <span className="w-4 h-px bg-paper/20 group-hover:bg-paper/60 group-hover:w-6 transition-all duration-200" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-paper/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-heading font-bold text-paper/20 text-sm tracking-[0.2em] uppercase">
            Rohan
          </span>
          <span className="font-body text-xs text-paper/20">
            Built in public. &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
