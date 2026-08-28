import { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

export default function ContactForm() {
  const { getToken } = useRecaptcha("contact_form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.message.length > 500) {
      setError("Message cannot exceed 500 characters.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append("name", formData.name);
      params.append("email", formData.email);
      params.append("phone", formData.phone);
      params.append("subject", formData.subject);
      params.append("message", formData.message);
      params.append("recaptcha_token", await getToken());

      const res = await fetch("https://valkyriepeptides.com/wp-json/valkyrie/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-2 bg-white p-10">
      {submitted ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center">
          <div className="w-16 h-16 flex items-center justify-center mb-6" style={{ background: "#111" }}>
            <i className="ri-check-line text-white text-2xl"></i>
          </div>
          <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-3">Message Sent!</h2>
          <p className="text-[#777] text-sm max-w-sm leading-relaxed mb-8">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
            className="font-black uppercase tracking-widest text-xs px-8 py-4 cursor-pointer whitespace-nowrap"
            style={{ background: "#111", color: "#fff" }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Send a Message</p>
            <h2 className="font-black text-2xl uppercase tracking-tight text-[#111]">How Can We Help?</h2>
          </div>

          <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Dr. John Smith"
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = "#fafafa"; }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="john@laboratory.com"
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = "#fafafa"; }}
                />
              </div>
            </div>

            {/* Phone + Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">Phone Number</label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="(208) 000-0000"
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = "#fafafa"; }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">Subject</label>
                <select
                  name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors cursor-pointer appearance-none"
                  style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                >
                  <option value="">Select a topic...</option>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Shipping &amp; Tracking">Shipping &amp; Tracking</option>
                  <option value="Return / Refund">Return / Refund</option>
                  <option value="Military / Vet Discount">Military / Vet Discount</option>
                  <option value="Bulk Pricing">Bulk Pricing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">
                Message <span className="text-red-500">*</span>
                <span className="ml-2 font-normal normal-case tracking-normal text-[#ccc]">({formData.message.length}/500)</span>
              </label>
              <textarea
                name="message" value={formData.message} onChange={handleChange}
                maxLength={500} rows={6}
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors resize-none"
                style={{ border: "1px solid #e0e0e0", background: "#fafafa" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.background = "#fafafa"; }}
              />
            </div>

            {/* Research use disclaimer */}
            <div className="p-4" style={{ background: "#f8f7f5", border: "1px solid #e0e0e0" }}>
              <p className="text-[#999] text-[10px] leading-relaxed uppercase tracking-wide">
                By submitting this form you confirm you are 18+ and that any product inquiries relate to legitimate research use only. Not for human consumption.
              </p>
            </div>

            {error && (
              <p className="text-red-600 text-xs font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full font-black uppercase tracking-widest text-sm py-4 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-60"
              style={{ background: "#111111", color: "#ffffff" }}
              onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#333"; }}
              onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#111"; }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
