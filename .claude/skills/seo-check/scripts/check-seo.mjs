#!/usr/bin/env node
// Audits the search and AI discoverability surface of the site.
//
// Reads the source files by default, or a build directory when one is passed:
//   node .claude/skills/seo-check/scripts/check-seo.mjs
//   node .claude/skills/seo-check/scripts/check-seo.mjs dist/public
//
// Exit code 1 when any FAIL is reported. WARN and INFO do not fail the run.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const target = process.argv[2];
const paths = target
  ? { html: join(target, "index.html"), robots: join(target, "robots.txt"), sitemap: join(target, "sitemap.xml"), llms: join(target, "llms.txt") }
  : { html: "client/index.html", robots: "client/public/robots.txt", sitemap: "client/public/sitemap.xml", llms: "client/public/llms.txt" };

const findings = [];
const report = (level, check, message) => findings.push({ level, check, message });

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);
const html = read(paths.html);
if (!html) {
  console.error(`No index.html at ${paths.html}`);
  process.exit(1);
}
const robots = read(paths.robots);
const sitemap = read(paths.sitemap);
const llms = read(paths.llms);

// Attribute order in a <meta> tag carries no meaning, so parse the tags rather than assuming
// name comes before content.
const metaTags = [...html.matchAll(/<meta\b([^>]*)>/gi)].map(([, attributes]) => {
  const parsed = {};
  for (const [, key, value] of attributes.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)) {
    parsed[key.toLowerCase()] = value;
  }
  return parsed;
});
const byAttribute = (attribute, value) =>
  metaTags.filter((tag) => tag[attribute]?.toLowerCase() === value.toLowerCase());
const meta = (name) => byAttribute("name", name)[0]?.content ?? null;
const prop = (property) => byAttribute("property", property)[0]?.content ?? null;

// Title and description
const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
if (!title) report("FAIL", "title", "No <title>.");
else if (title.length > 60) report("WARN", "title", `${title.length} chars; Google truncates around 60.`);
else if (title.length < 30) report("WARN", "title", `${title.length} chars; short titles waste the result slot.`);
else report("OK", "title", `${title.length} chars.`);

const description = meta("description");
if (!description) report("FAIL", "description", "No meta description.");
else if (description.length > 160) report("WARN", "description", `${description.length} chars; truncated around 160.`);
else if (description.length < 70) report("WARN", "description", `${description.length} chars; under 70 leaves the snippet thin.`);
else report("OK", "description", `${description.length} chars.`);

// Host consistency
const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1] ?? null;
const hostOf = (url) => {
  try { return new URL(url).host; } catch { return null; }
};
if (!canonical) report("FAIL", "canonical", "No canonical link.");
else {
  const hosts = new Set([hostOf(canonical)]);
  const ogUrl = prop("og:url");
  if (ogUrl) hosts.add(hostOf(ogUrl));
  if (sitemap) for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) hosts.add(hostOf(m[1]));
  if (robots) for (const m of robots.matchAll(/Sitemap:\s*(\S+)/gi)) hosts.add(hostOf(m[1]));
  hosts.delete(null);
  if (hosts.size > 1) {
    report("FAIL", "canonical", `Hosts disagree across canonical, og:url, sitemap, robots: ${[...hosts].join(", ")}. Split signals dilute ranking.`);
  } else {
    report("OK", "canonical", `All URLs use ${[...hosts][0]}.`);
  }
}

// Social cards
for (const [key, getter] of [["og:title", prop], ["og:description", prop], ["og:image", prop], ["og:type", prop], ["twitter:card", meta]]) {
  if (!getter(key)) report("FAIL", "social", `Missing ${key}.`);
}
const w = Number(prop("og:image:width"));
const h = Number(prop("og:image:height"));
if (w && h) {
  if (w < 1200 || h < 630) report("WARN", "social", `og:image is ${w}x${h}; 1200x630 or larger renders as a full-width card.`);
  else report("OK", "social", `og:image ${w}x${h}.`);
}

