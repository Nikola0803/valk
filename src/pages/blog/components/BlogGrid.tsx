import { Link } from "react-router-dom";
import type { BlogPost } from "@/mocks/blog";

interface BlogGridProps {
  filtered: BlogPost[];
}

export default function BlogGrid({ filtered }: BlogGridProps) {
  const [hero, ...rest] = filtered;

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#aaa] text-sm font-semibold uppercase tracking-widest">No articles in this category</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero post */}
      {hero && (
        <Link
          to={`/blog/${hero.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-px mb-px cursor-pointer"
          style={{ background: "#e0e0e0" }}
        >
          <div className="relative overflow-hidden bg-white" style={{ minHeight: 380 }}>
            <img
              src={hero.image}
              alt={hero.title}
              className="w-full h-full object-cover object-top absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute top-5 left-5">
              <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5" style={{ background: "#111", color: "#fff" }}>
                {hero.category}
              </span>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{hero.date}</span>
              <span className="text-[#ddd]">·</span>
              <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{hero.readTime}</span>
            </div>
            <h2
              className="font-black uppercase leading-tight tracking-tight mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(22px, 2.5vw, 36px)",
                background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {hero.title}
            </h2>
            <p className="text-[#777] text-sm leading-relaxed mb-8">{hero.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {hero.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1" style={{ background: "#f5f4f2", color: "#888", border: "1px solid #e0e0e0" }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#111]">Read Article</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line text-xs"></i>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Rest of posts grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-px" style={{ background: "#e0e0e0" }}>
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-white cursor-pointer"
            >
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1" style={{ background: "#111", color: "#fff" }}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{post.date}</span>
                  <span className="text-[#ddd]">·</span>
                  <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{post.readTime}</span>
                </div>
                <h3
                  className="font-black uppercase leading-tight tracking-tight mb-3 flex-1"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 16,
                    background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {post.title}
                </h3>
                <p className="text-[#888] text-xs leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5" style={{ background: "#f5f4f2", color: "#999", border: "1px solid #e8e8e8" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#aaa] group-hover:text-[#111] transition-colors">Read Article</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-[10px] text-[#aaa] group-hover:text-[#111] transition-colors"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
