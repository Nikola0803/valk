import type { NormalizedProduct } from "@/lib/woocommerce";

const BEST_SELLER_SLUGS = new Set([
  "wolverine-20mg",
  "tesamorelin-10mg",
  "glp-3-rt-30mg",
  "bpc-157-10mg",
]);

interface ProductGalleryProps {
  product: NormalizedProduct;
  selectedImage: number;
  setSelectedImage: (i: number) => void;
  slug: string;
  savingsPct: number;
}

export default function ProductGallery({ product, selectedImage, slug, savingsPct }: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ background: "#f0ede8", height: 520, border: "1px solid #e8e8e8" }}
      >
        <img
          src={product.images[selectedImage] ?? product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center p-10 transition-opacity duration-300"
          style={{ mixBlendMode: "multiply" }}
        />
        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {BEST_SELLER_SLUGS.has(slug) && (
            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5" style={{ background: "#111111", color: "#ffffff" }}>
              #1 Best Seller
            </span>
          )}
          {savingsPct > 0 && (
            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5" style={{ background: "#dc2626", color: "#ffffff" }}>
              Save {savingsPct}%
            </span>
          )}
        </div>
        {/* USA flag */}
        <div className="absolute top-5 right-5 flex flex-col items-center gap-1 p-3" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e0e0e0" }}>
          <span className="text-2xl">🇺🇸</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-[#111] text-center leading-tight">MADE IN<br />USA</span>
        </div>
      </div>

      {/* Trust strip */}
      <div className="grid grid-cols-2 gap-px mt-2" style={{ background: "#e0e0e0" }}>
        {[
          { icon: "ri-shield-check-line", label: "3rd Party Tested", color: "#16a34a" },
          { icon: "ri-flask-line",         label: "99%+ Purity",      color: "#111" },
          { icon: "ri-map-pin-line",        label: "Made in USA",      color: "#111" },
          { icon: "ri-lock-2-line",         label: "Secure Checkout",  color: "#111" },
        ].map((badge) => (
          <div key={badge.label} className="flex items-center gap-2 px-4 py-3 bg-white">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={`${badge.icon} text-sm`} style={{ color: badge.color }}></i>
            </div>
            <span className="text-[#444] text-xs font-bold uppercase tracking-wide">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
