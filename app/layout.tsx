import '@/app/globals.css'
import { baseUrl } from '@/app/sitemap'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { geist, geistMono } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s - Evan',
    default: 'Evan',
  },
  description: 'I build user interfaces',
  keywords:
    'Evan, Blog, Developer, Full Stack, Frontend, Engineer, Designer, Open Source',
  openGraph: {
    title: 'Evan',
    description: 'I build user interfaces',
    url: baseUrl,
    siteName: 'Evan',
    locale: 'en',
    type: 'website',
    images: [{ url: '/api/og?path=/' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evan',
    description: 'I build user interfaces',
    creator: '@evan1297',
    images: [{ url: '/api/og?path=/' }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex bg-zinc-50 dark:bg-black font-sans h-full antialiased',
          geist.variable,
          geistMono.variable,
        )}
      >
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
        <SpeedInsights />
      </body>
    </html>
  )
}
