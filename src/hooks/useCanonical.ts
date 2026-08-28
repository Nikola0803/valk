/**
 * useCanonical - sets a <link rel="canonical"> tag in <head> for the current page.
 * Fixes the "2 versions of site on Google" issue (www vs non-www / http vs https).
 * Call this at the top of every page component.
 */

import { useEffect } from "react";

const BASE_URL = "https://warriordistributions.com";

export function useCanonical(path?: string) {
  useEffect(() => {
    // Determine canonical URL
    const canonicalPath = path ?? window.location.pathname;
    // Normalise: strip trailing slash unless it's the root
    const normalised = canonicalPath !== "/" ? canonicalPath.replace(/\/$/, "") : "/";
    const canonicalUrl = `${BASE_URL}${normalised}`;

    // Find or create the canonical link tag
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // Also ensure a noindex isn't accidentally set
    const metaRobots = document.querySelector<HTMLMetaElement>("meta[name='robots']");
    if (!metaRobots) {
      const m = document.createElement("meta");
      m.name = "robots";
      m.content = "index, follow";
      document.head.appendChild(m);
    }
  }, [path]);
}
