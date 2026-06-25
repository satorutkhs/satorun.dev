import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ContentRow from "./components/ContentRow";
import SkillCard from "./components/SkillCard";
import ProjectCard from "./components/ProjectCard";
import Footer from "./components/Footer";

/* ===================================================================
 * 髙橋 慧流（Satoru Takahashi）のハードコーディングデータ
 * ================================================================= */

const skills = {
  frontend: [
    { name: "React", icon: "⚛️", level: 4 },
    { name: "Next.js", icon: "▲", level: 4 },
    { name: "TypeScript", icon: "🔷", level: 4 },
    { name: "HTML/CSS", icon: "🎨", level: 5 },
    { name: "Tailwind CSS", icon: "💨", level: 4 },
    { name: "JavaScript", icon: "⚡", level: 5 },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", level: 3 },
    { name: "Python", icon: "🐍", level: 4 },
    { name: "SQL", icon: "🗄️", level: 3 },
    { name: "REST API", icon: "🔗", level: 4 },
  ],
  tools: [
    { name: "Git", icon: "🔀", level: 4 },
    { name: "Docker", icon: "🐳", level: 3 },
    { name: "Linux", icon: "🐧", level: 3 },
    { name: "VS Code", icon: "💻", level: 5 },
    { name: "Figma", icon: "🎯", level: 3 },
  ],
};

const projects = [
  {
    title: "Portfolio Website",
    description:
      "React / Next.js で構築した Netflix 風ポートフォリオサイト。SSR・ダークテーマ・アニメーションを実装。",
    tags: ["Next.js", "React", "Tailwind CSS"],
    imageGradient: "linear-gradient(135deg, #E50914 0%, #831010 100%)",
  },
  {
    title: "Research Project",
    description:
      "複雑系科学に基づくシミュレーション・データ分析ツール。Python と可視化ライブラリを活用。",
    tags: ["Python", "Data Science", "Visualization"],
    imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Web Application",
    description:
      "フルスタック Web アプリケーション。ユーザー認証・データベース・REST API を実装。",
    tags: ["Node.js", "React", "PostgreSQL"],
    imageGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Mobile App Prototype",
    description:
      "UIプロトタイプからインタラクティブなモバイルアプリのコンセプトを開発。",
    tags: ["React Native", "Figma", "UI/UX"],
    imageGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const education = {
  university: "公立はこだて未来大学",
  faculty: "システム情報科学部",
  course: "複雑系コース",
  year: "4年",
  icon: "🎓",
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
          <ContentRow title="🎯 Frontend Skills">
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
          <ContentRow title="⚙️ Backend & Data">
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
          <ContentRow title="🛠️ Tools & Environment">
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
          <ContentRow title="🚀 Projects">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageGradient={project.imageGradient}
              />
            ))}
          </ContentRow>
        </section>

        {/* Education */}
        <section id="education" className="px-6 md:px-16 mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-nf-white">
            🎓 Education
          </h2>
          <div className="max-w-2xl bg-nf-card-bg rounded-md p-6 border border-nf-gray/30 card-hover">
            <div className="flex items-start gap-5">
              <div className="text-5xl">{education.icon}</div>
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
