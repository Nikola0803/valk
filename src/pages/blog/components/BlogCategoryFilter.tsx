interface BlogCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  filteredCount: number;
}

export default function BlogCategoryFilter({
  categories, activeCategory, setActiveCategory, filteredCount,
}: BlogCategoryFilterProps) {
  return (
    <div className="sticky z-20 w-full border-b border-[#ebebeb] bg-white" style={{ top: 64 }}>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all duration-150"
            style={{
              background: activeCategory === cat ? "#111111" : "#f5f4f2",
              color: activeCategory === cat ? "#ffffff" : "#888888",
            }}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-[#aaa] text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          {filteredCount} article{filteredCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
