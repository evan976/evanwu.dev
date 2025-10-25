import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/content/*.mdx'],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [
        'remark-gfm',
        {
          strict: true,
          throwOnError: true,
        },
      ],
    ],
    rehypePlugins: [],
  },
})

const withNextIntl = createNextIntlPlugin()

export default withMDX(withNextIntl(nextConfig))
