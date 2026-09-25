/**
 * Buy 2 Get 1 Free deal configuration.
 * BOGO_COUPON_CODE must match a coupon code in WooCommerce. Update it here
 * if the code ever changes — it is displayed in the cart and order sidebar.
 * Set BOGO_END to the offer expiry; the UI hides automatically once it passes.
 */
export const BOGO_END = new Date("2026-12-31T08:00:00Z"); // Dec 31 midnight MT

// WooCommerce coupon code the customer applies at checkout to claim the free bottle.
export const BOGO_COUPON_CODE = "BOGO";

// Total items in cart required to qualify (2 paid + 1 free = 3).
export const BOGO_QUALIFY_QTY = 3;
