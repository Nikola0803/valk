export default function ShopHero() {
  return (
    <>
      {/* Announcement Banner */}
      <div className="w-full py-3 px-8 text-center" style={{ background: "#7c3aed" }}>
        <p className="text-white text-xs font-black uppercase tracking-[0.25em]">
          ✦ New products being added weekly - check back! ✦
        </p>
      </div>

      {/* Page header */}
      <div className="w-full py-16 px-8" style={{ background: "#111111" }}>
        <div className="max-w-[1320px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">
            Warrior Distributions
          </p>
          <h1
            className="font-black uppercase tracking-tight leading-none"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 72px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 30%, #606060 55%, #aaa 75%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            SHOP ALL<br />
            <span style={{ background: "linear-gradient(135deg, #707070 0%, #b0b0b0 30%, #484848 55%, #999 75%, #606060 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
              PEPTIDES
            </span>
          </h1>
          <p className="text-white/45 text-sm mt-5 max-w-lg leading-relaxed">
            Research-grade peptides lyophilized and verified in the USA. Every product 3rd-party tested for purity, identity, and composition.
          </p>
        </div>
      </div>
    </>
  );
}
