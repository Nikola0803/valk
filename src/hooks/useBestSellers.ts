import { useEffect, useState } from "react";
import { getBestSellingProducts, normalizeProduct, type NormalizedProduct } from "@/lib/woocommerce";
import { useProducts } from "@/hooks/useProducts";

const WC_CONFIGURED = !!(
  import.meta.env.VITE_WC_URL &&
  import.meta.env.VITE_WC_KEY &&
  import.meta.env.VITE_WC_SECRET
);

let cached: NormalizedProduct[] | null = null;

/**
 * Top-selling products, for cart upsell rails. Backed by WooCommerce's own
 * popularity ranking (total_sales) when configured; falls back to the first
 * N products from the regular catalog (mock data in local dev, or if the
 * popularity fetch hasn't resolved yet) so the rail is never empty.
 */
export function useBestSellers(limit = 8) {
  const { products: catalog } = useProducts();
  const [bestSellers, setBestSellers] = useState<NormalizedProduct[]>(cached ?? []);

  useEffect(() => {
    if (cached || !WC_CONFIGURED) return;
    let cancelled = false;
    getBestSellingProducts(limit)
      .then((raw) => {
        if (cancelled) return;
        const normalized = raw.map(normalizeProduct);
        cached = normalized;
        setBestSellers(normalized);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [limit]);

  const effective = bestSellers.length > 0 ? bestSellers : catalog.slice(0, limit);
  return { bestSellers: effective };
}
