# Search and AI discovery

## What is implemented

- Public, server-rendered naming FAQ, three worked examples, and an about/editorial page.
- Dictionary readings and glosses linked beside each example; original interpretations labeled.
- A named project publisher, contact email, and transparent automated-check limitations.
- WebSite, Organization, FAQPage, AboutPage, and CollectionPage markup matching visible content.
- All nine public pages linked internally and listed in the sitemap.
- Explicit OAI-SearchBot and PerplexityBot crawl rules with the same API restriction as the wildcard rule. This does not change training crawler policy.
- Personal result pages remain noindex and outside the sitemap.

FAQ markup describes the visible questions; it does not promise Google FAQ rich results or an AI citation. No llms.txt file or AI-only content fork is required by this implementation.

## Check the deployed site

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before building and deploying. Then run:

```sh
npm run check:discovery
```

For local checks or a different deployment:

```sh
npm run check:discovery -- http://localhost:3000
```

The script performs read-only requests to public pages, robots.txt, and the sitemap. It checks status codes, HTML metadata, noindex directives, sitemap entries, and basic responses with two AI search user-agent strings. It never fetches personal results. Spoofing a user-agent cannot confirm how a CDN handles actual verified crawler IP addresses; inspect CDN and server logs as well. A pass does not guarantee indexing or citation.

In Google Search Console, inspect the homepage and new guide URLs, run a live test, submit `/sitemap.xml`, and request indexing of the new pages. Check the selected canonical and any reported indexing reason. Check Bing Webmaster Tools as another discovery channel. These account actions are not performed by the application.

## Verify crawler access at the edge

Review CDN bot protection logs for legitimate search crawlers receiving challenges or 403/429 responses. Authenticate crawlers using their current official documentation and published IP information before creating any exception. Do not disable site-wide protection or accept a user-agent string alone as proof of identity.

- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Perplexity crawlers: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Google AI search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## Measure useful outcomes

Google Analytics, when configured, already records visits and referral sources. Compare referrals from AI search products with creation-page visits and engaged visits; missing referrers mean analytics is incomplete. Do not send names, full birth dates, or result URLs containing personal identifiers in custom analytics events.

Keep a small manual observation sheet: date, product/model, whether web search was enabled, exact question, whether SinoName was cited, and the cited public URL. Test useful questions such as choosing a Chinese surname or a January zodiac birthday. Treat this as a variable sample, not a stable ranking metric. Monitor changes over weeks rather than assuming a single response represents overall visibility.

## Maintain content honestly

When the naming logic, cache policy, or generation probabilities change, update the FAQ too. For substantive changes, record an actual content update date. Do not invent human reviewers, qualifications, endorsements, testimonials, or popularity claims. Add a named author/reviewer only once their identity and role have been provided and verified. Public examples must remain independent of private visitor results.
