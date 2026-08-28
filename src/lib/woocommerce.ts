/**
 * WooCommerce REST API client for Warrior Distributions
 *
 * Keys live in .env:
 *   VITE_WC_URL          = https://your-wp-site.com
 *   VITE_WC_KEY          = ck_...
 *   VITE_WC_SECRET       = cs_...
 */

const WC_URL    = import.meta.env.VITE_WC_URL    as string;
const WC_KEY    = import.meta.env.VITE_WC_KEY    as string;
const WC_SECRET = import.meta.env.VITE_WC_SECRET as string;

// Base64-encode key:secret for Basic Auth
const WC_AUTH = btoa(`${WC_KEY}:${WC_SECRET}`);

const BASE = `${WC_URL}/wp-json/wc/v3`;

// Types

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  status: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  featured: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  meta_data: { key: string; value: string }[];
}

export interface WCOrderLine {
  product_id: number;
  quantity: number;
  name?: string;
  subtotal?: string;
  total?: string;
}

export interface WCOrderPayload {
  payment_method: string;           // "zelle" | "cashapp" | "venmo"
  payment_method_title: string;
  set_paid: false;                  // always false - pending manual confirmation
  status: "pending" | "on-hold";
  // Logged-in customer's WC id (from getSession() in wcAuth.ts) - undefined for guest
  // checkout, which must keep working. WooCommerce's own /wc/v3/orders endpoint accepts
  // this natively. Without it, orders never linked to any account - see
  // Valkyrie_Task_Tracker.md, "No Orders Showing for Users."
  customer_id?: number;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: WCOrderLine[];
  coupon_lines?: { code: string }[];
  shipping_lines?: { method_title: string; method_id: string; total: string }[];
  fee_lines?: { name: string; total: string; tax_class: string; tax_status: string }[];
  customer_note?: string;
  meta_data?: { key: string; value: string }[];
}

export interface WCOrder {
  id: number;
  number: string;
  status: string;
  total: string;
  currency: string;
  billing: WCOrderPayload["billing"];
  line_items: (WCOrderLine & { id: number })[];
  date_created: string;
}

// Helpers

async function wcFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${WC_AUTH}`,
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WC API ${res.status} - ${path}\n${body}`);
  }

  return res.json() as Promise<T>;
}

// Products

/**
 * Fetch all published simple products, paginated automatically.
 * Returns a flat array of all products.
 */
export async function getAllProducts(perPage = 50): Promise<WCProduct[]> {
  const results: WCProduct[] = [];
  let page = 1;

  while (true) {
    const batch = await wcFetch<WCProduct[]>(
      `/products?status=publish&per_page=${perPage}&page=${page}&orderby=menu_order&order=asc`
    );
    results.push(...batch);
    if (batch.length < perPage) break;
    page++;
  }

  return results;
}

/**
 * Fetch top-selling published products (WC's own `total_sales` ranking).
 * Used to power cart upsell rails.
 */
export async function getBestSellingProducts(perPage = 8): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>(`/products?status=publish&per_page=${perPage}&orderby=popularity&order=desc`);
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const results = await wcFetch<WCProduct[]>(`/products?slug=${encodeURIComponent(slug)}&status=publish`);
  return results[0] ?? null;
}

/**
 * Fetch a single product by numeric ID.
 */
export async function getProductById(id: number): Promise<WCProduct> {
  return wcFetch<WCProduct>(`/products/${id}`);
}

// Reviews

export interface WCReview {
  id: number;
  date_created: string;
  review: string;         // HTML string
  rating: number;         // 1–5
  name: string;
  email: string;
  verified: boolean;
  reviewer_avatar_urls: Record<string, string>;
}

/**
 * Fetch approved reviews for a specific product by product ID.
 * Returns up to `perPage` reviews sorted by date descending.
 */
export async function getProductReviews(
  productId: number,
  perPage = 10
): Promise<WCReview[]> {
  return wcFetch<WCReview[]>(
    `/products/reviews?product=${productId}&status=approved&per_page=${perPage}&orderby=date_gmt&order=desc`
  );
}

export interface WCReviewPayload {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
}

/**
 * Submit a new product review. WooCommerce puts it in "pending" (held for
 * moderation) by default - the shop owner approves it in WP Admin.
 */
export async function submitProductReview(
  payload: WCReviewPayload
): Promise<WCReview> {
  return wcFetch<WCReview>("/products/reviews", {
    method: "POST",
    body: JSON.stringify({ ...payload, status: "approved" }),
  });
}

// Orders

/**
 * Create a WooCommerce order with status = pending.
 * Payment method is stored in payment_method + meta so the admin can
 * see at a glance which app was used and manually mark paid.
 */
