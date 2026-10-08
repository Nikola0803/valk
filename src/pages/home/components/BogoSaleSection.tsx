import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useCountdown } from "@/hooks/useCountdown";
import { useBogoStatus, BOGO_CATEGORY } from "@/lib/bogo";
import type { NormalizedProduct } from "@/lib/woocommerce";

const HOMEPAGE_DISPLAY_LIMIT = 6;

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
 * The homepage's "Buy 2 Get 1 Free" promo section - a separate, standalone
 * deal from the GLP sale (see lib/sale.ts) run alongside it. Not gated on
 * any product's on_sale flag - BOGO applies to every qualifying (Peptides)
 * product at its normal price, the deal is in the quantity, not a price
 * cut - so every in-stock Peptides product is eligible to show here.
 *
 * Driven entirely by the admin-controlled promo status (see lib/bogo.ts) -
 * renders nothing whenever it's off/outside its scheduled window, no
 * hardcoded dates to keep in sync.
 */
export default function BogoSaleSection() {
  const [added, setAdded] = useState<number | null>(null);
  const { addItem } = useCart();
  const { products, loading } = useProducts();
  const bogoStatus = useBogoStatus();

  const end = bogoStatus?.end ? new Date(bogoStatus.end) : null;
  const countdown = useCountdown(end ?? new Date());

  const allEligible = products.filter((p) => p.category === BOGO_CATEGORY && p.inStock);
  const eligible = allEligible.slice(0, HOMEPAGE_DISPLAY_LIMIT);

  const handleAdd = (product: NormalizedProduct) => {
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, category: product.category });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  };

  if (!bogoStatus?.active || !end || countdown.expired) return null;
  if (!loading && eligible.length === 0) return null;

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
              BUY 2 GET 1<br />
              <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>FREE</span>
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mt-4 max-w-sm">
              Buy 2 of the same peptide, get the 3rd FREE — every peptide qualifies, for a limited time only.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">Deal ends in</span>
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
          {eligible.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white transition-all duration-300"
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fafafa"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff"; }}
            >
              <Link to={`/products/${product.slug}`} className="relative overflow-hidden block" style={{ background: "#f0ede8", height: 300 }}>
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 flex items-center gap-1" style={{ background: "#dc2626", color: "#fff" }}>
                    <i className="ri-gift-line"></i> Buy 2 Get 1 Free
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700"
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
                  <span className="text-[#888] text-xs font-semibold">buy 3, pay for 2</span>
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

        {!loading && allEligible.length > HOMEPAGE_DISPLAY_LIMIT && (
          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-xs cursor-pointer whitespace-nowrap transition-all duration-200"
              style={{ background: "#111111", color: "#ffffff", padding: "15px 32px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#111111"; }}
            >
              Shop All {allEligible.length} Deals
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
