import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchCOAByLot, type COAEntry } from "@/pages/coa/coaData";

interface COALookupTerminalProps {
  /** Pre-filled lot to verify immediately on mount - used by the /coa/:lot page. */
  initialLot?: string;
}

type LookupState = "idle" | "checking" | "found" | "not-found";

export default function COALookupTerminal({ initialLot }: COALookupTerminalProps) {
  const [lot, setLot] = useState(initialLot ?? "");
  const [state, setState] = useState<LookupState>("idle");
  const [result, setResult] = useState<COAEntry | null>(null);

  const runLookup = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setState("checking");
    const entry = await fetchCOAByLot(trimmed);
    setResult(entry);
    setState(entry ? "found" : "not-found");
  }, []);

  useEffect(() => {
    if (initialLot) runLookup(initialLot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runLookup(lot);
  };

  return (
    <div className="w-full max-w-[560px] mx-auto" style={{ fontFamily: "'Courier New', monospace" }}>
      <div style={{ background: "#111111", border: "1px solid #2a2a2a" }}>
        {/* Title bar - stacks its label out of the way on narrow screens
            instead of forcing the row wider than the viewport. */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5" style={{ background: "#1a1a1a", borderBottom: "1px solid #2a2a2a" }}>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#444" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#444" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#444" }} />
          </div>
          <p className="hidden sm:block text-[10px] uppercase tracking-[0.25em] truncate min-w-0" style={{ color: "#888" }}>Valkyrie Verification · Terminal</p>
          <p className="text-[10px] flex-shrink-0" style={{ color: "#555" }}>v1.0</p>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-xs mb-3" style={{ color: "#aaa" }}>$ valkyrie verify --batch</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              placeholder="e.g. VP-6704696"
              className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
              style={{ background: "#1a1a1a", border: "1px solid #333", color: "#eee" }}
            />
            <button
              type="submit"
              disabled={state === "checking"}
              className="px-5 py-3 text-xs font-black uppercase tracking-widest cursor-pointer whitespace-nowrap disabled:opacity-60 transition-colors"
              style={{ background: "#fff", color: "#111" }}
              onMouseEnter={(e) => { if (state !== "checking") (e.currentTarget as HTMLButtonElement).style.background = "#ddd"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
            >
              {state === "checking" ? "Checking…" : "Verify Batch"}
            </button>
          </form>

          {state === "idle" && (
            <p className="text-[11px]" style={{ color: "#666" }}>
              Enter the lot/batch number printed on your label to confirm its lab results.
            </p>
          )}

          {state === "found" && result && (
            <div className="pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#666" }}>Batch</p>
                  <p className="text-xs break-all" style={{ color: "#eee" }}>{result.lot}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#666" }}>Tested</p>
                  <p className="text-xs" style={{ color: "#eee" }}>{result.testDate || "—"}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#666" }}>Result</p>
                  <p className="text-xs flex items-center gap-1.5" style={{ color: "#4ade80" }}>
                    <i className="ri-checkbox-circle-fill" /> Passed
                  </p>
                </div>
              </div>
              <p className="text-xs mb-1" style={{ color: "#aaa" }}>{result.name} ({result.dose}) — {result.labName}</p>
              {result.purity && <p className="text-xs mb-3" style={{ color: "#aaa" }}>Purity: {result.purity}</p>}
              <div className="flex flex-wrap gap-3">
                {result.coaUrl && (
                  <a href={result.coaUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors">
                    View Purity COA →
                  </a>
                )}
                {result.endotoxinUrl && (
                  <a href={result.endotoxinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors">
                    View Endotoxin Report →
                  </a>
                )}
              </div>
            </div>
          )}

          {state === "not-found" && (
            <div className="pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
              <p className="text-xs flex items-center gap-1.5" style={{ color: "#f87171" }}>
                <i className="ri-close-circle-line" /> No published COA found for that batch number.
              </p>
              <p className="text-[11px] mt-1" style={{ color: "#666" }}>
                Double-check the code on your label, or contact us if this seems wrong.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-5 py-3" style={{ borderTop: "1px solid #2a2a2a", background: "#1a1a1a" }}>
          <p className="text-[10px] min-w-0" style={{ color: "#666" }}>Every COA is published to wp-admin the moment a lab result comes in.</p>
          <Link to="/coa" className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors flex-shrink-0">
            Browse Archive →
          </Link>
        </div>
      </div>
    </div>
  );
}
