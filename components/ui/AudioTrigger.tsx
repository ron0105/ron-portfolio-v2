'use client'

import { motion } from 'framer-motion'
import { useAudio } from '@/context/AudioContext'

export default function AudioTrigger({
  className = '',
  iconOnly = false,
}: {
  className?: string
  iconOnly?: boolean
}) {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggleAudio()
      }}
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      className={`font-body text-muted/70 hover:text-ink active:text-ink transition-colors duration-300 flex items-center gap-3 group cursor-pointer min-h-[44px] ${iconOnly ? 'px-2' : 'text-[10px] sm:text-xs uppercase tracking-[0.2em]'} ${className}`}
    >
      <div className={`relative flex items-center justify-center shrink-0 ${iconOnly ? 'w-5 h-5' : 'w-4 h-4'}`}>
        {isPlaying ? (
          <div className={`flex gap-[2px] items-end ${iconOnly ? 'h-[12px]' : 'h-[10px]'}`}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ height: iconOnly ? [4, 12, 4] : [3, 10, 3] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className={`bg-accent rounded-full ${iconOnly ? 'w-[2.5px]' : 'w-[2px]'}`}
              />
            ))}
          </div>
        ) : (
          <div className={`rounded-full border-[1.5px] border-muted/50 group-hover:bg-accent group-hover:border-accent transition-all duration-300 ${iconOnly ? 'w-4 h-4' : 'w-3 h-3'}`} />
        )}
      </div>
      {!iconOnly && (
        <span className="text-[10px] sm:text-xs">
          {isPlaying ? 'Playing my story' : 'Play how I think'}
        </span>
      )}
    </button>
  )
}
