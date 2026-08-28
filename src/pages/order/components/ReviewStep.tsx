import { PAYMENT_LABELS, getPaymentHandle, isManualPaymentMethod, type PaymentMethod } from "@/pages/order/orderData";
import type { OrderForm } from "./ShippingStep";

interface ReviewStepProps {
  form: OrderForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  method: PaymentMethod;
  grandTotal: number;
  paymentConfirmed: boolean;
  setPaymentConfirmed: (v: boolean) => void;
  bacAcknowledged: boolean;
  setBacAcknowledged: (v: boolean) => void;
  submitting: boolean;
  submitError: string | null;
  handleSubmitOrder: (e: React.FormEvent) => void;
  setStep: (s: 1 | 2 | 3) => void;
}

export default function ReviewStep({
  form, handleChange, method, grandTotal,
  paymentConfirmed, setPaymentConfirmed,
  bacAcknowledged, setBacAcknowledged,
  submitting, submitError, handleSubmitOrder, setStep,
}: ReviewStepProps) {
  return (
    <form onSubmit={handleSubmitOrder}>
      <h2 className="font-black uppercase tracking-tight text-[#111] text-xl mb-8">Review &amp; Confirm</h2>

      {/* Shipping summary */}
      <div className="p-5 mb-4" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa]">Shipping To</p>
          <button
            type="button"
            onClick={() => { setStep(1); window.scrollTo(0, 0); }}
            className="text-[10px] font-bold uppercase tracking-widest text-[#555] hover:text-[#111] cursor-pointer"
          >
            Edit
          </button>
        </div>
        <p className="text-[#111] font-bold text-sm">{form.firstName} {form.lastName}</p>
        <p className="text-[#666] text-xs mt-1">{form.address}</p>
        <p className="text-[#666] text-xs">{form.city}, {form.state} {form.zip}</p>
        <p className="text-[#666] text-xs mt-1">{form.email} · {form.phone}</p>
      </div>

      {/* Payment summary */}
      <div className="p-5 mb-8" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa]">Payment Method</p>
          <button
            type="button"
            onClick={() => { setStep(2); window.scrollTo(0, 0); }}
            className="text-[10px] font-bold uppercase tracking-widest text-[#555] hover:text-[#111] cursor-pointer"
          >
            Edit
          </button>
        </div>
        <p className="text-[#111] font-bold text-sm">{PAYMENT_LABELS[method]}</p>
        <p className="text-[#888] text-xs">
          {isManualPaymentMethod(method)
            ? `Send $${grandTotal.toFixed(2)} to ${getPaymentHandle(method)}`
            : `$${grandTotal.toFixed(2)} charged securely on the next step`}
        </p>
      </div>

      {/* Order notes */}
      <div className="mb-8">
        <label className="block text-[10px] font-black uppercase tracking-widest text-[#888] mb-2">Order Notes (Optional)</label>
        <textarea
          name="notes" value={form.notes} onChange={handleChange}
          placeholder="Any special instructions for your order..."
          rows={3} maxLength={500}
          className="w-full px-4 py-3 text-sm text-[#111] focus:outline-none transition-colors resize-none"
          style={{ background: "#fff", border: "1px solid #e0e0e0" }}
          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.border = "1px solid #111"; }}
          onBlur={(e) => { (e.target as HTMLTextAreaElement).style.border = "1px solid #e0e0e0"; }}
        />
      </div>

      {/* BAC Water acknowledgement */}
      <div className="mb-4 p-5" style={{ background: bacAcknowledged ? "#fff7f7" : "#fff1f1", border: bacAcknowledged ? "1px solid #fca5a5" : "2px solid #dc2626" }}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-error-warning-fill text-red-600 text-base"></i>
          </div>
          <div>
            <p className="text-red-700 font-black text-xs uppercase tracking-wide mb-1">Important - Reconstitution Required</p>
            <p className="text-red-800 text-[11px] leading-relaxed">
              All peptides are shipped as a <strong>lyophilized powder</strong> and must be reconstituted with Bacteriostatic Water (BAC Water).
              If you do not already have BAC Water, you can add it from our{" "}
              <a href="/products/bac-water-10ml" className="underline font-bold" style={{ color: "#dc2626" }}>products page</a>.
            </p>
          </div>
        </div>
        <label className="flex items-start gap-4 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={bacAcknowledged}
            onChange={(e) => setBacAcknowledged(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: "#dc2626", cursor: "pointer", marginTop: 2, flexShrink: 0 }}
          />
          <p className="text-red-700 font-bold text-[11px] leading-relaxed">
            I understand that BAC Water is required to reconstitute my peptides and I either have it or will order it separately.
          </p>
        </label>
      </div>

      {/* Payment confirmation - only applies to manual (Zelle/Venmo/CashApp) methods.
          Card payment is confirmed by CircoFlows + our webhook, not a self-attestation checkbox. */}
      {isManualPaymentMethod(method) && (
        <div className="mb-6 p-5" style={{ background: paymentConfirmed ? "#f0fdf4" : "#fffbeb", border: paymentConfirmed ? "1px solid #bbf7d0" : "1px solid #fde68a" }}>
          <label className="flex items-start gap-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={paymentConfirmed}
              onChange={(e) => setPaymentConfirmed(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "#111", cursor: "pointer", marginTop: 2, flexShrink: 0 }}
            />
            <div>
              <p className="text-[#111] font-black text-xs uppercase tracking-wide mb-1">I confirm I have sent payment</p>
              <p className="text-[#555] text-[11px] leading-relaxed">
                I have already sent <strong>${grandTotal.toFixed(2)}</strong> via{" "}
                <strong>{PAYMENT_LABELS[method]} to {getPaymentHandle(method)}</strong> and included my name and order number in the payment note.
              </p>
            </div>
          </label>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4" style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}>
          <p className="text-red-700 text-xs font-bold uppercase tracking-wide mb-1">Order Failed</p>
          <p className="text-red-600 text-[11px] leading-relaxed whitespace-pre-wrap">{submitError}</p>
        </div>
      )}

      {(() => {
        const ready = bacAcknowledged && (!isManualPaymentMethod(method) || paymentConfirmed);
        return (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setStep(2); window.scrollTo(0, 0); }}
              className="px-6 py-4 font-black uppercase tracking-widest text-[11px] cursor-pointer whitespace-nowrap"
              style={{ background: "#fff", color: "#111", border: "1px solid #e0e0e0" }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!ready || submitting}
              className="flex-1 font-black uppercase tracking-widest text-[11px] py-4 whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: ready && !submitting ? "#111" : "#ccc",
                color: "#fff",
                cursor: ready && !submitting ? "pointer" : "not-allowed",
              }}
            >
              {submitting ? (
                <>
                  <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isManualPaymentMethod(method) ? "Placing Order…" : "Redirecting to Secure Payment…"}
                </>
              ) : ready ? (
                isManualPaymentMethod(method)
                  ? `Place Order - $${grandTotal.toFixed(2)}`
                  : `Continue to Secure Payment - $${grandTotal.toFixed(2)}`
              ) : isManualPaymentMethod(method) ? (
                "Send Payment First to Continue"
              ) : (
                "Acknowledge BAC Water Notice to Continue"
              )}
            </button>
          </div>
        );
      })()}
    </form>
  );
}
