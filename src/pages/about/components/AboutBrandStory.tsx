export default function AboutBrandStory() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-8" style={{ background: "#ffffff" }}>
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-28 items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-5">Our Story</p>
          <h2 className="font-black uppercase leading-[0.9] tracking-tight mb-8" style={{ fontSize: "clamp(28px, 3.5vw, 52px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            BUILT BY<br />RESEARCHERS,<br />
            <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
              FOR RESEARCH.
            </span>
          </h2>
          <div className="space-y-5 text-[#555] text-sm leading-relaxed">
            <p>
              Warrior Distributions was founded with a single purpose: to give researchers access to the highest-quality peptides available - backed by real analytical data, not marketing promises.
            </p>
            <p>
              We recognized a gap in the market. Too many suppliers were offering underdocumented, inconsistently manufactured peptides that undermined research outcomes. We built Warrior to be different - a company where scientific transparency isn&apos;t a selling point, it&apos;s the baseline.
            </p>
            <p>
              Every peptide we sell is lyophilized domestically, purified to research-grade standards, and independently verified by certified third-party labs. We publish our Certificates of Analysis publicly because we have nothing to hide and everything to prove.
            </p>
            <p>
              We&apos;re advancing the science of peptide research - one verified vial at a time.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden" style={{ height: 340, background: "#f0ede8" }}>
            <img
              src="https://valkyriepeptides.com/wp-content/uploads/2026/04/IMG_6411.jpg"
              alt="Warrior Distributions Research"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
          </div>
          <div
            className="absolute bottom-0 left-0 md:-bottom-6 md:-left-6 px-7 py-5 z-10"
            style={{ background: "#111111", minWidth: 200 }}
          >
            <p className="font-black uppercase text-white text-3xl leading-none mb-1">5+</p>
            <p className="text-white/45 text-[10px] uppercase tracking-widest">Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
