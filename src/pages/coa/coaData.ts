export type COAEntry = {
  name: string;
  dose: string;
  category: string;
  coaUrl: string | null;
  endotoxinUrl: string | null;
  productSlug: string;
  labName: string;
  testDate: string;
  lot: string;
  purity: string;
  qrUrl: string | null;
};

/**
 * Live COA library, editable from wp-admin -> Valkyrie CMS -> COA Files,
 * without a code change or rebuild. The array below (coaEntries) is only a
 * same-request fallback for if that fetch fails - wp-admin is the real
 * source of truth. See VCMS_REST_API::get_coas() / the
 * /wp-json/valkyrie/v1/coas route in the valkyrie-cms plugin.
 */
export async function fetchCOALibrary(): Promise<COAEntry[]> {
  const WC_URL = import.meta.env.VITE_WC_URL as string;
  try {
    const res = await fetch(`${WC_URL}/wp-json/valkyrie/v1/coas`);
    if (!res.ok) return coaEntries;
    const raw = await res.json() as Array<Record<string, unknown>>;
    if (!Array.isArray(raw) || raw.length === 0) return coaEntries;
    return raw.map((e) => ({
      name: String(e.name ?? ""),
      dose: String(e.dose ?? ""),
      category: String(e.category ?? "Research"),
      coaUrl: e.coaUrl ? String(e.coaUrl) : null,
      endotoxinUrl: e.endotoxinUrl ? String(e.endotoxinUrl) : null,
      productSlug: String(e.productSlug ?? ""),
      labName: String(e.labName ?? ""),
      testDate: String(e.testDate ?? ""),
      lot: String(e.lot ?? ""),
      purity: String(e.purity ?? ""),
      qrUrl: e.qrUrl ? String(e.qrUrl) : null,
    }));
  } catch {
    return coaEntries;
  }
}

/** Looks up a single COA by lot/batch number via the live wp-admin library. Powers /coa/:lot. */
export async function fetchCOAByLot(lot: string): Promise<COAEntry | null> {
  const WC_URL = import.meta.env.VITE_WC_URL as string;
  try {
    const res = await fetch(`${WC_URL}/wp-json/valkyrie/v1/coa-lookup?lot=${encodeURIComponent(lot)}`);
    if (!res.ok) return null;
    const data = await res.json() as { exact: Record<string, unknown> | null };
    if (!data.exact) return null;
    const e = data.exact;
    return {
      name: String(e.name ?? ""),
      dose: String(e.dose ?? ""),
      category: String(e.category ?? "Research"),
      coaUrl: e.coaUrl ? String(e.coaUrl) : null,
      endotoxinUrl: e.endotoxinUrl ? String(e.endotoxinUrl) : null,
      productSlug: String(e.productSlug ?? ""),
      labName: String(e.labName ?? ""),
      testDate: String(e.testDate ?? ""),
      lot: String(e.lot ?? ""),
      purity: String(e.purity ?? ""),
      qrUrl: e.qrUrl ? String(e.qrUrl) : null,
    };
  } catch {
    return null;
  }
}

