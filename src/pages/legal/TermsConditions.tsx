import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import LegalHero from "@/pages/legal/components/LegalHero";
import LegalRelatedLinks from "@/pages/legal/components/LegalRelatedLinks";

const relatedLinks = [
  { label: "Privacy Policy",    href: "/privacy-policy" },
  { label: "Return Policy",     href: "/return-policy" },
  { label: "Research Use Only", href: "/research-use-only" },
];

export default function TermsConditionsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <LegalHero titleLine1="TERMS &" titleLine2="CONDITIONS" breadcrumb="Terms & Conditions" />

        {/* Content */}
        <div className="py-16 px-8">
          <div className="max-w-[860px] mx-auto space-y-10">

            {/* Disclaimer box */}
            <div className="p-6" style={{ background: "#111", border: "2px solid #111" }}>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-alert-line text-yellow-400 text-base"></i>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-white">IMPORTANT:</strong> All products sold by Warrior Distributions are intended exclusively for research and laboratory use. These products are NOT intended for human consumption, injection, therapeutic use, or veterinary use. By placing an order, you confirm that you are a qualified researcher or scientist using these products solely for legitimate research purposes.
                </p>
              </div>
            </div>

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                By accessing or using the Warrior Distributions website ("Site"), purchasing our products, or interacting with us in any way, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Site or purchase our products. We reserve the right to update these Terms at any time without prior notice.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">2. Eligibility</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                You must be at least 18 years of age to use this Site and purchase our products. By using this Site, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement. You also represent that you are a qualified researcher, scientist, or authorized purchaser of research chemicals.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">3. Product Use Restrictions</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                All products sold on this Site are strictly for research purposes only. You agree that you will NOT:
              </p>
              <div className="space-y-2">
                {[
                  "Use any product for human consumption, self-administration, or injection",
                  "Administer any product to animals or pets outside of an authorized laboratory setting",
                  "Resell products without obtaining proper authorizations",
                  "Use products for any illegal purpose",
                  "Misrepresent the intended use of any product at the time of purchase",
                  "Use products outside of the country in which they were ordered where prohibited by law",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3" style={{ background: "#fff8f8", border: "1px solid #fce8e8" }}>
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-close-line text-red-500 text-sm font-bold"></i>
                    </div>
                    <p className="text-[#555] text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">4. Orders &amp; Payment</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion. Prices are listed in USD and are subject to change without notice. Payment is due at the time of purchase. We accept major credit cards and other payment methods as listed at checkout. You are responsible for all applicable taxes.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">5. Shipping &amp; Delivery</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                Orders are typically processed within 1–2 business days. We currently ship within the United States only. Shipping times are estimates and not guaranteed. Risk of loss passes to you upon delivery to the carrier. We are not responsible for delays caused by carriers, weather, or other circumstances beyond our control.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">6. Intellectual Property</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                All content on this Site, including but not limited to text, graphics, logos, images, and software, is the property of Warrior Distributions and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                Products are sold "AS IS" for research purposes only. Warrior Distributions makes no warranties, express or implied, including without limitation any implied warranties of merchantability or fitness for a particular purpose. We do not warrant that our products will produce any specific research outcomes.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">8. Limitation of Liability</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                To the fullest extent permitted by law, Warrior Distributions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or Site. Our total liability shall not exceed the amount paid by you for the specific product giving rise to the claim.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">9. Governing Law</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Idaho, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of Idaho.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">10. Contact</h2>
              <div className="p-6" style={{ background: "#111", color: "#fff" }}>
                <p className="font-bold text-sm mb-1">Warrior Distributions</p>
                <p className="text-white/60 text-sm">Phone: (541)-709-5434</p>
                <p className="text-white/60 text-sm mt-1">Contact us through our website for legal inquiries.</p>
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
