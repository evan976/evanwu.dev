# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Evan Wu, built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel. Uses Bun as the package manager.

## Commands

```bash
bun dev          # Start dev server with Turbopack
bun run build    # Production build
bun run start    # Start production server
bun run typecheck # Type check (tsc --noEmit)
bun run lint     # Format with Biome (biome format --write)
```

## Architecture

### Routing & i18n

All pages live under `src/app/[locale]/`. The site supports English (en, default) and Chinese (zh) via `next-intl`. English routes have no prefix (`/about`), Chinese routes are prefixed (`/zh/about`). Locale config is driven by `languine.json` and defined in `src/i18n/routing.ts`.

UI translations are in `messages/en.json` and `messages/zh.json`. Use `useTranslations()` from `next-intl` in components. For links, use the i18n-aware `Link` from `src/i18n/navigation.ts`.

### MDX Content System

Articles are stored as `.mdx` files in `src/content/{locale}/` (e.g., `src/content/en/react-server-component.mdx`). Each article has YAML frontmatter:

```yaml
---
title: 'Article Title'
description: 'Short description'
publishedAt: 'YYYY-MM-DD'
image: '/optional-image.png'
---
```

`src/lib/mdx.ts` handles file reading, frontmatter parsing, and reading time calculation (server-only). MDX rendering uses `next-mdx-remote-client` with custom components defined in `src/components/mdx.tsx`. Code blocks use Shiki for syntax highlighting.

### Key Directories

- `src/components/` — React components (prefer RSC, mark client components with `'use client'`)
- `src/lib/` — Utilities, constants (resume, projects, nav items), MDX helpers, fonts
- `src/actions/` — Server actions (e.g., email subscription via Neon PostgreSQL)
- `src/styles/` — Global CSS and typography
- `src/app/api/og/` — Dynamic Open Graph image generation

### Data & Constants

`src/lib/constants.ts` contains resume entries, social links, project definitions, and navigation items. This is the single source of truth for these data structures.

## Code Conventions

- **Formatting:** Biome — 2-space indent, single quotes, no semicolons, 80-char width
- **Exports:** Prefer named exports over default exports
- **Naming:** kebab-case directories, PascalCase component files
- **Components:** Server Components by default. Only use `'use client'` when interactivity is required. Minimize client-side directives.
- **Imports:** Organized by groups: Node APIs, React, Next.js (configured in biome.json)
- **Path aliases:** `@/*` → `./src/*`, `@/public/*` → `./public/*`

## Stack Reference

- **Framework:** Next.js 16 with React Compiler enabled
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **Animation:** Framer Motion (`motion` package)
- **Icons:** lucide-react
- **UI primitives:** Radix UI (Dialog, Tooltip)
- **Dark mode:** next-themes
- **Database:** Neon serverless PostgreSQL (for subscriptions)
- **Validation:** Zod
- **Analytics:** Vercel Analytics + Speed Insights
