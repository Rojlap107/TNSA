
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TNSA (Tibetan National Sports Association) Website** — a Next.js 15 application (App Router) serving as a news portal and organizational website for Tibetan diaspora sports. Covers tournaments, national teams, programs, and community events.

## Build & Dev Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server
npm run build        # production build
npm run start        # serve production build
```

No linter or test runner is configured.

### Data Pipeline

```bash
python3 scripts/clean_facebook_posts.py
```

Reads raw scraped data from `src/data/dataset_facebook-posts-scraper_*.json`, filters Tibetan-only posts, classifies/merges related posts into article groups, downloads images to `public/images/news/`, and outputs `src/data/new_news.json`. To add a new event: add a regex to `MERGE_GROUPS` and a corresponding entry to `ARTICLE_TEMPLATES`.

## Architecture

### Dual-Source Data Layer (JSON + Sanity CMS)

All content has two sources: **static JSON files** in `src/data/` (primary) and **Sanity CMS** (secondary). Data fetching functions in `src/lib/` merge both sources — Sanity wins on ID collision. If Sanity is unreachable, JSON data is used as fallback.

**Data fetching pattern** (all functions in `src/lib/`):
1. Import static JSON via `import("../data/<file>.json")`
2. Fetch from Sanity via GROQ query (wrapped in try/catch)
3. Merge into a Map keyed by `id` — Sanity overwrites JSON entries
4. Sort and return

Key fetchers: `getNews.ts`, `getTournaments.ts`, `getPrograms.ts`, `getHighlights.ts`, `getPlayers.ts`

These are **server-only** — called from Server Components and API route handlers.

### Data Files (`src/data/`)

| File | Schema |
|------|--------|
| `news.json` | `{ id, title, image, date, author, content: string[], facebookUrl?, gallery?: string[] }` |
| `tournaments.json` | `{ id, title, image, content: string[] }` |
| `programs.json` | `{ id, title, image, content: string[], documents?: { title, file }[] }` |
| `highlights.json` | `{ id, url }` (YouTube video URLs) |
| `projects.json` | Featured projects for homepage grid |
| `national-team-men.json` / `national-team-women.json` | `{ year, goalkeepers, defenders, midfielders, forwards }` where each player is `{ name, location, image }` |

### Sanity CMS

- **Config:** `sanity.config.ts` — project ID, dataset, `/studio` base path
- **Client:** `src/sanity/client.ts`
- **Schemas:** `src/sanity/schemaTypes/` — `news.ts`, `tournament.ts`, `program.ts`, `highlight.ts`, `player.ts`
- **Studio route:** `/studio/[[...index]]`
- **Env vars:** `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_READ_TOKEN` (plus `NEXT_PUBLIC_` variants)

Sanity content uses Portable Text for rich text fields. The `blocksToStrings()` helper in each lib file converts Portable Text blocks to plain `string[]` paragraphs.

### Routing

**Static pages:** `/`, `/about`, `/contact`, `/donate`, `/membership`, `/news`, `/programs`, `/tournaments`, `/national-team`, `/national-team/men`, `/national-team/women`, `/admin/login`, `/admin/news`

**Dynamic routes:** `/news/[slug]`, `/programs/[slug]`, `/tournaments/[slug]`

**API routes:**
- `GET /api/news` — list all news
- `GET|PUT|DELETE /api/news/[id]` — single news CRUD
- `/api/cms/news` and `/api/cms/news/[slug]` — CMS endpoints

### Components (`src/components/`)

Client components (marked `"use client"`): `HeroSlider` (auto-rotating carousel), `HighlightsGrid` (YouTube video grid with oEmbed), `NewsList` (searchable news grid), `GalleryLightbox` (image gallery viewer)

Server components: `LatestStories`, `ProjectsGrid`, `TeamRoster`

### Styling

Vanilla CSS in `src/app/globals.css`. No Tailwind, no CSS modules, no CSS-in-JS.

- Primary blue: `#4A90E2`, accent red: `#FF6B6B`
- Responsive breakpoints: 768px (tablet), 480px (mobile)
- Font: Roboto (Google Fonts)
- Container max-width: 1200px

### TypeScript Config

- `strict: false`
- `resolveJsonModule: true` (JSON imports enabled)
- Target: ES2017
