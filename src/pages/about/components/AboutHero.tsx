import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <div
      className="relative w-full overflow-hidden flex flex-col justify-end"
      style={{ background: "#111111", minHeight: 480 }}
    >
      <img
        src="https://valkyriepeptides.com/wp-content/uploads/2026/04/41140d85582577a436501acbd4d30a63-scaled.jpg"
        alt="Warrior Distributions Lab"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.6) 60%, rgba(17,17,17,0.3) 100%)" }} />

      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 md:px-8 lg:px-16 pb-10 md:pb-16 pt-16 md:pt-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
          Warrior Distributions
        </p>
        <h1
          className="font-black uppercase leading-[0.88] tracking-tight mb-6"
          style={{ fontSize: "clamp(44px, 6vw, 88px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          ABOUT<br />
          <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
            US
          </span>
        </h1>
        <p className="text-white/55 text-base leading-relaxed max-w-[560px]">
          A science-first peptide company built on transparency, analytical rigor, and a relentless commitment to researcher success.
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 w-full" style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }}>
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-xs text-[#aaa]">
          <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#111]">About Us</span>
        </div>
      </div>
    </div>
  );
}
