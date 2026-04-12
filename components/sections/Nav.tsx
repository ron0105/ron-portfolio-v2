'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AudioTrigger from '@/components/ui/AudioTrigger'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Thinking', href: '/thinking' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-paper/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'py-6 bg-paper/10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-black text-xs tracking-[0.3em] uppercase text-ink hover:text-accent transition-all duration-300 shrink-0"
          >
            ROH<span className="text-accent">A</span>N
          </Link>

          {/* Desktop nav: centered to avoid hair overlap on right */}
          <ul className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`font-body text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative group cursor-pointer ${
                      isActive ? 'text-ink font-bold' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:flex items-center gap-8">
            <AudioTrigger />
            <Link
              href="/contact"
              className="bg-ink text-paper text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 rounded-full hover:bg-accent transition-colors duration-300"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden font-body text-sm text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-paper pt-24 px-6 md:hidden"
        >
          <ul className="flex flex-col gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`font-heading text-4xl font-semibold transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-accent' : 'text-ink hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </motion.div>
      )}
    </>
  )
}
