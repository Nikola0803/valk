/**
 * AccessGate - Age + Research-Use agreement + Login/Register wall.
 *
 * Layout: split panel (left: brand/image, right: form) matching certified-pep.com style.
 * Auth backed by WordPress via valkyrie-router.php REST endpoints.
 */

import { useState, useEffect, useRef, forwardRef } from "react";

const WC_URL    = (import.meta.env.VITE_WC_URL as string) || "";
const AUTH_BASE = `${WC_URL}/wp-json/valkyrie/v1`;
const TOKEN_KEY = "vk_auth_token";
const USER_KEY  = "vk_auth_user";

// LOCAL TESTING ONLY - the login/validate endpoints live in valkyrie-router, a plugin
// not installed on local test WordPress instances (e.g. testing the CircoFlows payment
// integration against a bare WooCommerce + valkyrie-payments install). Set
// VITE_SKIP_ACCESS_GATE=true in .env to bypass this gate entirely. Gated on
// import.meta.env.DEV (hard-set to false by Vite on every production build, regardless
// of what's in .env) so this bypass is structurally impossible to ship in a real build -
// not just an opt-in convention someone has to remember to unset.
const SKIP_ACCESS_GATE = import.meta.env.DEV && import.meta.env.VITE_SKIP_ACCESS_GATE === "true";

interface AuthUser { email: string; username: string; user_id: number }

