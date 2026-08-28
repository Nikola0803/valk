import { useState, useEffect, useRef } from "react";
import type { COAEntry } from "@/pages/coa/coaData";
import { categoryColors } from "@/pages/coa/coaData";

function useScrollReveal(threshold = 0.05) {
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

interface COAGridProps {
  filtered: COAEntry[];
  visibleCards: Set<number>;
  search: string;
  onClearFilters: () => void;
  onOpenDoc: (url: string, title: string) => void;
}

export default function COAGrid({ filtered, visibleCards, search, onClearFilters, onOpenDoc }: COAGridProps) {
  const { ref } = useScrollReveal(0.05);

  return (
    <div ref={ref} className="px-8 pb-24 bg-white">
      <div className="max-w-[1320px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-5 rounded-full" style={{ background: "#f5f5f5" }}>
              <i className="ri-search-line text-[#ccc] text-2xl"></i>
            </div>
            <p className="text-[#999] text-sm font-semibold">No results found for &ldquo;{search}&rdquo;</p>
            <button
              onClick={onClearFilters}
              className="mt-4 text-xs font-bold text-[#111] underline underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((entry, i) => {
              const hasCoa = entry.coaUrl !== null;
              const hasEndotoxin = entry.endotoxinUrl !== null && entry.endotoxinUrl !== entry.coaUrl;
              const hasAnyDoc = hasCoa || hasEndotoxin;
              const catColor = categoryColors[entry.category] || "#666";

              return (
                <div
                  key={`${entry.name}-${entry.dose}`}
                  className="group flex flex-col rounded-xl overflow-hidden cursor-default"
                  style={{
                    border: "1.5px solid #eaeaea",
                    background: "#fff",
                    opacity: visibleCards.has(i) ? 1 : 0,
                    transform: visibleCards.has(i) ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#d0d0d0";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#eaeaea";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex">
                    <div className="shrink-0" style={{ width: 4, background: catColor }} />
                    <div className="flex-1 flex flex-col p-5">
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full"
                          style={{ background: `${catColor}10`, color: catColor }}
                        >
                          {entry.category}
                        </span>
                        {hasAnyDoc ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: "#1a7a4a" }}></div>
                            <span className="text-[10px] font-bold text-[#1a7a4a] uppercase tracking-[0.1em]">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: "#ddd" }}></div>
                            <span className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.1em]">Pending</span>
                          </div>
                        )}
                      </div>

                      {/* Name + dose */}
                      <div className="mb-1">
                        <h3 className="text-lg font-black text-[#111] leading-tight tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                          {entry.name}
                        </h3>
                        <p className="text-xs text-[#aaa] font-semibold mt-1 tracking-wide">{entry.dose}</p>
                      </div>

                      <div className="my-4" style={{ height: 1, background: "#f0f0f0" }} />

                      {/* Lab + date */}
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <p className="text-[9px] text-[#ccc] uppercase tracking-[0.2em] font-bold">Lab</p>
                          <p className="text-[11px] text-[#555] font-semibold mt-0.5">{entry.labName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-[#ccc] uppercase tracking-[0.2em] font-bold">Tested</p>
                          <p className="text-[11px] text-[#555] font-semibold mt-0.5">{entry.testDate}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      {hasAnyDoc ? (
                        <div className="flex flex-col gap-2">
                          {hasCoa && (
                            <button
                              onClick={() => onOpenDoc(entry.coaUrl!, `${entry.name} (${entry.dose}) - Purity`)}
                              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer"
                              style={{ background: "#111", color: "#fff" }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#333"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "#111"; }}
                            >
                              <i className="ri-file-text-line text-sm"></i>
                              {hasEndotoxin ? "Purity COA" : "View Certificate"}
                            </button>
                          )}
                          {hasEndotoxin && (
                            <button
                              onClick={() => onOpenDoc(entry.endotoxinUrl!, `${entry.name} (${entry.dose}) - Endotoxin`)}
                              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer"
                              style={{ background: "#fff", color: "#111", border: "1.5px solid #ddd" }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ddd"; }}
                            >
                              <i className="ri-test-tube-line text-sm"></i>
                              Endotoxin COA
                            </button>
                          )}
                        </div>
                      ) : (
                        <div
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em]"
                          style={{ background: "#f7f7f7", color: "#ccc", border: "1.5px dashed #e5e5e5" }}
                        >
                          <i className="ri-time-line text-sm"></i>
                          COA Pending
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
