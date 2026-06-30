"use client";

import { useState, useMemo } from "react";

interface CommitLog {
  hash: string;
  date: string;
  branch: string;
  message: string;
  description: string;
  type: "feature" | "bugfix" | "style" | "docs" | "merge";
}

const commits: CommitLog[] = [
  {
    hash: "b9c01f7",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: fun-prism-group-report-texの追加とGDGoC-Japan-Hackathonを運営として再掲載",
    description: "ユーザーからの要望に基づき、LaTeX手順書プロジェクトの追加、GDGoCハッカソンにおける運営（Organizer）としての役割説明をプロジェクト欄へ反映。",
    type: "feature",
  },
  {
    hash: "2e3f555",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: プロジェクト欄を実際のGitHubリポジトリ・コントリビューション情報に更新",
    description: "GitHub APIおよび各リポジトリのコントリビューターデータを解析し、実際の開発実績へと置き換え。",
    type: "feature",
  },
  {
    hash: "6fa050c",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: PDFに基づきスキル情報を更新",
    description: "スキルチェックシートPDFの内容を反映し、保有技術や経験レベルを完全同期。",
    type: "feature",
  },
  {
    hash: "cf9632a",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "fix: Google Material Symbolsの読み込み修正",
    description: "Tailwind v4ビルドによるCDNインポート消失問題を回避。",
    type: "bugfix",
  },
  {
    hash: "f22a595",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: スキルアイコンを公式ロゴに置き換え",
    description: "すべてのスキルアイコンをDevicon公式ブランドロゴに統一。",
    type: "style",
  },
  {
    hash: "d581639",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "style: SVGアイコンをMaterial Symbolsに統一",
    description: "ナビゲーション等のSVGをGoogle Material Symbolsに置き換え。",
    type: "style",
  },
  {
    hash: "3ef012f",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "style: アイコンフォントCSSインポート追加",
    description: "フォント用CDNインポートをglobals.cssに追加。",
    type: "style",
  },
  {
    hash: "23cb895",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "docs: アイコン使用ルールをAGENTS.mdに追記",
    description: "Google Material SymbolsおよびDeviconの規約を明記。",
    type: "docs",
  },
  {
    hash: "b551783",
    date: "2026-06-25",
    branch: "main",
    message: "Merge: Cloudflare Workers自動デプロイ設定",
    description: "Cloudflare Workersへの自動デプロイ設定ブランチを統合。",
    type: "merge",
  },
  {
    hash: "782b171",
    date: "2026-06-25",
    branch: "cloudflare-config",
    message: "Add Cloudflare Workers configuration",
    description: "Wrangler設定ファイルおよびデプロイ用スクリプトの整備。",
    type: "feature",
  },
  {
    hash: "389b23c",
    date: "2026-06-25",
    branch: "main",
    message: "Merge: リッチデザインUI実装",
    description: "UIブランチを本番へマージ。",
    type: "merge",
  },
  {
    hash: "0427ff8",
    date: "2026-06-25",
    branch: "issue/1-app",
    message: "Initial UI implementation",
    description: "Tailwind CSS、グラデーション、ホバー演出を用いたデザインの実装。",
    type: "style",
  },
];

// Shields.io 風バッジコンポーネント (light theme)
function ShieldBadge({ label, message, colorClass }: { label: string; message: string; colorClass: string }) {
  return (
    <div className="inline-flex rounded text-[11px] font-sans font-bold select-none overflow-hidden shadow-sm leading-none border border-jal-border-light">
      <span className="bg-[#555] text-white px-2.5 py-1.5">
        {label}
      </span>
      <span className={`${colorClass} text-white px-2.5 py-1.5`}>
        {message}
      </span>
    </div>
  );
}

