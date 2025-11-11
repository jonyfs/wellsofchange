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

export default function Home() {
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
