# Feature Specification: Section links that survive a search result

**Feature Branch**: `014-search-result-sections`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "verifique se o sitemap do projeto ajuda ao mesmo ser encontrado corretamente nos buscadores, verifique se existe links para What We Do / Our Commitment / Our Story / Who We Are / Code of Ethics / Join Us para que fique mais atraente para quem for clicar nos links de busca dos buscadores"

## Context

Two questions were asked. The sitemap answer is short; the section links answer is not.

### The sitemap is fine, and it is not the lever

The audit run against a real build reports no failures:

```
OK   sitemap            1 URL(s).
OK   canonical          All URLs use www.wellsofchange.com.
OK   crawlable-content  10603 chars of text in the served HTML.
OK   structured-data    NGO, WebSite, FAQPage all parse.
```

The single entry points at the right host, its `lastmod` is current, and it carries the logo as an
image entry. Nothing about it is holding the site back.

It also cannot be made to list the six sections. A sitemap entry is a page, and `#what-we-do` is a
position inside a page, not a page. Search engines drop the fragment before they read the address,
so a sitemap listing six anchors lists the same URL six times. Doing that would be a mistake
presented as an improvement.

### The section links already exist, and they are broken

All nine section anchors are in the HTML a crawler receives without running any JavaScript, and the
heading structure underneath them is the one search engines read when they decide whether to offer
jump links in a result:

```
h1  Mudando vidas, um poço por vez
h2  O Que Fazemos          #what-we-do
h2  Nosso Compromisso      #our-commitment
h2  O Que Nós Acreditamos  #missao
h2  Nossa História         #our-story
h2  Quem Somos             #who-we-are
h2  Nossos Parceiros       #parceiros
h2  Código de Ética        #ethics
h2  Juntos Pela Mudança    #join-us
```

The six addresses the request names are also already published to AI crawlers. `llms.txt` lists
every one of them, with a sentence describing each section.

Every one of those addresses is broken. Opening `https://www.wellsofchange.com/#what-we-do` lands
the reader at the top of the page. Nothing in the site reads the fragment when the page loads, and
the client rebuilds the page from scratch after the prerendered markup arrives, so any scrolling the
browser did on its own is undone. On top of that, no section reserves room for the fixed navigation
bar, so even a correct landing would put the heading underneath it.

So the site is publishing six links to search engines and answer engines that do not work when
someone follows them. Fixing that is the whole of this feature.

### What can and cannot be requested

A separate result per section requires a separate URL per section. The site is one page in four
languages at one address, by decision, and this feature does not reopen that.

Sitelinks are chosen by the search engine and cannot be asked for with markup. What can be done is
make the sections addressable, keep the machine-readable description of them accurate, and let the
engine decide. That is the honest ceiling here.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Someone follows a link to a section and arrives at it (Priority: P1)

A person clicks a search result, a link in `llms.txt`, or a link someone sent them, and the address
carries a section fragment. They expect to be reading that section.

**Why this priority**: Six such links are already published. Every one of them lands in the wrong
place today, which makes this the only defect in the request that is actively costing something.

**Independent Test**: Open each of the section addresses in a fresh tab and confirm the named section
heading is the first thing visible.

**Acceptance Scenarios**:

1. **Given** a fresh tab, **When** the visitor opens the address for any of the six named sections,
   **Then** that section's heading is visible without scrolling and is not hidden behind the
   navigation bar.
2. **Given** a visitor already on the page, **When** they follow a link to a section, **Then** the
   heading clears the navigation bar by the same margin as an arrival from a fresh tab.
3. **Given** an address with a fragment that matches no section, **When** the page loads, **Then** it
   opens at the top rather than failing.

---

### User Story 2 - Someone shares the section they are reading (Priority: P2)

A visitor scrolls to the code of ethics, wants to send that section to somebody, and copies the
address from the bar.

**Why this priority**: This turns every visitor into a source of section links, which is the only
input to sitelinks anybody outside a search engine controls. It ranks below arrival because a link
that leads nowhere is worse than a link nobody can copy.

**Independent Test**: Click each navigation entry, copy the address after each, and confirm the six
addresses differ and each reopens on its section.

**Acceptance Scenarios**:

1. **Given** a visitor clicking a navigation or footer link, **When** the page scrolls, **Then** the
   address updates to that section's fragment.
