import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import FreeShippingBar from "@/components/feature/FreeShippingBar";
import CartUpsellRail from "@/components/feature/CartUpsellRail";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const navigate = useNavigate();
  const { items, removeItem, updateQty, subtotal, discountAmount, totalPrice, appliedCoupon } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }} className="max-w-[1320px] mx-auto px-4 md:px-8 py-10 md:py-16">
        <h1 className="font-black uppercase tracking-tight text-[#111] mb-2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(28px, 4vw, 42px)" }}>
          Your Cart
        </h1>
        <p className="text-[#888] text-sm mb-8">{items.length} {items.length === 1 ? "item" : "items"}</p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4" style={{ background: "#fafafa", border: "1px solid #e8e8e8" }}>
            <div className="w-16 h-16 flex items-center justify-center" style={{ background: "#f0ede8" }}>
              <i className="ri-shopping-cart-line text-2xl text-[#bbb]"></i>
            </div>
            <p className="font-black uppercase tracking-widest text-xs text-[#999]">Your cart is empty</p>
            <Link to="/shop" className="mt-2 font-black uppercase tracking-widest text-[11px] px-6 py-3 cursor-pointer whitespace-nowrap" style={{ background: "#111", color: "#fff" }}>
              Shop Peptides
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Line items */}
            <div className="lg:col-span-2">
              <div className="mb-6 p-5" style={{ background: "#fafafa", border: "1px solid #e8e8e8" }}>
                <FreeShippingBar subtotal={subtotal} />
              </div>

              <div style={{ borderTop: "1px solid #ebebeb" }}>
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-5 py-6" style={{ borderBottom: "1px solid #ebebeb" }}>
                    <Link to={`/products/${item.slug}`} className="flex-shrink-0 flex items-center justify-center cursor-pointer" style={{ width: 96, height: 96, background: "#f0ede8", border: "1px solid #e8e8e8" }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-3" style={{ mixBlendMode: "multiply" }} />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.slug}`} className="block cursor-pointer">
                        <p className="text-[#aaa] text-[9px] uppercase tracking-widest mb-1">Research Grade</p>
                        <p className="text-[#111] font-black text-sm uppercase tracking-tight leading-snug mb-3 hover:text-[#555] transition-colors">{item.name}</p>
                      </Link>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-stretch" style={{ border: "1px solid #e0e0e0" }}>
                          <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-9 h-8 flex items-center justify-center text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer font-bold text-sm">−</button>
                          <div className="w-9 h-8 flex items-center justify-center text-[#111] font-bold text-xs border-x" style={{ borderColor: "#e0e0e0" }}>{item.quantity}</div>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-9 h-8 flex items-center justify-center text-[#555] hover:bg-[#f5f5f5] transition-colors cursor-pointer font-bold text-sm">+</button>
                        </div>
                        <span className="font-black text-base text-[#111]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="w-7 h-7 flex items-center justify-center text-[#bbb] hover:text-[#dc2626] transition-colors cursor-pointer flex-shrink-0 mt-0.5">
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="font-black uppercase tracking-widest text-xs text-[#111] mb-4">You Might Also Like</p>
                <CartUpsellRail limit={8} variant="row" />
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 sticky top-24" style={{ background: "#fafafa", border: "1px solid #e8e8e8" }}>
                <p className="font-black uppercase tracking-widest text-xs text-[#111] mb-5">Order Summary</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#888] text-xs font-semibold uppercase tracking-widest">Subtotal</span>
                    <span className="text-[#111] font-bold text-sm">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 text-xs font-semibold uppercase tracking-widest">Discount</span>
                      <span className="text-green-600 font-bold text-sm">−${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #e0e0e0" }}>
                    <span className="text-[#888] text-xs font-semibold uppercase tracking-widest">Total</span>
                    <span className="text-[#111] font-black text-xl">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-[#bbb] text-[10px] mb-5">Shipping calculated at checkout.</p>

                <button
                  onClick={() => navigate("/order")}
                  className="w-full font-black uppercase tracking-widest text-[11px] py-4 cursor-pointer whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ background: "#111111", color: "#ffffff" }}
                >
                  Proceed to Order
                  <i className="ri-arrow-right-line text-xs"></i>
                </button>

                <Link to="/shop" className="block w-full mt-3 font-bold uppercase tracking-widest text-[11px] py-3 cursor-pointer whitespace-nowrap text-[#555] hover:text-[#111] transition-colors text-center">
                  Continue Shopping
                </Link>

                <div className="mt-4 pt-4" style={{ borderTop: "1px solid #e0e0e0" }}>
                  <p className="text-[#bbb] text-[10px] font-bold uppercase tracking-widest mb-3 text-center">We Accept</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {["Zelle", "Cash App", "Venmo", "Credit Card", "Apple Pay"].map((method) => (
                      <span key={method} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ background: "#fff", border: "1px solid #e0e0e0", color: "#888" }}>
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
