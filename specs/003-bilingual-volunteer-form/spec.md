# Feature Specification: Bilingual Volunteer Form and Visual Identity

**Feature Branch**: `003-bilingual-volunteer-form`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "revise o form para que tenha dois idiomas funcionando lado a lado em tudo o que for apresentado e perguntado: Português Brasil e Inglês. Além disso, revise layout, design para deixar, caso seja possível com o layout, usando imagens de https://www.wellsofchange.com/"

## Context

The volunteer form specified in `001-volunteer-intake-form` left one question open: one form for
everyone, or one per site language. This specification answers it. Both languages live in the same
form, side by side, in every label, every help text, and every option.

That answer suits the organization. It is Brazilian, works in Portuguese day to day, and looks for
volunteers with skills that are not tied to a country: software, data, solar engineering,
translation. A single form means one set of responses to review, no risk of the four versions
drifting apart, and no visitor sent to a language they cannot read.

The form also arrives with no visual connection to the site. A volunteer clicks a call to action on
a page with photographs of Campo Formoso and lands on a blank Google Form. Nothing tells them they
are still with the same organization.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Either language reads naturally (Priority: P1)

A Brazilian volunteer and an English-speaking volunteer open the same form. Each finds every
question, every explanation, and every option in their language, without hunting and without
guessing what a term means.

**Why this priority**: This is the feature. A form that is half-translated is worse than a
monolingual one, because it looks finished while excluding people mid-way.

**Independent Test**: Read the form end to end covering the Portuguese, then again covering the
English. Both passes must be complete and answerable.

**Acceptance Scenarios**:

1. **Given** the form is open, **When** a reader looks at any question, **Then** both the Portuguese
   and the English text are present in the same place, in a consistent order.
2. **Given** a question with options, **When** a reader looks at any option, **Then** it carries both
   languages.
3. **Given** the confirmation shown after submitting, **When** a reader sees it, **Then** it appears
   in both languages.

---

### User Story 2 - The form looks like Wells of Change (Priority: P2)

Someone who clicked a volunteer call to action on the site sees a header photograph from the
project, colors that match the site, and the organization's name. They know they are in the right
place.

**Why this priority**: Real, but a plain form that reads well still collects applications. Visual
continuity reduces the drop-off between the site and the form; it does not create the form.

**Independent Test**: Open the site and the form side by side and confirm they read as the same
organization.

**Acceptance Scenarios**:

1. **Given** the form is open, **When** it loads, **Then** a photograph from the project appears in
   the header.
2. **Given** the form is open, **When** a reader looks at buttons and accents, **Then** the color
   matches the site's primary blue rather than the Google default purple.

### Edge Cases

- A term has no clean equivalent in the other language, such as CNPJ or PIX. The Portuguese term
  stays, with a short gloss in English rather than an invented translation.
- Bilingual labels double the reading length. Questions have to stay short enough that the pairing
  does not turn a five-minute form into a wall of text.
- A reader on a narrow phone screen sees the two languages wrap onto several lines. The separator
  has to keep them readable when wrapped.
- Google Forms does not offer the site's fonts. The closest available option is used, and the
  mismatch is accepted rather than worked around.

## Requirements *(mandatory)*

### Language

- **FR-001**: Every question title MUST carry Portuguese and English, in that order, separated by a
  consistent marker used throughout the form.
- **FR-002**: Every help text MUST carry both languages, Portuguese first, English on a new line.
- **FR-003**: Every option in every choice question MUST carry both languages.
- **FR-004**: The form title, the form description, and the confirmation message MUST carry both
  languages.
- **FR-005**: Portuguese MUST come first everywhere. The organization is Brazilian and most
  applicants will be. A reader learns the pattern once and stops noticing it.
- **FR-006**: Terms with no equivalent, including CNPJ, PIX, and Brazilian place names, MUST keep the
  Portuguese form. A gloss may be added in English; a translation may not be invented.
- **FR-007**: The English MUST be written, not machine-translated word for word. A volunteer reading
  it judges the organization by it.

### Layout and design

- **FR-008**: The form MUST use a header image taken from the site's own photographs of the project.
- **FR-009**: The form's accent color MUST match the site's primary blue.
- **FR-010**: The font MUST be the closest available in Google Forms to the site's. Forms offers a
  fixed set that does not include the site's typefaces, so an exact match is not possible.
- **FR-011**: Questions MUST stay short enough that the bilingual pairing fits on two lines on a
  phone. Long explanations belong in help text, not in titles.
- **FR-012**: The form MUST remain completable in about 5 minutes, the target set in
  `001-volunteer-intake-form`. Doubling the text must not double the time to answer.

### Preserved from 001

- **FR-013**: The questions, their required flags, the LGPD consent, and the 14-day reply commitment
  specified in `001-volunteer-intake-form` MUST be preserved. This specification changes how they
  read and look, not what is asked.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reader of either language can complete the form without encountering a single
  untranslated element.
- **SC-002**: The form is completable in under 5 minutes in either language.
- **SC-003**: Someone shown the site and the form identifies them as the same organization without
  being told.
- **SC-004**: Zero invented translations of Brazilian terms, checked term by term before release.

## Assumptions

- Portuguese and English cover the audience the organization can currently support. Spanish and
  French are on the site, but adding four languages to one form makes it unreadable, and the
  organization replies in Portuguese or English either way.
- The header image comes from `attached_assets/`, the photographs already published on the site. No
  new photography is needed and no stock image is introduced.
- Google Forms offers no native multi-language support. Both languages coexist in the same fields;
  there is no language switch.
- The theme, meaning the header image, color, and font, is set through the Forms interface. It cannot
  be set from a script, so it is a manual step regardless of how the questions are built.

## Out of Scope

- Spanish and French versions of the form.
- A language switch inside the form.
- Any change to what the form asks. That is `001-volunteer-intake-form`.
- Custom fonts or layouts Google Forms does not support.

## Dependencies

- `001-volunteer-intake-form`, which defines the questions this specification re-renders.
- Edit access to the form, already granted.
- The header image prepared at `assets/form-header-1600x400.jpg`, cropped from the project
  photograph the site uses in its hero section.
