import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ContentRow from "./components/ContentRow";
import SkillCard from "./components/SkillCard";
import ProjectCard from "./components/ProjectCard";
import GitHistorySection from "./components/GitHistorySection";
import Footer from "./components/Footer";

/* ===================================================================
 * 髙橋 慧流（Satoru Takahashi）のハードコーディングデータ
 * ================================================================= */

const skills = {
  frontend: [
    { name: "React", icon: "devicon-react-original colored", level: 4 },
    { name: "Next.js", icon: "devicon-nextjs-plain", level: 4 },
    { name: "TypeScript", icon: "devicon-typescript-plain colored", level: 4 },
    { name: "HTML/CSS", icon: ["devicon-html5-plain colored", "devicon-css3-plain colored"], level: 5 },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored", level: 4 },
    { name: "JavaScript", icon: "devicon-javascript-plain colored", level: 3 },
    { name: "Flutter", icon: "devicon-flutter-plain colored", level: 4 },
    { name: "Dart", icon: "devicon-dart-plain colored", level: 4 },
  ],
  backend: [
    { name: "Python", icon: "devicon-python-plain colored", level: 5 },
    { name: "C", icon: "devicon-c-plain colored", level: 5 },
    { name: "Go", icon: "devicon-go-plain colored", level: 4 },
    { name: "Firebase", icon: "devicon-firebase-plain colored", level: 4 },
    { name: "SQL", icon: "devicon-postgresql-plain colored", level: 3 },
    { name: "GCP", icon: "devicon-googlecloud-plain colored", level: 3 },
    { name: "Java", icon: "devicon-java-plain colored", level: 3 },
  ],
  tools: [
    { name: "Git", icon: "devicon-git-plain colored", level: 4 },
    { name: "VS Code", icon: "devicon-vscode-plain colored", level: 5 },
    { name: "Figma", icon: "devicon-figma-plain colored", level: 3 },
    { name: "Antigravity", icon: "devicon-google-plain colored", level: 5 },
    { name: "GitHub Copilot", icon: "devicon-github-original", level: 5 },
  ],
};

const projects = [
  {
    title: "Dotto — 大学ポータルアプリ",
    description:
      "公立はこだて未来大学の学生向けポータルアプリ。Flutter/Dart で開発し、Go の BFF API と Firebase を活用。プロジェクト学習として3年間継続開発中。⭐9",
    tags: ["Flutter", "Dart", "Go", "Firebase"],
    imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    link: "https://github.com/fun-dotto",
  },
  {
    title: "GDGoC Japan Hackathon",
    description:
      "Google Developer Groups on Campus Japan が主催した全国ハッカソン。コア運営メンバー（Organizer）として全体の企画・進行および技術的サポートを担当。",
    tags: ["GDGoC", "Organizer", "Hackathon"],
    imageGradient: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
    link: "https://github.com/GDGoC-Japan-Hackathon",
  },
  {
    title: "EventPinMap",
    description:
      "Tornado 2025 チーム開発プロジェクト。イベント情報を地図上にピン表示する Web アプリ。",
    tags: ["TypeScript", "Team Dev"],
    imageGradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    link: "https://github.com/Tornado2025-team03/eventpinmap",
  },
  {
    title: "girlfriend",
    description:
      "じゃがりこちゃーはんチームで開発したモバイルアプリ。Flutter/Dart で実装。",
    tags: ["Flutter", "Dart", "Team Dev"],
    imageGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    link: "https://github.com/Jagariko-fried-rice/girlfriend",
  },
  {
    title: "satorun.dev — Portfolio",
    description:
      "Next.js + Tailwind CSS で構築した Netflix 風ポートフォリオサイト。Cloudflare Workers にデプロイ。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageGradient: "linear-gradient(135deg, #E50914 0%, #831010 100%)",
    link: "https://github.com/satorutkhs/satorun.dev",
  },
  {
    title: "SUUMO コンテスト作品",
    description:
      "wowbase コンテストに出展した不動産系 Web アプリケーション。Vercel にデプロイ。",
    tags: ["TypeScript", "React", "Vercel"],
    imageGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    link: "https://github.com/satorutkhs/wowbase-contest-suumo2",
  },
  {
    title: "fun-prism-group-report-tex",
    description:
      "公立はこだて未来大学のプロジェクト学習におけるグループ報告書をLaTeX (Prism) で作成・管理するための手順書およびテンプレート。",
    tags: ["LaTeX", "Prism", "Document"],
    imageGradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
    link: "https://github.com/satorutkhs/fun-prism-group-report-tex",
  },
  {
    title: "JS Gallery Workshop",
    description:
      "JavaScript のワークショップ用に作成したギャラリーアプリケーション。",
    tags: ["JavaScript", "HTML", "CSS"],
    imageGradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    link: "https://github.com/satorutkhs/js-gallery-ws",
  },
];

const education = {
  university: "公立はこだて未来大学",
  faculty: "システム情報科学部",
  course: "複雑系コース",
  year: "4年",
  icon: "school",
};

/* ===================================================================
 * Page Component
 * ================================================================= */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-nf-black">
      <Navbar />
      <HeroSection />

      {/* Main Content — Netflix-style rows */}
      <main className="-mt-16 relative z-10">
        {/* Skills: Frontend */}
        <section id="skills">
          <ContentRow
            title={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-nf-red select-none">code</span>
                Frontend Skills
              </span>
            }
          >
            {skills.frontend.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                category="Frontend"
                level={skill.level}
              />
            ))}
          </ContentRow>

          {/* Skills: Backend */}
          <ContentRow
            title={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-nf-red select-none">database</span>
                Backend & Data
              </span>
            }
          >
            {skills.backend.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                category="Backend"
                level={skill.level}
              />
            ))}
          </ContentRow>

          {/* Skills: Tools */}
          <ContentRow
            title={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-nf-red select-none">build</span>
                Tools & Environment
              </span>
            }
          >
            {skills.tools.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                category="Tools"
                level={skill.level}
              />
            ))}
          </ContentRow>
        </section>

        {/* Projects */}
        <section id="projects">
          <ContentRow
            title={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-nf-red select-none">rocket_launch</span>
                Projects
              </span>
            }
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageGradient={project.imageGradient}
                link={project.link}
              />
            ))}
          </ContentRow>
        </section>

        {/* Development Timeline (Git History) */}
        <GitHistorySection />

        {/* Education */}
        <section id="education" className="px-6 md:px-16 mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-nf-white flex items-center gap-2">
            <span className="material-symbols-outlined text-nf-red select-none">school</span>
            Education
          </h2>
          <div className="max-w-2xl bg-nf-card-bg rounded-md p-6 border border-nf-gray/30 card-hover">
            <div className="flex items-start gap-5">
              <div className="text-5xl flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-nf-red select-none">
                  {education.icon}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {education.university}
                </h3>
                <p className="text-sm text-nf-light-gray mb-1">
                  {education.faculty}
                </p>
                <p className="text-sm text-nf-white/80">
                  {education.course} — {education.year}
                </p>
                <div className="mt-3 inline-block px-3 py-1 bg-nf-red/20 text-nf-red text-xs font-semibold rounded">
                  在籍中
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
