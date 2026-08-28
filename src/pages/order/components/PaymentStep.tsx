import { PAYMENT_LABELS, getPaymentHandle, type PaymentMethod } from "@/pages/order/orderData";

interface PaymentStepProps {
  method: PaymentMethod;
  setMethod: (m: PaymentMethod) => void;
  grandTotal: number;
  setStep: (s: 1 | 2 | 3) => void;
  /** True once a card attempt has declined/failed this session - card becomes unselectable. */
  cardDisabled?: boolean;
}

export default function PaymentStep({ method, setMethod, grandTotal, setStep, cardDisabled }: PaymentStepProps) {
  return (
    <div>
      <h2 className="font-black uppercase tracking-tight text-[#111] text-xl mb-8">Payment Method</h2>
      <p className="text-[#888] text-xs mb-6 leading-relaxed">
        Choose your preferred payment method. Send payment after placing your order - include your name and order number in the note.
      </p>

      {cardDisabled && (
        <div className="mb-6 p-4" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
          <p className="text-[#9a3412] text-xs font-bold leading-relaxed">
            Card payments aren't available for this order right now. Please choose Zelle, Venmo, or Cash App below to complete your purchase.
          </p>
        </div>
      )}

      <div className="space-y-3 mb-8">
        <div
          onClick={() => { if (!cardDisabled) setMethod("card"); }}
          className="flex items-center gap-4 p-5 transition-all"
          style={{
            background: cardDisabled ? "#f5f5f4" : "#fff",
            border: method === "card" && !cardDisabled ? "2px solid #111" : "1px solid #e0e0e0",
            cursor: cardDisabled ? "not-allowed" : "pointer",
            opacity: cardDisabled ? 0.55 : 1,
          }}
        >
          <div
            className="w-5 h-5 flex items-center justify-center flex-shrink-0"
            style={{
              border: `2px solid ${method === "card" && !cardDisabled ? "#111" : "#ccc"}`,
              borderRadius: "50%",
              background: method === "card" && !cardDisabled ? "#111" : "transparent",
            }}
          >
            {method === "card" && !cardDisabled && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
          <div>
            <p className="text-[#111] font-black text-sm uppercase tracking-wide">{PAYMENT_LABELS.card}</p>
            <p className="text-[#888] text-xs mt-0.5">
              {cardDisabled ? "Unavailable for this order" : "Secure checkout - card details never touch our servers"}
            </p>
          </div>
        </div>

        {(["zelle", "venmo", "cashapp"] as PaymentMethod[]).map((m) => (
          <div
            key={m}
            onClick={() => setMethod(m)}
            className="flex items-center gap-4 p-5 cursor-pointer transition-all"
            style={{ background: "#fff", border: method === m ? "2px solid #111" : "1px solid #e0e0e0" }}
          >
            <div
              className="w-5 h-5 flex items-center justify-center flex-shrink-0"
              style={{
                border: `2px solid ${method === m ? "#111" : "#ccc"}`,
                borderRadius: "50%",
                background: method === m ? "#111" : "transparent",
              }}
            >
              {method === m && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <div>
              <p className="text-[#111] font-black text-sm uppercase tracking-wide">{PAYMENT_LABELS[m]}</p>
              <p className="text-[#888] text-xs mt-0.5">{getPaymentHandle(m)} · Warrior Distributions LLC</p>
            </div>
          </div>
        ))}
      </div>

      {method === "card" && !cardDisabled ? (
        <div className="p-5 mb-8" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa] mb-3">You'll pay securely on the next step:</p>
          <div className="flex items-center justify-between">
            <span className="text-[#666] text-xs">Card charged at checkout</span>
            <span className="text-[#111] font-black">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <div className="p-5 mb-8" style={{ background: "#f8f7f5", border: "1px solid #e8e8e8" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#aaa] mb-3">After placing your order, send:</p>
          <div className="flex items-center justify-between">
            <span className="text-[#666] text-xs">{PAYMENT_LABELS[method]} → {getPaymentHandle(method)}</span>
            <span className="text-[#111] font-black">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => { setStep(1); window.scrollTo(0, 0); }}
          className="px-6 py-4 font-black uppercase tracking-widest text-[11px] cursor-pointer whitespace-nowrap"
          style={{ background: "#fff", color: "#111", border: "1px solid #e0e0e0" }}
        >
          Back
        </button>
        <button
          onClick={() => { setStep(3); window.scrollTo(0, 0); }}
          className="flex-1 font-black uppercase tracking-widest text-[11px] py-4 cursor-pointer whitespace-nowrap"
          style={{ background: "#111", color: "#fff" }}
        >
          Review Order
        </button>
      </div>
    </div>
  );
}
