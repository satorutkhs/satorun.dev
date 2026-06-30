import type { ResearchMaterial } from "@/app/lib/research";

interface ResearchCardProps {
  material: ResearchMaterial;
}

const typeConfig = {
  pdf: { icon: "picture_as_pdf", color: "bg-red-50 text-red-600", label: "PDF" },
  slide: { icon: "slideshow", color: "bg-blue-50 text-blue-600", label: "Slide" },
  paper: { icon: "description", color: "bg-green-50 text-green-600", label: "Paper" },
  poster: { icon: "image", color: "bg-purple-50 text-purple-600", label: "Poster" },
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
    <div className="card-elevated p-5 flex gap-4 group">
      {/* Type icon */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}>
        <span className="material-symbols-outlined text-2xl select-none">
          {config.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-jal-dark leading-snug group-hover:text-jal-red transition-colors truncate">
            {material.title}
          </h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded flex-shrink-0 ${config.color}`}>
            {config.label}
          </span>
        </div>

        <p className="text-xs text-jal-text-secondary leading-relaxed mb-3 line-clamp-2">
          {material.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {material.tags.map((tag) => (
            <span key={tag} className="tag text-[10px]">{tag}</span>
          ))}
        </div>

        {/* Meta + Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-jal-text-muted">
            <span className="flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px] select-none">calendar_today</span>
              {dateStr}
            </span>
            <span>{formatFileSize(material.fileSize)}</span>
          </div>
          {material.fileUrl && (
            <a
              href={material.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-jal-red hover:underline"
            >
              <span className="material-symbols-outlined text-[14px] select-none">download</span>
              開く
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
