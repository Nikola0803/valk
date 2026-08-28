import { useState } from "react";

export default function AgeVerification() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("age_verified") === "true";
    } catch {
      return false;
    }
  });
  const [checked, setChecked] = useState(false);
  const [exited, setExited] = useState(false);

  const handleAccept = () => {
    if (!checked) return;
    try {
      sessionStorage.setItem("age_verified", "true");
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  const handleExit = () => {
    setExited(true);
  };

  if (dismissed) return null;

  if (exited) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        style={{ background: "#0a0b0e" }}
      >
        <p style={{ color: "rgba(220,210,185,0.45)", fontFamily: "sans-serif", fontSize: 14 }}>
          You must be 21 or older to access this site.
        </p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-4"
      style={{
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(6px)",
        fontFamily: "'Barlow', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,180,180,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,180,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main card */}
      <div
        className="relative w-full flex flex-col items-center text-center"
        style={{
          maxWidth: 520,
          background: "#12141a",
          border: "1px solid rgba(180,180,180,0.35)",
          padding: "40px 40px 32px",
        }}
      >
        {/* Corner accents */}
        {[
          { top: -1, left: -1, borderWidth: "2px 0 0 2px" },
          { top: -1, right: -1, borderWidth: "2px 2px 0 0" },
          { bottom: -1, left: -1, borderWidth: "0 0 2px 2px" },
          { bottom: -1, right: -1, borderWidth: "0 2px 2px 0" },
        ].map((style, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: 16,
              height: 16,
              borderStyle: "solid",
              borderColor: "rgba(180,180,180,0.55)",
              ...style,
            }}
          />
        ))}

        {/* Logo */}
        <img
          src="https://valkyriepeptides.com/wp-content/uploads/2024/09/Valkyrie-Horizontal-2-1.webp"
          alt="Warrior Distributions"
          style={{ height: 44, width: "auto", objectFit: "contain", marginBottom: 20 }}
        />

        {/* Gold divider */}
        <div
          style={{
            height: 1,
            width: "100%",
            background: "linear-gradient(90deg, transparent, rgba(200,200,200,0.5), transparent)",
            marginBottom: 24,
          }}
        />

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#e8e0cc",
            marginBottom: 8,
          }}
        >
          Age Verification Required
        </h2>

        <p style={{ fontSize: 13, color: "rgba(220,210,185,0.55)", lineHeight: 1.65, marginBottom: 24, fontWeight: 300 }}>
          This website contains products intended for research purposes only. You must be{" "}
          <strong style={{ color: "rgba(220,210,185,0.8)", fontWeight: 600 }}>21 years of age or older</strong> to enter.
        </p>

        {/* Checkbox row */}
        <label
          htmlFor="ageCheck"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            width: "100%",
            background: "#1a1c24",
            border: "1px solid rgba(180,180,180,0.2)",
            padding: "14px 16px",
            marginBottom: 20,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <input
            type="checkbox"
            id="ageCheck"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{
              width: 18,
              height: 18,
              flexShrink: 0,
              marginTop: 1,
              accentColor: "#b8b8b8",
              cursor: "pointer",
            }}
          />
          <span style={{ fontSize: 13, color: "rgba(220,210,185,0.8)", lineHeight: 1.6, fontWeight: 300 }}>
            I confirm that I am <strong style={{ color: "#b8b8b8", fontWeight: 600 }}>21 years of age or older</strong> and
            agree to the{" "}
            <a href="/terms-conditions" style={{ color: "#b8b8b8", textDecoration: "underline" }}>
              Terms &amp; Conditions
            </a>{" "}
            of this site. I understand all products are for research use only and not for human consumption.
          </span>
        </label>

        {/* Enter button */}
        <button
          onClick={handleAccept}
          disabled={!checked}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            cursor: checked ? "pointer" : "not-allowed",
            fontFamily: "'Oswald', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "#b8b8b8",
            color: "#111",
            opacity: checked ? 1 : 0.35,
            transition: "opacity 0.2s, background 0.2s",
            marginBottom: 10,
          }}
          onMouseEnter={(e) => {
            if (checked) (e.currentTarget as HTMLButtonElement).style.background = "#d0d0d0";
          }}
          onMouseLeave={(e) => {
            if (checked) (e.currentTarget as HTMLButtonElement).style.background = "#b8b8b8";
          }}
        >
          Enter Site
        </button>

        {/* Exit button */}
        <button
          onClick={handleExit}
          style={{
            width: "100%",
            padding: "10px",
            background: "transparent",
            border: "1px solid rgba(180,180,180,0.2)",
            cursor: "pointer",
            fontFamily: "'Barlow', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(220,210,185,0.4)",
            transition: "border-color 0.2s, color 0.2s",
            marginBottom: 20,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(180,180,180,0.4)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(220,210,185,0.65)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(180,180,180,0.2)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(220,210,185,0.4)";
          }}
        >
          I am under 21 - Exit
        </button>

        {/* TrustPilot */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#00b67a", letterSpacing: "-0.02em" }}>Trustpilot</span>
          <div style={{ display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  background: "#00b67a",
                  clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: "rgba(220,210,185,0.45)", fontWeight: 400 }}>Rated Excellent</span>
        </div>
      </div>

      {/* Bottom disclaimer bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#0d0f13",
          border: "1px solid rgba(180,180,180,0.18)",
          borderTop: "none",
          padding: "14px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: 11.5,
            color: "rgba(220,210,185,0.38)",
            lineHeight: 1.65,
            textAlign: "center",
            fontWeight: 300,
            margin: 0,
          }}
        >
          <strong style={{ color: "rgba(220,210,185,0.6)", fontWeight: 500 }}>Important Notice:</strong> Due to recent
          changes within this industry, we now require an account login to access product information and continue
          browsing. This helps us verify customer eligibility and ensure compliance. By entering, you acknowledge you are
          at least 21 years of age, agree to our{" "}
          <a href="/terms-conditions" style={{ color: "#b8b8b8", textDecoration: "underline", textDecorationColor: "rgba(180,180,180,0.4)" }}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" style={{ color: "#b8b8b8", textDecoration: "underline", textDecorationColor: "rgba(180,180,180,0.4)" }}>
            Privacy Policy
          </a>
          , and that all products are for{" "}
          <strong style={{ color: "rgba(220,210,185,0.6)", fontWeight: 500 }}>research purposes only</strong>.
        </p>
      </div>
    </div>
  );
}
