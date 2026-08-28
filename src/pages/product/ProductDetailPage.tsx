import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { getProductBySlug, getProductReviews, submitProductReview, type NormalizedProduct, normalizeProduct, type WCReview } from "@/lib/woocommerce";
import { useCart } from "@/hooks/useCart";
import WaitlistModal from "@/components/feature/WaitlistModal";
import RelatedProducts from "@/pages/product/components/RelatedProducts";
import ProductGallery from "@/pages/product/components/ProductGallery";
import ProductPurchasePanel from "@/pages/product/components/ProductPurchasePanel";
import ProductFAQSection from "@/pages/product/components/ProductFAQSection";
import ProductTabBar, { type TabKey } from "@/pages/product/components/ProductTabBar";
import ProductTabContent from "@/pages/product/components/ProductTabContent";

// Variant groups - simple products that are size variants of each other.
// Key = base slug (no size suffix), value = ordered array of slugs by size.
// Add new groups here whenever a new size is added to WooCommerce.
const VARIANT_GROUPS: Record<string, string[]> = {
  "nad":     ["nad-500mg",      "nad-1000mg"],
  "glp-3-rt":["glp-3-rt-10mg", "glp-3-rt-30mg"],
};

/** Returns the sibling slugs for the current product, or null if it has no variants. */
function getVariantGroup(slug: string): string[] | null {
  for (const siblings of Object.values(VARIANT_GROUPS)) {
    if (siblings.includes(slug)) return siblings;
  }
  return null;
}

