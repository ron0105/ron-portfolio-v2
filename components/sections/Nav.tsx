'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import AudioTrigger from '@/components/ui/AudioTrigger'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Learn', href: '/learn' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
  { label: 'Talk', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
            ? 'py-4 bg-paper/90 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : theme === 'dark'
              ? 'py-6 bg-paper backdrop-blur-md'
              : 'py-6 bg-paper/55 backdrop-blur-md'
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
            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="relative flex items-center justify-center w-4 h-4 text-muted/60 hover:text-ink transition-colors duration-300 cursor-pointer"
            >
              {theme === 'light' ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="7" y1="0.5" x2="7" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="12" x2="7" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13.5" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="2" y1="7" x2="0.5" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="11.3" y1="2.7" x2="10.24" y2="3.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3.76" y1="10.24" x2="2.7" y2="11.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="11.3" y1="11.3" x2="10.24" y2="10.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3.76" y1="3.76" x2="2.7" y2="2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 8.5A6 6 0 0 1 5.5 1.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <Link
              href="/contact"
              className="bg-ink text-paper text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 rounded-full hover:bg-accent transition-colors duration-300"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile: audio icon + menu — always visible on every page */}
          <div className="flex items-center gap-1 md:hidden">
            <AudioTrigger iconOnly />
            <button
              className="flex items-center justify-center min-h-[44px] min-w-[44px] font-body text-sm text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay — full-screen, includes audio + CTA */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-paper flex flex-col pt-24 px-6 pb-10 md:hidden overflow-y-auto"
          >
            {/* Nav links */}
            <ul className="flex flex-col gap-2 flex-1">
              {links.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-heading text-4xl font-semibold transition-colors duration-200 block py-3 ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            {/* Bottom section: audio + CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-10 pt-8 border-t border-border flex flex-col gap-5"
            >
              <AudioTrigger className="text-sm" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-ink text-paper text-sm font-bold tracking-widest uppercase px-6 py-4 hover:bg-accent transition-colors duration-300 w-full"
              >
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
