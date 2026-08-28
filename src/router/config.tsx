import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ShopPage from "../pages/shop/ShopPage";
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicy";
import TermsConditionsPage from "../pages/legal/TermsConditions";
import ReturnPolicyPage from "../pages/legal/ReturnPolicy";
import ResearchUseOnlyPage from "../pages/legal/ResearchUseOnly";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import ContactPage from "../pages/contact/ContactPage";
import FAQPage from "../pages/faq/FAQPage";
import COAPage from "../pages/coa/COAPage";
import COAVerifyPage from "../pages/coa/COAVerifyPage";
import VeteransPage from "../pages/veterans/VeteransPage";
import AboutPage from "../pages/about/AboutPage";
import BlogPage from "../pages/blog/BlogPage";
import BlogPostPage from "../pages/blog/BlogPostPage";
import OrderPage from "../pages/order/OrderPage";
import CartPage from "../pages/cart/CartPage";
import AccountPage from "../pages/account/AccountPage";

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
