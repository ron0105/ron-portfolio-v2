'use client'

import { useRef, type RefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import HeroVisual from './HeroVisual'

interface Props {
  heroRef: RefObject<HTMLElement | null>
}

export default function HeroScene({ heroRef }: Props) {
  /* Track scroll progress across the hero section */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  /* ── Face: visible at rest, fades + shrinks as user scrolls ── */
  const faceOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0])
  const faceScale   = useTransform(scrollYProgress, [0, 0.42], [1, 0.95])

  /* ── Dots: emerge as face fades, then dissolve ── */
  const dotsOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.52], [0, 0.85, 0])
  const dotsScale   = useTransform(scrollYProgress, [0.1, 0.5],        [1, 1.06])

  /* ── Rings: arrive last ── */
  const ringsOpacity = useTransform(scrollYProgress, [0.38, 0.68], [0, 1])

  return (
    <div className="relative w-full h-full">

      {/* ── Layer 1 (bottom): orbital rings ── */}
      <motion.div
        style={{ opacity: ringsOpacity }}
        className="absolute inset-0"
      >
        <HeroVisual />
      </motion.div>

      {/* ── Layer 2 (middle): dot-grid fragmentation ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: dotsOpacity,
          scale: dotsScale,
          backgroundImage:
            'radial-gradient(circle, rgba(13,13,13,0.22) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          maskImage:
            'radial-gradient(ellipse 85% 90% at 50% 42%, black 25%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 90% at 50% 42%, black 25%, transparent 100%)',
        }}
      />

      {/* ── Layer 3 (top): face ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: faceOpacity, scale: faceScale }}
      >
        {/* Mask softens the edges so the image bleeds into the background */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            maskImage:
              'radial-gradient(ellipse 80% 92% at 50% 40%, black 25%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 92% at 50% 40%, black 25%, transparent 100%)',
          }}
        >
          <Image
            src="/ron-portrait.png"
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 460px"
            className="object-cover object-top"
            style={{
              mixBlendMode: 'multiply',
            }}
            priority
          />
        </div>
      </motion.div>

    </div>
  )
}
