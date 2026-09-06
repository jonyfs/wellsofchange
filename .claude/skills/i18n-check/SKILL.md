---
name: i18n-check
description: Verify translation parity across the four language dictionaries in client/src/lib/i18n.tsx. Use after adding, renaming, or removing any user-visible string, and before opening a pull request that touches copy or components.
---

# Translation parity check

The constitution requires every key to exist in all four dictionaries (`en`, `pt-BR`, `es`, `fr`).
TypeScript cannot enforce this: `translations` is typed `Record<Language, any>`, so a key missing
from one language compiles cleanly and then renders the raw key string to the visitor.

Run the check:

```bash
node .claude/skills/i18n-check/scripts/check-i18n.mjs
```

It reports three things:

- **Missing translations.** A key defined in some dictionaries but not all four. Fails the check.
- **Keys used but defined nowhere.** A `t("...")` call with no matching entry. The visitor sees the
  key. Fails the check.
- **Defined but unused.** Dead entries, usually left behind when a section was removed.
  Informational only, since a key may be referenced dynamically.

## Fixing a failure

Add the entry to every dictionary in the same edit, keeping the surrounding structure. The keys
themselves stay in English; only the values are translated.

For a missing translation, write real copy in the target language. A copy of the English string is
not a translation, and it ships to visitors as though it were one. If you cannot produce accurate
copy in a language, say so rather than filling the gap with English text.

## Limits

The script scans the dictionary literal by brace depth rather than parsing TypeScript. If it reports
zero keys for a language, the dictionary layout changed and the script needs updating. It also
matches `t("literal")` calls only, so a key built at runtime will show as unused.
