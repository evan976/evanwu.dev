import logoHackQuest from '@/public/hackquest.svg'
import logoSeaMaid from '@/public/seamaid.png'

export const resume = [
  {
    company: 'HackQuest',
    url: 'https://hackquest.io',
    title: 'frontend_developer',
    logo: logoHackQuest,
    start: '2024-05',
    end: new Date(),
  },
  {
    company: 'SeaMaid Tech',
    url: 'https://haiyaogame.com',
    title: 'frontend_developer',
    logo: logoSeaMaid,
    start: '2021-12',
    end: '2024-04',
  },
] as const

export const links = [
  {
    name: 'x',
    href: 'https://x.com/evan1297',
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/evan976',
  },
  {
    name: 'github',
    href: 'https://github.com/evan976',
  },
  {
    name: 'telegram',
    href: 'https://t.me/evan9712',
  },
] as const

export const projects = [
  {
    name: 'HackQuest',
    logo: '/hackquest.svg',
    url: 'https://hackquest.io',
    description:
      'HackQuest is a one-stop, self-guided Web3 developer education platform. HackQuest offers expert-curated learning paths with on-chain certificates co-issued by leading Web3 ecosystems including Solana, Mantle Network, Arbitrum, and Linea. Community builders are supported beyond through co-learning camps, meet-ups, hackathons, accelerator, and launchpad services.',
  },
  {
    name: 'Pencil Finance',
    logo: '/pencil.jpg',
    url: 'https://pencilfinance.io',
    description:
      'Pencil Finance is a decentralized lending protocol purpose-built to bring real-world student loan financing on-chain. By connecting global investors with verified student loan originators, Pencil transforms student debt into an investable, transparent, and impact-driven asset class. The protocol leverages blockchain infrastructure, a dual-tranche capital model, and smart contracts to facilitate a more efficient and equitable flow of capital into education.',
  },
  {
    name: 'Website',
    logo: '/logo.svg',
    url: 'https://evanwu.dev',
    description:
      'The website you are currently on. Built with Next.js, Tailwind CSS, and Framer Motion.',
  },
] as const

export const navigation = [
  {
    name: 'about',
    href: '/about',
  },
  {
    name: 'articles',
    href: '/articles',
  },
  {
    name: 'projects',
    href: '/projects',
  },
  {
    name: 'photography',
    href: '/photography',
  },
  {
    name: 'uses',
    href: '/uses',
  },
] as const
