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

export default function Home() {
  // A visitor arriving from a search result or a shared link asked for a section, not the top.
  useSectionHash();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
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
