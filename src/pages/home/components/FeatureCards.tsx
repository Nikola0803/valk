import { Link } from "react-router-dom";
export default function FeatureCards() {
  return (
    <section style={{ background: "#ffffff" }} className="py-28 px-8">
      <div className="max-w-[1320px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">Why Valkyrie</p>
          <h2 className="font-black uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            BUILT FOR<br />
            <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>SERIOUS RESEARCH</span>
          </h2>
        </div>

        {/* Editorial grid: big left + two stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-px" style={{ background: "#e0e0e0" }}>

          {/* Big left card - girl photo full bleed */}
          <div className="lg:col-span-3 relative overflow-hidden group cursor-pointer" style={{ minHeight: 560 }}>
            <img
              src="https://valkyriepeptides.com/wp-content/uploads/2026/04/IMG_6411.jpg"
              alt="99% Purity Verification"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)" }} />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-microscope-line text-white text-xs"></i>
                </div>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Lab Certified</span>
              </div>
              <h3 className="font-black text-3xl uppercase leading-tight tracking-tight mb-3" style={{ background: "linear-gradient(135deg, #c8c8c8 0%, #f0f0f0 30%, #a0a0a0 55%, #d8d8d8 75%, #b0b0b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                99%+ Purity<br />Verification
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
                Every batch independently analyzed by certified third-party laboratories to confirm purity, identity, and composition.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest cursor-pointer group-hover:gap-4 transition-all duration-200">
                Learn More
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
          </div>

          {/* Right column: two stacked cards */}
          <div className="lg:col-span-2 flex flex-col gap-px" style={{ background: "#e0e0e0" }}>

            {/* Top right: girl photo */}
            <div className="relative overflow-hidden group cursor-pointer flex-1" style={{ minHeight: 280 }}>
              <img
                src="https://valkyriepeptides.com/wp-content/uploads/2026/04/mis.webp"
                alt="Expert Support"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-customer-service-2-line text-white text-xs"></i>
                  </div>
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">US-Based Support</span>
                </div>
                <h3 className="font-black text-xl uppercase leading-tight tracking-tight mb-2" style={{ background: "linear-gradient(135deg, #c8c8c8 0%, #f0f0f0 30%, #a0a0a0 55%, #d8d8d8 75%, #b0b0b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Expert Support<br />from Real People
                </h3>
                <p className="text-white/65 text-xs leading-relaxed">
                  Our US-based team is available 7 days a week for product info, orders, and documentation.
                </p>
              </div>
            </div>

            {/* Bottom right: dark card with product */}
            <div className="relative overflow-hidden group cursor-pointer flex-1 flex flex-col justify-between p-8" style={{ background: "#111111", minHeight: 280 }}>
              {/* Faded product watermark */}
              <img
                src="https://valkyriepeptides.com/wp-content/uploads/2026/03/BPC-157_10mg_Peptide-removebg-preview.png"
                alt="BPC-157"
                className="absolute right-0 bottom-0 h-[90%] w-auto object-contain opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-stack-line text-white text-xs"></i>
                  </div>
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">Volume Discounts</span>
                </div>
                <h3 className="font-black text-xl uppercase leading-tight tracking-tight mb-3" style={{ background: "linear-gradient(135deg, #c8c8c8 0%, #f0f0f0 30%, #a0a0a0 55%, #d8d8d8 75%, #b0b0b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Bulk Pricing for<br />Larger Orders
                </h3>
                <p className="text-white/55 text-xs leading-relaxed max-w-[220px]">
                  Volume-based pricing for laboratories and larger research operations. Contact us to discuss your needs.
                </p>
              </div>
              <Link to="/contact" className="relative z-10 inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest cursor-pointer group-hover:gap-4 transition-all duration-200 mt-6">
                Contact Us
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}