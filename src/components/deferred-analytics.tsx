'use client'

import dynamic from 'next/dynamic'

const GoogleAnalytics = dynamic(
  () => import('@next/third-parties/google').then((m) => m.GoogleAnalytics),
  { ssr: false },
)

export function DeferredAnalytics() {
  return <GoogleAnalytics gaId="G-MF7M0W46QW" />
}
