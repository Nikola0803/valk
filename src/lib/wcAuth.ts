const WC_URL    = import.meta.env.VITE_WC_URL    as string;
const WC_KEY    = import.meta.env.VITE_WC_KEY    as string;
const WC_SECRET = import.meta.env.VITE_WC_SECRET as string;
const ADMIN_AUTH = `Basic ${btoa(`${WC_KEY}:${WC_SECRET}`)}`;
const BASE_WC    = `${WC_URL}/wp-json/wc/v3`;

export interface WCCustomer {
  id: number; email: string; username: string;
  first_name: string; last_name: string;
  billing: { first_name: string; last_name: string; address_1: string; city: string; state: string; postcode: string; country: string; phone: string; };
}

export interface WCCustomerOrder {
  id: number; number: string; status: string;
  date_created: string; total: string;
  line_items: { name: string; quantity: number; total: string }[];
}

const SESSION_KEY = "vk_auth";

export function getSession(): { customer: WCCustomer } | null {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
export function clearSession() { sessionStorage.removeItem(SESSION_KEY); }
function saveSession(customer: WCCustomer) { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ customer })); }

/** Login via custom /vk/v1/login endpoint - no plugins needed, just our PHP file */
export async function login(email: string, password: string): Promise<WCCustomer> {
  const res = await fetch(`${WC_URL}/wp-json/vk/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Invalid email or password.");
  }
  const customer: WCCustomer = await res.json();
  saveSession(customer);
  return customer;
}

/** Register via WC admin keys */
export async function register(email: string, password: string, firstName: string, lastName: string): Promise<WCCustomer> {
  const res = await fetch(`${BASE_WC}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: ADMIN_AUTH },
    body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName, username: email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.message || "";
    if (msg.includes("already registered") || msg.includes("existing_user_email")) throw new Error("existing_user_email");
    throw new Error(msg || "Registration failed.");
  }
  const customer: WCCustomer = await res.json();
  saveSession(customer);
  return customer;
}

/** Fetch orders via admin keys */
export async function getCustomerOrders(customerId: number): Promise<WCCustomerOrder[]> {
  const res = await fetch(`${BASE_WC}/orders?customer=${customerId}&per_page=20&orderby=date&order=desc`, {
    headers: { Authorization: ADMIN_AUTH },
  });
  if (!res.ok) return [];
  return res.json();
}
