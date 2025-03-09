import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['next-mdx-remote'],
}

export default withNextIntl(nextConfig)
