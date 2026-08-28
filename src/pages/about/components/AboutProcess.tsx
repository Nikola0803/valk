import { Link } from "react-router-dom";

const process = [
  {
    step: "01",
    title: "Lyophilization",
    desc: "Peptides are lyophilized using solid-phase peptide synthesis (SPPS) followed by freeze-drying under strict GMP-aligned conditions in our US facility.",
  },
  {
    step: "02",
    title: "Purification",
    desc: "Each batch undergoes reverse-phase HPLC purification to isolate the target peptide and remove synthetic byproducts.",
  },
  {
    step: "03",
    title: "3rd Party Testing",
    desc: "Independent certified laboratories run HPLC purity analysis, mass spectrometry identity confirmation, endotoxin screening, and heavy metal analysis.",
  },
  {
    step: "04",
    title: "Documentation",
    desc: "Full Certificates of Analysis are generated and made publicly available - you can verify every product before you order.",
  },
  {
    step: "05",
    title: "Fulfillment",
    desc: "Orders are packed and shipped from the USA with tracking. Lyophilized peptides are shipped in sealed, protective packaging to preserve integrity.",
  },
];

export default function AboutProcess() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8" style={{ background: "#ffffff" }}>
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24 items-start">
          {/* Left: sticky title */}
          <div className="lg:sticky lg:top-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">How We Do It</p>
            <h2 className="font-black uppercase leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(28px, 3vw, 48px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              OUR<br />QUALITY<br />
              <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>PROCESS</span>
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              From lyophilization to your door - every step is controlled, documented, and independently verified.
            </p>
            <Link
              to="/coa"
              className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs px-6 py-3.5 cursor-pointer whitespace-nowrap transition-all duration-200"
              style={{ background: "#111111", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#111111"; }}
            >
              View All COAs
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>

          {/* Right: steps */}
          <div className="lg:col-span-2 divide-y" style={{ borderTop: "1px solid #e0e0e0" }}>
            {process.map((step) => (
              <div key={step.step} className="py-8 flex items-start gap-8 group">
                <span
                  className="font-black text-[#e0e0e0] leading-none flex-shrink-0 transition-colors duration-200 group-hover:text-[#bbb]"
                  style={{ fontSize: "clamp(36px, 4vw, 56px)", fontFamily: "'Oswald', sans-serif", lineHeight: 1 }}
                >
                  {step.step}
                </span>
                <div className="pt-1">
                  <h3 className="font-black uppercase tracking-tight text-[#111] text-base mb-3">{step.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
