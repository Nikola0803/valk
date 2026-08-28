import { Link, useNavigate } from "react-router-dom";
import type { NormalizedProduct } from "@/lib/woocommerce";
import type { WCReview } from "@/lib/woocommerce";

interface ProductPurchasePanelProps {
  product: NormalizedProduct;
  slug: string;
  variantGroup: string[] | null;
  reviews: WCReview[];
  isOutOfStock: boolean;
  quantity: number;
  setQuantity: (q: number) => void;
  added: boolean;
  onAddToCart: () => void;
  onWaitlist: () => void;
  viewerCount: number;
  displayOriginalPrice: number;
  savings: number;
  savingsPct: number;
}

export default function ProductPurchasePanel({
  product, slug, variantGroup, reviews, isOutOfStock,
  quantity, setQuantity, added, onAddToCart, onWaitlist,
  viewerCount, displayOriginalPrice, savings, savingsPct,
}: ProductPurchasePanelProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Category label */}
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Research Grade Peptides</p>

      {/* Product name */}
      <h1 className="font-black uppercase leading-[0.88] tracking-tight mb-3" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", color: "#111111" }}>
        {product.name}
      </h1>
      {product.shortDescription
        ? <p className="text-[#888] text-sm mb-6" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
        : <p className="text-[#888] text-sm mb-6">Research-grade peptide - lyophilized and 3rd-party verified for purity.</p>
      }

      {/* Size / variant selector */}
      {variantGroup && (
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {variantGroup.map((siblingSlug) => {
              const size = siblingSlug.match(/(\d+(?:\.\d+)?(?:mg|ml|mcg|iu|g))$/i)?.[1]?.toLowerCase() ?? siblingSlug;
              const isActive = siblingSlug === slug;
              return (
                <button
                  key={siblingSlug}
                  onClick={() => !isActive && navigate(`/products/${siblingSlug}`)}
                  className="px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                  style={{
                    border: isActive ? "2px solid #111" : "2px solid #e0e0e0",
                    background: isActive ? "#111" : "#fff",
                    color: isActive ? "#fff" : "#555",
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-3 mb-6 pb-6" style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-4 h-4 flex items-center justify-center">
              <i className="ri-star-fill text-[#00b67a] text-sm"></i>
            </div>
          ))}
        </div>
        <span className="text-[#111] font-bold text-sm">5.0</span>
        <span className="text-[#aaa] text-xs">{reviews.length > 0 ? `(${reviews.length} verified ${reviews.length === 1 ? "review" : "reviews"})` : ""}</span>
        <span className="text-[#aaa] text-xs">·</span>
        {isOutOfStock
          ? <span className="text-red-600 text-xs font-bold">Out of Stock</span>
          : <span className="text-green-700 text-xs font-bold">In Stock</span>
        }
      </div>

      {/* Price */}
      <div className="flex items-end gap-4 mb-8">
        <span className="font-black text-4xl text-[#111]">${product.price.toFixed(2)}</span>
        <span className="font-semibold text-lg text-[#bbb] line-through">${displayOriginalPrice.toFixed(2)}</span>
        <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 self-center" style={{ background: "#dc2626", color: "#fff" }}>
          SAVE ${savings.toFixed(2)}
        </span>
      </div>

      {/* Key specs quick view */}
      <div className="grid grid-cols-2 gap-2 mb-8">
        {[
          { label: "Purity", value: "≥99% (HPLC)" },
          ...(product.content ? [{ label: "Content", value: `${product.content} / vial` }] : []),
          { label: "Origin", value: "Made in USA" },
        ].map((spec) => (
          <div key={spec.label} className="flex flex-col p-3" style={{ background: "#f8f7f5", border: "1px solid #ebebeb" }}>
            <span className="text-[10px] text-[#aaa] uppercase tracking-widest mb-0.5">{spec.label}</span>
            <span className="text-[#111] font-bold text-sm">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Quantity + Add to cart / Waitlist */}
      {isOutOfStock ? (
        <div className="mb-6">
          <div className="flex items-center gap-3 px-5 py-4 mb-4" style={{ background: "#fff8f0", border: "1px solid #fde8c0" }}>
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <i className="ri-alarm-warning-line text-yellow-600 text-base"></i>
            </div>
            <p className="text-[#92400e] text-xs font-semibold leading-snug">
              This product is currently <strong>out of stock</strong>. Join the waitlist and we&apos;ll notify you the moment it&apos;s available.
            </p>
          </div>
          <button
            onClick={onWaitlist}
            className="w-full font-black uppercase tracking-widest text-sm py-4 transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            style={{ background: "#111111", color: "#ffffff" }}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-notification-3-line text-base"></i>
            </div>
            Join Waitlist - Get Notified
          </button>
        </div>
      ) : (
        <div className="flex items-stretch gap-3 mb-6">
          <div className="flex items-stretch" style={{ border: "1px solid #e0e0e0" }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 flex items-center justify-center text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer font-bold text-lg"
            >
              −
            </button>
            <div className="w-12 flex items-center justify-center text-[#111] font-bold text-sm border-x" style={{ borderColor: "#e0e0e0" }}>
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(Math.min(99, quantity + 1))}
              className="w-12 flex items-center justify-center text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer font-bold text-lg"
            >
              +
            </button>
          </div>
          <button
            onClick={onAddToCart}
            className="flex-1 font-black uppercase tracking-widest text-sm py-4 transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            style={{ background: added ? "#16a34a" : "#111111", color: "#ffffff" }}
          >
            {added ? (
              <>
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-check-line text-base"></i></div>
                Added to Cart
              </>
            ) : (
              <>
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-shopping-cart-line text-base"></i></div>
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </>
            )}
          </button>
        </div>
      )}

      {/* Secondary actions */}
      <div className="flex gap-3 mb-8">
        <Link
          to={`/coa?product=${slug}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-[#555] hover:text-[#111] transition-colors whitespace-nowrap"
          style={{ border: "1px solid #e0e0e0", background: "#fff" }}
        >
          <div className="w-4 h-4 flex items-center justify-center"><i className="ri-file-text-line text-sm"></i></div>
          View CoA
        </Link>
      </div>

      {/* Urgency / social proof strip */}
      <div className="p-4 mb-6 flex items-center gap-3" style={{ background: "#fffbf0", border: "1px solid #fde68a" }}>
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
          <i className="ri-alarm-warning-line text-yellow-600 text-base"></i>
        </div>
        <p className="text-[#92400e] text-xs font-semibold leading-snug">
          Limited stock - <span className="font-black">{viewerCount} people</span> are viewing this product right now
        </p>
      </div>

      {/* Shipping info */}
      <div className="space-y-2 mb-8">
        {[
          { icon: "ri-truck-line",              text: "Order before 2pm EST for same-day processing" },
          { icon: "ri-map-pin-line",            text: "US domestic shipping only · Tracked delivery" },
          { icon: "ri-customer-service-2-line", text: "7-day expert support · (541)-709-5434" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <i className={`${item.icon} text-[#555] text-sm`}></i>
            </div>
            <p className="text-[#666] text-xs">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Research use only disclaimer */}
      <div className="p-4" style={{ background: "#f8f7f5", border: "1px solid #e0e0e0" }}>
        <p className="text-[#999] text-[10px] leading-relaxed uppercase tracking-wide">
          For Research Use Only. Not intended for human consumption, injection, or therapeutic use. By purchasing, you confirm you are a qualified researcher using this product in a controlled laboratory setting.
        </p>
      </div>
    </div>
  );
}
