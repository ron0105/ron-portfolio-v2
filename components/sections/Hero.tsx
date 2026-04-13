'use client'

import { useRef, useEffect, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import AudioTrigger from '@/components/ui/AudioTrigger'

const ShaderCanvas = dynamic(() => import('@/components/ui/ShaderCanvas'), {
  ssr: false,
})

interface Ripple {
  id: number
  x: number
  y: number
}

const headingLines = ["I build", "things that", "feel real."]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const rippleId = useRef(0)

  /* Boolean state drives letter-spacing spring on heading */
  const [isFocused, setIsFocused] = useState(false)

  /* Focus refs: no React re-renders, read by ShaderCanvas each RAF */
  const hoverFocusRef  = useRef(0)   // 0 or 1 from hover
  const scrollFocusRef = useRef(0)   // 0 to 1 from scroll
  const shaderFocusRef = useRef(0)   // max(hover, scroll) to ShaderCanvas
  


  /* Hover handlers: update shader + grid spring + boolean state */
  const hoverGrid = useSpring(0, { damping: 28, stiffness: 80 })

  const handleHoverStart = useCallback(() => {
    setIsFocused(true)
    hoverFocusRef.current = 1
    shaderFocusRef.current = Math.max(scrollFocusRef.current, 1)
    hoverGrid.set(0.18)
  }, [hoverGrid])

  const handleHoverEnd = useCallback(() => {
    setIsFocused(false)
    hoverFocusRef.current = 0
    shaderFocusRef.current = scrollFocusRef.current
    hoverGrid.set(0)
  }, [hoverGrid])

  /* ── Face + heading parallax ── */
  const rawPX = useMotionValue(0)
  const rawPY = useMotionValue(0)
  const px = useSpring(rawPX, { damping: 44, stiffness: 88, mass: 0.8 })
  const py = useSpring(rawPY, { damping: 44, stiffness: 88, mass: 0.8 })

  const headingX = useTransform(px, (v) => v * -0.12)

  /* Face parallax : smaller coefficient: slow, heavy, barely drifts */
  const faceX = useTransform(px, (v) => v * 0.22)
  const faceY = useTransform(py, (v) => v * 0.15)

  /* Y: parallax opposite to face + magnitude-based lift (0 → -4px) */
  const headingCombinedY = useTransform(
    [px, py] as MotionValue<number>[],
    ([x, y]: number[]) => {
      const mag = Math.sqrt(x * x + y * y)
      return -(Math.min(mag, 17) / 17) * 4 + (y as number) * -0.08
    },
  )

  /* Mouse-magnitude scale: 1 → 1.01 */
  const headingMouseScale = useTransform(
    [px, py] as MotionValue<number>[],
    ([x, y]: number[]) => 1 + (Math.min(Math.sqrt(x * x + y * y), 17) / 17) * 0.01,
  )

  /* ── Scroll ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  /* Face fades + scales down as page scrolls */
  const scrollFade  = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const scrollScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96])

  /* Scroll → shader focus (Thought → Structure → Reality)
     Ramp starts at 15%, fully focused by 75% of hero scroll */
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const sf = v < 0.15 ? 0 : Math.min((v - 0.15) / 0.60, 1)
    scrollFocusRef.current = sf
    shaderFocusRef.current = Math.max(sf, hoverFocusRef.current)
  })

  /* Heading: scroll gives it slightly more weight (grounded) */
  const headingScrollScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.02])

  /* Combined heading scale: mouse × scroll */
  const headingScale = useTransform(
    [headingMouseScale, headingScrollScale] as MotionValue<number>[],
    ([ms, ss]: number[]) => (ms as number) * (ss as number),
  )

  /* Heading filter: contrast increases subtly with scroll */
  const headingFilter = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['contrast(1)', 'contrast(1.05)'],
  )

  /* Grid overlay: scroll + hover combined (capped at 0.18 for subtle structure) */
  const scrollGrid = useTransform(scrollYProgress, [0.10, 0.60], [0, 0.18])

  /* Take the higher of scroll-driven and hover-driven opacity */
  const gridOpacity = useTransform(
    [scrollGrid, hoverGrid] as MotionValue<number>[],
    ([sg, hg]: number[]) => Math.min(Math.max(sg as number, hg as number), 1),
  )

  /* ── Mouse event listeners ── */
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rawPX.set(((e.clientX - cx) / cx) * 14)
      rawPY.set(((e.clientY - cy) / cy) * 10)
    }
    const onLeave = () => {
      rawPX.set(0)
      rawPY.set(0)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [rawPX, rawPY])

  /* ── Click ripple ── */
  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = rippleId.current++
    setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 1100)
  }, [])

  return (
    <section
      ref={heroRef}
      onClick={handleClick}
      className="relative overflow-hidden min-h-screen flex flex-col bg-paper"
    >

      {/* ── 1: Shader : organic flowing background ── */}
      <div className="absolute inset-0">
        <ShaderCanvas className="w-full h-full" focusRef={shaderFocusRef} />
      </div>

      {/* ── 3: Vignette : edges pull focus inward ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 88% 88% at 48% 46%, transparent 42%, rgba(13,13,13,0.11) 100%)',
        }}
      />

      {/* 4: Grid: structure emerging via scroll + hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage:
            'linear-gradient(to right, black 0%, black 52%, transparent 78%)',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 52%, transparent 78%)',
        }}
      />

      {/* 5a: Face — desktop: right half, side-dissolve */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[52%] hidden md:block pointer-events-none"
        style={{
          opacity: scrollFade,
          maskImage: 'linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to bottom, black 70%, transparent 95%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <motion.div className="absolute inset-0" style={{ x: faceX, y: faceY }}>
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isFocused ? 1 : 0.9,
              scale: isFocused ? 1.02 : 1,
              x: isFocused ? -6 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/roro.png"
              alt=""
              fill
              sizes="(max-width: 768px) 0px, 52vw"
              className="object-cover"
              style={{
                objectPosition: '50% 12%',
                filter: 'contrast(1.08) brightness(0.95)',
              }}
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 5b: Face — mobile: starts BELOW nav so hair is fully visible */}
      <motion.div
        className="absolute left-0 right-0 block md:hidden pointer-events-none"
        style={{ top: '4rem', height: '76vh', opacity: scrollFade, zIndex: 1 }}
      >
        <Image
          src="/roro.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: '50% 2%',
            filter: 'contrast(1.06) brightness(0.94)',
          }}
          priority
        />
        {/* Bottom dissolve: hair fully visible at top, clean paper before text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(247,246,243,0.2) 52%, rgba(247,246,243,0.7) 62%, rgba(247,246,243,0.95) 70%, #F7F6F3 76%)',
          }}
        />
      </motion.div>

      {/* ── 6: Click ripples ── */}
      {ripples.map((rp) => (
        <motion.div
          key={rp.id}
          className="fixed pointer-events-none z-20 rounded-full"
          style={{
            left: rp.x,
            top: rp.y,
            x: '-50%',
            y: '-50%',
            border: '1.5px solid rgba(13,13,13,0.18)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.9 }}
          animate={{ width: 380, height: 380, opacity: 0 }}
          transition={{
            duration: 1.05,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        />
      ))}

      {/* ── 7: Content ── */}
      <div className="relative z-30 flex flex-col min-h-screen px-5 sm:px-6 pt-[52vh] sm:pt-28 pb-24 sm:pb-32">

        <div className="max-w-6xl mx-auto w-full flex-1 flex items-center sm:items-center">
          <div className="flex flex-col justify-center w-full max-w-xl">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2.5 mb-8 sm:mb-14"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-body text-[10px] sm:text-xs text-muted tracking-widest uppercase">
                Currently building: The Adda Labs
              </span>
            </motion.div>

            {/* Heading : parallax + lift + scroll scale + scroll filter */}
            <motion.div
              className="mb-10"
              style={{
                x: headingX,
                y: headingCombinedY,
                scale: headingScale,
                filter: headingFilter,
              }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              {headingLines.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, ease: 'easeOut', delay: i * 0.09 }}
                >
                    <motion.h1
                      animate={{
                        letterSpacing: isFocused ? '-0.01em' : '0em',
                        opacity: isFocused ? 1 : 0.94,
                        filter: isFocused ? 'contrast(1.05)' : 'contrast(1)',
                        scale: isFocused ? 1.01 : 1,
                        y: isFocused ? -2 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      className="font-heading font-bold text-[clamp(2.8rem,10vw,6.5rem)] leading-[1.02] tracking-tight text-ink"
                    >
                    {line}
                  </motion.h1>
                </motion.div>
              ))}
            </motion.div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.32 }}
            >
              <motion.p
                animate={{ opacity: isFocused ? 1 : 0.92 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="font-body text-base sm:text-lg md:text-xl text-ink/60 max-w-sm leading-relaxed mb-8 sm:mb-10"
              >
                I test ideas, keep what works, and build what's next.
              </motion.p>
            </motion.div>

            {/* CTAs : also trigger the focus state */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.44 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <Link
                href="/work"
                className="inline-flex items-center gap-2 bg-ink text-paper font-body text-sm font-medium px-6 py-3.5 sm:px-7 sm:py-4 hover:bg-accent transition-colors duration-200"
              >
                See the work →
              </Link>
              <Link
                href="/about"
                className="font-body text-sm text-muted hover:text-ink transition-colors duration-200"
              >
                About me
              </Link>
            </motion.div>

            {/* Audio experience trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-8"
            >
              <AudioTrigger className="py-2" />
            </motion.div>

          </div>
        </div>

        {/* Scroll cue: centered and fixed at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-body text-[10px] text-muted/40 tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-bottom from-accent/40 to-transparent"
          />
        </motion.div>
      </div>


      {/* Shader bottom bleed : dissolves organic texture into page, not a visible gradient band */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '40vh',
          background: 'linear-gradient(to bottom, transparent 0%, #F7F6F3 40%, #F7F6F3 100%)',
        }}
      />

    </section>
  )
}
