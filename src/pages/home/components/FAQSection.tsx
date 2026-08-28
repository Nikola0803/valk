import { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "@/mocks/products";

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" style={{ background: "#ffffff" }} className="py-28 px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0" style={{ border: "1px solid #e0e0e0" }}>

          {/* Left panel */}
          <div className="p-12 lg:p-16 flex flex-col justify-between" style={{ background: "#111111", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Support</p>
              <h2 className="font-black uppercase leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(30px, 3.5vw, 48px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                FREQUENTLY<br />
                <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>ASKED</span><br />
                QUESTIONS
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-10">
                Have questions about our products, shipping, or testing? Find answers below or reach out to our team directly.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-xs cursor-pointer whitespace-nowrap transition-all duration-200"
                style={{ background: "#ffffff", color: "#111111", padding: "14px 28px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#e8e8e8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
              >
                Contact Support
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>

            {/* Bottom stat */}
            <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-black text-4xl leading-none mb-1">7 Days</p>
              <p className="text-white/35 text-xs uppercase tracking-widest">Support Available</p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col divide-y" style={{ background: "#fafafa", borderColor: "#e0e0e0" }}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="cursor-pointer transition-all duration-200"
                style={{ background: openId === faq.id ? "#ffffff" : "transparent" }}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <div className="flex items-center justify-between px-8 py-6">
                  <span className="text-[#111111] font-bold text-sm pr-6 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ background: openId === faq.id ? "#111111" : "#ebebeb" }}
                  >
                    <i className={`text-sm transition-transform duration-300 ${openId === faq.id ? "ri-subtract-line text-white" : "ri-add-line text-[#555]"}`}></i>
                  </div>
                </div>
                {openId === faq.id && (
                  <div className="px-8 pb-6">
                    <p className="text-[#666] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
