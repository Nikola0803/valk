/**
 * useProducts - fetches products from WooCommerce REST API.
 * Falls back to the local mock data if VITE_WC_URL is not configured
 * (useful for local dev without a WP instance running).
 */

import { useState, useEffect } from "react";
import { getAllProducts, normalizeProduct, type NormalizedProduct } from "@/lib/woocommerce";
import { allProducts as mockProducts } from "@/mocks/products";

interface UseProductsResult {
  products: NormalizedProduct[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const WC_CONFIGURED = !!(
  import.meta.env.VITE_WC_URL &&
  import.meta.env.VITE_WC_KEY &&
  import.meta.env.VITE_WC_SECRET
);

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      if (!WC_CONFIGURED) {
        // Dev fallback - run mocks through normalizeProduct so extractContent
        // runs and the content field is populated correctly.
        const normalized = mockProducts.map((p) =>
          normalizeProduct({
            id: p.id,
            slug: p.slug,
            name: p.name,
            permalink: "",
            status: "publish",
            description: "",
            short_description: "",
            sku: "",
            price: String(p.price),
            regular_price: String(p.price),
            sale_price: "",
            on_sale: false,
            featured: false,
            stock_status: p.inStock ? "instock" : "outofstock",
            stock_quantity: null,
            categories: [{ id: 0, name: p.category, slug: p.category.toLowerCase() }],
            images: [{ id: 0, src: p.image, alt: p.name }],
            attributes: [],
            meta_data: [],
          })
        );
        if (!cancelled) {
          setProducts(normalized);
          setLoading(false);
        }
        return;
      }

      try {
        const wc = await getAllProducts();
        if (!cancelled) {
          setProducts(wc.map(normalizeProduct));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [tick]);

  return {
    products,
    loading,
    error,
    refetch: () => setTick((t) => t + 1),
  };
}
