import { useCountdown } from "@/hooks/useCountdown";
import { useGlpSalePercent } from "@/hooks/useGlpSalePercent";
import { useGlpSaleMode } from "@/hooks/useGlpSaleMode";
import { useGlpSaleDates } from "@/hooks/useGlpSaleDates";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * A duplicate of GpSaleBanner for the standalone GLP sale (see lib/sale.ts) -
 * same slim promo strip, but shows a "Starts in" countdown before
 * GLP_SALE_START and flips to "Ends in" once live. Renders nothing once
 * GLP_SALE_END passes.
 */
export default function GlpSaleBanner() {
  const { start, end } = useGlpSaleDates();
  const startCountdown = useCountdown(start);
  const endCountdown = useCountdown(end);
  const discountPercent = useGlpSalePercent();
  const saleMode = useGlpSaleMode();

  const hasStarted = saleMode === "on" ? true : saleMode === "off" ? false : startCountdown.expired;
  const hasEnded = saleMode === "off" ? true : saleMode === "on" ? false : endCountdown.expired;
  const countdown = hasStarted ? endCountdown : startCountdown;

  if (hasEnded) return null;

  return (
    // #555555 matches the site's existing dark promo strip (MilitaryBanner).
    <div style={{ background: "#555555" }} className="py-4 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1" style={{ background: "#dc2626", color: "#fff" }}>
          Limited Time
        </span>
        <span className="text-white font-black uppercase text-sm tracking-tight">
          {discountPercent}% Off GLP Products
        </span>
        <span className="text-white/40 text-xs">·</span>
        <span className="text-white/70 text-xs font-bold uppercase tracking-widest tabular-nums">
          {hasStarted ? "Ends in" : "Starts in"} {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s
        </span>
      </div>
    </div>
  );
}
