# SinoName

An English-first cultural naming experience that creates one natural Chinese name and explains its linguistic, poetic, and optional Daoist or Buddhist dimensions.

## License

Copyright © 2026 SinoName. All rights reserved. This is proprietary software;
no permission is granted to use, copy, modify, distribute, host, deploy, or
create derivative works from this project without prior written authorization.
See [`LICENSE`](./LICENSE) for the complete terms. Third-party dependencies,
fonts, and other separately licensed materials remain subject to their own
licenses.

## Stack

- Next.js App Router and TypeScript
- DeepSeek Chat Completions in JSON mode
- Upstash Redis for anonymous limits, one-time tickets, caching, and 30-day results
- Cloudflare Turnstile for browser verification
- Vercel deployment target

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

The checked-in example enables local demo mode. Demo mode returns deterministic sample names without calling DeepSeek, Redis, or Turnstile. It is disabled automatically in production even if the variable is accidentally left enabled.

## Production configuration

Set these environment variables in Vercel:

- `APP_SECRET`: at least 32 random characters
- `DEEPSEEK_API_KEY`
- `DEEPSEEK_MODEL`: defaults to `deepseek-flash`
- `DEEPSEEK_BASE_URL`: defaults to `https://api.deepseek.com`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`: the production origin, such as `https://example.com`
- `GOOGLE_ANALYTICS_ID`: GA4 measurement ID; production only

Set `ENABLE_DEMO_MODE=false` in production. Rate limits are disabled during local
development and enforced automatically when `NODE_ENV=production`.

The API fails closed in production when Redis, Turnstile, the application secret, or DeepSeek is not configured. This prevents an apparently working deployment from silently losing abuse protection.

## Anonymous abuse controls

The generation path uses several independent checks:

1. A signed, HttpOnly anonymous visitor cookie.
2. A five-minute ticket bound to the normalized form payload.
3. Single-use ticket consumption in Redis.
4. Server-side Turnstile verification for every generation.
5. One successful new generation per visitor per day.
6. Five successful generations per IP hash per hour and fifteen per day.
7. A per-visitor generation lock to block concurrent duplicate calls.
8. Thirty-day HMAC-keyed result caching.
9. Fixed request and model-output limits.

The Vercel Firewall should also rate-limit `/api/generate` and `/api/ticket` before requests reach the functions. A practical Hobby-plan starting point is:

- `/api/generate`: 10 requests per minute per IP, return 429
- `/api/ticket`: 20 requests per minute per IP, return 429

Treat these as coarse perimeter limits; the Redis rules remain the product-level source of truth.

## Privacy behavior

- The full birth date is converted into seasonal context before model generation.
- The generated result and anonymous visitor ID expire after 30 days.
- Cache keys are HMAC-based and cannot be used as plain hashes of user-entered data.
- IP addresses are HMAC-hashed before rate-limit storage.
- Result IDs are random UUIDs and are excluded from search indexing.

Before public launch, replace the MVP privacy summary with operator details, contact information, applicable retention terms, and final provider disclosures.

## Verification

```bash
npm run typecheck
npm run build
```

`PRODUCT.md` records the strategic decisions. `DESIGN.md` and `.impeccable/design.json` contain the visual system and component rules.

## Clear development history

With the development server running, execute `npm run clear`. This opens
`http://localhost:3000/dev/clear` in your default browser, removes this site's
cached name results and latest-result pointer, then opens `/create`.
There is no reset control in the product interface.

For another port or local hostname, use `npm run clear -- http://localhost:3001`.
Use the same hostname, browser, and profile in which you created the result;
if necessary, copy the URL printed by the command into that browser.
Only local browser result history is removed; server caches and rate limits
remain unchanged. The cleanup route returns 404 outside development, and the
command refuses to run with `NODE_ENV=production`.

## Search and AI discovery

Public naming questions, worked examples, and editorial information are available
at `/faq`, `/chinese-name-examples`, and `/about`. Run `npm run check:discovery`
after deployment for basic discovery checks. See [search and AI discovery](docs/search-discovery.md)
for crawler access, Search Console submission, measurement, and content maintenance.
