'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export function TableOfContents() {
  const [mounted, setMounted] = React.useState(false)
  const [entries, setEntries] = React.useState<TocEntry[]>([])
  const [activeId, setActiveId] = React.useState('')
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    function collectHeadings() {
      const headings = document.querySelectorAll('[data-type="heading"]')
      const tocEntries: TocEntry[] = []

      for (const el of headings) {
        const tag = el.tagName.toLowerCase()
        if (tag === 'h2' || tag === 'h3') {
          tocEntries.push({
            id: el.id,
            text: el.textContent?.trim() ?? '',
            level: tag === 'h2' ? 2 : 3,
          })
        }
      }

      return tocEntries
    }

    // Try immediately — works on hard refresh
    const initial = collectHeadings()
    if (initial.length > 0) {
      setEntries(initial)
      setActiveId(initial[0].id)
      return
    }

    // Client-side nav: MDX not yet in DOM, observe for it
    const observer = new MutationObserver(() => {
      const found = collectHeadings()
      if (found.length > 0) {
        setEntries(found)
        setActiveId(found[0].id)
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [mounted])

  React.useEffect(() => {
    if (entries.length === 0) return

    const observer = new IntersectionObserver(
      (observedEntries) => {
        for (const entry of observedEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -80% 0px' },
    )

    for (const { id } of entries) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [entries])

  if (!mounted || entries.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsHovered(false)
        }
      }}
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 xl:flex"
      aria-label="Table of contents"
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex max-h-[60vh] max-w-56 flex-col gap-2 overflow-y-auto rounded-xl border border-neutral-200/80 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-900/95"
          >
            {entries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(entry.id)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  'text-left transition-colors duration-150',
                  entry.level === 3 ? 'pl-3 text-xs' : 'text-sm',
                  entry.id === activeId
                    ? 'font-medium text-blue-500 dark:text-blue-400'
                    : entry.level === 3
                      ? 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                      : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100',
                )}
              >
                {entry.text}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="bars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-end gap-1.5 py-2"
          >
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className={cn(
                  'h-0.5 rounded-full',
                  entry.id === activeId
                    ? 'w-6 bg-neutral-800 dark:bg-neutral-200'
                    : entry.level === 2
                      ? 'w-3 bg-neutral-300 dark:bg-neutral-600'
                      : 'w-2 bg-neutral-200 dark:bg-neutral-700',
                )}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
