const trustItems = [
  { icon: "ri-shield-check-line", label: "3rd Party Lab Tested", color: "#16a34a" },
  { icon: "ri-truck-line", label: "Ships 1–2 Business Days", color: "#111" },
  { icon: "ri-map-pin-line", label: "Made in the USA", color: "#111" },
  { icon: "ri-lock-2-line", label: "Secure Checkout", color: "#111" },
];

export default function ShopTrustStrip() {
  return (
    <div className="w-full border-t border-[#ebebeb] mt-4">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e8e8e8" }}>
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 py-5 bg-white">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-base`} style={{ color: item.color }}></i>
              </div>
              <span className="text-[#444] text-xs font-bold uppercase tracking-wide whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
