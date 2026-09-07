# Feature Specification: Search and AI Discoverability, Audited

**Feature Branch**: `005-discoverability-audit`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "use as skills /seo-check /seo-content e busque saber se o site está amplamente configurado, de forma profissional, para ser encontrado nos principais sites de busca e também por IAs; análise profunda do que precisa ser melhorado"

## Context

This specification is written from measurements taken against the live site on 2026-09-07, not from
inspection of the source. Every number below was observed.

The verdict in one line: **the site is well configured for classic search and poorly equipped for
the machines that increasingly answer on its behalf.**

Lighthouse, mobile, navigation mode:

| Category | Score |
|---|---|
| SEO | 100 |
| Best Practices | 100 |
| Accessibility | 89 |
| Agentic Browsing | 33 |

The SEO score is a checklist of the basics, and the site passes all of it: title, description,
canonical, crawlable links, valid `robots.txt`, indexable page. That work is done and this
specification does not revisit it.

The number that matters is 33. Agentic Browsing is Google's own measure of whether an AI agent can
read and act on the page, and it is where the site is weakest.

Two other measurements sit behind everything else:

**The page transfers 24.4 MB.** Twenty referenced assets, eight of them over 1.4 MB, the largest
3.9 MB. None of the twenty images carries a `loading` attribute, explicit dimensions, or a `srcset`.
The logo alone is a 377 KB PNG. Lab LCP measured 690 ms on an unthrottled desktop connection, which
says nothing about the donor opening the site on mobile data in the Brazilian interior, which is
exactly who the organization serves.

**Chrome UX Report has no field data for this page.** Not slow data, none: the site does not get
enough real traffic to register. That is the problem all of this is meant to fix, and the baseline
against which any of it should be measured.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - An answer engine can describe the organization correctly (Priority: P1)

Someone asks an AI assistant where to donate for clean water in Brazil, or who runs Wells of Change,
or how its wells are monitored. The assistant fetches the site, finds structured, quotable facts,
and answers correctly with attribution.

**Why this priority**: This is the channel the organization is currently worst at, and the one
growing fastest. The prerender already put the page text in reach; what is missing is the structure
that lets a machine quote it with confidence.

**Independent Test**: Fetch the site with JavaScript disabled and ask whether every claim an answer
engine would need is present and machine-readable.

**Acceptance Scenarios**:

1. **Given** an agent fetching the page, **When** it reads `llms.txt`, **Then** the file follows the
   convention it claims to implement, including the link list Google's own check looks for.
2. **Given** an agent building an accessibility tree, **When** it parses the page, **Then** the tree
   is well-formed and every interactive control has an accessible name.
3. **Given** a question a donor commonly asks, **When** an engine looks for the answer, **Then** it
   finds it as structured data rather than having to infer it from prose.

---

### User Story 2 - The site loads for a donor on mobile data (Priority: P1)

Someone opens the site on a phone, on a normal Brazilian mobile connection, and sees the hero and
the first sections quickly enough to keep reading. Their data plan is not spent on photographs they
never scroll to.

**Why this priority**: 24.4 MB is not a ranking abstraction. It is the donor who leaves before the
donate button renders, and Google's page experience signals follow real users.

**Independent Test**: Load the site on a throttled 4G profile and measure time to the hero and total
bytes transferred before the first scroll.

**Acceptance Scenarios**:

1. **Given** a visitor on a phone, **When** the page opens, **Then** only images near the viewport
   have been downloaded.
2. **Given** any image on the page, **When** it loads, **Then** its dimensions are known in advance,
   so nothing shifts as it arrives.
3. **Given** the full page, **When** every image has loaded, **Then** the total transferred is a
   fraction of today's 24.4 MB.

---

### User Story 3 - Someone who types the domain without www arrives (Priority: P2)

A donor types `wellsofchange.com` into a browser that defaults to HTTPS and reaches the site rather
than a certificate warning.

**Why this priority**: Real but narrower. `http://` already redirects; the failure is limited to
people who type the apex with `https://`, and a certificate warning is the worst possible first
impression for an organization asking for money.

**Acceptance Scenarios**:

1. **Given** a visitor requesting `https://wellsofchange.com`, **When** the browser validates the
   certificate, **Then** it succeeds and the visitor is redirected to the canonical host.

### Edge Cases