export async function createOrder(payload: WCOrderPayload): Promise<WCOrder> {
  return wcFetch<WCOrder>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update an existing order's status.
 * e.g. "processing" once Zelle payment is confirmed.
 */
export async function updateOrderStatus(
  orderId: number,
  status: "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded"
): Promise<WCOrder> {
  return wcFetch<WCOrder>(`/orders/${orderId}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

/**
 * Add a note to an order (visible to admin only by default).
 */
export async function addOrderNote(
  orderId: number,
  note: string,
  customerNote = false
): Promise<{ id: number; note: string }> {
  return wcFetch(`/orders/${orderId}/notes`, {
    method: "POST",
    body: JSON.stringify({ note, customer_note: customerNote }),
  });
}

// Coupons

export interface WCCoupon {
  id: number;
  code: string;
  discount_type: "percentage" | "percent" | "fixed_cart" | "fixed_product";
  amount: string;           // e.g. "20" for 20% or $20
  date_expires: string | null;
  usage_count: number;
  usage_limit: number | null;
  minimum_amount: string;
  maximum_amount: string;
  individual_use: boolean;
  free_shipping: boolean;
}

export interface CouponResult {
  valid: true;
  coupon: WCCoupon;
  discountAmount: number;   // calculated dollar discount given a subtotal
  discountedTotal: number;
}

export interface CouponError {
  valid: false;
  message: string;
}

/**
 * Validates a coupon code against WooCommerce and calculates
 * the discount amount for the given cart subtotal.
 */
export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponResult | CouponError> {
  try {
    const results = await wcFetch<WCCoupon[]>(
      `/coupons?code=${encodeURIComponent(code.trim().toLowerCase())}&per_page=1`
    );

    if (!results.length) {
      return { valid: false, message: "Coupon code not found." };
    }

    const coupon = results[0];

    // Expiry check
    if (coupon.date_expires) {
      const expires = new Date(coupon.date_expires);
      if (expires < new Date()) {
        return { valid: false, message: "This coupon has expired." };
      }
    }

    // Usage limit check
    if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
      return { valid: false, message: "This coupon has reached its usage limit." };
    }

    // Minimum order check
    const min = parseFloat(coupon.minimum_amount);
    if (!isNaN(min) && min > 0 && subtotal < min) {
      return {
        valid: false,
        message: `Minimum order of $${min.toFixed(2)} required for this coupon.`,
      };
    }

    // Calculate discount
    let discountAmount = 0;
    const amt = parseFloat(coupon.amount);

    if (coupon.discount_type === "percent" || coupon.discount_type === "percentage") {
      discountAmount = (subtotal * amt) / 100;
    } else {
      // fixed_cart or fixed_product - treat as flat dollar off
      discountAmount = Math.min(amt, subtotal);
    }

    // Cap by maximum_amount if set
    const max = parseFloat(coupon.maximum_amount);
    if (!isNaN(max) && max > 0) {
      discountAmount = Math.min(discountAmount, max);
    }

    discountAmount = Math.round(discountAmount * 100) / 100;

    return {
      valid: true,
      coupon,
      discountAmount,
      discountedTotal: Math.max(0, subtotal - discountAmount),
    };
  } catch {
    return { valid: false, message: "Could not validate coupon. Please try again." };
  }
}

// Normalizer

/**
 * Extracts the content amount (e.g. "100mg", "10ml") from a product slug or name.
 * Matches the last number+unit pattern (mg, ml, mcg, iu, g) in the slug.
 * This is how all Warrior products are named: "pt-141-10mg", "bac-water-10ml".
 * No WooCommerce attribute setup required - works automatically for every product.
 */
function extractContent(slug: string, name: string): string | null {
  const pattern = /(\d+(?:\.\d+)?(?:mg|ml|mcg|iu|g))\b/gi;
  const slugMatches = [...slug.matchAll(pattern)];
  const nameMatches = [...name.matchAll(pattern)];
  const match = slugMatches.at(-1) ?? nameMatches.at(-1);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Converts a WCProduct into the shape the existing codebase uses
 * (compatible with allProducts / bestSellers arrays and useCart).
 */
export function normalizeProduct(p: WCProduct) {
  const content = extractContent(p.slug, p.name);

  // Read Warrior tab meta written by import-product-tabs.php
  const metaCoa      = p.meta_data.find((m) => m.key === "_warrior_coa_images")?.value ?? "";
  const metaInfo     = p.meta_data.find((m) => m.key === "_warrior_additional_info")?.value ?? "";
  const purityPdf    = (p.meta_data.find((m) => m.key === "_warrior_coa_purity_pdf")?.value as string) ?? "";
  const endotoxinPdf = (p.meta_data.find((m) => m.key === "_warrior_coa_endotoxin_pdf")?.value as string) ?? "";

  let coaImages: string[] = [];
  try {
    if (metaCoa) coaImages = JSON.parse(metaCoa as string);
  } catch { /* ignore */ }

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.categories[0]?.name ?? "Peptides",
    price: parseFloat(p.price) || 0,
    originalPrice: parseFloat(p.regular_price) || parseFloat(p.price) || 0,
    onSale: !!p.on_sale,
    featured: !!p.featured,
    image: p.images[0]?.src ?? "/placeholder.png",
    images: p.images.map((img) => img.src),
    inStock: p.stock_status === "instock",
    description: p.description,
    shortDescription: p.short_description,
    sku: p.sku,
    content,
    coaImages,
    additionalInfo: (metaInfo as string),
    purityPdfUrl: purityPdf,
    endotoxinPdfUrl: endotoxinPdf,
  };
}

export type NormalizedProduct = ReturnType<typeof normalizeProduct>;