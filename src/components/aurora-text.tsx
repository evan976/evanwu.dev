'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = React.memo<AuroraTextProps>(
  ({
    children,
    className,
    colors = ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'],
    speed = 1,
  }) => {
    return (
      <span className={cn('relative inline-block', className)}>
        <span className="sr-only">{children}</span>
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animationDuration: `${10 / speed}s`,
          }}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    )
  },
)
