import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
  outputFileTracingIncludes: {
    '/**/*': ['./src/content/*.mdx'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'motion',
      'motion/react',
      'motion/react-client',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tooltip',
      'date-fns',
    ],
  },
}

const withNextIntl = createNextIntlPlugin()

export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    initOpenNextCloudflareForDev()
  }

  return withNextIntl(nextConfig)
}
