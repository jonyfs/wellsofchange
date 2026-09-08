---

description: "Task list for feature implementation"
---

# Tasks: More of the organization visible in a search result

**Input**: Design documents from `/specs/015-search-surface/`

**Prerequisites**: spec.md, plan.md, research.md, data-model.md, contracts/structured-data.md, quickstart.md

**Tests**: None. The spec asks for no test suite, the repository has none, and the audit script plus
the schema validator are what stand in for one here. The checks live in Phase 2 and in the final
validation rather than as separate test tasks.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel, meaning a different file and no dependency
- **[Story]**: Which user story the task serves

## Path conventions

This feature has no `src/`. Everything is in `client/index.html` and two skill documents, per the
Structure Decision in plan.md.

---

## Phase 1: Setup

**Purpose**: Nothing to set up. No dependency is added, no directory is created, and the build already
runs.

Skipped on purpose, rather than filled with a task that does nothing.

---

## Phase 2: Foundational

**Purpose**: Make the checks real before changing anything they check, so the work that follows is
measured rather than asserted.

- [x] T001 Add a title length assertion to `.claude/skills/seo-check/scripts/check-seo.mjs`: fail above
      60 characters, pass below. It currently reports the number from a check that only tests presence.
- [x] T002 Add a description length assertion to the same script: fail above 160 characters. Same
      reason.
- [x] T003 Run the script against the current build and confirm both new checks pass on today's title
      and description, which are 48 and 141 characters. A check that fails on the existing content
      would mean the threshold is wrong, not the content.

**Checkpoint**: The audit now enforces FR-001 and FR-002 instead of narrating them.

---

## Phase 3: User Story 1 - Someone sees the result and knows what the organization is (Priority: P1)

**Goal**: The two lines a search engine renders say what the organization does, where, and that it is
a nonprofit.

**Independent Test**: Build, read the title and description at result width, and confirm a reader who
does not click can say what the organization is and where it works.

- [x] T004 [US1] Rewrite `<meta name="description">` in `client/index.html` so it states the activity,
      the region, and that this is a nonprofit, staying under 160 characters and in the prerendered
      language. Keep it true of the page: no promise the page does not deliver.
- [x] T005 [US1] Update `og:description` in `client/index.html` to agree with the new description. The
      social variant may be phrased differently but must not contradict it.
- [x] T006 [US1] Leave `<title>` and `og:title` unchanged, and record why in the pull request: the
      tagline is the page's own `h1`, so replacing it in the result would make the result and the page
      disagree.
- [x] T007 [US1] Rebuild and confirm the audit's two new checks pass and nothing else regressed.

**Checkpoint**: The snippet satisfies FR-001, FR-002 and FR-003.

---

## Phase 4: User Story 2 - An answer engine states facts and gets them right (Priority: P2)

**Goal**: The served HTML carries how to donate and which languages the organization answers in, as
structured data, without JavaScript.

**Independent Test**: Parse the built page's JSON-LD and answer, from it alone, how to donate from
Brazil, how to donate from abroad, and which languages the organization can be written to.

- [x] T008 [US2] Add `availableLanguage` to the existing `contactPoint` in the `NGO` block of
      `client/index.html`, listing `pt-BR`, `en`, `es` and `fr`.
- [x] T009 [US2] Add a `potentialAction` array to the `NGO` block with two `DonateAction` entries, per
      `contracts/structured-data.md`. The Brazilian one names PIX and the CNPJ; the international one
      names SWIFT, carries the IBAN in its description, and uses the registered beneficiary name
      rather than the trading name.
- [x] T010 [US2] Write the `name` and `description` of both actions in the prerendered language,
      saying plainly which is for donors inside Brazil and which is for donors abroad.
- [x] T011 [US2] Compare every identifier added against
      `client/src/components/DonationDialog.tsx` character for character: the CNPJ, the SWIFT code,
      the IBAN and the beneficiary name. Two copies of a bank detail is the risk this feature
      introduces.
