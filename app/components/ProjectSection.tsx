import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageGradient: string; // 互換性のため残す
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
              className="card-elevated overflow-hidden group bg-white flex flex-col h-full border-t-[3px] border-t-jal-border hover:border-t-jal-red transition-all duration-300"
            >
              {/* Info Area */}
              <div className="p-6 flex flex-col flex-1">
                {/* Folder icon in JAL style */}
                <div className="w-10 h-10 rounded-lg bg-jal-bg flex items-center justify-center text-jal-red mb-4 group-hover:bg-jal-red-light transition-colors duration-200">
                  <span className="material-symbols-outlined text-xl select-none">
                    folder_open
                  </span>
                </div>

                <h3 className="text-sm font-bold text-jal-dark mb-2 group-hover:text-jal-red transition-colors leading-snug">
                  {project.title}
                </h3>
                
                <p className="text-xs text-jal-text-secondary leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">
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
                      className="inline-flex items-center gap-1 text-xs font-semibold text-jal-red hover:text-jal-red-hover transition-colors"
                    >
                      リポジトリを見る
                      <span className="material-symbols-outlined text-[14px]">
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
