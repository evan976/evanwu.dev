import { Geist, Geist_Mono } from 'next/font/google'

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})
