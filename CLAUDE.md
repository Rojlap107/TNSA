# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **TNSA (Tibetan National Sports Association) Website** — a Next.js application using the App Router. It serves as a news portal and organizational website for Tibetan diaspora sports, covering tournaments, national teams, programs, and community events.

**Important:** Source page/component files (`.tsx`) are not present in `src/app/` — only the compiled `.next/` build output exists alongside the data layer. The project needs its source files restored or recreated to make further development possible.

## Build & Dev Commands

No `package.json` is currently present in the repo. Once restored, standard Next.js commands apply:

```bash
npm install
npm run dev        # local development server
npm run build      # production build
npm run start      # serve production build
```

### Data Pipeline

The content pipeline scrapes Facebook posts and transforms them into structured news articles:

```bash
python3 scripts/clean_facebook_posts.py
```

This reads raw scraped data from `src/data/dataset_facebook-posts-scraper_*.json`, filters out Tibetan-only posts, classifies and merges related posts into article groups, downloads cover/gallery images to `public/images/news/`, and outputs `src/data/new_news.json`.

## Architecture

### Routing (Next.js App Router)

Static pages: `/`, `/about`, `/contact`, `/donate`, `/membership`, `/news`, `/programs`, `/tournaments`, `/national-team`, `/national-team/men`, `/national-team/women`, `/admin/login`, `/admin/news`

Dynamic routes: `/news/[slug]`, `/programs/[slug]`, `/tournaments/[slug]`

API routes:
- `GET /api/news` — list news articles
- `GET /api/news/[id]` — single news article
- `/api/cms/news` and `/api/cms/news/[slug]` — CMS endpoints

Studio route: `/studio/[[...index]]` — Sanity CMS admin (may not be fully wired up)

### Data Layer

Content is stored as static JSON files in `src/data/`:

- **`news.json`** — Main news articles. Schema: `{ id, title, image, date, author, content: string[], facebookUrl, gallery?: string[] }`
- **`new_news.json`** — Output of the Facebook scraper pipeline (same schema as news.json)
- **`programs.json`** — TNSA programs. Schema: `{ id, title, image, content: string[], documents?: { title, file }[] }`

Pages read from these JSON files. API routes serve them to the frontend.

### Content Pipeline (`scripts/clean_facebook_posts.py`)

The pipeline has three key stages:
1. **Filtering** — Skips Tibetan-only text and minor updates (match-day posts, live stream announcements, thank-you messages) using regex-based `SKIP_KEYWORDS`
2. **Classification & Merging** — Groups related Facebook posts into single articles using `MERGE_GROUPS` regex patterns (e.g., all "30th GCMGC" posts become one article)
3. **Article Generation** — Maps each group to a hand-written `ARTICLE_TEMPLATES` entry with curated title, author, date, and content paragraphs. Downloads images and assigns cover + gallery.

To add coverage for a new event: add a regex entry to `MERGE_GROUPS` and a corresponding template to `ARTICLE_TEMPLATES`.

### Styling

Vanilla CSS in `src/app/globals.css`. No Tailwind, no CSS modules, no CSS-in-JS.

- Primary blue: `#4A90E2`
- Accent red: `#FF6B6B`
- Responsive breakpoints at 768px and 480px
- Font: Roboto (loaded via Google Fonts import)

### Key Client Components (from build artifacts)

- `HeroSlider` — Image carousel on the homepage
- `HighlightsGrid` — Grid layout for highlight cards

### Static Assets

- `public/images/news/` — Article images (auto-downloaded by the scraper script)
- `public/icons/` — Social media SVG icons (Facebook, Instagram, YouTube)
- `public/logo.png` — TNSA logo

## TypeScript Config

- `strict: false`
- Target: ES2017
- JSX: preserve (Next.js handles transform)
- `resolveJsonModule: true` — JSON imports are enabled
