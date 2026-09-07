import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MissionStatement from "@/components/MissionStatement";
import OurStory from "@/components/OurStory";
import WhatWeDo from "@/components/WhatWeDo";
import OurCommitment from "@/components/OurCommitment";
import WhoWeAre from "@/components/WhoWeAre";
import Partners from "@/components/Partners";
import CodeOfEthics from "@/components/CodeOfEthics";
import TogetherForChange from "@/components/TogetherForChange";
import Footer from "@/components/Footer";
import DonateFAB from "@/components/DonateFAB";
import { useSectionHash } from "@/hooks/use-section-hash";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  // A visitor arriving from a search result or a shared link asked for a section, not the top.
  useSectionHash();

  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/*
        Without this, reaching the page's content from the keyboard costs the logo, six section
        links, the language menu and the donate button, on every visit.
        It stays out of sight until it is focused, which is the only time anyone needs it.
      */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:shadow-lg focus:outline focus:outline-2 focus:outline-ring"
        data-testid="link-skip-to-content"
      >
        {t("nav.skipToContent")}
      </a>
      <Navigation />
      <main id="main-content" className="pt-20">
        <Hero />
        <WhatWeDo />
        <OurCommitment />
        <MissionStatement />
        <OurStory />
        <WhoWeAre />
        <Partners />
        <CodeOfEthics />
        <TogetherForChange />
      </main>
      <Footer />
      <DonateFAB />
    </div>
  );
}
