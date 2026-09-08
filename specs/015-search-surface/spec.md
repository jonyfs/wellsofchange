# Feature Specification: More of the organization visible in a search result

**Feature Branch**: `015-search-surface`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "verifique como fazer com que sites de busca mostre os atalhos para os atalhos da página deste projeto, tendo mais informações do site em suas buscas, o que pode ser super otimizado para LLM e sites de busca?"

## Context

### The shortcuts cannot be had, and it is worth saying why once

The shortcuts under a search result are called sitelinks. Google generates them on its own, picks
them per query, and shows up to six. No markup requests them. What its documentation asks for is a
site with "a number of different pages that users will actually want to visit", and this site is one
page at one address.

Spec 014 made every section addressable, which was the part that could be done. It does not create
pages. A fragment is a position inside a document, and a search engine indexes documents.

Creating a page per section, or per language, was considered and set aside for this feature. So
sitelinks stay out of reach, and nothing below claims otherwise. Every requirement here is about
what a single result and a single document can carry.

### One assumption the site was built on has expired

Google removed FAQ rich results from Search on 7 May 2026, finishing a withdrawal that began in
August 2023. Nobody is eligible now, including the government and health publishers that had kept
it.

The site carries a `FAQPage` block with six questions, added in the discoverability work on the
stated grounds that it would show those questions in the result. It does not, and has not since May.
`FAQPage` is still valid schema.org, Google still parses it to understand a page, and an answer
engine can still read it, so the block earns its place. The reason written next to it no longer
matches what it does.

### Where the reach actually comes from

Two findings shape what is worth doing.

**Bing is the route into ChatGPT.** Roughly 87% of ChatGPT's citations overlap with Bing's top ten
results. The Bing property was verified on 2026-09-07, which is the single largest thing done for
answer-engine reach this year, and it was done outside this repository.

**`llms.txt` is not the lever it is sold as.** An analysis of 137,000 domains found 97% of published
`llms.txt` files received zero requests in May 2026. Google has said it does not support the file and
does not plan to. Perplexity does fetch it, and Anthropic recommends publishing one. Ours stays, and
this spec does not enlarge it, because enlarging a file almost nothing reads is work with no reader.

What is left, for a single document, is the snippet a result actually renders and the facts a
machine can extract from the page. That is what this feature is about.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Someone sees the result and knows what the organization is (Priority: P1)

A person searches for something like water wells in the Bahia backcountry, or for the organization by
name, and the result appears. From the title and the two lines beneath it, they can tell what the
organization does, where, and that it is a Brazilian NGO.

**Why this priority**: The title and description are the only display surface a one-page site
controls, they render on every engine on every query, and they are what decides whether the click
happens at all. Everything else in this spec is read by machines.

**Independent Test**: Render the current title and description at the width a result uses and confirm
neither is cut mid-sentence and both say something specific.

**Acceptance Scenarios**:

1. **Given** the page's title, **When** it is measured, **Then** it is under 60 characters and names
   both the organization and what it does.
2. **Given** the page's description, **When** it is measured, **Then** it is under 160 characters and
   states the activity, the region, and that this is a nonprofit, without being cut mid-sentence.
3. **Given** a result for the organization's name, **When** someone reads it without clicking,
   **Then** they can say what the organization does and where.

---

### User Story 2 - An answer engine states facts about the organization and gets them right (Priority: P2)

Someone asks an assistant which organizations build solar-powered water wells in northeastern
Brazil, or how to donate to Wells of Change from abroad. The assistant answers from the page and the
answer is correct.

**Why this priority**: This is where the organization is most likely to be found by someone who was
not looking for it by name, and the facts are already public on the page. It ranks below the snippet
because the snippet is what a human sees.

**Independent Test**: Read only the served HTML, without running any JavaScript, and answer a list of
factual questions about the organization from it.

**Acceptance Scenarios**:

1. **Given** the served HTML alone, **When** a reader looks for how to donate, **Then** the page
   states it in a form a machine can extract, including that donations are possible from outside
   Brazil.
2. **Given** the served HTML alone, **When** a reader looks for what the organization is, **Then** it
   finds the registered name, the trading name, the nonprofit status, the public registration
   number, the founding year, and where it works.
3. **Given** every factual claim in the machine-readable description, **When** each is compared with
   the page, **Then** all of them agree.
4. **Given** the structured data, **When** it is validated, **Then** it parses with no errors and no
   block claims a search appearance that no longer exists.

---

### User Story 3 - Someone shares the link and the card says something (Priority: P3)

The link is posted in a message, a group, or a social feed, and the preview shows a photograph, a
title and a line of description.

