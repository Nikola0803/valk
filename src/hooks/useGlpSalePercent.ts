import { useEffect, useState } from "react";
import { getGlpSaleDiscountPercent, loadGlpSaleOverride } from "@/lib/sale";

/**
 * The GLP sale's live discount percent (the wp-admin override if set, else
 * the GLP_SALE_DISCOUNT_PERCENT default) - re-renders once the admin
 * override finishes loading, so a percent changed in wp-admin shows up in
 * the UI even if that fetch resolves after this component's first render.
 */
export function useGlpSalePercent(): number {
  const [percent, setPercent] = useState(getGlpSaleDiscountPercent());

  useEffect(() => {
    let cancelled = false;
    loadGlpSaleOverride().then(() => {
      if (!cancelled) setPercent(getGlpSaleDiscountPercent());
    });
    return () => { cancelled = true; };
  }, []);

  return percent;
}
