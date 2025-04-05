import logoHackQuest from '@/public/hackquest.svg'
import logoSeaMaid from '@/public/seamaid.png'

export const resume = [
  {
    company: 'HackQuest',
    url: 'https://hackquest.io',
    title: 'Frontend Developer',
    logo: logoHackQuest,
    start: '2024-05',
    end: new Date(),
  },
  {
    company: 'SeaMaid Tech',
    url: 'https://haiyaogame.com',
    title: 'Frontend Developer',
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
