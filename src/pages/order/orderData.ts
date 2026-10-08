export type PaymentMethod = "zelle" | "venmo" | "cashapp" | "card";

export const ZELLE_INFO   = { handle: "208-280-3993",       name: "Valkyrie Research LLC" };
export const VENMO_INFO = { handle: "@valkyrie-research", name: "Valkyrie Research LLC" };
export const CASHAPP_INFO = { handle: "$ValkyrieResearch",   name: "Valkyrie Research LLC" };

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  zelle:   "Zelle",
  venmo:   "Venmo",
  cashapp: "Cash App",
  card:    "Credit / Debit Card",
};

/** True for the manual payment methods that need the "I confirm I sent payment" step. */
export function isManualPaymentMethod(m: PaymentMethod): boolean {
  return m !== "card";
}

export function getPaymentHandle(m: PaymentMethod): string {
  if (m === "venmo")   return VENMO_INFO.handle;
  if (m === "cashapp") return CASHAPP_INFO.handle;
  if (m === "card")    return "";
  return ZELLE_INFO.handle;
}

/**
 * Zelle/Venmo/Cash App skip card-processing fees, so they're offered this
 * much cheaper than card - applied to the product subtotal only (not tax/
 * shipping). Shown on checkout whenever a manual method is selected, but
 * its actual effect is zeroed (shows $0.00, still visible) while the GLP
 * sale or BOGO promo already discounts this cart - see discountsLocked in
 * useCart.tsx. Keep in sync with VROUTER_ALT_PAYMENT_DISCOUNT_RATE in the
 * valkyrie-router plugin, which is what actually enforces this server-side.
 */
export const ALT_PAYMENT_DISCOUNT_RATE = 5; // percent

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const SHIPPING_RATE = 9.95;

export const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","Washington D.C."],["FL","Florida"],
  ["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],
  ["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],
  ["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],
  ["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],
  ["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],
  ["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],
  ["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],
  ["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],
  ["WY","Wyoming"],
] as const;

// Tax collected only for Idaho (nexus state). 6% base rate.
export const IDAHO_TAX_RATE = 6;

export function getTaxRate(stateInput: string): number {
  return stateInput.trim().toUpperCase() === "ID" ? IDAHO_TAX_RATE : 0;
}
