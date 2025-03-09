import { type ClassValue, clsx } from 'clsx'
import type * as React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.min(Math.max(number, min), max)
}

export function slugify(node: React.ReactNode) {
  if (typeof node === 'string') {
    if (/^[\u4e00-\u9fa5\d]+$/.test(node)) {
      return node
    }
    return node
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    return slugify((node.props as { children: React.ReactNode }).children)
  }

  return node
}
