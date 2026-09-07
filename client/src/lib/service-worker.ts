/**
 * Registers the service worker that makes the site installable and readable offline.
 *
 * Only in production builds: in development the worker would serve stale modules and make every
 * change look like it did not apply.
 *
 * `updateViaCache: "none"` keeps the browser from caching the worker script itself, so a corrected
 * bank detail is never one stale worker away from the donor who needs it.
 */
export function registerServiceWorker() {
  if (!import.meta.env.PROD) return;
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((error) => {
        // A failed registration costs the offline behaviour and nothing else, so the page carries on.
        console.warn("Service worker registration failed:", error);
      });
  });
}
