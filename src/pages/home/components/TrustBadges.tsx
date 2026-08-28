const badges = [
  { icon: "ri-flask-line", label: "3rd Party Lab Tested" },
  { icon: "ri-map-pin-2-line", label: "Lyophilized in the USA" },
  { icon: "ri-truck-line", label: "Ships in 1–2 Business Days" },
  { icon: "ri-shield-check-line", label: "99%+ Purity Guaranteed" },
  { icon: "ri-lock-2-line", label: "Secure Checkout" },
  { icon: "ri-google-line", label: "Google Reviews" },
];

export default function TrustBadges() {
  return (
    <section style={{ background: "#111111" }} className="px-8 overflow-hidden">
      {/* Trust badges row */}
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-white/10 py-5">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2.5 px-8 py-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${badge.icon} text-white/50 text-sm`}></i>
              </div>
              <span className="text-white/70 text-[11px] font-semibold uppercase tracking-widest whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods row */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1320px] mx-auto py-3 flex flex-wrap items-center justify-center gap-3">
          <span className="text-white/35 text-[10px] font-bold uppercase tracking-widest">We Accept:</span>
          {["Zelle", "Cash App", "Venmo"].map((method) => (
            <span
              key={method}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}