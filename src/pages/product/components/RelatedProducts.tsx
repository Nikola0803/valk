import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

export default function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const { products } = useProducts();
  const related = products.filter((p) => p.slug !== currentSlug && p.inStock).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }} data-product-shop>
      {related.map((rp) => (
        <Link
          key={rp.id}
          to={`/products/${rp.slug}`}
          className="group flex flex-col bg-white hover:bg-[#fafafa] transition-all duration-300 cursor-pointer"
        >
          <div className="relative overflow-hidden flex items-center justify-center" style={{ background: "#f0ede8", height: 240 }}>
            <img
              src={rp.image}
              alt={rp.name}
              className="h-full w-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="p-5" style={{ borderTop: "1px solid #ebebeb" }}>
            <p className="text-[#bbb] text-[9px] uppercase tracking-[0.25em] mb-1">Research Grade</p>
            <h3 className="text-[#111] font-black text-sm uppercase tracking-tight mb-2">{rp.name}</h3>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-shield-check-fill text-green-600 text-xs"></i>
              </div>
              <span className="text-[10px] text-green-700 font-semibold">99%+ Purity</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#111] font-black text-xl">${rp.price.toFixed(2)}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5" style={{ background: "#111" }}>
                View
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
