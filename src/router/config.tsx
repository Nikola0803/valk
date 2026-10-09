import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Home from "../pages/home/page";

// Lazy-loaded so the initial bundle only has to ship the homepage's code -
// every other route's JS downloads on demand when actually navigated to,
// instead of all ~18 pages (legal, blog, checkout, account, everything)
// being bundled into one ~800KB chunk the browser has to fetch and parse
// before the homepage can even render.
const NotFound             = lazy(() => import("../pages/NotFound"));
const ShopPage             = lazy(() => import("../pages/shop/ShopPage"));
const PrivacyPolicyPage    = lazy(() => import("../pages/legal/PrivacyPolicy"));
const TermsConditionsPage  = lazy(() => import("../pages/legal/TermsConditions"));
const ReturnPolicyPage     = lazy(() => import("../pages/legal/ReturnPolicy"));
const ResearchUseOnlyPage  = lazy(() => import("../pages/legal/ResearchUseOnly"));
const ProductDetailPage    = lazy(() => import("../pages/product/ProductDetailPage"));
const ContactPage          = lazy(() => import("../pages/contact/ContactPage"));
const FAQPage              = lazy(() => import("../pages/faq/FAQPage"));
const COAPage               = lazy(() => import("../pages/coa/COAPage"));
const COAVerifyPage         = lazy(() => import("../pages/coa/COAVerifyPage"));
const VeteransPage          = lazy(() => import("../pages/veterans/VeteransPage"));
const AboutPage             = lazy(() => import("../pages/about/AboutPage"));
const BlogPage              = lazy(() => import("../pages/blog/BlogPage"));
const BlogPostPage          = lazy(() => import("../pages/blog/BlogPostPage"));
const OrderPage              = lazy(() => import("../pages/order/OrderPage"));
const CartPage               = lazy(() => import("../pages/cart/CartPage"));
const AccountPage            = lazy(() => import("../pages/account/AccountPage"));

const routes: RouteObject[] = [
  { path: "/",                      element: <Home /> },
  { path: "/shop",                  element: <ShopPage /> },
  { path: "/privacy-policy",        element: <PrivacyPolicyPage /> },
  { path: "/terms-and-conditions",  element: <TermsConditionsPage /> },
  { path: "/return-policy",         element: <ReturnPolicyPage /> },
  { path: "/research-use-only",     element: <ResearchUseOnlyPage /> },
  { path: "/products/:slug",        element: <ProductDetailPage /> },
  { path: "/contact",               element: <ContactPage /> },
  { path: "/faq",                   element: <FAQPage /> },
  { path: "/coa",                   element: <COAPage /> },
  { path: "/coa/:lot",              element: <COAVerifyPage /> },
  { path: "/veterans",              element: <VeteransPage /> },
  { path: "/about",                 element: <AboutPage /> },
  { path: "/blog",                  element: <BlogPage /> },
  { path: "/blog/:slug",            element: <BlogPostPage /> },
  { path: "/cart",                  element: <CartPage /> },
  { path: "/order",                 element: <OrderPage /> },
  { path: "/my-account",            element: <AccountPage /> },
  { path: "*",                      element: <NotFound /> },
];

export default routes;