- [x] T012 [US2] Rebuild and parse the JSON-LD from `dist/public/index.html`, confirming four blocks
      still parse and the two actions and four languages are present.

**Checkpoint**: FR-004 through FR-009 are satisfied, and the facts agree with the dialog.

---

## Phase 5: Correcting what expired

**Goal**: The next person reading these files learns what FAQ markup does now, rather than what it
did in 2023.

**Independent Test**: Read the FAQ block and the two skill documents and find the date and the current
status without leaving the repository.

- [x] T013 Add an HTML comment above the `FAQPage` block in `client/index.html` recording that Google
      removed FAQ rich results on 7 May 2026, that the block stays because Google still parses it and
      answer engines still quote it, and that it should not be expected to change how a result looks.
- [x] T014 [P] Update the structured-data paragraph in `.claude/skills/seo-content/SKILL.md` with the
      same fact. Its current wording, that the block gives answer engines material to quote, stays,
      because it is still true; what is added is what the block no longer does.
- [x] T015 [P] Add the same note to `.claude/skills/seo-check/SKILL.md`, where the rules for this
      site's structured data live.
- [x] T016 Record in `.claude/skills/seo-check/SKILL.md` that sitelinks cannot be requested, that they
      need more than one indexable page, and that this site has one by decision. This question has now
      been asked twice, and answering it in the repository is cheaper than answering it again.
- [x] T017 Record in the same file what `llms.txt` is and is not: Perplexity fetches it, Google has
      said it does not support it, and 97% of published files received no requests at all in May 2026.
      Written so nobody enlarges it expecting search results.

**Checkpoint**: FR-010, FR-011, FR-013 and FR-014 are satisfied.

---

## Phase 6: Validation

- [x] T018 Run `npm run check`. It will not exercise these files, and it is the constitution's gate, so
      it runs anyway.
- [x] T019 Run `npm run build:site` and then the audit against `dist/public`. Expected: zero failures,
      one warning, which is `hreflang`.
- [x] T020 Run every check in `quickstart.md`, including the identifier comparison against the dialog.
- [ ] T021 Validate the structured data at `https://validator.schema.org/`. **Not done.** The
      validator wants a public URL or a paste, and the built page is not published from this
      repository. Every block parses as JSON and every type and property used is core schema.org
      vocabulary, which is as far as a local check reaches. Run this against the live page after it
      is published, or paste `dist/public/index.html` by hand. The Rich Results Test will report no
      eligible rich result for the FAQ block, which is correct and is the reason T013 exists.
- [x] T022 Confirm US3 needs no work: the share card was already corrected to 1200x630 and its
      description already comes from the same tags as the snippet, so T005 covers it.
- [x] T023 Pass every document written or edited in this feature through the humanizer skill, per
      principle VII.
- [x] T024 Open the pull request, stating what was measured before and after and what was deliberately
      left alone.

---

## Dependencies and execution order

- **Phase 2** runs first. The checks have to be real before the content they check is edited.
- **Phase 3** (US1) and **Phase 4** (US2) both touch `client/index.html`, so they are sequential
  despite serving independent stories. Either could ship alone.
- **Phase 5** is independent of both and could be done first; it is last because it is documentation
  and the code changes are what the pull request is for.
- **Phase 6** depends on everything.

### Parallel opportunities

Only T014 and T015 are genuinely parallel: two different skill files, no shared content. Everything
else queues behind `client/index.html`, which every other task edits.

This is a small feature in one file. Marking more tasks `[P]` would be decoration.

---

## Implementation strategy

Ship it as one pull request. Splitting a description rewrite and two JSON-LD properties across three
pull requests would cost more review than it saves.

If it has to be split, US1 alone is a complete increment: a better snippet, no structured data
changes, no documentation edits.

## Notes

- Every value added is a public claim about a real organization. T011 exists because two copies of a
  bank identifier will eventually disagree, and the one in the head is the copy nobody looks at.
- No task claims a change in how a search result is displayed. That is the engine's decision and no
  criterion in the spec asserts one.
