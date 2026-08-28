import { useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToMailchimp, TAGS } from "@/lib/mailchimp";

export default function FooterSection() {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    const result = await subscribeToMailchimp({ email, tags: [TAGS.newsletter] });
    if (result.ok) { setStatus("success"); setEmail(""); }
    else { setStatus("error"); setErrorMsg(result.message ?? "Something went wrong. Please try again."); }
  };

  return (
    <footer>
      <div
        className="relative overflow-hidden py-16 md:py-24 px-4 md:px-8"
        style={{ background: "#f8f7f5", borderTop: "1px solid #e0e0e0" }}
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">
              Ready to Start?
            </p>
            <h3
              className="font-black uppercase leading-[0.88] tracking-tight mb-6"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                background:
                  "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PREMIUM
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                }}
              >
                PEPTIDES.
              </span>
              <br />
              PROVEN QUALITY.
            </h3>
            <p className="text-[#888] text-sm leading-relaxed max-w-sm">
              Research-grade peptides lyophilized and verified in the USA. Fast
              shipping, full documentation, expert support.
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-sm cursor-pointer whitespace-nowrap transition-all duration-200"
              style={{
                background: "#111111",
                color: "#ffffff",
                padding: "18px 48px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "#333";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "#111111";
              }}
            >
              Shop All Peptides
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ background: "#111111" }}>
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <img
                src="https://valkyriepeptides.com/wp-content/uploads/2024/09/Valkyrie-Horizontal-2-1.webp"
                alt="Warrior Distributions"
                className="h-7 w-auto object-contain mb-6"
              />
              <p className="text-white/50 text-xs leading-relaxed mb-6">
                Premium research-grade peptides engineered for consistency,
                stability, and analytical reliability. All products are for
                research use only.
              </p>
              <div className="flex gap-2.5">
                {[
                  { icon: "ri-facebook-fill", href: "https://facebook.com" },
                  { icon: "ri-instagram-line", href: "https://instagram.com" },
                  { icon: "ri-twitter-x-line", href: "https://x.com" },
                ].map(({ icon, href }) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.14)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.06)";
                    }}
                  >
                    <i className={`${icon} text-white/50 text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-6">
                Help &amp; Support
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "(541)-709-5434", href: "tel:2082439222", a: true },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Return Policy", href: "/return-policy" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  {
                    label: "Research Use Only Policy",
                    href: "/research-use-only",
                  },
                  {
                    label: "Terms & Conditions",
                    href: "/terms-and-conditions",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    {"a" in item ?
                      <a
                        href={item.href}
                        className="text-white/55 hover:text-white/80 text-sm transition-colors cursor-pointer"
                      >
                        {item.label}
                      </a>
                    : <Link
                        to={item.href}
                        className="text-white/55 hover:text-white/80 text-sm transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    }
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Shop All Peptides", href: "/shop" },
                  { label: "COAs", href: "/coa" },
                  { label: "FAQ", href: "/faq" },
                  { label: "About Us", href: "/about" },
                  { label: "Blog / News", href: "/blog" },
                  { label: "Vets/First Responders", href: "/veterans" },
                  { label: "My Account", href: "/my-account" },
                  {
                    label: "Lab Affiliate Program",
                    href: "https://affiliate.valkyriepeptides.com/",
                    external: true,
                  },
                ].map((item) => (
                  <li key={item.label}>
                    {item.external ?
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/55 hover:text-white/80 text-sm transition-colors cursor-pointer"
                      >
                        {item.label}
                      </a>
                    : <Link
                        to={item.href}
                        className="text-white/55 hover:text-white/80 text-sm transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter - direct Mailchimp */}
            <div>
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-2">
                Newsletter
              </h4>
              <p className="text-white/50 text-xs mb-6">
                Sign up to receive our special offers.
              </p>
              {status === "success" ?
                <div
                  className="p-4"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p className="text-green-400 text-sm font-bold flex items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i> Thanks for
                    subscribing!
                  </p>
                </div>
              : <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Your email address"
                    className="px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${status === "error" ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.1)"}`,
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(255,255,255,0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border =
                        status === "error" ?
                          "1px solid rgba(248,113,113,0.6)"
                        : "1px solid rgba(255,255,255,0.1)";
                    }}
                  />
                  {status === "error" && errorMsg && (
                    <p className="text-red-400 text-[11px] flex items-center gap-1">
                      <i className="ri-error-warning-line"></i> {errorMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="font-black uppercase tracking-widest text-xs py-3 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ background: "#ffffff", color: "#111111" }}
                  >
                    {status === "submitting" ?
                      <>
                        <i className="ri-loader-4-line animate-spin text-sm"></i>{" "}
                        Subscribing…
                      </>
                    : "Subscribe"}
                  </button>
                </form>
              }
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-8">
          <p className="text-white/50 text-xs leading-relaxed mb-2">
            <strong className="text-white/65">
              All products sold on this website are intended for research and
              identification purposes only. These products are not intended for
              human dosing, injection, or ingestion.
            </strong>
          </p>
          <p className="text-white/40 text-xs leading-relaxed mb-2">
            The statements made on this website have not been evaluated by the
            US Food and Drug Administration. The statements and the products of
            this company are not intended to diagnose, treat, cure, or prevent
            any disease.
          </p>
          <p className="text-white/40 text-xs leading-relaxed">
            Warrior Distributions is a chemical supplier, not a compounding
            pharmacy or outsourcing facility as defined under 503A or 503B of
            the Federal Food, Drug, and Cosmetic Act.
          </p>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-white/45 text-xs">
              Copyright &copy; 2026{" "}
              <Link to="/" className="hover:text-white/70 transition-colors">
                Warrior Distributions
              </Link>
              . All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-white/35 text-[10px] font-bold uppercase tracking-widest">
                We Accept:
              </span>
              {[
                { label: "Zelle", sub: "509-220-5434" },
                { label: "Cash App", sub: "$warriordistributions" },
                { label: "Venmo", sub: "@warriordistributions" },
              ].map((method) => (
                <div
                  key={method.label}
                  className="flex flex-col items-center px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="text-[9px] font-medium"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {method.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
