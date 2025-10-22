import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
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
