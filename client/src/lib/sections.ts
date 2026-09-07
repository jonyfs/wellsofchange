/**
 * The page's sections, in the order they appear.
 *
 * One list, because the same set has to agree in four places: the top navigation, the footer, the
 * structured data a crawler reads, and the addresses published in `llms.txt`. Keeping separate
 * copies is how a renamed section quietly stops being reachable from one of them.
 *
 * `id` is the fragment in the address, so renaming one breaks links people have already saved.
 * `labelKey` is the translation key for the section's name, so the navigation reads in the
 * visitor's language while the address stays stable.
 */
export interface Section {
  id: string;
  labelKey: string;
  /** Whether the section appears in the top navigation and the footer. */
  inNav: boolean;
}

export const SECTIONS: Section[] = [
  { id: "what-we-do", labelKey: "nav.whatWeDo", inNav: true },
  { id: "our-commitment", labelKey: "nav.ourCommitment", inNav: true },
  { id: "what-we-believe", labelKey: "nav.whatWeBelieve", inNav: false },
  { id: "our-story", labelKey: "nav.ourStory", inNav: true },
  { id: "who-we-are", labelKey: "nav.whoWeAre", inNav: true },
  { id: "partners", labelKey: "nav.partners", inNav: false },
  { id: "ethics", labelKey: "nav.ethics", inNav: true },
  { id: "join-us", labelKey: "nav.joinUs", inNav: true },
];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.inNav);

/**
 * Moves the reader to a section and puts it in the address, so the section can be copied, shared
 * and returned to with the back button.
 *
 * The scrolling itself is the browser's: sections reserve room for the fixed header with
 * `scroll-mt-20`, and whether the movement is animated is decided in CSS, which is where the
 * visitor's reduced-motion preference is honoured. Nothing here measures the header or computes an
 * offset.
 */
export function goToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  // pushState rather than assigning the hash: assigning it makes the browser jump immediately,
  // which loses the scroll behaviour the stylesheet asked for.
  window.history.pushState(null, "", `#${id}`);
  element.scrollIntoView();
}

/** Scrolls to the top and drops the fragment, for the logo and any other "back to the start" link. */
export function goToTop() {
  window.history.pushState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0 });
}
