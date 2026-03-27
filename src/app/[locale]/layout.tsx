import '@/styles/globals.css'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { baseUrl } from '@/app/sitemap'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TooltipProvider } from '@/components/tooltip'
import { routing } from '@/i18n/routing'
import { geist, geistMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { DeferredAnalytics } from '@/components/deferred-analytics'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations()
  return {
    metadataBase: new URL(baseUrl),
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords:
      'Evan Wu, Blog, Developer, Full Stack, Frontend, Engineer, Designer, Open Source, React, TypeScript, Web Development',
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      siteName: "Evan's Blog",
      locale,
      type: 'website',
      images: [
        {
          url: '/og/opengraph-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      creator: '@evan1297',
      images: [
        {
          url: '/og/opengraph-image.png',
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
          url: '/logos/logo.svg',
          href: '/logos/logo.svg',
        },
      ],
      apple: '/logos/logo.svg',
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
          'flex bg-neutral-50 dark:bg-black font-sans h-full overflow-x-clip antialiased',
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
            <TooltipProvider>
              <div className="flex w-full">
                <div className="fixed inset-0 flex justify-center sm:px-8">
                  <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="w-full bg-white ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-300/20" />
                  </div>
                </div>
                <div className="relative flex w-full flex-col">
                  <Header />
                  <main className="flex-auto">{children}</main>
                  <Footer />
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <DeferredAnalytics />
    </html>
  )
}
