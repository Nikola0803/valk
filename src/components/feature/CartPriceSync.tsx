import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";

/**
 * Keeps cart item prices in sync with the live product catalog. Mounted
 * once at the app root (inside CartProvider) so it runs on every page,
 * including the cart drawer and checkout, which otherwise only ever show
 * whatever price was current when each item was added - see
 * syncPrices() in useCart.tsx for why that goes stale.
 */
export default function CartPriceSync() {
  const { products, loading } = useProducts();
  const { syncPrices } = useCart();

  useEffect(() => {
    if (loading || products.length === 0) return;
    syncPrices(products.map((p) => ({ id: p.id, price: p.price })));
  }, [products, loading, syncPrices]);

  return null;
}
