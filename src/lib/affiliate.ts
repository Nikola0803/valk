// Captures the GoAffPro "?ref=" param on boot and stores it in localStorage("dcode").
// GoAffPro's loader script is async and often hasn't run yet by the time React
// Router strips the query param off a client-side navigation, so we grab it
// ourselves first to avoid losing it.
export function captureAffiliateRef(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("dcode", ref);
    }
  } catch {
    // localStorage may be unavailable (e.g. privacy mode) - fail silently.
  }
}

const RELOAD_FLAG_PREFIX = "vk_dcode_autoreload_";

// GoAffPro only resolves the "?ref=" slug into the affiliate's real coupon
// code after a page reload, never on the first hit - tested, no visibility
// into why. So we force one reload at a meaningful moment (cart open /
// checkout) instead of on every page load. sessionStorage guards it to once
// per ref per tab.
export function triggerDcodeReloadWorkaround(): void {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref")
      ?? localStorage.getItem("dcode");
    if (!ref) return;

    const flagKey = RELOAD_FLAG_PREFIX + ref;
    if (sessionStorage.getItem(flagKey)) return;
    sessionStorage.setItem(flagKey, "1");

    window.location.reload();
  } catch {
    // ignore
  }
}
