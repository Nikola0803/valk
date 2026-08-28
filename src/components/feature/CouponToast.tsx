import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";

// Shows a brief, dismissible confirmation the moment the affiliate referral
// coupon auto-applies - visible immediately, regardless of whether the cart
// drawer is open. Auto-hides after a few seconds.
export default function CouponToast() {
  const { couponToast, dismissCouponToast } = useCart();

  useEffect(() => {
    if (!couponToast) return;
    const timer = setTimeout(dismissCouponToast, 6000);
    return () => clearTimeout(timer);
  }, [couponToast, dismissCouponToast]);

  if (!couponToast) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 z-[200] flex items-center gap-3 px-5 py-3.5 shadow-lg max-w-[92vw]"
      style={{ background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full" style={{ background: "#22c55e" }}>
        <i className="ri-check-line text-white text-sm" />
      </div>
      <p className="text-sm leading-snug">
        Code <span className="font-black">{couponToast.coupon.code.toUpperCase()}</span> applied - you're saving ${couponToast.discountAmount.toFixed(2)}.
      </p>
      <button
        onClick={dismissCouponToast}
        aria-label="Dismiss"
        className="flex-shrink-0 text-white/60 hover:text-white cursor-pointer w-6 h-6 flex items-center justify-center"
      >
        <i className="ri-close-line text-base" />
      </button>
    </div>
  );
}
