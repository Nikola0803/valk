import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BLACK    = "#0a0a0a";
const SILVER   = "#c0c0c0";
const SILVER_L = "#e8e8e8";
const SILVER_D = "#888888";
const WHITE    = "#ffffff";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.12 + 0.03,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = SILVER;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      {/* Mobile (hidden md+): clean stacked layout, text then visual strip */}
      <div className="block md:hidden" style={{ background: BLACK }}>

        {/* TEXT BLOCK */}
        <div style={{ padding: "40px 24px 32px" }}>

          {/* Overline */}
          <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: SILVER }} />
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: SILVER_D }}>
              USA Research Grade Peptides
            </p>
          </div>

          {/* Headlines */}
          <h1 style={{
            fontSize: 56, lineHeight: 0.88,
            fontFamily: "'Oswald', sans-serif", fontWeight: 900,
            textTransform: "uppercase", letterSpacing: "-0.01em",
            background: `linear-gradient(135deg, #888 0%, ${SILVER_L} 30%, #606060 55%, #aaa 75%, #777 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 0,
          }}>PRECISION.</h1>
          <h1 style={{
            fontSize: 56, lineHeight: 0.88,
            fontFamily: "'Oswald', sans-serif", fontWeight: 700,
            textTransform: "uppercase",
            color: "transparent", WebkitTextStroke: `2px ${SILVER_D}`,
            marginBottom: 0,
          }}>PURITY.</h1>
          <h1 style={{
            fontSize: 56, lineHeight: 0.88,
            fontFamily: "'Oswald', sans-serif", fontWeight: 700,
            textTransform: "uppercase",
            color: "transparent", WebkitTextStroke: `2px ${SILVER_D}`,
            marginBottom: 20,
          }}>PERFORMANCE.</h1>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: `linear-gradient(to right, ${WHITE}, rgba(255,255,255,0.05))`, marginBottom: 16 }} />

          {/* Body */}
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.58)", marginBottom: 4 }}>
            Premium research-grade peptides lyophilized and verified in the USA.
          </p>
          <p style={{ fontSize: 10, fontStyle: "italic", color: "rgba(255,255,255,0.25)", marginBottom: 24 }}>
            *For Research Use Only. Not intended for human consumption.*
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 24 }}>
            {["99%+ PURITY", "3RD PARTY TESTED", "USA MADE"].map((b) => (
              <div key={b} className="flex items-center gap-2" style={{
                padding: "5px 10px",
                border: `1px solid rgba(192,192,192,0.3)`,
                background: "rgba(255,255,255,0.03)",
                fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: SILVER,
              }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: SILVER, display: "inline-block" }} />
                {b}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-5" style={{ marginBottom: 28 }}>
            <Link
              to="/shop"
              style={{ background: WHITE, color: BLACK, padding: "13px 28px", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Shop Peptides <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/coa"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: SILVER_D, borderBottom: `1px solid rgba(192,192,192,0.3)`, paddingBottom: 2 }}
            >
              View COAs →
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center" style={{ gap: 16 }}>
            {[
              { val: "99.4%", label: "Purity" },
              { val: "48hr",  label: "Ships" },
              { val: "USA",   label: "Made" },
              { val: "COA",   label: "Verified" },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center" style={{ gap: 16 }}>
                <div>
                  <p style={{
                    fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 14,
                    background: `linear-gradient(135deg, ${SILVER_L}, ${SILVER})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{s.val}</p>
                  <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{s.label}</p>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.12)" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* VISUAL STRIP - molecular SVG */}
        <div className="relative w-full overflow-hidden" style={{ height: 220, background: "#0d0d0d", borderTop: `1px solid rgba(192,192,192,0.08)` }}>
          <svg viewBox="0 0 390 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            <defs>
              <filter id="m-glow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
              <linearGradient id="m-bSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c0c0c0" stopOpacity="0.75"/>
                <stop offset="100%" stopColor="#e8e8e8" stopOpacity="0.2"/>
              </linearGradient>
              <linearGradient id="m-bGrey" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#888" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#555" stopOpacity="0.15"/>
              </linearGradient>
              <radialGradient id="m-nSilver" cx="35%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fff"/>
                <stop offset="40%" stopColor="#d0d0d0"/>
                <stop offset="100%" stopColor="#606060"/>
              </radialGradient>
              <radialGradient id="m-nDark" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#aaa"/>
                <stop offset="100%" stopColor="#333"/>
              </radialGradient>
              <pattern id="m-hex" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                <path d="M20 2 L38 12 L38 34 L20 44 L2 34 L2 12 Z" fill="none" stroke="#2e2e2e" strokeWidth="0.6"/>
              </pattern>
            </defs>

            {/* hex grid bg */}
            <rect width="390" height="220" fill="url(#m-hex)" opacity="0.25"/>

            {/* Peptide chain - centred */}
            <g style={{ animation: "vpFloat 6s ease-in-out infinite" }}>
              <line x1="20"  y1="110" x2="75"  y2="82"  stroke="url(#m-bSilver)" strokeWidth="2"/>
              <line x1="75"  y1="82"  x2="138" y2="100" stroke="url(#m-bGrey)"   strokeWidth="2"/>
              <line x1="138" y1="100" x2="195" y2="72"  stroke="url(#m-bSilver)" strokeWidth="2"/>
              <line x1="195" y1="72"  x2="255" y2="90"  stroke="url(#m-bGrey)"   strokeWidth="2"/>
              <line x1="255" y1="90"  x2="312" y2="64"  stroke="url(#m-bSilver)" strokeWidth="2"/>
              <line x1="312" y1="64"  x2="370" y2="82"  stroke="url(#m-bGrey)"   strokeWidth="2"/>
              {/* side chains */}
              <line x1="75"  y1="82"  x2="68"  y2="128" stroke="#c0c0c0" strokeWidth="1.2" opacity="0.38"/>
              <line x1="138" y1="100" x2="148" y2="144" stroke="#888"    strokeWidth="1.2" opacity="0.38"/>
              <line x1="195" y1="72"  x2="186" y2="34"  stroke="#c0c0c0" strokeWidth="1.2" opacity="0.38"/>
              <line x1="255" y1="90"  x2="264" y2="134" stroke="#888"    strokeWidth="1.2" opacity="0.38"/>
              <line x1="312" y1="64"  x2="320" y2="26"  stroke="#c0c0c0" strokeWidth="1.2" opacity="0.38"/>
              {/* nodes */}
              <circle cx="20"  cy="110" r="10" fill="url(#m-nSilver)" filter="url(#m-glow)"/>
              <text x="20"  y="114" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#0a0a0a" fontWeight="bold">N</text>
              <circle cx="75"  cy="82"  r="8"  fill="url(#m-nDark)"/>
              <text x="75"  y="86"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="6" fill="#fff">Cα</text>
              <circle cx="138" cy="100" r="10" fill="url(#m-nSilver)" filter="url(#m-glow)"/>
              <text x="138" y="104" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#0a0a0a" fontWeight="bold">C</text>
              <circle cx="195" cy="72"  r="12" fill="url(#m-nSilver)" filter="url(#m-glow)"/>
              <text x="195" y="77"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#0a0a0a" fontWeight="bold">NH</text>
              <circle cx="255" cy="90"  r="9"  fill="url(#m-nDark)"/>
              <text x="255" y="94"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="6" fill="#fff">Cα</text>
              <circle cx="312" cy="64"  r="10" fill="url(#m-nSilver)" filter="url(#m-glow)"/>
              <text x="312" y="68"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="6" fill="#0a0a0a">CO</text>
              <circle cx="370" cy="82"  r="8"  fill="url(#m-nDark)"/>
              <text x="370" y="86"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="6" fill="#fff">N</text>
            </g>

            {/* COA box - right */}
            <g opacity="0.8" style={{ animation: "vpFloat2 8s ease-in-out infinite 2s" }}>
              <rect x="234" y="130" width="148" height="78" rx="2" fill="#0a0a0a" stroke="#888" strokeWidth="0.7" strokeOpacity="0.5"/>
              <rect x="234" y="130" width="148" height="16" rx="2" fill="#fff" fillOpacity="0.06"/>
              <text x="242" y="142" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#c0c0c0">COA DATA</text>
              <text x="242" y="158" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#888">Purity: <tspan fill="#e8e8e8">99.4%</tspan></text>
              <text x="242" y="171" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#888">MW: <tspan fill="#fff">3214.8 Da</tspan></text>
              <text x="242" y="184" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#888">Batch: <tspan fill="#fff">VP-2026-04</tspan></text>
              <text x="242" y="200" fontFamily="'Share Tech Mono',monospace" fontSize="6" fill="#c0c0c0" opacity="0.6">■ VERIFIED ✓ US MADE</text>
            </g>

            {/* HPLC strip - left */}
            <g opacity="0.6" style={{ animation: "vpFloat 7s ease-in-out infinite 1s" }}>
              <text x="8" y="172" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#aaa">HPLC</text>
              <line x1="8" y1="190" x2="210" y2="190" stroke="#555" strokeWidth="0.7" opacity="0.5"/>
              <path d="M8,190 L24,190 L28,188 L32,185 L36,175 L40,163 L44,157 L48,163 L52,175 L56,185 L60,189 L72,190 L80,189 L86,181 L90,174 L94,181 L98,189 L114,190 L122,189 L126,184 L128,179 L131,184 L134,189 L210,190"
                fill="none" stroke="#c0c0c0" strokeWidth="1.3" opacity="0.7"/>
              <text x="44" y="154" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="6" fill="#e8e8e8">99.2%</text>
            </g>

            {/* Verified badge */}
            <g>
              <rect x="8" y="8" width="118" height="22" rx="11" fill="#111"/>
              <circle cx="22" cy="19" r="5" fill="none" stroke="#4ade80" strokeWidth="1.2"/>
              <text x="22" y="22" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="#4ade80">✓</text>
              <text x="32" y="23" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#fff" letterSpacing="0.1em">3RD PARTY VERIFIED</text>
            </g>
          </svg>

          {/* scan line */}
          <div className="absolute top-0 bottom-0 pointer-events-none" style={{
            width: 1,
            background: `linear-gradient(to bottom, transparent, ${SILVER_D} 30%, ${SILVER_L} 50%, ${SILVER_D} 70%, transparent)`,
            animation: "vpScanline 9s ease-in-out infinite", opacity: 0.35,
          }} />
        </div>
      </div>

      {/* Desktop (hidden on mobile, shown md+) */}
      <section
        className="relative w-full overflow-hidden hidden md:block"
        style={{ height: "calc(100vh - 64px)", minHeight: 560, maxHeight: 860, background: BLACK }}
      >
        {/* Dark radial bg */}
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 80% at 75% 50%, #1a1a1a 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 30%, #141414 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 50% 100%, #111 0%, transparent 60%),
            ${BLACK}`,
        }} />
        {/* Left fade */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          background: "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 35%, rgba(10,10,10,0.38) 58%, rgba(10,10,10,0.0) 76%)",
        }} />
        {/* Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 z-[2] w-full h-full pointer-events-none" />
        {/* Scan line */}
        <div className="absolute top-0 bottom-0 z-[3] pointer-events-none" style={{
          width: 1,
          background: `linear-gradient(to bottom, transparent 0%, ${SILVER_D} 20%, ${SILVER_L} 50%, ${SILVER_D} 80%, transparent 100%)`,
          animation: "vpScanline 9s ease-in-out infinite", opacity: 0.5,
        }} />
        {/* Corner accents */}
        <div className="absolute z-[10] pointer-events-none" style={{ top: 16, left: 16, width: 24, height: 24, borderTop: `2px solid ${SILVER}`, borderLeft: `2px solid ${SILVER}`, opacity: 0.55 }} />
        <div className="absolute z-[10] pointer-events-none" style={{ top: 16, right: 16, width: 24, height: 24, borderTop: `2px solid ${SILVER}`, borderRight: `2px solid ${SILVER}`, opacity: 0.55 }} />
        <div className="absolute z-[10] pointer-events-none" style={{ bottom: 64, left: 16, width: 24, height: 24, borderBottom: `2px solid ${SILVER}`, borderLeft: `2px solid ${SILVER}`, opacity: 0.55 }} />
        <div className="absolute z-[10] pointer-events-none" style={{ bottom: 64, right: 16, width: 24, height: 24, borderBottom: `2px solid ${SILVER}`, borderRight: `2px solid ${SILVER}`, opacity: 0.55 }} />

        {/* Molecular SVG right panel */}
        <div className="absolute right-0 top-0 bottom-0 z-[4] pointer-events-none" style={{ width: "52%" }}>
          <svg viewBox="0 0 620 520" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            <defs>
              <filter id="vp-silverGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
              <filter id="vp-whiteGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
              <radialGradient id="vp-bgGlow" cx="55%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#1c1c1c" stopOpacity="1"/>
                <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1"/>
              </radialGradient>
              <linearGradient id="vp-bondSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c0c0c0" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#e8e8e8" stopOpacity="0.3"/>
              </linearGradient>
              <linearGradient id="vp-bondGrey" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#888" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#555" stopOpacity="0.2"/>
              </linearGradient>
              <radialGradient id="vp-nodeSilver" cx="35%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fff"/>
                <stop offset="40%" stopColor="#d0d0d0"/>
                <stop offset="100%" stopColor="#606060"/>
              </radialGradient>
              <radialGradient id="vp-nodeDark" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#aaa"/>
                <stop offset="100%" stopColor="#333"/>
              </radialGradient>
              <radialGradient id="vp-nodeWhite" cx="35%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fff"/>
                <stop offset="100%" stopColor="#999"/>
              </radialGradient>
              <radialGradient id="vp-nodeGrey" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#ccc"/>
                <stop offset="100%" stopColor="#4a4a4a"/>
              </radialGradient>
              <pattern id="vp-hexgrid" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                <path d="M20 2 L38 12 L38 34 L20 44 L2 34 L2 12 Z" fill="none" stroke="#444" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <ellipse cx="310" cy="240" rx="260" ry="200" fill="url(#vp-bgGlow)" opacity="0.6"/>
            <rect width="620" height="520" fill="url(#vp-hexgrid)" opacity="0.12"/>
            <g style={{ animation: "vpFloat 6s ease-in-out infinite" }}>
              <line x1="120" y1="200" x2="175" y2="165" stroke="url(#vp-bondSilver)" strokeWidth="2.5"/>
              <line x1="175" y1="165" x2="240" y2="185" stroke="url(#vp-bondGrey)"   strokeWidth="2.5"/>
              <line x1="240" y1="185" x2="300" y2="150" stroke="url(#vp-bondSilver)" strokeWidth="2.5"/>
              <line x1="300" y1="150" x2="365" y2="175" stroke="url(#vp-bondGrey)"   strokeWidth="2.5"/>
              <line x1="365" y1="175" x2="420" y2="145" stroke="url(#vp-bondSilver)" strokeWidth="2.5"/>
              <line x1="420" y1="145" x2="480" y2="170" stroke="url(#vp-bondGrey)"   strokeWidth="2.5"/>
              <line x1="175" y1="165" x2="160" y2="225" stroke="#c0c0c0" strokeWidth="1.5" opacity="0.45"/>
              <line x1="240" y1="185" x2="255" y2="245" stroke="#888"    strokeWidth="1.5" opacity="0.45"/>
              <line x1="300" y1="150" x2="285" y2="100" stroke="#c0c0c0" strokeWidth="1.5" opacity="0.45"/>
              <line x1="365" y1="175" x2="380" y2="235" stroke="#888"    strokeWidth="1.5" opacity="0.45"/>
              <line x1="420" y1="145" x2="435" y2="90"  stroke="#c0c0c0" strokeWidth="1.5" opacity="0.45"/>
              <line x1="238" y1="182" x2="298" y2="147" stroke="#aaa"    strokeWidth="1"   opacity="0.35"/>
              <line x1="207" y1="160" x2="207" y2="192" stroke="#aaa"    strokeWidth="1"   opacity="0.45"/>
              <line x1="193" y1="176" x2="221" y2="176" stroke="#aaa"    strokeWidth="1"   opacity="0.45"/>
              <circle cx="120" cy="200" r="14" fill="url(#vp-nodeSilver)" filter="url(#vp-silverGlow)"/>
              <text x="120" y="205" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="9" fill="#0a0a0a" fontWeight="bold">N</text>
              <circle cx="175" cy="165" r="12" fill="url(#vp-nodeDark)"/>
              <text x="175" y="169" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#fff">Cα</text>
              <circle cx="240" cy="185" r="14" fill="url(#vp-nodeWhite)" filter="url(#vp-whiteGlow)"/>
              <text x="240" y="189" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="9" fill="#0a0a0a" fontWeight="bold">C</text>
              <circle cx="300" cy="150" r="16" fill="url(#vp-nodeSilver)" filter="url(#vp-silverGlow)"/>
              <text x="300" y="155" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="9" fill="#0a0a0a" fontWeight="bold">NH</text>
              <circle cx="365" cy="175" r="13" fill="url(#vp-nodeDark)"/>
              <text x="365" y="179" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#fff">Cα</text>
              <circle cx="420" cy="145" r="14" fill="url(#vp-nodeSilver)" filter="url(#vp-silverGlow)"/>
              <text x="420" y="149" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#0a0a0a">CO</text>
              <circle cx="480" cy="170" r="12" fill="url(#vp-nodeWhite)"/>
              <text x="480" y="174" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#0a0a0a">N</text>
              <circle cx="160" cy="240" r="8" fill="url(#vp-nodeGrey)"  opacity="0.75"/>
              <text x="160" y="244" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#fff">O</text>
              <circle cx="255" cy="258" r="9" fill="url(#vp-nodeDark)"  opacity="0.7"/>
              <text x="255" y="262" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#fff">R</text>
              <circle cx="285" cy="88"  r="9" fill="url(#vp-nodeSilver)" opacity="0.8"/>
              <text x="285" y="92"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#0a0a0a">O</text>
              <circle cx="380" cy="248" r="8" fill="url(#vp-nodeGrey)"  opacity="0.75"/>
              <text x="380" y="252" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#fff">H</text>
              <circle cx="435" cy="78"  r="9" fill="url(#vp-nodeSilver)" opacity="0.8"/>
              <text x="435" y="82"  textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#0a0a0a">R</text>
            </g>
            <g style={{ animation: "vpFloat2 8s ease-in-out infinite 2s" }}>
              <polygon points="470,340 500,325 530,340 530,370 500,385 470,370" fill="none" stroke="#888" strokeWidth="1.5" opacity="0.6"/>
              <polygon points="480,342 500,333 520,342 520,368 500,377 480,368" fill="none" stroke="#888" strokeWidth="0.8" opacity="0.3"/>
              <circle cx="500" cy="355" r="4" fill="#aaa" opacity="0.6"/>
              <text x="500" y="359" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#ccc">Ph</text>
              <line x1="500" y1="325" x2="500" y2="305" stroke="#888" strokeWidth="1.2" opacity="0.5"/>
              <circle cx="500" cy="300" r="7" fill="url(#vp-nodeDark)"   opacity="0.7"/>
              <text x="500" y="304" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#fff">N</text>
              <line x1="530" y1="355" x2="555" y2="355" stroke="#888" strokeWidth="1.2" opacity="0.5"/>
              <circle cx="562" cy="355" r="7" fill="url(#vp-nodeSilver)" opacity="0.7"/>
              <text x="562" y="359" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#0a0a0a">O</text>
            </g>
            <g opacity="0.55" style={{ animation: "vpFloat 7s ease-in-out infinite 1s" }}>
              <text x="68" y="405" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#aaa" opacity="0.7">HPLC ANALYSIS</text>
              <line x1="68" y1="450" x2="350" y2="450" stroke="#666" strokeWidth="0.8" opacity="0.5"/>
              <path d="M68,450 L90,450 L95,448 L100,445 L105,430 L110,415 L115,408 L120,415 L125,430 L130,445 L135,449 L150,450 L160,449 L170,435 L175,420 L180,412 L185,420 L190,435 L195,449 L210,450 L225,449 L235,440 L240,432 L242,440 L245,449 L280,450 L290,449 L295,444 L298,438 L302,444 L305,449 L350,450"
                fill="none" stroke="#c0c0c0" strokeWidth="1.5" opacity="0.75"/>
              <line x1="115" y1="408" x2="115" y2="400" stroke="#c0c0c0" strokeWidth="0.8" opacity="0.55"/>
              <text x="115" y="398" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#e8e8e8" opacity="0.85">99.2%</text>
              <line x1="180" y1="412" x2="180" y2="404" stroke="#aaa" strokeWidth="0.8" opacity="0.5"/>
              <text x="180" y="402" textAnchor="middle" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#aaa" opacity="0.8">ID+</text>
            </g>
            <g opacity="0.75" style={{ animation: "vpFloat2 8s ease-in-out infinite 2s" }}>
              <rect x="385" y="285" width="180" height="110" rx="3" fill="#0f0f0f" stroke="#888" strokeWidth="0.8" strokeOpacity="0.5"/>
              <rect x="385" y="285" width="180" height="20"  rx="3" fill="#fff"    fillOpacity="0.07"/>
              <text x="395" y="299" fontFamily="'Share Tech Mono',monospace" fontSize="9" fill="#c0c0c0">COA DATA</text>
              <text x="395" y="317" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#888">Purity: <tspan fill="#e8e8e8">99.4%</tspan></text>
              <text x="395" y="332" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#888">MW: <tspan fill="#fff">3214.8 Da</tspan></text>
              <text x="395" y="347" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#888">Endotoxin: <tspan fill="#aaa">&lt;0.1 EU/mg</tspan></text>
              <text x="395" y="362" fontFamily="'Share Tech Mono',monospace" fontSize="8" fill="#888">Batch: <tspan fill="#fff">VP-2026-04</tspan></text>
              <text x="395" y="382" fontFamily="'Share Tech Mono',monospace" fontSize="7" fill="#c0c0c0" opacity="0.65">&#9632; VERIFIED &#10003; US MADE</text>
            </g>
            <circle cx="540" cy="80"  r="5" fill="url(#vp-nodeSilver)" opacity="0.3" style={{ animation: "vpFloat 6s ease-in-out infinite" }}/>
            <circle cx="560" cy="100" r="4" fill="url(#vp-nodeDark)"   opacity="0.25" style={{ animation: "vpFloat2 8s ease-in-out infinite 2s" }}/>
            <circle cx="550" cy="120" r="3" fill="url(#vp-nodeWhite)"  opacity="0.2"  style={{ animation: "vpFloat 7s ease-in-out infinite 1s" }}/>
            <line x1="540" y1="80"  x2="560" y2="100" stroke="#888" strokeWidth="0.8" opacity="0.2"/>
            <line x1="560" y1="100" x2="550" y2="120" stroke="#666" strokeWidth="0.8" opacity="0.2"/>
          </svg>
        </div>

        {/* Desktop text */}
        <div className="relative z-[5] h-full flex flex-col justify-center py-16" style={{ paddingLeft: "clamp(28px, 7vw, 100px)", maxWidth: 680 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 28, animation: "vpFadeUp 0.8s ease forwards 0.3s", opacity: 0 }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: SILVER }} />
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: SILVER_D }}>USA Research Grade Peptides</p>
          </div>
          <div style={{ animation: "vpFadeUp 0.9s ease forwards 0.5s", opacity: 0, marginBottom: 8 }}>
            <h1 style={{ fontSize: "clamp(52px, 7vw, 100px)", lineHeight: 0.86, fontFamily: "'Oswald', sans-serif", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", background: `linear-gradient(135deg, #888 0%, ${SILVER_L} 30%, #606060 55%, #aaa 75%, #777 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>PRECISION.</h1>
            <h1 style={{ fontSize: "clamp(52px, 7vw, 100px)", lineHeight: 0.86, fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "transparent", WebkitTextStroke: `2px ${SILVER_D}`, textShadow: `0 0 14px rgba(180,180,180,0.25)` }}>PURITY.</h1>
            <h1 style={{ fontSize: "clamp(52px, 7vw, 100px)", lineHeight: 0.86, fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "transparent", WebkitTextStroke: `2px ${SILVER_D}`, textShadow: `0 0 14px rgba(180,180,180,0.25)` }}>PERFORMANCE.</h1>
          </div>
          <p style={{ fontSize: "clamp(11px, 1.3vw, 15px)", fontFamily: "'Cinzel', 'Georgia', serif", color: SILVER_D, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, animation: "vpFadeUp 0.9s ease forwards 0.65s", opacity: 0 }}>Precision Synthesis · Lab Verified</p>
          <div style={{ width: 300, height: 1, background: `linear-gradient(to right, ${WHITE}, rgba(255,255,255,0.1))`, marginBottom: 20, animation: "vpFadeUp 0.8s ease forwards 0.8s", opacity: 0 }} />
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.60)", maxWidth: 400, marginBottom: 4, animation: "vpFadeUp 0.9s ease forwards 0.95s", opacity: 0 }}>Premium research-grade peptides lyophilized and verified in the USA. Engineered for consistency, stability, and analytical reliability.</p>
          <p style={{ fontSize: 10, fontStyle: "italic", color: "rgba(255,255,255,0.28)", maxWidth: 400, marginBottom: 24, animation: "vpFadeUp 0.9s ease forwards 1.1s", opacity: 0 }}>*For Research Use Only. Not intended for human consumption.*</p>
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 28, animation: "vpFadeUp 0.9s ease forwards 1.1s", opacity: 0 }}>
            {["99%+ PURITY", "3RD PARTY TESTED", "USA MADE"].map((b) => (
              <div key={b} className="flex items-center gap-2" style={{ padding: "5px 12px", border: `1px solid rgba(192,192,192,0.35)`, background: "rgba(255,255,255,0.04)", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: SILVER }}>
                <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: SILVER, animation: "vpPulse 2s ease-in-out infinite" }} />
                {b}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-5" style={{ marginBottom: 32, animation: "vpFadeUp 0.9s ease forwards 1.25s", opacity: 0 }}>
            <Link to="/shop" className="inline-flex items-center gap-3 cursor-pointer whitespace-nowrap transition-all duration-200" style={{ background: WHITE, color: BLACK, padding: "14px 32px", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e0e0e0"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = WHITE; }}>Shop Peptides <i className="ri-arrow-right-line" /></Link>
            <Link to="/coa" className="cursor-pointer whitespace-nowrap transition-all duration-200" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: SILVER_D, borderBottom: `1.5px solid rgba(192,192,192,0.35)`, paddingBottom: 2 }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = WHITE; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = SILVER_D; }}>View COAs →</Link>
          </div>
          <div className="flex items-center" style={{ gap: 24, animation: "vpFadeUp 0.9s ease forwards 1.4s", opacity: 0 }}>
            {[{ val: "99.4%", label: "Avg Purity" }, { val: "48hr", label: "Fulfillment" }, { val: "USA", label: "Manufactured" }, { val: "COA", label: "Every Batch" }].map((s, i, arr) => (
              <div key={s.label} className="flex items-center" style={{ gap: 24 }}>
                <div>
                  <p style={{ fontFamily: "'Cinzel', 'Georgia', serif", fontWeight: 900, fontSize: 18, letterSpacing: "0.05em", background: `linear-gradient(135deg, ${SILVER_L}, ${SILVER})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.val}</p>
                  <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.label}</p>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.15)" }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[6]" style={{ height: 58, background: "rgba(255,255,255,0.02)", borderTop: `1px solid rgba(192,192,192,0.14)` }} />
        <div className="absolute inset-0 z-[7] pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(5,5,5,0.65) 100%)" }} />
      </section>

      <style>{`
        @keyframes vpScanline {
          0%   { left: -2%; opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.3; }
          100% { left: 102%; opacity: 0; }
        }
        @keyframes vpFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.7); }
        }
        @keyframes vpFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes vpFloat2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}