import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { CartProvider } from "@/hooks/useCart";
import AccessGate from "@/components/feature/AccessGate";
import CouponToast from "@/components/feature/CouponToast";

const CANONICAL_BASE = "https://valkyriepeptides.com";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function CanonicalUpdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Normalise path - strip trailing slash except root
    const normalised = pathname !== "/" ? pathname.replace(/\/$/, "") : "/";
    const url = `${CANONICAL_BASE}${normalised}`;
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname]);
  return null;
}

function App() {
  return (
    // <AccessGate>
      <I18nextProvider i18n={i18n}>
        <CartProvider>
          <BrowserRouter basename={__BASE_PATH__}>
            <ScrollToTop />
            <CanonicalUpdater />
            <AppRoutes />
          </BrowserRouter>
          <CouponToast />
        </CartProvider>
      </I18nextProvider>
    // </AccessGate>
  );
}

export default App;