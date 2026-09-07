# Feature Specification: Volunteer Intake Form

**Feature Branch**: `001-volunteer-intake-form`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "use o /chrome para criar um form de voluntário no link https://docs.google.com/forms/d/1p445U5jI_-Gc2hvkV6f84KM5cBg-NgSjBe1sXZ8nnZM/edit, abra o form no browser já aberto, edite os campos os quais julgar necessário para podermos receber e avaliar possíveis voluntários para o https://www.wellsofchange.com/"

## Context

The site invites people to volunteer and then has nowhere to send them. In
`TogetherForChange.tsx`, the "I Want to Participate" button fires a browser alert reading "Coming
soon!". Anyone who reaches that point has already read the mission, scrolled the whole page, and
decided to offer their time. They are the warmest lead the site produces, and today the site drops
them.

Wells of Change is run by volunteers with technical backgrounds: engineers, developers, geologists,
administrators, communicators. Wells combine drilling, photovoltaic pumping, and remote monitoring,
so the skills that help are specific, and knowing which ones a person brings is the difference
between a useful introduction and an inbox full of goodwill nobody can act on.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor offers to help (Priority: P1)

Someone finishes reading the site, decides they want to contribute, and presses the volunteer call
to action. They reach a form, describe who they are and what they can do, and submit it. They see a
confirmation telling them what happens next and roughly when.

**Why this priority**: Without this, the button lies. Everything else in this feature depends on
applications existing.

**Independent Test**: Open the site, press the volunteer button, complete and submit the form, and
confirm the response is recorded and the applicant sees a confirmation.

**Acceptance Scenarios**:

1. **Given** a visitor on the site, **When** they press the volunteer call to action, **Then** the
   volunteer form opens.
2. **Given** the form is open, **When** the visitor completes the required questions and submits,
   **Then** the response is recorded and a confirmation message states what happens next.
3. **Given** a visitor who leaves a required question blank, **When** they try to submit, **Then**
   the form tells them which question needs an answer and does not submit.

---

### User Story 2 - A coordinator evaluates applications (Priority: P1)

Someone at Wells of Change opens the collected responses and can tell, without writing back for
basics, what each person offers: their skills, how much time they have, where they are, which
languages they speak, and whether they can travel to a project site.

**Why this priority**: An application that cannot be evaluated is a follow-up email waiting to
happen. Collecting the right answers up front is the whole point of a form rather than a mailto
link.

**Independent Test**: Submit three fictional applications with different profiles and confirm that
each one can be sorted, compared, and triaged from the responses alone.

**Acceptance Scenarios**:

1. **Given** a set of submitted applications, **When** a coordinator reviews them, **Then** every
   application shows skills, weekly availability, location, languages, and travel availability.
2. **Given** a new submission, **When** it arrives, **Then** the organization is notified rather
   than having to remember to check.

---

### User Story 3 - The form matches the visitor's language (Priority: P2)

The site is published in Portuguese, English, Spanish, and French. A visitor reading in French
reaches a form they can complete without switching languages.

**Why this priority**: Real, but the first two stories deliver value on their own. Senegal is named
on the site as the next project, which makes French more than theoretical.

**Independent Test**: Switch the site language and confirm the volunteer call to action leads to a
form the visitor can read.

**Acceptance Scenarios**:

1. **Given** a visitor with the site in a given language, **When** they press the volunteer call to
   action, **Then** the form they reach is understandable in that language.

### Edge Cases

- A submission arrives with a skill set the organization has no current need for. It is still
  recorded and can be found later; nothing is discarded.
- Someone submits twice. Duplicates are visible to the reviewer rather than silently merged.
- A minor applies. The form states any age condition rather than collecting a birth date it does not
  need.
- Someone offers only money, not time. The form points them to the donation path instead of
  collecting an application nobody will act on.
- A visitor abandons the form halfway. Nothing partial is recorded, and no personal data is kept.

## Requirements *(mandatory)*

### Functional Requirements

**Reaching the form**

- **FR-001**: The volunteer call to action on the site MUST open the volunteer form. The browser
  alert currently shown MUST be removed.
- **FR-002**: The form MUST open without the visitor needing an account or a login.

**What the form asks**

- **FR-003**: The form MUST collect the applicant's name and an email address, both required, since
  no reply is possible without them.
