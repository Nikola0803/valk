import { useState, useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { blogPosts, blogCategories } from "@/mocks/blog";
import BlogHero from "@/pages/blog/components/BlogHero";
import BlogCategoryFilter from "@/pages/blog/components/BlogCategoryFilter";
import BlogGrid from "@/pages/blog/components/BlogGrid";

export default function BlogPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <BlogHero />
        <BlogCategoryFilter
          categories={blogCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredCount={filtered.length}
        />
        <div className="py-8 md:py-12 px-4 md:px-8" style={{ background: "#f8f7f5" }}>
          <div className="max-w-[1320px] mx-auto">
            <BlogGrid filtered={filtered} />
          </div>
        </div>
        <FooterSection />
      </div>
    </div>
  );
}
