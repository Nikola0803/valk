import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import AboutHero from "@/pages/about/components/AboutHero";
import AboutBrandStory from "@/pages/about/components/AboutBrandStory";
import AboutStats from "@/pages/about/components/AboutStats";
import AboutValues from "@/pages/about/components/AboutValues";
import AboutProcess from "@/pages/about/components/AboutProcess";
import AboutServiceCTA from "@/pages/about/components/AboutServiceCTA";
import AboutTrustBar from "@/pages/about/components/AboutTrustBar";

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main style={{ paddingTop: 64 }}>
        <AboutHero />
        <AboutBrandStory />
        <AboutStats />
        <AboutValues />
        <AboutProcess />
        <AboutServiceCTA />
        <AboutTrustBar />
      </main>

      <FooterSection />
    </div>
  );
}
