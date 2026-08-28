interface COADocumentModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function COADocumentModal({ url, title, onClose }: COADocumentModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col bg-white overflow-hidden"
        style={{
          width: "min(900px, 92vw)",
          height: "min(85vh, 800px)",
          borderRadius: 12,
          boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-md" style={{ background: "#111" }}>
              <i className="ri-file-text-line text-white text-sm"></i>
            </div>
            <h3 className="text-sm font-bold text-[#111] truncate pr-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[11px] font-bold text-[#666] hover:text-[#111] transition-colors duration-200 whitespace-nowrap"
            >
              Open in new tab
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#eee] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-close-line text-[#555] text-lg"></i>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden bg-[#f5f5f5]">
          <iframe src={url} title={title} className="w-full h-full" style={{ border: "none" }} />
        </div>
      </div>
    </div>
  );
}
