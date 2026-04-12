'use client'

import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

/* ─── types ─── */
interface RingProps {
  size: number
  rotateX: number
  rotateZ?: number
  x: MotionValue<number>
  y: MotionValue<number>
  duration: number
  direction?: 1 | -1
  borderColor: string
  glow?: string
}

/* ─── single ring ─── */
function Ring({
  size,
  rotateX,
  rotateZ = 0,
  x,
  y,
  duration,
  direction = 1,
  borderColor,
  glow,
}: RingProps) {
  const offset = -(size / 2)
  return (
    <motion.div
      style={{
        x,
        y,
        rotateX,
        rotateZ,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: offset,
        marginLeft: offset,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid ${borderColor}`,
        boxShadow: glow,
        willChange: 'transform',
      }}
      animate={{ rotate: 360 * direction }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    />
  )
}

/* ─── dot configs ─── */
const DOTS = [
  { top: 52,  left: 12,  size: 5, speed: 3 },
  { top: 15,  left: 22,  size: 4, speed: 2 },
  { top: 76,  left: 28,  size: 3, speed: 3 },
  { top: 20,  left: 72,  size: 6, speed: 1 },
  { top: 72,  left: 68,  size: 3, speed: 2 },
  { top: 45,  left: 88,  size: 4, speed: 3 },
]

/* ─── main component ─── */
export default function HeroVisual() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const cfg = { damping: 38, stiffness: 85, mass: 0.7 }
  const smX = useSpring(rawX, cfg)
  const smY = useSpring(rawY, cfg)

  /* three parallax layers — slow / medium / fast */
  const p1x = useTransform(smX, [-0.5, 0.5], [-5,   5])
  const p1y = useTransform(smY, [-0.5, 0.5], [-5,   5])
  const p2x = useTransform(smX, [-0.5, 0.5], [-13, 13])
  const p2y = useTransform(smY, [-0.5, 0.5], [-13, 13])
  const p3x = useTransform(smX, [-0.5, 0.5], [-22, 22])
  const p3y = useTransform(smY, [-0.5, 0.5], [-22, 22])

  const layers = [
    { x: p1x, y: p1y },
    { x: p2x, y: p2y },
    { x: p3x, y: p3y },
  ]

  /* whole scene tilts gently with mouse */
  const sceneRX = useTransform(smY, [-0.5, 0.5], [ 3, -3])
  const sceneRY = useTransform(smX, [-0.5, 0.5], [-3,  3])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth  - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      aria-hidden="true"
      style={{ perspective: '700px' }}
    >
      <motion.div
        style={{
          rotateX: sceneRX,
          rotateY: sceneRY,
          width: 380,
          height: 380,
          position: 'relative',
          willChange: 'transform',
        }}
      >
        {/* Outer ring — very flat horizontal orbit */}
        <Ring
          size={360}
          rotateX={66}
          x={p1x}
          y={p1y}
          duration={44}
          borderColor="rgba(13,13,13,0.07)"
        />

        {/* Middle ring — slight oblique angle */}
        <Ring
          size={240}
          rotateX={50}
          rotateZ={22}
          x={p2x}
          y={p2y}
          duration={29}
          direction={-1}
          borderColor="rgba(13,13,13,0.11)"
        />

        {/* Inner ring — accent tinted */}
        <Ring
          size={138}
          rotateX={30}
          x={p3x}
          y={p3y}
          duration={18}
          borderColor="rgba(255,77,0,0.22)"
          glow="0 0 18px rgba(255,77,0,0.07)"
        />

        {/* Central orb */}
        <motion.div
          style={{
            x: p3x,
            y: p3y,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -22,
            marginLeft: -22,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 36% 36%, rgba(255,77,0,0.28), rgba(255,77,0,0.07) 75%)',
            border: '1px solid rgba(255,77,0,0.22)',
            boxShadow:
              '0 0 28px rgba(255,77,0,0.14), 0 0 56px rgba(255,77,0,0.06)',
            willChange: 'transform',
          }}
        />

        {/* Floating nodes */}
        {DOTS.map((dot, i) => {
          const layer = layers[dot.speed - 1]
          return (
            <motion.div
              key={i}
              style={{
                x: layer.x,
                y: layer.y,
                position: 'absolute',
                top:  `${dot.top}%`,
                left: `${dot.left}%`,
                width:  dot.size,
                height: dot.size,
                borderRadius: '50%',
                background: 'rgba(13,13,13,0.16)',
                willChange: 'transform',
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
