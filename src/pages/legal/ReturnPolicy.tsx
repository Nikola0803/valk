import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import LegalHero from "@/pages/legal/components/LegalHero";
import LegalRelatedLinks from "@/pages/legal/components/LegalRelatedLinks";

const relatedLinks = [
  { label: "Privacy Policy",    href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Research Use Only", href: "/research-use-only" },
];

export default function ReturnPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <LegalHero titleLine1="RETURN" titleLine2="POLICY" breadcrumb="Return Policy" />

        {/* Content */}
        <div className="py-16 px-8">
          <div className="max-w-[860px] mx-auto space-y-10">

            {/* Quick summary boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
              {[
                { icon: "ri-time-line", title: "30-Day Window", desc: "Returns accepted within 30 days of delivery for eligible items." },
                { icon: "ri-shield-check-line", title: "Sealed Products Only", desc: "Products must be unopened, sealed, and in original condition." },
                { icon: "ri-customer-service-2-line", title: "Contact First", desc: "All returns require prior authorization from our support team." },
              ].map((item) => (
                <div key={item.title} className="bg-white p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: "#111" }}>
                    <i className={`${item.icon} text-white text-base`}></i>
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight text-[#111]">{item.title}</p>
                  <p className="text-[#777] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">1. Return Eligibility</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                Due to the nature of our research-grade products, we have strict return guidelines. To be eligible for a return, items must meet ALL of the following criteria:
              </p>
              <div className="space-y-2">
                {[
                  "Item must be returned within 30 days of the delivery date",
                  "Product must be in its original, unopened, and sealed condition",
                  "Original packaging must be intact and undamaged",
                  "A Return Merchandise Authorization (RMA) number must be obtained before shipping",
                  "Proof of purchase (order number or receipt) must be included",
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
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">2. Non-Returnable Items</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                The following items are NOT eligible for return under any circumstances:
              </p>
              <div className="space-y-2">
                {[
                  "Opened or used products of any kind",
                  "Products that have been stored improperly or exposed to extreme temperatures",
                  "Items returned more than 30 days after delivery",
                  "Items returned without prior authorization",
                  "Custom or special-order products",
                  "Digital products (documentation, reports, etc.)",
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
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">3. How to Initiate a Return</h2>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Contact Us", desc: "Reach out to our support team via phone or contact form with your order number and reason for return." },
                  { step: "02", title: "Receive Your RMA", desc: "If your return is approved, we will issue a Return Merchandise Authorization (RMA) number within 2 business days." },
                  { step: "03", title: "Ship the Item", desc: "Pack the item securely in its original packaging, include the RMA number, and ship to the address provided. You are responsible for return shipping costs." },
                  { step: "04", title: "Processing", desc: "Once we receive and inspect the returned item, we will process your refund or exchange within 5–7 business days." },
                ].map((step) => (
                  <div key={step.step} className="flex gap-4 p-5" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
                    <span className="font-black text-3xl leading-none text-[#e0e0e0] flex-shrink-0" style={{ fontVariantNumeric: "tabular-nums" }}>{step.step}</span>
                    <div>
                      <p className="font-bold text-sm text-[#111] mb-1">{step.title}</p>
                      <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">4. Refunds</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                Approved refunds will be issued to the original payment method within 5–7 business days of receiving and inspecting the returned item. Original shipping charges are non-refundable. We reserve the right to charge a restocking fee of up to 15% for items returned in less than perfect condition.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">5. Damaged or Incorrect Items</h2>
              <p className="text-[#555] text-sm leading-relaxed">
                If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with photos of the damage and your order number. We will arrange for a replacement or refund at no cost to you. Do not return damaged items without contacting us first.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #e8e8e8" }} />

            <section>
              <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">6. Contact</h2>
              <div className="p-6" style={{ background: "#111", color: "#fff" }}>
                <p className="font-bold text-sm mb-1">Warrior Distributions - Returns Department</p>
                <p className="text-white/60 text-sm">Phone: (541)-709-5434</p>
                <p className="text-white/60 text-sm mt-1">Please have your order number ready when contacting us about a return.</p>
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
