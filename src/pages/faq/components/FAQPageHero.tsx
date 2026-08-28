import { Link } from "react-router-dom";

interface FAQPageHeroProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
}

export default function FAQPageHero({ search, setSearch, onSearch }: FAQPageHeroProps) {
  return (
    <>
      {/* Page header - product photo background */}
      <div className="relative overflow-hidden py-20 px-8" style={{ minHeight: 280 }}>
        <img
          src="/IMG_0912.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 45%", filter: "brightness(0.55)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.5) 55%, rgba(5,5,5,0.65) 100%)" }} />
        <div className="absolute" style={{ top: 16, left: 16, width: 20, height: 20, borderTop: "1.5px solid rgba(192,192,192,0.5)", borderLeft: "1.5px solid rgba(192,192,192,0.5)" }} />
        <div className="absolute" style={{ top: 16, right: 16, width: 20, height: 20, borderTop: "1.5px solid rgba(192,192,192,0.5)", borderRight: "1.5px solid rgba(192,192,192,0.5)" }} />
        <div className="absolute" style={{ bottom: 16, left: 16, width: 20, height: 20, borderBottom: "1.5px solid rgba(192,192,192,0.5)", borderLeft: "1.5px solid rgba(192,192,192,0.5)" }} />
        <div className="absolute" style={{ bottom: 16, right: 16, width: 20, height: 20, borderBottom: "1.5px solid rgba(192,192,192,0.5)", borderRight: "1.5px solid rgba(192,192,192,0.5)" }} />
        <div className="relative z-10 max-w-[1320px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(192,192,192,0.55)", fontFamily: "'Share Tech Mono', monospace" }}>Support</p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 72px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            FREQUENTLY<br />
            <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>ASKED QUESTIONS</span>
          </h1>
          <p className="text-sm mt-5 max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Everything you need to know about our research-grade peptides, ordering, shipping, and more.
          </p>

          {/* Search bar */}
          <div className="relative mt-8 max-w-lg">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-white/40 text-sm"></i>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); onSearch(); }}
              placeholder="Search questions..."
              className="w-full pl-11 pr-5 py-4 text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }} className="px-8 py-3">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2 text-xs text-[#aaa]">
          <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#111]">FAQs</span>
        </div>
      </div>
    </>
  );
}
