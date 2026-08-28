import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import type { NormalizedProduct } from "@/lib/woocommerce";

export default function BestSellers() {
  const [added, setAdded] = useState<number | null>(null);
  const { addItem } = useCart();
  const { products, loading } = useProducts();

  // Top 4 in-stock products - WC menu_order controls ranking
  const bestSellers = products.filter((p) => p.inStock).slice(0, 4);

  const handleAdd = (product: NormalizedProduct) => {
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <section id="shop" style={{ background: "#f8f7f5" }} className="py-28 px-8">
      <div className="max-w-[1320px] mx-auto">

        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">Best Sellers</p>
            <h2 className="font-black uppercase leading-[0.88] tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              TOP RESEARCH<br />
              <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>PEPTIDES</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-[#888] text-sm leading-relaxed max-w-sm lg:ml-auto mb-5">
              Every product independently verified for purity, identity, and composition by certified US laboratories.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 text-[#111] text-sm font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap group hover:gap-4 transition-all duration-200">
              View All Products
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }}>
            {Array.from({ length: 4 }).map((_, i) => (
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
        {!loading && bestSellers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }} data-product-shop>
          {bestSellers.map((product, idx) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white transition-all duration-300 cursor-pointer"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#fafafa";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#ffffff";
              }}
            >
              {/* Image */}
              <Link to={`/products/${product.slug}`} className="relative overflow-hidden block" style={{ background: "#f0ede8", height: 300 }}>
                {idx === 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5" style={{ background: "#111111", color: "#ffffff" }}>
                      #1 Best Seller
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1" style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }}>
                    Limited
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700 p-6"
                  style={{ mixBlendMode: "multiply" }}
                />
              </Link>

              {/* Info */}
              <div className="flex flex-col flex-1 p-6" style={{ borderTop: "1px solid #ebebeb" }}>
                <Link to={`/products/${product.slug}`} className="block mb-3 cursor-pointer">
                  <p className="text-[#bbb] text-[9px] uppercase tracking-[0.25em] mb-2">{product.category}</p>
                  <h3 className="text-[#111111] font-black text-sm leading-snug uppercase tracking-tight hover:text-[#555] transition-colors">{product.name}</h3>
                </Link>

                {/* Purity */}
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

        {/* Bottom strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }}>
          {[
            { icon: "ri-shield-check-line", label: "3rd Party Lab Tested", color: "#16a34a" },
            { icon: "ri-truck-line", label: "Ships 1–2 Business Days", color: "#111" },
            { icon: "ri-map-pin-line", label: "Made in the USA", color: "#111" },
            { icon: "ri-lock-2-line", label: "Secure Checkout", color: "#111" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 py-5 bg-white">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-base`} style={{ color: item.color }}></i>
              </div>
              <span className="text-[#444] text-xs font-bold uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
