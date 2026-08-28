import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import LegalHero from "@/pages/legal/components/LegalHero";
import LegalRelatedLinks from "@/pages/legal/components/LegalRelatedLinks";

const relatedLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Return Policy",      href: "/return-policy" },
  { label: "Research Use Only",  href: "/research-use-only" },
];

export default function PrivacyPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <LegalHero titleLine1="PRIVACY" titleLine2="POLICY" breadcrumb="Privacy Policy" />

        {/* Content */}
        <div className="py-16 px-8">
          <div className="max-w-[860px] mx-auto">
            <div className="prose-legal space-y-10">

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">1. Introduction</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  Warrior Distributions ("we," "us," or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and share information about you when you use our website, make purchases, or interact with us in any way. By using our site, you agree to the terms of this policy.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">2. Information We Collect</h2>
                <p className="text-[#555] text-sm leading-relaxed mb-4">We may collect the following types of information:</p>
                <ul className="space-y-3">
                  {[
                    { title: "Personal Identification Information", desc: "Name, email address, phone number, billing and shipping address." },
                    { title: "Payment Information", desc: "Credit card or debit card details (processed securely through third-party payment processors; we do not store full card numbers)." },
                    { title: "Usage Data", desc: "IP address, browser type, pages visited, time and date of visit, referring URLs." },
                    { title: "Communications", desc: "Any messages or inquiries you send us via email or contact forms." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3 p-4" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-[#111] text-xs font-bold"></i>
                      </div>
                      <div>
                        <strong className="text-[#111] text-sm font-bold">{item.title}:</strong>
                        <span className="text-[#666] text-sm ml-1">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">3. How We Use Your Information</h2>
                <p className="text-[#555] text-sm leading-relaxed mb-4">We use your information to:</p>
                <div className="space-y-2">
                  {[
                    "Process and fulfill your orders",
                    "Send order confirmations, shipping updates, and receipts",
                    "Respond to your inquiries and provide customer support",
                    "Improve our website and product offerings",
                    "Send promotional emails (only if you have opted in)",
                    "Comply with legal obligations",
                    "Prevent fraud and ensure the security of our platform",
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
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">4. Sharing Your Information</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping carriers, email platforms), provided they agree to keep this information confidential. We may also disclose information when required by law or to protect our rights.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">5. Cookies &amp; Tracking Technologies</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, some features of the site may not function properly without cookies.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">6. Data Security</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your data but cannot guarantee its absolute security.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">7. Your Rights</h2>
                <p className="text-[#555] text-sm leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: "ri-eye-line", title: "Access", desc: "Request a copy of the personal data we hold about you." },
                    { icon: "ri-edit-line", title: "Correction", desc: "Request correction of inaccurate or incomplete data." },
                    { icon: "ri-delete-bin-line", title: "Deletion", desc: "Request deletion of your personal data." },
                    { icon: "ri-mail-close-line", title: "Opt-Out", desc: "Unsubscribe from marketing communications at any time." },
                  ].map((right) => (
                    <div key={right.title} className="p-4 flex gap-3 items-start" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                        <i className={`${right.icon} text-white text-sm`}></i>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#111]">{right.title}</p>
                        <p className="text-[#777] text-xs mt-0.5">{right.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">8. Third-Party Links</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">9. Children&apos;s Privacy</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  Our website is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">10. Changes to This Policy</h2>
                <p className="text-[#555] text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              <div style={{ borderTop: "1px solid #e8e8e8" }} />

              <section>
                <h2 className="font-black text-xl uppercase tracking-tight text-[#111] mb-4">11. Contact Us</h2>
                <p className="text-[#555] text-sm leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                <div className="p-6" style={{ background: "#111", color: "#fff" }}>
                  <p className="font-bold text-sm mb-1">Warrior Distributions</p>
                  <p className="text-white/60 text-sm">Phone: (541)-709-5434</p>
                  <p className="text-white/60 text-sm mt-1">For legal inquiries, contact us via our website contact form.</p>
                </div>
              </section>

            </div>

            <LegalRelatedLinks links={relatedLinks} />
          </div>
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
