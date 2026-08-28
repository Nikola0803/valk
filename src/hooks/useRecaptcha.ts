import { useCallback, useEffect, useRef, useState } from "react";

type RecaptchaConfig = { enabled: boolean; site_key: string };

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let configPromise: Promise<RecaptchaConfig> | null = null;

function fetchConfig(): Promise<RecaptchaConfig> {
  if (configPromise) return configPromise;
  const WC_URL = import.meta.env.VITE_WC_URL as string;
  configPromise = fetch(`${WC_URL}/wp-json/valkyrie/v1/recaptcha-config`)
    .then((res) => (res.ok ? res.json() : { enabled: false, site_key: "" }))
    .catch(() => ({ enabled: false, site_key: "" }));
  return configPromise;
}

function loadScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-recaptcha]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      if (window.grecaptcha) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.dataset.recaptcha = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
}

/**
 * Invisible reCAPTCHA v3 token issuer, config-driven from wp-admin.
 * If reCAPTCHA isn't enabled/configured yet, getToken() resolves to an empty
 * string so form submissions keep working - the backend treats a missing
 * token the same way (see valkyrie_recaptcha_passes()).
 */
export function useRecaptcha(action: string) {
  const [ready, setReady] = useState(false);
  const siteKeyRef = useRef("");

  useEffect(() => {
    let cancelled = false;
    fetchConfig().then((cfg) => {
      if (cancelled || !cfg.enabled || !cfg.site_key) return;
      siteKeyRef.current = cfg.site_key;
      loadScript(cfg.site_key)
        .then(() => window.grecaptcha?.ready(() => { if (!cancelled) setReady(true); }))
        .catch(() => {});
    });
    return () => { cancelled = true; };
  }, []);

  const getToken = useCallback(async (): Promise<string> => {
    if (!ready || !siteKeyRef.current || !window.grecaptcha) return "";
    try {
      return await window.grecaptcha.execute(siteKeyRef.current, { action });
    } catch {
      return "";
    }
  }, [ready, action]);

  return { getToken };
}
