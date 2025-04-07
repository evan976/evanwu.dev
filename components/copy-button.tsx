'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import * as React from 'react'

export function CopyButton({
  text,
}: {
  text: string
}) {
  const [copied, setCopied] = React.useState(false)

  function onCopy() {
    setCopied(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <button
      type="button"
      aria-label="Copy code"
      disabled={copied}
      onClick={onCopy}
      className="text-zinc-400 ml-auto dark:text-white/50 transition-colors hover:text-zinc-500 dark:hover:text-white/70"
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  )
}
