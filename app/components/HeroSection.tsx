export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(200,16,46,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Red accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-jal-red via-jal-red to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
          {/* Text content */}
          <div className="flex-1">
            {/* Tag line */}
            <p className="text-jal-red text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in-up opacity-0 delay-100">
              Portfolio
            </p>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-jal-dark mb-2 animate-fade-in-up opacity-0 delay-200">
              髙橋 慧流
            </h1>
            <p className="text-lg md:text-xl font-light text-jal-text-muted tracking-wide mb-6 animate-fade-in-up opacity-0 delay-300">
              Satoru Takahashi
            </p>

            {/* Description */}
            <div className="animate-fade-in-up opacity-0 delay-400">
              <div className="section-divider mb-6" />
              <p className="text-sm md:text-base text-jal-text-secondary leading-relaxed mb-2">
                公立はこだて未来大学 システム情報科学部
              </p>
              <p className="text-sm md:text-base text-jal-text-secondary leading-relaxed mb-8">
                複雑系コース 4年
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up opacity-0 delay-500">
              <a href="#projects" className="btn-primary">
                <span className="material-symbols-outlined text-lg select-none">rocket_launch</span>
                Projects
              </a>
              <a href="/blog" className="btn-secondary">
                <span className="material-symbols-outlined text-lg select-none">article</span>
                Blog
              </a>
              <a href="#contact" className="btn-secondary">
                <span className="material-symbols-outlined text-lg select-none">mail</span>
                Contact
              </a>
            </div>
          </div>

          {/* Profile visual / decorative element */}
          <div className="hidden md:flex flex-shrink-0 animate-fade-in opacity-0 delay-600">
            <div className="w-52 h-52 lg:w-64 lg:h-64 rounded-2xl bg-gradient-to-br from-jal-bg to-jal-border-light border border-jal-border flex items-center justify-center shadow-sm">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-jal-red/30 select-none mb-2">
                  person
                </span>
                <p className="text-xs text-jal-text-muted mt-2">Profile Photo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up opacity-0 delay-600">
          {[
            { number: "3+", label: "Years Experience", icon: "code" },
            { number: "8+", label: "Projects", icon: "rocket_launch" },
            { number: "10+", label: "Technologies", icon: "build" },
            { number: "B4", label: "University Year", icon: "school" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-4 rounded-lg bg-jal-bg-warm border border-jal-border-light"
            >
              <span className="material-symbols-outlined text-jal-red text-2xl select-none">
                {stat.icon}
              </span>
              <div>
                <p className="text-lg md:text-xl font-bold text-jal-dark">{stat.number}</p>
                <p className="text-[11px] text-jal-text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
