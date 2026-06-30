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
    description: "GitHub APIおよび各リポジトリのコントリビューターデータを解析し、実際の開発実績（Dotto, EventPinMap, girlfriend 等）へと置き換え。",
    type: "feature",
  },
  {
    hash: "6fa050c",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: PDFに基づきスキル情報を更新 (Flutter/Go/GCP/Firebase等追加、Docker/Linux削除、Antigravity/Copilotを追加)",
    description: "スキルチェックシートPDFの内容を反映し、保有技術や経験レベル（ドット表記）を完全同期。",
    type: "feature",
  },
  {
    hash: "cf9632a",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "fix: Google Material Symbolsをlayout.tsxのlinkタグで読み込むように修正し表示バグを解決",
    description: "Tailwind v4ビルドによるCDNインポート消失問題を回避するため、HTMLのLinkタグから読み込む方式へ変更。",
    type: "bugfix",
  },
  {
    hash: "f22a595",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "feat: スキルアイコンを公式ロゴ（Devicon）に置き換え、ページ見出しの絵文字をMaterial Symbols化",
    description: "すべてのスキルアイコンを絵文字からDevicon公式ブランドロゴに統一し、一元化。",
    type: "style",
  },
  {
    hash: "d581639",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "style: UIコンポーネント内のSVGアイコンをGoogle Material SymbolsとDeviconに置き換え",
    description: "ナビゲーションの矢印やアクションボタン等のSVGをGoogle Material Symbolsに置き換え。",
    type: "style",
  },
  {
    hash: "3ef012f",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "style: Google Material SymbolsとDeviconのCSSインポートを追加",
    description: "フォントおよびアイコンフォント用のCDNインポートをglobals.cssに追加。",
    type: "style",
  },
  {
    hash: "23cb895",
    date: "2026-06-29",
    branch: "issue/5-icon",
    message: "docs: アイコン使用ルールをAGENTS.mdに追記",
    description: "今後の機能追加やアイコン選定時の方針となる「Google Material Symbols」および「Devicon」の規約を明記。",
    type: "docs",
  },
  {
    hash: "b551783",
    date: "2026-06-25",
    branch: "main",
    message: "Merge pull request #4 from satorutkhs/cloudflare/workers-autoconfig",
    description: "Cloudflare Workersへの自動デプロイ設定ブランチを本番ブランチへ統合。",
    type: "merge",
  },
  {
    hash: "782b171",
    date: "2026-06-25",
    branch: "cloudflare-config",
    message: "Add Cloudflare Workers configuration",
    description: "Cloudflare Wrangler設定ファイルの追加およびデプロイ用スクリプトの整備。",
    type: "feature",
  },
  {
    hash: "389b23c",
    date: "2026-06-25",
    branch: "main",
    message: "Merge pull request #3 from satorutkhs/issue/1-app",
    description: "Netflixライクなリッチデザインを実装したUIブランチを本番へマージ。",
    type: "merge",
  },
  {
    hash: "0427ff8",
    date: "2026-06-25",
    branch: "issue/1-app",
    message: "Netflixの雰囲気を再現",
    description: "Tailwind CSS、グラデーション、美しいホバー演出を用いたNetflix風デザインのモックアップ実装。",
    type: "style",
  },
];

