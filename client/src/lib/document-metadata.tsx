// Keeps the document's title and social metadata in step with the selected language.
//
// The site serves one URL for all four languages, so the HTML that crawlers fetch carries the
// prerendered language and cannot carry four titles. This updates the tags in the live document, so
// a visitor reading in Spanish gets a Spanish tab title, and a page shared from that session shows
// Spanish text in the preview card.
//
// It does not make the other languages indexable. Search engines index one document per URL, so
// only the prerendered language reaches an index. That needs per-language URLs, which the project
// has decided against for now.
import { useEffect } from "react";
import { useLanguage } from "./i18n";

function setMetaContent(selector: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.content = content;
  }
}

export default function DocumentMetadata() {
  const { language, t } = useLanguage();

  useEffect(() => {
    const title = t("meta.title");
    const description = t("meta.description");
    const ogLocale = t("meta.ogLocale");

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:locale"]', ogLocale);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return null;
}
