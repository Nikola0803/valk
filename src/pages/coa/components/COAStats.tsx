import { useState, useEffect, useRef } from "react";

function useScrollReveal(threshold = 0.1) {
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

interface COAStatsProps {
  totalProducts: number;
  coasAvailable: number;
  uniqueLabs: number;
}

export default function COAStats({ totalProducts, coasAvailable, uniqueLabs }: COAStatsProps) {
  const { ref, visible } = useScrollReveal(0.1);

  const stats = [
    { label: "Products Tested", value: totalProducts.toString() },
    { label: "COAs Available", value: coasAvailable.toString() },
    { label: "Independent Labs", value: uniqueLabs.toString() },
  ];

  return (
    <div ref={ref} className="border-b" style={{ borderColor: "#eaeaea", background: "#fafafa" }}>
      <div className="max-w-[1320px] mx-auto px-8 md:px-16">
        <div
          className="flex items-center justify-center gap-0 py-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          {stats.map((stat, i, arr) => (
            <div key={i} className="flex items-center">
              <div className="px-8 md:px-12 text-center">
                <p className="text-2xl md:text-3xl font-black text-[#111] leading-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#aaa] mt-1.5">
                  {stat.label}
                </p>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8" style={{ background: "#ddd" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
