# Feature Specification: UX and design rule validation

**Feature Branch**: `013-ux-design-audit`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "use /ui-ux-pro-max para validar este projeto, veja se está com boas regras de UX, design etc"

## Context

The site was audited against the `ui-ux-pro-max` rule set, which orders its checks by impact:
accessibility, touch and interaction, performance, style consistency, layout, typography and colour,
animation, forms and feedback, and navigation. The audit read the source on `main`, not a mockup.

Two things came back clean and are not touched here. Colour contrast passes at every pair the tokens
produce: body text at 17.9:1, muted text at 5.9:1, the golden donate button at 10.6:1, primary on
white at 9.1:1. The page has exactly one `h1`, the images declare dimensions and defer below the
fold, and Lighthouse reports 100 in all four categories.

The defects the audit found are concentrated in one place: the donation dialog, which is the only
surface on the site where someone acts rather than reads. That is where the text is 10 pixels, the
copy buttons are 28 pixels tall, and four labels are hardcoded in Portuguese on a site that ships
four languages.

**This is not a redesign.** The colour palette, typography, spacing, and layout stay as they are, per
the decision recorded when the five design directions were cancelled. Everything below fixes how the
existing design behaves for someone using a phone, a keyboard, a screen reader, or a language other
than Portuguese.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A donor on a phone reads and copies the bank details (Priority: P1)

Someone opens the donation dialog on a phone to send money. They need to read a CNPJ, a branch
number, an account number, or a 29-character IBAN, and copy at least one of them into a banking app.

**Why this priority**: This is the site's only conversion path and the only reason the organization
publishes bank details at all. A donor who cannot read the number or hit the copy button does not
donate, and no amount of upstream traffic recovers that.

**Independent Test**: Open the donation dialog at 375px wide, in both tabs, and confirm every value
is legible and every copy control is reachable with a thumb.

**Acceptance Scenarios**:

1. **Given** the donation dialog open on a 375px viewport, **When** the donor reads any label or
   value, **Then** no text renders below 12px.
2. **Given** the international tab open on a 375px viewport, **When** the donor looks at the IBAN,
   **Then** the full 29 characters are visible without truncation.
3. **Given** any copy control in the dialog, **When** it is measured, **Then** its hit area is at
   least 44 by 44 pixels.
4. **Given** a donor with the site in English, French, or Spanish, **When** they open the dialog,
   **Then** every visible label is in their language, including the field names and the QR code
   loading state.

---

### User Story 2 - A screen reader user changes language and navigates (Priority: P2)

Someone using a screen reader lands on the page, wants to skip past the navigation to the content,
and wants to switch the site to their language.

**Why this priority**: The organization publishes in four languages precisely because its audience is
not homogeneous, and the language control is the one that undoes that promise when it is unusable. It
ranks below the donor path only because reading the page already works.

**Independent Test**: Traverse the page with a keyboard and a screen reader without touching a mouse,
and confirm the language switch is announced by what it does rather than by a flag.

**Acceptance Scenarios**:

1. **Given** a keyboard user on the page, **When** they press Tab from the top, **Then** a skip link
   to the main content is the first thing offered.
2. **Given** a screen reader on the language control at any viewport width, **When** it reads the
   control, **Then** it announces a language action, not the name of a flag emoji.
3. **Given** the language menu open, **When** the reader announces each option, **Then** each option
   name is marked with its own language so it is pronounced correctly.
4. **Given** a user who has asked their system to reduce motion, **When** they click a navigation
   link, **Then** the page jumps to the section without a smooth-scroll animation.

---

### User Story 3 - A visitor taps a call to action that does nothing (Priority: P3)

Someone taps "Quero Participar" in the "Together for Change" section, or taps Share on a browser
without the native share sheet.

**Why this priority**: Both paths currently end in a browser `alert()`. One says "Coming soon!" in
English regardless of the site language; the other dumps a raw URL. Neither is dangerous, and the
volunteer button already has a working destination waiting in an open pull request, which is why this
sits last.

**Independent Test**: Tap each of the three cards in the section and confirm none of them produces a
browser dialog.

**Acceptance Scenarios**:

1. **Given** a visitor in any of the four languages, **When** they tap the volunteer card, **Then**
   they reach the volunteer form and see no browser alert.
2. **Given** a browser without the native share sheet, **When** the visitor taps Share, **Then** the
   link is copied and confirmed in the page's own feedback style, in their language.

---

### Edge Cases

- What happens on a viewport between 1024px and 1280px, where the desktop language control hides its
  text label and leaves only a flag emoji?
- What happens to the floating donate button when a user opens the mobile menu, given that visibility
  is currently decided by a timer that samples the DOM twice a second?
- What happens if a second floating control is ever added, given that the unused language variant
  already claims the identical fixed corner?
- How does the dialog behave in the international tab, where a beneficiary name of 62 characters and
  two multi-line addresses share a 384-pixel column?
- What does a screen reader announce for the QR code, whose alt text says "PIX QR Code" rather than
  what scanning it does?

## Requirements *(mandatory)*

### Functional Requirements

#### Accessibility

