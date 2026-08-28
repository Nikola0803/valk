import { Link } from "react-router-dom";

export default function VeteransHero() {
  const scrollToClaim = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile hero */}
      <div className="lg:hidden w-full" style={{ background: "#111111" }}>
        <div className="px-4 py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/50 mb-4">
            Warrior Distributions - Service Appreciation
          </p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tight mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 10vw, 60px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            HONORING MILITARY<br />&amp; FIRST RESPONDERS
          </h1>
          <p className="text-white/65 text-sm leading-relaxed mb-8">
            Active Military, Veterans &amp; First Responders receive an{" "}
            <strong className="text-white font-black">exclusive 20% discount for life</strong>{" "}
            on all Warrior Distributions products. American-made peptides for America&apos;s heroes.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href="#claim"
              onClick={scrollToClaim}
              className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px] px-6 py-4 transition-all duration-200 cursor-pointer"
              style={{ background: "#ffffff", color: "#111111" }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-shield-star-line text-sm"></i>
              </div>
              Claim My 20% Discount
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[11px] px-6 py-4 transition-all duration-200 cursor-pointer"
              style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "#ffffff" }}
            >
              Browse Products
            </Link>
          </div>
        </div>

        <div className="w-full" style={{ background: "#0a0a0a" }}>
          <img
            src="https://valkyriepeptides.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-26-2026-06_41_13-AM.png"
            alt="Honoring Military and First Responders"
            className="w-full h-auto block"
            style={{ maxHeight: 420, objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>

      {/* Desktop hero */}
      <div
        className="hidden lg:block relative w-full overflow-hidden"
        style={{ background: "#111111", minHeight: 420 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://valkyriepeptides.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-26-2026-06_41_13-AM.png)",
            backgroundSize: "auto 100%",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.2) 65%, transparent 100%)" }}
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-8 py-16 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/50 mb-4">
            Warrior Distributions - Service Appreciation
          </p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tight mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 72px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            HONORING MILITARY<br />&amp; FIRST RESPONDERS
          </h1>
          <p className="text-white/65 text-base leading-relaxed max-w-lg mb-8">
            Active Military, Veterans &amp; First Responders receive an{" "}
            <strong className="text-white font-black">exclusive 20% discount for life</strong>{" "}
            on all Warrior Distributions products. American-made peptides for America&apos;s heroes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#claim"
              onClick={scrollToClaim}
              className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-[11px] px-8 py-4 transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ background: "#ffffff", color: "#111111" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#e5e5e5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-shield-star-line text-sm"></i>
              </div>
              Claim My 20% Discount
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-[11px] px-8 py-4 transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "#ffffff" }}
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
