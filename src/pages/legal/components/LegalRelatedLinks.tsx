import { Link } from "react-router-dom";

interface LegalLink {
  label: string;
  href: string;
}

interface LegalRelatedLinksProps {
  links: LegalLink[];
}

export default function LegalRelatedLinks({ links }: LegalRelatedLinksProps) {
  return (
    <div className="mt-16 pt-10" style={{ borderTop: "1px solid #e0e0e0" }}>
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-6">Related Legal Documents</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
        {links.map((doc) => (
          <Link
            key={doc.label}
            to={doc.href}
            className="flex items-center justify-between px-6 py-5 bg-white hover:bg-[#f8f7f5] transition-colors cursor-pointer group"
          >
            <span className="text-[#111] font-semibold text-sm">{doc.label}</span>
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-[#aaa] group-hover:text-[#111] transition-colors"></i>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
