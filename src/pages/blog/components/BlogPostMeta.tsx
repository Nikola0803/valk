import { Link } from "react-router-dom";

interface BlogPostMetaProps {
  title: string;
  date: string;
  readTime: string;
  author: string;
}

export default function BlogPostMeta({ title, date, readTime, author }: BlogPostMetaProps) {
  return (
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8" }} className="px-4 md:px-8 py-3">
      <div className="max-w-[860px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-[#aaa]">
          <Link to="/" className="hover:text-[#111] transition-colors cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link to="/blog" className="hover:text-[#111] transition-colors cursor-pointer">Blog</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#111] truncate max-w-[160px]">{title}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#aaa] uppercase tracking-widest flex-wrap">
          <span>{date}</span>
          <span className="text-[#ddd]">·</span>
          <span>{readTime}</span>
          <span className="text-[#ddd]">·</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
}
