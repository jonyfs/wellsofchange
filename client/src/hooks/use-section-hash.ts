import { useEffect } from "react";

/**
 * Lands the reader on the section named in the address.
 *
 * The browser does this on its own for an ordinary page, and it does it here too, against the
 * prerendered markup. That markup is then thrown away: the client mounts with `createRoot`, which
 * renders the page again from scratch, and the element the browser had scrolled to no longer
 * exists. The reader ends up at the top of a page they asked to open at a section.
 *
 * So the landing is re-applied once after mount, and again whenever the fragment changes through
 * the back and forward buttons.
 *
 * A fragment naming no section is left alone. The page opens at the top, which is what the browser
 * would have done anyway.
 */
export function useSectionHash() {
  useEffect(() => {
    const landOnHash = (animated: boolean) => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      const element = document.getElementById(id);
      if (!element) return;

      element.scrollIntoView(animated ? undefined : { behavior: "auto" });
    };

    // The first landing is not animated. Scrolling the page while it is still settling reads as a
    // glitch, and someone arriving from a search result never saw the top of the page to be moved
    // away from it.
    landOnHash(false);

    const onPopState = () => landOnHash(true);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onPopState);
    };
  }, []);
}
