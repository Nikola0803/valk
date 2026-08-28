import type { NormalizedProduct } from "@/lib/woocommerce";
import type { WCReview } from "@/lib/woocommerce";
import { productTabs as staticTabData } from "@/data/productTabs";

export type TabKey = "description" | "specs" | "research" | "reviews" | "coa" | "additional";

interface ProductTabBarProps {
  product: NormalizedProduct;
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  reviews: WCReview[];
}

export default function ProductTabBar({ product, activeTab, setActiveTab, reviews }: ProductTabBarProps) {
  const staticTab = staticTabData[product.id];
  const coaImages = product.coaImages?.length ? product.coaImages : (staticTab?.coa ?? []);
  const addInfo   = product.additionalInfo    ? product.additionalInfo : (staticTab?.additionalInfo ?? "");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "specs",       label: "Specifications" },
    { key: "research",    label: "Research Benefits" },
    ...(coaImages.length ? [{ key: "coa"      as TabKey, label: "COA" }] : []),
    ...(addInfo          ? [{ key: "additional" as TabKey, label: "Additional Information" }] : []),
    { key: "reviews", label: `Reviews${reviews.length > 0 ? ` (${reviews.length})` : ""}` },
  ];

  return (
    <section style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="flex items-center gap-0 overflow-x-auto" style={{ borderBottom: "1px solid #e8e8e8" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="whitespace-nowrap px-8 py-5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex-shrink-0"
              style={{
                color: activeTab === tab.key ? "#111" : "#aaa",
                borderBottom: activeTab === tab.key ? "2px solid #111" : "2px solid transparent",
                background: "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
