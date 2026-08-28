import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "@/components/feature/CartDrawer";
import SearchOverlay from "@/components/feature/SearchOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop Peptides", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Lab Affiliate Program", href: "https://affiliate.valkyriepeptides.com/", external: true },
  { label: "COAs", href: "/coa" },
];

const contactDropdown = {
  label: "Contact Us",
  href: "/contact",
  children: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Vets/First Responders", href: "/veterans" },
    { label: "Blog", href: "/blog" },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="w-full transition-all duration-300"
        style={{
          position: "relative",
          height: 64,
          background: "#e8e8e8",
          borderBottom: "1px solid #d0d0d0",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.08)" : "none",
          boxSizing: "border-box",
        }}
      >
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://valkyriepeptides.com/wp-content/uploads/2024/09/Valkyrie-Horizontal-2-1.webp"
              alt="Warrior Distributions Logo"
              className="h-7 w-auto object-contain"
              style={{ filter: "invert(1)" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333] hover:text-black text-[12px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap uppercase cursor-pointer"
                >
                  {link.label}
                </a>
              ) : link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-[#333] hover:text-black text-[12px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap uppercase cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[#333] hover:text-black text-[12px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap uppercase cursor-pointer"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Contact Us dropdown - also houses FAQs, Vets/First Responders, Blog */}
            <div
              className="relative"
              onMouseEnter={() => setContactOpen(true)}
              onMouseLeave={() => setContactOpen(false)}
            >
              <Link
                to={contactDropdown.href}
                className="flex items-center gap-1 text-[#333] hover:text-black text-[12px] font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap uppercase cursor-pointer"
              >
                {contactDropdown.label}
                <i className="ri-arrow-down-s-line text-sm"></i>
              </Link>
              {contactOpen && (
                <div
                  className="absolute top-full left-0 pt-2 z-50"
                  style={{ minWidth: 180 }}
                >
                  <div style={{ background: "#ffffff", border: "1px solid #e0e0e0", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                    {contactDropdown.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setContactOpen(false)}
                        className="block px-4 py-3 text-[#333] hover:bg-[#f5f5f5] hover:text-black text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap cursor-pointer"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-[#555] hover:text-black transition-colors cursor-pointer"
              aria-label="Search"
            >
              <i className="ri-search-line text-base"></i>
            </button>

            {/* Account */}
            <Link
              to="/my-account"
              className="w-9 h-9 flex items-center justify-center text-[#555] hover:text-black transition-colors cursor-pointer"
              aria-label="My Account"
            >
              <i className="ri-user-line text-base"></i>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-9 h-9 flex items-center justify-center text-[#555] hover:text-black transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <i className="ri-shopping-cart-line text-base"></i>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center text-[9px] font-black text-white rounded-full px-1"
                  style={{ background: "#dc2626" }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <Link
              to="/shop"
              className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-5 py-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ background: "#111111", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#111111"; }}
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile: search + cart + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-[#555] cursor-pointer"
              aria-label="Search"
            >
              <i className="ri-search-line text-lg"></i>
            </button>
            <button
              onClick={openCart}
              className="relative w-8 h-8 flex items-center justify-center text-[#555] cursor-pointer"
              aria-label="Open cart"
            >
              <i className="ri-shopping-cart-line text-lg"></i>
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] flex items-center justify-center text-[8px] font-black text-white rounded-full px-1"
                  style={{ background: "#dc2626" }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center text-[#333] cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu - absolute so it overlays content without changing header height */}
        {mobileOpen && (
          <div style={{ background: "#e8e8e8", borderTop: "1px solid #d0d0d0", position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50 }} className="lg:hidden px-4 md:px-8 py-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-3 text-[#333] hover:text-black text-sm font-semibold uppercase tracking-wide border-b border-gray-100 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ) : link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="block py-3 text-[#333] hover:text-black text-sm font-semibold uppercase tracking-wide border-b border-gray-100 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-[#333] hover:text-black text-sm font-semibold uppercase tracking-wide border-b border-gray-100 transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Contact Us - collapsible, also houses FAQs, Vets/First Responders, Blog */}
            <button
              onClick={() => setMobileContactOpen(!mobileContactOpen)}
              className="w-full flex items-center justify-between py-3 text-[#333] hover:text-black text-sm font-semibold uppercase tracking-wide border-b border-gray-100 transition-colors cursor-pointer"
            >
              {contactDropdown.label}
              <i className={`text-base ${mobileContactOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`}></i>
            </button>
            {mobileContactOpen && (
              <div className="pl-4">
                {contactDropdown.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.href}
                    onClick={() => { setMobileOpen(false); setMobileContactOpen(false); }}
                    className="block py-3 text-[#555] hover:text-black text-sm font-semibold uppercase tracking-wide border-b border-gray-100 transition-colors cursor-pointer"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 text-center text-[11px] font-black uppercase tracking-widest px-5 py-3 cursor-pointer whitespace-nowrap"
              style={{ background: "#111111", color: "#ffffff" }}
            >
              Shop Now
            </Link>
          </div>
        )}
      </header>

      {/* Cart drawer (rendered outside header for correct stacking) */}
      <CartDrawer />

      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}