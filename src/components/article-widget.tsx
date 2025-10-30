'use client'

import * as React from 'react'
import {
  ArrowLeft,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type Variants,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'
import { useRouter } from '@/i18n/navigation'

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function ArticleWidget({
  previous,
  next,
}: {
  previous?: string
  next?: string
}) {
  const router = useRouter()
  const t = useTranslations('articles')
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = React.useState(false)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setVisible(latest > 0.1)
  })

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <motion.div
        id="scroll-indicator"
        className="fixed top-0 left-0 right-0 h-1 rounded-full bg-violet-500"
        style={{ scaleX, originX: 0 }}
      />
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        transition={{
          duration: 0.2,
          type: 'spring',
          bounce: 0,
        }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-1.5 shadow-lg border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700/50">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={t('back_to_articles')}
                className="flex items-center justify-center gap-2 rounded-full size-7 border border-neutral-200 enabled:hover:bg-neutral-100 transition-colors duration-200 dark:border-neutral-700/50 dark:enabled:hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  router.push('/articles', { scroll: true })
                }}
              >
                <ArrowLeft className="size-3.5" />
                <span className="sr-only">{t('back_to_articles')}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('back_to_articles')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={t('previous_article')}
                disabled={!previous}
                aria-disabled={!previous}
                className="flex items-center justify-center gap-2 rounded-full size-7 border border-neutral-200 enabled:hover:bg-neutral-100 transition-colors duration-200 dark:border-neutral-700/50 dark:enabled:hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (previous) {
                    router.push(`/articles/${previous}`, { scroll: true })
                  }
                }}
              >
                <ChevronLeft className="size-4" />
                <span className="sr-only">{t('previous_article')}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('previous_article')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={t('scroll_to_top')}
                className="flex items-center justify-center gap-2 rounded-full size-7 border border-neutral-200 hover:bg-neutral-100 transition-colors duration-200 dark:border-neutral-700/50 dark:hover:bg-neutral-700/50"
                onClick={scrollToTop}
              >
                <ArrowUpFromLine className="size-3.5" />
                <span className="sr-only">{t('scroll_to_top')}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('scroll_to_top')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={t('next_article')}
                disabled={!next}
                aria-disabled={!next}
                className="flex items-center justify-center gap-2 rounded-full size-7 border border-neutral-200 enabled:hover:bg-neutral-100 transition-colors duration-200 dark:border-neutral-700/50 dark:enabled:hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (next) {
                    router.push(`/articles/${next}`, { scroll: true })
                  }
                }}
              >
                <ChevronRight className="size-4" />
                <span className="sr-only">{t('next_article')}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('next_article')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </>
  )
}
