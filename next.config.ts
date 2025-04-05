import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['next-mdx-remote'],
  rewrites: async () => [
    {
      source: '/x',
      destination: 'https://x.com/evan1297',
    },
    {
      source: '/linkedin',
      destination: 'https://www.linkedin.com/in/evan976',
    },
    {
      source: '/github',
      destination: 'https://github.com/evan976',
    },
    {
      source: '/telegram',
      destination: 'https://t.me/evan9712',
    },
  ],
}

export default nextConfig