// Structured data
const blocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
if (!blocks.length) report("FAIL", "structured-data", "No JSON-LD. AI answer engines lean on it heavily.");
for (const [index, block] of blocks.entries()) {
  try {
    const data = JSON.parse(block[1]);
    const type = data["@type"] ?? "(no @type)";
    report("OK", "structured-data", `Block ${index + 1} parses, @type ${type}.`);
    for (const field of ["name", "url", "description", "logo"]) {
      if (!data[field]) report("WARN", "structured-data", `Block ${index + 1} has no "${field}".`);
    }
  } catch (error) {
    report("FAIL", "structured-data", `Block ${index + 1} is not valid JSON: ${error.message}`);
  }
}

// Language signals
const lang = html.match(/<html[^>]*\blang=["']([^"']*)["']/i)?.[1] ?? null;
const hreflang = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']*)["']/gi)].map((m) => m[1]);
const ogLocales = metaTags
  .filter((tag) => /^og:locale(:alternate)?$/i.test(tag.property ?? ""))
  .map((tag) => tag.content);
if (!hreflang.length && ogLocales.length > 1) {
  report("WARN", "language", `${ogLocales.length} og:locale values but no hreflang links. Search engines cannot index the other languages without distinct URLs.`);
} else if (hreflang.length) {
  report("OK", "language", `hreflang: ${hreflang.join(", ")}.`);
}
if (lang) report("INFO", "language", `Served HTML declares lang="${lang}". Crawlers index that language unless per-language URLs exist.`);

// Crawlable content
const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
const text = body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
if (text.length < 200) {
  report("FAIL", "crawlable-content", `Body carries ${text.length} chars of text. Google renders JavaScript, but GPTBot, ClaudeBot, and PerplexityBot generally do not, so they see only the head.`);
} else {
  report("OK", "crawlable-content", `${text.length} chars of text in the served HTML.`);
}

// robots.txt, sitemap, llms.txt
if (!robots) report("FAIL", "robots", "No robots.txt.");
else {
  if (!/Sitemap:/i.test(robots)) report("WARN", "robots", "robots.txt does not point to the sitemap.");
  if (/Disallow:\s*\/\s*$/m.test(robots)) report("FAIL", "robots", "robots.txt disallows the whole site.");
  const aiAgents = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "OAI-SearchBot"];
  const named = aiAgents.filter((agent) => new RegExp(agent, "i").test(robots));
  report("INFO", "robots", named.length ? `Names AI crawlers: ${named.join(", ")}.` : "No AI crawler named. The wildcard rule already allows them; naming them makes the intent explicit.");
}

if (!sitemap) report("FAIL", "sitemap", "No sitemap.xml.");
else {
  const urls = [...sitemap.matchAll(/<loc>/g)].length;
  const lastmod = sitemap.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  report("OK", "sitemap", `${urls} URL(s).`);
  if (lastmod) {
    const age = Math.floor((Date.now() - Date.parse(lastmod)) / 86400000);
    if (age > 180) report("WARN", "sitemap", `lastmod is ${lastmod}, ${age} days old. A stale date tells crawlers not to bother recrawling.`);
  }
}

if (!llms) report("INFO", "llms.txt", "No llms.txt. It is a proposed convention, not a standard, and cheap to add: a plain summary of the organization for AI crawlers.");

// Output
const order = { FAIL: 0, WARN: 1, INFO: 2, OK: 3 };
findings.sort((a, b) => order[a.level] - order[b.level]);
for (const { level, check, message } of findings) {
  console.log(`${level.padEnd(4)} ${check.padEnd(18)} ${message}`);
}
const fails = findings.filter((f) => f.level === "FAIL").length;
const warns = findings.filter((f) => f.level === "WARN").length;
console.log(`\n${fails} fail, ${warns} warn, ${findings.filter((f) => f.level === "OK").length} ok`);
process.exit(fails ? 1 : 0);
