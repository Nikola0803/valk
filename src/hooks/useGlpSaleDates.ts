import { useEffect, useState } from "react";
import { getGlpSaleStart, getGlpSaleEnd, loadGlpSaleOverride } from "@/lib/sale";

/**
 * The GLP sale's actual start/end dates - the wp-admin override (Valkyrie
 * Frontend -> GLP Sale) if set, else the dates built into lib/sale.ts.
 * Re-renders once the override finishes loading, so a date set in
 * wp-admin drives the countdown even if that fetch resolves after this
 * component's first render.
 */
export function useGlpSaleDates(): { start: Date; end: Date } {
  const [dates, setDates] = useState(() => ({ start: getGlpSaleStart(), end: getGlpSaleEnd() }));

  useEffect(() => {
    let cancelled = false;
    loadGlpSaleOverride().then(() => {
      if (!cancelled) setDates({ start: getGlpSaleStart(), end: getGlpSaleEnd() });
    });
    return () => { cancelled = true; };
  }, []);

  return dates;
}