**Why this priority**: For an organization whose reach depends on people passing the link on, the
card is a result that appears without any search at all. It is last because the card was already
corrected to the right size and its description already comes from the same tags as the snippet.

**Acceptance Scenarios**:

1. **Given** the link pasted into a message, **When** the preview renders, **Then** the image fills
   the card and the text matches what a search result would say.

---

### Edge Cases

- What does a result show for someone searching in Spanish or French, given that the served document
  is in Portuguese and there is one address?
- What happens to the machine-readable facts when one of them changes, such as the number of wells
  completed or an address?
- What does an answer engine do with a question the page does not answer, such as how much a well
  costs or how many have been built?
- What happens to the `FAQPage` block if Google later stops parsing it as well as stops displaying
  it?

## Requirements *(mandatory)*

### Functional Requirements

#### The snippet

- **FR-001**: The title MUST stay under 60 characters and name both the organization and what it
  does.
- **FR-002**: The description MUST stay under 160 characters and state the activity, the region
  served, and that the organization is a nonprofit.
- **FR-003**: The title and description MUST match what the page says. A snippet that promises
  something the page does not deliver costs the visit and the trust at once.

#### Facts a machine can read

- **FR-004**: The machine-readable description of the organization MUST carry its identity as
  published: registered name, trading name, nonprofit status, public registration number, founding
  year, and the places it works in.
- **FR-005**: It MUST state how to donate, in a form an agent can act on, and MUST distinguish
  donating from inside Brazil from donating from abroad.
- **FR-006**: It MUST name the languages the organization can be contacted in.
- **FR-007**: It MUST name what the organization knows about, so an engine can match it to a
  question rather than only to its name.
- **FR-008**: Every fact in it MUST also be true on the page. These are public claims about a real
  organization, so a wrong one is a defect rather than a typo.
- **FR-009**: The structured data MUST validate with no errors.

#### Correcting what expired

- **FR-010**: The `FAQPage` block MUST be kept for machine understanding and MUST NOT be described,
  anywhere in the repository, as producing a search appearance. Google removed FAQ rich results on
  7 May 2026.
- **FR-011**: The discoverability documentation MUST record which claims about search appearance are
  no longer true, with the date, so the next person does not act on them.

#### Reach that is not markup

- **FR-012**: The sitemap MUST be submitted in Bing Webmaster Tools, since Bing's results are where
  ChatGPT's citations mostly come from.
- **FR-013**: The repository MUST record that `llms.txt` is read by Perplexity, is not supported by
  Google, and is fetched by almost nothing else, so nobody spends effort enlarging it expecting
  search results.

#### What is out of reach, written down

- **FR-014**: The repository MUST record that sitelinks cannot be requested, that they need more than
  one page, and that this site has one by decision. The question has now been asked twice.

### Out of scope

- A page per section and a page per language. Both were considered for this feature and set aside.
  They are the only routes to sitelinks and to indexing the other three languages, and both stay
  open as future work.
- `hreflang`, which needs those per-language addresses.
- IndexNow. It tells Bing, Yandex and Naver that a URL changed, and this site is one URL that changes
  rarely. Its key file would also have to be published from the account that serves the domain,
  which is the same obstacle that ruled out file verification for Bing.
- Adding facts the organization has not published, such as how many wells are complete or what one
  costs. Those would be the strongest thing that could be added to a single page, and they have to
  come from the organization rather than be written here.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The title and description render in full at the width a search result uses, with no
  cut mid-sentence.
- **SC-002**: A reader given only the served HTML, with no JavaScript, can answer these without
  guessing: what the organization is, where it works, when it was founded, its registration number,
  who runs it, and how to donate from inside and from outside Brazil.
- **SC-003**: Every factual claim in the machine-readable description matches the page. Zero
  mismatches.
- **SC-004**: The structured data validates with zero errors.
- **SC-005**: The discoverability audit stays at zero failures against a build.
- **SC-006**: No file in the repository describes a search appearance that no longer exists.
- **SC-007**: The sitemap is listed in Bing Webmaster Tools.

## Assumptions

- Sitelinks are the search engine's decision. No success criterion here claims one will appear,
  because nothing in this repository can make that happen.
- The organization's public facts are taken from what the site and the donation dialog already
  publish. Nothing new about the organization is invented for the structured data.
- The served document stays in Portuguese, so a result in another language is out of reach for this
  feature. That is a consequence of one address for four languages, recorded rather than solved.
- The measurements about FAQ rich results, `llms.txt` and Bing's relationship to ChatGPT citations
  come from published reporting rather than from this site's own data, and are dated in the Context
  section so they can be re-checked.
- Bing was verified on 2026-09-07. FR-012 assumes the sitemap submission is confirmed inside that
  account, which is the one requirement here that cannot be checked from the repository.
