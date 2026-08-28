import { Link } from "react-router-dom";
import type { BlogPost } from "@/mocks/blog";

interface BlogRelatedPostsProps {
  posts: BlogPost[];
}

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="px-4 md:px-8 pb-10 md:pb-16" style={{ background: "#f8f7f5", borderTop: "1px solid #ebebeb" }}>
      <div className="max-w-[1320px] mx-auto pt-12">
        <div className="flex items-center justify-between mb-8">
          <h3
            className="font-black uppercase tracking-tight"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(20px, 2vw, 28px)",
              background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            More Articles
          </h3>
          <Link
            to="/blog"
            className="text-[11px] font-black uppercase tracking-widest text-[#aaa] hover:text-[#111] transition-colors cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
          {posts.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group flex flex-col bg-white cursor-pointer"
            >
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1" style={{ background: "#111", color: "#fff" }}>
                    {p.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[#aaa] text-[10px] uppercase tracking-widest mb-2">{p.date}</span>
                <h4
                  className="font-black uppercase leading-tight tracking-tight text-[#111] text-sm group-hover:text-[#444] transition-colors flex-1"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {p.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#aaa] group-hover:text-[#111] transition-colors">Read</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-[10px] text-[#aaa] group-hover:text-[#111] transition-colors"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
