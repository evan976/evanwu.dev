'use client'

import dynamic from 'next/dynamic'

const GoogleAnalytics = dynamic(
  () => import('@next/third-parties/google').then((m) => m.GoogleAnalytics),
  { ssr: false },
)
const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((m) => m.Analytics),
  { ssr: false },
)
const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
  { ssr: false },
)

export function DeferredAnalytics() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      <GoogleAnalytics gaId="G-MF7M0W46QW" />
    </>
  )
}
