export type PaymentMethod = "zelle" | "venmo" | "cashapp" | "card";

export const ZELLE_INFO   = { handle: "509-220-5434",       name: "Warrior Distributions LLC" };
export const VENMO_INFO = { handle: "@warriordistributions", name: "Warrior Distributions LLC" };
export const CASHAPP_INFO = { handle: "$warriordistributions",   name: "Warrior Distributions LLC" };

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
