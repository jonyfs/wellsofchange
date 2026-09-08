# Research: More of the organization visible in a search result

**Date**: 2026-09-07

Everything below was checked against the repository as it stands or against published reporting, and
each external claim carries a date because all three are the kind that go stale.

## What the page already carries

Reading `client/index.html` first turned out to matter, because most of what the spec asks for is
already there.

The `NGO` block already publishes `legalName`, `taxID`, `foundingDate`, `slogan`, `mission`,
`knowsAbout` with seven entries, `areaServed` covering Campo Formoso, Brazil and Senegal, a postal
address, a `contactPoint`, three `sameAs` links, the founder and six employees. The `WebSite` block
distinguishes the site from the organization. The `FAQPage` block answers six questions. The
`ItemList` of `SiteNavigationElement` entries, added in the section work, lists the eight sections.

So FR-004 and FR-007 are largely satisfied already. What is genuinely missing is narrow, and the plan
is smaller than the spec's requirement list suggests.

## Decision: nonprofit status is already stated by the type

**Decision**: Do not add a `nonprofitStatus` property. `@type: NGO` is the statement.

**Rationale**: schema.org's `nonprofitStatus` takes values from `NonprofitType`, whose subtypes are
`USNonprofitType`, `NLNonprofitType` and `UKNonprofitType`. There is no Brazilian enumeration. Filling
one of the others would assert a legal status the organization does not hold, in a file that is a
public claim about a real body. `NGO` is a subtype of `Organization` and already says the thing.

**Alternatives considered**: A free-text `nonprofitStatus` value. Rejected because a consumer
expecting the enumeration gets an unparseable string, which is worse than the absence.

## Decision: donation becomes a `DonateAction`, twice

**Decision**: Add two `potentialAction` entries of type `DonateAction` to the `NGO` block, one for
donating inside Brazil and one from abroad, each naming its instrument.

**Rationale**: This is FR-005, and it is the one fact on the page that an agent might want to act on
rather than quote. The donation details are already visible in the dialog, but they live in React
state, so nothing without JavaScript can see them. Restating them in the head puts them where a
crawler already reads. `DonateAction` is a schema.org type in the core vocabulary.

The two paths are genuinely different instruments, not one action with two hints: PIX resolves
against a Brazilian tax registration and settles domestically, while the international path is a
SWIFT transfer against an IBAN. Collapsing them would tell a foreign donor to use a method their bank
cannot reach.

**Alternatives considered**: A single `DonateAction` with a description covering both. Rejected for
the reason above. Also considered `Organization.funding`, which describes grants received rather than
how to give, and is the wrong direction.

## Decision: `availableLanguage` on the contact point

**Decision**: List `pt-BR`, `en`, `es` and `fr` as `availableLanguage` on the existing
`contactPoint`.

**Rationale**: FR-006. The site is published in four languages, so a reader can reasonably infer the
organization answers in them, and an answer engine asked "can I write to them in French" currently has
nothing to go on. The four are the languages the site itself commits to.

**Risk noted**: This is a promise about human behaviour, not markup. If nobody there reads French, the
claim is false and FR-008 makes that a defect. The languages are taken from what the site already
offers, which is the same promise the language selector makes, so the claim is no wider than one the
organization already published.

## Decision: the FAQ block stays, and the reason is written down

**Decision**: Keep the six-question `FAQPage`. Add a comment above it in `client/index.html` recording
that Google removed FAQ rich results on 7 May 2026 and why the block is still there.

**Rationale**: Google removed FAQ rich results from Search on 7 May 2026, finishing a withdrawal begun
in August 2023, and no site is eligible now, including the government and health publishers that had
kept it. Search Console's FAQ reporting goes in June 2026 and the API support in August 2026.

The block still earns its place: `FAQPage` remains valid schema.org, Google has said it continues
parsing FAQ markup to understand pages, and the six answers are exactly the material an answer engine
quotes. What changed is the payoff, not the validity.

**What did not need correcting**: The repository was searched for the claim that this markup produces
a search appearance, and it does not make one. `seo-content/SKILL.md` says the block "would give
answer engines material they can quote", which is still true, and spec 005's FR-004 says the same.
The wrong framing lived in a pull request description, which is history rather than guidance. So
FR-011 shrinks to recording the date and the current status where the block and the advice live,
rather than hunting down false statements that turned out not to exist.

## Decision: the snippet is rewritten, narrowly

**Decision**: Rewrite the description. Leave the title.

**Rationale**: Measured against FR-001 and FR-002:

```
title        48 chars   "Wells of Change - Mudando vidas, um poço por vez"
description 141 chars   "Poços com energia solar e monitoramento em tempo real levam
                         água potável a comunidades carentes, do Nordeste brasileiro
                         à África Subsaariana."
```

Both are within their limits, so neither is being cut. The title names the organization and its
tagline implies wells, which satisfies FR-001.

The description states the activity and the region but never says this is a nonprofit, which FR-002
requires and which is the single most useful word for someone deciding whether to click. It also
never names the organization, so a result matching a query about water projects gives no clue whose
project it is.

**Alternatives considered**: Rewriting the title too, to name the activity outright. Rejected: the
tagline is the organization's own line, it appears as the page's `h1`, and replacing it in the search
result with something more literal would make the result and the page disagree, which is what FR-003
forbids.

## Decision: the audit script gains the checks the spec relies on

**Decision**: Add title and description length assertions with the thresholds FR-001 and FR-002 name.

**Rationale**: The script already reports both lengths, but reports them as `OK` from a check that
tests only presence. A requirement nobody can fail is not a requirement. Making it fail keeps the
next edit honest without anyone remembering this spec.

## What was deliberately not researched further

IndexNow, per-section URLs, per-language URLs and `hreflang` are all out of scope in the spec. The
scope question was put to the person asking before the spec was written, and the answer was to keep
one address.
