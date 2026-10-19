# findable.page

Website and Cloudflare Worker API for [findable](https://github.com/findable-page/findable) — the offline-first SEO, AEO, and GEO signal auditor.

Powers `https://findable.page`.

## Features

- **Web UI & Landing Pages**: Single-page interactive audit interface, topic guides (`/learn/*`), comparison and landing routes (`/free-seo-scanner`, `/aeo`, `/wordpress`, `/compare`), and legal pages.
- **Audit Engine**: In-worker TS implementation of 80+ SEO, AEO, and GEO checks.
- **Edge API**:
  - `POST /api/scan`: Run full technical SEO/AEO/GEO audit.
  - `POST /api/cwv`: Core Web Vitals via Google PageSpeed Insights.
  - `POST /api/suggest`: On-page AI title, description, and FAQ recommendations via Workers AI.
  - `POST /api/watch`: Track score changes with email alerts (stored in Cloudflare D1).
  - `POST /api/report` & `GET /r/:id`: Permanent 90-day shareable reports (D1-backed).
  - `GET /og/card.png`: Dynamic SVG-to-PNG social card generator (`workers-og`).
  - `GET /i18n/:lang.json`: Multi-language check dictionary (DE, ES, RU, TR).
  - `GET /robots.txt`, `/sitemap.xml`, `/llms.txt`: Discovery and AI crawler contracts.

## Tech Stack

- **Runtime**: [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (`findable-watchers`)
- **AI**: [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
- **Tooling**: [Bun](https://bun.sh), TypeScript, [Biome](https://biomejs.dev), [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Development

```bash
bun install

# Run tests
bun test

# Typecheck and lint
bun run typecheck
bun run lint

# Build learn content from markdown
bun run build:learn

# Local dev server
bun run dev
```

## Deployment

```bash
bun run deploy
```
