import { Link } from "react-router-dom";

export default function AboutServiceCTA() {
  return (
    <section className="py-0" style={{ background: "#111111" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: "#2a2a2a" }}>
        {/* Left: image */}
        <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
          <img
            src="https://valkyriepeptides.com/wp-content/uploads/2026/04/mis-removebg-preview.png"
            alt="Warrior Team"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(17,17,17,0.5) 0%, transparent 60%)" }} />
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col justify-center px-6 md:px-12 py-10 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/35 mb-5">Join Our Community</p>
          <h2 className="font-black uppercase leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(28px, 3vw, 48px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            SERVING<br />THOSE WHO<br />
            <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
              SERVE
            </span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm">
            Active military, veterans, and first responders receive a <strong className="text-white/70">20% lifetime discount</strong> on all orders. Contact us for your personal code.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/veterans"
              className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs px-6 py-3.5 cursor-pointer whitespace-nowrap transition-all duration-200"
              style={{ background: "#ffffff", color: "#111111" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#e0e0e0"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
            >
              Learn More
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-xs px-6 py-3.5 cursor-pointer whitespace-nowrap transition-all duration-200 text-white/60 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
