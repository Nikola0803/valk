import { useSiteSettings } from "@/hooks/useSiteSettings";

interface FreeShippingBarProps {
  subtotal: number;
}

/** Progress bar toward the free-shipping threshold set in wp-admin -> Valkyrie CMS -> Site Settings. Renders nothing if no threshold is configured. */
export default function FreeShippingBar({ subtotal }: FreeShippingBarProps) {
  const { free_shipping_threshold: threshold } = useSiteSettings();

  if (!threshold || threshold <= 0) return null;

  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  const unlocked = remaining <= 0;

  return (
    <div className="px-1">
      <p className="text-[11px] font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: unlocked ? "#16a34a" : "#555" }}>
        {unlocked ? (
          <><i className="ri-checkbox-circle-fill" /> You&apos;ve unlocked free shipping!</>
        ) : (
          <>Add <span style={{ color: "#111" }}>${remaining.toFixed(2)}</span> more for free shipping</>
        )}
      </p>
      <div className="w-full h-1.5 overflow-hidden" style={{ background: "#e8e8e8" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: unlocked ? "#16a34a" : "#111" }}
        />
      </div>
    </div>
  );
}
