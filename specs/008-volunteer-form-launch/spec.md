# Feature Specification: Volunteer Form, Live and in the Site's Voice

**Feature Branch**: `008-volunteer-form-launch`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "revise o form que deve ser bilíngue, deve ter estilo parecido com o site, pode adicionar logo, veja o que pode ser aproveitado da página neste formulário, use humanizer para escrever o texto. Depois disso, configure a página para quando clicar no botão Quero Participar abra o form"

## Context

Two things were missing between the site and the volunteer form.

The button said "Quero Participar" and produced a browser alert reading "Coming soon!". Anyone who
pressed it had read the whole page and decided to offer their time, and the site sent them nowhere.

The form itself, meanwhile, looked like a Google Form: default purple, no logo, and text written for
a form rather than carried over from the page the visitor had just read. Someone arriving from a
page full of photographs of Campo Formoso had nothing telling them they were still with the same
organization.

Specifications `001` and `003` defined what the form asks and settled that it holds both languages.
This one is about what it says, what it looks like, and connecting it to the site.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The button leads somewhere (Priority: P1)

Someone presses "Quero Participar" and the volunteer form opens in a new tab, leaving the site where
it was in case they want to come back to it.

**Why this priority**: The rest of this work is invisible while the button is a dead end.

**Independent Test**: Press the button and confirm the form opens.

**Acceptance Scenarios**:

1. **Given** a visitor in the Join Us section, **When** they press the volunteer button, **Then**
   the form opens in a new tab.
2. **Given** the form opened in a new tab, **When** the visitor returns to the site tab, **Then**
   the page is where they left it.

---

### User Story 2 - The form looks and sounds like Wells of Change (Priority: P1)

The visitor recognises the same organization: the logo, the same blue, a photograph from the
project, and text that repeats what the site told them rather than restating it in form language.

**Why this priority**: The gap between a page with photographs and a bare Google Form is where
people decide the organization is smaller or less serious than it is.

**Independent Test**: Open the site and the form side by side and ask whether they are the same
organization.

**Acceptance Scenarios**:

1. **Given** the form is open, **When** it loads, **Then** the header shows the organization's logo
   and a photograph from the project.
2. **Given** the form is open, **When** a reader looks at buttons and accents, **Then** the colour
   matches the site's blue rather than the Google default.
3. **Given** the form's description, **When** a reader who has just read the site sees it, **Then**
   the wording is the site's: the wells, the monitoring, the first well in Campo Formoso, staying
   with the community afterwards.

---

### User Story 3 - Either language reads naturally (Priority: P2)

Both languages appear in every question, help text and option, Portuguese first, as settled in
`003-bilingual-volunteer-form`.

**Acceptance Scenarios**:

1. **Given** any question, **When** a reader looks at it, **Then** both languages are present in a
   consistent order.

### Edge Cases

- A visitor blocks pop-ups. The button uses an ordinary new-tab open, which browsers allow from a
  click, so the form still opens.
- The short link changes. The site holds one link in one place, so replacing it is one edit.
- A reader has the site in Spanish or French and reaches a form in Portuguese and English. That is
  the decision recorded in `003`, and the two languages the organization can reply in.

## Requirements *(mandatory)*

### Connecting the site to the form

- **FR-001**: The volunteer button MUST open `https://forms.gle/6sTcfRC1rZhisUARA`.
- **FR-002**: The form MUST open in a new tab, so the visitor does not lose the page.
- **FR-003**: The alert currently shown MUST be removed.
- **FR-004**: The link MUST appear once in the code, so changing it later is a single edit.

### What the form says

- **FR-005**: The form's description MUST use the site's own account of the work: solar-powered
  wells with real-time monitoring, the first well finished in Campo Formoso, and staying with the
  community after the water is running.
- **FR-006**: The text MUST go through the `humanizer` skill, as principle VII requires. No inflated
  claims, no sales language, no invented facts.
- **FR-007**: The form MUST state how long it takes and when the organization replies, both of which
  it already promised in `001`: about 5 minutes, an answer within 14 days.
- **FR-008**: The data protection notice MUST stay, in both languages, as `001` requires.

### What the form looks like

- **FR-009**: The header image MUST carry the organization's logo and a photograph from the project.
- **FR-010**: The form's accent colour MUST be the site's primary blue, `#0A4EA1`.
- **FR-011**: The font MUST be the closest Google Forms offers to the site's. Forms has a fixed list
  that excludes Poppins and Inter, so an exact match is impossible.

## Success Criteria *(mandatory)*

- **SC-001**: Pressing the volunteer button opens the form, with no alert and no dead end.
- **SC-002**: Someone shown the site and the form identifies them as the same organization without
  being told.
- **SC-003**: A reader of either language completes the form without meeting an untranslated
  element.
- **SC-004**: The form is completable in under 5 minutes.

## Assumptions

- The short link and the form are the same document: the link resolves to the form whose editor the
  organization already granted access to, which was checked rather than assumed.
- Portuguese and English cover the audience the organization can reply to, as decided in `003`.
- The header image is composed from photographs already on the site. No new photography, no stock
  image.

## Out of Scope

- What the form asks, which is `001-volunteer-intake-form`.
- Spanish and French versions of the form.
- Where the responses go and who reviews them.
- The share button beside it, which still opens an alert when the browser has no share support.

## Dependencies

- Running the build script inside the form's Apps Script editor. A script cannot set the theme, so
  the header image, colour and font are applied by hand afterwards.
