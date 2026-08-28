/**
 * GA4 ecommerce event tracking via the GTM dataLayer.
 *
 * GTM is already loaded in index.html and initializes window.dataLayer. Every
 * function here pushes a standard GA4 ecommerce event (see
 * https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events)
 * so they show up immediately in GA4 Realtime and populate ecommerce reports.
 *
 * `purchase` is a special case: trackPurchase() below covers the manual-payment
 * flow (Zelle/Venmo/Cash App), which never leaves this SPA. The card/Tagada
 * flow redirects to WooCommerce's own native order-received page instead, so
 * ITS purchase event is fired server-side from tagada-gateway.php's
 * woocommerce_thankyou hook (same dataLayer shape, PHP-side) - this file's
 * trackPurchase() never runs for that flow and must not be called from it.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Minimal shape every product/cart item needs to become a GA4 "item". */
export interface TrackableItem {
  id: number | string;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
}

function toGA4Item(item: TrackableItem, index?: number) {
  return {
    item_id: String(item.id),
    item_name: item.name,
    item_category: item.category ?? "Peptides",
    price: item.price,
    quantity: item.quantity ?? 1,
    ...(index !== undefined ? { index } : {}),
  };
}

function itemsValue(items: TrackableItem[]): number {
  return Math.round(items.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0) * 100) / 100;
}

/** Pushes a GA4 ecommerce event. Clears the previous ecommerce object first,
 * per Google's recommendation, so past event data doesn't leak into this one.
 * Dispatches two ways so it works regardless of setup:
 *  - raw dataLayer push, for GTM (and anything else watching dataLayer)
 *  - gtag() call, since gtag.js itself only reacts to that, not to plain
 *    dataLayer.push({event, ecommerce}) objects. */
function pushEcommerceEvent(eventName: string, ecommerce: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const payload = { currency: "USD", ...ecommerce };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event: eventName, ecommerce: payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}

/** Product list/grid rendered (shop page, related products, search results). */
export function trackViewItemList(items: TrackableItem[], listName: string) {
  if (items.length === 0) return;
  pushEcommerceEvent("view_item_list", {
    item_list_name: listName,
    items: items.map((item, i) => toGA4Item(item, i)),
  });
}

/** A product was clicked from a list. */
export function trackSelectItem(item: TrackableItem, listName: string) {
  pushEcommerceEvent("select_item", {
    item_list_name: listName,
    items: [toGA4Item(item)],
  });
}

/** Product detail page viewed. */
export function trackViewItem(item: TrackableItem) {
  pushEcommerceEvent("view_item", {
    value: item.price,
    items: [toGA4Item(item)],
  });
}

/** Item added to cart (initial add, or a quantity increase). */
export function trackAddToCart(item: TrackableItem, quantity = 1) {
  const tracked = { ...item, quantity };
  pushEcommerceEvent("add_to_cart", {
    value: itemsValue([tracked]),
    items: [toGA4Item(tracked)],
  });
}

/** Item removed from cart entirely, or a quantity decrease. */
export function trackRemoveFromCart(item: TrackableItem, quantity = 1) {
  const tracked = { ...item, quantity };
  pushEcommerceEvent("remove_from_cart", {
    value: itemsValue([tracked]),
    items: [toGA4Item(tracked)],
  });
}

/** Cart drawer/page opened. */
export function trackViewCart(items: TrackableItem[]) {
  if (items.length === 0) return;
  pushEcommerceEvent("view_cart", {
    value: itemsValue(items),
    items: items.map((item, i) => toGA4Item(item, i)),
  });
}

/** Checkout flow started (order page reached with a non-empty cart). */
export function trackBeginCheckout(items: TrackableItem[]) {
  if (items.length === 0) return;
  pushEcommerceEvent("begin_checkout", {
    value: itemsValue(items),
    items: items.map((item, i) => toGA4Item(item, i)),
  });
}

/** Shipping details submitted (step 1 -> step 2 of checkout). */
export function trackAddShippingInfo(items: TrackableItem[], shippingTier = "Flat Rate") {
  if (items.length === 0) return;
  pushEcommerceEvent("add_shipping_info", {
    value: itemsValue(items),
    shipping_tier: shippingTier,
    items: items.map((item, i) => toGA4Item(item, i)),
  });
}

/** Payment method selected (step 2 -> step 3 of checkout). */
export function trackAddPaymentInfo(items: TrackableItem[], paymentType: string) {
  if (items.length === 0) return;
  pushEcommerceEvent("add_payment_info", {
    value: itemsValue(items),
    payment_type: paymentType,
    items: items.map((item, i) => toGA4Item(item, i)),
  });
}

export interface PurchaseParams {
  orderId: string | number;
  value: number;
  tax: number;
  shipping: number;
  paymentType: string;
  coupon?: string;
  items: TrackableItem[];
}

/**
 * Order placed and confirmed (manual-payment flow only - see file header).
 * Call this exactly once, right after the order is successfully created,
 * with the real order number as transaction_id.
 */
export function trackPurchase(params: PurchaseParams) {
  if (params.items.length === 0) return;
  pushEcommerceEvent("purchase", {
    transaction_id: String(params.orderId),
    value: params.value,
    tax: params.tax,
    shipping: params.shipping,
    payment_type: params.paymentType,
    ...(params.coupon ? { coupon: params.coupon } : {}),
    items: params.items.map((item, i) => toGA4Item(item, i)),
  });
}
