import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useCountdown } from "@/hooks/useCountdown";
import { GP_SALE_END, GP_SALE_DISCOUNT_PERCENT } from "@/lib/sale";
import type { NormalizedProduct } from "@/lib/woocommerce";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-black text-2xl md:text-3xl tabular-nums text-[#111] leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-[#aaa] mt-1">{label}</span>
    </div>
  );
}

/**
 * The GP line sale (formerly GLP-1/2/3, now GP-1/2/3 + Cagrilinitide) - the 6
 * WooCommerce-"Featured" products, whichever they are at any given time (the
 * merchant toggles Featured in wp-admin, this section just reflects it).
 * Renders nothing once GP_SALE_END passes or if fewer than 1 featured product
 * is on sale - no stale "expired sale" banner left on the homepage.
 *
 * Styling mirrors BestSellers.tsx (light background, white cards, product
 * images on a light #f0ede8 tile) - product photos use mix-blend-mode:
 * multiply to drop their white background into the page, which only reads
 * correctly against a LIGHT tile. Putting these on a dark card renders them
 * as near-black blobs - don't reintroduce a dark theme here.
 */
export default function GpSaleSection() {
  const [added, setAdded] = useState<number | null>(null);
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  const countdown = useCountdown(GP_SALE_END);

  const saleItems = products.filter((p) => p.featured && p.onSale);

  const handleAdd = (product: NormalizedProduct) => {
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  };

  if (countdown.expired) return null;
  if (!loading && saleItems.length === 0) return null;

  return (
    <section style={{ background: "#f8f7f5" }} className="py-24 md:py-28 px-8">
      <div className="max-w-[1320px] mx-auto">

        {/* Header + countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <span className="inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1.5 mb-4" style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }}>
              Limited Time
            </span>
            <h2 className="font-black uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {GP_SALE_DISCOUNT_PERCENT}% OFF<br />
              <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>THE GP LINE</span>
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mt-4 max-w-sm">
              GP-1, GP-2, GP-3, and Cagrilinitide — for a limited time only.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">Sale ends in</span>
            <div className="flex items-center gap-4 md:gap-6">
              <CountdownUnit value={countdown.days} label="Days" />
              <span className="text-[#ddd] text-2xl font-black -mt-4">:</span>
              <CountdownUnit value={countdown.hours} label="Hrs" />
              <span className="text-[#ddd] text-2xl font-black -mt-4">:</span>
              <CountdownUnit value={countdown.minutes} label="Min" />
              <span className="text-[#ddd] text-2xl font-black -mt-4">:</span>
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 animate-pulse">
                <div className="bg-[#f0ede8] h-[300px] mb-6" />
                <div className="h-3 bg-[#eee] rounded mb-2 w-1/3" />
                <div className="h-4 bg-[#eee] rounded mb-4 w-3/4" />
                <div className="h-6 bg-[#eee] rounded mb-6 w-1/2" />
                <div className="h-12 bg-[#eee] rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Product grid */}
        {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }} data-product-shop>
          {saleItems.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white transition-all duration-300"
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fafafa"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff"; }}
            >
              <Link to={`/products/${product.slug}`} className="relative overflow-hidden block" style={{ background: "#f0ede8", height: 300 }}>
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5" style={{ background: "#dc2626", color: "#fff" }}>
                    {GP_SALE_DISCOUNT_PERCENT}% Off
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700 p-6"
                  style={{ mixBlendMode: "multiply" }}
                />
              </Link>

              <div className="flex flex-col flex-1 p-6" style={{ borderTop: "1px solid #ebebeb" }}>
                <Link to={`/products/${product.slug}`} className="block mb-3 cursor-pointer">
                  <p className="text-[#bbb] text-[9px] uppercase tracking-[0.25em] mb-2">{product.category}</p>
                  <h3 className="text-[#111111] font-black text-sm leading-snug uppercase tracking-tight hover:text-[#555] transition-colors">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-1.5 mb-5">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-shield-check-fill text-green-600 text-xs"></i>
                  </div>
                  <span className="text-[10px] text-green-700 font-semibold">99%+ Purity Verified</span>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[#111111] font-black text-2xl">${product.price.toFixed(2)}</span>
                  <span className="text-[#bbb] text-sm line-through">${product.originalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className="w-full font-black uppercase tracking-widest text-[11px] py-4 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={{
                    background: added === product.id ? "#16a34a" : "#111111",
                    color: "#ffffff",
                  }}
                >
                  {added === product.id ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
