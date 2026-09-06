---
name: site-design
description: Design rules for the Wells of Change landing page. Use when creating or changing any UI in this repository - components, sections, spacing, color, typography, or interaction states. Covers the theme tokens in index.css, the elevate interaction system, the type scale, and the section layout patterns the site already uses.
---

# Wells of Change design rules

This site is the public face of an NGO asking strangers for money. Design decisions serve
credibility first. Clean, professional, information-led. Avoid visual experimentation that
undermines trust.

Read `design_guidelines.md` at the repository root for the full reference. This skill carries the
rules that are easy to break in code.

## Never hardcode a color

Every color comes from the HSL CSS variables in `client/src/index.css`, consumed through
`tailwind.config.ts`. Write `bg-primary`, `text-muted-foreground`, `border-card-border`. Never write
a hex value, an `rgb()`, or an arbitrary Tailwind color such as `bg-blue-700`.

Both light and dark palettes are defined. A token added to one MUST be added to the other.

Project-specific tokens beyond the shadcn defaults:

- `--golden` and `--golden-foreground`: the donation accent. Reserved for donation calls to action.
  Using it elsewhere weakens the one action the site exists to drive.
- `--elevate-1` and `--elevate-2`: the backgrounds that the interaction utilities layer on top.

## Use the elevate system for interaction states

Hover and active states come from the utilities documented inline in `client/src/index.css`, not
from ad-hoc opacity or brightness classes:

- `hover-elevate` for a hover background lift
- `active-elevate-2` for the pressed state
- `toggle-elevate` with `data-[state=on]:toggle-elevated` for toggles
- `no-default-hover-elevate` / `no-default-active-elevate` to opt a button or badge out before
  writing a custom interaction

These adjust contrast automatically in both themes. A manual `hover:bg-black/10` does not.

## Type scale

Fonts load from Google Fonts in `client/index.html`: Poppins, Inter, Space Mono. The body is Inter
through `font-sans`.

- H1, hero headline: `text-5xl md:text-6xl lg:text-7xl font-bold`
- H2, section header: `text-4xl md:text-5xl font-bold`
- H3, subsection: `text-3xl font-semibold`
- H4, card header: `text-2xl font-semibold`
- Intro paragraph: `text-xl leading-relaxed`
- Body: `text-base leading-relaxed`
- Caption or metadata: `text-sm`

Known gap: components use a `font-display` class, but `tailwind.config.ts` defines only `sans`,
`serif`, and `mono`, so the class currently resolves to nothing. Poppins is available as the
`--font-display` variable. Either register `display` in the Tailwind `fontFamily` config or stop
using the class. Do not add more uses of it while it is dead.

## Spacing and layout

- Section padding: `py-12` on mobile, `py-20` on desktop
- Container: `max-w-7xl mx-auto px-6`
- Grid gaps: `gap-8`. Vertical stacks: `space-y-6`
- Stay on the 4 / 8 / 12 / 16 / 20 / 24 Tailwind steps. An arbitrary value such as `mt-[37px]`
  means the rhythm is wrong somewhere else.

Section order on the page is defined by `client/src/pages/Home.tsx`. Change the order there, never
by shuffling markup inside a component.

## Section anatomy

Every landing section follows the same shape: an `id` used by the navigation anchors, a heading, a
supporting paragraph, then the content grid. Cards share equal height, a subtle border, and rounded
corners. Reuse `FeatureCard`, `StatCard`, and `CTACard` before writing a new card component.

Mobile first. Every layout is checked at a 375px viewport before it is called done.

## Accessibility

- Text contrast of at least 4.5:1 against its background, in both themes
- Every image carries descriptive alt text
- Heading levels descend without skipping
- Interactive elements have visible focus states and an accessible name
- Labels stay visible; a placeholder is not a label

## Motion

Fade-in on scroll for cards and smooth scrolling between sections. Nothing more. framer-motion is
available but heavy animation reads as unserious on an institutional site.

## Test hooks

Interactive and text elements carry `data-testid` following the existing naming: `button-*` for
actions, `text-*` for copy. Example: `button-hero-doar`, `text-hero-title`.

## Text

Never hardcode a user-visible string. All copy goes through `t("section.key")` and lands in all four
dictionaries in `client/src/lib/i18n.tsx`. Design with the longest translation in mind: German-length
strings are not a concern here, but Portuguese and French run roughly 20% longer than English, so
buttons and headings need room to wrap.
