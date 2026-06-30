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
    <section id="skills" className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-jal-red text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Technical Skills
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-jal-dark mb-3">
            スキル & テクノロジー
          </h2>
          <div className="section-divider" />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-8 bg-jal-bg rounded-lg p-1 w-fit">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                activeTab === cat.key
                  ? "bg-white text-jal-red shadow-sm"
                  : "text-jal-text-secondary hover:text-jal-text"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] select-none">
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {activeSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-elevated p-4 flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <div className="flex gap-2 text-3xl">
                  {Array.isArray(skill.icon) ? (
                    skill.icon.map((ic) => <i key={ic} className={ic} />)
                  ) : (
                    <i className={skill.icon} />
                  )}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-sm font-semibold text-jal-dark mb-2 group-hover:text-jal-red transition-colors">
                {skill.name}
              </h3>

              {/* Level dots */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      dot <= skill.level ? "bg-jal-red" : "bg-jal-border"
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
