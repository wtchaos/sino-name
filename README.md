# Named in Hanzi

An English-first cultural naming experience that creates one natural Chinese name and explains its linguistic, poetic, and optional Daoist or Buddhist dimensions.

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

Set `ENABLE_DEMO_MODE=false` and `ENFORCE_RATE_LIMITS=true` in production.

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
