type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Default Sorting",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
};

interface ShopToolbarProps {
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  filter: "all" | "in-stock" | "out-of-stock";
  setFilter: (filter: "all" | "in-stock" | "out-of-stock") => void;
  sortOpen: boolean;
  setSortOpen: (open: boolean) => void;
  totalCount: number;
  inStockCount: number;
  outOfStockCount: number;
  filteredCount: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export default function ShopToolbar({
  sort, setSort, filter, setFilter,
  sortOpen, setSortOpen,
  totalCount, inStockCount, outOfStockCount, filteredCount,
  loading, error, refetch,
}: ShopToolbarProps) {
  return (
    <div className="sticky top-[64px] z-20 w-full border-b border-[#ebebeb] bg-white">
      <div className="max-w-[1320px] mx-auto px-8 flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-1" style={{ background: "#f5f4f2", padding: "4px", borderRadius: 4 }}>
          {(["all", "in-stock", "out-of-stock"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap transition-all duration-150"
              style={{
                background: filter === f ? "#111111" : "transparent",
                color: filter === f ? "#ffffff" : "#888888",
                borderRadius: 2,
              }}
            >
              {f === "all" ? `All (${totalCount})` : f === "in-stock" ? `In Stock (${inStockCount})` : `Out of Stock (${outOfStockCount})`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {loading && (
            <span className="text-[#bbb] text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-[#bbb] border-t-transparent rounded-full animate-spin" />
              Loading…
            </span>
          )}
          {error && (
            <button onClick={refetch} className="text-red-500 text-xs font-bold uppercase tracking-wider cursor-pointer hover:text-red-700">
              ⚠ Retry
            </button>
          )}
          {!loading && (
            <span className="text-[#aaa] text-xs font-semibold uppercase tracking-wider">
              {filteredCount} product{filteredCount !== 1 ? "s" : ""}
            </span>
          )}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-4 py-2 cursor-pointer whitespace-nowrap transition-colors"
              style={{ border: "1px solid #e0e0e0", color: "#333" }}
            >
              {SORT_LABELS[sort]}
              <div className="w-3 h-3 flex items-center justify-center">
                {sortOpen ? <i className="ri-arrow-up-s-line text-xs"></i> : <i className="ri-arrow-down-s-line text-xs"></i>}
              </div>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white z-30" style={{ border: "1px solid #e0e0e0" }}>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSort(key); setSortOpen(false); }}
                    className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors hover:bg-[#f5f4f2] whitespace-nowrap"
                    style={{ color: sort === key ? "#111" : "#666", background: sort === key ? "#f5f4f2" : "transparent" }}
                  >
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
