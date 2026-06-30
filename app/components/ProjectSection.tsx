import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageGradient: string; // 互換性のために残す
  link?: string;
}

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <section id="projects" className="py-16 md:py-24 bg-jal-bg">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header with premium spacing */}
        <div className="mb-12">
          <p className="text-jal-red text-xs font-bold tracking-[0.25em] uppercase mb-2">
            Works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-jal-dark mb-4">
            プロジェクト
          </h2>
          <div className="section-divider" />
        </div>

        {/* Projects grid with card-premium and interactive-press */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="card-premium interactive-press overflow-hidden group bg-white flex flex-col h-full border-t-[3px] border-t-jal-border/40 hover:border-t-jal-red cursor-pointer"
            >
              {/* Info Area with sophisticated padding */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Folder icon in JAL style */}
                <div className="w-11 h-11 rounded bg-jal-bg flex items-center justify-center text-jal-red mb-5 group-hover:bg-jal-red-light transition-colors duration-300">
                  <span className="material-symbols-outlined text-xl select-none">
                    folder_open
                  </span>
                </div>

                <h3 className="text-sm font-bold text-jal-dark mb-3 group-hover:text-jal-red transition-colors leading-snug tracking-wide">
                  {project.title}
                </h3>
                
                <p className="text-xs text-jal-text-secondary leading-[1.7] mb-6 flex-1 tracking-wide">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px] tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer link */}
                {project.link && (
                  <div className="border-t border-jal-border-light pt-4 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-jal-red hover:text-jal-red-hover transition-colors"
                    >
                      リポジトリを見る
                      <span className="material-symbols-outlined text-[13px] select-none transition-transform duration-300 group-hover:translate-x-0.5">
                        open_in_new
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
