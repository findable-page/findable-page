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

## Optional AI-suggestion access pilot

The free scanner, reports and watch signups remain independent. For a hosted paid-AI
pilot related to #7, set Worker bindings `LONGPLAY_SUGGEST_FEATURE_ID` (access Feature),
`LONGPLAY_BASE_URL` (explicit HTTPS API origin), `LONGPLAY_APP_ID`, and
`LONGPLAY_ENVIRONMENT` (`sandbox`/`live`). With no Feature configured, existing behaviour
is unchanged and no billing calls are made. No Server Key is needed in this consumer.

`POST /api/suggest` then requires `Authorization: Bearer <Customer access token>` from
the authenticated purchase/account flow. The SDK verifies only that token's Customer
in the configured App/environment; the body cannot choose a Customer or local plan flag.
Access is checked before internal cache lookup, public-page fetch or Workers AI. Denial
returns 402, a missing session 401, and an unavailable billing service 503. Paid responses
are `no-store`, while public suggestion data may still use the existing internal cache
after admission. Access-check attempts have their own IP limit. Page text, URLs and
keyphrases are never sent to Longplay.

This is one optional capability boundary, not Pro/Agency checkout, account issuance,
site quotas, metering, white-label exports or a deployed payment flow. Operators must
provide approved plans and authenticated Customer sessions before enabling the gate.
Only access Features are supported: a metered balance observation is not a reservation.
Keep Customer credentials out of URLs, HTML, analytics and logs; reset them on sign-out.
