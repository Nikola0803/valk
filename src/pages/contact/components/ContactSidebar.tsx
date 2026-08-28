import { Link } from "react-router-dom";

const quickLinks = [
  { label: "View All Products", to: "/shop" },
  { label: "FAQs", to: "/faq" },
  { label: "Certificates of Analysis", to: "/coa" },
  { label: "Return Policy", to: "/return-policy" },
];

export default function ContactSidebar() {
  return (
    <div className="bg-white p-10 flex flex-col gap-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-6">Get In Touch</p>

        {/* Phone */}
        <div className="flex gap-4 items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
            <i className="ri-phone-line text-white text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Phone</p>
            <a href="tel:2082439222" className="text-[#111] font-bold text-base hover:text-[#555] transition-colors cursor-pointer">(541)-709-5434</a>
            <p className="text-[#aaa] text-xs mt-1">7 days a week support</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4 items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
            <i className="ri-mail-line text-white text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Email</p>
            <a href="mailto:support@warriordistributions.com" className="text-[#111] font-bold text-sm hover:text-[#555] transition-colors cursor-pointer">support@warriordistributions.com</a>
            <p className="text-[#aaa] text-xs mt-1">We reply within 24 hours</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex gap-4 items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
            <i className="ri-map-pin-line text-white text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Location</p>
            <p className="text-[#111] font-bold text-sm">Boise, Idaho</p>
            <p className="text-[#aaa] text-xs mt-1">United States</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
            <i className="ri-time-line text-white text-base"></i>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-1">Support Hours</p>
            <p className="text-[#111] font-bold text-sm">Mon – Sun</p>
            <p className="text-[#aaa] text-xs mt-1">9:00 AM – 6:00 PM MST</p>
          </div>
        </div>
      </div>

      {/* Military / Vets promo */}
      <div className="p-6" style={{ background: "#111" }}>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Special Discount</p>
        <p className="text-white font-black text-lg leading-snug mb-2">20% Off for Life</p>
        <p className="text-white/55 text-xs leading-relaxed">
          Active Military, Veterans &amp; First Responders receive a permanent 20% discount. Contact us to receive your personal code.
        </p>
      </div>

      {/* Quick links */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-4">Quick Links</p>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <Link key={link.label} to={link.to} className="flex items-center justify-between py-2.5 group cursor-pointer" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <span className="text-[#555] text-sm font-semibold group-hover:text-[#111] transition-colors">{link.label}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line text-[#ccc] text-sm group-hover:text-[#111] transition-colors"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
