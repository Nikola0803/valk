import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { validateCoupon } from "@/lib/woocommerce";
import { trackViewCart } from "@/lib/analytics";
import FreeShippingBar from "@/components/feature/FreeShippingBar";
import CartUpsellRail from "@/components/feature/CartUpsellRail";

const BAC_WATER_SLUG = "bac-water-10ml";

export default function CartDrawer() {
  const {
    items, isOpen, closeCart, removeItem, updateQty, addItem,
    totalPrice, subtotal, totalItems, discountAmount,
    appliedCoupon, setCoupon,
  } = useCart();
  const navigate = useNavigate();
  const { products } = useProducts();
  const bacWaterProduct = products.find((p) => p.slug === BAC_WATER_SLUG);
  const hasBacWater = items.some((i) => i.slug === BAC_WATER_SLUG);

  const [couponCode, setCouponCode]     = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [couponMsg, setCouponMsg]       = useState("");
  const couponInputRef                  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) trackViewCart(items);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setCouponCode("");
      setCouponStatus("idle");
      setCouponMsg("");
    }
  }, [isOpen]);

  const handleApplyCoupon = async () => {
    const code = couponCode.trim();
    if (!code) return;
    setCouponStatus("loading");
    setCouponMsg("");
    const result = await validateCoupon(code, subtotal);
    if (result.valid === true) {
      setCoupon({ coupon: result.coupon, discountAmount: result.discountAmount });
      setCouponStatus("success");
      setCouponMsg(
        result.coupon.discount_type === "percent"
          ? `${result.coupon.amount}% off applied!`
          : `$${result.discountAmount.toFixed(2)} off applied!`
      );
    } else {
      setCouponStatus("error");
      setCouponMsg(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setCouponStatus("idle");
    setCouponMsg("");
    setTimeout(() => couponInputRef.current?.focus(), 50);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[200] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={closeCart}
      />

      {/* Best-sellers panel - sits to the left of the cart drawer itself.
          Desktop-only (there isn't room for two side panels below lg), so on
          smaller screens these same suggestions surface inline inside the
          drawer instead (see the "You Might Also Like" row below). */}
      {items.length > 0 && (
        <div
          className="fixed top-0 bottom-0 z-[201] hidden lg:flex flex-col"
          style={{
            right: "min(420px, 100vw)",
            width: 340,
            background: "#fafafa",
            transform: isOpen ? "translateX(0)" : "translateX(calc(100% + min(420px, 100vw)))",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1) 0.05s",
            borderLeft: "1px solid #e0e0e0",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <div className="px-7 py-5 flex-shrink-0" style={{ borderBottom: "1px solid #e8e8e8" }}>
            <p className="font-black uppercase tracking-widest text-[11px] text-[#111]">Best Sellers</p>
            <p className="text-[#999] text-[10px] mt-0.5">Popular with other researchers</p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-7 py-2">
            <CartUpsellRail limit={10} variant="list" />
          </div>
        </div>
      )}

      <div
        className="fixed top-0 right-0 bottom-0 z-[201] flex flex-col"
        style={{
          width: "min(420px, 100vw)",
          background: "#ffffff",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          borderLeft: "1px solid #e0e0e0",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid #e8e8e8" }}
        >
          <div className="flex items-center gap-3">
            <h2 className="font-black uppercase tracking-widest text-[13px] text-[#111]">Cart</h2>
            {totalItems > 0 && (
              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-full" style={{ background: "#111" }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#111] transition-colors cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {totalItems > 0 && (
          <div className="px-7 py-4 flex-shrink-0" style={{ borderBottom: "1px solid #e8e8e8" }}>
            <FreeShippingBar subtotal={subtotal} />
          </div>
        )}

        {/* Items + footer share one scrollable region - on short screens (small
            laptop windows, landscape mobile) the footer content alone (coupon +
            price breakdown + BAC upsell + buttons) can be taller than the
            available space; pinning it outside the scroll area made the
            checkout button genuinely unreachable with no way to scroll to it.
            Keeping everything in one scrollable column guarantees it's always
            reachable regardless of screen height. */}
        <div className="flex-1 min-h-0 overflow-y-auto px-7 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 flex items-center justify-center" style={{ background: "#f5f4f2" }}>
                <i className="ri-shopping-cart-line text-2xl text-[#bbb]"></i>
              </div>
              <p className="font-black uppercase tracking-widest text-xs text-[#999]">Your cart is empty</p>
              <p className="text-[#bbb] text-xs leading-relaxed max-w-[200px]">Add some research peptides to get started.</p>
              <button onClick={closeCart} className="mt-2 font-black uppercase tracking-widest text-[11px] px-6 py-3 cursor-pointer whitespace-nowrap" style={{ background: "#111", color: "#fff" }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-0" style={{ borderTop: "1px solid #ebebeb" }}>
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-5" style={{ borderBottom: "1px solid #ebebeb" }}>
                  <Link
                    to={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="flex-shrink-0 flex items-center justify-center cursor-pointer"
                    style={{ width: 72, height: 72, background: "#f0ede8", border: "1px solid #e8e8e8" }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" style={{ mixBlendMode: "multiply" }} />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.slug}`} onClick={closeCart} className="block cursor-pointer">
                      <p className="text-[#aaa] text-[9px] uppercase tracking-widest mb-1">Research Grade</p>
                      <p className="text-[#111] font-black text-xs uppercase tracking-tight leading-snug mb-3 hover:text-[#555] transition-colors">{item.name}</p>
                    </Link>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-stretch" style={{ border: "1px solid #e0e0e0" }}>
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-7 flex items-center justify-center text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer font-bold text-sm">−</button>
                        <div className="w-8 h-7 flex items-center justify-center text-[#111] font-bold text-xs border-x" style={{ borderColor: "#e0e0e0" }}>{item.quantity}</div>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-7 flex items-center justify-center text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer font-bold text-sm">+</button>
                      </div>
                      <span className="font-black text-sm text-[#111]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item.id)} className="w-6 h-6 flex items-center justify-center text-[#bbb] hover:text-[#dc2626] transition-colors cursor-pointer flex-shrink-0 mt-0.5">
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer content - inside the same scroll container as the items
              list, see comment above. Negative margin cancels the shared
              px-7 padding so this block can keep its own edge-to-edge look. */}
          {items.length > 0 && (
          <div className="-mx-7 px-7 py-5 mt-2" style={{ borderTop: "1px solid #e8e8e8", background: "#fafafa" }}>

            {/* Coupon */}
            <div className="mb-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between px-4 py-3" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <i className="ri-coupon-3-line text-green-600 text-sm flex-shrink-0"></i>
                    <span className="text-green-700 text-xs font-black uppercase tracking-widest flex-shrink-0">
                      {appliedCoupon.coupon.code.toUpperCase()}
                    </span>
                    <span className="text-green-600 text-xs font-semibold truncate">- {couponMsg}</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-green-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0 ml-2" title="Remove coupon">
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    ref={couponInputRef}
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      if (couponStatus !== "idle") { setCouponStatus("idle"); setCouponMsg(""); }
                    }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleApplyCoupon(); }}
                    placeholder="COUPON CODE"
                    className="flex-1 px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#111] outline-none transition-all placeholder:text-[#bbb] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal"
                    style={{
                      border: `1px solid ${couponStatus === "error" ? "#fca5a5" : "#e0e0e0"}`,
                      background: couponStatus === "error" ? "#fff5f5" : "#fff",
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponStatus === "loading" || !couponCode.trim()}
                    className="flex-shrink-0 px-4 py-2.5 font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    style={{ background: "#111", color: "#fff" }}
                  >
                    {couponStatus === "loading"
                      ? <i className="ri-loader-4-line animate-spin text-sm"></i>
                      : "Apply"
                    }
                  </button>
                </div>
              )}

              {couponStatus === "error" && couponMsg && (
                <p className="mt-1.5 text-[10px] font-semibold text-red-500 flex items-center gap-1">
                  <i className="ri-error-warning-line"></i>
                  {couponMsg}
                </p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[#888] text-xs font-semibold uppercase tracking-widest">Subtotal</span>
                <span className="text-[#111] font-bold text-sm">${subtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between">
                  <span className="text-green-600 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                    <i className="ri-coupon-3-line text-xs"></i>
                    Discount
                  </span>
                  <span className="text-green-600 font-bold text-sm">−${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid #e8e8e8" }}>
                <span className="text-[#888] text-xs font-semibold uppercase tracking-widest">Total</span>
                <span className="text-[#111] font-black text-lg">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[#bbb] text-[10px] mb-4">Shipping calculated at checkout.</p>

            {/* BAC Water upsell - only shown when not already in cart */}
            {!hasBacWater && items.length > 0 && (
              <div className="mb-4 p-4" style={{ background: "#fff1f1", border: "2px solid #dc2626" }}>
                <div className="flex items-start gap-2 mb-3">
                  <i className="ri-error-warning-fill text-red-600 text-base flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="text-red-700 font-black text-[11px] uppercase tracking-wide mb-1">Don't forget BAC Water!</p>
                    <p className="text-red-700 text-[10px] leading-relaxed">
                      All peptides are a lyophilized powder and must be reconstituted with Bacteriostatic Water.
                    </p>
                  </div>
                </div>
                {bacWaterProduct && (
                  <button
                    onClick={() => {
                      addItem({
                        id: bacWaterProduct.id,
                        slug: bacWaterProduct.slug,
                        name: bacWaterProduct.name,
                        price: bacWaterProduct.price,
                        image: bacWaterProduct.image,
                      });
                    }}
                    className="w-full py-2.5 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all"
                    style={{ background: "#dc2626", color: "#fff" }}
                  >
                    <i className="ri-add-line text-sm"></i>
                    Add BAC Water - ${bacWaterProduct.price.toFixed(2)}
                  </button>
                )}
              </div>
            )}

            {/* Compact quick-add rail - always visible here (unlike the side
                best-sellers panel, which is desktop-only), so mobile users
                still get upsell suggestions. */}
            <div className="mb-4">
              <p className="text-[#999] text-[10px] font-bold uppercase tracking-widest mb-2">You Might Also Like</p>
              <CartUpsellRail limit={8} variant="row" />
            </div>

            <button
              onClick={() => { closeCart(); navigate("/order"); }}
              className="w-full font-black uppercase tracking-widest text-[11px] py-4 cursor-pointer whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background: "#111111", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#111111"; }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line text-xs"></i>
              </div>
              Proceed to Order
            </button>

            <button onClick={closeCart} className="w-full mt-3 font-bold uppercase tracking-widest text-[11px] py-3 cursor-pointer whitespace-nowrap text-[#555] hover:text-[#111] transition-colors">
              Continue Shopping
            </button>

            <Link
              to="/cart"
              onClick={closeCart}
              className="block w-full mt-1 font-bold uppercase tracking-widest text-[10px] py-2 cursor-pointer whitespace-nowrap text-[#999] hover:text-[#111] transition-colors text-center"
            >
              View Full Cart →
            </Link>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #ebebeb" }}>
              <p className="text-[#bbb] text-[10px] font-bold uppercase tracking-widest mb-3 text-center">We Accept</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["Zelle", "Cash App", "Venmo"].map((method) => (
                  <span key={method} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ background: "#f5f4f2", border: "1px solid #e0e0e0", color: "#888" }}>
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
}
