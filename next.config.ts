import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/content/*.mdx'],
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
