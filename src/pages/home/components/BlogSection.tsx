import { Link } from "react-router-dom";
import { blogPosts } from "@/mocks/blog";

const featured = blogPosts.filter((p) => p.featured).slice(0, 3);

export default function BlogSection() {
  return (
    <section className="py-24 px-8" style={{ background: "#ffffff", borderTop: "1px solid #ebebeb" }}>
      <div className="max-w-[1320px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">
              Research &amp; News
            </p>
            <h2
              className="font-black uppercase leading-[0.88] tracking-tight"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(30px, 4vw, 52px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              LATEST FROM<br />
              <span style={{ background: "linear-gradient(135deg, #777 0%, #b0b0b0 30%, #555 55%, #999 75%, #666 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
                THE LAB
              </span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-[11px] px-6 py-3 cursor-pointer whitespace-nowrap transition-all duration-200 self-end"
            style={{ border: "1.5px solid #111", color: "#111" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#111"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#111"; }}
          >
            View All Posts
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-xs"></i>
            </div>
          </Link>
        </div>

        {/* Grid - first post is large, next two are smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>

          {/* Featured large post */}
          {featured[0] && (
            <Link
              to={`/blog/${featured[0].slug}`}
              className="lg:col-span-2 group flex flex-col bg-white cursor-pointer"
            >
              <div className="relative overflow-hidden" style={{ height: 320 }}>
                <img
                  src={featured[0].image}
                  alt={featured[0].title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5"
                    style={{ background: "#111", color: "#fff" }}
                  >
                    {featured[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{featured[0].date}</span>
                  <span className="text-[#ddd]">·</span>
                  <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{featured[0].readTime}</span>
                </div>
                <h3
                  className="font-black uppercase leading-tight tracking-tight text-[#111] mb-3 group-hover:text-[#444] transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  {featured[0].title}
                </h3>
                <p className="text-[#777] text-sm leading-relaxed flex-1">{featured[0].excerpt}</p>
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#111]">Read Article</span>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-xs text-[#111]"></i>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Two smaller posts stacked */}
          <div className="flex flex-col gap-px" style={{ background: "#e0e0e0" }}>
            {featured.slice(1, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col bg-white cursor-pointer flex-1"
              >
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1"
                      style={{ background: "#111", color: "#fff" }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{post.date}</span>
                    <span className="text-[#ddd]">·</span>
                    <span className="text-[#aaa] text-[10px] uppercase tracking-widest">{post.readTime}</span>
                  </div>
                  <h3
                    className="font-black uppercase leading-tight tracking-tight text-[#111] text-sm group-hover:text-[#444] transition-colors flex-1"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {post.title}
                  </h3>
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
    </section>
  );
}
