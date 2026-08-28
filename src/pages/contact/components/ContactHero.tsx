import { Link } from "react-router-dom";

export default function ContactHero() {
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
            CONTACT<br />
            <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>US</span>
          </h1>
          <p className="text-sm mt-5 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Questions about products, orders, or research applications? Our team is available 7 days a week to help.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }} className="px-8 py-3">
        <div className="max-w-[1320px] mx-auto flex items-center gap-2 text-xs text-[#aaa]">
          <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#111]">Contact Us</span>
        </div>
      </div>
    </>
  );
}
