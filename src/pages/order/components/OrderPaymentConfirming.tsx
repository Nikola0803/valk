import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { getPaymentStatus } from "@/lib/circoflows";

export const CARD_UNAVAILABLE_KEY = "vk_card_unavailable";

export interface PendingCardDetails {
  email: string;
  orderTotal: number;
  orderTax: number;
  taxRate: number;
}

interface OrderPaymentConfirmingProps {
  merchantTransactionId: string;
  details: PendingCardDetails;
  onConfirmed: (orderNumber: string) => void;
}

type ConfirmState = "checking" | "paid" | "failed" | "timeout";

// WooCommerce order statuses that mean "webhook landed, payment succeeded."
const PAID_STATUSES = ["processing", "completed"];
// Statuses that mean the payment definitively did not go through.
const FAILED_STATUSES = ["failed", "cancelled"];

const POLL_INTERVAL_MS = 2500;
const MAX_ATTEMPTS = 24; // ~60s - CircoFlows webhooks should land well within this

/**
 * Shown after the customer is redirected back from CircoFlows's hosted card page.
 * The redirect itself is NOT proof of payment - this polls our own /payment/status
 * endpoint (backed by the webhook, not the redirect) until the order flips to a
 * final state. See CircoFlows_Payment_Integration_Scope.md.
 *
 * Card declines are expected to be common with this high-risk-friendly processor -
 * on a definitive decline, we flag card as unavailable for the rest of this browser
 * session (see CARD_UNAVAILABLE_KEY) and send the customer back to a checkout that
 * only offers Zelle/Venmo/CashApp, rather than let them retry the same card path
 * repeatedly.
 */
