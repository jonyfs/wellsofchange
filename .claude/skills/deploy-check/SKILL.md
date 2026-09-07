---
name: deploy-check
description: Build the site the way CI does and verify the output before it is merged and later published. Use before opening a pull request that touches components, assets, index.html, or build configuration.
disable-model-invocation: true
---

# Pre-deploy verification

Merging to `main` deploys to `jonyfs.github.io/wellsofchange/`. It does not publish the public site:
`www.wellsofchange.com` is served from a different GitHub account, and someone there has to copy the
change across. This check is the last point where a broken build is cheap to fix, and the only one
that happens automatically.

## The base path trap

CI builds with `--base=/` because the site is served from the root of its own domain. The older
helper scripts in the repository root (`build-github-pages.sh`, `build-to-root.sh`, `deploy.sh`) and
the README still hardcode `--base=/wellsofchange/` from when the site lived at
`jonyfs.github.io/wellsofchange/`. A build made with those scripts produces asset URLs that return
404 in production.

Never publish with those scripts. They remain in the tree as history.

## Steps

1. Typecheck:

   ```bash
   npm run check
   ```

2. Check translation parity if any copy changed:

   ```bash
   node .claude/skills/i18n-check/scripts/check-i18n.mjs
   ```

3. Build exactly as CI does:

   ```bash
   npx vite build --base=/
   ```

4. Confirm the emitted asset paths are absolute from the root and carry no project prefix:

   ```bash
   grep -o 'src="[^"]*"' dist/public/index.html
   grep -o 'href="[^"]*"' dist/public/index.html
   ```

   Expect `/assets/...`. Anything starting with `/wellsofchange/` means the wrong base was used.

5. Look at the result in a browser. `./preview-build.sh` builds with relative paths and serves the
   root on port 8080, which is enough to catch layout and asset breakage. Check a mobile viewport
   and switch languages while you are there.

## What CI does that this does not

`.github/workflows/deploy.yml` also writes `.nojekyll`, copies `index.html` to `404.html` for
client-side routing, stamps the sitemap date, and runs `test-deployed-site.sh` afterwards. That last
job fails on every run: it targets `www.wellsofchange.com`, which this repository does not publish,
and asserts the old `/wellsofchange/` base path. A red run does not mean the build broke; check the
`build` and `deploy` jobs.

## Do not

- Do not run `move-to-root.sh` or `build-to-root.sh`. They copy build output into the repository
  root, where a stale copy of `assets/`, `404.html`, and `.nojekyll` is already committed and unused.
- Do not deploy by hand with `npx gh-pages`. Deployment happens only through CI on merge to `main`.
