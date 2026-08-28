const trustItems = [
  { icon: "ri-shield-check-line", label: "3rd Party Lab Tested", color: "#16a34a" },
  { icon: "ri-truck-line", label: "Ships 1–2 Business Days", color: "#111" },
  { icon: "ri-map-pin-line", label: "Made in the USA", color: "#B22234" },
  { icon: "ri-lock-2-line", label: "Secure Checkout", color: "#111" },
];

export default function AboutTrustBar() {
  return (
    <section style={{ background: "#f8f7f5", borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0" }}>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }}>
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 py-4 bg-white text-center sm:text-left">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`${item.icon} text-base`} style={{ color: item.color }}></i>
              </div>
              <span className="text-[#444] text-[10px] sm:text-xs font-bold uppercase tracking-wide leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
