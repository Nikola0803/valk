export default function OrderPageHero() {
  return (
    <div className="w-full py-10 md:py-12 px-4 md:px-8" style={{ background: "#111111" }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Warrior Distributions</p>
        <h1
          className="font-black uppercase tracking-tight leading-none"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          COMPLETE YOUR ORDER
        </h1>
      </div>
    </div>
  );
}
