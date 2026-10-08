import { useEffect, useState } from "react";
import { getCOALibrary, findCOAEntryBySlug, type COAEntry } from "@/pages/coa/coaData";

/**
 * Looks up a product's COA in the live, admin-editable library (wp-admin ->
 * Valkyrie CMS -> COA Files) by slug. This is the same library the /coa page
 * reads - product pages previously only checked WooCommerce product meta and
 * the one-time static CSV import (src/data/productTabs.ts), so a COA added
 * through wp-admin would show up on /coa but never under the product's own
 * COA tab. Returns null until loaded or if no entry matches.
 */
export function useCoaEntry(slug: string | undefined): COAEntry | null {
  const [entry, setEntry] = useState<COAEntry | null>(null);

  useEffect(() => {
    setEntry(null);
    if (!slug) return;
    let cancelled = false;
    getCOALibrary().then((entries) => {
      if (!cancelled) setEntry(findCOAEntryBySlug(entries, slug));
    });
    return () => { cancelled = true; };
  }, [slug]);

  return entry;
}
