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
- `NEXT_SITE_URL`: the production origin, such as `https://example.com`
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

### IndexNow notifications

The verification file in `public/` and its matching key in `lib/indexnow.json`
must be deployed before the first submission. The configured production origin
is `https://www.sinoname.space`; keep it aligned with `NEXT_SITE_URL`.

```bash
# Preview all public URLs without sending a request
npm run indexnow
# After deploying changes, submit only newly added or updated paths
npm run indexnow -- --submit /create /privacy
# For later content changes
npm run indexnow -- --submit /
npm run indexnow -- --submit /chinese-name-examples /methodology
```

The script verifies the deployed key before sending URLs to IndexNow's shared
endpoint. HTTP 200 means received; 202 means received with key validation pending.
Each accepted submission saves a local receipt under `.indexnow/` (excluded from
Git). Confirm submitted URLs in Bing Webmaster Tools → IndexNow; an HTTP receipt
alone is not evidence of indexing. No-argument `--submit` is rejected to prevent
unnecessary sitemap-wide submissions. The script is manually triggered, not a
build hook: run it only after the changed production pages are deployed. Do not
submit historical unchanged URLs when first enabling IndexNow. For a removed
public URL, notify it while its path is still in `lib/public-paths.json`, then
remove it from that list; the production URL must already return 404 or 410.
Neither guarantees crawling, indexing, or ranking. Submit when content changes,
not on a daily schedule. The sitemap and script share `lib/public-paths.json`;
personal result, API, and development URLs cannot be submitted through this script.
The verification key is intentionally served publicly and is not a Bing account
credential. No Bing Webmaster API credential is required.

Content revision dates are maintained in `lib/content-updates.json`. Update only
entries whose page content actually changed; unknown dates are omitted from the
sitemap. Never regenerate all dates just because a build ran.

### Generator funnel in GA4


With `GOOGLE_ANALYTICS_ID` configured in production, the `/create` wizard queues these events even when the Google script is still loading:

| Event | Meaning |
| --- | --- |
| `generator_open` | Wizard opened |
| `generator_step_view` | Step displayed (`step_number`: 1, 2, or 3) |
| `generator_step_complete` | Validated Continue, or submitted step 3 |
| `generator_submit` | Generation request started after verification |
| `generator_success` | A result was received |
| `generator_error` | Request failed (no raw error text is sent) |

Step views fire once per step per mounted wizard; returning to an earlier step does not inflate views. Completions/submissions count attempts, including retries. Events include `funnel_name: name_generator`, but never include profile values, names, birth dates, or generated content.

In GA4, use **Explore → Funnel exploration** with sequential conditions:
`generator_open` → `generator_step_view` with `step_number = 2` → `generator_step_view` with `step_number = 3` → `generator_submit` → `generator_success`.
Register `step_number` as an event-scoped custom dimension to use it in explorations. For a completion funnel, use `generator_step_complete` and its step number instead. Confirm new events in Realtime after deployment; these events cannot reconstruct historical step progress. Browser blockers and analytics consent settings can reduce measured counts.
