# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Wells of Change is a single-page, multilingual (en / pt-BR / es / fr) marketing site for an NGO that
builds solar-powered water wells. It ships as static files to GitHub Pages under the custom domain
`wellsofchange.com` (see `CNAME`). All content is hardcoded in React components, and nothing calls
an API at runtime.

## Commands

```bash
npm install
npm run dev          # Express + Vite middleware on http://localhost:5000
./start-dev.sh       # Pure Vite dev server, port 5000 (no Express), enough for all frontend work
npm run check        # tsc typecheck (noEmit); there is no linter and no test suite

npm run build:site         # What CI builds: vite build --base=/ then the prerender; output in dist/public/
./preview-build.sh         # Build with relative paths and serve on http://localhost:8080
./verify-deployment.sh     # Check a local build
./test-deployed-site.sh https://www.wellsofchange.com/   # Check the live site
```

Deploy happens on push to `main` through `.github/workflows/deploy.yml`, which builds, verifies the
base path, deploys, then smoke-tests the live URL. Don't deploy by hand.

### Base-path trap

CI builds with `--base=/` because the site lives on an apex domain. The older helper scripts
(`build-github-pages.sh`, `build-to-root.sh`, `deploy.sh`) still hardcode `--base=/wellsofchange/`
from the days of `jonyfs.github.io/wellsofchange/`, as does the README. A build made with those
scripts produces asset URLs that 404 in production. Use `--base=/` unless you are deliberately
testing the project-page layout.

`move-to-root.sh` and `build-to-root.sh` copy build output into the repo root, left over from an
older manual deploy. Root `assets/`, `404.html`, and `.nojekyll` are still committed and are stale.
GitHub Actions serves from `dist/public/`, so nothing in the root build output reaches production.
Don't refresh those files as part of a normal change.

## Architecture

**The page is prerendered at build time.** `scripts/prerender.mjs` builds an SSR bundle from
`client/src/entry-server.tsx`, renders the app to a string, and injects it into
`dist/public/index.html`. Crawlers that do not run JavaScript, which includes most AI crawlers,
would otherwise receive an empty root div. The client still mounts with `createRoot`, which discards
the server markup and renders from scratch, so there is no hydration step to mismatch. The
prerendered language is `PRERENDER_LANGUAGE` in `i18n.tsx`, currently `pt-BR`, matching the `lang`
attribute and the metadata in `client/index.html`. Anything running at module scope or during the
first render must tolerate having no `window`.

The site is frontend-only in practice. `client/src/pages/Home.tsx` renders every section in page
order (Hero, WhatWeDo, OurCommitment, MissionStatement, OurStory, WhoWeAre, Partners, CodeOfEthics,
TogetherForChange) plus `Navigation`, `Footer`, and `DonateFAB`. Reordering the site means
reordering that file. Wouter routes only `/` and a 404, with `base={import.meta.env.BASE_URL}`.

`server/`, `shared/schema.ts`, and Drizzle are dead scaffolding from the Replit template.
`registerRoutes` registers nothing, storage is an in-memory user map nobody calls, and neither
running nor deploying the site needs `DATABASE_URL`. `npm run dev` uses the server only to host Vite
middleware. Don't build features on it without a deliberate decision to add a backend.

All text lives in `client/src/lib/i18n.tsx` (~800 lines): a `LanguageProvider` context plus one
translation dictionary per language. Components read copy with `const { t } = useLanguage()` and
`t("section.key")`. Any user-visible string needs an entry in all four languages, since a miss falls
back to printing the raw key. Language comes from `localStorage["wellsofchange-language"]`, else
from `navigator.language` matched by prefix (`pt*` gives pt-BR, then `es*`, `fr*`, else en).

Images are imported from `attached_assets/` through the `@assets` alias so Vite hashes and bundles
them. Filenames carry a timestamp suffix (`20201129_170751_1762441521443.jpg`) and near-duplicates
exist, so check which one a component actually imports before touching one. The aliases are `@` for
`client/src`, `@shared` for `shared`, and `@assets` for `attached_assets`.

Donations are Brazilian PIX only, generated client-side in `DonationDialog.tsx`. `qrcode-pix` builds
the BR Code from the NGO's CNPJ and `qrcode` renders it to a data URL. `qrcode-pix` replaced
`pix-utils` because that library needs Node's Buffer and broke the browser build, so keep it that
way.

## Conventions

- shadcn/ui and Radix live in `client/src/components/ui/`. Those files are generated, so edit them only with intent (`components.json`).
- `client/src/components/examples/*` are one-line Replit preview wrappers, not tests. Nothing imports them.
- Interactive and text elements carry `data-testid` (`button-hero-doar`, `text-hero-title`). Follow the pattern.
- The theme is HSL CSS variables in `client/src/index.css` (light and dark), consumed through `tailwind.config.ts`. Custom tokens beyond the shadcn defaults are `--golden` (the donate accent) and the `hover-elevate` / `active-elevate-2` / `toggle-elevate` interaction utilities documented inline in that file.
- Fonts load from Google Fonts in `client/index.html` (Poppins, Inter, Space Mono). Note that `font-display` appears in components while `tailwind.config.ts` defines only `sans`, `serif`, and `mono`, so that class currently resolves to nothing.
- SEO markup (meta tags, Open Graph, Schema.org JSON-LD) lives in `client/index.html` and is Portuguese-first. Update it when org facts change.
- `design_guidelines.md` holds the typography, spacing, and section-layout rules for the site.

## Docs

`docs/` and the root `*_FIX*.md` and `DEPLOY*.md` files are a large pile of overlapping deployment
write-ups from the GitHub Pages debugging period. They are historical and partly contradict the
current `--base=/` setup. Trust `.github/workflows/deploy.yml` over any of them.
