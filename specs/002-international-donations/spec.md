# Feature Specification: International Donation Details

**Feature Branch**: `002-international-donations`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "ao clicar no botão de doação no site abre a tela de doação, porém não está configurado para fazer doações internacionais usando swift code e outras informações... crie uma seção após o fim deste dialog e antes do agradecimento final, informando como fazer a doação internacional"

## Context

The donation dialog offers two ways to give, and both only work from inside Brazil. PIX is a
Brazilian instant transfer system, and the bank block shows an agency and account number in the
domestic format. Someone holding a United States account, or any account outside Brazil, reads the
dialog, finds nothing they can use, and closes it.

The organization already receives international transfers. Its bank has issued the SWIFT code, IBAN,
and the beneficiary details a foreign bank needs. Those details are simply not on the site, so a
donor abroad has to email and wait for a reply before they can give.

The site is published in four languages and names Senegal as the next project, so the audience
outside Brazil is not hypothetical.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A donor abroad completes a transfer (Priority: P1)

Someone in the United States opens the donation dialog, scrolls past PIX and the Brazilian bank
details, and finds everything their bank asks for: SWIFT code, IBAN, beneficiary name, beneficiary
address, and bank address. They copy each value without transcribing it by hand and complete the
transfer from their own bank.

**Why this priority**: This is the whole feature. Nothing else matters if a donor abroad still
cannot give.

**Independent Test**: Open the dialog, locate the international section, and confirm every field a
foreign bank requires is present and copyable.

**Acceptance Scenarios**:

1. **Given** the donation dialog is open, **When** the visitor scrolls past the Brazilian transfer
   details, **Then** an international transfer section appears before the closing thank-you message.
2. **Given** the international section is visible, **When** the visitor presses the copy control
   next to a value, **Then** that value is copied and the interface confirms it.
3. **Given** a visitor reading the site in any of its four languages, **When** they open the
   section, **Then** its labels appear in that language while the bank values stay unchanged.

---

### User Story 2 - A Brazilian donor is not slowed down (Priority: P1)

Someone in Brazil opens the dialog and reaches PIX immediately, as they do today. The international
details exist but do not push the QR code off the screen or make the dialog feel like a form.

**Why this priority**: Most donors are Brazilian, and PIX is the fastest path for them. A feature for
donors abroad that costs domestic donations is a net loss.

**Independent Test**: Open the dialog at a 375px viewport and confirm the QR code is reachable
without scrolling past new content.

**Acceptance Scenarios**:

1. **Given** a visitor on a phone, **When** the dialog opens, **Then** the PIX QR code is visible
   without scrolling past the international section.

### Edge Cases

- A donor's bank asks for a field the section does not list, such as an intermediary bank or a
  routing number. The section names a contact address for questions.
- A donor copies the IBAN and their bank rejects it. Values are shown in a format that can be
  compared against what the bank displays, without decorative spacing that changes the value.
- The dialog is opened on a small screen where the section would dominate. The layout keeps the
  domestic options first.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The donation dialog MUST separate the two audiences into tabs, one for donors in
  Brazil and one for donors abroad, with the Brazilian tab selected when the dialog opens. The
  closing thank-you message stays below both tabs.
- **FR-002**: The section MUST show: bank name, bank address, SWIFT/BIC code, IBAN, branch, account
  number, beneficiary legal name, and beneficiary address.
- **FR-003**: Each value a donor has to enter at their own bank MUST be copyable in one action, in
  the same way the CNPJ already is.
- **FR-004**: Values MUST be displayed exactly as the bank issues them. No reformatting, no inserted
  spacing that a donor might copy by mistake.
- **FR-005**: Labels MUST come from the translation dictionaries in all four languages. Bank values
  are not translated.
- **FR-006**: The section MUST NOT displace the PIX block. A visitor on a phone still reaches the QR
  code first.
