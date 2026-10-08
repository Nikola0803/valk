/**
 * The GP line 30%-off sale (formerly branded GLP-1/2/3, now GP-1/2/3 +
 * Cagrilinitide) - the 6 products WooCommerce has marked "Featured".
 * Ends Sunday night at midnight Mountain Time. Mountain Time is UTC-6 in
 * August (MDT, daylight saving in effect) - if this constant ever needs to
 * move outside DST season, double-check the UTC offset (MST is UTC-7).
 */
export const GP_SALE_END = new Date("2026-08-24T06:00:00Z"); // Sun 2026-08-23 midnight MT (= Mon 00:00 MT)
export const GP_SALE_DISCOUNT_PERCENT = 30;

/**
 * The GLP sale - a separate, standalone sale from the GP line sale above
 * (same Featured+on-sale product pool, independent schedule/discount so the
 * two can be run on different timelines). Shows a "Starts in" countdown
 * before GLP_SALE_START, flips to an "Ends in" countdown once live, and
 * renders nothing once GLP_SALE_END passes. Mountain Time is UTC-6 in
 * October (MDT, daylight saving in effect until early November) - if these
 * constants ever move outside DST season, double-check the UTC offset
 * (MST is UTC-7). Bump GLP_SALE_DISCOUNT_PERCENT to change the discount.
 */
export const GLP_SALE_START = new Date("2026-10-09T06:00:00Z"); // Thu 2026-10-08 midnight MT (= Fri 00:00 MT)
export const GLP_SALE_END = new Date("2026-10-16T06:00:00Z"); // Thu 2026-10-15 midnight MT (= Fri 00:00 MT)
export const GLP_SALE_DISCOUNT_PERCENT = 35;

/**
 * Slug prefixes that make a product part of the GLP sale - the GLP-1/2/3
 * line plus Cagrilinitide, at any dose/size. Matched against the slug
 * (lowercased) so every current and future size of these products (e.g.
 * glp-2-tz-10mg, glp-2-tz-60mg) is covered without listing exact slugs.
 */
const GLP_SALE_SLUG_PREFIXES = ["glp-1", "glp-2", "glp-3", "cagril"];

export function isGlpSaleSlug(slug: string): boolean {
  const s = slug.toLowerCase();
  return GLP_SALE_SLUG_PREFIXES.some((prefix) => s.startsWith(prefix));
}

/**
 * Runtime on/off override for the GLP sale, set from wp-admin (Valkyrie
 * Frontend -> GLP Sale) and read from /wp-json/valkyrie/v1/glp-sale -
 * see VROUTER_Glp_Sale in the valkyrie-router plugin. Lets the sale be
 * toggled or have its discount percent changed without a frontend rebuild.
 * "auto" (the default before this loads, and if the fetch fails) falls
 * back to the GLP_SALE_START/GLP_SALE_END dates below.
 */
export type GlpSaleMode = "auto" | "on" | "off";

let glpSaleOverride: { mode: GlpSaleMode; percent: number } | null = null;
let glpSaleOverridePromise: Promise<void> | null = null;

export function loadGlpSaleOverride(): Promise<void> {
  if (glpSaleOverridePromise) return glpSaleOverridePromise;
  glpSaleOverridePromise = (async () => {
    try {
      const wcUrl = import.meta.env.VITE_WC_URL as string | undefined;
      if (!wcUrl) return;
      const res = await fetch(`${wcUrl}/wp-json/valkyrie/v1/glp-sale`);
      if (!res.ok) return;
      const data = (await res.json()) as { mode?: string; percent?: number };
      if (data.mode === "auto" || data.mode === "on" || data.mode === "off") {
        glpSaleOverride = {
          mode: data.mode,
          percent: typeof data.percent === "number" && data.percent > 0 ? data.percent : GLP_SALE_DISCOUNT_PERCENT,
        };
      }
    } catch {
      // Keep the date-based default - no admin override available.
    }
  })();
  return glpSaleOverridePromise;
}
// Kick off immediately at module load, same pattern as coaData.ts's live
// library fetch - by the time product data or UI needs this, it's usually
// already resolved; falls back to the date-based schedule until it is.
loadGlpSaleOverride();

export function isGlpSaleLive(now: Date = new Date()): boolean {
  if (glpSaleOverride?.mode === "on") return true;
  if (glpSaleOverride?.mode === "off") return false;
  return now >= GLP_SALE_START && now < GLP_SALE_END;
}

/** The live discount percent - the wp-admin override if set, else GLP_SALE_DISCOUNT_PERCENT. */
export function getGlpSaleDiscountPercent(): number {
  return glpSaleOverride?.percent ?? GLP_SALE_DISCOUNT_PERCENT;
}

/** The wp-admin override mode, or "auto" if unset/not yet loaded. */
export function getGlpSaleMode(): GlpSaleMode {
  return glpSaleOverride?.mode ?? "auto";
}

/** Applies the live GLP sale discount off a regular price, rounded to cents. */
export function glpSalePrice(regularPrice: number): number {
  const percent = getGlpSaleDiscountPercent();
  return Math.round(regularPrice * (1 - percent / 100) * 100) / 100;
}
