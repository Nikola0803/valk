import { useState } from "react";

const faqs = [
  {
    q: "Do I need to verify my status every time I order?",
    a: "No. Once verified, you'll receive a permanent personal discount code for all future purchases. One-time verification, lifetime savings.",
  },
  {
    q: "Can I share my discount code?",
    a: "Your code is personal to you. Family members who qualify under their own service can apply for their own individual discount code.",
  },
  {
    q: "What documents are accepted for verification?",
    a: "We accept military IDs, veteran ID cards, DD-214 forms, VA cards, and official first responder credentials or department-issued IDs.",
  },
  {
    q: "How long does verification take?",
    a: "Most verifications are completed within 24–48 hours. We personally review each submission to ensure accuracy and security.",
  },
  {
    q: "Is there a limit on how many times I can use my discount?",
    a: "Absolutely none. Use your 20% discount on every single order with no restrictions and no expiration.",
  },
  {
    q: "What if I have trouble submitting verification?",
    a: "Contact our support team at support@warriordistributions.com or call (541)-709-5434 and we'll personally walk you through the process.",
  },
];

export default function VeteransFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Common Questions</p>
            <h2
              className="font-black uppercase leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(24px, 2.5vw, 38px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              FREQUENTLY<br />ASKED
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mb-6">
              Have more questions? Our team is available 7 days a week to help.
            </p>
            <div className="space-y-3">
              <a href="tel:2082439222" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                  <i className="ri-phone-line text-white text-sm"></i>
                </div>
                <span className="text-[#555] text-sm font-semibold group-hover:text-[#111] transition-colors">(541)-709-5434</span>
              </a>
              <a href="mailto:support@warriordistributions.com" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                  <i className="ri-mail-line text-white text-sm"></i>
                </div>
                <span className="text-[#555] text-sm font-semibold group-hover:text-[#111] transition-colors break-all">support@warriordistributions.com</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 divide-y" style={{ borderTop: "1px solid #e0e0e0" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="cursor-pointer py-5"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#111] font-bold text-sm">{faq.q}</span>
                  <div
                    className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: openFaq === i ? "#111" : "#ebebeb" }}
                  >
                    <i className={`text-sm ${openFaq === i ? "ri-subtract-line text-white" : "ri-add-line text-[#555]"}`}></i>
                  </div>
                </div>
                {openFaq === i && (
                  <p className="text-[#666] text-sm leading-relaxed mt-4 pr-4 md:pr-12">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
