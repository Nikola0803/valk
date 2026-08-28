import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import type { WCCoupon } from "@/lib/woocommerce";
import { trackAddToCart, trackRemoveFromCart } from "@/lib/analytics";

const CART_STORAGE_KEY = "vk_cart_items";
const COUPON_STORAGE_KEY = "vk_cart_coupon";

function loadCartItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function loadCoupon(): AppliedCoupon | null {
  try {
    const raw = localStorage.getItem(COUPON_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppliedCoupon;
  } catch {
    return null;
  }
}

/** Compute the live discount dollar amount against whatever subtotal is now. */
function calcLiveDiscount(coupon: WCCoupon, subtotal: number): number {
  const amt = parseFloat(coupon.amount);
  let discount = 0;
  if (coupon.discount_type === "percent" || coupon.discount_type === "percentage") {
    discount = (subtotal * amt) / 100;
  } else {
    discount = Math.min(amt, subtotal);
  }
  const max = parseFloat(coupon.maximum_amount);
  if (!isNaN(max) && max > 0) discount = Math.min(discount, max);
  return Math.round(discount * 100) / 100;
}

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface AppliedCoupon {
  coupon: WCCoupon;
  discountAmount: number; // frozen snapshot - use cart context's discountAmount for live value
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountAmount: number; // live-computed against current subtotal
  totalPrice: number;
  appliedCoupon: AppliedCoupon | null;
  setCoupon: (c: AppliedCoupon | null) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  couponToast: AppliedCoupon | null;
  dismissCouponToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartItems());
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(() => loadCoupon());
  const [couponToast, setCouponToast] = useState<AppliedCoupon | null>(null);
  const dismissCouponToast = useCallback(() => setCouponToast(null), []);

  // Persist items
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Persist coupon
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon]);

  const addItem = useCallback((product: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...product, quantity: qty }];
    });
    trackAddToCart(product, qty);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => {
      const removed = prev.find((i) => i.id === id);
      if (removed) trackRemoveFromCart(removed, removed.quantity);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (!existing) return prev;
      const delta = qty - existing.quantity;
      if (delta > 0) trackAddToCart(existing, delta);
      if (delta < 0) trackRemoveFromCart(existing, Math.abs(delta));

      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Live discount - recalculated every render against the current subtotal
  const discountAmount = appliedCoupon ? calcLiveDiscount(appliedCoupon.coupon, subtotal) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  // Auto-apply GoAffPro affiliate coupon - runs whenever subtotal changes
  const goaffproApplied = useRef(false);
  const appliedCouponRef = useRef(appliedCoupon);
  useEffect(() => { appliedCouponRef.current = appliedCoupon; }, [appliedCoupon]);

  useEffect(() => {
    if (subtotal === 0 || appliedCouponRef.current || goaffproApplied.current) return;

    let cancelled = false;
    const tryApply = async (attempt = 0) => {
      if (cancelled || goaffproApplied.current || appliedCouponRef.current) return;
      const dcode = localStorage.getItem("dcode");
      console.log(`[GoAffPro] attempt ${attempt} | dcode =`, dcode, "| subtotal =", subtotal);
      if (dcode) {
        const { validateCoupon } = await import("@/lib/woocommerce");
        const result = await validateCoupon(dcode, subtotal);
        console.log("[GoAffPro] validateCoupon result:", result);
        if (result.valid && !cancelled && !appliedCouponRef.current) {
          goaffproApplied.current = true;
          const applied = { coupon: result.coupon, discountAmount: result.discountAmount };
          setAppliedCoupon(applied);
          setCouponToast(applied);
        }
      }
      if (!goaffproApplied.current && attempt < 10) {
        setTimeout(() => tryApply(attempt + 1), 1000);
      }
    };

    tryApply();
    return () => { cancelled = true; };
  }, [subtotal]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
        discountAmount,
        totalPrice,
        appliedCoupon,
        setCoupon: setAppliedCoupon,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        couponToast,
        dismissCouponToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
