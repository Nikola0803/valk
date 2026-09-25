import { Link } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { BOGO_END } from "@/lib/bogo";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[40px]">
      <span className="font-black text-2xl md:text-3xl tabular-nums text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-[#666] mt-1">{label}</span>
    </div>
  );
}

/** Full-width dark banner advertising the Buy 2 Get 1 Free deal. Hides automatically once BOGO_END passes. */
export default function BogoSection() {
  const countdown = useCountdown(BOGO_END);
  if (countdown.expired) return null;

  return (
    <section style={{ background: "#111" }} className="py-16 md:py-20 px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: headline + CTA */}
          <div>
            <span className="inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1.5 mb-5" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
              Limited Time Deal
            </span>
            <h2 className="font-black uppercase leading-[0.88] tracking-tight text-white mb-5" style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>
              Buy 2,<br />Get 1 Free
            </h2>
            <p className="text-[#777] text-sm leading-relaxed mb-8 max-w-sm">
              Add any 3 research peptides to your cart and pay for only 2. No minimum spend.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-[11px] px-8 py-4 transition-all duration-200 whitespace-nowrap"
              style={{ background: "#ffffff", color: "#111" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#e5e5e5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
            >
              Shop Peptides
              <i className="ri-arrow-right-line text-xs"></i>
            </Link>
          </div>

          {/* Right: countdown */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#555]">Offer ends in</span>
            <div className="flex items-center gap-4 md:gap-6">
              <CountdownUnit value={countdown.days}    label="Days" />
              <span className="text-[#333] text-2xl font-black -mt-4">:</span>
              <CountdownUnit value={countdown.hours}   label="Hrs" />
              <span className="text-[#333] text-2xl font-black -mt-4">:</span>
              <CountdownUnit value={countdown.minutes} label="Min" />
              <span className="text-[#333] text-2xl font-black -mt-4">:</span>
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
