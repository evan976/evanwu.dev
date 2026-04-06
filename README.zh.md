# evanwu.dev

个人网站 [evanwu.dev](https://evanwu.dev) 的源码仓库，包含作品集、博客、摄影页等。基于中英双语的 Next.js 应用，通过 [OpenNext](https://opennext.js.org) 部署在 Cloudflare Workers。

![预览](./public/og/opengraph-image.png)

[English README](./README.md)

## 功能概览

- **本地化路由** — 默认语言为英文，URL 不带语言前缀（如 `/about`）；中文在 `/zh/*` 下。语言由 [next-intl](https://next-intl.dev) 管理；路由配置见 `src/i18n/routing.ts`，并与 `languine.json` 一致（源语言 `en`，目标语言 `zh`）。
- **博客 / 文章** — 各语言 MDX 放在 `src/content/{locale}/`，服务端用 [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client)、[remark-gfm](https://github.com/remarkjs/remark-gfm) 编译，代码块高亮为 [Shiki](https://shiki.style)。阅读时间在 `src/lib/mdx.ts` 中计算。
- **动态 OG 图** — `src/app/api/og/route.tsx` 生成用于分享的 Open Graph 图片。
- **RSS** — 按语言划分的订阅地址，见 `src/app/[locale]/rss/route.ts`。
- **邮件订阅（可选）** — `src/actions/subscription.ts` 中的 Server Action 在配置了 `DATABASE_URL` 时，将订阅写入 [Neon](https://neon.tech) PostgreSQL。
- **分析** — 通过 `@next/third-parties` 接入 Google Analytics。

## 技术栈

| 方面 | 选型 |
|------|------|
| 框架 | [Next.js](https://nextjs.org) 16（App Router）、[React](https://react.dev) 19、[React Compiler](https://react.dev/learn/react-compiler)（`next.config.ts` 中 `reactCompiler: true`） |
| 语言 | [TypeScript](https://www.typescriptlang.org) |
| 样式 | [Tailwind CSS](https://tailwindcss.com) v4（`@tailwindcss/postcss`） |
| 国际化 | [next-intl](https://next-intl.dev) — `useTranslations()`，以及 `src/i18n/navigation.ts` 中带语言感知能力的 `Link` / 路由 |
| 内容 | MDX + YAML frontmatter；界面文案在 `messages/en.json` 与 `messages/zh.json` |
| MDX | `src/components/mdx.tsx` 中自定义组件（标题、链接、`mdx-code` 代码块等） |
| UI | [Radix UI](https://www.radix-ui.com)（Dialog、Tooltip）、[lucide-react](https://lucide.dev)、[motion](https://motion.dev) |
| 主题 | [next-themes](https://github.com/pacocoursey/next-themes) |
| 校验 | [Zod](https://zod.dev)（如订阅表单） |
| 代码质量 | [Biome](https://biomejs.dev) — `bun run lint` 执行 `biome format --write` |
| 包管理 | [Bun](https://bun.sh) |

## 目录结构

```
src/
  app/
    [locale]/          # 各语言页面：首页、关于、文章、项目、摄影、uses 等
    api/og/            # OG 图片路由
    robots.ts, sitemap.ts
  actions/             # Server Actions（如订阅）
  components/          # React 组件（默认服务端组件；仅在需要交互时使用 'use client'）
  content/
    en/, zh/            # 各语言 *.mdx 文章
  i18n/                  # routing.ts、navigation.ts、request.ts
  lib/                   # mdx.ts、constants（简历、项目、导航）、字体、rss 等
  styles/                # 全局样式
messages/
  en.json, zh.json       # next-intl 文案表
```

导航、简历片段、项目、社交链接等共享数据集中在 `src/lib/constants.ts`。

## 文章 frontmatter

每个 `src/content/{locale}/*.mdx` 可在文首使用 YAML frontmatter：

```yaml
---
title: '文章标题'
description: '用于 SEO 与列表页的简短描述'
publishedAt: 'YYYY-MM-DD'
image: '/可选的-og-或卡片图.png'
---
```

文章路径中的 slug 来自文件名（例如 `react-server-component.mdx` → `/articles/react-server-component`）。

## 环境变量

| 变量 | 是否必需 | 说明 |
|------|----------|------|
| `DATABASE_URL` | 否 | Neon 连接串，用于邮件订阅。不配置时站点其余功能仍可用，仅订阅功能需要数据库。 |

`NODE_ENV` 由运行环境设置；本地开发时，RSS / OG 等场景默认使用 `http://localhost:3000` 作为站点基址。在 Cloudflare Workers 中通过 `wrangler secret` 管理环境变量。

## 本地开发

```bash
bun install
bun dev              # Next 开发服务器（Turbopack）
bun run build        # 生产构建
bun run start        # 本地运行生产构建
bun run typecheck    # tsc --noEmit
bun run lint         # Biome：格式化并写回（--write）
bun run preview      # 构建并在本地以 Cloudflare Workers 预览
bun run deploy       # 构建并部署到 Cloudflare Workers
```

## 代码约定（摘要）

- 优先使用**命名导出**；仅在框架要求处使用默认导出。
- 目录 **kebab-case**，组件文件 **PascalCase**。
- 路径别名：`@/*` → `./src/*`。
- 格式化：Biome — 两格缩进、单引号、无分号、约 80 字符行宽（见 `biome.json`）。

## 部署

站点通过 [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) 部署在 **Cloudflare Workers** 上。Workers 配置见 `wrangler.jsonc`，OpenNext 配置见 `open-next.config.ts`。运行 `bun run deploy` 即可构建并部署。若使用订阅功能，通过 `wrangler secret put DATABASE_URL` 设置数据库密钥。`sitemap.ts` 与 `robots.ts` 位于 `src/app/`，供爬虫与 SEO 使用。
