import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import COALookupTerminal from "@/pages/coa/components/COALookupTerminal";

/**
 * Public per-COA verification page - what a QR code printed on a label
 * scans to. e.g. /coa/VP-6704696
 */
export default function COAVerifyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { lot } = useParams<{ lot: string }>();

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <div className="relative w-full overflow-hidden flex flex-col items-center justify-center px-4 py-20 md:py-28" style={{ background: "#0a0a0a" }}>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/30 mb-4">Batch Verification</p>
            <h1
              className="font-black uppercase leading-[0.9] tracking-tight"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                background: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 25%, #a0a0a0 50%, #d0d0d0 75%, #909090 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EVERY BATCH.<br />VERIFIED.
            </h1>
          </div>
          <div className="relative z-10 w-full px-4">
            <COALookupTerminal initialLot={lot} />
          </div>
        </div>
        <FooterSection />
      </div>
    </div>
  );
}
