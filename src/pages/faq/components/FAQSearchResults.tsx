import type { FAQItem } from "@/pages/faq/faqData";

type SearchResult = FAQItem & { catLabel: string };

interface FAQSearchResultsProps {
  search: string;
  results: SearchResult[];
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}

export default function FAQSearchResults({ search, results, openIndex, setOpenIndex }: FAQSearchResultsProps) {
  return (
    <div className="py-12 px-8">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-6">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
        </p>
        {results.length === 0 ? (
          <div className="text-center py-16" style={{ border: "1px solid #e0e0e0", background: "#fff" }}>
            <p className="text-[#aaa] text-sm font-semibold uppercase tracking-widest">No results found</p>
            <p className="text-[#bbb] text-xs mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="divide-y" style={{ border: "1px solid #e0e0e0", background: "#fff" }}>
            {results.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer px-8 py-5"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#aaa] mr-3">{item.catLabel}</span>
                    <p className="text-[#111] font-bold text-sm mt-1">{item.q}</p>
                  </div>
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: openIndex === i ? "#111" : "#ebebeb" }}>
                    <i className={`text-sm ${openIndex === i ? "ri-subtract-line text-white" : "ri-add-line text-[#555]"}`}></i>
                  </div>
                </div>
                {openIndex === i && (
                  <p className="text-[#666] text-sm leading-relaxed mt-4 pr-12">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
