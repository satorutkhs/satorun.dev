export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background pattern (abstract code/grid) */}
      <div className="absolute inset-0 bg-gradient-to-br from-nf-black via-nf-dark to-nf-black">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(229,9,20,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(229,9,20,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating code-like decorations */}
        <div className="absolute top-1/4 right-1/4 text-nf-red/5 text-[200px] font-mono font-black select-none pointer-events-none">
          {"</>"}
        </div>
        <div className="absolute bottom-1/3 left-1/6 text-nf-red/5 text-[120px] font-mono font-black select-none pointer-events-none rotate-12">
          {"{ }"}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 hero-gradient-left" />
      <div className="absolute inset-0 hero-gradient" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-4xl">
        {/* Tag line */}
        <p className="text-nf-red text-sm font-semibold tracking-[0.3em] uppercase mb-4 animate-fade-in-up opacity-0 delay-100">
          Portfolio
        </p>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-2 animate-fade-in-up opacity-0 delay-200">
          髙橋 慧流
        </h1>
        <p className="text-2xl md:text-3xl font-light text-nf-light-gray tracking-wide mb-8 animate-fade-in-up opacity-0 delay-300">
          Satoru Takahashi
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-nf-white/80 max-w-xl leading-relaxed mb-10 animate-fade-in-up opacity-0 delay-400">
          公立はこだて未来大学 システム情報科学部
          <br />
          複雑系コース 4年
        </p>

        {/* CTA Buttons - Netflix style */}
        <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-500">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-nf-red text-white font-bold text-lg rounded hover:bg-nf-red-hover transition-all duration-200 hover:scale-105"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-nf-gray/80 text-white font-bold text-lg rounded hover:bg-nf-gray transition-all duration-200 hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-nf-light-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
