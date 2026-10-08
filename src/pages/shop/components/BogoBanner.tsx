import { useBogoStatus, BOGO_CATEGORY } from "@/lib/bogo";
import { useCountdown } from "@/hooks/useCountdown";

/**
 * Slim promo strip for the top of the Shop page announcing the "Buy 2 Get 1
 * Free" promo - mirrors GlpSaleBanner's look, but driven by the live,
 * admin-controlled status from useBogoStatus() instead of fixed dates, so
 * turning the promo on/off or changing its window (wp-admin -> Valkyrie
 * Frontend -> BOGO Sale) takes effect without a redeploy.
 */
export default function BogoBanner() {
  const status = useBogoStatus();
  if (!status?.active) return null;
  return <BogoBannerCountdown endIso={status.end} />;
}

function BogoBannerCountdown({ endIso }: { endIso: string | null }) {
  const target = endIso ? new Date(endIso) : null;
  const countdown = useCountdown(target ?? new Date());
  if (!target || countdown.expired) return null;

  return (
    <div style={{ background: "#555555" }} className="py-4 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1" style={{ background: "#dc2626", color: "#fff" }}>
          Limited Time
        </span>
        <span className="text-white font-black uppercase text-sm tracking-tight">
          <i className="ri-gift-line" style={{ marginRight: 4 }} />
          Buy 2 Get 1 Free - {BOGO_CATEGORY}
        </span>
        <span className="text-white/40 text-xs">·</span>
        <span className="text-white/70 text-xs font-bold uppercase tracking-widest tabular-nums">
          Ends in {countdown.days}d {String(countdown.hours).padStart(2, "0")}h {String(countdown.minutes).padStart(2, "0")}m
        </span>
      </div>
    </div>
  );
}
