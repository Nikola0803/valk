import { useState, useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { faqCategories } from "@/pages/faq/faqData";
import FAQPageHero from "@/pages/faq/components/FAQPageHero";
import FAQSidebar from "@/pages/faq/components/FAQSidebar";
import FAQAccordion from "@/pages/faq/components/FAQAccordion";
import FAQSearchResults from "@/pages/faq/components/FAQSearchResults";
import FAQBottomCTA from "@/pages/faq/components/FAQBottomCTA";

export default function FAQPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const currentCategory = faqCategories[activeCategory];

  const filteredItems = search.trim()
    ? faqCategories.flatMap((cat) =>
        cat.items
          .filter(
            (item) =>
              item.q.toLowerCase().includes(search.toLowerCase()) ||
              item.a.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => ({ ...item, catLabel: cat.label }))
      )
    : [];

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <FAQPageHero
          search={search}
          setSearch={setSearch}
          onSearch={() => setOpenIndex(null)}
        />

        {/* Search results */}
        {search.trim() && (
          <FAQSearchResults
            search={search}
            results={filteredItems}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        )}

        {/* Main FAQ layout - only show when not searching */}
        {!search.trim() && (
          <div className="py-16 px-8">
            <div className="max-w-[1320px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }}>
                <FAQSidebar
                  categories={faqCategories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  setOpenIndex={setOpenIndex}
                />
                <FAQAccordion
                  category={currentCategory}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                />
              </div>
            </div>
          </div>
        )}

        <FAQBottomCTA />
        <FooterSection />
      </div>
    </div>
  );
}
