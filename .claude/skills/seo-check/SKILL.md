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

This site sends `<div id="root"></div>` and a script tag. Everything a visitor reads exists only
after the bundle runs. An AI crawler therefore sees the `<head>`: the title, the description, and
the JSON-LD block. Nothing about the wells, the project in Campo Formoso, the partners, or how to
donate.

That is why the structured data carries weight here out of proportion to its size. Until the site
emits real HTML, the JSON-LD is most of what an answer engine can quote.

## Rules for this site

**Structured data is the priority.** The `NGO` block in `client/index.html` is the machine-readable
description of the organization. Keep `name`, `url`, `description`, `logo`, `foundingDate`,
`areaServed`, `founder`, `employee`, and `sameAs` accurate. Every value is a public claim about a
real organization, so treat a wrong one as a defect, not a typo. Validate a change with
`https://validator.schema.org/` and Google's Rich Results Test before merging.

**One host.** Canonical, `og:url`, `sitemap.xml`, and `robots.txt` must agree, and must match the
host the site actually serves from. Two hosts answering the same content splits ranking signals
between them. The apex and `www` question is tracked as `TODO(CANONICAL_HOST)` in the constitution.

**Update `lastmod`.** A sitemap claiming the page has not changed since 2024 tells crawlers to skip
it. Set it to the deploy date whenever content changes.

**Keep the description under 160 characters and the title under 60.** Longer text is not penalized,
it is simply cut, and the cut usually lands mid-sentence.

**Give every image alt text that describes the photograph**, not the file. These are real
photographs of a real project, and the alt text is what an answer engine can quote about them.

## What this script does not check

Live crawl behavior, Core Web Vitals, backlinks, Google Search Console coverage, and whether a
rendered page differs from the served HTML. Those need the deployed site and external tools.
