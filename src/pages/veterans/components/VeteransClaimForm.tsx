import { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

export default function VeteransClaimForm() {
  const { getToken } = useRecaptcha("veterans_form");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    data.append("recaptcha_token", await getToken());
    try {
      const res = await fetch("https://valkyriepeptides.com/wp-json/valkyrie/v1/veterans", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      if (res.ok) {
        setFormState("success");
        form.reset();
        setCharCount(0);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="claim" className="py-12 md:py-16 px-4 md:px-8" style={{ background: "#f8f7f5" }}>
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Left copy */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Get Your Code</p>
            <h2
              className="font-black uppercase leading-[0.9] tracking-tight mb-5"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(26px, 3vw, 44px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              READY TO CLAIM<br />YOUR 20% OFF?
            </h2>
            <p className="text-[#777] text-sm leading-relaxed mb-8 max-w-sm">
              Fill out the form and we&apos;ll personally verify your service status and send your permanent lifetime discount code within 24–48 hours.
            </p>

            {/* Discount badge */}
            <div className="flex items-center gap-4 p-5 mb-8" style={{ background: "#111", maxWidth: 320 }}>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                <i className="ri-percent-line text-white text-xl"></i>
              </div>
              <div>
                <p className="text-white font-black text-lg leading-none">20% OFF</p>
                <p className="text-white/50 text-[11px] uppercase tracking-widest mt-1">For Life · No Expiration</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              {[
                { icon: "ri-phone-line", label: "(541)-709-5434", href: "tel:2082439222" },
                { icon: "ri-mail-line", label: "support@warriordistributions.com", href: "mailto:support@warriordistributions.com" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                    <i className={`${item.icon} text-white text-sm`}></i>
                  </div>
                  <span className="text-[#555] text-sm font-semibold group-hover:text-[#111] transition-colors break-all">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="p-4" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid #e0e0e0" }}>
              <p className="text-[#777] text-xs leading-relaxed">
                <strong className="text-[#555]">Your privacy is protected.</strong> We only use your contact information to verify your service status and send your discount code. We will never sell or share your information.
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white p-6 md:p-10" style={{ border: "1px solid #e0e0e0" }}>
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center" style={{ background: "#111" }}>
                  <i className="ri-shield-check-fill text-white text-3xl"></i>
                </div>
                <div>
                  <h3 className="font-black text-xl uppercase tracking-tight text-[#111] mb-3">Request Submitted!</h3>
                  <p className="text-[#777] text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you for your service. We&apos;ll review your request and send your personal discount code within 24–48 hours.
                  </p>
                </div>
                <button
                  onClick={() => setFormState("idle")}
                  className="font-black uppercase tracking-widest text-[11px] px-8 py-3 cursor-pointer whitespace-nowrap transition-colors"
                  style={{ background: "#111", color: "#fff" }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-black text-sm uppercase tracking-widest text-[#111] mb-6 md:mb-8">
                  Military &amp; First Responder Discount Request
                </h3>
                <form data-readdy-form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#777]">First Name *</label>
                      <input
                        type="text" name="first_name" required placeholder="John"
                        className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-all"
                        style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#777]">Last Name *</label>
                      <input
                        type="text" name="last_name" required placeholder="Smith"
                        className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-all"
                        style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#777]">Email Address *</label>
                    <input
                      type="email" name="email" required placeholder="john@example.com"
                      className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-all"
                      style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#777]">Service Type *</label>
                    <select
                      name="service_type" required
                      className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-all cursor-pointer"
                      style={{ border: "1px solid #e0e0e0", background: "#fafafa", appearance: "none" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                    >
                      <option value="">Select your service type...</option>
                      <option value="Active Duty Military">Active Duty Military</option>
                      <option value="Veteran">Veteran</option>
                      <option value="Law Enforcement">Law Enforcement / Police Officer</option>
                      <option value="Firefighter">Firefighter</option>
                      <option value="EMT / Paramedic">EMT / Paramedic</option>
                      <option value="Other First Responder">Other First Responder</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#777]">Branch / Department</label>
                    <input
                      type="text" name="branch_department" placeholder="e.g. U.S. Army, NYPD, FDNY..."
                      className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-all"
                      style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#777]">
                      Additional Notes
                      <span className="ml-2 font-normal normal-case tracking-normal text-[#bbb]">({charCount}/500)</span>
                    </label>
                    <textarea
                      name="message" rows={3} maxLength={500}
                      placeholder="Any additional information about your service..."
                      className="w-full px-4 py-3 text-sm text-[#111] outline-none resize-none transition-all"
                      style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
                      onChange={(e) => setCharCount(e.target.value.length)}
                    />
                  </div>

                  {formState === "error" && (
                    <p className="text-red-600 text-xs font-semibold">Something went wrong. Please try again or email us directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full font-black uppercase tracking-widest text-[11px] py-4 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-60"
                    style={{ background: "#111111", color: "#ffffff" }}
                  >
                    {formState === "submitting" ? "Submitting..." : "Submit Discount Request"}
                  </button>

                  <p className="text-[#bbb] text-[10px] text-center leading-relaxed">
                    By submitting, you agree to email us verification documents. Your code will be sent within 24–48 hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
