import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { allProducts } from "@/mocks/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length >= 1
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularProducts = allProducts.slice(0, 6);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const displayList = query.trim().length >= 1 ? results : popularProducts;
  const isSearching = query.trim().length >= 1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[300] transition-opacity duration-200"
        style={{
          background: "rgba(0,0,0,0.6)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 left-0 right-0 z-[301]"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          background: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {/* Search bar */}
        <div
          className="max-w-[1320px] mx-auto px-6 md:px-8 flex items-center gap-4"
          style={{ height: 80 }}
        >
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <i className="ri-search-line text-xl text-[#999]"></i>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search peptides, compounds…"
            className="flex-1 text-base font-medium text-[#111] placeholder-[#bbb] outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="w-7 h-7 flex items-center justify-center text-[#aaa] hover:text-[#111] transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="ri-close-circle-line text-lg"></i>
            </button>
          )}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-[#111] transition-colors cursor-pointer whitespace-nowrap ml-2"
          >
            <span>Close</span>
            <span
              className="px-1.5 py-0.5 font-mono text-[9px]"
              style={{ background: "#f0ede8", border: "1px solid #ddd" }}
            >
              ESC
            </span>
          </button>
        </div>

        {/* Results */}
        <div
          className="max-w-[1320px] mx-auto px-6 md:px-8 pb-8 overflow-y-auto"
          style={{ maxHeight: "60vh" }}
        >
          {/* Label */}
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#bbb] mb-5">
            {isSearching
              ? results.length > 0
                ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                : `No results for "${query}"`
              : "Popular Products"}
          </p>

          {/* No results state */}
          {isSearching && results.length === 0 && (
            <div className="py-6 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ background: "#f5f4f2" }}>
                <i className="ri-search-line text-xl text-[#bbb]"></i>
              </div>
              <p className="text-[#999] text-sm font-semibold">No peptides matched your search.</p>
              <p className="text-[#bbb] text-xs mt-1">Try a different keyword or browse all products.</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-block mt-4 font-black uppercase tracking-widest text-[11px] px-6 py-2.5 cursor-pointer whitespace-nowrap"
                style={{ background: "#111", color: "#fff" }}
              >
                Browse All
              </Link>
            </div>
          )}

          {/* Product grid */}
          {displayList.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px" style={{ background: "#e8e8e8" }}>
              {displayList.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  onClick={onClose}
                  className="group flex flex-col bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ background: "#f0ede8", height: 130 }}
                  >
                    {!product.inStock && (
                      <div
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.7)" }}
                      >
                        <span
                          className="text-[8px] font-black uppercase tracking-widest px-2 py-1"
                          style={{ background: "#111", color: "#fff" }}
                        >
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <div className="p-3" style={{ borderTop: "1px solid #ebebeb" }}>
                    <p className="text-[#bbb] text-[8px] uppercase tracking-widest mb-1">{product.category}</p>
                    <p className="text-[#111] font-black text-[10px] uppercase tracking-tight leading-snug mb-1.5 group-hover:text-[#555] transition-colors line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-[#111] font-black text-sm">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View all footer link */}
          {!isSearching && (
            <div className="mt-5 text-center">
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] text-[#555] hover:text-[#111] transition-colors cursor-pointer"
              >
                View all products
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-right-line text-xs"></i>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
