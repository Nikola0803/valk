/**
 * useProducts - fetches products from WooCommerce REST API.
 * Falls back to the local mock data if VITE_WC_URL is not configured
 * (useful for local dev without a WP instance running).
 *
 * Module-level cache + shared in-flight promise, same pattern as
 * lib/bogo.ts / lib/sale.ts / coaData.ts - every component that wants the
 * product catalog (home page alone mounts 4+ of them: GpSaleSection,
 * GlpSaleSection, BogoSaleSection, BestSellers) shares ONE fetch instead of
 * each independently re-paginating the entire WooCommerce catalog. Before
 * this, a single homepage load fired that many full, uncached REST round
 * trips in parallel - the main cause of the site feeling slow.
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

let cachedProducts: NormalizedProduct[] | null = null;
let inflight: Promise<NormalizedProduct[]> | null = null;

async function fetchAndNormalize(): Promise<NormalizedProduct[]> {
  if (!WC_CONFIGURED) {
    // Dev fallback - run mocks through normalizeProduct so extractContent
    // runs and the content field is populated correctly.
    return mockProducts.map((p) =>
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
  }

  const wc = await getAllProducts();
  return wc.map(normalizeProduct);
}

/** Forces a fresh fetch, bypassing the cache - used by refetch() below. */
function load(force: boolean): Promise<NormalizedProduct[]> {
  if (!force && cachedProducts) return Promise.resolve(cachedProducts);
  if (!inflight || force) {
    inflight = fetchAndNormalize()
      .then((result) => { cachedProducts = result; return result; })
      .finally(() => { inflight = null; });
  }
  return inflight;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<NormalizedProduct[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    load(tick > 0)
      .then((result) => {
        if (!cancelled) {
          setProducts(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError((err as Error).message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [tick]);

  return {
    products,
    loading,
    error,
    refetch: () => setTick((t) => t + 1),
  };
}
