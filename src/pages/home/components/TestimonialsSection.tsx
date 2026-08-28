const reviews = [
  {
    id: 1,
    name: "Jon",
    headline: "Fast shipping and product is exactly as...",
    stars: 5,
    text: "Fast shipping and product is exactly as advertised with better than expected quality! Thank you Warrior!",
    date: "April 16, 2026",
    source: "Unprompted review",
    initials: "J",
  },
  {
    id: 2,
    name: "Kris Bryan",
    headline: "Warrior peptides came through with...",
    stars: 5,
    text: "Warrior peptides came through with quality product and was received within days of order. Thanks Warrior for a great product!",
    date: "April 18, 2026",
    source: "Unprompted review",
    initials: "KB",
  },
  {
    id: 3,
    name: "Jacob Parker",
    headline: "The team at Warrior took care of my needs...",
    stars: 5,
    text: "The team at Warrior took care of my needs immediately and at both a great price point and on time delivery! A provider of goods that I will keep using!",
    date: "April 8, 2026",
    source: "Unprompted review",
    initials: "JP",
  },
];

export default function TestimonialsSection() {
  return (
    <section style={{ background: "#f8f7f5" }} className="py-28 px-8">
      <div className="max-w-[1320px] mx-auto">

        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">Verified Reviews</p>
            <h2 className="font-black uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              TRUSTED BY<br />
              <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>RESEARCHERS</span>
            </h2>
          </div>
          {/* Aggregate score */}
          <div className="lg:text-right">
            <div className="inline-flex items-center gap-6 p-6" style={{ background: "#ffffff", border: "1px solid #e0e0e0" }}>
              <div>
                <div className="flex gap-0.5 mb-1.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-star-fill text-[#00b67a] text-base"></i>
                    </div>
                  ))}
                </div>
                <p className="text-[#111] font-black text-3xl leading-none">5.0</p>
                <p className="text-[#aaa] text-xs mt-1 uppercase tracking-widest">Trustpilot</p>
              </div>
              <div style={{ borderLeft: "1px solid #e0e0e0", paddingLeft: 24 }}>
                <p className="text-[#111] font-black text-3xl leading-none">200+</p>
                <p className="text-[#aaa] text-xs mt-1 uppercase tracking-widest">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-4 p-8 transition-all duration-200"
              style={{ background: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fafafa"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff"; }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <div key={i} className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-fill text-[#00b67a] text-sm"></i>
                  </div>
                ))}
              </div>

              {/* Headline */}
              <p className="text-[#111] font-bold text-sm">{review.headline}</p>

              {/* Quote */}
              <p className="text-[#444] text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid #ebebeb" }}>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 font-black text-xs text-white" style={{ background: "#111111" }}>
                  {review.initials}
                </div>
                <div>
                  <p className="text-[#111] font-bold text-sm">{review.name}</p>
                  <p className="text-[#aaa] text-xs">{review.source} &middot; {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
