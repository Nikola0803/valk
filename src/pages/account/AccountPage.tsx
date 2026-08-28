import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import {
  login, register, clearSession, getSession, getCustomerOrders,
  type WCCustomer, type WCCustomerOrder,
} from "@/lib/wcAuth";

type View = "login" | "register" | "account";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  "pending":    { label: "Pending",    color: "#f59e0b" },
  "on-hold":    { label: "On Hold",    color: "#6366f1" },
  "processing": { label: "Processing", color: "#3b82f6" },
  "completed":  { label: "Completed",  color: "#10b981" },
  "cancelled":  { label: "Cancelled",  color: "#ef4444" },
  "refunded":   { label: "Refunded",   color: "#8b5cf6" },
};

function Hero({ title }: { title: string }) {
  return (
    <div className="w-full py-10 md:py-12 px-4 md:px-8" style={{ background: "#111" }}>
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Warrior Distributions</p>
        <h1 className="font-black uppercase tracking-tight leading-none" style={{
          fontSize: "clamp(28px,4vw,52px)",
          background: "linear-gradient(135deg,#888 0%,#c0c0c0 30%,#606060 55%,#aaa 75%,#777 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>{title}</h1>
      </div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange, required, placeholder }: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#555]">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 text-sm border text-[#111] outline-none transition-all"
        style={{ border: "1px solid #e0e0e0", background: "#fff" }}
        onFocus={e => (e.currentTarget.style.borderColor = "#111")}
        onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
      />
    </div>
  );
}

function LoginForm({ onSuccess, onSwitch }: { onSuccess: (c: WCCustomer) => void; onSwitch: () => void }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true); setError("");
    try {
      const customer = await login(email, password);
      onSuccess(customer);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-[480px] mx-auto">
      <h2 className="font-black uppercase text-[#111] text-xl tracking-tight mb-2">Sign In</h2>
      <p className="text-[#888] text-sm mb-8">Access your orders and account details.</p>

      <form onSubmit={handle} className="flex flex-col gap-5">
        <Input label="Email Address" type="email" value={email} onChange={setEmail} required />
        <Input label="Password" type="password" value={password} onChange={setPassword} required />

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-red-700" style={{ background: "#fff5f5", border: "1px solid #fca5a5" }}>
            <i className="ri-error-warning-line flex-shrink-0"></i> {error}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-4 font-black text-[11px] uppercase tracking-[0.1em] text-white transition-colors"
          style={{ background: loading ? "#555" : "#111" }}>
          {loading ? "Signing In…" : "Sign In"}
        </button>
      </form>

      <p className="text-sm text-[#888] mt-6 text-center">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="font-bold text-[#111] underline underline-offset-2">Create one</button>
      </p>
    </div>
  );
}