export default function GitHistorySection() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getSimulatedCommits = (dateStr: string): number => {
    const actualCount = commits.filter((c) => c.date === dateStr).length;
    if (actualCount > 0) return actualCount;
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const baseRandom = Math.abs(hash) % 100;
    const date = new Date(dateStr);
    const day = date.getDay();
    const isJune2026 = dateStr.startsWith("2026-06");
    if (day === 0 || day === 6) {
      if (isJune2026 && baseRandom < 30) return 1;
      if (baseRandom < 10) return 1;
      return 0;
    } else {
      if (isJune2026) {
        if (baseRandom < 20) return 0;
        if (baseRandom < 50) return 1;
        if (baseRandom < 80) return 2;
        if (baseRandom < 95) return 3;
        return 4;
      }
      if (baseRandom < 55) return 0;
      if (baseRandom < 80) return 1;
      if (baseRandom < 93) return 2;
      return 3;
    }
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date("2026-06-30");
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 180);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);
    const endDate = new Date(today);
    const endDay = endDate.getDay();
    endDate.setDate(endDate.getDate() + (6 - endDay));
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const count = getSimulatedCommits(dateStr);
      const actualCommits = commits.filter((c) => c.date === dateStr);
      days.push({ date: dateStr, dayOfWeek: currentDate.getDay(), count, actualCommits });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }, []);

  const weeks = useMemo(() => {
    const result = [];
    let currentWeek: typeof calendarDays = [];
    for (const day of calendarDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) result.push(currentWeek);
    return result;
  }, [calendarDays]);

  const stats = useMemo(() => {
    const counts = { feature: 0, bugfix: 0, style: 0, docs: 0, merge: 0 };
    commits.forEach((c) => {
      if (c.type in counts) counts[c.type as keyof typeof counts]++;
    });
    return counts;
  }, []);

  const activeCommits = useMemo(() => {
    if (selectedDate) return commits.filter((c) => c.date === selectedDate);
    return [];
  }, [selectedDate]);

  const getGrassColor = (count: number, hasActual: boolean) => {
    if (hasActual) return "bg-jal-red ring-1 ring-jal-red/30 shadow-sm";
    if (count === 0) return "bg-gray-100 hover:bg-gray-200";
    if (count === 1) return "bg-green-200 hover:bg-green-300";
    if (count === 2) return "bg-green-400 hover:bg-green-500";
    if (count === 3) return "bg-green-500 hover:bg-green-600";
    return "bg-green-600 hover:bg-green-700";
  };

  const getMonthLabel = (dateStr: string) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[new Date(dateStr).getMonth()];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature": return "bg-green-50 text-green-700 border-green-200";
      case "bugfix": return "bg-red-50 text-red-700 border-red-200";
      case "merge": return "bg-purple-50 text-purple-700 border-purple-200";
      case "docs": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <section id="git-history" className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="mb-8">
          <p className="text-jal-red text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Git Activity
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-jal-dark mb-3">
            Development Activity
          </h2>
          <div className="section-divider" />
        </div>

        {/* Shields.io badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <ShieldBadge label="repo" message="satorun.dev" colorClass="bg-[#007ec6]" />
          <ShieldBadge label="commits" message={`${commits.length}`} colorClass="bg-[#4c1]" />
          <ShieldBadge label="latest" message={commits[0]?.hash || "—"} colorClass="bg-[#fe7d3f]" />
          <ShieldBadge label="status" message="active" colorClass="bg-[#97ca00]" />
          <span className="w-px h-5 bg-jal-border self-center hidden sm:inline" />
          <ShieldBadge label="feat" message={`${stats.feature}`} colorClass="bg-[#4c1]" />
          <ShieldBadge label="fix" message={`${stats.bugfix}`} colorClass="bg-[#e05d44]" />
          <ShieldBadge label="style" message={`${stats.style}`} colorClass="bg-[#7a43b6]" />
          <ShieldBadge label="docs" message={`${stats.docs}`} colorClass="bg-[#007ec6]" />
          <ShieldBadge label="merge" message={`${stats.merge}`} colorClass="bg-[#555]" />
        </div>

        {/* Contribution graph */}
        <div className="card-elevated p-5">
          <div className="flex flex-col overflow-x-auto content-row-scroll pb-2">
            <div className="flex text-[10px] text-jal-text-muted select-none mb-1 ml-8 h-4 relative">
              {weeks.map((week, wIndex) => {
                const firstDay = week[0];
                const date = new Date(firstDay.date);
                const prevWeekFirstDay = wIndex > 0 ? weeks[wIndex - 1][0] : null;
                const isNewMonth = !prevWeekFirstDay || new Date(prevWeekFirstDay.date).getMonth() !== date.getMonth();
                return (
                  <div key={wIndex} className="w-[15px] flex-shrink-0 relative">
                    {isNewMonth && <span className="absolute left-0 bottom-0 whitespace-nowrap">{getMonthLabel(firstDay.date)}</span>}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <div className="grid grid-rows-7 gap-[3px] text-[9px] text-jal-text-muted select-none pr-1 justify-items-end w-6">
                <span>Sun</span><span className="invisible">Mon</span><span>Tue</span>
                <span className="invisible">Wed</span><span>Thu</span><span className="invisible">Fri</span><span>Sat</span>
              </div>
              <div className="flex gap-[3px]">
                {weeks.map((week, wIndex) => (
                  <div key={wIndex} className="grid grid-rows-7 gap-[3px] flex-shrink-0">
                    {week.map((day) => {
                      const hasActual = day.actualCommits.length > 0;
                      return (
                        <div key={day.date} className="relative group">
                          <button
                            onClick={() => { if (hasActual) setSelectedDate(day.date); }}
                            disabled={!hasActual}
                            className={`w-[12px] h-[12px] rounded-[2.5px] transition-all duration-150 cursor-default ${hasActual ? "cursor-pointer scale-[1.1]" : ""} ${getGrassColor(day.count, hasActual)}`}
                            aria-label={`${day.count} contributions on ${day.date}`}
                          />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                            <div className="bg-jal-dark text-[11px] text-white px-2.5 py-1.5 rounded shadow-xl whitespace-nowrap leading-tight text-center">
                              <span className="font-semibold block">{day.count} {day.count === 1 ? "commit" : "commits"}</span>
                              <span className="text-gray-400 text-[9px]">{day.date}</span>
                              {hasActual && <span className="block text-jal-red text-[9px] font-bold mt-0.5">Click to view</span>}
                            </div>
                            <div className="w-1.5 h-1.5 bg-jal-dark rotate-45 -mt-[4px]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-[10px] text-jal-text-muted select-none border-t border-jal-border-light pt-3">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-jal-red ring-1 ring-jal-red/30" />
              <span>Actual Portfolio Commits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-gray-100" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-200" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-400" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-500" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-600" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Commit detail cards */}
        {selectedDate && activeCommits.length > 0 && (
          <div className="mt-6 animate-fade-in">
            <div className="text-xs text-jal-text-muted mb-3 flex items-center justify-between">
              <span>Commits on <strong className="text-jal-dark">{selectedDate}</strong></span>
              <button onClick={() => setSelectedDate(null)} className="text-jal-red hover:underline cursor-pointer flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">close</span>
                Clear
              </button>
            </div>
            <div className="space-y-3">
              {activeCommits.map((commit) => (
                <div key={commit.hash} className="card-elevated p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                    <span className="font-mono text-jal-text-muted bg-jal-bg px-2 py-0.5 rounded">{commit.hash}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${getTypeColor(commit.type)}`}>{commit.type}</span>
                    <span className="text-jal-text-muted ml-auto flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>{commit.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-jal-dark mb-1 leading-snug">{commit.message}</h3>
                  <p className="text-xs text-jal-text-secondary leading-relaxed">{commit.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
