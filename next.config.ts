import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./content/*.mdx'],
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
