---
name: seo-check
description: Audit how findable the site is in Google and in AI answer engines. Use after changing index.html, the SEO metadata, the structured data, robots.txt, sitemap.xml, or anything that affects what a crawler receives.
---

# Search and AI discoverability audit

```bash
node .claude/skills/seo-check/scripts/check-seo.mjs             # source files
node .claude/skills/seo-check/scripts/check-seo.mjs dist/public # a build
```

Run it against a build before shipping anything that changes `client/index.html` or the files in
`client/public/`. `FAIL` exits non-zero; `WARN` and `INFO` do not.

The script checks title and description length, host consistency across canonical, `og:url`,
`sitemap.xml`, and `robots.txt`, the social card tags, JSON-LD validity, hreflang against the
declared locales, how much text a crawler receives without running JavaScript, and the age of the
sitemap `lastmod`.

## Google and AI answer engines want different things

Google renders JavaScript. It can wait, run the bundle, and index what React produced. AI crawlers
mostly do not: GPTBot, ClaudeBot, PerplexityBot, and similar agents fetch the HTML and read what is
in it.

This site used to send `<div id="root"></div>` and a script tag, which left those crawlers with only
the `<head>`. It is now prerendered at build time by `scripts/prerender.mjs`, so the served HTML
carries the page text in `PRERENDER_LANGUAGE`, currently `pt-BR`.

That prerender is load-bearing for anything an answer engine can say about the organization. If it
silently stops running, the audit's `crawlable-content` check is what catches it, and CI fails the
build rather than deploying an empty page. The other three languages are still invisible to
crawlers, since all four share one URL.

## Rules for this site

**Structured data is the priority.** The `NGO` block in `client/index.html` is the machine-readable
description of the organization. Keep `name`, `url`, `description`, `logo`, `foundingDate`,
`areaServed`, `founder`, `employee`, and `sameAs` accurate. Every value is a public claim about a
real organization, so treat a wrong one as a defect, not a typo. Validate a change with
`https://validator.schema.org/` and Google's Rich Results Test before merging.

**One host.** Canonical, `og:url`, `sitemap.xml`, and `robots.txt` must agree, and must match the
host the site actually serves from. Two hosts answering the same content splits ranking signals
between them. The canonical host is `www.wellsofchange.com`. The apex redirects to it and shares its
certificate, so nothing is split.

**Update `lastmod`.** A sitemap claiming the page has not changed since 2024 tells crawlers to skip
it. Set it to the deploy date whenever content changes.

**Keep the description under 160 characters and the title under 60.** Longer text is not penalized,
it is simply cut, and the cut usually lands mid-sentence.

**Give every image alt text that describes the photograph**, not the file. These are real
photographs of a real project, and the alt text is what an answer engine can quote about them.

## What this script does not check

Live crawl behavior, Core Web Vitals, backlinks, Google Search Console coverage, and whether a
rendered page differs from the served HTML. Those need the deployed site and external tools.
