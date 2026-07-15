"use client";

import { useState, useMemo } from "react";
import type { CommitLog } from "../lib/github";

interface GitHistorySectionProps {
  commits: CommitLog[];
  dailyCounts: Record<string, number>;
}

// Shields.io 風バッジコンポーネント (light theme, refined)
function ShieldBadge({ label, message, colorClass }: { label: string; message: string; colorClass: string }) {
  return (
    <div className="inline-flex rounded overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)] border border-jal-border/50 text-[10px] font-sans font-bold select-none leading-none">
      <span className="bg-[#555] text-white px-2.5 py-1.5 font-semibold">
        {label}
      </span>
      <span className={`${colorClass} text-white px-2.5 py-1.5`}>
        {message}
      </span>
    </div>
  );
}

export default function GitHistorySection({ commits, dailyCounts }: GitHistorySectionProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
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
      const count = dailyCounts[dateStr] || 0;
      const actualCommits = commits.filter((c) => c.date === dateStr);
      days.push({ date: dateStr, dayOfWeek: currentDate.getDay(), count, actualCommits });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }, [commits, dailyCounts]);

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
  }, [commits]);

  const activeCommits = useMemo(() => {
    if (selectedDate) return commits.filter((c) => c.date === selectedDate);
    return [];
  }, [selectedDate, commits]);

  const getGrassColor = (count: number, hasActual: boolean) => {
    if (hasActual) return "bg-jal-red ring-1 ring-jal-red/30 shadow-sm";
    if (count === 0) return "bg-gray-100 hover:bg-gray-200/80";
    if (count === 1) return "bg-green-100/90 hover:bg-green-200/90";
    if (count === 2) return "bg-green-200 hover:bg-green-300";
    if (count === 3) return "bg-green-300 hover:bg-green-400";
    return "bg-green-400 hover:bg-green-500";
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
    <section id="git-history" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-jal-red text-xs font-bold tracking-[0.25em] uppercase mb-2">
            Git Activity
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-jal-dark mb-4">
            Development Activity
          </h2>
          <div className="section-divider" />
        </div>

        {/* Shields.io badges - refined margins */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Contribution graph in premium wrapper */}
        <div className="card-premium p-6 md:p-8 bg-white">
          <div className="flex flex-col overflow-x-auto content-row-scroll pb-2">
            {/* Months */}
            <div className="flex text-[10px] text-jal-text-muted select-none mb-2 ml-8 h-4 relative">
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

            {/* Grid wrapper */}
            <div className="flex gap-2">
              {/* Day labels */}
              <div className="grid grid-rows-7 gap-[3px] text-[9px] text-jal-text-muted select-none pr-1 justify-items-end w-6">
                <span>Sun</span><span className="invisible">Mon</span><span>Tue</span>
                <span className="invisible">Wed</span><span>Thu</span><span className="invisible">Fri</span><span>Sat</span>
              </div>
              
              {/* Cells */}
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
                            className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-300 cursor-default ${hasActual ? "cursor-pointer scale-[1.15] shadow-[0_1px_4px_rgba(200,16,46,0.2)]" : ""} ${getGrassColor(day.count, hasActual)}`}
                            aria-label={`${day.count} contributions on ${day.date}`}
                          />
                          {/* Premium tooltip - cubic-bezier transitioned */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:flex flex-col items-center z-20 pointer-events-none transition-all duration-300">
                            <div className="bg-jal-dark text-[11px] text-white px-3 py-2 rounded shadow-2xl border border-neutral-700/50 whitespace-nowrap leading-tight text-center">
                              <span className="font-semibold block">{day.count} {day.count === 1 ? "commit" : "commits"}</span>
                              <span className="text-gray-400 text-[9px]">{day.date}</span>
                              {hasActual && <span className="block text-jal-red text-[9px] font-bold mt-1 tracking-wide animate-pulse">Click to view details</span>}
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

          {/* Legend */}
          <div className="flex justify-between items-center mt-5 text-[10px] text-jal-text-muted select-none border-t border-jal-border-light pt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-jal-red ring-1 ring-jal-red/20 shadow-sm" />
              <span>Actual Portfolio Commits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-gray-100" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-100/90" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-200" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-300" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-green-400" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Commit detail cards - using card-premium and interactive-press */}
        {selectedDate && activeCommits.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <div className="text-xs text-jal-text-muted mb-4 flex items-center justify-between">
              <span>Commits on <strong className="text-jal-dark">{selectedDate}</strong></span>
              <button onClick={() => setSelectedDate(null)} className="text-jal-red hover:underline cursor-pointer flex items-center gap-0.5 font-semibold">
                <span className="material-symbols-outlined text-[12px] select-none">close</span>
                Clear Selection
              </button>
            </div>
            <div className="space-y-4">
              {activeCommits.map((commit) => (
                <div key={commit.hash} className="card-premium interactive-press p-6 bg-white cursor-pointer">
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                    <span className="font-mono text-jal-text-muted bg-jal-bg px-2.5 py-0.5 rounded border border-jal-border-light">{commit.hash}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${getTypeColor(commit.type)}`}>{commit.type}</span>
                    <span className="text-jal-text-muted ml-auto flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] select-none">calendar_today</span>{commit.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-jal-dark mb-2 leading-snug">{commit.message}</h3>
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
