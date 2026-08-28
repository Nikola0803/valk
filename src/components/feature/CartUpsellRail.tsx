import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useBestSellers } from "@/hooks/useBestSellers";

interface CartUpsellRailProps {
  limit?: number;
  /** "list" = one full-width row per product (side panel). "row" = compact horizontal cards (inline in the drawer). */
  variant?: "list" | "row";
}

/** Best-selling peptides not already in the cart, offered as quick-adds. */
export default function CartUpsellRail({ limit = 6, variant = "list" }: CartUpsellRailProps) {
  const { items, addItem } = useCart();
  const { bestSellers } = useBestSellers(limit + items.length);

  const inCartIds = new Set(items.map((i) => i.id));
  const suggestions = bestSellers.filter((p) => !inCartIds.has(p.id) && p.inStock).slice(0, limit);

  if (suggestions.length === 0) return null;

  if (variant === "row") {
    return (
      <div className="flex gap-3.5 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
        {suggestions.map((p) => (
          <div key={p.id} className="flex-shrink-0 w-[136px] p-3" style={{ background: "#fff", border: "1px solid #e8e8e8" }}>
            <Link to={`/products/${p.slug}`} className="block cursor-pointer">
              <div className="flex items-center justify-center mb-2.5" style={{ height: 68, background: "#f0ede8" }}>
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain p-1.5" style={{ mixBlendMode: "multiply" }} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight text-[#111] leading-snug mb-2 line-clamp-2 hover:text-[#555] transition-colors" style={{ minHeight: 28 }}>{p.name}</p>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-[#111]">${p.price.toFixed(2)}</span>
              <button
                onClick={() => addItem({ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image })}
                className="w-6 h-6 flex items-center justify-center cursor-pointer flex-shrink-0"
                style={{ background: "#111", color: "#fff" }}
                aria-label={`Add ${p.name}`}
              >
                <i className="ri-add-line text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {suggestions.map((p) => (
        <div key={p.id} className="flex items-center gap-4 py-5" style={{ borderBottom: "1px solid #ebebeb" }}>
          <Link to={`/products/${p.slug}`} className="flex-shrink-0 flex items-center justify-center cursor-pointer" style={{ width: 64, height: 64, background: "#f0ede8", border: "1px solid #e8e8e8" }}>
            <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" style={{ mixBlendMode: "multiply" }} />
          </Link>
          <Link to={`/products/${p.slug}`} className="flex-1 min-w-0 cursor-pointer">
            <p className="text-[11px] font-bold uppercase tracking-tight text-[#111] leading-snug mb-1.5 hover:text-[#555] transition-colors">{p.name}</p>
            <span className="text-xs font-black text-[#888]">${p.price.toFixed(2)}</span>
          </Link>
          <button
            onClick={() => addItem({ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image })}
            className="flex-shrink-0 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors"
            style={{ background: "#111", color: "#fff" }}
          >
            + Add
          </button>
        </div>
      ))}
    </div>
  );
}
