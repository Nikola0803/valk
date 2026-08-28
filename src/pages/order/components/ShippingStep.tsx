import { US_STATES } from "@/pages/order/orderData";

export interface OrderForm {
  firstName: string; lastName: string; email: string;
  phone: string; address: string; city: string;
  state: string; zip: string; notes: string;
}

interface ShippingStepProps {
  form: OrderForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<OrderForm>>;
  fieldError: string;
  setFieldError: (s: string) => void;
  taxRate: number;
  taxAmount: number;
  handleStep1Continue: () => void;
}

const inputStyle = { background: "#fff", border: "1px solid #e0e0e0" };
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.border = "1px solid #111";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.border = "1px solid #e0e0e0";
};

export default function ShippingStep({
  form, handleChange, setForm, fieldError, setFieldError, taxRate, taxAmount, handleStep1Continue,
}: ShippingStepProps) {
  return (
    <div>
      <h2 className="font-black uppercase tracking-tight text-[#111] text-xl mb-6">Shipping Information</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {([
          { name: "firstName", label: "First Name *",     half: true,  type: "text" },
          { name: "lastName",  label: "Last Name *",      half: true,  type: "text" },
          { name: "email",     label: "Email Address *",  half: false, type: "email" },
          { name: "phone",     label: "Phone Number *",   half: false, type: "tel" },
          { name: "address",   label: "Street Address *", half: false, type: "text" },
          { name: "city",      label: "City *",           half: true,  type: "text" },
        ] as { name: string; label: string; half: boolean; type: string }[]).map(({ name, label, half, type }) => (
          <div key={name} className={half ? "" : "col-span-2"}>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#888] mb-2">{label}</label>
            <input
              name={name} type={type} required
              value={(form as unknown as Record<string, string>)[name]}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm text-[#111] focus:outline-none transition-colors"
              style={inputStyle} onFocus={onFocus} onBlur={onBlur}
            />
          </div>
        ))}

        {/* State dropdown */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-[#888] mb-2">State *</label>
          <select
            name="state" required
            value={form.state}
            onChange={(e) => { setForm((p) => ({ ...p, state: e.target.value })); if (fieldError) setFieldError(""); }}
            className="w-full px-4 py-3 text-sm text-[#111] focus:outline-none transition-colors cursor-pointer"
            style={{ ...inputStyle, appearance: "none" }}
            onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Select state…</option>
            {US_STATES.map(([abbr, name]) => (
              <option key={abbr} value={abbr}>{name}</option>
            ))}
          </select>
        </div>

        {/* ZIP */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-[#888] mb-2">ZIP Code *</label>
          <input
            name="zip" type="text" required
            value={form.zip}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm text-[#111] focus:outline-none transition-colors"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur}
          />
        </div>
      </div>

      {form.state.trim().toUpperCase() === "ID" && (
        <div className="mb-4 px-4 py-3 flex items-center justify-between" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
          <span className="text-[#92400e] text-xs font-semibold flex items-center gap-1.5">
            <i className="ri-information-line"></i>
            Sales tax for ID (6%)
          </span>
          <span className="text-[#92400e] text-xs font-black">${taxAmount.toFixed(2)}</span>
        </div>
      )}

      {fieldError && (
        <p className="mb-4 text-[11px] font-semibold text-red-500 flex items-center gap-1">
          <i className="ri-error-warning-line"></i> {fieldError}
        </p>
      )}

      {/* BAC Water notice */}
      <div className="mb-4 p-4 flex items-start gap-3" style={{ background: "#fff1f1", border: "2px solid #dc2626" }}>
        <i className="ri-error-warning-fill text-red-600 text-base flex-shrink-0 mt-0.5"></i>
        <p className="text-red-700 text-[11px] leading-relaxed">
          <strong className="font-black uppercase tracking-wide">Reconstitution Required:</strong>{" "}
          All peptides are shipped as a lyophilized powder and must be reconstituted with Bacteriostatic Water (BAC Water).
          If you need it,{" "}
          <a href="/products/bac-water-10ml" className="underline font-bold" style={{ color: "#dc2626" }}>
            add it to your cart
          </a>{" "}
          before checking out.
        </p>
      </div>

      <button
        onClick={handleStep1Continue}
        className="w-full font-black uppercase tracking-widest text-[11px] py-4 cursor-pointer whitespace-nowrap"
        style={{ background: "#111", color: "#fff" }}
      >
        Continue to Payment
      </button>
    </div>
  );
}
