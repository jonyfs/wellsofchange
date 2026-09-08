# Quickstart: verifying the search surface

**Date**: 2026-09-07

Every check below runs against a build, not against the source. The source has no prerendered body,
so an audit of it reports a failure that means nothing.

## Prerequisites

```bash
npm install
```

## Build and audit

```bash
npm run build:site
node .claude/skills/seo-check/scripts/check-seo.mjs dist/public
```

Expected after this feature: zero failures, and the title and description checks passing as checks
rather than as reports. The remaining warning is `hreflang`, which stays out of reach while four
languages share one address.

## Confirm the snippet fits

```bash
python3 - <<'PY'
import re
s = open('dist/public/index.html', encoding='utf-8').read()
t = re.search(r'<title>(.*?)</title>', s).group(1)
d = re.search(r'name="description" content="(.*?)"', s).group(1)
print(f'title       {len(t):3} chars  {"ok" if len(t) < 60 else "TOO LONG"}')
print(f'description {len(d):3} chars  {"ok" if len(d) < 160 else "TOO LONG"}')
print()
print(t)
print(d)
PY
```

Read the description out loud. It has to say what the organization does, where, and that it is a
nonprofit. A number under 160 is necessary and not sufficient.

## Confirm the structured data parses

```bash
python3 - <<'PY'
import json, re
s = open('dist/public/index.html', encoding='utf-8').read()
for i, block in enumerate(re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S), 1):
    data = json.loads(block)
    print(f'block {i}: {data.get("@type")}')
PY
```

Expected: `NGO`, `WebSite`, `ItemList`, `FAQPage`.

## Confirm the donation paths reached the head

```bash
python3 - <<'PY'
import json, re
s = open('dist/public/index.html', encoding='utf-8').read()
ngo = next(json.loads(b) for b in
           re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
           if json.loads(b).get('@type') == 'NGO')
for action in ngo.get('potentialAction', []):
    print(action['@type'], '|', action.get('instrument', {}).get('name'),
          '|', action.get('instrument', {}).get('identifier'))
print('languages:', ngo['contactPoint'].get('availableLanguage'))
PY
```

Expected: two `DonateAction` entries, one PIX and one SWIFT, and the four languages.

## Confirm the bank details agree with the dialog

The head now repeats identifiers that the donation dialog also shows. They have to match exactly, so
compare them rather than trusting that they were copied correctly:

```bash
grep -o 'BRASBRRJBHE\|BR3300000000005970000421766C1\|43\.933\.784/0001-13' \
  client/src/components/DonationDialog.tsx | sort -u
grep -o 'BRASBRRJBHE\|BR3300000000005970000421766C1\|43\.933\.784/0001-13' \
  dist/public/index.html | sort -u
```

The two lists must be identical.

## Validate against schema.org

Paste the built page's source, or the URL once it is published, into:

- <https://validator.schema.org/>
- <https://search.google.com/test/rich-results>

Expected: no errors. The Rich Results Test will report no eligible rich result for the FAQ block,
which is correct and is the reason the comment above it exists.

## What cannot be checked here

Whether a search engine chooses to show anything different. That is its decision, it takes weeks, and
no criterion in the spec claims it.
