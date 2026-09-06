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
| `frontend-design` | Claude or user | General guidance on aesthetic direction, typography, and avoiding templated defaults. Vendored from the `frontend-design` plugin, Apache 2.0, `LICENSE.txt` included. |
| `ui-ux-pro-max` | Claude or user | Searchable design database: styles, palettes, font pairings, product patterns, UX guidelines, and per-stack notes. Driven by `scripts/search.py`, Python 3, no dependencies. |
| `seo-check` | Claude or user | Audits the search and AI discoverability surface: metadata, structured data, host consistency, hreflang, crawlable text, sitemap freshness. Ships a script. |
| `seo-content` | Claude or user | How to write the site's search-facing text so both Google and AI answer engines can use it. |
| `speckit-*` | User only | Spec-driven development flow: specify, clarify, plan, tasks, implement. |

### Which design skill answers what

Three design skills overlap. They answer different questions, and the order matters when they
disagree.

1. `site-design` is this project's own truth: the tokens in `index.css`, the elevate interaction
   system, the type scale, the section anatomy, the `--golden` donation accent. When it conflicts
   with either general skill, it wins. A palette suggestion from a general skill does not override
   the theme tokens the site already ships.
2. `ui-ux-pro-max` answers "what pattern fits this kind of page", with a searchable database:

   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system
   ```

   Its color and font output is a starting point for discussion, not something to paste into the
   theme.
3. `frontend-design` answers "does this read as templated", and is the one to reach for when a
   layout feels generic rather than wrong.

## Subagents

`i18n-reviewer` reviews a diff for the two rules nothing else checks: English as the authoring
language, and four-language parity for every key.

`seo-reviewer` reviews a diff for search and AI discoverability regressions: metadata, structured
data, host consistency, alt text, headings, robots and sitemap.

## Hooks

Configured in `settings.json`.

- `block-main-commit.sh` (PreToolUse on Bash) refuses commits, pushes, merges, and hard resets while
  the current branch is the default branch, and refuses any push whose refspec targets it from any
  branch, since a refspec push deploys just as surely as pushing from the branch itself. Only the
  arguments of the push itself are inspected, so a command that merely mentions such a push, a
  commit message for instance, is not blocked. A push to the default branch reaches the live site,
  and the constitution requires a pull request for every change.
- `typecheck-on-edit.sh` (PostToolUse on Edit and Write) runs `npm run check` after a `.ts` or `.tsx`
  file changes. The project has no linter and no test suite, so the compiler is the only automated
  gate.

Both hooks fail open: if the input cannot be parsed or dependencies are not installed, they exit
without blocking.

## Related

The governing rules live in `.specify/memory/constitution.md`. Repository orientation for Claude
lives in `CLAUDE.md` at the root.

## Sourcing

`humanizer`, `frontend-design`, and `ui-ux-pro-max` are vendored copies of skills maintained
elsewhere. They are committed so a fresh clone works without personal global configuration, at the
cost of not tracking their upstream. Re-copy them when you want a newer version.

`ui-ux-pro-max` carries no license file upstream. Confirm its terms before this repository goes to a
wider audience.

Paths inside its `SKILL.md` were rewritten from `${CLAUDE_PLUGIN_ROOT}/...` to repository-relative
paths, since that variable is set for plugin installs and not for a project skill. Re-apply that
edit after any re-copy.
