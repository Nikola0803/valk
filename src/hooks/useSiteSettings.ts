import { useEffect, useState } from "react";

export interface SiteSettings {
  free_shipping_threshold: number;
  [key: string]: unknown;
}

const DEFAULTS: SiteSettings = { free_shipping_threshold: 0 };

let cached: SiteSettings | null = null;
let inFlight: Promise<SiteSettings> | null = null;

function fetchSettings(): Promise<SiteSettings> {
  if (cached) return Promise.resolve(cached);
  if (inFlight) return inFlight;

  const WC_URL = import.meta.env.VITE_WC_URL as string;
  inFlight = fetch(`${WC_URL}/wp-json/valkyrie/v1/settings`)
    .then((res) => (res.ok ? res.json() : DEFAULTS))
    .then((data: Partial<SiteSettings>) => {
      cached = { ...DEFAULTS, ...data, free_shipping_threshold: Number(data.free_shipping_threshold ?? 0) };
      return cached;
    })
    .catch(() => DEFAULTS)
    .finally(() => { inFlight = null; });

  return inFlight;
}

/** Site-wide settings from wp-admin -> Valkyrie CMS -> Site Settings (VCMS_Options). */
export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(cached ?? DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    fetchSettings().then((s) => { if (!cancelled) setSettings(s); });
    return () => { cancelled = true; };
  }, []);

  return settings;
}
