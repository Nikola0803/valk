import { useEffect, useState } from "react";
import { type GlpSaleMode, getGlpSaleMode, loadGlpSaleOverride } from "@/lib/sale";

/**
 * The GLP sale's wp-admin override mode ("auto" follows the scheduled
 * dates, "on"/"off" force it) - re-renders once the override finishes
 * loading. See VROUTER_Glp_Sale in the valkyrie-router plugin.
 */
export function useGlpSaleMode(): GlpSaleMode {
  const [mode, setMode] = useState<GlpSaleMode>(getGlpSaleMode());

  useEffect(() => {
    let cancelled = false;
    loadGlpSaleOverride().then(() => {
      if (!cancelled) setMode(getGlpSaleMode());
    });
    return () => { cancelled = true; };
  }, []);

  return mode;
}
