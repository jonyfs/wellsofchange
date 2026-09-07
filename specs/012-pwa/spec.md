# Feature Specification: The Site as an Installable App

**Feature Branch**: `012-pwa`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "ajuste este projeto para que ele funcione como um PWA"

## Context

The organization works in the interior of Bahia and plans to work in Senegal. Those are places where
mobile coverage drops out, and where a donor or a volunteer may open the site on a connection that
comes and goes.

Today the site needs the network for everything. Close the tab on a bad signal and the bank details,
the PIX code, and the contact address are gone until coverage returns. Nothing marks the site as
installable either, so a supporter who visits often has no way to keep it on their home screen.

Two details make this worth doing rather than a checkbox exercise. The PIX QR code is generated in
the browser, so it still works with no network at all. And the page is already prerendered, so the
text is in the HTML before any script runs, which is exactly what a cache needs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A donor opens the site without a connection (Priority: P1)

Someone who visited the site before opens it again on a train, in the field, or with the signal
gone. The page loads, the donation details are there, and the PIX code still generates.

**Why this priority**: This is the difference between a site and something usable where the
organization actually works.

**Independent Test**: Load the site once, cut the network, reload, and confirm the page and the
donation dialog work.

**Acceptance Scenarios**:

1. **Given** a visitor who has opened the site before, **When** they open it with no network,
   **Then** the page loads with its text and sections.
2. **Given** the offline page, **When** they open the donation dialog, **Then** the PIX code renders
   and the bank details are readable.
3. **Given** a visitor who has never opened the site, **When** they open it with no network,
   **Then** the browser shows its normal offline page. Nothing pretends to work.

---

### User Story 2 - A supporter keeps the site on their phone (Priority: P2)

Someone who follows the organization installs the site from their browser and opens it from the home
screen, with the organization's icon and colours rather than a browser chrome.

**Why this priority**: Real but secondary. Installation matters for the returning supporter, not the
first-time donor.

**Acceptance Scenarios**:

1. **Given** a visitor on a browser that supports installation, **When** they open the site,
   **Then** the browser offers to install it.
2. **Given** the installed app, **When** they open it, **Then** it launches standalone, with the
   organization's icon and its blue in the status bar.

### Edge Cases

- A correction ships: a bank detail, an IBAN, a team change. A cached copy MUST NOT keep showing the
  old version. This is the one that matters most, because the site carries payment details.
- A build changes every asset filename. Old cached entries stop being requested and must not
  accumulate forever.
- The visitor is offline and the images have not been cached. Text and layout still render.
- A browser does not support installation or service workers. The site behaves exactly as it does
  today.

## Requirements *(mandatory)*

### Offline

- **FR-001**: A visitor who has loaded the site before MUST be able to open it with no network and
  see the page.
- **FR-002**: The donation details MUST be available offline, including the generated PIX code.
- **FR-003**: The page itself MUST be fetched from the network first, and served from the cache only
  when the network fails. An organization that publishes bank details cannot serve a stale page by
  default.
- **FR-004**: A new release MUST replace what an earlier visit cached, without the visitor clearing
  anything.
- **FR-005**: Caches from earlier versions MUST be deleted, not left to grow.

### Installation

- **FR-006**: The site MUST be installable: name, icons, colours, and a standalone launch.
- **FR-007**: Icons MUST include a maskable variant, so Android does not crop the logo badly.
- **FR-008**: The status bar colour MUST be the organization's blue, `#0842A1`. It currently
  declares a pale blue that belongs to nothing in the palette.
- **FR-009**: Installation MUST NOT be prompted by the site itself. The browser offers it; the page
  does not nag.

### What must not regress

- **FR-010**: The prerendered text, the structured data, and the metadata MUST keep working.
- **FR-011**: Lighthouse MUST stay at 100 for SEO, accessibility, best practices and agentic
  browsing.
- **FR-012**: The service worker MUST NOT run in development, where it would serve stale modules and
  make every change look like it failed to apply.

## Success Criteria *(mandatory)*

- **SC-001**: With the server unreachable, a returning visitor sees the full page, and the donation
  dialog opens with a working PIX code.
- **SC-002**: A browser that supports installation offers to install the site.
- **SC-003**: Lighthouse stays at 100 across all four categories, with zero failing audits.
- **SC-004**: After a new release, a returning visitor sees the new content on their next visit,
  without clearing anything.
- **SC-005**: Only one set of caches exists after an update.

## Assumptions

- The site stays a single page. Offline routing is not a concern.
- Installation is offered by the browser. No custom install prompt, no banner.
- Push notifications are not part of this. The organization has nothing to push, and asking for that
  permission on a first visit costs trust.

## Out of Scope

- Push notifications and background sync.
- An offline donation queue. Money does not move without a network, and pretending otherwise would
  be dishonest.
- Caching third-party resources such as Google Fonts.

## Dependencies

- The prerender, which is what puts the page text in the cached HTML.
