'use client'

import { motion } from 'framer-motion'
import { useAudio } from '@/context/AudioContext'

export default function AudioTrigger({ className = '' }: { className?: string }) {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggleAudio()
      }}
      className={`font-body text-[10px] text-muted/60 hover:text-ink transition-colors duration-300 flex items-center gap-2 group cursor-pointer uppercase tracking-widest ${className}`}
    >
      <span className="text-[10px] tabular-nums">
        {isPlaying ? '⏸' : '▶'}
      </span>
      <span>
        {isPlaying ? 'Playing my story' : 'Play how I think'}
      </span>
      {isPlaying && (
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ height: [4, 10, 4] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="w-[1.5px] bg-accent/60"
            />
          ))}
        </span>
      )}
    </button>
  )
}
