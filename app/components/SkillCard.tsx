interface SkillCardProps {
  name: string;
  icon: string | string[];
  category: string;
  level: number; // 1-5
}

export default function SkillCard({
  name,
  icon,
  category,
  level,
}: SkillCardProps) {
  return (
    <div className="card-hover skill-glow flex-shrink-0 w-40 md:w-48 bg-nf-card-bg rounded-md overflow-hidden cursor-pointer group">
      {/* Icon area */}
      <div className="relative h-28 md:h-32 flex items-center justify-center bg-gradient-to-br from-nf-gray to-nf-dark">
        <div className="flex gap-3 text-4xl md:text-5xl">
          {Array.isArray(icon) ? (
            icon.map((ic) => <i key={ic} className={ic} />)
          ) : (
            <i className={icon} />
          )}
        </div>
        {/* Category badge */}
        <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-nf-red/80 text-white rounded font-semibold uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-white truncate">{name}</h3>
        {/* Skill level dots */}
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                dot <= level ? "bg-nf-red" : "bg-nf-gray"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
