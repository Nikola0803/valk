import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import WaitlistModal from "@/components/feature/WaitlistModal";
import type { NormalizedProduct } from "@/lib/woocommerce";
import ShopHero from "@/pages/shop/components/ShopHero";
import GpSaleBanner from "@/pages/shop/components/GpSaleBanner";
import ShopToolbar from "@/pages/shop/components/ShopToolbar";
import ShopProductGrid from "@/pages/shop/components/ShopProductGrid";
import ShopTrustStrip from "@/pages/shop/components/ShopTrustStrip";
import { trackViewItemList } from "@/lib/analytics";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function ShopPage() {
  const [sort, setSort] = useState<SortOption>("default");
  const [filter, setFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");
  const [added, setAdded] = useState<number | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [waitlistProduct, setWaitlistProduct] = useState<string | null>(null);
  const { addItem } = useCart();
  const { products, loading, error, refetch } = useProducts();

  const handleAdd = (product: NormalizedProduct) => {
    if (!product.inStock) return;
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  };

  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  const filtered = useMemo(() => {
    let list = [...products];
    if (filter === "in-stock") list = list.filter((p) => p.inStock);
    if (filter === "out-of-stock") list = list.filter((p) => !p.inStock);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [sort, filter, products]);

  // Fire once per meaningful list change (not on every render) - loading finished
  // and we actually have a list to report.
  useEffect(() => {
    if (!loading && !error && filtered.length > 0) trackViewItemList(filtered, "Shop");
  }, [loading, error, filtered]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main style={{ paddingTop: 64 }}>
        <ShopHero />
        <GpSaleBanner />
        <ShopToolbar
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
          totalCount={products.length}
          inStockCount={inStockCount}
          outOfStockCount={outOfStockCount}
          filteredCount={filtered.length}
          loading={loading}
          error={error}
          refetch={refetch}
        />
        <ShopProductGrid
          loading={loading}
          error={error}
          refetch={refetch}
          filtered={filtered}
          added={added}
          onAdd={handleAdd}
          onWaitlist={setWaitlistProduct}
        />
        <ShopTrustStrip />
      </main>

      {waitlistProduct && (
        <WaitlistModal
          productName={waitlistProduct}
          onClose={() => setWaitlistProduct(null)}
        />
      )}
      <FooterSection />
    </div>
  );
}