// Stable-random viewer count seeded from slug - changes on each page load but
// stays consistent within a session so it doesn't flicker on re-renders.
function getViewerCount(slug: string): number {
  let hash = 0;
  const seed = slug + String(Math.floor(Date.now() / 300_000)); // changes every 5 min
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return 11 + (Math.abs(hash) % 7); // range 11–17
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const variantGroup = getVariantGroup(slug ?? "");

  // Stable viewer count for this page load - seeded from slug + time window
  const [viewerCount] = useState(() => getViewerCount(slug ?? ""));

  const [product, setProduct] = useState<NormalizedProduct | null>(null);
  const [reviews, setReviews] = useState<WCReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Review form state
  const [reviewForm, setReviewForm] = useState({ name: "", email: "", rating: 0, text: "" });
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setNotFound(false);
    setProduct(null);
    setSelectedImage(0);

    getProductBySlug(slug ?? "")
      .then((wc) => {
        if (!wc) {
          setNotFound(true);
        } else {
          const normalized = normalizeProduct(wc);
          setProduct(normalized);
          // Fetch real WooCommerce reviews for this product
          setReviewsLoading(true);
          getProductReviews(wc.id)
            .then(setReviews)
            .catch(() => setReviews([]))
            .finally(() => setReviewsLoading(false));
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const isOutOfStock = product ? !product.inStock : false;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleReviewSubmit = async () => {
    if (!product) return;
    if (!reviewForm.name.trim() || !reviewForm.email.trim() || !reviewForm.text.trim() || reviewForm.rating === 0) {
      setReviewError("Please fill in all fields and select a star rating.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewForm.email);
    if (!emailOk) { setReviewError("Please enter a valid email address."); return; }
    setReviewError(null);
    setReviewSubmitting(true);
    try {
      const newReview = await submitProductReview({
        product_id: product.id,
        review: reviewForm.text.trim(),
        reviewer: reviewForm.name.trim(),
        reviewer_email: reviewForm.email.trim(),
        rating: reviewForm.rating,
      });
      setReviews((prev) => [newReview, ...prev]);
      setReviewSubmitted(true);
      setReviewForm({ name: "", email: "", rating: 0, text: "" });
    } catch {
      setReviewError("Something went wrong submitting your review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#f8f7f5" }}>
        <div className="fixed top-0 left-0 right-0 z-50"><Navbar /></div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ paddingTop: 64 }}>
          <span className="inline-block w-8 h-8 border-2 border-[#bbb] border-t-[#111] rounded-full animate-spin" />
          <p className="text-[#aaa] text-xs font-bold uppercase tracking-widest">Loading…</p>
        </div>
      </div>
    );
  }

  if (!product || notFound) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#f8f7f5" }}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingTop: 64 }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-4">404 - Not Found</p>
          <h1 className="font-black uppercase text-[#111] text-4xl mb-6">Product Not Found</h1>
          <p className="text-[#888] text-sm mb-8">This product doesn&apos;t exist or may have been removed.</p>
          <Link to="/shop" className="font-black uppercase tracking-widest text-sm px-8 py-4 text-white cursor-pointer whitespace-nowrap" style={{ background: "#111" }}>Back to Shop</Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  // If WooCommerce has no sale price set (originalPrice === price), show a $20 markup
  // as the compare-at price so the "SAVE" badge is always meaningful.
  const displayOriginalPrice = product.originalPrice > product.price
    ? product.originalPrice
    : product.price + 20;
  const savings = displayOriginalPrice - product.price;
  const savingsPct = Math.round((savings / displayOriginalPrice) * 100);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        {/* Breadcrumb */}
        <div style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }} className="px-8 py-3">
          <div className="max-w-[1320px] mx-auto flex items-center gap-2 text-xs text-[#aaa]">
            <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/shop" className="hover:text-[#111] transition-colors cursor-pointer">Shop Peptides</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-[#111]">{product.name}</span>
          </div>
        </div>

        {/* Main product layout */}
        <section style={{ background: "#ffffff" }} className="py-14 px-8">
          <div className="max-w-[1320px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
              <ProductGallery
                product={product}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                slug={slug ?? ""}
                savingsPct={savingsPct}
              />
              <ProductPurchasePanel
                product={product}
                slug={slug ?? ""}
                variantGroup={variantGroup}
                reviews={reviews}
                isOutOfStock={isOutOfStock}
                quantity={quantity}
                setQuantity={setQuantity}
                added={added}
                onAddToCart={handleAddToCart}
                onWaitlist={() => setShowWaitlist(true)}
                viewerCount={viewerCount}
                displayOriginalPrice={displayOriginalPrice}
                savings={savings}
                savingsPct={savingsPct}
              />
            </div>
          </div>
        </section>

        <ProductTabBar product={product} activeTab={activeTab} setActiveTab={setActiveTab} reviews={reviews} />
        <ProductTabContent
          product={product}
          slug={slug ?? ""}
          activeTab={activeTab}
          reviews={reviews}
          reviewsLoading={reviewsLoading}
          reviewForm={reviewForm}
          reviewHover={reviewHover}
          reviewSubmitting={reviewSubmitting}
          reviewSubmitted={reviewSubmitted}
          reviewError={reviewError}
          setReviewForm={setReviewForm}
          setReviewHover={setReviewHover}
          setReviewSubmitted={setReviewSubmitted}
          handleReviewSubmit={handleReviewSubmit}
          setLightboxImg={setLightboxImg}
        />

        {/* COA Lightbox */}
        {lightboxImg && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setLightboxImg(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightboxImg}
                alt="COA full view"
                className="max-w-full max-h-[85vh] object-contain"
                style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.6)" }}
              />
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center cursor-pointer transition-colors"
                style={{ background: "#111", color: "#fff", transform: "translate(50%,-50%)" }}
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
          </div>
        )}
        <ProductFAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

        {/* Related products */}
        <section style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }} className="py-16 px-8">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-2">More Products</p>
                <h2 className="font-black text-2xl uppercase tracking-tight text-[#111]">YOU MAY ALSO LIKE</h2>
              </div>
              <Link to="/shop" className="text-sm font-bold uppercase tracking-widest text-[#555] hover:text-[#111] transition-colors cursor-pointer whitespace-nowrap">
                View All
              </Link>
            </div>
            <RelatedProducts currentSlug={slug ?? ""} />
          </div>
        </section>

        {showWaitlist && (
          <WaitlistModal
            productName={product.name}
            onClose={() => setShowWaitlist(false)}
          />
        )}
        <FooterSection />
      </div>
    </div>
  );
}