# AGENTS.md

Instructions for AI coding agents working on this repository.

## Project

Personal portfolio and blog for Evan Wu. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Deployed to Cloudflare via `@opennextjs/cloudflare`. Package manager: **Bun**.

## Commands

| Command | Purpose |
|---|---|
| `bun dev` | Dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run test` | Run tests (Vitest) |
| `bun run typecheck` | Type check (`tsc --noEmit`) |
| `bun run lint` | Format with Biome |
| `bun run preview` | Build + Cloudflare local preview |
| `bun run deploy` | Build + deploy to Cloudflare |

## Architecture

### Routing & i18n

- All pages: `src/app/[locale]/`
- Locales: `en` (default, no prefix) and `zh` (prefixed `/zh/`)
- i18n library: `next-intl`
- Locale config: `src/i18n/routing.ts` + `languine.json`
- Translations: `messages/en.json`, `messages/zh.json`
- Use `useTranslations()` for UI strings, i18n-aware `Link` from `src/i18n/navigation.ts` for links

### Content

- Articles: `src/content/{locale}/*.mdx` with YAML frontmatter (`title`, `description`, `publishedAt`, `updatedAt`, `image`, `topics`)
- MDX pipeline: `src/lib/mdx.ts` (reading, parsing, listing — server-only, `react.cache`)
- Rendering: `next-mdx-remote-client` + custom components in `src/components/mdx.tsx`
- Syntax highlighting: Shiki

### SEO

- `src/lib/schema.ts` — JSON-LD structured data (Article, BlogPosting, BreadcrumbList, WebSite, Person, ItemList)
- `src/lib/metadata-urls.ts` — Canonical URLs and hreflang alternates
- `src/lib/article-content.ts` — Article summaries and external reference extraction
- `src/lib/site.ts` — Base URL constant (`https://evanwu.dev`)
- `src/app/robots.ts` — robots.txt with AI crawler allow rules
- `public/llms.txt` — LLM-friendly site description

### Key directories

- `src/components/` — React components (RSC by default, `'use client'` only when needed)
- `src/lib/` — Utilities, constants, MDX helpers, SEO helpers, fonts
- `src/actions/` — Server actions (email subscription via Neon PostgreSQL)
- `src/styles/` — Global CSS and typography
- `src/app/api/og/` — Dynamic Open Graph image generation

### Data

`src/lib/constants.ts` is the single source of truth for resume, social links, projects, and nav items.

### Testing

- Framework: Vitest, config in `vitest.config.ts`
- Test files co-located with source using `.test.ts` suffix
- Path aliases (`@/`) configured in vitest config

## Code Style

- **Formatter:** Biome — 2-space indent, single quotes, semicolons as needed, 80-char line width
- **Exports:** Named exports preferred
- **Naming:** kebab-case directories, PascalCase components
- **Components:** Server Components by default; minimize `'use client'`
- **Imports:** Organized by groups — Node APIs, React, Next.js (biome.json)
- **Path aliases:** `@/*` → `./src/*`, `@/public/*` → `./public/*`

## Stack

Next.js 16 · React 19 (with React Compiler) · TypeScript · Tailwind CSS v4 · Framer Motion (`motion`) · lucide-react · Radix UI · next-themes · Neon PostgreSQL · Zod · Vitest · Cloudflare (`@opennextjs/cloudflare` + Wrangler) · Vercel Analytics
