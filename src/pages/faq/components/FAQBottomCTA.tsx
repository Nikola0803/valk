import { Link } from "react-router-dom";

const ctaItems = [
  { icon: "ri-phone-line", title: "Call Us", desc: "(541)-709-5434", sub: "7 days a week", href: "tel:2082439222", isExternal: true },
  { icon: "ri-file-list-3-line", title: "View COAs", desc: "Certificates of Analysis", sub: "All products tested", href: "/coa", isExternal: false },
  { icon: "ri-shopping-cart-line", title: "Shop Now", desc: "All 20 Peptides", sub: "Free US shipping available", href: "/shop", isExternal: false },
];

export default function FAQBottomCTA() {
  return (
    <div className="px-8 pb-20">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
          {ctaItems.map((item) =>
            item.isExternal ? (
              <a key={item.title} href={item.href} className="flex items-center gap-5 px-8 py-7 bg-white hover:bg-[#fafafa] transition-colors cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                  <i className={`${item.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-tight text-[#111]">{item.title}</p>
                  <p className="text-[#444] text-sm font-semibold mt-0.5">{item.desc}</p>
                  <p className="text-[#aaa] text-xs mt-0.5">{item.sub}</p>
                </div>
              </a>
            ) : (
              <Link key={item.title} to={item.href} className="flex items-center gap-5 px-8 py-7 bg-white hover:bg-[#fafafa] transition-colors cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                  <i className={`${item.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-tight text-[#111]">{item.title}</p>
                  <p className="text-[#444] text-sm font-semibold mt-0.5">{item.desc}</p>
                  <p className="text-[#aaa] text-xs mt-0.5">{item.sub}</p>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