2. **Given** an address copied that way, **When** it is opened in a new tab, **Then** it lands on the
   same section.
3. **Given** a visitor pressing the browser's back button after following section links, **Then**
   they return through the sections they visited rather than leaving the site.

---

### User Story 3 - An answer engine enumerates what the organization publishes (Priority: P3)

A crawler that does not run JavaScript reads the page and needs to state which sections exist and
what each covers.

**Why this priority**: `llms.txt` already does this in prose, and the prerendered headings already
carry the structure. What is missing is the same list in the structured format an engine reads
first. This is an improvement on something that works, not a repair.

**Independent Test**: Validate the page's structured data and confirm the section list parses and
matches the sections actually on the page.

**Acceptance Scenarios**:

1. **Given** the served HTML, **When** its structured data is validated, **Then** a navigation
   element lists the site's main sections with their names and addresses, and it parses without
   error.
2. **Given** that list, **When** it is compared with the page, **Then** every entry points at a
   section that exists and no section that appears in the navigation is missing from it.

---

### Edge Cases

- What happens when a section fragment is opened in a language other than the prerendered one, given
  that all four languages share the address and the section names differ per language?
- What happens to a stored section address if a section is renamed or removed later?
- What does a visitor see if a section address is opened while the page is served from the offline
  cache?
- What happens on the two sections whose addresses are Portuguese (`#missao`, `#parceiros`) while
  the other seven are English?

## Requirements *(mandatory)*

### Functional Requirements

#### Arrival

- **FR-001**: Opening the site with a section fragment MUST place the reader at that section, with
  its heading fully visible.
- **FR-002**: A section reached by any route MUST clear the fixed navigation bar rather than sit
  underneath it.
- **FR-003**: A fragment matching no section MUST open the page at the top without an error.

#### Addressability

- **FR-004**: Following a navigation or footer link MUST update the address to that section, so a
  visitor can copy or share where they are.
- **FR-005**: Section addresses MUST use one naming language. Seven sections are English and two are
  Portuguese today.
- **FR-006**: Any change to a section's address MUST be reflected in `llms.txt` in the same change,
  since that file publishes the six addresses to answer engines.

#### Machine-readable description

- **FR-007**: The served HTML MUST carry a structured list of the site's main sections with their
  names and addresses, valid against schema.org and consistent with what the page contains.
- **FR-008**: The section list MUST be reachable without running JavaScript, like the rest of the
  page's structured data.

#### Sitemap

- **FR-009**: The sitemap MUST continue to list one entry for the one page, and MUST NOT list
  section fragments as separate entries.
- **FR-010**: The sitemap's `lastmod` MUST be updated whenever the page's content changes.

### Out of scope

- Separate URLs per section, and separate URLs per language. Both would produce more search results
  and both contradict decisions already taken for this site.
- Sitelinks. No markup requests them, and claiming otherwise would be selling something that cannot
  be delivered.
- The share image size and the missing `hreflang`, both already tracked in the discoverability audit.
- The address bar updating while the visitor scrolls without clicking anything. Rewriting history on
  scroll fights the back button, and the gain does not cover it.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six addresses named in the request, opened cold in a fresh tab, land on their
  section with the heading visible. Six out of six, where the count today is zero.
- **SC-002**: Every section address published in `llms.txt` resolves to the section it names.
- **SC-003**: A visitor can copy the address of any of the six sections from the address bar after
  one click, and reopening it returns them to the same place.
- **SC-004**: The page's structured data validates with no errors, and its section list matches the
  sections on the page exactly.
- **SC-005**: The discoverability audit stays at zero failures against a build.
- **SC-006**: The sitemap still contains exactly one entry.

## Assumptions

- Search engines decide on their own whether to show jump links or sitelinks for a result. This work
  makes the site eligible and correct; it cannot make the decision. No success criterion here claims
  a change in how a result is displayed, because nothing in the repository can guarantee one.
- Making sections addressable overlaps with a requirement already recorded in the UX audit, which
  asked for the same behaviour for a different reason. Whichever ships first satisfies both.
- Section names in the structured list are assumed to follow the prerendered language, matching the
  rest of the page's machine-readable description.
- No change to the sitemap is needed. It is included in the requirements only to record that it must
  stay as it is, because the obvious reading of the request is to add six anchors to it.
