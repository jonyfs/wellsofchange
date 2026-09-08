# Implementation Plan: More of the organization visible in a search result

**Branch**: `spec/015-search-surface` | **Date**: 2026-09-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/015-search-surface/spec.md`

## Summary

The site is one page at one address, so sitelinks are out of reach and the spec says so. What is left
for a single document is the snippet a result renders and the facts a machine can extract, and this
plan changes exactly those two things plus the documentation that would otherwise send the next
person down the wrong path.

Three edits to `client/index.html`, one comment in the SEO skill, and a check added to the audit
script. No new files ship to the site, no dependency is added, and no visitor-facing pixel changes.

## Technical Context

**Language/Version**: TypeScript 5, React 18, built with Vite 5. This feature touches almost none of
it: the work is in `client/index.html`, which is static markup outside the React tree.

**Primary Dependencies**: None added. The changes are metadata and JSON-LD.

**Storage**: N/A.

**Testing**: `npm run check` (tsc), `node .claude/skills/seo-check/scripts/check-seo.mjs dist/public`
against a build, plus schema.org's validator for the structured data.

**Target Platform**: The served HTML, read by search engines and by AI crawlers that do not run
JavaScript. Everything here is in the `<head>`, so it reaches those crawlers through the existing
prerender.

**Project Type**: Static single-page marketing site.

**Performance Goals**: None. The additions are a few hundred bytes of JSON-LD in a document that
already carries 66 KB of prerendered markup.

**Constraints**: The title stays under 60 characters and the description under 160, since past those
lengths a search engine cuts rather than penalises. Every fact added has to be true of a real
organization and already published on the site.

**Scale/Scope**: One HTML file, one skill document, one audit script. No component, no route, no
translation key.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Applies | How this plan satisfies it |
|---|---|---|
| I. English as the project language | Yes | The plan, research and contracts are in English. The metadata values stay Portuguese, matching `PRERENDER_LANGUAGE` and the rest of the head, which principle I exempts as published content rather than project language. |
| II. All user-visible text flows through i18n | Partly | `client/index.html` metadata sits outside the dictionaries. That is the pre-existing `TODO(INDEX_HTML_LANGUAGE)`, not something this feature introduces, and this feature does not widen it: no new string is added to a component. |
| III. The site stays static | Yes | Nothing added runs at runtime. JSON-LD and meta tags are inert markup. |
| IV. Publishing is two steps | Yes | Merging here reaches `jonyfs.github.io/wellsofchange/` only. Nothing in the plan claims a change is live, and nothing depends on the published site. |
| V. Typecheck is the quality gate | Yes | `npm run check` runs, though it will not exercise these files. The audit script is the real gate here, and a check is added to it. |
| VI. Every change ships as a pull request | Yes | One branch, one pull request. |
| VII. Prose is edited before it ships | Yes | Every document produced here goes through the humanizer skill. |

No violations. The Complexity Tracking table is therefore empty and has been removed.

**Re-checked after Phase 1.** The design added two `DonateAction` entries and one `availableLanguage`
list to a JSON-LD block, which changes nothing about any gate. Principle II is the only one worth a
second look: the donation identifiers now appear in `client/index.html` as well as in the dialog, and
those are numbers rather than prose, so they do not belong in the translation dictionaries. What that
duplication does create is a way for the two copies to drift, so the quickstart compares them
directly rather than trusting that they match.

## Project Structure

### Documentation (this feature)

```text
specs/015-search-surface/
├── spec.md
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output, the facts and where each comes from
├── quickstart.md        # Phase 1 output, how to verify
├── contracts/
│   └── structured-data.md   # What the served HTML must contain
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
client/
├── index.html                     # title, description, and the JSON-LD blocks
└── public/
    └── llms.txt                   # read only: the section list stays as it is

.claude/skills/
├── seo-check/
│   ├── SKILL.md                   # record what FAQ markup does and no longer does
│   └── scripts/check-seo.mjs      # add the title and description length assertions
└── seo-content/
    └── SKILL.md                   # same correction, where the FAQ advice lives
```

**Structure Decision**: No new source directory. The feature lives entirely in the static head of
`client/index.html`, which is the only file on the site whose contents a crawler reads before running
anything. The two skill documents are updated because they are what the next person reads before
touching that file, and a stale reason there costs more than a stale tag.