// Fallback only - see fetchCOALibrary() above for the live, admin-editable source.
// Lot/purity/QR aren't tracked in this static fallback (only the live library
// has them), so they're filled in as empty/null below once the array closes.
const rawFallbackEntries: Omit<COAEntry, "lot" | "purity" | "qrUrl">[] = [
  // Horizon Analytical (existing)
  {
    name: "BPC-157",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/bpc-157-10mg-2026-07-21-coa.pdf",
    endotoxinUrl: null,
    productSlug: "bpc-157-10mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "TB-500",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-9645060-TB-500-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-7308120-E-TB-500-Endotoxin.pdf",
    productSlug: "tb-500-10mg",
    labName: "Horizon Analytical",
    testDate: "Sep 2024",
  },
  {
    name: "WOLVERINE",
    dose: "20MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/bpc-157-tb-500-20mg-5-7-26.pdf",
    endotoxinUrl: null,
    productSlug: "wolverine-20mg",
    labName: "Freedom Diagnostics",
    testDate: "May 2026",
  },
  {
    name: "PT-141",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/pt-141-10mg-2026-07-22-coa.pdf",
    endotoxinUrl: null,
    productSlug: "pt-141-10mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "MOTS-C",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-8066324-MOTS-c-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-6063329-E-MOTS-c-Endotoxin.pdf",
    productSlug: "mots-c-10mg",
    labName: "Horizon Analytical",
    testDate: "Sep 2024",
  },
  {
    name: "CJC-1295 (No DAC)",
    dose: "5MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-9271992-CJC-1295-no-DAC-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-3823790-E-Ipamorelin-CJC-1295-Endotoxin.pdf",
    productSlug: "cjc-ipa-10mg",
    labName: "Horizon Analytical",
    testDate: "Sep 2024",
  },
  {
    name: "TESAMORELIN",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/tesamorelin-202602029-3-2-26-coa.pdf",
    endotoxinUrl: null,
    productSlug: "tesamorelin-10mg",
    labName: "Nutri Analytical Testing Laboratories",
    testDate: "Mar 2024",
  },
  {
    name: "GLP-3 (RT)",
    dose: "30MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-4892263-Retatrutide-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-7672189-E-Retatrutide-Endotoxin.pdf",
    productSlug: "glp-3-rt-30mg",
    labName: "Horizon Analytical",
    testDate: "Sep 2024",
  },
  {
    name: "GLP-3 (RT)",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-7672189-P-Retatrutide-Purity-1.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-7672189-E-Retatrutide-Endotoxin.pdf",
    productSlug: "glp-3-rt-10mg",
    labName: "Horizon Analytical",
    testDate: "May 2026",
  },
  {
    name: "GLP-2 (TZ)",
    dose: "30MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9305820-Tirzepatide-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-9305820-E-Tirzepatide-Endotoxin.pdf",
    productSlug: "glp-2-tz-30mg",
    labName: "Horizon Analytical",
    testDate: "Mar 2026",
  },
  {
    name: "GLP-1 (SM)",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-3417042-Semaglutide-Purity-1.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-3417042-E-Semaglutide-Endotoxin.pdf",
    productSlug: "glp-1-sm-10mg",
    labName: "Horizon Analytical",
    testDate: "May 2026",
  },
  {
    name: "GLOW",
    dose: "70MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/glow-70mg-2026-07-21-coa.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-6203251-E-GLOW-Endotoxin.pdf",
    productSlug: "glow-70mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "KLOW",
    dose: "80MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/klow-80mg-2026-06-16-26-coa.pdf",
    endotoxinUrl: null,
    productSlug: "klow-80mg",
    labName: "Freedom Diagnostics",
    testDate: "June 2026",
  },
  {
    name: "GHK-Cu",
    dose: "100MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-4215641-GHK-Cu-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-4999451-E-GHK-Cu-Endotoxin.pdf",
    productSlug: "ghk-cu-100mg",
    labName: "Horizon Analytical",
    testDate: "Mar 2026",
  },
  {
    name: "NAD+",
    dose: "500MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-6801827-NAD-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-1630816-E-NAD-Endotoxin.pdf",
    productSlug: "nad-500mg",
    labName: "Horizon Analytical",
    testDate: "Mar 2026",
  },
  {
    name: "NAD+",
    dose: "1000MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-6690114-NAD-Purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-1630816-E-NAD-Endotoxin.pdf",
    productSlug: "nad-1000mg",
    labName: "Horizon Analytical",
    testDate: "Mar 2026",
  },
  {
    name: "SELANK",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/selank-10mg-5-7-26-coa.pdf",
    endotoxinUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/selank-10mg-5-11-26-endo.pdf",
    productSlug: "selank-10mg",
    labName: "Freedom Diagnostics",
    testDate: "May 2026",
  },
  {
    name: "SEMAX",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/semax-10mg-5-7-26-coa.pdf",
    endotoxinUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/semax-10mg-5-11-26-endo.pdf",
    productSlug: "semax-10mg",
    labName: "Freedom Diagnostics",
    testDate: "May 2026",
  },
  {
    name: "KISSPEPTIN-10",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/kisspeptin-10mg-2026-07-23.pdf",
    endotoxinUrl: null,
    productSlug: "kisspeptin-10-10mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "THYMOSIN ALPHA-1",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-1947064-P-Thymosin-Alpha-1-purity.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-1947064-E-Thymosin-Alpha-1-endotoxin.pdf",
    productSlug: "thymosin-alpha-1-10mg",
    labName: "Horizon Analytical",
    testDate: "May 2026",
  },
  {
    name: "HEXARELIN",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-7132129-P-Hexarelin-Purity-1.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-7132129-E-Hexarelin-Endotoxin-1.pdf",
    productSlug: "hexarelin-10mg",
    labName: "Horizon Analytical",
    testDate: "May 2026",
  },
  {
    name: "OXYTOCIN",
    dose: "5MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-4275312-P-Oxytocin-Purity-1.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-4275312-E-Oxytocin-Endotoxin-1.pdf",
    productSlug: "oxytocin-5mg",
    labName: "Horizon Analytical",
    testDate: "May 2026",
  },
  {
    name: "AOD-9604",
    dose: "5MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-3713888-P-AOD-9604-Purity-1.pdf",
    endotoxinUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/05/VP-3713888-E-AOD-9604-Endotoxin.pdf",
    productSlug: "aod-9604-5mg",
    labName: "Horizon Analytical",
    testDate: "May 2026",
  },
  {
    name: "MELANOTAN II",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/melanotan-ii-10mg-5-7-26-coa.pdf",
    endotoxinUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/melanotan-ii-10mg-5-7-26-endo.pdf",
    productSlug: "melanotan-2-10mg",
    labName: "Freedom Diagnostics",
    testDate: "May 2026",
  },

  // MDx BioAnalytical Laboratory (new)
  // Upload these PDFs to WP Media and the URLs below will work automatically.
  // PDF filenames match exactly what you uploaded.
  {
    name: "EPITHALON",
    dose: "50MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/epitalon-50mg-2026-07-21.pdf",
    endotoxinUrl: null,
    productSlug: "epitalon-50mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "SERMORELIN",
    dose: "5MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/202602029-10-2-2.pdf",
    endotoxinUrl: null,
    productSlug: "sermorelin-10mg",
    labName: "Nutri Analytical Testing Laboratories",
    testDate: "Mar 2026",
  },
  {
    name: "CAGRILINTIDE",
    dose: "10MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/cagrilintide-10mg-2026-07-21.pdf",
    endotoxinUrl: null,
    productSlug: "cagrilintide-10mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "DSIP",
    dose: "5MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/06/Sample-287-DSIP-1-1.pdf",
    endotoxinUrl: null,
    productSlug: "dsip-5mg",
    labName: "MDx BioAnalytical",
    testDate: "Aug 2025",
  },
  {
    name: "IGF-1 LR3",
    dose: "1MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/06/Batch-260417IG13-IGF-1LR3-1.pdf",
    endotoxinUrl: null,
    productSlug: "igf-1-lr3-1mg",
    labName: "MDx BioAnalytical",
    testDate: "May 2026",
  },
  {
    name: "SS-31",
    dose: "50MG",
    category: "Research",
    coaUrl:
      "http://82.221.101.180/wp-content/uploads/2026/08/ss-31-50mg-2026-07-22.pdf",
    endotoxinUrl: null,
    productSlug: "ss-31-50mg",
    labName: "Bioviridian",
    testDate: "July 2026",
  },
  {
    name: "CJC-1295+Ipamorelin",
    dose: "20MG",
    category: "Research",
    coaUrl:
      "https://valkyriepeptides.com/wp-content/uploads/2026/07/Batch-260331CI103-CJC-1295-NO-DACIPAMORELIN.pdf",
    endotoxinUrl: null,
    productSlug: "cjc-ipa-20mg",
    labName: "MDx BioAnalytical",
    testDate: "Apr 2026",
  },

  // Pending (no COA yet)
  {
    name: "GHRP-6",
    dose: "10MG",
    category: "Research",
    coaUrl: null,
    endotoxinUrl: null,
    productSlug: "shop",
    labName: "Pending",
    testDate: "Pending",
  },
  {
    name: "5-AMINO-1MQ",
    dose: "50MG",
    category: "Research",
    coaUrl: null,
    endotoxinUrl: null,
    productSlug: "shop",
    labName: "Pending",
    testDate: "Pending",
  },
];

export const coaEntries: COAEntry[] = rawFallbackEntries.map((e) => ({ ...e, lot: "", purity: "", qrUrl: null }));

export const coaCategories = ["All", "Research"];

export const categoryColors: Record<string, string> = {
  Research: "#5a7d5a",
};
