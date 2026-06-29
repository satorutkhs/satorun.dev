interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageGradient: string;
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageGradient,
  link,
}: ProjectCardProps) {
  return (
    <div className="card-hover flex-shrink-0 w-64 md:w-80 bg-nf-card-bg rounded-md overflow-hidden cursor-pointer group">
      {/* Thumbnail area */}
      <div
        className="relative h-36 md:h-44"
        style={{ background: imageGradient }}
      >
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <span className="material-symbols-outlined text-nf-black text-3xl select-none">
                  play_arrow
                </span>
              </a>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <span className="material-symbols-outlined text-nf-black text-3xl select-none">
                  play_arrow
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-bold text-white mb-1 truncate group-hover:text-nf-red transition-colors">
          {title}
        </h3>
        <p className="text-xs text-nf-light-gray leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 bg-nf-gray/60 text-nf-white/70 rounded font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
