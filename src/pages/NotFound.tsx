import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4" style={{ background: "#f8f7f5" }}>
      <h1 className="absolute bottom-0 left-0 right-0 text-9xl md:text-[12rem] font-black select-none pointer-events-none z-0" style={{ color: "#ebebeb" }}>
        404
      </h1>
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">Page Not Found</p>
        <h2 className="font-black uppercase text-[#111] mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(28px, 4vw, 48px)" }}>
          Oops. Nothing Here.
        </h2>
        <p className="text-[#888] text-sm mb-2 max-w-sm leading-relaxed">
          The page <span className="font-mono text-[#555]">{location.pathname}</span> doesn't exist.
        </p>
        <p className="text-[#bbb] text-xs mb-8">It may have been moved or the URL is incorrect.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="font-black uppercase tracking-widest text-[11px] px-8 py-4 whitespace-nowrap transition-all duration-200"
            style={{ background: "#111111", color: "#ffffff" }}
          >
            ← Back to Home
          </Link>
          <Link
            to="/shop"
            className="font-black uppercase tracking-widest text-[11px] px-8 py-4 whitespace-nowrap transition-all duration-200"
            style={{ background: "#ffffff", color: "#111111", border: "1px solid #e0e0e0" }}
          >
            Shop Peptides
          </Link>
        </div>
      </div>
    </div>
  );
}