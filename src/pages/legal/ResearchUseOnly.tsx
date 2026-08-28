import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import LegalHero from "@/pages/legal/components/LegalHero";
import LegalRelatedLinks from "@/pages/legal/components/LegalRelatedLinks";

const relatedLinks = [
  { label: "Privacy Policy",     href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Return Policy",      href: "/return-policy" },
];

export default function ResearchUseOnlyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <LegalHero titleLine1="RESEARCH USE" titleLine2="ONLY POLICY" breadcrumb="Research Use Only Policy" headingFontSize="clamp(32px, 4.5vw, 58px)" />

        {/* Content */}
        <div className="py-16 px-8">
          <div className="max-w-[860px] mx-auto space-y-10">

            {/* Big warning box */}
            <div className="p-8" style={{ background: "#111", border: "3px solid #111" }}>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "#dc2626" }}>
                  <i className="ri-alert-fill text-white text-lg"></i>
                </div>
                <div>
                  <p className="font-black text-white text-base uppercase tracking-wide mb-3">CRITICAL NOTICE - PLEASE READ</p>
                  <p className="text-white/75 text-sm leading-relaxed">
                    All products sold by Warrior Distributions are EXCLUSIVELY for in vitro research and laboratory use by qualified scientific professionals. These products are NOT approved for human consumption, injection, therapeutic treatment, or veterinary use. Misuse of research chemicals may be illegal and is potentially dangerous.
                  </p>
                </div>
              </div>
            </div>

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">1. Scope of This Policy</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                This Research Use Only (RUO) Policy applies to all products listed on the Warrior Distributions website. It defines the acceptable and prohibited uses of our products and establishes the responsibilities of purchasers. By purchasing from us, you explicitly agree to comply with this policy.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">2. What "Research Use Only" Means</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                "Research Use Only" (RUO) means our products are intended solely for use in scientific investigations, studies, and experiments performed in controlled laboratory environments by qualified and trained researchers. RUO products:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "ri-flask-line", title: "Are for in vitro use", desc: "Testing and experiments conducted outside a living organism in controlled laboratory conditions." },
                  { icon: "ri-user-line", title: "Are NOT for human use", desc: "Not intended for ingestion, injection, inhalation, or any form of human administration." },
                  { icon: "ri-hospital-line", title: "Are NOT therapeutic", desc: "Not approved as drugs, treatments, or medical interventions by the FDA or any regulatory body." },
                  { icon: "ri-microscope-line", title: "Require qualified personnel", desc: "Must be handled by trained scientists in appropriate laboratory settings." },
                ].map((item) => (
                  <div key={item.title} className="p-4 flex gap-3 items-start" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                      <i className={`${item.icon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#111]">{item.title}</p>
                      <p className="text-[#777] text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">3. Purchaser Representations &amp; Warranties</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                By purchasing any product from Warrior Distributions, you represent and warrant that:
              </p>
              <div className="space-y-2">
                {[
                  "You are a qualified scientist, researcher, or authorized representative of a research institution",
                  "You will use the products only for legitimate research or educational purposes in a controlled laboratory setting",
                  "You have the proper facilities, equipment, and expertise to safely handle research-grade chemicals",
                  "You will comply with all applicable federal, state, and local laws regarding the purchase, storage, use, and disposal of research chemicals",
                  "You will NOT use the products for human consumption or administration in any form",
                  "You will NOT resell or distribute products to any party who intends to use them for non-research purposes",
                  "You are at least 18 years of age",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3" style={{ background: "#f8fff8", border: "1px solid #d8f0d8" }}>
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-green-600 text-sm font-bold"></i>
                    </div>
                    <p className="text-[#555] text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">4. Regulatory Compliance</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                Warrior Distributions is a chemical supplier, not a compounding pharmacy or outsourcing facility as defined under Sections 503A or 503B of the Federal Food, Drug, and Cosmetic Act. Our products have not been evaluated by the U.S. Food and Drug Administration (FDA) and are not intended to diagnose, treat, cure, or prevent any disease or condition.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">5. Safe Handling Guidelines</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                Research chemicals must be handled with appropriate precautions:
              </p>
              <div className="space-y-2">
                {[
                  "Always wear appropriate personal protective equipment (PPE) including lab coat, gloves, and eye protection",
                  "Handle in well-ventilated areas or a fume hood as appropriate",
                  "Store according to product specifications - many peptides require cold storage (-20°C or -80°C)",
                  "Keep out of reach of children and unauthorized personnel",
                  "Dispose of products in accordance with applicable environmental and safety regulations",
                  "Review Safety Data Sheets (SDS) before handling any chemical",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-arrow-right-s-line text-[#aaa] text-sm"></i>
                    </div>
                    <p className="text-[#555] text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">6. Indemnification</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                You agree to indemnify, defend, and hold harmless Warrior Distributions, its officers, employees, and agents from any claims, damages, losses, or expenses arising from your misuse of our products or your violation of this Research Use Only Policy or any applicable law.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">7. Contact Us</h2>
              <div className="p-6" style={{ background: "#111", color: "#fff" }}>
                <p className="font-bold text-sm mb-1">Warrior Distributions - Compliance</p>
                <p className="text-white/60 text-sm">Phone: (541)-709-5434</p>
                <p className="text-white/60 text-sm mt-1">If you have questions about proper research use, please contact us before purchasing.</p>
              </div>
            </section>

            <LegalRelatedLinks links={relatedLinks} />
          </div>
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