function RegisterForm({ onSuccess, onSwitch }: { onSuccess: (c: WCCustomer) => void; onSwitch: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    setLoading(true); setError("");
    try {
      const customer = await register(email, password, firstName, lastName);
      onSuccess(customer);
    } catch (err) {
      const msg = (err as Error).message;
      if (msg.includes("existing_user_email") || msg.includes("already registered")) {
        setError("An account with this email already exists. Please sign in.");
      } else {
        setError("Could not create account. Please try again.");
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-[480px] mx-auto">
      <h2 className="font-black uppercase text-[#111] text-xl tracking-tight mb-2">Create Account</h2>
      <p className="text-[#888] text-sm mb-8">Join Warrior Distributions for faster checkout and order tracking.</p>

      <form onSubmit={handle} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" value={firstName} onChange={setFirstName} required />
          <Input label="Last Name"  value={lastName}  onChange={setLastName}  required />
        </div>
        <Input label="Email Address" type="email"    value={email}    onChange={setEmail}    required />
        <Input label="Password"      type="password" value={password} onChange={setPassword} required placeholder="Min. 8 characters" />
        <Input label="Confirm Password" type="password" value={confirm} onChange={setConfirm} required />

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-red-700" style={{ background: "#fff5f5", border: "1px solid #fca5a5" }}>
            <i className="ri-error-warning-line flex-shrink-0"></i> {error}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-4 font-black text-[11px] uppercase tracking-[0.1em] text-white transition-colors"
          style={{ background: loading ? "#555" : "#111" }}>
          {loading ? "Creating Account…" : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-[#888] mt-6 text-center">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-bold text-[#111] underline underline-offset-2">Sign in</button>
      </p>
    </div>
  );
}

function OrderRow({ order }: { order: WCCustomerOrder }) {
  const [open, setOpen] = useState(false);
  const st = STATUS_LABELS[order.status] ?? { label: order.status, color: "#888" };
  const date = new Date(order.date_created).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div style={{ border: "1px solid #e8e8e8", background: "#fff" }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ background: "none", cursor: "pointer" }}>
        <div className="flex items-center gap-4">
          <span className="font-black text-[#111] text-sm">#{order.number}</span>
          <span className="text-[#888] text-xs">{date}</span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm"
            style={{ background: `${st.color}18`, color: st.color }}>
            {st.label}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-black text-[#111]">${parseFloat(order.total).toFixed(2)}</span>
          <i className={`ri-arrow-${open ? "up" : "down"}-s-line text-[#aaa]`}></i>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "16px 20px" }}>
          {order.line_items.map((li, i) => (
            <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: i < order.line_items.length - 1 ? "1px solid #f5f5f5" : "none" }}>
              <div>
                <p className="text-sm font-bold text-[#111]">{li.name}</p>
                <p className="text-xs text-[#aaa]">Qty: {li.quantity}</p>
              </div>
              <span className="text-sm font-black text-[#111]">${parseFloat(li.total).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-1" style={{ borderTop: "1px solid #e8e8e8" }}>
            <span className="text-xs font-bold uppercase tracking-wider text-[#888]">Order Total</span>
            <span className="font-black text-[#111]">${parseFloat(order.total).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountDashboard({ customer, onLogout }: {
  customer: WCCustomer; onLogout: () => void;
}) {
  const [orders, setOrders]         = useState<WCCustomerOrder[]>([]);
  const [ordersLoading, setLoading] = useState(true);
  const [tab, setTab]               = useState<"orders" | "details">("orders");

  useEffect(() => {
    getCustomerOrders(customer.id)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [customer.id]);

  const tabs = [
    { key: "orders",  label: "My Orders",      icon: "ri-shopping-bag-line" },
    { key: "details", label: "Account Details", icon: "ri-user-line" },
  ] as const;

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Welcome */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#aaa] mb-1">Welcome back</p>
          <h2 className="font-black text-[#111] text-2xl uppercase tracking-tight">
            {customer.first_name || customer.email}
          </h2>
        </div>
        <button onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#888] transition-colors"
          style={{ border: "1px solid #e0e0e0" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0"; (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}>
          <i className="ri-logout-box-line"></i> Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-8" style={{ borderBottom: "2px solid #e8e8e8" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider transition-all"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: tab === t.key ? "#111" : "#aaa",
              borderBottom: tab === t.key ? "2px solid #111" : "2px solid transparent",
              marginBottom: "-2px",
            }}>
            <i className={t.icon}></i> {t.label}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {tab === "orders" && (
        <div>
          {ordersLoading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-[#aaa]">
              <div className="w-4 h-4 border-2 border-[#ddd] border-t-[#111] rounded-full animate-spin"></div>
              <span className="text-sm">Loading orders…</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4" style={{ background: "#f5f4f2" }}>
                <i className="ri-shopping-bag-line text-2xl text-[#ccc]"></i>
              </div>
              <p className="font-bold text-[#aaa] text-sm uppercase tracking-wider mb-2">No orders yet</p>
              <p className="text-[#bbb] text-sm mb-6">Your order history will appear here.</p>
              <Link to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 font-black text-[11px] uppercase tracking-wider text-white"
                style={{ background: "#111" }}>
                <i className="ri-arrow-right-line"></i> Shop Now
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map(o => <OrderRow key={o.id} order={o} />)}
            </div>
          )}
        </div>
      )}

      {/* Details tab */}
      {tab === "details" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div style={{ border: "1px solid #e8e8e8", background: "#fff", padding: "24px" }}>
            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-[#aaa] mb-4">Account Info</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Name",     value: `${customer.first_name} ${customer.last_name}`.trim() || "—" },
                { label: "Email",    value: customer.email },
                { label: "Username", value: customer.username },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#aaa] mb-0.5">{label}</p>
                  <p className="text-sm text-[#111] font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {customer.billing?.address_1 && (
            <div style={{ border: "1px solid #e8e8e8", background: "#fff", padding: "24px" }}>
              <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-[#aaa] mb-4">Billing Address</h3>
              <div className="text-sm text-[#111] leading-relaxed font-semibold">
                <p>{customer.billing.first_name} {customer.billing.last_name}</p>
                <p>{customer.billing.address_1}</p>
                <p>{customer.billing.city}, {customer.billing.state} {customer.billing.postcode}</p>
                {customer.billing.phone && <p className="mt-2 text-[#888]">{customer.billing.phone}</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  const session = getSession();
  const [view, setView]         = useState<View>(session ? "account" : "login");
  const [customer, setCustomer] = useState<WCCustomer | null>(session?.customer ?? null);

  const handleSuccess = (c: WCCustomer) => {
    setCustomer(c); setView("account");
  };

  const handleLogout = () => {
    clearSession();
    setCustomer(null);
    setView("login");
  };

  const title = view === "account" ? "MY ACCOUNT" : view === "register" ? "CREATE ACCOUNT" : "SIGN IN";

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50"><Navbar /></div>
      <div style={{ paddingTop: 64 }}>
        <Hero title={title} />

        {/* Breadcrumb */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
          <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-xs text-[#aaa]">
            <Link to="/" className="hover:text-[#111] transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#111]">{title === "MY ACCOUNT" ? "My Account" : title === "SIGN IN" ? "Sign In" : "Create Account"}</span>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16">
          {view === "login" && (
            <LoginForm onSuccess={handleSuccess} onSwitch={() => setView("register")} />
          )}
          {view === "register" && (
            <RegisterForm onSuccess={handleSuccess} onSwitch={() => setView("login")} />
          )}
          {view === "account" && customer && (
            <AccountDashboard customer={customer} onLogout={handleLogout} />
          )}
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
