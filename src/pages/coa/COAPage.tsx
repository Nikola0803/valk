import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { coaEntries as fallbackCoaEntries, coaCategories, fetchCOALibrary, type COAEntry } from "@/pages/coa/coaData";
import COAHero from "@/pages/coa/components/COAHero";
import COAStats from "@/pages/coa/components/COAStats";
import COAFilters from "@/pages/coa/components/COAFilters";
import COAGrid from "@/pages/coa/components/COAGrid";
import COADocumentModal from "@/pages/coa/components/COADocumentModal";
import COAVerifySection from "@/pages/coa/components/COAVerifySection";

export default function COAPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // Starts with the bundled fallback so the page never renders empty, then
  // swaps in the live, admin-editable library the moment it loads - see
  // fetchCOALibrary() in coaData.ts.
  const [coaEntries, setCoaEntries] = useState<COAEntry[]>(fallbackCoaEntries);

  useEffect(() => {
    fetchCOALibrary().then(setCoaEntries);
  }, []);

  const openDoc = (url: string, title: string) => {
    setModalUrl(url);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalUrl(null);
    setModalTitle("");
  };

  // Deep-link: /coa?product=<slug> → auto-open that product's purity COA.
  // Re-runs once the live library replaces the fallback, guarded so it only
  // ever auto-opens once (not every time coaEntries happens to update).
  const deepLinkHandled = useRef(false);
  useEffect(() => {
    if (deepLinkHandled.current) return;
    const productSlug = searchParams.get("product");
    if (!productSlug) return;
    const entry = coaEntries.find((c) => c.productSlug === productSlug);
    if (entry?.coaUrl) {
      openDoc(entry.coaUrl, `${entry.name} (${entry.dose})`);
      deepLinkHandled.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coaEntries]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (modalUrl) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalUrl]);

  const filtered = useMemo(() => {
    let result = coaEntries;
    if (activeCategory !== "All") result = result.filter((c) => c.category === activeCategory);
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.dose.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, search]);

  // Staggered card reveal
  useEffect(() => {
    setVisibleCards(new Set());
    const timer = setTimeout(() => {
      filtered.forEach((_, i) => {
        setTimeout(() => {
          setVisibleCards((prev) => new Set([...prev, i]));
        }, i * 60);
      });
    }, 80);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, search]);

  // Stats
  const totalProducts = coaEntries.length;
  const coasAvailable = coaEntries.filter((c) => c.coaUrl !== null).length;
  const uniqueLabs = new Set(coaEntries.map((c) => c.labName).filter((l) => l !== "N/A")).size;

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <COAHero />
        <COAStats totalProducts={totalProducts} coasAvailable={coasAvailable} uniqueLabs={uniqueLabs} />
        <COAFilters
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={coaCategories}
          filteredCount={filtered.length}
          totalCount={coaEntries.length}
        />
        <COAGrid
          filtered={filtered}
          visibleCards={visibleCards}
          search={search}
          onClearFilters={() => { setSearch(""); setActiveCategory("All"); }}
          onOpenDoc={openDoc}
        />
        <COAVerifySection />
        <FooterSection />
      </div>

      {modalUrl && (
        <COADocumentModal url={modalUrl} title={modalTitle} onClose={closeModal} />
      )}
    </div>
  );
}