// Shields.io 風バッジコンポーネント
function ShieldBadge({ label, message, colorClass }: { label: string; message: string; colorClass: string }) {
  return (
    <div className="inline-flex rounded text-[11px] font-sans font-bold select-none overflow-hidden border border-neutral-800 shadow-sm leading-none">
      <span className="bg-[#555] text-white px-2.5 py-1.5 flex items-center gap-1">
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

  // 決定論的ダミーコミット生成
  const getSimulatedCommits = (dateStr: string): number => {
    // 実際のコミットがあればその件数を返す
    const actualCount = commits.filter((c) => c.date === dateStr).length;
    if (actualCount > 0) return actualCount;

    // 日付文字列を元にした単純なハッシュ
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const baseRandom = Math.abs(hash) % 100;

    const date = new Date(dateStr);
    const day = date.getDay();

    // 2026年6月はアクティブ期間としてシミュレート
    const isJune2026 = dateStr.startsWith("2026-06");

    if (day === 0 || day === 6) {
      // 週末
      if (isJune2026 && baseRandom < 30) return 1;
      if (baseRandom < 10) return 1;
      return 0;
    } else {
      // 平日
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

  // カレンダー全日生成 (過去 180 日間、日曜開始にする)
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date("2026-06-30"); // 固定された現在日（メタデータに基づく）
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 180);
    
    // 直前の日曜日まで遡る
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    // 今週の土曜日まで伸ばす
    const endDate = new Date(today);
    const endDay = endDate.getDay();
    endDate.setDate(endDate.getDate() + (6 - endDay));

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const count = getSimulatedCommits(dateStr);
      const actualCommits = commits.filter((c) => c.date === dateStr);

      days.push({
        date: dateStr,
        dayOfWeek: currentDate.getDay(),
        count,
        actualCommits,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }, []);

  // 週ごとに分割
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];
    for (const day of calendarDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }
    return result;
  }, [calendarDays]);

  // コミットタイプレベルの統計集計
  const stats = useMemo(() => {
    const counts = { feature: 0, bugfix: 0, style: 0, docs: 0, merge: 0 };
    commits.forEach((c) => {
      if (c.type in counts) {
        counts[c.type as keyof typeof counts]++;
      }
    });
    return counts;
  }, []);

  // 現在選択されているコミット詳細（クリックした日、またはなければ最新コミット）
  const activeCommits = useMemo(() => {
    if (selectedDate) {
      return commits.filter((c) => c.date === selectedDate);
    }
    // デフォルトは最新コミット（同日のコミット群）
    const latestDate = commits[0]?.date;
    return commits.filter((c) => c.date === latestDate);
  }, [selectedDate]);

  const getGrassColor = (count: number, hasActual: boolean) => {
    if (hasActual) {
      // 実際のコミットがある日は、特別に明るい緑または赤い光輪を持つようにする
      return "bg-[#39d353] ring-1 ring-nf-red shadow-[0_0_8px_rgba(229,9,20,0.6)]";
    }
    if (count === 0) return "bg-neutral-800/40 hover:bg-neutral-700/60";
    if (count === 1) return "bg-[#0e4429] hover:bg-[#125333]";
    if (count === 2) return "bg-[#006d32] hover:bg-[#00863d]";
    if (count === 3) return "bg-[#26a641] hover:bg-[#2ec54e]";
    return "bg-[#39d353] hover:bg-[#4cf067]";
  };

  const getMonthLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[date.getMonth()];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "bugfix":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "merge":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "docs":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-nf-gray/60 text-nf-light-gray border-nf-gray/50";
    }
  };

  return (
    <section id="git-history" className="px-6 md:px-16 mb-20">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-nf-white flex items-center gap-2">
        <span className="material-symbols-outlined text-nf-red select-none">
          grid_on
        </span>
        Development Activity
      </h2>

      {/* Shields.io 風バッジエリア */}
      <div className="flex flex-wrap gap-2 mb-6">
        <ShieldBadge label="git" message="satorun.dev" colorClass="bg-[#007ec6]" />
        <ShieldBadge label="commits" message={`${commits.length} total`} colorClass="bg-[#4c1]" />
        <ShieldBadge label="latest" message={commits[0]?.hash || "none"} colorClass="bg-[#fe7d3f]" />
        <ShieldBadge label="status" message="active" colorClass="bg-[#97ca00]" />
        <span className="w-px h-5 bg-neutral-800 self-center hidden sm:inline" />
        <ShieldBadge label="feat" message={`${stats.feature}`} colorClass="bg-[#4c1]" />
        <ShieldBadge label="bugfix" message={`${stats.bugfix}`} colorClass="bg-[#e05d44]" />
        <ShieldBadge label="style" message={`${stats.style}`} colorClass="bg-[#7a43b6]" />
        <ShieldBadge label="docs" message={`${stats.docs}`} colorClass="bg-[#007ec6]" />
        <ShieldBadge label="merge" message={`${stats.merge}`} colorClass="bg-[#555]" />
      </div>

      <div className="bg-nf-card-bg rounded-md p-6 border border-nf-gray/20">
        <div className="flex flex-col overflow-x-auto content-row-scroll pb-2">
          {/* 月ラベルの配置 */}
          <div className="flex text-[10px] text-nf-light-gray select-none mb-1 ml-8 h-4 relative">
            {weeks.map((week, wIndex) => {
              const firstDay = week[0];
              const date = new Date(firstDay.date);
              const prevWeekFirstDay = wIndex > 0 ? weeks[wIndex - 1][0] : null;
              const isNewMonth =
                !prevWeekFirstDay ||
                new Date(prevWeekFirstDay.date).getMonth() !== date.getMonth();

              return (
                <div key={wIndex} className="w-[15px] flex-shrink-0 relative">
                  {isNewMonth && (
                    <span className="absolute left-0 bottom-0 whitespace-nowrap">
                      {getMonthLabel(firstDay.date)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            {/* 曜日ラベル */}
            <div className="grid grid-rows-7 gap-[3px] text-[9px] text-nf-light-gray select-none pr-1 justify-items-end w-6">
              <span>Sun</span>
              <span className="invisible">Mon</span>
              <span>Tue</span>
              <span className="invisible">Wed</span>
              <span>Thu</span>
              <span className="invisible">Fri</span>
              <span>Sat</span>
            </div>

            {/* コントリビューション（草）グリッド */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="grid grid-rows-7 gap-[3px] flex-shrink-0">
                  {week.map((day) => {
                    const hasActual = day.actualCommits.length > 0;
                    return (
                      <div key={day.date} className="relative group">
                        <button
                          onClick={() => {
                            if (hasActual) {
                              setSelectedDate(day.date);
                            }
                          }}
                          disabled={!hasActual}
                          className={`w-[12px] h-[12px] rounded-[2.5px] transition-all duration-150 cursor-default ${
                            hasActual ? "cursor-pointer scale-[1.1]" : ""
                          } ${getGrassColor(day.count, hasActual)}`}
                          aria-label={`${day.count} contributions on ${day.date}`}
                        />
                        {/* ツールチップ */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                          <div className="bg-nf-dark text-[11px] text-white px-2.5 py-1.5 rounded shadow-xl border border-neutral-700 whitespace-nowrap leading-tight text-center">
                            <span className="font-semibold block">{day.count} {day.count === 1 ? "commit" : "commits"}</span>
                            <span className="text-nf-light-gray text-[9px]">{day.date}</span>
                            {hasActual && (
                              <span className="block text-nf-red text-[9px] font-bold mt-0.5 animate-pulse">
                                Click to view commits
                              </span>
                            )}
                          </div>
                          {/* 三角形 */}
                          <div className="w-1.5 h-1.5 bg-nf-dark border-r border-b border-neutral-700 rotate-45 -mt-[4px]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 凡例 (Legend) */}
        <div className="flex justify-between items-center mt-4 text-[10px] text-nf-light-gray select-none border-t border-neutral-800/60 pt-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] ring-1 ring-nf-red shadow-[0_0_4px_rgba(229,9,20,0.6)]" />
            <span>Actual Portfolio Commits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-800/40" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* コミット詳細表示カード */}
      <div className="mt-6 max-w-4xl">
        <div className="text-xs text-nf-light-gray mb-3 flex items-center justify-between">
          <span>
            {selectedDate ? (
              <>
                Commits on <strong className="text-white">{selectedDate}</strong>
              </>
            ) : (
              <>
                Showing <strong className="text-white">Latest Activity</strong> (on {commits[0]?.date})
              </>
            )}
          </span>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="text-nf-red hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
              Reset to Latest
            </button>
          )}
        </div>

        <div className="space-y-4">
          {activeCommits.map((commit) => (
            <div
              key={commit.hash}
              className="bg-nf-card-bg rounded-md p-5 border border-nf-gray/20 transition-all duration-300 hover:border-nf-red/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-nf-light-gray bg-nf-gray/40 px-2 py-0.5 rounded border border-nf-gray/30">
                    {commit.hash}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${getTypeColor(
                      commit.type
                    )}`}
                  >
                    {commit.type}
                  </span>
                  <span className="bg-blue-600 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {commit.branch}
                  </span>
                </div>
                <div className="text-nf-light-gray flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    calendar_today
                  </span>
                  {commit.date}
                </div>
              </div>

              <h3 className="text-sm md:text-base font-bold text-white mb-2 leading-snug hover:text-nf-red transition-colors duration-300">
                {commit.message}
              </h3>

              <p className="text-xs md:text-sm text-nf-light-gray leading-relaxed">
                {commit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
