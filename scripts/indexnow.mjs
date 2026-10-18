import { mkdir, readFile, writeFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("../lib/indexnow.json", import.meta.url), "utf8"));
const paths = JSON.parse(await readFile(new URL("../lib/public-paths.json", import.meta.url), "utf8"));
const origin = new URL(config.origin).origin;
const args = process.argv.slice(2);
const submit = args.includes("--submit");
const selected = args.filter(arg => arg !== "--submit");
if (submit && selected.length === 0) {
  throw new Error("Specify only added, updated, or deleted public paths, for example: npm run indexnow -- --submit /create /privacy. Do not resubmit the whole sitemap by default.");
}
if (selected.some(path => !paths.includes(path === "/" ? "" : path))) {
  throw new Error("Use public page paths from lib/public-paths.json, such as / or /create. Personal result URLs are excluded.");
}
const urlList = [...new Set(selected.length ? selected : paths)].map(path => new URL(path || "/", origin).href);
const keyLocation = `${origin}/${config.key}.txt`;
const payload = { host: new URL(origin).host, key: config.key, keyLocation, urlList };

if (!submit) {
  console.log("Preview only. Deploy the key file first, then add --submit to notify IndexNow.");
  console.log(JSON.stringify(payload, null, 2));
} else {
  const verification = await fetch(keyLocation, { redirect: "error", signal: AbortSignal.timeout(15000) });
  if (verification.status !== 200 || (await verification.text()).trim() !== config.key) {
    throw new Error("The production key file is unavailable or does not match. Deploy it before submitting.");
  }
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "error",
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 200) {
    console.log(`IndexNow received ${urlList.length} URLs. This does not guarantee indexing.`);
  } else if (response.status === 202) {
    console.log(`IndexNow received ${urlList.length} URLs; key validation is pending. This does not guarantee indexing.`);
  } else {
    const reasons = { 400: "Invalid request", 403: "Key verification failed", 422: "Host or URL mismatch", 429: "Rate limited; retry later" };
    throw new Error(`IndexNow HTTP ${response.status}: ${reasons[response.status] ?? "Submission failed"}`);
  }
  const submittedAt = new Date().toISOString();
  const directory = new URL("../.indexnow/", import.meta.url);
  await mkdir(directory, { recursive: true });
  const receipt = new URL(`${submittedAt.replace(/[:.]/g, "-")}.json`, directory);
  await writeFile(receipt, JSON.stringify({ submittedAt, endpoint: "https://api.indexnow.org/indexnow", status: response.status, host: payload.host, keyLocation, urlList }, null, 2) + "\n");
  console.log(`Receipt saved to ${receipt.pathname}. Verify receipt of these URLs in Bing Webmaster Tools → IndexNow.`);
}
