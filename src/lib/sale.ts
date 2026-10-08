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
