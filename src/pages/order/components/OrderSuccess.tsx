import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { PAYMENT_LABELS, getPaymentHandle, SHIPPING_RATE, type PaymentMethod } from "@/pages/order/orderData";

interface OrderSuccessProps {
  orderId: string | null;
  method: PaymentMethod;
  email: string;
  orderTotal: number;
  orderTax: number;
  taxRate: number;
}

export default function OrderSuccess({ orderId, method, email, orderTotal, orderTax, taxRate }: OrderSuccessProps) {
  // GoAffPro conversion tracking
  useEffect(() => {
    if (!orderId || !orderTotal) return;
    (window as any).goaffpro_order = { id: orderId, total: orderTotal };
    if (typeof (window as any).goaffproTrackConversion !== "undefined") {
      (window as any).goaffproTrackConversion((window as any).goaffpro_order);
    }
  }, [orderId, orderTotal]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50"><Navbar /></div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8" style={{ paddingTop: 64 }}>
        <div className="w-20 h-20 flex items-center justify-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <i className="ri-check-line text-3xl text-green-600"></i>
        </div>
        <div className="text-center max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Order Received</p>
          <h1 className="font-black uppercase text-3xl text-[#111] mb-4 tracking-tight">Thank You!</h1>
          {orderId && <p className="text-[#888] text-xs mb-2 uppercase tracking-widest font-bold">Order #{orderId}</p>}
          <p className="text-[#666] text-sm leading-relaxed mb-2">
            Your order has been received. Please complete your payment using the details below.
          </p>
          <p className="text-[#888] text-xs leading-relaxed">
            Once payment is confirmed, we'll process and ship within 1–2 business days. A confirmation will be sent to{" "}
            <strong className="text-[#555]">{email}</strong>.
          </p>
        </div>

        <div className="w-full max-w-md p-6" style={{ background: "#f8f7f5", border: "1px solid #e0e0e0" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa] mb-4">Complete Your Payment</p>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
              <span className="text-[#888] text-xs">Method</span>
              <span className="text-[#111] font-black text-sm">{PAYMENT_LABELS[method]}</span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
              <span className="text-[#888] text-xs">Send to</span>
              <span className="text-[#111] font-black text-sm">{getPaymentHandle(method)}</span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
              <span className="text-[#888] text-xs">Recipient</span>
              <span className="text-[#111] font-bold text-sm">Warrior Distributions LLC</span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
              <span className="text-[#888] text-xs">Shipping</span>
              <span className="text-[#111] font-bold text-sm">${SHIPPING_RATE.toFixed(2)}</span>
            </div>
            {orderTax > 0 && (
              <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #ebebeb" }}>
                <span className="text-[#888] text-xs">Tax {taxRate > 0 ? `(ID ${taxRate}%)` : ""}</span>
                <span className="text-[#111] font-bold text-sm">${orderTax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-3">
              <span className="text-[#888] text-xs">Amount to send</span>
              <span className="text-[#111] font-black text-xl">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-[#aaa] text-[10px] mt-4 leading-relaxed">
            Include your name and order #{orderId ?? "number"} in the payment note so we can match it.
          </p>
        </div>

        <Link
          to="/shop"
          className="font-black uppercase tracking-widest text-[11px] px-8 py-4 cursor-pointer whitespace-nowrap"
          style={{ background: "#111", color: "#fff" }}
        >
          Continue Shopping
        </Link>
      </div>
      <FooterSection />
    </div>
  );
}
