import { useState, useEffect, useRef } from "react";

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function COAHero() {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col justify-end"
      style={{ background: "#0a0a0a", minHeight: 480 }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
      />
      <img
        src="https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?w=1600&h=500&fit=crop&auto=format"
        alt="Warrior Lab Testing"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.4) 100%)" }} />
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-8 md:px-16 pb-16 pt-24">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/30 mb-5">
            Warrior Distributions
          </p>
          <h1
            className="font-black uppercase leading-[0.9] tracking-tight mb-6"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(48px, 7vw, 96px)",
              background: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 25%, #a0a0a0 50%, #d0d0d0 75%, #909090 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CERTIFICATES<br />
            <span style={{
              background: "linear-gradient(135deg, #a0a0a0 0%, #d8d8d8 25%, #808080 50%, #c0c0c0 75%, #707070 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              OF ANALYSIS
            </span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-[520px] tracking-wide">
            Every batch independently verified by certified third-party laboratories. Full documentation publicly available for complete transparency.
          </p>
        </div>
      </div>
    </div>
  );
}
