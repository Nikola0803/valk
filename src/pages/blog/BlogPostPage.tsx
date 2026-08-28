import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { blogPosts } from "@/mocks/blog";
import BlogPostHero from "@/pages/blog/components/BlogPostHero";
import BlogPostMeta from "@/pages/blog/components/BlogPostMeta";
import BlogPostBody from "@/pages/blog/components/BlogPostBody";
import BlogRelatedPosts from "@/pages/blog/components/BlogRelatedPosts";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) navigate("/blog", { replace: true });
  }, [slug, post, navigate]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <BlogPostHero image={post.image} title={post.title} category={post.category} />
        <BlogPostMeta title={post.title} date={post.date} readTime={post.readTime} author={post.author} />
        <BlogPostBody
          title={post.title}
          excerpt={post.excerpt}
          body={post.body}
          tags={post.tags}
          author={post.author}
          authorRole={post.authorRole}
        />
        <BlogRelatedPosts posts={related} />
        <FooterSection />
      </div>
    </div>
  );
}
