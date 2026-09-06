<!--
Sync Impact Report
Version change: 1.1.0 → 1.2.0
Bump rationale: MINOR. Principle VI was added, promoting the pull request rule from a workflow
note to a non-negotiable principle. Nothing was removed or redefined incompatibly.
Modified principles:
  - none renamed or redefined
Added sections:
  - VI. Every Change Ships as a Pull Request (NON-NEGOTIABLE)
Removed sections: none
Templates requiring updates: none. Dependent Spec Kit templates read this file at runtime.
Deferred items:
  - TODO(BRANCH_PROTECTION): Principle VI is currently enforced by convention only. Enable branch
    protection on `main` (require a pull request, block force pushes and deletions) so the rule is
    enforced by GitHub rather than by discipline.
  - TODO(CANONICAL_HOST): CNAME holds the apex host wellsofchange.com, while the canonical link
    tag, sitemap.xml, robots.txt, Open Graph tags, and the CI smoke test all use
    https://www.wellsofchange.com/. Decide which host is authoritative and make the other redirect
    to it, then state the answer here.
  - TODO(INDEX_HTML_LANGUAGE): client/index.html carries Portuguese-first SEO metadata
    (title, description, keywords, Open Graph) that is user-facing copy but lives outside the
    i18n dictionaries. Principle I forbids it as written. Decide whether to translate it to
    English, move it under an i18n-driven mechanism, or record a scoped exception.
  - TODO(EXISTING_PORTUGUESE_PROSE): README.md and several files under docs/ contain Portuguese
    sections written before this constitution. They violate Principle I and need a migration pass.
-->

# Wells of Change Constitution

## Purpose and Public Surface

This repository holds the static landing page of the Wells of Change project. It is built from
React sources, published to GitHub Pages, and served to the public at wellsofchange.com. There is
no other deployment target and no staging environment: what lands on `main` is what visitors see.

The site is the organization's public face, so a broken build, a missing translation, or an
incorrect bank detail is visible to donors immediately. Every principle below follows from that.

## Core Principles

### I. English as the Project Language (NON-NEGOTIABLE)

Every artifact authored in this repository MUST be written in English: source code, identifiers,
comments, JSDoc, commit messages, branch names, pull request titles and bodies, issue text, shell
scripts and their console output, documentation, configuration, and file names.

The single exception is the translation dictionaries in `client/src/lib/i18n.tsx`. The `pt-BR`, `es`,
and `fr` dictionaries MUST hold text in their own language; that is their purpose. Translation keys
themselves stay English.

Rationale: the codebase already mixes Portuguese and English in scripts, README, and docs, which
forces every reader to switch languages mid-file and makes search unreliable. One authoring language
removes that cost. Rendered user-facing copy stays multilingual because it flows through the
dictionaries, not through source prose.

### II. All User-Visible Text Flows Through i18n

A user-visible string MUST NOT be hardcoded in a component. Components read copy with
`const { t } = useLanguage()` and `t("section.key")`.

Every new key MUST be added to all four dictionaries (`en`, `pt-BR`, `es`, `fr`) in the same change.
A key present in fewer than four languages is an incomplete change, because a missing key renders
the raw key string to the visitor.

### III. The Site Stays Static

The deployed artifact is static files on GitHub Pages, served at wellsofchange.com. Features MUST
NOT introduce runtime API calls, server-rendered routes, or a database dependency. Anything a
feature needs at runtime MUST be resolvable in the browser or bundled at build time.

`server/`, `shared/schema.ts`, and the Drizzle configuration are inert scaffolding from the original
Replit template; `npm run dev` uses the Express process only to host Vite middleware. Building on
that scaffolding requires an explicit amendment to this constitution, not an incidental commit.

### IV. Deployment Happens Only Through CI

Production deploys MUST come from `.github/workflows/deploy.yml` on a push to `main`. Manual deploy
paths (`deploy.sh`, `build-to-root.sh`, `move-to-root.sh`, `npx gh-pages`) MUST NOT be used to
publish.

Local and CI builds MUST use `--base=/`, because the site is served from the root of its own
domain. The legacy `--base=/wellsofchange/` value produces asset URLs that return 404 in
production, and it MUST NOT be reintroduced.

