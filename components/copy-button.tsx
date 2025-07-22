'use client'

import * as React from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

const variants: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
    },
  },
}

function CopyButtonIcon({ isCopied }: { isCopied: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isCopied ? (
        <motion.div
          animate="visible"
          exit="hidden"
          initial="hidden"
          key="copied"
          variants={variants}
        >
          <CheckIcon className="size-3.5" />
        </motion.div>
      ) : (
        <motion.div
          animate="visible"
          exit="hidden"
          initial="hidden"
          key="copy"
          variants={variants}
        >
          <CopyIcon className="size-3.5" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface CopyButtonProps
  extends Omit<React.ComponentProps<'button'>, 'value'> {
  value?: string | null
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const timeout = React.useRef(0)
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(async (text: string) => {
    window.clearTimeout(timeout.current)

    try {
      await navigator.clipboard.writeText(text)
    } catch {}
  }, [])

  const onCopy = React.useCallback(() => {
    if (!value) return
    copyToClipboard(value)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [copyToClipboard, value])

  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      className={cn('cursor-copy', className)}
      onClick={onCopy}
      {...props}
    >
      <CopyButtonIcon isCopied={isCopied} />
    </button>
  )
}
