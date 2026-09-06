---
name: seo-content
description: Write or revise the site's search-facing text - page title, meta description, social card copy, structured data, image alt text, headings - so it works for Google and for AI answer engines. Use when changing any of that text, or when asked why the site does not appear in search.
---

# Writing the site's search-facing text

Two audiences read this site without a browser: a search crawler building an index, and an answer
engine assembling a reply to a question someone typed. They reward different things.

A search crawler matches a query to a page. An answer engine looks for a specific, attributable
claim it can restate. "We bring clean water to communities in need" is unquotable. "Wells of Change
built its first solar-powered well in Campo Formoso, Bahia, serving families who previously walked
to collect water" can be quoted, and names a place an engine can match against a question.

Prefer the specific claim everywhere: the description, the structured data, the headings, the alt
text.

## Every claim must be true

This site asks strangers for money on behalf of a real organization. Its CNPJ, bank details, founding
date, team roles, and project locations are public statements of fact. Do not round a number up, do
not invent a count of wells or people served, and do not describe a project as complete when it is
under way.

When copy needs a fact you do not have, ask for it. Leaving it out is better than approximating it.

## Where the text lives

Search-facing text is split across two places, and this catches people out:

- `client/index.html` holds the title, meta description, keywords, Open Graph and Twitter tags, and
  the JSON-LD block. This is static HTML, present before any JavaScript runs, so it is what an AI
  crawler reads. It is currently written in Portuguese only.
- `client/src/lib/i18n.tsx` holds every visible string in four languages. Headings, body copy, and
  button labels come from here at runtime.

A visitor reads the second. A crawler that does not run JavaScript reads only the first. Changing a
heading in the dictionaries does not change what an answer engine can see.

The Portuguese-only metadata conflicts with the constitution's English-only rule and is tracked as
`TODO(INDEX_HTML_LANGUAGE)`. Do not quietly resolve it while editing copy; it needs a decision about
whether the site's primary indexed language is Portuguese.

## Writing the pieces

**Title**, under 60 characters. Name the organization and what it does. It is the clickable line in
a result.

**Meta description**, 70 to 160 characters. Not a keyword list. A sentence a person would read and
act on. Cut it to fit rather than letting Google cut it mid-word.

**Headings** descend without skipping levels, and say what the section contains. One `h1` per page,
which here is the hero headline.

**Alt text** describes what the photograph shows: who, where, what is happening. "Community members
collecting water from the new well in Campo Formoso" beats "well photo". Decorative images take
`alt=""`.

**Structured data**, in the JSON-LD block. This is the highest-leverage text on the site, because it
is machine-readable, present in the raw HTML, and describes the organization directly. Keep it
consistent with the visible copy. A `FAQPage` block answering the questions donors actually ask
(where the money goes, who runs the organization, how a well is maintained) would give answer
engines material they can quote, and none exists yet.

## Verify

```bash
node .claude/skills/seo-check/scripts/check-seo.mjs
```

Then check the structured data at `https://validator.schema.org/` and Google's Rich Results Test.

## What copy cannot fix

The site ships an empty `<div id="root">` and renders in the browser. No amount of rewriting makes
the body text visible to a crawler that does not run JavaScript, and the four languages share one
URL, so only the served language can be indexed. Both are build and routing problems, not writing
problems. Say so rather than compensating with keyword-stuffed metadata.
