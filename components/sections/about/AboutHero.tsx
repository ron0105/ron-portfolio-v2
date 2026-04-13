'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

/*
  "organic → structured" interaction system
  ──────────────────────────────────────────
  Default: text is slightly loose + soft (letterSpacing 0.01em, opacity 0.92).
  On mouse entry: a spring settles everything into place : text tightens,
  sharpens, heading lifts slightly, accent dot pulses once, grid appears.
*/

export default function AboutHero() {
  const [isFocused, setIsFocused] = useState(false)

  const handleEnter = useCallback(() => setIsFocused(true), [])
  const handleLeave = useCallback(() => setIsFocused(false), [])

  const lockIn = { type: 'spring', stiffness: 120, damping: 18 } as const

  return (
    <section
      className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-end px-5 sm:px-6 pt-28 sm:pt-40 pb-16 sm:pb-24 bg-paper overflow-hidden"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Grid : structure emerging on interaction */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-full h-full"
          animate={{ opacity: isFocused ? 0.18 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-body text-xs text-muted uppercase tracking-widest block mb-10"
        >
          About
        </motion.span>

        {/* Heading : entrance wrapper separates from interactive state */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        >
          <motion.h1
            animate={{
              letterSpacing: isFocused ? '0em' : '0.01em',
              opacity: isFocused ? 1 : 0.92,
              filter: isFocused ? 'contrast(1.05)' : 'contrast(1)',
              scale: isFocused ? 1.01 : 1,
              y: isFocused ? -2 : 0,
            }}
            transition={lockIn}
            className="font-heading font-bold text-[clamp(3rem,9vw,8rem)] leading-[1.0] text-ink"
          >
            Hi, I&apos;m Rohan
            {/* Accent dot : pulses once on focus, anchors the heading */}
            <motion.span
              className="text-accent"
              animate={{ scale: isFocused ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.6 }}
            >
              .
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
        >
          <motion.p
            animate={{ opacity: isFocused ? 1 : 0.92 }}
            transition={lockIn}
            className="font-body text-xl md:text-2xl text-ink/60 max-w-2xl leading-relaxed mt-10"
          >
            I sit at the overlap of business, design, and technology.
            I begin where most wait. I start, and find the way.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
