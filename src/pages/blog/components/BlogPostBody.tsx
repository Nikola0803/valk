import type { ReactNode } from "react";

interface BlogPostBodyProps {
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  author: string;
  authorRole: string;
}

function renderBody(body: string) {
  const lines = body.split("\n");
  const elements: ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="font-black uppercase tracking-tight mt-10 mb-4"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(18px, 2vw, 24px)",
            background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else {
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={key++} className="text-[#555] text-base leading-[1.85] mb-4">
          {parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={i} className="text-[#111] font-bold">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    }
  }
  return elements;
}

export default function BlogPostBody({ title, excerpt, body, tags, author, authorRole }: BlogPostBodyProps) {
  return (
    <div className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-[860px] mx-auto">

        {/* Lead excerpt */}
        <p
          className="text-[#333] text-lg leading-relaxed mb-10 font-medium"
          style={{ borderLeft: "3px solid #111", paddingLeft: 20 }}
        >
          {excerpt}
        </p>

        {/* Body */}
        <div>{renderBody(body)}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8" style={{ borderTop: "1px solid #ebebeb" }}>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#aaa] mr-2 self-center">Tags:</span>
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5" style={{ background: "#f5f4f2", color: "#666", border: "1px solid #e0e0e0" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Author card */}
        <div className="flex items-center gap-5 mt-10 p-6" style={{ background: "#f8f7f5", border: "1px solid #ebebeb" }}>
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: "#111" }}>
            <i className="ri-microscope-line text-white text-xl"></i>
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-tight text-[#111]">{author}</p>
            <p className="text-[#888] text-xs mt-0.5">{authorRole} · Warrior Distributions</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-5" style={{ background: "#fffbf0", border: "1px solid #f0e8c8" }}>
          <p className="text-[#888] text-xs leading-relaxed">
            <strong className="text-[#666]">Research Use Only.</strong> All content on this page is intended for educational and informational purposes only. Products referenced are for research use only and are not intended for human consumption, injection, or therapeutic use.
          </p>
        </div>
      </div>
    </div>
  );
}
