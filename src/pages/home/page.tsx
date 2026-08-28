import { useEffect, useRef } from "react";
import Navbar from "@/components/feature/Navbar";
import MilitaryBanner from "@/pages/home/components/MilitaryBanner";
import HeroSection from "@/pages/home/components/HeroSection";
import TrustBadges from "@/pages/home/components/TrustBadges";
import GpSaleSection from "@/pages/home/components/GpSaleSection";
import BestSellers from "@/pages/home/components/BestSellers";
import FeatureCards from "@/pages/home/components/FeatureCards";
import QualitySection from "@/pages/home/components/QualitySection";
import TestimonialsSection from "@/pages/home/components/TestimonialsSection";
import FAQSection from "@/pages/home/components/FAQSection";
import BlogSection from "@/pages/home/components/BlogSection";
import FooterSection from "@/pages/home/components/FooterSection";
import { useState } from "react";

export default function HomePage() {
  const [headerHeight, setHeaderHeight] = useState(64);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      {/* Age verification + login now handled by AccessGate in App.tsx */}

      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
        <MilitaryBanner />
        <Navbar />
      </div>

      <div style={{ paddingTop: headerHeight }}>
        <main>
          <HeroSection />
          <TrustBadges />
          <GpSaleSection />
          <BestSellers />
          <FeatureCards />
          <QualitySection />
          <TestimonialsSection />
          <FAQSection />
          <BlogSection />
        </main>
        <FooterSection />
      </div>
    </div>
  );
}