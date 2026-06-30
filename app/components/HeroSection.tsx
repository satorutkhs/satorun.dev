export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white"
    >
      {/* Subtle background JAL style lines */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(200,16,46,0.5) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Red elegant accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-jal-red via-jal-red to-transparent" />

      {/* Content wrapper with sophisticated whitespace */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-20">
          {/* Text content */}
          <div className="flex-1">
            {/* Tag line */}
            <p className="text-jal-red text-xs font-bold tracking-[0.25em] uppercase mb-5 animate-fade-in-up opacity-0 delay-100">
              Portfolio
            </p>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-jal-dark mb-3 animate-fade-in-up opacity-0 delay-200">
              髙橋 慧流
            </h1>
            <p className="text-base md:text-lg font-light text-jal-text-muted tracking-widest mb-8 animate-fade-in-up opacity-0 delay-300">
              Satoru Takahashi
            </p>

            {/* Description with sophisticated spacing */}
            <div className="animate-fade-in-up opacity-0 delay-400">
              <div className="section-divider" />
              <p className="text-sm md:text-base text-jal-text-secondary leading-[1.8] tracking-wide mb-1.5">
                公立はこだて未来大学 システム情報科学部
              </p>
              <p className="text-sm md:text-base text-jal-text-secondary leading-[1.8] tracking-wide mb-10">
                複雑系コース 4年
              </p>
            </div>

            {/* CTA Buttons - Physical press effects applied */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-500">
              <a href="#projects" className="btn-primary interactive-press">
                <span className="material-symbols-outlined text-lg select-none">rocket_launch</span>
                Projects
              </a>
              <a href="/blog" className="btn-secondary interactive-press">
                <span className="material-symbols-outlined text-lg select-none">article</span>
                Blog
              </a>
              <a href="#contact" className="btn-secondary interactive-press">
                <span className="material-symbols-outlined text-lg select-none">mail</span>
                Contact
              </a>
            </div>
          </div>

          {/* Profile visual (JAL minimal framing) */}
          <div className="hidden md:flex flex-shrink-0 animate-fade-in opacity-0 delay-500">
            <div className="w-56 h-56 lg:w-64 lg:h-64 rounded bg-jal-bg-warm border border-jal-border/50 flex items-center justify-center relative group p-2">
              {/* Corner brackets for JAL premium detail */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-jal-red/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-jal-red/40" />
              <div className="text-center">
                <span className="material-symbols-outlined text-5xl text-jal-red/20 select-none mb-2">
                  person
                </span>
                <p className="text-[10px] text-jal-text-muted uppercase tracking-[0.1em] mt-2">Satoru Takahashi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar - structural layout */}
        <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up opacity-0 delay-600 border-t border-jal-border-light pt-10">
          {[
            { number: "3+", label: "Years Experience", icon: "code" },
            { number: "8+", label: "Projects", icon: "rocket_launch" },
            { number: "10+", label: "Technologies", icon: "build" },
            { number: "B4", label: "University Year", icon: "school" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 pl-4 border-l-2 border-jal-red/30 hover:border-jal-red transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-jal-red text-2xl select-none">
                {stat.icon}
              </span>
              <div>
                <p className="text-lg md:text-xl font-bold text-jal-dark leading-none mb-1.5">{stat.number}</p>
                <p className="text-[11px] text-jal-text-muted tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
