import { SHIPPING_RATE } from "@/pages/order/orderData";
import type { CartItem, AppliedCoupon } from "@/hooks/useCart";
import FreeShippingBar from "@/components/feature/FreeShippingBar";

interface OrderSidebarProps {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedCoupon: AppliedCoupon | null;
  couponCode: string;
  setCouponCode: (v: string) => void;
  couponStatus: "idle" | "loading" | "success" | "error";
  setCouponStatus: (s: "idle" | "loading" | "success" | "error") => void;
  couponMsg: string;
  setCouponMsg: (s: string) => void;
  handleApplyCoupon: () => void;
  handleRemoveCoupon: () => void;
  taxRate: number;
  taxAmount: number;
  grandTotal: number;
  stateInput: string;
}

export default function OrderSidebar({
  items, subtotal, discountAmount, appliedCoupon,
  couponCode, setCouponCode, couponStatus, setCouponStatus, couponMsg, setCouponMsg,
  handleApplyCoupon, handleRemoveCoupon,
  taxRate, taxAmount, grandTotal, stateInput,
}: OrderSidebarProps) {
  return (
    <div className="sticky top-24 flex flex-col gap-4">

      {/* Free shipping progress */}
      <div className="p-5" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
        <FreeShippingBar subtotal={subtotal} />
      </div>

      {/* Coupon input */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid #e8e8e8" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa]">Coupon Code</p>
        </div>
        <div className="px-6 py-4">
          {appliedCoupon ? (
            <div className="flex items-center justify-between px-3 py-2.5" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div className="flex items-center gap-2 min-w-0">
                <i className="ri-coupon-3-line text-green-600 text-sm flex-shrink-0"></i>
                <span className="text-green-700 text-xs font-black uppercase truncate">{appliedCoupon.coupon.code}</span>
                <span className="text-green-600 text-xs truncate">- {couponMsg}</span>
              </div>
              <button onClick={handleRemoveCoupon} className="text-green-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0 ml-2">
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    if (couponStatus !== "idle") { setCouponStatus("idle"); setCouponMsg(""); }
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyCoupon(); } }}
                  placeholder="ENTER CODE"
                  className="flex-1 px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#111] outline-none transition-all placeholder:text-[#bbb] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal"
                  style={{
                    border: `1px solid ${couponStatus === "error" ? "#fca5a5" : "#e0e0e0"}`,
                    background: couponStatus === "error" ? "#fff5f5" : "#fafafa",
                  }}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponStatus === "loading" || !couponCode.trim()}
                  className="flex-shrink-0 px-4 py-2.5 font-black uppercase tracking-widest text-[10px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  style={{ background: "#111", color: "#fff" }}
                >
                  {couponStatus === "loading" ? <i className="ri-loader-4-line animate-spin text-sm"></i> : "Apply"}
                </button>
              </div>
              {couponStatus === "error" && couponMsg && (
                <p className="mt-1.5 text-[10px] font-semibold text-red-500 flex items-center gap-1">
                  <i className="ri-error-warning-line"></i> {couponMsg}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Order summary */}
      <div style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
        <div className="px-6 py-5" style={{ borderBottom: "1px solid #e8e8e8" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa]">Order Summary</p>
        </div>
        <div className="px-6 py-4 divide-y" style={{ borderColor: "#f0f0f0" }}>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-4">
              <div className="w-14 h-14 flex-shrink-0" style={{ background: "#f5f4f2" }}>
                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" style={{ mixBlendMode: "multiply" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#111] font-bold text-[11px] uppercase tracking-wide leading-snug truncate">{item.name}</p>
                <p className="text-[#888] text-[10px] mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="text-[#111] font-black text-sm flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4" style={{ borderTop: "2px solid #f0f0f0" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#888] text-xs">Subtotal</span>
            <span className="text-[#111] font-bold text-sm">${subtotal.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-600 text-xs font-semibold flex items-center gap-1">
                <i className="ri-coupon-3-line text-xs"></i> Discount
              </span>
              <span className="text-green-600 font-bold text-sm">−${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#888] text-xs">Shipping</span>
            <span className="text-[#111] font-bold text-sm">${SHIPPING_RATE.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#888] text-xs">
              Tax {stateInput.trim().toUpperCase() === "ID" && taxRate > 0 ? `(ID ${taxRate}%)` : ""}
            </span>
            <span className="text-[#111] text-sm font-bold">
              {stateInput.trim().length >= 2
                ? taxRate > 0 ? `$${taxAmount.toFixed(2)}` : "—"
                : <span className="text-[#bbb] text-xs">Enter state</span>}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #e8e8e8" }}>
            <span className="text-[#111] font-black text-sm uppercase tracking-wide">Total</span>
            <span className="text-[#111] font-black text-xl">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
