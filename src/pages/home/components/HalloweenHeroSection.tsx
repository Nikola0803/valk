import { Link } from "react-router-dom";

const ORANGE   = "#f97316";
const ORANGE_L = "#fb923c";
const PURPLE   = "#a855f7";
const WHITE    = "#ffffff";

/** Simple 8-legged spider silhouette, legs animate with a subtle "crawl" wiggle. */
function Spider({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="hw-spider-legs">
        <path d="M18 18 L4 10 M18 18 L2 18 M18 18 L4 26 M18 18 L8 33" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M22 18 L36 10 M22 18 L38 18 M22 18 L36 26 M22 18 L32 33" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <ellipse cx="20" cy="22" rx="7" ry="8" fill="#0a0a0a" />
      <circle cx="20" cy="13" r="4.5" fill="#0a0a0a" />
      <circle cx="18" cy="12" r="0.9" fill="#f97316" />
      <circle cx="22" cy="12" r="0.9" fill="#f97316" />
    </svg>
  );
}

/** Corner spiderweb - concentric arcs + radial threads, built once, pure CSS sway. */
function Web({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="rgba(230,230,230,0.38)" strokeWidth="0.8">
        {[0, 30, 60, 90, 120, 150, 180].map((deg) => (
          <line key={deg} x1="0" y1="0" x2={150 * Math.cos((deg * Math.PI) / 180)} y2={150 * Math.sin((deg * Math.PI) / 180)} />
        ))}
        {[20, 42, 68, 98, 132].map((r) => (
          <path
            key={r}
            d={`M ${r} 0 Q ${r * 0.9} ${r * 0.45} ${r * 0.71} ${r * 0.71} Q ${r * 0.45} ${r * 0.9} 0 ${r} Q ${-r * 0.3} ${r * 0.75} ${-r * 0.1} ${r * 0.5}`}
            fill="none"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Halloween-themed hero - replaces HeroSection on the homepage for the
 * Halloween period (see page.tsx). Purely visual/seasonal: no sale
 * state/backend wiring, just the monster artwork + animated cobweb/spider/
 * fog dressing. Swap back to <HeroSection /> in page.tsx once the season's
 * over.
 */
export default function HalloweenHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 64px)", minHeight: 560, maxHeight: 900, background: "#050505" }}
    >
      {/* Monster artwork, full bleed */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://valkyriepeps.com/wp-content/uploads/2026/10/image-1793054942086.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          filter: "contrast(1.08) saturate(0.9) brightness(0.9)",
        }}
      />

      {/* Dark + color-grade overlay for text legibility and mood */}
      <div className="absolute inset-0 z-[1]" style={{
        background: `
          linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0.25) 55%, rgba(10,0,16,0.35) 100%),
          linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)
        `,
      }} />

      {/* Drifting fog */}
      <div className="absolute inset-x-0 bottom-0 z-[2] pointer-events-none" style={{ height: "45%", overflow: "hidden" }}>
        <div className="hw-fog hw-fog-1" />
        <div className="hw-fog hw-fog-2" />
      </div>

      {/* Floating embers / fireflies */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => {
          const left = (i * 53.7) % 100;
          const delay = (i * 0.83) % 10;
          const dur = 7 + (i % 5) * 1.6;
          const size = 2 + (i % 3);
          const hue = i % 3 === 0 ? ORANGE : i % 3 === 1 ? ORANGE_L : PURPLE;
          return (
            <span
              key={i}
              className="hw-ember"
              style={{
                left: `${left}%`,
                width: size,
                height: size,
                background: hue,
                boxShadow: `0 0 ${size * 3}px ${hue}`,
                animationDelay: `${delay}s`,
                animationDuration: `${dur}s`,
              }}
            />
          );
        })}
      </div>

      {/* Corner webs */}
      <Web className="absolute top-0 left-0 z-[4] pointer-events-none hw-web-sway" style={{ opacity: 0.8 }} />
      <Web className="absolute top-0 right-0 z-[4] pointer-events-none hw-web-sway" style={{ opacity: 0.8, transform: "scaleX(-1)", animationDelay: "1.3s" }} />

      {/* Dangling spider on a thread, top-right-ish */}
      <div className="absolute z-[5] pointer-events-none hw-dangle" style={{ top: 0, right: "14%" }}>
        <div style={{ width: 1, height: 120, background: "rgba(230,230,230,0.45)", margin: "0 auto" }} />
        <Spider size={26} />
      </div>

      {/* Crawling spiders */}
      <div className="absolute z-[5] pointer-events-none hw-crawl-1"><Spider size={20} /></div>
      <div className="absolute z-[5] pointer-events-none hw-crawl-2"><Spider size={16} /></div>
      <div className="absolute z-[5] pointer-events-none hw-crawl-3"><Spider size={22} /></div>

      {/* Bat flying past */}
      <svg className="absolute z-[5] pointer-events-none hw-bat" width="34" height="20" viewBox="0 0 34 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="hw-bat-wing-l" d="M17 10 C10 2, 2 2, 0 8 C6 7, 11 9, 17 10 Z" fill="#0a0a0a" />
        <path className="hw-bat-wing-r" d="M17 10 C24 2, 32 2, 34 8 C28 7, 23 9, 17 10 Z" fill="#0a0a0a" />
        <ellipse cx="17" cy="10" rx="2.6" ry="2" fill="#0a0a0a" />
      </svg>

      {/* Corner frame accents */}
      <div className="absolute z-[10] pointer-events-none hidden md:block" style={{ top: 16, left: 16, width: 24, height: 24, borderTop: `2px solid ${ORANGE}`, borderLeft: `2px solid ${ORANGE}`, opacity: 0.6 }} />
      <div className="absolute z-[10] pointer-events-none hidden md:block" style={{ bottom: 64, right: 16, width: 24, height: 24, borderBottom: `2px solid ${ORANGE}`, borderRight: `2px solid ${ORANGE}`, opacity: 0.6 }} />

      {/* Text content */}
      <div className="relative z-[6] h-full flex flex-col justify-end md:justify-center" style={{ padding: "0 24px 48px", maxWidth: 680 }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 18 }}>
          <span style={{ display: "inline-block", width: 24, height: 1, background: ORANGE }} />
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: ORANGE_L }}>
            🎃 Limited Time Collection
          </p>
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 92px)", lineHeight: 0.88,
          fontFamily: "'Oswald', sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em",
          background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_L} 35%, #c2410c 60%, ${ORANGE} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>UNLEASH THE</h1>
        <h1 style={{
          fontSize: "clamp(40px, 7vw, 92px)", lineHeight: 0.88,
          fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase",
          color: "transparent", WebkitTextStroke: `2px ${WHITE}`, textShadow: `0 0 18px rgba(249,115,22,0.35)`,
          marginBottom: 18,
        }}>MONSTERS WITHIN.</h1>

        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", maxWidth: 420, marginBottom: 4 }}>
          The same 99%+ purity, lab-verified peptides - now dressed to kill for a limited time only.
        </p>
        <p style={{ fontSize: 10, fontStyle: "italic", color: "rgba(255,255,255,0.35)", maxWidth: 420, marginBottom: 26 }}>
          *For Research Use Only. Not intended for human consumption.*
        </p>

        <div className="flex flex-wrap gap-2" style={{ marginBottom: 26 }}>
          {["🎃 LIMITED TIME", "99%+ PURITY", "USA MADE"].map((b) => (
            <div key={b} className="flex items-center gap-2" style={{
              padding: "6px 12px", border: `1px solid rgba(249,115,22,0.4)`, background: "rgba(249,115,22,0.08)",
              fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.14em", color: ORANGE_L,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, display: "inline-block" }} />
              {b}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            to="/shop"
            className="hw-cta inline-flex items-center gap-3 cursor-pointer whitespace-nowrap"
            style={{ background: ORANGE, color: "#111", padding: "14px 32px", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            Shop The Collection <i className="ri-arrow-right-line" />
          </Link>
          <Link
            to="/coa"
            className="cursor-pointer whitespace-nowrap"
            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.65)", borderBottom: `1.5px solid rgba(249,115,22,0.4)`, paddingBottom: 2 }}
          >
            View COAs →
          </Link>
        </div>
      </div>

      <style>{`
        .hw-fog {
          position: absolute;
          bottom: -10%;
          width: 160%;
          height: 100%;
          background: radial-gradient(ellipse 50% 60% at center, rgba(40,20,55,0.35), transparent 70%);
          filter: blur(18px);
        }
        .hw-fog-1 { left: -30%; animation: hwFogDrift 22s ease-in-out infinite; }
        .hw-fog-2 { left: -10%; animation: hwFogDrift 28s ease-in-out infinite reverse; opacity: 0.7; }
        @keyframes hwFogDrift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6%); }
        }

        .hw-ember {
          position: absolute;
          bottom: -10px;
          border-radius: 50%;
          animation-name: hwEmberRise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes hwEmberRise {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 0.9; }
          50%  { transform: translate(14px, -45vh); opacity: 0.6; }
          90%  { opacity: 0.2; }
          100% { transform: translate(-6px, -85vh); opacity: 0; }
        }

        .hw-web-sway {
          transform-origin: top center;
          animation: hwWebSway 6s ease-in-out infinite;
        }
        @keyframes hwWebSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.2deg); }
        }

        .hw-dangle { animation: hwDangleBob 4.5s ease-in-out infinite; }
        @keyframes hwDangleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }

        .hw-spider-legs { transform-origin: 20px 20px; animation: hwLegWiggle 0.6s ease-in-out infinite; }
        @keyframes hwLegWiggle {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.88); }
        }

        .hw-crawl-1 { bottom: 6%; animation: hwCrawlA 26s linear infinite; }
        .hw-crawl-2 { bottom: 11%; animation: hwCrawlB 34s linear infinite; animation-delay: -8s; }
        .hw-crawl-3 { top: 18%; left: 0; animation: hwCrawlC 40s linear infinite; animation-delay: -20s; }
        @keyframes hwCrawlA {
          0%   { left: -5%; transform: translateY(0) rotate(0deg); }
          25%  { transform: translateY(-6px) rotate(3deg); }
          50%  { left: 48%; transform: translateY(0) rotate(-3deg); }
          75%  { transform: translateY(-6px) rotate(3deg); }
          100% { left: 108%; transform: translateY(0) rotate(0deg); }
        }
        @keyframes hwCrawlB {
          0%   { left: 108%; transform: translateY(0) scaleX(-1); }
          50%  { transform: translateY(-5px) scaleX(-1); }
          100% { left: -5%; transform: translateY(0) scaleX(-1); }
        }
        @keyframes hwCrawlC {
          0%   { left: -5%; top: 15%; }
          30%  { left: 25%; top: 22%; }
          55%  { left: 55%; top: 12%; }
          80%  { left: 85%; top: 20%; }
          100% { left: 108%; top: 15%; }
        }

        .hw-bat {
          top: 14%;
          animation: hwBatFly 16s linear infinite;
          animation-delay: 3s;
        }
        @keyframes hwBatFly {
          0%   { left: -8%; top: 22%; opacity: 0; }
          8%   { opacity: 0.85; }
          45%  { left: 50%; top: 8%; }
          92%  { opacity: 0.85; }
          100% { left: 110%; top: 18%; opacity: 0; }
        }
        .hw-bat-wing-l, .hw-bat-wing-r { transform-origin: 17px 10px; animation: hwBatFlap 0.35s ease-in-out infinite; }
        .hw-bat-wing-r { animation-delay: 0.02s; }
        @keyframes hwBatFlap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }

        .hw-cta {
          animation: hwCtaPulse 2.4s ease-in-out infinite;
          transition: background 0.2s;
        }
        .hw-cta:hover { background: #fb923c !important; }
        @keyframes hwCtaPulse {
          0%, 100% { box-shadow: 0 0 0px rgba(249,115,22,0.5); }
          50% { box-shadow: 0 0 22px rgba(249,115,22,0.55); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hw-fog, .hw-ember, .hw-web-sway, .hw-dangle, .hw-spider-legs,
          .hw-crawl-1, .hw-crawl-2, .hw-crawl-3, .hw-bat, .hw-bat-wing-l, .hw-bat-wing-r, .hw-cta {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
