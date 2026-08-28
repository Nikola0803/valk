import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import VeteransHero from "@/pages/veterans/components/VeteransHero";
import VeteransCommitment from "@/pages/veterans/components/VeteransCommitment";
import VeteransEligibility from "@/pages/veterans/components/VeteransEligibility";
import VeteransHowToClaim from "@/pages/veterans/components/VeteransHowToClaim";
import VeteransClaimForm from "@/pages/veterans/components/VeteransClaimForm";
import VeteransFAQ from "@/pages/veterans/components/VeteransFAQ";
import VeteransFinalCTA from "@/pages/veterans/components/VeteransFinalCTA";

export default function VeteransPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main style={{ paddingTop: 64 }}>
        <VeteransHero />
        <VeteransCommitment />
        <VeteransEligibility />
        <VeteransHowToClaim />
        <VeteransClaimForm />
        <VeteransFAQ />
        <VeteransFinalCTA />
      </main>

      <FooterSection />
    </div>
  );
}
