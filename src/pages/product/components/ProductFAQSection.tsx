const productFaqs = [
  { q: "How should I store this peptide?", a: "Store lyophilized peptides in a cool, dry place away from light. Reconstituted peptides should be refrigerated and used within 30 days." },
  { q: "What is the purity level?", a: "All Warrior Distributions peptides are independently 3rd-party tested and verified at 99%+ purity." },
  { q: "Is this for human consumption?", a: "No - these products are for research use only. Not for human or veterinary use." },
  { q: "How long does shipping take?", a: "Orders ship within 1–2 business days from Boise, ID. Most US orders arrive in 3–5 business days." },
];

interface ProductFAQSectionProps {
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}

export default function ProductFAQSection({ openFaq, setOpenFaq }: ProductFAQSectionProps) {
  return (
    <section style={{ background: "#f8f7f5", borderTop: "1px solid #e8e8e8" }} className="py-16 px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">Product FAQ</p>
            <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-4">COMMON<br />QUESTIONS</h2>
            <p className="text-[#888] text-sm leading-relaxed">Have more questions? Our team is available 7 days a week.</p>
            <a href="tel:2082439222" className="inline-flex items-center gap-2 mt-6 font-bold text-sm text-[#111] hover:text-[#555] transition-colors cursor-pointer">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-phone-line text-sm"></i>
              </div>
              (541)-709-5434
            </a>
          </div>
          <div className="lg:col-span-2 divide-y" style={{ borderTop: "1px solid #e0e0e0" }}>
            {productFaqs.map((faq, i) => (
              <div
                key={i}
                className="cursor-pointer py-5"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#111] font-bold text-sm">{faq.q}</span>
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ background: openFaq === i ? "#111" : "#ebebeb" }}>
                    <i className={`text-sm ${openFaq === i ? "ri-subtract-line text-white" : "ri-add-line text-[#555]"}`}></i>
                  </div>
                </div>
                {openFaq === i && (
                  <p className="text-[#666] text-sm leading-relaxed mt-4 pr-12">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
