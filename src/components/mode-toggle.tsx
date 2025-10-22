'use client'

import * as React from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const themes = [
  {
    label: 'Toggle light',
    icon: SunIcon,
    value: 'light',
  },
  {
    label: 'Toggle dark',
    icon: MoonIcon,
    value: 'dark',
  },
  {
    label: 'Toggle system',
    icon: MonitorIcon,
    value: 'system',
  },
]

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex gap-x-1.5 rounded-full bg-white p-1 ring-1 ring-zinc-600/10 light:ring-inset dark:bg-zinc-950/30 dark:ring-zinc-50/5 not-dark:ring-inset"
    >
      {themes.map(({ label, icon: Icon, value }) => (
        <button
          role="radio"
          type="button"
          key={value}
          aria-label={label}
          aria-checked={theme === value}
          className={cn(
            'size-5 text-zinc-500 hover:text-zinc-800 inline-flex items-center justify-center rounded-full outline-none transition-colors dark:hover:text-zinc-300',
            {
              'ring-1 bg-zinc-100 ring-zinc-900/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/20 text-zinc-800 shadow-[0_1px_5px_-4px_rgba(19,19,22,0.4),0_2px_5px_rgba(34,42,53,0.06)]':
                theme === value,
            },
          )}
          onClick={() => setTheme(value)}
        >
          <Icon className="size-3.5 shrink-0" />
        </button>
      ))}
    </div>
  )
}
