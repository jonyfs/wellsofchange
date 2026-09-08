# Data model: the facts the served HTML publishes

**Date**: 2026-09-07

There is no database here and no runtime state. The "model" is the set of claims about a real
organization that the served HTML makes to machines, and where each one comes from. FR-008 makes a
wrong value a defect rather than a typo, so the source column is the point of this document.

## The organization

Published in the `NGO` block in `client/index.html`.

| Field | Value | Source | Status |
|---|---|---|---|
| `@type` | `NGO` | The organization's own description | Present. This is also the nonprofit statement; see research.md |
| `name` | Wells of Change | Site header | Present |
| `legalName` | Associação Internacional, Poços Mudando as Vidas nas Sociedades | The name registered with the bank, shown in the donation dialog | Present |
| `taxID` | 43.933.784/0001-13 | The CNPJ shown in the donation dialog and the consent question of the volunteer form | Present |
| `foundingDate` | 2020 | The "Our Story" section | Present |
| `url`, `logo`, `image` | The canonical host | The site itself | Present |
| `description`, `mission`, `slogan` | Portuguese, matching the page | The hero and mission sections | Present |
| `knowsAbout` | Seven subjects | The what-we-do and commitment sections | Present |
| `areaServed` | Campo Formoso, Brazil, Senegal | The commitment section and the field-work question of the volunteer form | Present |
| `address` | Rio de Janeiro, RJ, BR | The footer and the international transfer details | Present |
| `contactPoint.email` | wellsofchange@gmail.com | The footer | Present |
| `contactPoint.availableLanguage` | pt-BR, en, es, fr | The four languages the site publishes in | **To add** |
| `sameAs` | Facebook, Instagram, LinkedIn | The footer's social links | Present |
| `founder`, `employee` | Seven people with roles | The "Who We Are" section | Present |
| `potentialAction` | Two `DonateAction` entries | The donation dialog | **To add** |

The footer also links TikTok and YouTube, which `sameAs` does not list. Adding them is not required by
any requirement here, and the same-as list is a claim about identity rather than a link dump, so this
is recorded rather than acted on.

## The two ways to donate

FR-005. Both are already visible in the donation dialog; neither reaches a crawler, because the
dialog renders from React state.

| | From Brazil | From abroad |
|---|---|---|
| Instrument | PIX | SWIFT transfer |
| Identifier | The CNPJ, 43.933.784/0001-13 | SWIFT `BRASBRRJBHE`, IBAN `BR3300000000005970000421766C1` |
| Beneficiary | Wells of Change | Associação Internacional, Poços Mudando as Vidas nas Sociedades |
| Amount | Chosen by the donor | Chosen by the donor |

The beneficiary differs on purpose. A foreign bank matches the name registered with the receiving
bank, and a mismatch is the usual reason a transfer comes back.

The IBAN is verified: its check digits pass mod-97 against ISO 7064, and it decomposes into ISPB
`00000000`, branch `00597` and account `0000421766`, which agree with the branch and account the
dialog shows.

## The site

Published in the `WebSite` block. Unchanged by this feature. It exists so an engine can tell the site
apart from the organization that runs it.

## The sections

Published in the `ItemList` of eight `SiteNavigationElement` entries, added by the section work.
Unchanged here. Its entries must keep agreeing with `client/src/lib/sections.ts` and with the six
addresses `llms.txt` publishes.

## The six questions

Published in the `FAQPage` block: where the money goes, how to donate from Brazil, how to donate from
abroad, who runs the organization, where the wells are, and how a well is maintained. Every answer
comes from what the page already states.

Google stopped displaying these on 7 May 2026. They stay because Google still parses them and answer
engines still quote them. This feature adds a comment saying so; it changes no answer.

## The snippet

Not structured data, but the only part of this document a person reads.

| Field | Now | Requirement |
|---|---|---|
| `title` | 48 chars, names the organization and its tagline | FR-001, under 60. Passes, unchanged |
| `description` | 141 chars, states the activity and the region | FR-002, under 160 and must say the organization is a nonprofit. **Fails, to rewrite** |
| `og:title`, `og:description` | Mirror the above, with a longer social variant | Must stay consistent with the page, FR-003 |

## Validation rules

1. Every value above must also be true on the page. This is the only rule that matters, and it is
   checked by reading, not by a script.
2. The title stays under 60 characters and the description under 160.
3. The structured data parses and validates.
4. Bank identifiers published in two places must match each other exactly, since they now appear in
   both the dialog and the head.
