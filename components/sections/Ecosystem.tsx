'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  AnimatePresence,
} from 'framer-motion'
import Link from 'next/link'
import { experiments } from '@/lib/data'

/* ─────────────────────────────────────────────
   Config
───────────────────────────────────────────── */
const RADIUS  = 195   // orbit radius px
const SIZE    = 540   // container px
const SPEED   = 4.5   // degrees / second : slow, premium
const D2R     = Math.PI / 180

const SHORT: Record<string, string> = {
  '01': 'Labs',
  '02': 'TAL VI',
  '03': 'Shutter',
  '04': 'TPC',
  '05': 'BTF',
}
const DOT_COLOR: Record<string, string> = {
  active:    '#FF4D00',
  exploring: '#FBBF24',
  shipped:   '#10B981',
}

type Exp = (typeof experiments)[0]

/* ─────────────────────────────────────────────
   OrbitalNode : 44px clickable circle
   Position derived from globalAngle MotionValue
   → zero React re-renders per frame
───────────────────────────────────────────── */
function OrbitalNode({
  data, baseAngle, globalAngle,
  isHovered, isActive, anyHovering,
  onEnter, onLeave, onClick,
}: {
  data: Exp; baseAngle: number
  globalAngle: ReturnType<typeof useMotionValue<number>>
  isHovered: boolean; isActive: boolean; anyHovering: boolean
  onEnter: () => void; onLeave: () => void; onClick: () => void
}) {
  const base = baseAngle

  const x = useTransform(globalAngle, (a) =>
    Math.cos((base + a) * D2R) * RADIUS)
  const y = useTransform(globalAngle, (a) =>
    Math.sin((base + a) * D2R) * RADIUS)

  /* 3D depth illusion : from 21st.dev Radial Orbital Timeline
     sin = 1 at bottom (front) → full opacity
     sin = -1 at top  (back)  → 40% opacity */
  const depth = useTransform(globalAngle, (a) =>
    0.40 + 0.60 * ((1 + Math.sin((base + a) * D2R)) / 2))
  const zIdx  = useTransform(globalAngle, (a) =>
    Math.round(20 + 40 * ((1 + Math.sin((base + a) * D2R)) / 2)))

  /* Visible scale based on state */
  const nodeScale = isHovered ? 1.18 : isActive && !anyHovering ? 1.06 : 1

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: '50%', top: '50%', x, y, zIndex: zIdx }}
      /* Hover override: hovered=full, others=clearly dimmed */
      animate={{ opacity: anyHovering ? (isHovered ? 1 : 0.12) : 1 }}
      transition={{ duration: 0.22 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        /* depth opacity when nothing is hovered */
        style={{ opacity: anyHovering ? 1 : depth }}
      >

        {/* ── Node circle : 44×44 ── */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width:  nodeScale * 44,
            height: nodeScale * 44,
          }}
          style={{ minWidth: 44, minHeight: 44 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            animate={{
              borderColor: isHovered
                ? DOT_COLOR[data.status]
                : isActive && !anyHovering
                ? 'rgba(13,13,13,0.35)'
                : 'rgba(13,13,13,0.15)',
              backgroundColor: isHovered
                ? DOT_COLOR[data.status] + '18'
                : isActive && !anyHovering
                ? 'rgba(13,13,13,0.06)'
                : 'rgba(247,246,243,0.8)',
            }}
            transition={{ duration: 0.22 }}
          />

          {/* Status dot : top-right corner */}
          <div
            className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full border border-paper"
            style={{ backgroundColor: DOT_COLOR[data.status] }}
          />

          {/* Short label inside circle */}
          <motion.span
            className="font-body font-medium relative z-10 select-none"
            animate={{
              fontSize: nodeScale >= 1.18 ? '10px' : '9px',
              color: isHovered ? DOT_COLOR[data.status] : 'rgba(13,13,13,0.65)',
            }}
            transition={{ duration: 0.22 }}
          >
            {SHORT[data.id]}
          </motion.span>

          {/* Active pulse ring */}
          <AnimatePresence>
            {isActive && !anyHovering && (
              <motion.div
                key="pulse"
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${DOT_COLOR[data.status]}` }}
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Project name : always visible below node ── */}
        <motion.span
          className="font-body uppercase tracking-widest whitespace-nowrap pointer-events-none select-none"
          animate={{
            opacity: isHovered ? 1 : isActive && !anyHovering ? 0.65 : 0.38,
            fontSize: isHovered ? '9px' : '8px',
            color:    isHovered ? DOT_COLOR[data.status] : '#0D0D0D',
          }}
          transition={{ duration: 0.22 }}
        >
          {data.title}
        </motion.span>

      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Ecosystem section
───────────────────────────────────────────── */
/* Stable base angles : computed once from experiments array order.
   Both OrbitalNode positioning AND onSelect rotation use this same source. */
const BASE_ANGLES: Record<string, number> = Object.fromEntries(
  experiments.map((exp, i) => [exp.id, (i / experiments.length) * 360])
)

export default function Ecosystem() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeId,  setActiveId]  = useState('01')

  const anyHovering = hoveredId !== null
  const displayId   = hoveredId ?? activeId
  const displayData = experiments.find((e) => e.id === displayId) ?? null

  /* Single angle drives all nodes : zero re-renders during orbit */
  const globalAngle  = useMotionValue(0)
  const targetAngle  = useRef(0)

  useAnimationFrame((_, delta) => {
    if (anyHovering) return
    const cur  = globalAngle.get()
    const snap = targetAngle.current - cur
    /* Spring snap to target (after click), then keep orbiting */
    const v = Math.abs(snap) > 0.5 ? snap * 0.10 : 0
    const next = cur + v + (SPEED * delta) / 1000
    globalAngle.set(next)
    targetAngle.current += (SPEED * delta) / 1000
  })

  /* Click: bring node to front (bottom = 90°) */
  const onSelect = useCallback((id: string) => {
    setActiveId(id)
    setHoveredId(null)
    const base   = BASE_ANGLES[id]
    const cur    = globalAngle.get()
    const needed = 90 - base
    targetAngle.current = needed + Math.round((cur - needed) / 360) * 360
    console.log('[Ecosystem] click →', id, '| baseAngle:', base, '| displayData.id will be:', id)
  }, [globalAngle])

  const onEnter = useCallback((id: string) => {
    setHoveredId(id)
    console.log('[Ecosystem] hover →', id, '| title:', experiments.find(e => e.id === id)?.title)
  }, [])
  const onLeave = useCallback(() => setHoveredId(null), [])

  return (
    <section className="py-36 px-6 bg-paper border-t border-border">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
          className="mb-20"
        >
          <span className="font-body text-xs text-muted uppercase tracking-widest block mb-4">
            System
          </span>
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-ink leading-none">
            My ecosystem<span className="text-accent">.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center"
        >

          <p className="font-body text-[10px] text-muted/40 uppercase tracking-widest mb-8">
            Hover to explore · Click to focus
          </p>

          {/* ── Orbital canvas ── */}
          <div
            className="relative select-none"
            style={{ width: SIZE, height: SIZE }}
          >
            {/* Orbit path ring */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <circle
                cx="50%" cy="50%" r={RADIUS}
                fill="none"
                stroke="rgba(13,13,13,0.08)"
                strokeWidth="1"
                strokeDasharray="5 12"
              />
            </svg>

            {/* Center anchor */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-full border border-ink/12 bg-paper flex flex-col items-center justify-center gap-1"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-ink/70" />
                <span className="font-body text-[7px] uppercase tracking-widest text-ink/35">
                  You
                </span>
              </motion.div>
            </div>

            {/* Nodes */}
            {experiments.map((exp) => (
              <OrbitalNode
                key={exp.id}
                data={exp}
                baseAngle={BASE_ANGLES[exp.id]}
                globalAngle={globalAngle}
                isHovered={hoveredId === exp.id}
                isActive={activeId === exp.id}
                anyHovering={anyHovering}
                onEnter={() => onEnter(exp.id)}
                onLeave={onLeave}
                onClick={() => onSelect(exp.id)}
              />
            ))}
          </div>

          {/* ── Detail panel : always shows, clearly visible ── */}
          <AnimatePresence mode="wait">
            {displayData && (
              <motion.div
                key={displayId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-8 flex flex-col items-center gap-3 text-center max-w-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: DOT_COLOR[displayData.status] }}
                  />
                  <span className="font-heading text-xl font-semibold text-ink">
                    {displayData.title}
                  </span>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {displayData.teaser}
                </p>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-accent hover:text-ink transition-colors duration-200 mt-1 cursor-pointer"
                >
                  View project
                  <span className="inline-block group-hover:translate-x-0.5">→</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  )
}
