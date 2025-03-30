import '@/app/globals.css'
import { baseUrl } from '@/app/sitemap'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('metadata')
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s - Evan',
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords').split(','),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: baseUrl,
      siteName: t('title'),
      locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@evan1297',
      images: [
        {
          url: `${baseUrl}/og`,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <body
        className={cn('flex h-full bg-zinc-50 dark:bg-black', inter.variable)}
      >
        <script defer src="https://reacthub.store/insights/script.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: 'window.visio.init()',
          }}
        />
        <NextIntlClientProvider messages={messages}>
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
        <SpeedInsights />
      </body>
    </html>
  )
}
