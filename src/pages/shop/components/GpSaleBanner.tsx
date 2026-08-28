import { useCountdown } from "@/hooks/useCountdown";
import { GP_SALE_END, GP_SALE_DISCOUNT_PERCENT } from "@/lib/sale";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Slim promo strip for the top of the Shop page pointing at the GP line sale -
 * the products themselves already show a "Sale" badge + strikethrough price
 * in the grid below (see ShopProductGrid), so this is just the countdown/CTA,
 * not a second product grid. Renders nothing once GP_SALE_END passes.
 */
export default function GpSaleBanner() {
  const countdown = useCountdown(GP_SALE_END);
  if (countdown.expired) return null;

  return (
    // #555555 matches the site's existing dark promo strip (MilitaryBanner) -
    // not pure black, so it doesn't read as a second hero section.
    <div style={{ background: "#555555" }} className="py-4 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1" style={{ background: "#dc2626", color: "#fff" }}>
          Limited Time
        </span>
        <span className="text-white font-black uppercase text-sm tracking-tight">
          {GP_SALE_DISCOUNT_PERCENT}% Off The GP Line
        </span>
        <span className="text-white/40 text-xs">·</span>
        <span className="text-white/70 text-xs font-bold uppercase tracking-widest tabular-nums">
          Ends in {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s
        </span>
      </div>
    </div>
  );
}
