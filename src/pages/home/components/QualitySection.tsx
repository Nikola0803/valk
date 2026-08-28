import { Link } from "react-router-dom";
import { qualityPoints } from "@/mocks/products";

const commitmentPoints = [
  { icon: "ri-settings-3-line", label: "Batch-to-batch reproducibility" },
  { icon: "ri-file-text-line", label: "Accurate labeling and documentation" },
  { icon: "ri-award-line", label: "Clear Certificates of Analysis (COAs)" },
  { icon: "ri-box-3-line", label: "Secure, protective packaging & discreet shipping" },
  { icon: "ri-shield-check-line", label: "Strict adherence to research-only guidelines" },
  { icon: "ri-microscope-line", label: "Independent third-party verification" },
];

export default function QualitySection() {
  return (
    <>
      {/* Quality & Verification */}
      <section id="about" style={{ background: "#f8f7f5" }} className="py-28 px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0" style={{ border: "1px solid #e0e0e0" }}>

            {/* Left: premium editorial composite */}
            <div className="relative overflow-hidden self-stretch" style={{ minHeight: 560, background: "#050505" }}>

              {/* Base: real Warrior product lineup photo */}
              <img
                src="/IMG_0912.jpeg"
                alt="Warrior Distributions full product lineup"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 40%" }}
              />

              {/* Cinematic dark vignette - light so photo breathes */}
              <div className="absolute inset-0" style={{
                background: `
                  linear-gradient(to bottom, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.0) 20%, rgba(5,5,5,0.0) 60%, rgba(5,5,5,0.88) 100%),
                  linear-gradient(to right, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.0) 70%, rgba(5,5,5,0.35) 100%)
                `
              }} />

              {/* Left silver edge accent */}
              <div className="absolute left-0 top-0 bottom-0" style={{ width: 3, background: "linear-gradient(to bottom, transparent, rgba(192,192,192,0.5) 30%, rgba(192,192,192,0.5) 70%, transparent)" }} />

              {/* Corner marks */}
              <div className="absolute" style={{ top: 18, left: 18, width: 22, height: 22, borderTop: "1.5px solid rgba(192,192,192,0.6)", borderLeft: "1.5px solid rgba(192,192,192,0.6)" }} />
              <div className="absolute" style={{ top: 18, right: 18, width: 22, height: 22, borderTop: "1.5px solid rgba(192,192,192,0.6)", borderRight: "1.5px solid rgba(192,192,192,0.6)" }} />
              <div className="absolute" style={{ bottom: 18, left: 18, width: 22, height: 22, borderBottom: "1.5px solid rgba(192,192,192,0.6)", borderLeft: "1.5px solid rgba(192,192,192,0.6)" }} />
              <div className="absolute" style={{ bottom: 18, right: 18, width: 22, height: 22, borderBottom: "1.5px solid rgba(192,192,192,0.6)", borderRight: "1.5px solid rgba(192,192,192,0.6)" }} />

              {/* Top label pill */}
              <div className="absolute top-7 left-7 z-20 flex items-center gap-2" style={{ background: "rgba(5,5,5,0.82)", border: "1px solid rgba(192,192,192,0.22)", padding: "6px 14px" }}>
                <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "#c0c0c0", animation: "qs-pulse 2s ease-in-out infinite" }} />
                <p style={{ color: "#c0c0c0", fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Share Tech Mono', monospace", whiteSpace: "nowrap" }}>Research Grade · USA Made</p>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4" style={{ background: "rgba(5,5,5,0.88)", borderTop: "1px solid rgba(192,192,192,0.12)" }}>
                <div className="flex items-center gap-2">
                  <i className="ri-shield-check-fill text-green-400 text-sm"></i>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Share Tech Mono', monospace" }}>3rd Party Verified</span>
                </div>
                <div className="flex items-center gap-4">
                  {[["99.4%", "Purity"], ["COA", "Every Batch"], ["USA", "Made"]].map(([val, lbl]) => (
                    <div key={lbl} className="text-center">
                      <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 14, background: "linear-gradient(135deg, #e8e8e8, #aaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.02em" }}>{val}</p>
                      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 7, letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              <style>{`
                @keyframes qs-pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.4; transform: scale(0.7); }
                }
              `}</style>
            </div>

            {/* Right: content */}
            <div className="p-12 lg:p-16 flex flex-col justify-center" style={{ background: "#ffffff" }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">Quality Assurance</p>
              <h2 className="font-black uppercase leading-[0.88] tracking-tight mb-6" style={{ fontSize: "clamp(30px, 3.5vw, 48px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                QUALITY &amp;<br />
                <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>VERIFICATION</span>
              </h2>
              <p className="text-[#777] text-sm leading-relaxed mb-8">
                Warrior Distributions operates at the forefront of research-grade peptide acquisition. Each product undergoes independent third-party testing to confirm:
              </p>

              <div className="space-y-3 mb-10">
                {qualityPoints.map((point) => (
                  <div key={point.id} className="flex gap-4 items-start p-4" style={{ background: "#f8f7f5", border: "1px solid #ebebeb" }}>
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: "#111111" }}>
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <div>
                      <h4 className="text-[#111111] font-bold text-sm mb-0.5">{point.title}</h4>
                      <p className="text-[#888] text-xs leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/coa"
                className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-xs cursor-pointer whitespace-nowrap transition-all duration-200 self-start"
                style={{ background: "#111111", color: "#ffffff", padding: "15px 32px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#333"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#111111"; }}
              >
                View Lab Reports
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Research Excellence */}
      <section style={{ background: "#111111" }} className="py-28 px-8">
        <div className="max-w-[1320px] mx-auto">

          {/* Header block */}
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 mb-5">Our Mission</p>
            <h2 className="font-black uppercase leading-[0.88] tracking-tight mb-8" style={{ fontSize: "clamp(34px, 4.5vw, 60px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              COMMITMENT TO<br />
              <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>RESEARCH EXCELLENCE</span>
            </h2>
            <p className="text-white/55 text-sm leading-[1.85] uppercase tracking-wide max-w-2xl" style={{ fontWeight: 500 }}>
              Warrior Distributions is built on a foundation of scientific integrity, transparency, and reliability. Our mission is to support researchers with high-quality materials that contribute to meaningful scientific progress. We understand the importance of consistency in laboratory environments, which is why we prioritize:
            </p>
          </div>

          {/* Divider */}
          <div className="w-full mb-12" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

          {/* Priority points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {commitmentPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-8 transition-all duration-200"
                style={{ background: "#111111" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#161616"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#111111"; }}
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <i className={`${point.icon} text-white/70 text-lg`}></i>
                </div>
                <div>
                  <span className="text-white/80 text-sm font-semibold leading-relaxed uppercase tracking-wide">{point.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
