import { useEffect, useState } from "react";

/**
 * "Buy 2 Get 1 Free" promo status - admin-controlled from wp-admin (the
 * Valkyrie Frontend page's "BOGO Sale" panel), not a code deploy. Fetched
 * from a public REST endpoint rather than hardcoded dates (unlike
 * GLP_SALE_START/END in sale.ts) specifically so the store owner can turn
 * it on/off and change the window without waiting on a redeploy - see
 * VROUTER_Bogo in the valkyrie-router plugin, which is the actual
 * authoritative source; everything here is a display-side mirror of that.
 */
export interface BogoStatus {
  enabled: boolean;
  start: string | null; // ISO 8601 UTC
  end: string | null;   // ISO 8601 UTC
  active: boolean;
}

export const BOGO_CATEGORY = "Peptides";
export const BOGO_GROUP_SIZE = 3; // buy 2, 3rd is free
export const BOGO_FEE_LABEL = "Buy 2 Get 1 Free";

const WC_URL = import.meta.env.VITE_WC_URL as string;
const BOGO_ENDPOINT = `${WC_URL}/wp-json/valkyrie/v1/bogo`;

// Module-level cache so every component that wants promo status (banners,
// badges, the cart) shares one fetch instead of each firing its own request.
let cached: BogoStatus | null = null;
let inflight: Promise<BogoStatus> | null = null;

async function fetchBogoStatus(): Promise<BogoStatus> {
  const res = await fetch(BOGO_ENDPOINT);
  if (!res.ok) throw new Error(`BOGO status ${res.status}`);
  return (await res.json()) as BogoStatus;
}

/** Fetches (once, cached) and returns the current BOGO promo status. null while loading or on error. */
export function useBogoStatus(): BogoStatus | null {
  const [status, setStatus] = useState<BogoStatus | null>(cached);

  useEffect(() => {
    if (cached) return;
    let cancelled = false;
    if (!inflight) {
      inflight = fetchBogoStatus().finally(() => { inflight = null; });
    }
    inflight
      .then((result) => {
        cached = result;
        if (!cancelled) setStatus(result);
      })
      .catch(() => { /* promo banner/discount just won't show - not worth surfacing an error for */ });
    return () => { cancelled = true; };
  }, []);

  return status;
}

/**
 * Client-side estimate of the BOGO discount for a cart, mirroring the
 * authoritative server-side calc (vrouter_apply_bogo_order_discount in the
 * valkyrie-router plugin) - every complete group of BOGO_GROUP_SIZE units
 * of the SAME qualifying-category product makes one of them free. Only an
 * estimate for display purposes; the real order total is always enforced
 * server-side regardless of what this computes.
 */
export function calcBogoDiscount(
  items: { category?: string; price: number; quantity: number }[],
  active: boolean
): number {
  if (!active) return 0;
  let discount = 0;
  for (const item of items) {
    if (item.category !== BOGO_CATEGORY) continue;
    const freeUnits = Math.floor(item.quantity / BOGO_GROUP_SIZE);
    if (freeUnits > 0) discount += freeUnits * item.price;
  }
  return Math.round(discount * 100) / 100;
}

/**
 * Per-line cart status: a line that already sits on a completed group
 * boundary (qty 3, 6, ...) has free units applied; otherwise it shows how
 * many more are needed to earn the next free one. Every qualifying line
 * always gets SOME status, either "add N more" or "X free applied" -
 * never silence, so the per-line display and the cart-total discount line
 * never look out of sync with each other.
 */
export type BogoLineStatus =
  | { type: "nudge"; remaining: number }
  | { type: "applied"; freeUnits: number };

export function getBogoLineStatus(
  category: string | undefined,
  qty: number,
  active: boolean
): BogoLineStatus | null {
  if (!active || category !== BOGO_CATEGORY || qty <= 0) return null;
  const remainder = qty % BOGO_GROUP_SIZE;
  if (remainder !== 0) return { type: "nudge", remaining: BOGO_GROUP_SIZE - remainder };
  const freeUnits = Math.floor(qty / BOGO_GROUP_SIZE);
  return freeUnits > 0 ? { type: "applied", freeUnits } : null;
}

/**
 * Dollar amount a line's free unit(s) are worth, given its per-unit price
 * and getBogoLineStatus() result - 0 for a "nudge" status or null. Cart/
 * checkout line totals subtract this from price*qty so the displayed line
 * price is what that line actually costs, not the pre-discount raw total.
 */
export function bogoLineDiscount(unitPrice: number, status: BogoLineStatus | null): number {
  return status?.type === "applied" ? status.freeUnits * unitPrice : 0;
}
