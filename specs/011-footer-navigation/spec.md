# Feature Specification: Footer Navigation That Works

**Feature Branch**: `011-footer-navigation`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "revise os links de navegação no footer do projeto pois parecem incompletos e não levam para a parte correta ao clicar neles"

## Context

The footer lists six links to the page's sections. None of them works, and none of them ever has.

Each link scrolls to an element whose id is written in Portuguese: `fazemos`, `compromisso`,
`historia`, `quem-somos`, `etica`, `mudanca`. The sections themselves carry English ids:
`what-we-do`, `our-commitment`, `our-story`, `who-we-are`, `ethics`, `join-us`. The lookup returns
nothing, the optional chaining swallows it, and the click does nothing at all.

Measured against the live site: all six targets are absent, and clicking a footer link leaves the
scroll position exactly where it was.

The failure is silent, which is why it survived. There is no error in the console, no broken-link
warning, and nothing visibly wrong on the page. A visitor simply presses a link and concludes the
site is broken, or that they misclicked.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor navigates from the footer (Priority: P1)

Someone who has read to the bottom of the page presses a link in the footer and arrives at the
section it names, with the section heading visible rather than hidden behind the fixed header.

**Why this priority**: Someone who reached the footer is engaged. Sending them nowhere is worse
than not offering the link.

**Independent Test**: From the bottom of the page, press each footer link and confirm the named
section arrives at the top of the viewport, below the header.

**Acceptance Scenarios**:

1. **Given** a visitor at the bottom of the page, **When** they press any footer navigation link,
   **Then** the page scrolls to the section that link names.
2. **Given** the scroll has finished, **When** the visitor looks at the top of the viewport, **Then**
   the section's heading is visible and not covered by the fixed header.
3. **Given** a visitor using the header menu instead, **When** they press the equivalent item,
   **Then** they land in the same place as the footer link.

### Edge Cases

- A section is renamed or removed. Every link pointing at it must be updated with it, and the
  failure must not be silent again.
- A visitor has reduced motion enabled. Movement still happens; it just does not animate.
- The header height changes. Both menus have to move together, which argues for one shared value
  rather than two copies.

## Requirements *(mandatory)*

- **FR-001**: Every footer navigation link MUST scroll to the section it names.
- **FR-002**: After scrolling, the section heading MUST be visible below the fixed header rather
  than behind it. The header is 80 pixels tall, which the top navigation already accounts for and
  the footer did not.
- **FR-003**: The footer and the header menu MUST land in the same position for the same section.
- **FR-004**: The link labels MUST keep coming from the translation dictionaries, in all four
  languages, as they already do.
- **FR-005**: A link whose target no longer exists MUST NOT fail silently. Today the optional
  chaining hides the fault, which is why six dead links survived to production.

## Success Criteria *(mandatory)*

- **SC-001**: All six footer links move the page, verified by measuring scroll position before and
  after each one.
- **SC-002**: After each link, the target section sits within a few pixels of the header's lower
  edge, verified by measurement rather than by eye.
- **SC-003**: The header menu and the footer produce the same result for the same section.

## Assumptions

- The six sections named in the footer are the ones the organization wants listed. This changes the
  destinations, not the menu.
- The English section ids stay. Renaming sections to match the footer would break the header menu,
  which already uses the English ids correctly.

## Out of Scope

- The design of the footer.
- Adding or removing entries from the menu.
- The two sections whose ids are still Portuguese, `missao` and `parceiros`. Nothing links to them
  today, so they are inconsistent rather than broken. Worth tidying in their own change.

## Dependencies

- None.
