import { Link } from "react-router-dom";

interface LegalHeroProps {
  /** First line of the heading (solid white text) */
  titleLine1: string;
  /** Second line of the heading (outline / ghost text) */
  titleLine2: string;
  /** Breadcrumb label for the current page */
  breadcrumb: string;
  /** Last-updated date string */
  lastUpdated?: string;
  /** Optional override for the heading font-size clamp */
  headingFontSize?: string;
}

export default function LegalHero({ titleLine1, titleLine2, breadcrumb, lastUpdated = "January 1, 2026", headingFontSize = "clamp(36px, 5vw, 64px)" }: LegalHeroProps) {
  return (
    <>
      {/* Dark header */}
      <div style={{ background: "#111111" }} className="py-20 px-8">
        <div className="max-w-[860px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Legal</p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tight text-white"
            style={{ fontSize: headingFontSize }}
          >
            {titleLine1}<br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                color: "transparent",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
              }}
            >
              {titleLine2}
            </span>
          </h1>
          <p className="text-white/40 text-sm mt-4">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }} className="px-8 py-3">
        <div className="max-w-[860px] mx-auto flex items-center gap-2 text-xs text-[#aaa]">
          <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#111]">{breadcrumb}</span>
        </div>
      </div>
    </>
  );
}
