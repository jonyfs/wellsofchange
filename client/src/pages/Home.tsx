import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MissionStatement from "@/components/MissionStatement";
import OurStory from "@/components/OurStory";
import WhatWeDo from "@/components/WhatWeDo";
import OurCommitment from "@/components/OurCommitment";
import CodeOfEthics from "@/components/CodeOfEthics";
import TogetherForChange from "@/components/TogetherForChange";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MissionStatement />
        <OurStory />
        <WhatWeDo />
        <OurCommitment />
        <CodeOfEthics />
        <TogetherForChange />
      </main>
      <Footer />
    </div>
  );
}