- **FR-004**: The form MUST collect the applicant's city and country, so the organization can tell a
  local volunteer from a remote one.
- **FR-005**: The form MUST collect which languages the applicant speaks, from the four the
  organization works in, with room for others.
- **FR-006**: The form MUST collect areas of contribution as a multiple choice list covering at
  least: drilling and hydrogeology, solar and electrical engineering, monitoring and instrumentation,
  software and data, communication and social media, fundraising and partnerships, translation,
  administration, legal, accounting, and field logistics, plus a free-text option.
- **FR-007**: The form MUST collect how many hours per week the applicant can offer, in ranges
  rather than a free number, so responses are comparable.
- **FR-008**: The form MUST collect whether the applicant is available for remote work only, or also
  for travel to a project site.
- **FR-009**: The form MUST collect a short description of relevant experience, and MUST allow a
  link to a professional profile or portfolio.
- **FR-010**: The form MUST ask why the applicant wants to contribute to this organization. This is
  the answer that separates a considered application from a mass one.
- **FR-011**: The form MUST ask how the applicant heard about Wells of Change.
- **FR-012**: Every question that is not needed to evaluate an application MUST be optional. A long
  form suppresses the applications this feature exists to collect.

**Data protection**

- **FR-013**: The form MUST state who collects the data, what it is used for, and how to request its
  deletion, and MUST require the applicant to consent before submitting. The organization is
  Brazilian, applicants are identifiable individuals, and Brazilian data protection law applies.
- **FR-014**: The form MUST NOT collect government identifiers, financial details, or any special
  category of personal data. None of it is needed to evaluate a volunteer.

**After submission**

- **FR-015**: On submission, the applicant MUST see a confirmation that states what happens next and
  the expected response time.
- **FR-016**: Responses MUST be collected somewhere a reviewer can sort and filter them.
- **FR-017**: A new submission MUST notify the organization without anyone having to check manually.
- **FR-018**: The form MUST be readable and completable on a phone. Most of the site's traffic
  arrives that way.

**Language**

- **FR-019**: The form MUST be available in [NEEDS CLARIFICATION: one language for everyone, or one
  form per site language? A single Portuguese form is the least work and excludes the French and
  Spanish audiences the site deliberately serves. Four forms mean four sets of responses to review.]

### Key Entities

- **Volunteer application**: one person's offer to help. Identity and contact, location, languages,
  areas of contribution, weekly availability, travel availability, experience and profile link,
  motivation, referral source, consent, and submission date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can complete and submit the form in under 5 minutes.
- **SC-002**: A reviewer can decide whether to contact an applicant from the recorded response
  alone, without asking for more information, in at least 80% of submissions.
- **SC-003**: At least 70% of people who open the form finish it. A lower rate means it is asking
  too much.
- **SC-004**: Every submission gets a human reply within 14 days, which is the promise the
  confirmation message makes.
- **SC-005**: No visitor reaches a dead end from the volunteer call to action, measured as zero
  reports of the "Coming soon" alert after release.

## Assumptions

- The organization already has the Google Form referenced in the request and will use it rather than
  build something new. It is free, needs no maintenance, and collects responses in a spreadsheet the
  team can already use.
- Responses are reviewed by the address published on the site, `wellsofchange@gmail.com`, unless the
  organization names someone else.
- The 14-day reply window in SC-004 is a starting commitment, not a measured capacity.
- Applicants are adults. If the organization accepts minors, the form needs a guardian consent
  question, which this specification does not include.
- The form is reached by a link from the site. Embedding it in the page is out of scope; it changes
  the page's layout and the site's data protection surface.
- Applications are stored for as long as the organization might act on them, and deleted on request.

## Out of Scope

- Automated screening, scoring, or ranking of applicants.
- A volunteer account, dashboard, or profile on the site.
- Interview scheduling, onboarding, or task assignment.
- Publishing volunteer names or photographs on the site.

## Dependencies

- Edit access to the Google Form. The account currently signed in to the browser,
  `jonyfs@gmail.com`, is refused: opening the form's edit URL returns "Você precisa ter acesso".
  Someone signed in as the form's owner has to grant access before the fields can be edited.
- A change to `TogetherForChange.tsx` and to the four dictionaries in `i18n.tsx`, to replace the
  alert with the link.
