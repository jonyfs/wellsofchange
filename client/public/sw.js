/*
 * Service worker for the Wells of Change site.
 *
 * The site is one prerendered page plus hashed assets, and it is copied to production by hand from
 * another account. That shapes two decisions:
 *
 *   The document is fetched network-first. A donor must never be shown a stale bank detail or an
 *   old IBAN because a cached page outlived a correction. The cache is the fallback for a failed
 *   request, not the default answer.
 *
 *   Assets under /assets/ are fetched cache-first. Their filenames carry a content hash, so a new
 *   build produces new names and the old entries simply stop being requested.
 *
 * Bumping CACHE_VERSION discards every older cache on the next activation.
 */

const CACHE_VERSION = "v1";
const SHELL_CACHE = `woc-shell-${CACHE_VERSION}`;
const ASSET_CACHE = `woc-assets-${CACHE_VERSION}`;

// Enough to open the page offline: the document itself and the icons a launcher needs.
const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("woc-") && key !== SHELL_CACHE && key !== ASSET_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only this origin. Google Fonts and anything else stays on the network.
  if (url.origin !== self.location.origin) return;

  // The page itself: network first, cache as the fallback when the network fails.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put("/", copy));
          return response;
        })
        .catch(() => caches.match("/").then((cached) => cached || caches.match(request)))
    );
    return;
  }

  // Hashed build output: cache first, since the name changes when the content does.
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(ASSET_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else on the origin: try the network, fall back to whatever was cached.
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
