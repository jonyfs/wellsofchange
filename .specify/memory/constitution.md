<!--
Sync Impact Report
Version change: 2.0.0 → 2.1.0
Bump rationale: MINOR. Principle VII was added. Nothing was removed or redefined.
Modified principles: none
Added sections:
  - VII. Prose Is Edited Before It Ships
Removed sections: none
Templates requiring updates: none. Dependent Spec Kit templates read this file at runtime.
Deferred items:
  - TODO(DOMAIN_OWNERSHIP): wellsofchange.com points at wellsofchange.github.io, an account other
    than the one holding this repository, and its copy of the site is older than this repository's
    main. Whoever owns that account has to publish for a change here to reach donors. Moving the
    domain onto this repository would remove the manual step; the project has chosen to keep the
    current arrangement for now.
  - TODO(PREVIEW_BASE_PATH): CI builds with --base=/ while publishing under
    jonyfs.github.io/wellsofchange/, so the preview's asset URLs 404 and its JavaScript never runs.
    The prerendered text hides this. A relative base would serve both mount points.
  - TODO(CI_TEST_JOB): the post-deploy test job runs test-deployed-site.sh against
    www.wellsofchange.com, a site this repository does not publish, and asserts a base path the
    build no longer uses. Every run is therefore red. Accepted for now as known noise.
  - TODO(APEX_TLS): https://wellsofchange.com fails certificate verification. http:// redirects to
    https://www., so only visitors who type the apex with https see the error.
  - TODO(BRANCH_PROTECTION): principle VI is enforced by convention and a local hook. Branch
    protection on main is the enforcement that does not depend on either.
  - TODO(INDEX_HTML_LANGUAGE): client/index.html carries Portuguese-first SEO metadata outside the
    i18n dictionaries, which principle I forbids as written. The prerender makes the question
    sharper, since the prerendered language is what a crawler receives.
  - TODO(EXISTING_PORTUGUESE_PROSE): README.md and several files under docs/ contain Portuguese
    sections written before this constitution.
-->

# Wells of Change Constitution

## Purpose and Public Surface

This repository holds the source of the Wells of Change static landing page. It does not publish
the public site.

`www.wellsofchange.com` resolves to `wellsofchange.github.io`, a GitHub account separate from the
one holding this repository. A merge to `main` here builds and deploys to
`jonyfs.github.io/wellsofchange/` and stops there. For a change to reach donors, someone with access
to that other account has to publish it.

Treat this repository as the source of truth for the site's content and the staging ground for its
changes, and treat publishing as a manual step that happens elsewhere. The site is the
organization's public face, so a broken build, a missing translation, or an incorrect bank detail
reaches donors once it is published. Every principle below follows from that.

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

The deployed artifact is static files on GitHub Pages, served from the root of whichever host
publishes them. Features MUST
NOT introduce runtime API calls, server-rendered routes, or a database dependency. Anything a
feature needs at runtime MUST be resolvable in the browser or bundled at build time.

`server/`, `shared/schema.ts`, and the Drizzle configuration are inert scaffolding from the original
Replit template; `npm run dev` uses the Express process only to host Vite middleware. Building on
that scaffolding requires an explicit amendment to this constitution, not an incidental commit.

### IV. Publishing Is Two Steps, and Only the First Is Automated

A merge to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys to
`jonyfs.github.io/wellsofchange/`. That is the whole of what this repository can do on its own.

The public site at `www.wellsofchange.com` is served from `wellsofchange.github.io`, a different
account. Reaching donors requires someone with access to it to publish. A pull request description
MUST NOT claim a change is live, and "merged" MUST NOT be read as "published".

Within this repository, deploys still happen only through the workflow. The manual paths
(`deploy.sh`, `build-to-root.sh`, `move-to-root.sh`, `npx gh-pages`) MUST NOT be used, and the
committed build output in the repository root (`assets/`, `404.html`, `.nojekyll`) is stale and MUST
NOT be refreshed as part of feature work.

Absolute URLs in `client/index.html`, `client/public/sitemap.xml`, and `client/public/robots.txt`
name `www.wellsofchange.com`, the host visitors reach, not the address CI deploys to. That is
deliberate: those files travel to production with the content.

The build's base path is unresolved and tracked as `TODO(PREVIEW_BASE_PATH)`. `--base=/` matches the
production domain root and breaks the preview, whose assets sit under `/wellsofchange/`. Do not
change it in one direction without accounting for the other.

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
  the published site is broken. Such an emergency merge MUST be stated in the pull request
  description.

Rationale: `main` is what gets published, whether that happens minutes or weeks later, and the
pull request is the only point where a second pair of eyes, the typecheck, and the diff itself can
catch a mistake before it becomes what someone copies to production.

### VII. Prose Is Edited Before It Ships

Text written for a person to read MUST be passed through the `humanizer` skill before it is
committed. That covers site copy in every language, the translation dictionaries, documentation,
specifications, README files, pull request and issue text, and anything else a reader encounters as
writing rather than as code.

The skill removes the patterns that mark text as machine-produced: inflated claims about
significance, sales language, vague attributions, forced groups of three, stock transitions, hedging
piled on hedging, and headings that repeat themselves in the first sentence. It preserves the
document's language, so a Portuguese page stays Portuguese, and it MUST NOT add a fact, a number, a
date, or a source that the original did not contain.

Exempt: code and its comments, configuration, machine-generated files, lockfiles, CHANGELOG entries,
commit messages, and any text quoted verbatim from a source, including the bank's own wording and
the organization's legal filings.

Rationale: this site asks strangers to trust an organization with their money. Copy that reads as
generated undercuts that before a word of it is judged on content, and an NGO's credibility is the
only asset it has. The rule is on the artifact, not on the tool that produced it: text written by a
person that reads as filler gets the same edit.

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
translation key exists in all four dictionaries, that any prose in the change went through the
`humanizer` skill, and that the change was viewed in a browser.

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

**Version**: 2.1.0 | **Ratified**: 2026-09-06 | **Last Amended**: 2026-09-06
