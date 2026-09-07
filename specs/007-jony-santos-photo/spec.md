# Feature Specification: Jony Santos's Team Photo

**Feature Branch**: `007-jony-santos-photo`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "altere a foto de Jony Santos, na seção Quem Somos, para a foto [URL do LinkedIn], siga as mesmas diretrizes feitas para a foto de Maria Barreto"

## Context

The Who We Are section shows each team member with a photograph, a role, and a short bio. Jony
Santos, the president, was shown with a 640 by 640 image saved as `IMG_0725_1762536274752.jpeg`, a
camera filename that says nothing about who is in it.

This follows the same rules set in `006-maria-barreto-photo`: the photograph is copied into the
repository, named for the person, and served from the site's own domain.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor sees who leads the organization (Priority: P1)

Someone reading the Who We Are section sees a current, clear photograph of the president alongside
the rest of the team, consistent in quality with the others.

**Why this priority**: The team section puts faces to an organization asking strangers for money.
The person listed as president is the one a cautious donor looks at first.

**Independent Test**: Open the section and confirm the photograph shown for Jony Santos is the
current one and renders sharply in the avatar.

**Acceptance Scenarios**:

1. **Given** a visitor in the Who We Are section, **When** they reach Jony Santos's card, **Then**
   the current photograph is displayed.
2. **Given** the same card, **When** a screen reader announces it, **Then** the image carries his
   name as its alt text, as the other cards do.
3. **Given** any team card, **When** the photograph fails to load, **Then** the existing initials
   fallback appears rather than a broken image.

### Edge Cases

- The source is a signed URL that expires. The photograph has to live in the repository rather than
  be fetched from a third party at page load.
- The avatar crops to a circle, so a square source crops predictably.

## Requirements *(mandatory)*

- **FR-001**: Jony Santos's card MUST show the photograph supplied for this purpose.
- **FR-002**: The photograph MUST be stored in the repository's image folder and served from the
  site's own domain. It MUST NOT be hotlinked: the URL is signed, expires, and would break the card
  when it does.
- **FR-003**: The file MUST be named for the person it shows.
- **FR-004**: The image MUST be square and at least as large as the avatar renders it.
- **FR-005**: The alt text MUST remain his name, matching the other team cards.
- **FR-006**: The initials fallback MUST keep working if the image fails to load.
- **FR-007**: The replaced file MUST be removed if nothing else references it.

## Success Criteria *(mandatory)*

- **SC-001**: The current photograph appears on Jony Santos's card.
- **SC-002**: The image loads from the site's own domain, with no request to a third party.
- **SC-003**: The image renders without visible softening at the size the avatar uses.
- **SC-004**: The file stays under 40 KB, in line with the other team portraits.

## Assumptions

- The organization has permission to publish this photograph. It was supplied by the person it
  shows, who is also the project owner.
- No other team photograph changes in this specification. Maria Barreto's is covered by
  `006-maria-barreto-photo`.

## Out of Scope

- Other team members' photographs.
- The layout of the Who We Are section, and any change to bios or roles.

## Dependencies

- None in code. `006-maria-barreto-photo` sets the same rules but the two changes do not touch the
  same lines and can land in either order.
