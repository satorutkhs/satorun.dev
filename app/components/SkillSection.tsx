"use client";

import { useState } from "react";

interface Skill {
  name: string;
  icon: string | string[];
  level: number;
}

interface SkillSectionProps {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

const categories = [
  { key: "frontend" as const, label: "Frontend", icon: "code" },
  { key: "backend" as const, label: "Backend & Data", icon: "database" },
  { key: "tools" as const, label: "Tools", icon: "build" },
];

export default function SkillSection({ frontend, backend, tools }: SkillSectionProps) {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "tools">("frontend");

  const skillMap = { frontend, backend, tools };
  const activeSkills = skillMap[activeTab];

  return (
    <section id="skills" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header with premium spacing */}
        <div className="mb-12">
          <p className="text-jal-red text-xs font-bold tracking-[0.25em] uppercase mb-2">
            Technical Skills
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-jal-dark mb-4">
            スキル & テクノロジー
          </h2>
          <div className="section-divider" />
        </div>

        {/* Category tabs - Glassmorphic minimal border */}
        <div className="flex flex-wrap gap-2 mb-10 bg-jal-bg rounded-lg p-1.5 w-fit border border-jal-border-light">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-[0.05em] rounded-md transition-all duration-300 cursor-pointer ${
                activeTab === cat.key
                  ? "bg-white text-jal-red shadow-sm border border-jal-border-light scale-100"
                  : "text-jal-text-secondary hover:text-jal-text hover:bg-white/50"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] select-none">
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid - using card-premium and interactive-press */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {activeSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-premium interactive-press p-6 flex flex-col items-center justify-center text-center group cursor-pointer bg-white"
            >
              {/* Icon container */}
              <div className="w-14 h-14 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <div className="flex gap-2.5 text-4xl text-jal-dark group-hover:text-jal-red transition-colors duration-300">
                  {Array.isArray(skill.icon) ? (
                    skill.icon.map((ic) => <i key={ic} className={ic} />)
                  ) : (
                    <i className={skill.icon} />
                  )}
                </div>
              </div>

              {/* Name with elegant display */}
              <h3 className="text-xs font-bold text-jal-dark mb-3 tracking-wide group-hover:text-jal-red transition-colors">
                {skill.name}
              </h3>

              {/* Level dots */}
              <div className="flex gap-1.5 mt-auto">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      dot <= skill.level ? "bg-jal-red scale-110" : "bg-jal-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