- **FR-001**: Every interactive control MUST expose an accessible name in the active language,
  including the language selector at every viewport width.
- **FR-002**: The page MUST offer a keyboard user a skip link to the main content before the
  navigation links.
- **FR-003**: Language options MUST carry their own language marking so a screen reader pronounces
  each name correctly.
- **FR-004**: Flag emoji MUST NOT be the sole carrier of meaning for a language control. A flag names
  a country, not a language, and the site's four languages span more countries than four flags can
  represent.
- **FR-005**: Image alternative text MUST follow the active language rather than staying in English.

#### Touch and interaction

- **FR-006**: Every control the visitor is expected to tap MUST present a hit area of at least 44 by
  44 pixels, including the copy buttons in the donation dialog and the entries in the mobile menu.
- **FR-007**: Adjacent tap targets MUST keep at least 8 pixels of separation.

#### Typography

- **FR-008**: No user-visible text MUST render below 12 pixels at any viewport, replacing the current
  10 and 11 pixel labels and tab titles in the donation dialog.
- **FR-009**: Bank identifiers (CNPJ, branch, account, IBAN, SWIFT) MUST be shown in full, never
  truncated, since a partial account number is worse than none.

#### Internationalization of the interface

- **FR-010**: Every user-visible string MUST come from the translation dictionaries. The audit found
  the field labels Banco, Agência, Conta, CNPJ, the QR code loading message, and a hardcoded "ou"
  fallback rendering in Portuguese for every language.

#### Motion

- **FR-011**: The site MUST honour a reduced-motion preference across smooth scrolling, dialog and
  menu entrances, and the floating button transition. The audit found no reference to that preference
  anywhere in the codebase.

#### Navigation

- **FR-012**: Section links MUST update the address so a visitor can share or return to a section
  directly.

#### Feedback

- **FR-013**: The site MUST NOT interrupt the visitor with a browser dialog. A browser dialog blocks
  the page, cannot be translated, and looks nothing like the rest of the site.

#### Performance

- **FR-014**: The page MUST NOT keep measuring itself while the visitor is only reading. The floating
  donate button currently decides whether to show itself by re-measuring the page twice a second, for
  as long as the page stays open, which spends a phone's battery on a question that changes only when
  the visitor scrolls or opens the menu.

### Maintenance findings

These are about the code rather than about what a visitor sees. No user story depends on them, and
they are listed because the audit found them and because each one is a way the visitor-facing rules
above can silently come undone later.

- **MF-001**: The list of supported languages exists in three places, and only one of them is on the
  page. Adding a fifth language means finding all three.
- **MF-002**: Two components are never rendered by anything. They keep their own copies of the
  language list and their own accessibility defects, and one of them claims the same fixed screen
  corner as the floating donate button.
- **MF-003**: The donate button's appearance is repeated as an identical 200-character list of
  classes in three places.
- **MF-004**: The offset used when scrolling to a section is written as the literal 80 in two
  separate components, and it has to match the navigation bar's height to land correctly.
- **MF-005**: Around sixty lines of dark-mode colours are defined for a mode the site cannot switch
  into and does not inherit from the operating system.

### Out of scope

- The colour palette, font choices, spacing scale, and section layout. The visual design stays as it
  is.
- The Portuguese section ids (`missao`, `parceiros`) and the `hreflang` question, both already
  tracked elsewhere.
- The share image dimensions, already flagged in the discoverability audit.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A donor on a 375px screen can read every bank identifier and copy any one of them on
  the first attempt, with no text below 12px and no control below 44 by 44 pixels.
- **SC-002**: A visitor using the site in English, Spanish, or French sees zero Portuguese strings in
  the donation dialog.
- **SC-003**: A keyboard user reaches the main content in one keystroke from the top of the page.
- **SC-004**: A screen reader announces a purpose for every interactive control on the page, with
  zero controls announced only as "button" or by a flag name.
- **SC-005**: With reduced motion requested, no animation on the site exceeds an instantaneous state
  change.
- **SC-006**: Tapping any of the three cards in the "Together for Change" section produces no browser
  dialog.
- **SC-007**: No timer runs on an idle page.
- **SC-008**: Lighthouse stays at 100 for accessibility, best practices, SEO, and agentic browsing,
  which is where it is today. This work must not be measurable as a regression.

## Assumptions

- The audit reflects `main` as of 2026-09-07. Several open pull requests touch these files, and the
  volunteer button's `alert()` already has a replacement waiting in one of them, so the fix here is
  to confirm it rather than write it twice.
- Enlarging the copy buttons and raising the smallest text will make the donation dialog taller. The
  dialog is expected to grow or to widen beyond its current 384-pixel cap on larger screens, and that
  is accepted as the cost of legibility rather than treated as a layout regression.
- Replacing flag emoji with language names in the reader's own script is assumed to be acceptable to
  the organization. Flags may remain as decoration next to a text label, but never alone.
- No new dependency is needed for any of this.
- The `ui-ux-pro-max` design-system query returned a "Newsletter / Content First" pattern for this
  site, which is a mismatch produced by keyword overlap. Its palette and typography suggestions are
  therefore ignored, and only its rule checks are used.
