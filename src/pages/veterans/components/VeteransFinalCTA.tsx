import { Link } from "react-router-dom";

export default function VeteransFinalCTA() {
  const scrollToClaim = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-8" style={{ background: "#111111" }}>
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Thank You For Your Service</p>
            <h2
              className="font-black uppercase leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(26px, 3vw, 48px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              AMERICAN MADE.<br />
              <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
                VETERAN APPROVED.
              </span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              From everyone at Warrior Distributions, we express our heartfelt gratitude for your service and sacrifice. This discount is our small way of giving back to those who have given so much.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <a
              href="#claim"
              onClick={scrollToClaim}
              className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px] px-8 md:px-10 py-4 cursor-pointer whitespace-nowrap transition-all"
              style={{ background: "#ffffff", color: "#111111" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#e5e5e5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-shield-star-line text-sm"></i>
              </div>
              Get Your Discount Code
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px] px-8 md:px-10 py-4 cursor-pointer whitespace-nowrap transition-all"
              style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "#ffffff" }}
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