export default function OrderPaymentConfirming({
  merchantTransactionId,
  details,
  onConfirmed,
}: OrderPaymentConfirmingProps) {
  const [state, setState] = useState<ConfirmState>("checking");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  // Seeded from the localStorage round-trip (details prop), but overwritten with the
  // authoritative WC order values from /payment/status the moment they arrive - see
  // PaymentStatusResult.order_total/order_tax/email. Falls back to `details` only if the
  // backend response is missing those fields for some reason.
  const [resolvedDetails, setResolvedDetails] = useState<PendingCardDetails>(details);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const poll = async (attempt: number) => {
      if (cancelled.current) return;

      try {
        const result = await getPaymentStatus(merchantTransactionId);

        if (PAID_STATUSES.includes(result.status)) {
          setOrderNumber(result.order_number);
          setResolvedDetails((prev) => ({
            email: result.email || prev.email,
            orderTotal: result.order_total !== undefined ? Number(result.order_total) : prev.orderTotal,
            orderTax: result.order_tax !== undefined ? Number(result.order_tax) : prev.orderTax,
            taxRate: prev.taxRate, // not returned by the order itself - only known client-side
          }));
          setState("paid");
          onConfirmed(result.order_number);
          return;
        }

        if (FAILED_STATUSES.includes(result.status)) {
          // Force manual payment methods for the rest of this session - card keeps
          // failing ~most of the time with this processor, don't let them loop on it.
          sessionStorage.setItem(CARD_UNAVAILABLE_KEY, "1");
          setState("failed");
          return;
        }
      } catch {
        // Order not found yet right after redirect, or a transient error - keep polling.
      }

      if (attempt >= MAX_ATTEMPTS) {
        setState("timeout");
        return;
      }

      setTimeout(() => poll(attempt + 1), POLL_INTERVAL_MS);
    };

    poll(0);
    return () => { cancelled.current = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantTransactionId]);

  // GoAffPro conversion tracking - same call OrderSuccess makes for manual-payment
  // orders, so card orders get affiliate credit too.
  useEffect(() => {
    if (state !== "paid" || !orderNumber) return;
    (window as any).goaffpro_order = { id: orderNumber, total: resolvedDetails.orderTotal };
    if (typeof (window as any).goaffproTrackConversion !== "undefined") {
      (window as any).goaffproTrackConversion((window as any).goaffpro_order);
    }
  }, [state, orderNumber, resolvedDetails.orderTotal]);

  const goToManualCheckout = () => {
    // Full-page reload (not client-side nav) so OrderPage re-initializes its
    // `method` state fresh and picks up the sessionStorage flag set above.
    window.location.href = "/order";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50"><Navbar /></div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 text-center" style={{ paddingTop: 64 }}>
        {state === "checking" && (
          <>
            <span className="inline-block w-10 h-10 border-4 border-[#111] border-t-transparent rounded-full animate-spin" />
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Confirming Payment</p>
              <h1 className="font-black uppercase text-2xl text-[#111] mb-4 tracking-tight">Almost There</h1>
              <p className="text-[#666] text-sm leading-relaxed">
                We're confirming your payment with our processor. This usually takes just a few seconds - please don't close this page.
              </p>
            </div>
          </>
        )}

        {state === "paid" && (
          <>
            <div className="w-20 h-20 flex items-center justify-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Payment Confirmed</p>
              <h1 className="font-black uppercase text-3xl text-[#111] mb-4 tracking-tight">Thank You!</h1>
              {orderNumber && <p className="text-[#888] text-xs mb-2 uppercase tracking-widest font-bold">Order #{orderNumber}</p>}
              <p className="text-[#666] text-sm leading-relaxed">
                Your card payment was successful. We'll process and ship within 1–2 business days. A confirmation will be sent to{" "}
                <strong className="text-[#555]">{resolvedDetails.email}</strong>.
              </p>
            </div>

            <div className="w-full max-w-md p-6" style={{ background: "#f8f7f5", border: "1px solid #e0e0e0" }}>
              <div className="space-y-0">
                <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
                  <span className="text-[#888] text-xs">Method</span>
                  <span className="text-[#111] font-black text-sm">Card</span>
                </div>
                {resolvedDetails.orderTax > 0 && (
                  <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
                    <span className="text-[#888] text-xs">Tax {resolvedDetails.taxRate > 0 ? `(ID ${resolvedDetails.taxRate}%)` : ""}</span>
                    <span className="text-[#111] font-bold text-sm">${resolvedDetails.orderTax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#888] text-xs">Amount charged</span>
                  <span className="text-[#111] font-black text-xl">${resolvedDetails.orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              className="font-black uppercase tracking-widest text-[11px] px-8 py-4 cursor-pointer whitespace-nowrap"
              style={{ background: "#111", color: "#fff" }}
            >
              Continue Shopping
            </Link>
          </>
        )}

        {state === "failed" && (
          <>
            <div className="w-20 h-20 flex items-center justify-center" style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}>
              <i className="ri-close-line text-3xl text-red-600"></i>
            </div>
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Payment Declined</p>
              <h1 className="font-black uppercase text-2xl text-[#111] mb-4 tracking-tight">We Couldn't Process Your Card</h1>
              <p className="text-[#666] text-sm leading-relaxed">
                Sorry, our merchant couldn't process your payment. Please use one of our other payment methods to complete your order -
                your cart has been kept as-is.
              </p>
            </div>
            <button
              onClick={goToManualCheckout}
              className="font-black uppercase tracking-widest text-[11px] px-8 py-4 cursor-pointer whitespace-nowrap"
              style={{ background: "#111", color: "#fff", border: "none" }}
            >
              Choose Another Payment Method
            </button>
          </>
        )}

        {state === "timeout" && (
          <>
            <div className="w-20 h-20 flex items-center justify-center" style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}>
              <i className="ri-time-line text-3xl text-red-600"></i>
            </div>
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Still Confirming</p>
              <h1 className="font-black uppercase text-2xl text-[#111] mb-4 tracking-tight">Taking Longer Than Expected</h1>
              <p className="text-[#666] text-sm leading-relaxed">
                We haven't received confirmation yet. If your card was charged, it will be reflected shortly - contact us if you don't
                hear back within a few minutes. Your cart has been kept as-is.
              </p>
            </div>
            <Link
              to="/order"
              className="font-black uppercase tracking-widest text-[11px] px-8 py-4 cursor-pointer whitespace-nowrap"
              style={{ background: "#111", color: "#fff" }}
            >
              Return to Checkout
            </Link>
          </>
        )}
      </div>
      <FooterSection />
    </div>
  );
}
