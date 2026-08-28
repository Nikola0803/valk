import { Link } from "react-router-dom";

export default function BlogHero() {
  return (
    <>
      {/* Dark header */}
      <div style={{ background: "#111111" }} className="py-10 md:py-16 px-4 md:px-8">
        <div className="max-w-[1320px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Warrior Distributions</p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            RESEARCH &amp;<br />
            <span
              style={{
                background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
              }}
            >
              NEWS
            </span>
          </h1>
          <p className="text-white/45 text-sm mt-4 max-w-xl leading-relaxed">
            Science-backed articles on peptide research, lab best practices, quality standards, and the latest in research-grade compounds.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }} className="px-4 md:px-8 py-3">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2 text-xs text-[#aaa]">
          <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#111]">Blog</span>
        </div>
      </div>
    </>
  );
}
