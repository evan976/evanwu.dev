'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/button'
import { ComicText } from '@/components/comic-text'
import { useMediaQuery } from '@/lib/use-media-query'

export default function NotFound() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  return (
    <div className="sm:px-8 mt-16 lg:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="xl:relative">
              <div className="mx-auto max-w-2xl">
                <ComicText fontSize={isMobile ? 6 : 12}>404</ComicText>
                <p className="mt-8 text-base text-center text-balance text-zinc-600 dark:text-zinc-400">
                  Ooops! Page not found.
                </p>
                <div className="mt-12 flex justify-center">
                  <Button variant="primary" href="/" aria-label="Go back home">
                    Go back home
                    <ArrowRight className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
