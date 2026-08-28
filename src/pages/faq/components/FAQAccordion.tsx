import type { FAQCategory } from "@/pages/faq/faqData";

interface FAQAccordionProps {
  category: FAQCategory;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}

export default function FAQAccordion({ category, openIndex, setOpenIndex }: FAQAccordionProps) {
  return (
    <div className="lg:col-span-3 bg-white">
      {/* Category header */}
      <div className="px-10 py-7" style={{ borderBottom: "1px solid #e8e8e8", background: "#fafafa" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center" style={{ background: "#111" }}>
            <i className={`${category.icon} text-white text-base`}></i>
          </div>
          <div>
            <p className="font-black text-base uppercase tracking-tight text-[#111]">{category.label}</p>
            <p className="text-[#aaa] text-xs">{category.items.length} questions</p>
          </div>
        </div>
      </div>

      <div className="divide-y" style={{ borderColor: "#ebebeb" }}>
        {category.items.map((item, i) => (
          <div
            key={i}
            className="cursor-pointer transition-all duration-200"
            style={{ background: openIndex === i ? "#fffef9" : "transparent" }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex items-center justify-between px-10 py-6 gap-6">
              <span className="text-[#111] font-bold text-sm leading-snug">{item.q}</span>
              <div
                className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: openIndex === i ? "#111" : "#ebebeb" }}
              >
                <i className={`text-sm ${openIndex === i ? "ri-subtract-line text-white" : "ri-add-line text-[#555]"}`}></i>
              </div>
            </div>
            {openIndex === i && (
              <div className="px-10 pb-8">
                <p className="text-[#666] text-sm leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
