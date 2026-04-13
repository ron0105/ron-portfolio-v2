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
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      className={`font-body text-[10px] sm:text-xs text-muted/70 hover:text-ink active:text-ink transition-colors duration-300 flex items-center gap-3 group cursor-pointer uppercase tracking-[0.2em] min-h-[44px] ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
        {isPlaying ? (
          <div className="flex gap-[2px] items-end h-[10px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ height: [3, 10, 3] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-[2px] bg-accent rounded-full"
              />
            ))}
          </div>
        ) : (
          <div className="w-3 h-3 rounded-full border-[1.5px] border-muted/50 group-hover:bg-accent group-hover:border-accent transition-all duration-300" />
        )}
      </div>
      <span className="text-[10px] sm:text-xs">
        {isPlaying ? 'Playing my story' : 'Play how I think'}
      </span>
    </button>
  )
}
