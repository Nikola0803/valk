// First-touch marketing attribution - captures where a visitor actually came
// from (a specific ad agency, email, organic search, a link from elsewhere,
// or typed the URL directly) and rides along with every order so it shows up
// per-order in wp-admin and can be aggregated into a source report.
//
// Same pattern as affiliate.ts's GoAffPro "dcode" capture: grab it on the
// very first hit, before React Router strips query params on navigation, and
// keep only the FIRST value seen per visitor - the ad/email/search that
// actually got them here, not whatever page they're on when they buy.

export interface Attribution {
  source: string;   // e.g. "agency1", "agency2", "meta-untagged", "google-ads", "organic", "referral", "direct"
  medium: string;   // "paid-social" | "paid-search" | "email" | "organic-search" | "referral" | "direct"
  campaign: string; // utm_campaign, if present
  referrer: string; // raw referring domain, mainly useful for the "referral" bucket
  landing: string;  // first page path they landed on
}

const STORAGE_KEY = "vk_attribution";

const SEARCH_ENGINE_HOSTS = ["google.", "bing.", "yahoo.", "duckduckgo.", "baidu.", "ecosia."];

function classify(params: URLSearchParams, referrer: string): Attribution {
  const utmSource   = params.get("utm_source")?.trim().toLowerCase() ?? "";
  const utmMedium   = params.get("utm_medium")?.trim().toLowerCase() ?? "";
  const utmCampaign = params.get("utm_campaign")?.trim() ?? "";

  let refHost = "";
  try { refHost = referrer ? new URL(referrer).hostname.toLowerCase() : ""; } catch { /* ignore */ }

  // 1. Explicit UTM tagging wins outright - this is how the two ad agencies
  //    (and Omnisend campaigns) become distinguishable from each other.
  //    Ask each agency/sender to tag links with a distinct utm_source
  //    (e.g. utm_source=agency1, utm_source=agency2, utm_source=omnisend) -
  //    without that, paid clicks fall through to the "meta-untagged"/
  //    "google-ads" buckets below, which flag the traffic as paid but can't
  //    tell WHICH agency's campaign it came from.
  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium || "paid",
      campaign: utmCampaign,
      referrer: refHost,
      landing: window.location.pathname,
    };
  }

  // 2. Ad click IDs present but no UTM - definitely a paid click, just not
  //    attributable to a specific agency/campaign without #1 in place.
  if (params.get("fbclid")) {
    return { source: "meta-untagged", medium: "paid-social", campaign: "", referrer: refHost, landing: window.location.pathname };
  }
  if (params.get("gclid")) {
    return { source: "google-ads", medium: "paid-search", campaign: "", referrer: refHost, landing: window.location.pathname };
  }
  if (params.get("ttclid")) {
    return { source: "tiktok-ads", medium: "paid-social", campaign: "", referrer: refHost, landing: window.location.pathname };
  }

  // 3. Organic search - has a referrer, and it's a known search engine.
  if (refHost && SEARCH_ENGINE_HOSTS.some(h => refHost.includes(h))) {
    return { source: "organic", medium: "organic-search", campaign: "", referrer: refHost, landing: window.location.pathname };
  }

  // 4. Referral - came from some other site (not a search engine, no ad click id).
  if (refHost) {
    return { source: "referral", medium: "referral", campaign: "", referrer: refHost, landing: window.location.pathname };
  }

  // 5. Direct - no referrer, no UTM, no click id. Typed the URL, used a
  //    bookmark, or came from somewhere that stripped the referrer (some
  //    email clients do this - hence utm tagging on email sends matters).
  return { source: "direct", medium: "direct", campaign: "", referrer: "", landing: window.location.pathname };
}

/** Captures first-touch attribution on boot. No-ops if already captured this visitor. */
export function captureAttribution(): void {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return; // first-touch only - never overwrite
    const params = new URLSearchParams(window.location.search);
    const attribution = classify(params, document.referrer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage may be unavailable (privacy mode, etc) - fail silently, order just won't carry attribution meta.
  }
}

export function getAttribution(): Attribution | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"); } catch { return null; }
}

/** Flattened as WooCommerce order meta_data entries - same shape for both the manual-order path and the Tagada extension payload. */
export function getAttributionMetaData(): { key: string; value: string }[] {
  const a = getAttribution();
  if (!a) return [];
  return [
    { key: "_vk_attrib_source",   value: a.source },
    { key: "_vk_attrib_medium",   value: a.medium },
    { key: "_vk_attrib_campaign", value: a.campaign },
    { key: "_vk_attrib_referrer", value: a.referrer },
    { key: "_vk_attrib_landing",  value: a.landing },
  ].filter(m => m.value !== "");
}
