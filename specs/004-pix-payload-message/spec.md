# Feature Specification: PIX Payload Text

**Feature Branch**: `004-pix-payload-message`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "melhore a mensagem do pix já que no pix deve ter menção de: Doação para a ONG Wells of Change. remova qualquer menção de campo formoso no código pix"

## Context

The PIX code the donation dialog generates carries two pieces of text the donor sees in their bank
app before confirming: the message shown alongside the payment, and the city registered for the
merchant.

The message currently reads "Doacao para Wells of Change". It does not say the recipient is an NGO,
which is the fact that reassures someone about to send money to a CNPJ they do not recognise.

The city currently reads "CAMPO FORMOSO". That is where the first well was built, not where the
organization is registered. In a PIX payload the city field identifies the recipient, so a donor
comparing the QR code against the organization's public records sees a city that matches nothing:
the site, the structured data, and the bank all give Rio de Janeiro.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A donor recognises who they are paying (Priority: P1)

Someone scans the QR code with their bank app. Before confirming, they see who receives the money,
in which city, and what the payment is for. Nothing on that screen contradicts what the site told
them.

**Why this priority**: This is the last screen before the money moves. Anything unexplained there
stops a donation.

**Independent Test**: Generate the code, scan it with a bank app, and read the confirmation screen.

**Acceptance Scenarios**:

1. **Given** a donor scanning the QR code, **When** their bank app shows the payment details,
   **Then** the message identifies the payment as a donation to the NGO Wells of Change.
2. **Given** the same screen, **When** the donor looks at the recipient's city, **Then** it is the
   city where the organization is registered, and no other place name appears.
3. **Given** a donor who copies the CNPJ instead of scanning, **When** they complete the transfer,
   **Then** the recipient details match what the QR code carries.

### Edge Cases

- A bank app truncates long text. The message has to make sense when cut short, so the important
  words come first.
- A bank app mishandles accented characters in the payload. Text stays unaccented, as it is today.
- The payload's city field is limited to 15 characters and cannot be empty. The chosen city has to
  fit and has to be real.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The PIX payload message MUST read `Doacao para a ONG Wells of Change`.
- **FR-002**: The payload MUST NOT contain "Campo Formoso" or any other place that is not the
  organization's registered city.
- **FR-003**: The merchant city in the payload MUST be `RIO DE JANEIRO`, which matches the address
  published on the site, the address in the structured data, and the beneficiary address held by the
  bank.
- **FR-004**: Payload text MUST stay within the BR Code limits: 25 characters for the recipient
  name, 15 for the city, 25 alphanumeric for the transaction identifier.
- **FR-005**: Payload text MUST remain unaccented. Bank apps normalise or mangle accents, and
  "Doação" arriving as "Doa??o" undermines the reassurance the message exists to give.
- **FR-006**: The generated code MUST still be scannable and MUST still leave the amount for the
  donor to choose.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A donor scanning the code sees the recipient identified as an NGO before confirming.
- **SC-002**: No place name other than the organization's registered city appears anywhere in the
  payload.
- **SC-003**: The code is accepted by a bank app on the first scan, with the amount left open.
- **SC-004**: Every payload field stays within its BR Code length limit, checked against the
  generated payload rather than assumed.

## Assumptions

- Rio de Janeiro is the organization's registered city. The site's footer, the structured data in
  `client/index.html`, and the beneficiary address supplied by the bank all say so.
- "ONG" is understood by Brazilian donors, who are the audience for PIX. It is not translated,
  because the payload is read inside Brazilian bank apps.
- The message field is not a place for a campaign name or a fundraising slogan. It exists so the
  donor knows what they are paying for.

## Out of Scope

- The donation dialog's layout and copy, which are covered by `002-international-donations`.
- Fixed donation amounts or suggested values.
- Any change to the PIX key, which stays the organization's CNPJ.

## Dependencies

- None. The change is confined to the values used to build the payload.
