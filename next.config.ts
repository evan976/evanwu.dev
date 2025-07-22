import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./content/*.mdx'],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      [
        // @ts-expect-error - remark-gfm is not typed
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

export default withMDX(nextConfig)
