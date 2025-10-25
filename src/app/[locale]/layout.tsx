import '@/styles/globals.css'
import type { Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { baseUrl } from '@/app/sitemap'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { routing } from '@/i18n/routing'
import { geist, geistMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s - Evan',
      default: 'Evan',
    },
    description: t('home.description'),
    keywords:
      'Evan, Blog, Developer, Full Stack, Frontend, Engineer, Designer, Open Source',
    openGraph: {
      title: 'Evan',
      description: t('metadata.description'),
      url: baseUrl,
      siteName: "Evan's Blog",
      locale,
      type: 'website',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Evan',
      description: t('metadata.description'),
      creator: '@evan1297',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        {
          url: '/logo.svg',
          href: '/logo.svg',
        },
      ],
      apple: '/logo.svg',
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          'flex bg-zinc-50 dark:bg-black font-sans h-full antialiased',
          geist.variable,
          geistMono.variable,
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex w-full">
              <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="flex w-full max-w-7xl lg:px-8">
                  <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
                </div>
              </div>
              <div className="relative flex w-full flex-col">
                <Header />
                <main className="flex-auto">{children}</main>
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <SpeedInsights />
      <Analytics />
      <GoogleAnalytics gaId="G-MF7M0W46QW" />
    </html>
  )
}
