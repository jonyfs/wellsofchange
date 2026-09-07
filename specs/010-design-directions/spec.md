# Feature Specification: Five Design Directions for the Site

**Feature Branch**: `010-design-directions`

**Created**: 2026-09-07

**Status**: Draft, awaiting a choice

**Input**: User description: "revise o site para melhorar o design, sugerindo 5 opções modernas sem perder a essência do design system de cores atual, sem perder contexto, conteúdo e temática de ONG, e o site não pode ter cara de que foi feito por IA"

## Context

The site works. It is prerendered, it scores 100 across Lighthouse, and its content is honest. What
it does not have is a point of view. The layout is the one a component library produces by default:
centered hero, three cards, three more cards, a closing call to action. Nothing in it says who this
organization is, and that sameness is exactly what now reads as machine-made.

Current research points the same way. The 2026 material on nonprofit sites converges on
storytelling, transparent impact tracking, and mobile-first donation flows; the material on visual
trends converges on editorial typography as identity and on original photography as the defence
against a generated look. This organization has the photographs. It has a story that starts in a
talk about oil-well monitoring during the pandemic. Neither is on the page in a way that carries.

Five directions are drafted as working HTML, using the site's own palette, its own photographs, and
its own words. This specification records what each one is for, so the choice is made on what it
costs rather than on which screenshot looks nicest.

## The five directions

Viewable side by side in `prototypes/five-directions.html`.

**1. Editorial de campo.** The page reads as reportage: serif headline, drop cap, pull quote,
captioned photograph with a credit. Puts the organization in the register of someone documenting
their own work. Costs: the format exposes weak copy, and every photograph needs a real caption.

**2. Capítulos.** Four chapters with a reading rail: the problem, the journey, what changed, your
part. This is the pattern the UX research recommends for causes, and what charity: water made
familiar. Costs: a longer page that depends on scrolling, so a decided donor needs a persistent
donate control.

**3. Transparência.** Opens with numbers rather than adjectives: wells built, monitoring status,
where the money goes. Turns the organization's own claim, that every drop is measured, into the
structure of the page. Costs: it only works with real, current figures. A stale dashboard is worse
than none.

**4. Bento.** Tiles of different sizes, each a piece of content the organization already has, so the
visitor chooses where to enter. Reflows well on the phones most visitors use. Costs: it fragments
the narrative, and a first-time visitor can leave without the story.

**5. Documental.** Large photography, restrained type, generous space, thin rules. The photograph
argues; the design gets out of the way. Costs: it needs every photograph to be strong, and it shows
the weak ones.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A first-time visitor understands and gives (Priority: P1)

Someone who has never heard of the organization arrives, understands what it does within a screen or
two, believes it, and finds the way to donate without hunting.

**Why this priority**: Everything else is decoration. The redesign has to keep or improve the path
from arrival to donation.

**Acceptance Scenarios**:

1. **Given** a visitor on the redesigned page, **When** it loads, **Then** what the organization
   does is legible without scrolling.
2. **Given** the same visitor, **When** they decide to give, **Then** the donation control is
   reachable from anywhere on the page without scrolling back to the top.
3. **Given** a visitor on a phone, **When** they scroll the page, **Then** nothing shifts under
   their thumb as images arrive.

---

### User Story 2 - The page does not read as generated (Priority: P1)

Someone who spends a lot of time online reads the page and sees an organization with a point of
view, not a template with the words changed.

**Why this priority**: This was the explicit ask, and it is a credibility question for an
organization asking strangers for money.

**Independent Test**: Show the page to three people who did not build it and ask what they notice
first, and whether it looks like a template.

**Acceptance Scenarios**:

1. **Given** the redesigned page, **When** a reader looks at it, **Then** the photographs are the
   organization's own, not stock or generated.
2. **Given** the same page, **When** a reader reads the copy, **Then** it is specific: place names,
   what was built, what is monitored, and not adjectives about transformation.

---

### User Story 3 - The organization still recognises itself (Priority: P2)

The people who run the NGO open the new site and see their own colours, their own photographs, and
their own words rearranged, not a different organization.

**Acceptance Scenarios**:

1. **Given** the redesign, **When** the team reviews it, **Then** the palette is the one already in
   use.
2. **Given** the redesign, **When** the team reads it, **Then** every claim on the page already
   appears in the current site.

### Edge Cases

- A direction is chosen and the copy is not rewritten to match it. Editorial and documentary both
  fail in that state; bento and transparency survive it.
- Photographs run out. Three of the five directions want more images than the site currently uses
  well.
- The chosen direction increases page weight. The 3 MB ceiling from `005-discoverability-audit`
  still applies.

## Requirements *(mandatory)*

### What must be preserved

- **FR-001**: The palette MUST stay: `#0842A1` primary, `#FBBD23` for donation calls to action,
  `#BEE2F4` support, with the existing light surfaces. A redesign that changes the colours changes
  the organization's identity, which is not what was asked.
- **FR-002**: Every section of the current site MUST survive: what we do, our commitment, our story,
  who we are, partners, code of ethics, join us. Rearranged, not dropped.
- **FR-003**: All four languages MUST keep working, and the layout MUST tolerate Portuguese and
  French running about 20% longer than English.
- **FR-004**: Photographs MUST be the organization's own. No stock, no generated imagery.
- **FR-005**: The prerender, the structured data, and the metadata MUST keep working. The redesign
  MUST NOT cost the Lighthouse scores reached in `005-discoverability-audit`.

### What must improve

- **FR-006**: The page MUST state what the organization does within the first screen, without
  scrolling, on a 375px viewport.
- **FR-007**: A donation control MUST be reachable from any scroll position.
- **FR-008**: Copy MUST favour the specific over the general. "The first well is finished, in Campo
  Formoso" earns its place; "transforming lives through sustainable technology" does not.
- **FR-009**: The chosen direction MUST keep the accessibility score at 100: contrast at 4.5:1,
  visible focus, controls with accessible names, motion that respects `prefers-reduced-motion`.
- **FR-010**: Total transferred on first load MUST stay under the 3 MB ceiling.

## Success Criteria *(mandatory)*

- **SC-001**: Three people who did not build the site describe the organization's work correctly
  after 30 seconds on the page.
- **SC-002**: None of those three describes the page as looking templated or automatically
  generated.
- **SC-003**: Lighthouse stays at 100 for SEO, accessibility, best practices and agentic browsing.
- **SC-004**: The donation dialog opens in one action from any point on the page.
- **SC-005**: The team recognises the site as theirs, checked by review before release.

## Assumptions

- One direction is chosen, or two are combined. The prototypes are drafts to argue with, not
  finished pages.
- The copy is rewritten with whichever direction wins, through the `humanizer` skill, as principle
  VII requires.
- The photographs already in `attached_assets/` are enough for whichever direction is chosen. If not,
  the organization takes more rather than buying stock.

## Out of Scope

- Implementing all five. Only the chosen one gets built.
- A new logo or any change to the brand mark.
- New content types: blog, news, newsletter.
- Changing the colour palette.

## Dependencies

- A decision on which direction to build.
- `005-discoverability-audit`, whose weight and accessibility ceilings the redesign inherits.
