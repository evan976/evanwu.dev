import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
