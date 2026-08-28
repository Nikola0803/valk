const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "5K+", label: "Peptides Sold This Year" },
  { value: "99%+", label: "Average Purity Rate" },
  { value: "100%", label: "USA Lyophilized" },
];

export default function AboutStats() {
  return (
    <section style={{ background: "#111111" }} className="py-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#2a2a2a" }}>
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center justify-center py-14 px-6 text-center" style={{ background: "#111111" }}>
              <p
                className="font-black text-white leading-none mb-3"
                style={{ fontSize: "clamp(40px, 5vw, 72px)", fontFamily: "'Oswald', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-white/35 text-[10px] uppercase tracking-[0.25em] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
