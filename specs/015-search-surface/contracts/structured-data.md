# Contract: what the served HTML must contain

**Date**: 2026-09-07

The site exposes no API. Its interface to the outside is the HTML a crawler receives without running
JavaScript, so that is what this contract describes. Anything here has to survive the build and the
prerender and be present in `dist/public/index.html`.

## Consumers

- Search engines reading the head and the prerendered body.
- AI crawlers that fetch and do not execute: GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and the
  others named in `robots.txt`.
- Agents acting on the page rather than reading it, which is what the `DonateAction` entries are for.

## The snippet

```html
<title>…</title>                     <!-- under 60 characters -->
<meta name="description" content="…" />   <!-- under 160 characters -->
```

The description must state three things: what the organization does, where, and that it is a
nonprofit. It must not promise anything the page does not deliver.

`og:title` and `og:description` may phrase things differently for a social card, but must not
contradict the page.

## The organization, additions only

Both additions go inside the existing `NGO` block. Nothing already there is removed.

### Languages the organization can be written to

```json
"contactPoint": {
  "@type": "ContactPoint",
  "contactType": "General Inquiries",
  "email": "wellsofchange@gmail.com",
  "availableLanguage": ["pt-BR", "en", "es", "fr"]
}
```

### How to donate

```json
"potentialAction": [
  {
    "@type": "DonateAction",
    "name": "…",
    "description": "…",
    "recipient": { "@type": "NGO", "name": "Wells of Change" },
    "instrument": { "@type": "Thing", "name": "PIX", "identifier": "43.933.784/0001-13" },
    "target": "https://www.wellsofchange.com/#join-us"
  },
  {
    "@type": "DonateAction",
    "name": "…",
    "description": "…",
    "recipient": {
      "@type": "NGO",
      "name": "Associação Internacional, Poços Mudando as Vidas nas Sociedades"
    },
    "instrument": { "@type": "Thing", "name": "SWIFT", "identifier": "BRASBRRJBHE" },
    "target": "https://www.wellsofchange.com/#join-us"
  }
]
```

The names and descriptions are written during implementation, in the prerendered language, and must
say plainly which path is for donors inside Brazil and which is for donors abroad. The IBAN belongs in
the international entry's description rather than in `identifier`, which holds the SWIFT code that
names the bank.

`target` points at the section that opens the donation dialog. It is not a deep link into the
dialog, because the dialog has no address of its own, and pointing at something that does not exist
would be worse than pointing at the section that leads to it.

## Blocks that stay exactly as they are

`WebSite`, the `ItemList` of `SiteNavigationElement` entries, and `FAQPage`. The FAQ block gains an
HTML comment recording that Google stopped displaying FAQ rich results on 7 May 2026 and that the
block remains for machine understanding. No question or answer changes.

## Guarantees

1. Every block parses as JSON and validates against schema.org.
2. Every claim is true of the organization and is also stated on the page.
3. Bank identifiers match `client/src/components/DonationDialog.tsx` character for character.
4. The additions reach `dist/public/index.html` through a normal build.
5. The audit reports zero failures, and the two length checks are now real checks rather than
   reports.

## Not part of this contract

`hreflang`, additional URLs of any kind, IndexNow, and any claim about how a search result is
displayed.