The custom domain is configured in the repository's GitHub Pages settings; the root `CNAME` file
records it. Changing either one without the other breaks the public URL. Absolute URLs in
`client/index.html`, `client/public/sitemap.xml`, and `client/public/robots.txt` MUST point at the
host the site is actually served from.

Committed build output in the repository root (`assets/`, `404.html`, `.nojekyll`) is stale and
MUST NOT be refreshed as part of feature work.

### V. Typecheck Is the Quality Gate

`npm run check` MUST pass before any change is committed. The project has no test suite and no
linter, so the TypeScript compiler is the only automated gate available.

Any change to rendered output MUST also be verified in a running browser, either through
`npm run dev` or a production preview via `./preview-build.sh`, before it is called done.

### VI. Every Change Ships as a Pull Request (NON-NEGOTIABLE)

No commit reaches `main` except by merging a pull request. This covers every kind of change:
features, copy edits, dependency bumps, documentation, translation fixes, and amendments to this
constitution itself. There is no size threshold below which a direct commit is acceptable.

Concretely:

- Work starts on a branch created from `main`. Committing on `main` locally, then pushing, is a
  direct commit and is forbidden even when the branch was never shared.
- `main` MUST NOT be force-pushed, rewritten, or reset.
- Every pull request states what changed and why, and MUST satisfy Principle V before review is
  requested.
- The author does not merge a pull request that no one has reviewed, other than in an outage where
  the live site is broken. Such an emergency merge MUST be stated in the pull request description.

Rationale: a push to `main` triggers `.github/workflows/deploy.yml` and reaches visitors within
minutes. The pull request is the only point where a second pair of eyes, the typecheck, and the
diff itself can catch a mistake before donors see it.

## Technology and Content Constraints

The stack is React 18, TypeScript, Vite 5, Tailwind CSS, shadcn/ui over Radix, and Wouter for
routing. Replacing any of these is an amendment, not a refactor.

Generated shadcn/ui files under `client/src/components/ui/` are edited only with a stated reason.
Theme values live as HSL CSS variables in `client/src/index.css` and are consumed through
`tailwind.config.ts`; components MUST NOT hardcode hex colors.

Images MUST be imported from `attached_assets/` through the `@assets` alias so Vite hashes and
bundles them. Interactive and text elements carry a `data-testid` attribute following the existing
`button-*` and `text-*` naming.

Section order on the landing page is defined by `client/src/pages/Home.tsx` and is changed there,
not by reordering component internals.

Organization facts published on the site (CNPJ, bank details, PIX key, contact address, partner
names) MUST match the organization's real records. A change to any of them requires confirmation
from the project owner before it is committed.

## Development Workflow

Feature work follows the Spec Kit flow: specify, clarify when the spec is ambiguous, plan, tasks,
then implement. Small, well-understood changes may skip straight to implementation.

All work lands through a pull request, as required by Principle VI.

Before requesting review, the author MUST confirm that `npm run check` passes, that every new
translation key exists in all four dictionaries, and that the change was viewed in a browser.

`docs/` and the root `*_FIX*.md` and `DEPLOY*.md` files are a historical record of the GitHub Pages
debugging period. They partly contradict the current configuration and MUST NOT be treated as the
source of truth; `.github/workflows/deploy.yml` and `CLAUDE.md` are.

## Governance

This constitution supersedes other conventions in the repository. Where `CLAUDE.md`, the README, or
any document under `docs/` conflicts with it, this file wins and the other document is corrected.

Amendments require a pull request that states the change, its rationale, and its effect on existing
code. Version numbers follow semantic versioning: MAJOR for removing or redefining a principle in a
backward-incompatible way, MINOR for adding a principle or materially expanding guidance, PATCH for
clarifications and wording.

Every pull request review MUST verify compliance with the principles above. A change that violates a
principle is either revised or accompanied by an amendment in the same pull request. Deviations MUST
NOT be merged on the promise of a later cleanup.

**Version**: 1.2.0 | **Ratified**: 2026-09-06 | **Last Amended**: 2026-09-06
