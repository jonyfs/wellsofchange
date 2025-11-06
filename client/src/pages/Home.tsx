import Hero from "@/components/Hero";
import MissionStatement from "@/components/MissionStatement";
import OurStory from "@/components/OurStory";
import WhatWeDo from "@/components/WhatWeDo";
import OurCommitment from "@/components/OurCommitment";
import WhoWeAre from "@/components/WhoWeAre";
import CodeOfEthics from "@/components/CodeOfEthics";
import TogetherForChange from "@/components/TogetherForChange";
import Footer from "@/components/Footer";
import LanguageFAB from "@/components/LanguageFAB";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <MissionStatement />
        <OurStory />
        <WhatWeDo />
        <OurCommitment />
        <WhoWeAre />
        <CodeOfEthics />
        <TogetherForChange />
      </main>
      <Footer />
      <LanguageFAB />
    </div>
  );
}
