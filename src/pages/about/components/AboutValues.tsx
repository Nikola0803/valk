const values = [
  {
    icon: "ri-microscope-line",
    title: "Scientific Integrity",
    desc: "Every product we offer is grounded in peer-reviewed research and validated analytical methods. We don't cut corners - not in lyophilization, not in testing, not in documentation.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Uncompromising Purity",
    desc: "Each batch is independently verified by certified third-party laboratories using HPLC, mass spectrometry, and endotoxin screening. COAs for every batch are published on our site - fully transparent, always accessible before you order.",
  },
  {
    icon: "ri-map-pin-line",
    title: "Made in the USA",
    desc: "All peptides are lyophilized, tested, and fulfilled domestically. We believe in supporting American science and maintaining tight quality control from start to finish.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Researcher-First Support",
    desc: "Our US-based team is available 7 days a week. Whether you need product documentation, order help, or research guidance - real people answer.",
  },
  {
    icon: "ri-flask-line",
    title: "Transparent Documentation",
    desc: "We publish Certificates of Analysis for every product. No black boxes, no marketing fluff - just raw analytical data you can trust and cite.",
  },
  {
    icon: "ri-team-line",
    title: "Community Commitment",
    desc: "We proudly offer lifetime discounts to active military, veterans, and first responders. Those who serve deserve access to the best research tools available.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8" style={{ background: "#f8f7f5" }}>
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">What We Stand For</p>
          <h2 className="font-black uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(32px, 4vw, 60px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            OUR<br />
            <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>VALUES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
          {values.map((v) => (
            <div key={v.title} className="bg-white p-9 flex flex-col gap-5 group hover:bg-[#fafafa] transition-colors duration-200">
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ background: "#111111" }}
              >
                <i className={`${v.icon} text-white text-xl`}></i>
              </div>
              <h3 className="font-black uppercase tracking-tight text-[#111] text-base leading-tight">{v.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
