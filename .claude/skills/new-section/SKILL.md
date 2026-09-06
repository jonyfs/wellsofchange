---
name: new-section
description: Add a new section to the landing page with its component, its translations in all four languages, and its wiring into the page. Use when asked to add a section, block, or band to the site.
disable-model-invocation: true
---

# Add a landing page section

A section is not done when its component renders. It is done when it is translated four times,
placed in the page order, reachable from the navigation if it needs to be, and checked in a browser.
Missing any one of those ships a visible defect.

## 1. The component

Create `client/src/components/<Name>.tsx`. Start from an existing section rather than a blank file:
`WhatWeDo.tsx` for a card grid, `MissionStatement.tsx` for centered prose, `OurStory.tsx` for a
two-column layout.

Rules that apply to every section:

- The root element carries an `id` in kebab case (`id="what-we-do"`). Navigation anchors and the
  hero scroll button target it.
- Copy comes from `const { t } = useLanguage()` and `t("<section>.<key>")`. No hardcoded strings.
- Colors come from theme tokens. See the `site-design` skill.
- Section padding is `py-12 md:py-20`, the container is `max-w-7xl mx-auto px-6`.
- Text and interactive elements carry `data-testid` in the existing style: `text-*` for copy,
  `button-*` for actions.
- Reuse `FeatureCard`, `StatCard`, or `CTACard` before writing another card component.

Images are imported through the `@assets` alias so Vite hashes and bundles them:

```tsx
import photo from "@assets/<file>.jpg";
```

`attached_assets/` holds near-duplicate files with timestamp suffixes. Confirm which file you want
before importing, and give every image descriptive alt text.

## 2. The translations

Add a block under each of the four dictionaries in `client/src/lib/i18n.tsx`, in the same order
(`en`, `pt-BR`, `es`, `fr`). Keys are English; values are translated. Write real copy in each
language rather than repeating the English string.

Verify:

```bash
node .claude/skills/i18n-check/scripts/check-i18n.mjs
```

## 3. The page

Import the component in `client/src/pages/Home.tsx` and place it inside `<main>` at the position it
should occupy. That file defines the page order; nothing else does.

## 4. The navigation

If the section should appear in the header menu, add an entry to `navLinks` in
`client/src/components/Navigation.tsx` with an `href` matching the section `id`, and add the label to
all four dictionaries under `nav`.

## 5. Verify

```bash
npm run check
npm run dev
```

Look at the section at a 375px viewport and at desktop width, switch through all four languages, and
confirm the navigation anchor scrolls to the right place.
