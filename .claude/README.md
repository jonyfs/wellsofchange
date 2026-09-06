# Claude Code configuration

Project-scoped automation for this repository. Everything here is versioned so every contributor and
every machine gets the same behavior, rather than relying on personal global configuration.

## Skills

| Skill | Invoked by | What it does |
|---|---|---|
| `site-design` | Claude or user | Design rules for the landing page: theme tokens, the elevate interaction system, type scale, spacing, accessibility. |
| `i18n-check` | Claude or user | Verifies that every translation key exists in all four dictionaries. Ships a script. |
| `new-section` | User only | Adds a landing page section end to end: component, four translations, page order, navigation. |
| `deploy-check` | User only | Builds the way CI does and verifies the output before it can reach the live domain. |
| `humanizer` | Claude or user | Removes AI writing patterns from prose. Vendored from the upstream skill; preserves the document's language. |
| `speckit-*` | User only | Spec-driven development flow: specify, clarify, plan, tasks, implement. |

## Subagents

`i18n-reviewer` reviews a diff for the two rules nothing else checks: English as the authoring
language, and four-language parity for every key.

## Hooks

Configured in `settings.json`.

- `block-main-commit.sh` (PreToolUse on Bash) refuses commits, pushes, merges, and hard resets while
  the current branch is `main`. A push to `main` deploys to the live site, and the constitution
  requires a pull request for every change.
- `typecheck-on-edit.sh` (PostToolUse on Edit and Write) runs `npm run check` after a `.ts` or `.tsx`
  file changes. The project has no linter and no test suite, so the compiler is the only automated
  gate.

Both hooks fail open: if the input cannot be parsed or dependencies are not installed, they exit
without blocking.

## Related

The governing rules live in `.specify/memory/constitution.md`. Repository orientation for Claude
lives in `CLAUDE.md` at the root.
