import { useState, useEffect } from "react";
import { subscribeToMailchimp, TAGS } from "@/lib/mailchimp";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface WaitlistModalProps {
  productName: string;
  onClose: () => void;
}

export default function WaitlistModal({ productName, onClose }: WaitlistModalProps) {
  const { getToken } = useRecaptcha("waitlist_form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    const name  = (data.get("name")  as string ?? "").trim();
    const email = (data.get("email") as string ?? "").trim();
    const phone = (data.get("phone") as string ?? "").trim();

    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");

    // 1. Subscribe to Mailchimp with Waitlist tag + product merge field
    const mcResult = await subscribeToMailchimp({
      email,
      firstName,
      lastName,
      tags: [TAGS.waitlist],
      mergeFields: { PHONE: phone, PRODUCT: productName },
    });

    // 2. Also notify WP (for internal records / email to team) - best-effort
    try {
      const body = new URLSearchParams({ name, email, phone, product: productName, recaptcha_token: await getToken() });
      await fetch("https://valkyriepeptides.com/wp-json/valkyrie/v1/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch { /* silent - Mailchimp is the source of truth */ }

    if (mcResult.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(mcResult.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[480px] bg-white" style={{ border: "1px solid #e0e0e0" }}>

        <div className="flex items-start justify-between px-8 pt-8 pb-6" style={{ borderBottom: "1px solid #ebebeb" }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1" style={{ background: "#111111", color: "#fff" }}>Out of Stock</span>
            </div>
            <h2 className="font-black uppercase tracking-tight text-[#111] text-xl leading-tight">JOIN THE WAITLIST</h2>
            <p className="text-[#888] text-xs mt-1.5 leading-relaxed">
              Be the first to know when <strong className="text-[#111]">{productName}</strong> is back in stock.
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#aaa] hover:text-[#111] transition-colors cursor-pointer flex-shrink-0 mt-0.5">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="px-8 py-7">
          {status === "success" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ background: "#f0fff4", border: "1px solid #bbf7d0" }}>
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="font-black uppercase tracking-tight text-[#111] text-lg mb-2">You&apos;re on the list!</h3>
              <p className="text-[#666] text-sm leading-relaxed max-w-[280px]">
                We&apos;ll notify you the moment <strong>{productName}</strong> is back in stock. Keep an eye on your inbox.
              </p>
              <button onClick={onClose} className="mt-6 font-black uppercase tracking-widest text-xs px-8 py-3 cursor-pointer whitespace-nowrap" style={{ background: "#111", color: "#fff" }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="product" value={productName} />

              <div className="mb-4">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#555] mb-2">Full Name *</label>
                <input type="text" name="name" required placeholder="Dr. Jane Smith"
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#555] mb-2">Email Address *</label>
                <input type="email" name="email" required placeholder="jane@researchlab.com"
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#555] mb-2">
                  Phone <span className="text-[#bbb] font-semibold normal-case tracking-normal">(optional)</span>
                </label>
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                />
              </div>

              {status === "error" && (
                <div className="mb-4 px-4 py-3 text-xs text-red-700 font-semibold flex items-center gap-2" style={{ background: "#fff5f5", border: "1px solid #fecaca" }}>
                  <i className="ri-error-warning-line"></i> {errorMsg || "Something went wrong. Please try again."}
                </div>
              )}

              <button type="submit" disabled={status === "submitting"}
                className="w-full font-black uppercase tracking-widest text-sm py-4 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "#111111", color: "#ffffff" }}>
                {status === "submitting"
                  ? <><i className="ri-loader-4-line animate-spin text-base"></i> Submitting…</>
                  : "Notify Me When Available"}
              </button>

              <p className="text-[#bbb] text-[10px] text-center mt-3 leading-relaxed">
                No spam - only a single restock notification. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
