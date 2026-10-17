// Read-only checks against a deployment; never fetch personal result URLs.
const base = new URL(process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://sinoname.space");
if (!["http:", "https:"].includes(base.protocol) || base.username || base.password) {
  throw new Error("Pass an http(s) site origin without credentials.");
}
const paths = ["/", "/methodology", "/chinese-name-seal", "/chinese-zodiac", "/faq", "/chinese-name-examples", "/about", "/privacy", "/create"];
let failures = 0;
async function request(path, agent = "SinoNameDiscoveryCheck/1.0") {
  try {
    const response = await fetch(new URL(path, base.origin), { headers: { "User-Agent": agent }, signal: AbortSignal.timeout(15000), redirect: "follow" });
    const body = await response.text();
    return { response, body };
  } catch (error) {
    failures++;
    console.error(`FAIL ${path}: ${error.message}`);
    return null;
  }
}
function check(ok, label) {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
}
for (const path of paths) {
  const result = await request(path);
  if (!result) continue;
  const { response, body } = result;
  check(response.status === 200, `${path}: HTTP 200`);
  check(/<title>[^<]+<\/title>/i.test(body), `${path}: title in HTML`);
  check(/<meta\b[^>]*name=["']description["']/i.test(body), `${path}: description in HTML`);
  check(/<link\b[^>]*rel=["']canonical["']/i.test(body), `${path}: canonical in HTML`);
  check(!/<meta\b[^>]*name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*noindex/i.test(body) && !/noindex/i.test(response.headers.get("x-robots-tag") ?? ""), `${path}: no noindex directive`);
}
const robots = await request("/robots.txt");
if (robots) check(robots.response.ok && /sitemap:/i.test(robots.body) && !/disallow:\s*\/\s*(?:\r?\n|$)/i.test(robots.body), "robots.txt: sitemap present and no blanket crawl block");
const sitemap = await request("/sitemap.xml");
if (sitemap) {
  const listed = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => {
    try { return new URL(match[1]).pathname; } catch { return null; }
  });
  for (const path of paths) check(listed.includes(path), `sitemap: ${path}`);
}
for (const agent of ["OAI-SearchBot", "PerplexityBot"]) {
  const result = await request("/", agent);
  if (result) check(result.response.status === 200 && /<title>[^<]+<\/title>/i.test(result.body) && !/just a moment|cf-chl-/i.test(result.body), `${agent}: homepage accessible from this network`);
}
console.log("These checks are diagnostics. A spoofed user agent does not verify access from a real crawler IP or guarantee indexing or citation.");
if (failures) process.exitCode = 1;