- **FR-007**: The section MUST state that the donor's bank may charge a transfer fee, and that the
  organization receives the amount net of it. A donor who discovers this after the fact feels
  misled.
- **FR-008**: The section MUST give the contact address published on the site for donors whose bank
  asks for something not listed.
- **FR-009**: The beneficiary legal name shown MUST be the name registered with the bank,
  "Associação Internacional, Poços Mudando as Vidas nas Sociedades", not the trading name "Wells of
  Change". A mismatch is the most common cause of a returned international transfer.

### Data to be published

These values come from the organization's bank. They are published as provided:

| Field | Value |
|---|---|
| Bank name | Banco do Brasil |
| Bank address | SAUN Quadra 5 Lote B, Edifício Banco do Brasil, 15º andar, Brasília, DF, Brasil, CEP 70040-250 |
| SWIFT/BIC | BRASBRRJBHE |
| IBAN | BR3300000000005970000421766C1 |
| Branch | 597-5 |
| Account | 42176-6 |
| Beneficiary | Associação Internacional, Poços Mudando as Vidas nas Sociedades |
| Beneficiary address | Rua das Laranjeiras 29, loja 218, Laranjeiras, Rio de Janeiro, RJ, Brasil, CEP 22240-000 |

- **FR-010**: The IBAN published MUST be `BR3300000000005970000421766C1`.

  The value first supplied read `33000000000005970000421766C1`: 28 characters, no country prefix,
  one character too many. A Brazilian IBAN is 29 characters, structured as `BR`, two check digits,
  an 8-digit ISPB bank code, a 5-digit branch, a 10-digit account, an account type letter, and an
  account holder digit.

  Deleting one character from the supplied string gives 26 candidates. Exactly one passes the mod-97
  check, and its fields match what the site already publishes:

  | Segment | Value | Matches |
  |---|---|---|
  | ISPB | `00000000` | Banco do Brasil |
  | Branch | `00597` | agency 597-5 |
  | Account | `0000421766` | account 42176-6 |
  | Type | `C` | checking account |
  | Holder | `1` | |

  The check digits computed from the bank data alone come to `33`, the same pair the supplied string
  opens with. That agreement has a 1 in 97 chance of being coincidence, which is what identifies the
  defect as a single stray zero rather than a wrong account.

  The SWIFT code was checked separately: `BRASBRRJBHE` is registered to Banco do Brasil, GECEX Belo
  Horizonte.

- **FR-011**: The IBAN MUST still be confirmed against the organization's own bank statement before
  release. The check above proves the number is well formed and consistent with the published branch
  and account. It cannot prove the bank issued that number for this account.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A donor outside Brazil can gather every value their bank requires from the dialog
  alone, without contacting the organization, in under 2 minutes.
- **SC-002**: Zero donors need to email for bank details that the section already contains.
- **SC-003**: The PIX QR code remains visible without scrolling on a 375px-wide screen when the
  dialog opens.
- **SC-004**: Every published value matches what the bank issued, verified field by field against
  the bank's own statement before release.

## Assumptions

- The organization's account accepts international transfers today. The bank issued these details,
  which implies it does.
- Donors abroad transfer in their own currency and the bank converts on arrival. The section does
  not quote rates or fees, which the organization does not control.
- The contact address for questions is `wellsofchange@gmail.com`, the address published on the site.
- The section is part of the existing dialog rather than a separate page, since the user asked for
  it there and a donor who opened the dialog has already decided to give.

## Out of Scope

- Card payments, PayPal, Stripe, Wise, or any payment processor.
- Currency conversion, fee estimates, or a donation amount calculator.
- Tax receipts or deductibility statements for donors abroad. Those carry legal claims that need
  the organization's accountant, not a developer.
- Recurring or scheduled donations.

## Dependencies

- Confirmation of the IBAN against the organization's bank statement, per FR-011.
- The visual design of the section. Approved: variant C, separate tabs for Brazil and abroad.
