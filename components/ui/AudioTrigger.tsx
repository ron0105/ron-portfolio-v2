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
      className={`font-body text-[10px] text-muted/60 hover:text-ink transition-colors duration-300 flex items-center gap-3 group cursor-pointer uppercase tracking-[0.2em] ${className}`}
    >
      <div className="relative w-3 h-3 flex items-center justify-center">
        {isPlaying ? (
          <div className="flex gap-[1.5px] items-end h-[8px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ height: [3, 8, 3] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-[1.5px] bg-accent"
              />
            ))}
          </div>
        ) : (
          <div className="w-2 h-2 rounded-full border border-muted/40 group-hover:bg-accent group-hover:border-accent transition-all duration-300" />
        )}
      </div>
      <span>
        {isPlaying ? 'Playing my story' : 'Play how I think'}
      </span>
    </button>
  )
}
