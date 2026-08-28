const qualifies = [
  {
    icon: "ri-shield-star-line",
    title: "Active Duty Military",
    desc: "All branches of the U.S. Armed Forces - Army, Navy, Air Force, Marines, Coast Guard, Space Force.",
  },
  {
    icon: "ri-medal-line",
    title: "Veterans",
    desc: "All honorably discharged service members who have served our nation with distinction.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "First Responders",
    desc: "Police officers, firefighters, EMTs, paramedics, and emergency dispatch personnel.",
  },
];

export default function VeteransEligibility() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8" style={{ background: "#f8f7f5" }}>
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-8 md:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Eligibility</p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(26px, 3vw, 44px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            WHO QUALIFIES FOR OUR 20% DISCOUNT?
          </h2>
          <p className="text-[#777] text-sm leading-relaxed mt-3 max-w-2xl">
            We&apos;re honored to extend this exclusive lifetime discount to those who have dedicated their lives to protecting and serving our nation and communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
          {qualifies.map((item) => (
            <div key={item.title} className="flex items-start gap-5 p-6 md:p-8 bg-white">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                <i className={`${item.icon} text-white text-xl`}></i>
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight text-[#111] mb-2">{item.title}</h3>
                <p className="text-[#777] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
