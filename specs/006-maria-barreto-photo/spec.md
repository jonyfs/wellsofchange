# Feature Specification: Maria Barreto's Team Photo

**Feature Branch**: `006-maria-barreto-photo`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "troque a foto de Maria Barreto, na seção Quem Somos, pela foto [URL do LinkedIn], ou seja, baixe a foto e use como foto salva na respectiva pasta de imagens de projeto"

## Context

The Who We Are section shows each team member with a photograph, their role, and a short bio. Maria
Barreto, the communications director, was shown with a 200 by 200 pixel image saved under the name
`duda_1762538284982.jpeg`, a filename that says nothing about who is in it.

She has a current professional portrait, and the organization holds the right to use it.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor sees who runs the organization (Priority: P1)

Someone reading the Who We Are section sees a current, clear photograph of each person named. The
faces are consistent in quality, so no one appears as an afterthought.

**Why this priority**: The team section exists to put faces to an organization asking strangers for
money. A dated or low-resolution portrait undercuts that.

**Independent Test**: Open the section and confirm the photograph shown for Maria Barreto is the
current one and renders sharply at the size the card uses.

**Acceptance Scenarios**:

1. **Given** a visitor in the Who We Are section, **When** they reach Maria Barreto's card, **Then**
   the current photograph is displayed.
2. **Given** the same card, **When** a screen reader announces it, **Then** the image carries her
   name as its alt text, as the other cards do.
3. **Given** any team card, **When** the photograph fails to load, **Then** the existing initials
   fallback appears rather than a broken image.

### Edge Cases

- The source is a signed URL that expires. The photograph has to live in the repository, not be
  fetched from a third party at page load.
- The card renders the photo in a circular avatar. A square source crops predictably; a portrait in
  another aspect ratio would not.

## Requirements *(mandatory)*

- **FR-001**: Maria Barreto's card MUST show the photograph supplied for this purpose.
- **FR-002**: The photograph MUST be stored in the repository's image folder alongside the other
  team photographs, and served from the site's own domain. It MUST NOT be hotlinked from LinkedIn or
  any other host: the URL is signed, expires, and would break the card when it does.
- **FR-003**: The file MUST be named for the person it shows, so the next person editing the section
  can tell what it is without opening it.
- **FR-004**: The image MUST be at least as large as the avatar renders it, and square, since the
  avatar crops to a circle.
- **FR-005**: The alt text MUST remain her name, matching the other team cards.
- **FR-006**: The initials fallback MUST keep working if the image fails to load.
- **FR-007**: The replaced file MUST be removed if nothing else references it, rather than left
  behind as an orphan.

## Success Criteria *(mandatory)*

- **SC-001**: The current photograph appears on Maria Barreto's card.
- **SC-002**: The image loads from the site's own domain, with no request to a third party.
- **SC-003**: The image renders without visible softening at the size the avatar uses.
- **SC-004**: The section's total weight does not grow. The new file is smaller than 30 KB, in line
  with the other team portraits.

## Assumptions

- The organization has permission to publish this photograph of a team member. It was supplied by
  the project owner for this purpose, and she already appears on the site.
- No other team photograph changes.
- The bio and role text stay as they are.

## Out of Scope

- Other team members' photographs.
- The layout of the Who We Are section.
- Any change to bios or roles.
