import { Link } from "react-router-dom";

interface COAFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  categories: string[];
  filteredCount: number;
  totalCount: number;
}

export default function COAFilters({
  search, setSearch, activeCategory, setActiveCategory,
  categories, filteredCount, totalCount,
}: COAFiltersProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="px-8 py-3" style={{ borderBottom: "1px solid #eaeaea" }}>
        <div className="max-w-[1320px] mx-auto flex items-center gap-2 text-xs text-[#bbb]">
          <Link to="/" className="hover:text-[#111] transition-colors duration-300 cursor-pointer">Home</Link>
          <i className="ri-arrow-right-s-line text-[10px]"></i>
          <span className="text-[#111] font-semibold">COAs</span>
        </div>
      </div>

      {/* Search + category filters */}
      <div className="px-8 pt-10 pb-8 bg-white">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                <i className="ri-search-line text-[#bbb] text-sm"></i>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-10 py-3 text-sm text-[#111] outline-none transition-all duration-300"
                style={{ background: "#f7f7f7", border: "1.5px solid #e8e8e8", borderRadius: 6 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.background = "#f7f7f7"; }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#eee] transition-colors duration-200 cursor-pointer"
                >
                  <i className="ri-close-line text-[#888] text-xs"></i>
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap"
                  style={{
                    background: activeCategory === cat ? "#111" : "transparent",
                    color: activeCategory === cat ? "#fff" : "#888",
                    border: activeCategory === cat ? "1.5px solid #111" : "1.5px solid #e0e0e0",
                  }}
                  onMouseEnter={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "#bbb"; e.currentTarget.style.color = "#555"; } }}
                  onMouseLeave={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#888"; } }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#bbb] mt-5 font-medium">
            Showing <span className="text-[#111] font-bold">{filteredCount}</span> of {totalCount} products
          </p>
        </div>
      </div>
    </>
  );
}
