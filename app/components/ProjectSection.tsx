import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageGradient: string;
  link?: string;
}

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <section id="projects" className="py-16 md:py-20 bg-jal-bg">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-jal-red text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-jal-dark mb-3">
            プロジェクト
          </h2>
          <div className="section-divider" />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="card-elevated overflow-hidden group"
            >
              {/* Thumbnail */}
              <div
                className="h-36 md:h-40 relative"
                style={{ background: project.imageGradient }}
              >
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white hover:scale-110"
                    >
                      <span className="material-symbols-outlined text-jal-dark text-xl select-none">
                        open_in_new
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-sm font-bold text-jal-dark mb-2 group-hover:text-jal-red transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-jal-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
