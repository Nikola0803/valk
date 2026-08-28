import COALookupTerminal from "@/pages/coa/components/COALookupTerminal";

/** "Know your lot number?" section - sits between the COA hero and the stats bar. */
export default function COAVerifySection() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/30 mb-4">Quick Verification</p>
          <h2
            className="font-black uppercase leading-[0.95] tracking-tight"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              background: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 25%, #a0a0a0 50%, #d0d0d0 75%, #909090 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Know Your Lot Number?
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-[440px] mx-auto mt-4">
            Type the lot/batch code printed on your label and pull its exact lab result - no scrolling through the full archive.
          </p>
        </div>
        <COALookupTerminal />
      </div>
    </div>
  );
}
