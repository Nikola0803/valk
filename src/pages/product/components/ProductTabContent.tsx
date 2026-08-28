import type { NormalizedProduct, WCReview } from "@/lib/woocommerce";
import { parseAdditionalInfo, productTabs as staticTabData } from "@/data/productTabs";
import { productCatalog } from "@/mocks/productDetail";
import type { TabKey } from "./ProductTabBar";

interface ProductTabContentProps {
  product: NormalizedProduct;
  slug: string;
  activeTab: TabKey;
  reviews: WCReview[];
  reviewsLoading: boolean;
  reviewForm: { name: string; email: string; rating: number; text: string };
  reviewHover: number;
  reviewSubmitting: boolean;
  reviewSubmitted: boolean;
  reviewError: string | null;
  setReviewForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; rating: number; text: string }>>;
  setReviewHover: (n: number) => void;
  setReviewSubmitted: (v: boolean) => void;
  handleReviewSubmit: () => void;
  setLightboxImg: (url: string) => void;
}

export default function ProductTabContent({
  product, slug, activeTab,
  reviews, reviewsLoading,
  reviewForm, reviewHover, reviewSubmitting, reviewSubmitted, reviewError,
  setReviewForm, setReviewHover, setReviewSubmitted, handleReviewSubmit,
  setLightboxImg,
}: ProductTabContentProps) {
  const staticTab  = staticTabData[product.id];
  const coaImages  = product.coaImages?.length ? product.coaImages : (staticTab?.coa ?? []);
  const addInfo    = product.additionalInfo    ? product.additionalInfo : (staticTab?.additionalInfo ?? "");

  return (
    <section style={{ background: "#ffffff" }} className="px-8 py-14">
      <div className="max-w-[1320px] mx-auto">

        {/* Description */}
        {activeTab === "description" && (() => {
          const staticDetail = slug ? productCatalog[slug] : null;
          const descriptionHtml = product.description || "";
          const staticDesc = staticDetail?.description ?? "";
          return (
            <div className="max-w-[760px]">
              <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-6">Product Description</h2>
              {descriptionHtml ? (
                <div className="text-[#555] text-sm leading-relaxed mb-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              ) : staticDesc ? (
                <div className="text-[#555] text-sm leading-relaxed mb-4 whitespace-pre-line">{staticDesc}</div>
              ) : (
                <p className="text-[#555] text-sm leading-relaxed mb-4">
                  Research-grade lyophilized peptide manufactured in the USA. Every batch independently verified for purity, identity, and composition by certified third-party laboratories.
                </p>
              )}
              {staticDetail?.researchBenefits && staticDetail.researchBenefits.length > 0 && (
                <div className="mt-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#aaa] mb-4">Research Applications</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {staticDetail.researchBenefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 p-4" style={{ background: "#f8f7f5", border: "1px solid #ebebeb" }}>
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
                          <i className={`${b.icon} text-white text-sm`}></i>
                        </div>
                        <div>
                          <p className="text-[#111] font-bold text-xs mb-1">{b.title}</p>
                          <p className="text-[#666] text-xs leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { test: "HPLC Purity Analysis",      result: "99.4% - Pass" },
                  { test: "Mass Spectrometry (MS)",     result: "Confirmed Identity - Pass" },
                  { test: "Endotoxin Testing (LAL)",    result: "&lt;1 EU/mg - Pass" },
                  { test: "Sterility Testing",          result: "No Contamination - Pass" },
                  { test: "Heavy Metal Screening",      result: "Below Detection Limit - Pass" },
                  { test: "Residual Solvent Analysis",  result: "ICH Q3C Compliant - Pass" },
                ].map((test) => (
                  <div key={test.test} className="flex items-center gap-3 p-4" style={{ background: "#f8fff8", border: "1px solid #d8f0d8" }}>
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-shield-check-fill text-green-600 text-base"></i>
                    </div>
                    <div>
                      <p className="text-[#111] font-bold text-xs">{test.test}</p>
                      <p className="text-green-700 text-xs mt-0.5" dangerouslySetInnerHTML={{ __html: test.result }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Specs */}
        {activeTab === "specs" && (() => {
          const staticDetail = slug ? productCatalog[slug] : null;
          return (
            <div className="max-w-[680px]">
              <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-6">Technical Specifications</h2>
              <div className="divide-y" style={{ borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8" }}>
                {[
                  { label: "Product Name",     value: product.name },
                  { label: "SKU",              value: product.sku || staticDetail?.sku || "—" },
                  { label: "Form",             value: "Lyophilized Powder" },
                  { label: "Purity",           value: staticDetail?.purity ? `${staticDetail.purity} (HPLC Verified)` : "≥99% (HPLC Verified)" },
                  { label: "Molecular Weight", value: staticDetail?.molecularWeight || "—" },
                  { label: "Sequence",         value: staticDetail?.sequence || "—" },
                  { label: "Solubility",       value: staticDetail?.solubility || "Sterile or bacteriostatic water" },
                  { label: "Storage",          value: staticDetail?.storage || "-20°C, Protect from Light" },
                  { label: "Shelf Life",       value: "24 months lyophilized" },
                  { label: "Origin",           value: "USA" },
                ].filter(s => s.value && s.value !== "—").map((spec, i) => (
                  <div key={i} className="grid grid-cols-2 py-4 px-2 hover:bg-[#f8f7f5] transition-colors">
                    <span className="text-[#888] text-sm font-medium">{spec.label}</span>
                    <span className="text-[#111] text-sm font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5" style={{ background: "#f8f7f5", border: "1px solid #e0e0e0" }}>
                <p className="text-[#777] text-xs leading-relaxed">
                  <strong className="text-[#555]">Storage Note:</strong> Lyophilized peptides should be stored at -20°C in a frost-free freezer. Protect from light and moisture. Once reconstituted, store at 4°C and use within 28 days. Do not refreeze reconstituted peptides.
                </p>
              </div>
            </div>
          );
        })()}

        {/* Research */}
        {activeTab === "research" && (
          <div>
            <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-4">Research Applications</h2>
            <p className="text-[#888] text-sm mb-10 max-w-xl">
              The following research areas are based on published scientific literature. This information is provided for research context only and does not constitute medical claims.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "#e0e0e0" }}>
              {[
                { icon: "ri-microscope-line",  title: "In Vitro Research",       desc: "Used in controlled laboratory settings to study cellular mechanisms and biochemical pathways." },
                { icon: "ri-dna-line",          title: "Peptide Binding Studies", desc: "Enables researchers to investigate receptor binding affinity and downstream signaling cascades." },
                { icon: "ri-flask-line",        title: "Stability Testing",       desc: "Lyophilized form provides extended shelf life for long-duration research protocols." },
                { icon: "ri-bar-chart-line",    title: "Dose-Response Analysis",  desc: "High-purity formulation ensures reproducible results across experimental replicates." },
              ].map((benefit, i) => (
                <div key={i} className="bg-white p-8 flex flex-col gap-4">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ background: "#111" }}>
                    <i className={`${benefit.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="font-black text-base uppercase tracking-tight text-[#111]">{benefit.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5" style={{ background: "#fff8f8", border: "1px solid #fce8e8" }}>
              <p className="text-[#dc2626] text-xs font-bold uppercase tracking-wide mb-1">Research Use Only Disclaimer</p>
              <p className="text-[#777] text-xs leading-relaxed">
                All research benefits described above are based on in vitro and animal model studies. These products are not drugs and are not intended to diagnose, treat, cure, or prevent any disease. For research use only.
              </p>
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div>
            {reviewsLoading ? (
              <div className="flex items-center gap-3 py-16">
                <span className="inline-block w-5 h-5 border-2 border-[#bbb] border-t-[#111] rounded-full animate-spin" />
                <p className="text-[#aaa] text-xs font-bold uppercase tracking-widest">Loading reviews…</p>
              </div>
            ) : (
              <>
                {reviews.length === 0 && (
                  <div className="py-10 text-center" style={{ borderBottom: "1px solid #e8e8e8" }}>
                    <p className="text-[#aaa] text-sm font-bold uppercase tracking-widest mb-2">No Reviews Yet</p>
                    <p className="text-[#bbb] text-xs">Be the first to review this product below.</p>
                  </div>
                )}
                {reviews.length > 0 && (
                  <div className="flex items-end justify-between mb-10">
                    <div>
                      <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-3">Customer Reviews</h2>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-5 h-5 flex items-center justify-center">
                              <i className="ri-star-fill text-[#00b67a] text-base"></i>
                            </div>
                          ))}
                        </div>
                        <span className="font-black text-2xl text-[#111]">
                          {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
                        </span>
                        <span className="text-[#aaa] text-sm">
                          Based on {reviews.length} verified {reviews.length === 1 ? "review" : "reviews"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-8" style={{ background: "#e0e0e0" }}>
                  {reviews.map((review) => {
                    const initials = review.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
                    const plainText = review.review.replace(/<[^>]+>/g, "").trim();
                    return (
                      <div key={review.id} className="flex flex-col gap-4 p-7 bg-white">
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <div key={j} className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-star-fill text-[#00b67a] text-sm"></i>
                            </div>
                          ))}
                          {Array.from({ length: 5 - review.rating }).map((_, j) => (
                            <div key={`e${j}`} className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-star-line text-[#ddd] text-sm"></i>
                            </div>
                          ))}
                        </div>
                        <p className="text-[#444] text-sm leading-relaxed flex-1">&ldquo;{plainText}&rdquo;</p>
                        <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #ebebeb" }}>
                          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 font-black text-xs text-white" style={{ background: "#111" }}>{initials}</div>
                          <div>
                            <p className="text-[#111] font-bold text-sm">{review.name}</p>
                            <p className="text-[#aaa] text-xs">
                              {new Date(review.date_created).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </p>
                          </div>
                          {review.verified && (
                            <div className="ml-auto flex items-center gap-1">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-verified-badge-fill text-green-600 text-sm"></i>
                              </div>
                              <span className="text-green-700 text-[10px] font-bold">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Write a Review */}
                <div className="mt-10 max-w-[680px]">
                  <h3 className="font-black text-lg uppercase tracking-tight text-[#111] mb-6">
                    {reviewSubmitted ? "Thank You!" : "Write a Review"}
                  </h3>
                  {reviewSubmitted ? (
                    <div className="p-6 flex items-center gap-4" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-double-line text-green-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-green-800 font-bold text-sm">Review submitted!</p>
                        <p className="text-green-700 text-xs mt-0.5">Your review has been submitted and will appear shortly.</p>
                      </div>
                      <button
                        onClick={() => setReviewSubmitted(false)}
                        className="ml-auto text-xs font-bold uppercase tracking-widest text-green-700 hover:text-green-900 transition-colors cursor-pointer"
                      >
                        Write Another
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-2">Your Rating *</p>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                              onMouseEnter={() => setReviewHover(star)}
                              onMouseLeave={() => setReviewHover(0)}
                              className="w-8 h-8 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                            >
                              <i className={`text-xl ${(reviewHover || reviewForm.rating) >= star ? "ri-star-fill text-[#00b67a]" : "ri-star-line text-[#ccc]"}`}></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">Name *</label>
                          <input type="text" value={reviewForm.name} onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" className="px-4 py-3 text-sm text-[#111] outline-none focus:border-[#111] transition-colors" style={{ border: "1px solid #e0e0e0", background: "#fafafa" }} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">Email * <span className="normal-case tracking-normal font-normal">(not published)</span></label>
                          <input type="email" value={reviewForm.email} onChange={(e) => setReviewForm((f) => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="px-4 py-3 text-sm text-[#111] outline-none focus:border-[#111] transition-colors" style={{ border: "1px solid #e0e0e0", background: "#fafafa" }} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">Your Review *</label>
                        <textarea rows={4} value={reviewForm.text} onChange={(e) => setReviewForm((f) => ({ ...f, text: e.target.value }))} placeholder="Share your experience with this product..." className="px-4 py-3 text-sm text-[#111] outline-none focus:border-[#111] transition-colors resize-none" style={{ border: "1px solid #e0e0e0", background: "#fafafa" }} />
                      </div>
                      {reviewError && <p className="text-red-600 text-xs font-semibold">{reviewError}</p>}
                      <button onClick={handleReviewSubmit} disabled={reviewSubmitting} className="self-start font-black uppercase tracking-widest text-sm px-8 py-4 text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" style={{ background: "#111" }}>
                        {reviewSubmitting ? (
                          <><span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</>
                        ) : "Submit Review"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* COA */}
        {activeTab === "coa" && (
          <div>
            <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-2">Certificate of Analysis</h2>
            <p className="text-[#888] text-sm mb-10 max-w-xl">
              Third-party laboratory purity verification for this batch. All Warrior Distributions compounds are independently tested prior to release.
            </p>
            {coaImages.length === 0 ? (
              <div className="flex items-center gap-4 p-6" style={{ background: "#f8f7f5", border: "1px solid #e0e0e0" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-text-line text-[#aaa] text-xl"></i>
                </div>
                <p className="text-[#888] text-sm">COA documentation for this product is available upon request. Please contact us at <a href="tel:2082439222" className="text-[#111] font-bold">(541)-709-5434</a>.</p>
              </div>
            ) : (
              <>
                <div className={`grid gap-4 ${coaImages.length === 1 ? "grid-cols-1 max-w-lg" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {coaImages.map((url, i) => {
                    const isPdf = /\.pdf(\?|$)/i.test(url);

                    if (isPdf) {
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="overflow-hidden group flex flex-col items-center justify-center gap-3 py-10"
                          style={{ border: "1px solid #e0e0e0", background: "#f8f7f5" }}
                        >
                          <div className="w-14 h-14 flex items-center justify-center" style={{ background: "#111" }}>
                            <i className="ri-file-pdf-2-line text-white text-2xl"></i>
                          </div>
                          <span className="text-[#111] text-sm font-bold">View Certificate of Analysis</span>
                          <div className="px-4 py-3 flex items-center gap-2 mt-1" style={{ borderTop: "1px solid #e0e0e0" }}>
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-shield-check-fill text-green-600 text-sm"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
                              {coaImages.length > 1 ? `Document ${i + 1} of ${coaImages.length} (PDF)` : "Third-Party Verified (PDF)"}
                            </span>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <div key={i} className="overflow-hidden cursor-zoom-in group" style={{ border: "1px solid #e0e0e0", background: "#f8f7f5" }} onClick={() => setLightboxImg(url)}>
                        <div className="relative overflow-hidden">
                          <img src={url} alt={`${product.name} COA page ${i + 1}`} className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" style={{ mixBlendMode: "multiply" }} />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(0,0,0,0.25)" }}>
                            <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.95)" }}>
                              <i className="ri-zoom-in-line text-[#111] text-lg"></i>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop: "1px solid #e0e0e0" }}>
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-shield-check-fill text-green-600 text-sm"></i>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
                            {coaImages.length > 1 ? `Page ${i + 1} of ${coaImages.length}` : "Third-Party Verified"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 p-5 flex items-start gap-3" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-verified-badge-fill text-green-600 text-base"></i>
                  </div>
                  <div>
                    <p className="text-green-800 font-bold text-xs uppercase tracking-wide mb-1">Independent Laboratory Verification</p>
                    <p className="text-green-700 text-xs leading-relaxed">All COAs are issued by accredited third-party laboratories. Results confirm identity, purity (≥99% by HPLC), and absence of harmful contaminants.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Additional Information */}
        {activeTab === "additional" && (() => {
          const raw  = product.additionalInfo || staticTab?.additionalInfo || "";
          const info = parseAdditionalInfo(raw);
          return (
            <div className="max-w-[820px]">
              <div className="mb-8">
                <h2 className="font-black text-2xl uppercase tracking-tight text-[#111] mb-1">{info.title}</h2>
                {info.subtitle && <p className="text-[#888] text-sm font-medium">{info.subtitle}</p>}
              </div>
              {info.intro && <p className="text-[#555] text-sm leading-relaxed mb-8">{info.intro}</p>}
              {info.sections.map((section, si) => (
                <div key={si} className="mb-8">
                  {section.header && <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#aaa] mb-4">{section.header}</p>}
                  <div className="flex flex-col gap-2">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="flex items-start gap-3 p-4" style={{ background: "#f8f7f5", border: "1px solid #ebebeb" }}>
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-flask-line text-[#555] text-sm"></i>
                        </div>
                        <p className="text-[#444] text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {info.footer.length > 0 && (
                <div className="mt-8 divide-y" style={{ borderTop: "1px solid #e8e8e8" }}>
                  {info.footer.map((note, ni) => {
                    const isDisclaimer = /for laboratory research/i.test(note);
                    return (
                      <div key={ni} className="py-3 flex items-center gap-3">
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <i className={`text-xs ${isDisclaimer ? "ri-error-warning-line text-yellow-600" : "ri-information-line text-[#aaa]"}`}></i>
                        </div>
                        <p className={`text-xs ${isDisclaimer ? "text-[#92400e] font-semibold" : "text-[#777]"}`}>{note}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

      </div>
    </section>
  );
}
