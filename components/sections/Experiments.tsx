'use client'

import { motion } from 'framer-motion'
import { experiments } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'

const statusConfig = {
  active: {
    label: 'Active',
    dot: 'bg-accent animate-pulse',
    text: 'text-accent',
    bg: 'bg-accent/8',
  },
  exploring: {
    label: 'In progress',
    dot: 'bg-amber-400',
    text: 'text-amber-600',
    bg: 'bg-amber-400/10',
  },
  shipped: {
    label: 'Live',
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
}

function ProjectCard({
  project,
  index,
}: {
  project: typeof experiments[0]
  index: number
}) {
  const hasLink = Boolean(project.href && project.href !== '#')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative"
    >
      <Link
        href={hasLink ? project.href : '#'}
        target={hasLink ? '_blank' : undefined}
        rel={hasLink ? 'noopener noreferrer' : undefined}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-dark mb-6">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {'image' in project && (
              <Image
                src={project.image as string}
                alt={project.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            )}
          </motion.div>
          
          {/* Metadata Overlay */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="font-body text-[10px] uppercase tracking-widest bg-ink text-paper px-3 py-1">
              {project.id}
            </span>
            <div className="flex gap-1.5">
              {project.tags.slice(0, 1).map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[10px] uppercase tracking-widest backdrop-blur-md bg-white/20 text-ink px-3 py-1 border border-ink/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-muted/40 font-body text-xs">{project.year}</span>
          </div>
          <p className="font-body text-sm text-muted max-w-sm leading-relaxed">
            {project.teaser}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Experiments() {
  const featured = experiments.slice(0, 4)

  return (
    <section id="experiments" className="relative z-20 w-full pt-20 pb-48 px-6 -mt-[15vh]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-20"
        >
          <div>
            <span className="font-body text-xs text-muted/60 uppercase tracking-[0.2em] block mb-6 px-1">
              Selected Works
            </span>
            <h2 className="font-heading text-5xl md:text-8xl font-bold text-ink leading-[0.9] tracking-tighter">
              The Library<span className="text-accent">.</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 opacity-40">
            <span className="font-body text-[10px] uppercase tracking-widest">Active Archives</span>
            <span className="font-body text-xs tabular-nums tracking-widest">{experiments.length} Projects</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-32">
          {featured.map((exp, i) => (
            <ProjectCard key={exp.id} project={exp} index={i} />
          ))}
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-3 font-body text-sm text-muted hover:text-ink transition-colors duration-200 group cursor-pointer"
        >
          See all projects
          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
