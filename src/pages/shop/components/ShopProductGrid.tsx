import { Link } from "react-router-dom";
import type { NormalizedProduct } from "@/lib/woocommerce";

interface ShopProductGridProps {
  loading: boolean;
  error: string | null;
  refetch: () => void;
  filtered: NormalizedProduct[];
  added: number | null;
  onAdd: (product: NormalizedProduct) => void;
  onWaitlist: (productName: string) => void;
}

export default function ShopProductGrid({
  loading, error, refetch, filtered, added, onAdd, onWaitlist,
}: ShopProductGridProps) {
  return (
    <>
      {/* Loading skeleton */}
      {loading && (
        <div className="max-w-[1320px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-6 animate-pulse">
                <div className="bg-[#f0ede8] h-[300px] mb-6" />
                <div className="h-3 bg-[#eee] rounded mb-2 w-1/3" />
                <div className="h-4 bg-[#eee] rounded mb-4 w-3/4" />
                <div className="h-6 bg-[#eee] rounded mb-6 w-1/2" />
                <div className="h-12 bg-[#eee] rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="max-w-[1320px] mx-auto px-8 py-24 text-center">
          <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4">Failed to load products</p>
          <p className="text-[#888] text-xs mb-8 max-w-md mx-auto">{error}</p>
          <button
            onClick={refetch}
            className="font-black uppercase tracking-widest text-[11px] px-8 py-4 cursor-pointer"
            style={{ background: "#111", color: "#fff" }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product grid */}
      {!loading && !error && (
        <div className="max-w-[1320px] mx-auto px-8 py-12">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "#e0e0e0" }}
            data-product-shop
          >
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white transition-all duration-300"
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fafafa"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff"; }}
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="relative overflow-hidden block cursor-pointer"
                  style={{ background: "#f0ede8", height: 300 }}
                >
                  {!product.inStock && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.65)" }}>
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5" style={{ background: "#111111", color: "#ffffff" }}>
                        Out of Stock
                      </span>
                    </div>
                  )}
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

                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[#111111] font-black text-2xl">${product.price.toFixed(2)}</span>
                    <span className="text-[#aaa] text-[10px] uppercase tracking-widest">USD</span>
                  </div>

                  {product.inStock ? (
                    <button
                      onClick={() => onAdd(product)}
                      className="w-full font-black uppercase tracking-widest text-[11px] py-4 transition-all duration-200 cursor-pointer whitespace-nowrap"
                      style={{
                        background: added === product.id ? "#16a34a" : "#111111",
                        color: "#ffffff",
                      }}
                    >
                      {added === product.id ? "✓ Added to Cart" : "Add to Cart"}
                    </button>
                  ) : (
                    <button
                      onClick={() => onWaitlist(product.name)}
                      className="w-full font-black uppercase tracking-widest text-[11px] py-4 transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                      style={{ background: "#f5f4f2", color: "#111", border: "1px solid #e0e0e0" }}
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-notification-3-line text-xs"></i>
                      </div>
                      Notify Me When Back
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-24">
              <p className="text-[#aaa] text-sm font-semibold uppercase tracking-widest">No products found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
