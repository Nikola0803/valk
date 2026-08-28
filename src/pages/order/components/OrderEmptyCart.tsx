import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";

export default function OrderEmptyCart() {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50"><Navbar /></div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6" style={{ paddingTop: 64 }}>
        <div className="w-16 h-16 flex items-center justify-center" style={{ background: "#f5f4f2" }}>
          <i className="ri-shopping-cart-line text-2xl text-[#bbb]"></i>
        </div>
        <p className="font-black uppercase tracking-widest text-sm text-[#999]">Your cart is empty</p>
        <Link
          to="/shop"
          className="font-black uppercase tracking-widest text-[11px] px-8 py-4 cursor-pointer whitespace-nowrap"
          style={{ background: "#111", color: "#fff" }}
        >
          Browse Products
        </Link>
      </div>
      <FooterSection />
    </div>
  );
}