export function getStoredToken(): string { return localStorage.getItem(TOKEN_KEY) ?? ""; }
export function getStoredUser(): AuthUser | null {
  try { return JSON.parse(localStorage.getItem(USER_KEY) ?? "null"); } catch { return null; }
}
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted]       = useState(SKIP_ACCESS_GATE);
  const [checking, setChecking]     = useState(!SKIP_ACCESS_GATE);
  const [mode, setMode]             = useState<"login" | "register">("login");

  // Form state
  const [email, setEmail]           = useState("");
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeEmail, setAgreeEmail] = useState(true);

  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [shaking, setShaking]       = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // Validate stored token on mount
  useEffect(() => {
    if (SKIP_ACCESS_GATE) return; // local-testing bypass - see SKIP_ACCESS_GATE above
    const token = getStoredToken();
    if (!token) { setChecking(false); return; }
    fetch(`${AUTH_BASE}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(r => r.json())
      .then(d => { if (d.valid) setGranted(true); })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!granted && !checking) setTimeout(() => emailRef.current?.focus(), 80);
  }, [granted, checking, mode]);

  if (checking) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <span className="w-8 h-8 inline-block border-2 border-[#333] border-t-white rounded-full animate-spin" />
      </div>
    );
  }
  if (granted) return <>{children}</>;

  const shake = () => { setShaking(true); setTimeout(() => setShaking(false), 600); };

  const saveAuth = (data: { token: string; email: string; username: string; user_id: number }) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ email: data.email, username: data.username, user_id: data.user_id }));
    setGranted(true);
  };

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password) { setError("Please fill in all required fields."); shake(); return; }
    if (!agreeTerms) { setError("You must agree to the research-only terms to continue."); shake(); return; }
    if (mode === "register") {
      if (!email.includes("@"))      { setError("Please enter a valid email address."); shake(); return; }
      if (password.length < 8)       { setError("Password must be at least 8 characters."); shake(); return; }
      if (password !== confirm)      { setError("Passwords do not match."); shake(); return; }
    }
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "login" : "register";
      const body: Record<string, string> = { email: email.trim(), password };
      if (mode === "register" && username.trim()) body.username = username.trim();

      const res  = await fetch(`${AUTH_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); shake(); }
      else saveAuth(data);
    } catch {
      setError("Network error. Please check your connection.");
      shake();
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); };
  const switchMode = (m: "login" | "register") => {
    setMode(m); setError(""); setPassword(""); setConfirm(""); setAgreeTerms(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)", overflowY: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"] }}
    >
      <div
        className="w-full flex overflow-hidden"
        style={{
          maxWidth: 900,
          maxHeight: "96vh",
          borderRadius: 12,
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          animation: shaking ? "vk-shake 0.6s cubic-bezier(.36,.07,.19,.97)" : undefined,
        }}
      >

        {/* Left panel */}
        <div
          className="hidden md:flex flex-col justify-between relative overflow-hidden"
          style={{ width: 340, minWidth: 340, background: "#0a0a0a", padding: "36px 32px" }}
        >
          {/* Background product image */}
          <div className="absolute inset-0">
            <img
              src="/IMG_0912.jpeg"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 30%", opacity: 0.22, filter: "grayscale(30%)" }}
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.85) 100%)"
            }} />
          </div>

          {/* Logo */}
          <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#555] mb-2">Verified Access Only</p>
            <h1 className="font-black uppercase text-white tracking-tight" style={{ fontSize: 34, letterSpacing: "-0.03em", lineHeight: 1 }}>
              VALKYRIE
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#444] mt-1">Research Peptides</p>
          </div>

          {/* Trust badges */}
          <div className="relative z-10 flex flex-col gap-2 my-6">
            {[
              "U.S. cGMP Compliant Facilities",
              "3rd Party Lab Tested - 99%+ Purity",
              "Made in The United States",
            ].map(b => (
              <div key={b} className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-fill text-sm" style={{ color: "#4ade80" }}></i>
                </div>
                <span className="text-[11px] font-semibold text-[#aaa]">{b}</span>
              </div>
            ))}
          </div>

          {/* Trustpilot badge */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#00b67a" }}>★ Trustpilot</span>
            </div>
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-5 h-5 flex items-center justify-center" style={{ background: "#00b67a" }}>
                  <i className="ri-star-fill text-white text-[11px]"></i>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#555]">Rated 5.0 · Verified Reviews</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ background: "#ffffff", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"], maxHeight: "calc(96vh - 2rem)" }}>
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid #e8e8e8" }}>
            {(["login", "register"] as const).map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-4 text-sm font-bold transition-colors cursor-pointer"
                style={{
                  color: mode === m ? "#111" : "#888",
                  borderBottom: mode === m ? "2px solid #111" : "2px solid transparent",
                  background: "transparent",
                  marginBottom: -1,
                }}
              >
                {m === "login" ? "Sign In" : "Create an Account"}
              </button>
            ))}
          </div>

          <div className="flex-1 p-8 flex flex-col gap-4">

            {/* Email */}
            <FormField
              ref={emailRef}
              label="Email Address"
              type="email"
              value={email}
              onChange={v => { setEmail(v); setError(""); }}
              onKeyDown={handleKey}
              placeholder="you@example.com"
              hasError={!!error}
            />

            {/* Username (register only) */}
            {mode === "register" && (
              <FormField
                label="Username (optional)"
                type="text"
                value={username}
                onChange={v => { setUsername(v); setError(""); }}
                onKeyDown={handleKey}
                placeholder="Leave blank to auto-generate"
                hasError={false}
              />
            )}

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#555]">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={handleKey}
                  placeholder={mode === "register" ? "Min. 8 characters" : "Your password"}
                  className="w-full px-4 py-3 text-sm text-[#111] outline-none pr-16"
                  style={{ border: `1px solid ${error ? "#dc2626" : "#e0e0e0"}`, background: "#fafafa" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#555] hover:text-[#111] cursor-pointer px-2 py-1"
                  style={{ background: "#f0f0f0", border: "1px solid #e0e0e0" }}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm password (register only) */}
            {mode === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#555]">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={e => { setConfirm(e.target.value); setError(""); }}
                    onKeyDown={handleKey}
                    placeholder="Repeat your password"
                    className="w-full px-4 py-3 text-sm text-[#111] outline-none pr-16"
                    style={{ border: `1px solid ${error && confirm !== password ? "#dc2626" : "#e0e0e0"}`, background: "#fafafa" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#555] hover:text-[#111] cursor-pointer px-2 py-1"
                    style={{ background: "#f0f0f0", border: "1px solid #e0e0e0" }}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {/* Research Use Only box */}
            <div className="p-4 mt-1" style={{ background: "#f8f9ff", border: "1px solid #dde3f0" }}>
              <p className="text-sm font-black text-[#111] mb-2">Research Use Only</p>
              <p className="text-xs text-[#555] leading-relaxed mb-1">
                By using this site, you acknowledge that all products and information are provided for research purposes only and are not intended for human consumption or medical use.
              </p>
              <p className="text-xs font-semibold text-[#444] mb-3">
                You must be 21 years of age or older to use this website.
              </p>

              {/* Checkbox 1 */}
              <label className="flex items-start gap-3 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => { setAgreeTerms(e.target.checked); setError(""); }}
                  className="mt-0.5 flex-shrink-0 cursor-pointer"
                  style={{ width: 16, height: 16, accentColor: "#111" }}
                />
                <span className="text-xs font-semibold text-[#333] leading-snug">
                  By logging in or creating an account, you agree to the research-only terms above and confirm you are 21 years of age or older.
                </span>
              </label>

              {/* Checkbox 2 */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeEmail}
                  onChange={e => setAgreeEmail(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 cursor-pointer"
                  style={{ width: 16, height: 16, accentColor: "#111" }}
                />
                <span className="text-xs text-[#555] leading-snug">
                  Yes, I agree to receive emails from Valkyrie Peptides. I may unsubscribe at any time.
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-xs font-semibold flex items-center gap-1.5">
                <i className="ri-error-warning-line text-sm flex-shrink-0"></i>
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 font-black uppercase tracking-widest text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              style={{ background: "#111111" }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#333"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#111111"; }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 inline-block border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in…" : "Creating account…"}
                </>
              ) : (
                mode === "login" ? "Continue" : "Create Account"
              )}
            </button>

            {mode === "login" && (
              <p className="text-center text-xs text-[#888] mt-1">
                <a href={`${WC_URL}/wp-login.php?action=lostpassword`} target="_blank" rel="noreferrer"
                  className="hover:text-[#111] transition-colors cursor-pointer">
                  Forgot password?
                </a>
              </p>
            )}
          </div>

          {/* Bottom disclaimer */}
          <div className="px-8 py-4" style={{ background: "#f8f7f5", borderTop: "1px solid #e8e8e8" }}>
            <p className="text-xs font-black text-[#111] mb-1">Valkyrie Research Peptides</p>
            <p className="text-xs text-[#888]">The Most Trusted Name in Research Peptides</p>
            <p className="text-xs text-[#111] font-semibold mt-2 leading-relaxed">
              Due to regulatory changes in this industry, we now require an account login to access product information and continue browsing.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vk-shake {
          0%,100%{ transform:translateX(0) }
          15%    { transform:translateX(-9px) }
          30%    { transform:translateX(9px) }
          45%    { transform:translateX(-6px) }
          60%    { transform:translateX(6px) }
          75%    { transform:translateX(-3px) }
          90%    { transform:translateX(3px) }
        }
      `}</style>
    </div>
  );
}

// Reusable text field
const FormField = forwardRef<HTMLInputElement, {
  label: string; type: string; value: string;
  onChange: (v: string) => void; onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string; hasError: boolean;
}>(({ label, type, value, onChange, onKeyDown, placeholder, hasError }, ref) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-[#555]">{label}</label>
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      autoComplete={type === "email" ? "email" : type === "password" ? "current-password" : "username"}
      className="w-full px-4 py-3 text-sm text-[#111] outline-none transition-colors"
      style={{ border: `1px solid ${hasError ? "#dc2626" : "#e0e0e0"}`, background: "#fafafa" }}
      onFocus={e  => (e.currentTarget.style.borderColor = hasError ? "#dc2626" : "#111")}
      onBlur={e   => (e.currentTarget.style.borderColor = hasError ? "#dc2626" : "#e0e0e0")}
    />
  </div>
));
FormField.displayName = "FormField";
