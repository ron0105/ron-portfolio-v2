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
          <svg
            width={iconOnly ? 18 : 16}
            height={iconOnly ? 18 : 16}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:text-ink transition-colors duration-300"
          >
            <path d="M3 11V9a6 6 0 0 1 12 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="1.5" y="10" width="3" height="5" rx="1.5" fill="currentColor"/>
            <rect x="13.5" y="10" width="3" height="5" rx="1.5" fill="currentColor"/>
          </svg>
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
