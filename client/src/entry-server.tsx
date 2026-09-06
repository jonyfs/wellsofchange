// Entry point for the build-time prerender. Never shipped to the browser.
//
// The site is static and has one route, so this renders the app to a string that gets injected into
// index.html. Crawlers that do not run JavaScript then receive the page text instead of an empty
// div. See scripts/prerender.mjs.
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(): string {
  return renderToString(<App />);
}
