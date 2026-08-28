/**
 * Client for the new valkyrie-payments plugin's REST endpoints (CircoFlows card payments).
 *
 * This does NOT talk to CircoFlows directly - card data never touches this app or its
 * server. It calls our own WordPress endpoints, which create the WooCommerce order,
 * recompute the total server-side, and ask CircoFlows for a hosted card_url that the
 * browser is redirected to. See CircoFlows_Payment_Integration_Scope.md for the full flow.
 *
 * Uses the same base host as woocommerce.ts (VITE_WC_URL) since these endpoints live in
 * a plugin on the same WordPress install - no separate env var needed.
 */

const WC_URL = import.meta.env.VITE_WC_URL as string;
const BASE = `${WC_URL}/wp-json/valkyrie/v1/payment`;

export interface CreateSessionLineItem {
  product_id: number;
  quantity: number;
}

export interface CreateSessionPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  line_items: CreateSessionLineItem[];
  customer_note?: string;
  // Validated client-side (validateCoupon() in woocommerce.ts) for UX only - the server
  // re-validates and applies it authoritatively via WooCommerce's own coupon engine
  // (WC_Order::apply_coupon()) before computing the amount charged. Without this, card
  // payments silently ignored any applied coupon and charged full price.
  coupon_code?: string;
  // Logged-in customer's WC id (from getSession() in wcAuth.ts) - undefined for guest
  // checkout, which must keep working. Without this, create_session() never linked the
  // order to any account, so it could never show up in My Account's order history.
  customer_id?: number;
}

export interface CreateSessionResult {
  card_url: string;
  order_id: number;
  merchant_transaction_id: string;
}

export interface PaymentStatusResult {
  status: "pending" | "processing" | "on-hold" | "completed" | "failed" | "cancelled" | string;
  order_number: string;
  // Authoritative values from the real WC order - prefer these over anything carried
  // through localStorage across the CircoFlows redirect, which can go missing (origin
  // mismatch, "clear site data," private window, etc.) without the order itself being
  // affected at all.
  order_total?: string;
  order_tax?: string;
  email?: string;
}

/**
 * Starts a CircoFlows hosted card payment. On success, redirect the browser to
 * `card_url` - do not treat this call's success as payment success, only as
 * "the customer can now go enter their card."
 */
export async function createPaymentSession(
  payload: CreateSessionPayload
): Promise<CreateSessionResult> {
  const res = await fetch(`${BASE}/create-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Could not start card payment (${res.status}).`);
  }

  return res.json() as Promise<CreateSessionResult>;
}

/**
 * Polls order status after the customer returns from CircoFlows's hosted page.
 * The redirect back is NOT proof of payment - only the webhook (server-side,
 * already landed by the time this resolves to "completed"/"failed") is.
 */
export async function getPaymentStatus(
  merchantTransactionId: string
): Promise<PaymentStatusResult> {
  const res = await fetch(
    `${BASE}/status?merchant_transaction_id=${encodeURIComponent(merchantTransactionId)}`
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Could not check payment status (${res.status}).`);
  }

  return res.json() as Promise<PaymentStatusResult>;
}
