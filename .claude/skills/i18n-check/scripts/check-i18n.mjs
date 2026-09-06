#!/usr/bin/env node
// Checks translation parity in client/src/lib/i18n.tsx against the keys components actually use.
//
// Three failures are reported:
//   1. missing   - a key present in some dictionaries but not all four
//   2. undefined - a t("...") call whose key exists in no dictionary (renders the raw key)
//   3. orphan    - a key defined in every dictionary that no component references
//
// Orphans are informational. Missing and undefined keys exit non-zero.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const I18N_FILE = "client/src/lib/i18n.tsx";
const SOURCE_DIR = "client/src";
const LANGUAGES = ["en", "pt-BR", "es", "fr"];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// Collects dotted key paths per language by scanning the translations literal.
// The file is a plain object literal, so brace depth tracking is enough and avoids
// pulling in a parser dependency.
function collectKeys(source) {
  const start = source.indexOf("const translations");
  if (start === -1) throw new Error(`No "const translations" found in ${I18N_FILE}`);

  const perLanguage = new Map(LANGUAGES.map((lang) => [lang, new Set()]));
  const lines = source.slice(start).split("\n");

  let language = null;
  const path = [];
  let depth = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//")) continue;

    const opening = trimmed.match(/^"?([A-Za-z0-9_-]+)"?\s*:\s*\{$/);
    const leaf = trimmed.match(/^"?([A-Za-z0-9_-]+)"?\s*:\s*(?:"|'|`)/);

    if (depth === 1 && opening && LANGUAGES.includes(opening[1])) {
      language = opening[1];
      depth += 1;
      continue;
    }

    if (opening) {
      if (depth >= 2) path.push(opening[1]);
      depth += 1;
      continue;
    }

    if (leaf && language && depth >= 2) {
      perLanguage.get(language).add([...path, leaf[1]].join("."));
      continue;
    }

    if (trimmed.startsWith("}")) {
      depth -= 1;
      if (depth === 1) language = null;
      else if (depth >= 2) path.pop();
      if (depth <= 0) break;
    } else if (trimmed.endsWith("{")) {
      depth += 1;
    }
  }

  return perLanguage;
}

// A key can reach t() three ways, and counting only the first reports live keys as dead:
//   t("section.key")                          - the literal call
//   copyToClipboard(value, "donate.labelCNPJ") - passed as an argument, resolved later
//   t(`nav.${link.key}`)                       - built from a prefix at runtime
function collectUsage() {
  const literals = new Set();
  const dynamicPrefixes = new Set();

  for (const file of walk(SOURCE_DIR)) {
    if (![".ts", ".tsx"].includes(extname(file))) continue;
    if (file.endsWith("i18n.tsx")) continue;
    const source = readFileSync(file, "utf8");

    // Any dotted string literal anywhere in the file, not only inside a t() call.
    for (const match of source.matchAll(/["'`]([A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)+)["'`]/g)) {
      literals.add(match[1]);
    }
    // t(`prefix.${...}`) makes every key under that prefix reachable.
    for (const match of source.matchAll(/\bt\(\s*`([A-Za-z0-9_.-]*?)\$\{/g)) {
      dynamicPrefixes.add(match[1]);
    }
  }

  return { literals, dynamicPrefixes };
}

const source = readFileSync(I18N_FILE, "utf8");
const perLanguage = collectKeys(source);
const { literals, dynamicPrefixes } = collectUsage();
const isUsed = (key) =>
  literals.has(key) || [...dynamicPrefixes].some((prefix) => prefix && key.startsWith(prefix));

for (const lang of LANGUAGES) {
  const count = perLanguage.get(lang).size;
  console.log(`${lang.padEnd(6)} ${count} keys`);
  if (count === 0) {
    console.error(`\nNo keys parsed for "${lang}". The dictionary layout may have changed.`);
    process.exit(1);
  }
}

const allKeys = new Set([...perLanguage.values()].flatMap((set) => [...set]));
const missing = [];
for (const key of [...allKeys].sort()) {
  const absent = LANGUAGES.filter((lang) => !perLanguage.get(lang).has(key));
  if (absent.length) missing.push({ key, absent });
}

// Only literals that look like translation keys are worth reporting as undefined; a dotted string
// in the source can be many other things.
const undefinedKeys = [...literals]
  .filter((key) => !allKeys.has(key))
  .filter((key) => [...allKeys].some((defined) => defined.split(".")[0] === key.split(".")[0]))
  .sort();
const orphans = [...allKeys].filter((key) => !isUsed(key)).sort();

if (missing.length) {
  console.log(`\nMissing translations (${missing.length}):`);
  for (const { key, absent } of missing) console.log(`  ${key} -> absent in ${absent.join(", ")}`);
}

if (undefinedKeys.length) {
  console.log(`\nKeys used in components but defined nowhere (${undefinedKeys.length}):`);
  for (const key of undefinedKeys) console.log(`  ${key}`);
}

if (orphans.length) {
  console.log(`\nDefined but unused (${orphans.length}, informational):`);
  for (const key of orphans) console.log(`  ${key}`);
}

if (missing.length || undefinedKeys.length) {
  console.log("\nFAIL: every key must exist in all four dictionaries (constitution, principle II).");
  process.exit(1);
}

console.log("\nOK: all keys present in en, pt-BR, es, and fr.");
