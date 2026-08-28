import { Link } from "react-router-dom";
import type { FAQCategory } from "@/pages/faq/faqData";

interface FAQSidebarProps {
  categories: FAQCategory[];
  activeCategory: number;
  setActiveCategory: (i: number) => void;
  setOpenIndex: (i: number | null) => void;
}

export default function FAQSidebar({ categories, activeCategory, setActiveCategory, setOpenIndex }: FAQSidebarProps) {
  return (
    <div className="bg-white p-8 flex flex-col gap-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-4">Categories</p>
      {categories.map((cat, i) => (
        <button
          key={cat.label}
          onClick={() => { setActiveCategory(i); setOpenIndex(null); }}
          className="flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 cursor-pointer w-full"
          style={{
            background: activeCategory === i ? "#111" : "transparent",
            color: activeCategory === i ? "#fff" : "#555",
          }}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <i className={`${cat.icon} text-sm`}></i>
          </div>
          <span className="text-xs font-bold uppercase tracking-wide whitespace-nowrap">{cat.label}</span>
          <span className="ml-auto text-[10px] font-semibold opacity-60">{cat.items.length}</span>
        </button>
      ))}

      {/* Still have questions? */}
      <div className="mt-8 p-5" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
        <p className="text-[#111] font-bold text-sm mb-2">Still have questions?</p>
        <p className="text-[#888] text-xs leading-relaxed mb-4">Our team is available 7 days a week to help.</p>
        <Link
          to="/contact"
          className="block text-center text-[11px] font-black uppercase tracking-widest py-3 cursor-pointer whitespace-nowrap transition-colors"
          style={{ background: "#111", color: "#fff" }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
