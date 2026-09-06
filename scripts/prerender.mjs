#!/usr/bin/env node
// Renders the app at build time and injects the result into dist/public/index.html.
//
// Google runs JavaScript and can index what React produces in the browser. GPTBot, ClaudeBot,
// PerplexityBot and similar agents generally do not, so without this they receive an empty root div
// and can say nothing about the organization beyond the metadata in the head.
//
// Run after `vite build`:
//   npx vite build --base=/ && node scripts/prerender.mjs
//
// The client still mounts with createRoot, which discards the server markup and renders from
// scratch, so there is no hydration to mismatch. A visitor whose stored language differs from the
// prerendered one sees the prerendered text for the moment before React takes over.

import { build } from "vite";
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const HTML = "dist/public/index.html";
const SSR_OUT = "dist/ssr";
const PLACEHOLDER = '<div id="root"></div>';

if (!existsSync(HTML)) {
  console.error(`${HTML} not found. Run the client build first.`);
  process.exit(1);
}

console.log("Building the server bundle...");
// vite.config.ts sets root to client/, so both paths are resolved from the repository root here to
// avoid depending on that.
await build({
  logLevel: "warn",
  build: {
    ssr: resolve("client/src/entry-server.tsx"),
    outDir: resolve(SSR_OUT),
    emptyOutDir: true,
    // Assets are already emitted by the client build; this pass only needs the markup.
    copyPublicDir: false,
  },
});

const { render } = await import(pathToFileURL(resolve(SSR_OUT, "entry-server.js")).href);
const markup = render();

const html = readFileSync(HTML, "utf8");
if (!html.includes(PLACEHOLDER)) {
  console.error(`${HTML} does not contain ${PLACEHOLDER}. The template changed; update this script.`);
  process.exit(1);
}

writeFileSync(HTML, html.replace(PLACEHOLDER, `<div id="root">${markup}</div>`));
rmSync(SSR_OUT, { recursive: true, force: true });

const text = markup.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
console.log(`Injected ${markup.length} chars of markup, ${text.length} chars of text, into ${HTML}.`);

if (text.length < 500) {
  console.error("That is less text than a rendered page should produce. Not injecting silently.");
  process.exit(1);
}
