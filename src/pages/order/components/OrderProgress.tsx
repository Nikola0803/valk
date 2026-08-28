interface OrderProgressProps {
  step: 1 | 2 | 3;
}

export default function OrderProgress({ step }: OrderProgressProps) {
  return (
    <div className="w-full bg-white" style={{ borderBottom: "1px solid #e8e8e8" }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-4 flex items-center">
        {[{ n: 1, label: "Shipping" }, { n: 2, label: "Payment" }, { n: 3, label: "Review" }].map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 flex items-center justify-center font-black text-xs"
                style={{ background: step >= s.n ? "#111" : "#e8e8e8", color: step >= s.n ? "#fff" : "#aaa" }}
              >
                {step > s.n ? <i className="ri-check-line text-xs"></i> : s.n}
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest hidden sm:block"
                style={{ color: step >= s.n ? "#111" : "#bbb" }}
              >
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div
                className="w-8 md:w-24 mx-2 md:mx-3"
                style={{ height: 1, background: step > s.n ? "#111" : "#e0e0e0" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