- An agent respects `robots.txt` but ignores `llms.txt`. The structured data still has to carry the
  facts, since it is the only machine-readable source every engine reads.
- A donor arrives on a slow connection and the prerendered text renders before any image. The page
  has to be readable in that state.
- A photograph is decorative rather than informative. It still needs dimensions, but its alt text
  should be empty rather than invented.

## Requirements *(mandatory)*

### Machine readability

- **FR-001**: `llms.txt` MUST follow the convention it claims to implement. Google's agentic check
  reports that it "does not appear to contain any links"; the format expects a linked index of the
  site's own resources, not prose alone.
- **FR-002**: Every interactive control MUST have an accessible name. The mobile menu button
  currently has none, which fails both screen readers and agents.
- **FR-003**: The accessibility tree MUST be well-formed. Lighthouse reports it is not, which is the
  single largest contributor to the Agentic Browsing score of 33.
- **FR-004**: The structured data MUST answer the questions donors actually ask, as a `FAQPage`
  block: where the money goes, who runs the organization, how a well is maintained, how to donate
  from abroad. Prose an engine has to interpret is weaker than a question it can quote.
- **FR-005**: The structured data MUST identify the site itself with a `WebSite` entry alongside the
  existing `NGO` entry, so an engine can distinguish the organization from its web presence.
- **FR-006**: `legalName` in the structured data MUST be the name registered with the bank,
  `Associação Internacional, Poços Mudando as Vidas nas Sociedades`. It currently publishes the
  trading name, which contradicts the beneficiary details the donation dialog shows.

### Weight and loading

- **FR-007**: Images below the fold MUST NOT be downloaded until they are needed.
- **FR-008**: Every image MUST declare its dimensions, so the layout does not shift as images
  arrive.
- **FR-009**: Photographs MUST be served at sizes appropriate to the screen requesting them, rather
  than at their original camera resolution.
- **FR-010**: The total transferred on first load MUST fall below 3 MB, from 24.4 MB today. The
  photographs are the organization's evidence and stay; what changes is that they are compressed,
  sized, and fetched when needed.
- **FR-011**: Photographs MUST keep their descriptive alt text. The current alt text is real and
  specific; compression work MUST NOT lose it.

### Accessibility as a discoverability signal

- **FR-012**: The viewport MUST allow zooming. `maximum-scale=1` currently blocks it, which fails an
  accessibility audit and hurts a visitor with low vision.

### Reach

- **FR-013**: The site MUST be verifiable in Bing Webmaster Tools, which feeds Copilot and several
  answer engines. Done on 2026-09-07 by importing the Google Search Console property, so no DNS
  record or file was needed.
- **FR-014**: The apex host MUST serve a valid certificate over HTTPS, or the DNS MUST stop
  answering for it. A certificate error is worse than a name that does not resolve.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lighthouse Agentic Browsing scores 90 or above on mobile, from 33 today.
- **SC-002**: Lighthouse Accessibility scores 100 on mobile, from 89 today.
- **SC-003**: Total transferred on first load is under 3 MB, from 24.4 MB today.
- **SC-004**: No single asset exceeds 400 KB.
- **SC-005**: Lighthouse SEO stays at 100. This work must not cost what is already right.
- **SC-006**: Chrome UX Report begins showing field data for the page, which requires enough real
  visitors to register at all.
- **SC-007**: `https://wellsofchange.com` resolves without a certificate warning.

## Assumptions

- The photographs stay. They are the organization's evidence of work done, and compressing them is
  not the same as removing them.
- Answer engines are worth optimising for even though the traffic cannot yet be measured. The site
  gets too little traffic to appear in CrUX, so the argument for this work is the audience it does
  not have yet.
- Bing verification and the apex certificate are operational tasks outside the repository, done by
  whoever holds the DNS and the Webmaster Tools account.
- The single-URL, four-language structure stays as decided. hreflang remains out of reach and the
  audit will keep reporting it.

## Out of Scope

- Per-language URLs and hreflang, decided against in `003-bilingual-volunteer-form`.
- Paid search, link building, and social media strategy.
- A blog, a news section, or any new content type. This is about making existing content readable.
- Rewriting the site's copy, which `seo-content` covers.

## Dependencies

- Access to Bing Webmaster Tools, for FR-013.
- Access to the DNS and hosting for the apex domain, for FR-014.
- The prerender merged in pull request #7, which is what put the page text within reach of an agent
  in the first place.
