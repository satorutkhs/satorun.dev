import type { ResearchMaterial } from "@/app/lib/research";

interface ResearchCardProps {
  material: ResearchMaterial;
}

const typeConfig = {
  pdf: { icon: "picture_as_pdf", color: "bg-red-50 text-red-600 border-red-100", label: "PDF" },
  slide: { icon: "slideshow", color: "bg-blue-50 text-blue-600 border-blue-100", label: "Slide" },
  paper: { icon: "description", color: "bg-green-50 text-green-600 border-green-100", label: "Paper" },
  poster: { icon: "image", color: "bg-purple-50 text-purple-600 border-purple-100", label: "Poster" },
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResearchCard({ material }: ResearchCardProps) {
  const config = typeConfig[material.type] || typeConfig.pdf;
  const dateStr = material.createdAt.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card-premium interactive-press p-6 flex gap-5 group bg-white cursor-pointer border border-jal-border-light">
      {/* Type icon - JAL styled border */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border ${config.color}`}>
        <span className="material-symbols-outlined text-2xl select-none">
          {config.icon}
        </span>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-sm font-bold text-jal-dark leading-snug group-hover:text-jal-red transition-colors truncate tracking-wide">
            {material.title}
          </h3>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border flex-shrink-0 tracking-wider ${config.color}`}>
            {config.label}
          </span>
        </div>

        <p className="text-xs text-jal-text-secondary leading-[1.7] mb-4 line-clamp-2 tracking-wide flex-1">
          {material.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {material.tags.map((tag) => (
            <span key={tag} className="tag text-[9px] uppercase tracking-wider font-semibold">{tag}</span>
          ))}
        </div>

        {/* Meta + Action trigger */}
        <div className="flex items-center justify-between border-t border-jal-border-light pt-4 mt-auto">
          <div className="flex items-center gap-3 text-[10px] text-jal-text-muted font-medium">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] select-none">calendar_today</span>
              {dateStr}
            </span>
            <span>{formatFileSize(material.fileSize)}</span>
          </div>
          {material.fileUrl && (
            <a
              href={material.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-jal-red hover:text-jal-red-hover transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] select-none transition-transform duration-300 group-hover:translate-y-0.5">download</span>
              開く
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
