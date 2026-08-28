interface BlogPostHeroProps {
  image: string;
  title: string;
  category: string;
}

export default function BlogPostHero({ image, title, category }: BlogPostHeroProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "min(480px, 60vw)", minHeight: 240, background: "#111" }}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ opacity: 0.75 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-6 md:pb-12">
        <div className="max-w-[860px] mx-auto">
          <span
            className="inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1.5 mb-5"
            style={{ background: "#fff", color: "#111" }}
          >
            {category}
          </span>
          <h1
            className="font-black uppercase leading-tight tracking-tight"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(26px, 4vw, 52px)",
              background: "linear-gradient(135deg, #c8c8c8 0%, #f0f0f0 30%, #a0a0a0 55%, #d8d8d8 75%, #b0b0b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
