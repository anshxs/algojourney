"use client";

import { useMemo, useState } from "react";
import LeetCodeSection from "./LeetCodeSection";
import { Card } from "../ui/card";
import { formatNumber } from "./utils";
import { CalendarDays, Flame, Sparkles } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function heatCell(count) {
  if (count >= 20) return "bg-[#ff6a3d] shadow-[0_0_12px_rgba(255,106,61,0.35)]";
  if (count >= 10) return "bg-[#f6c343]";
  if (count >= 5) return "bg-[#28d17c]";
  if (count > 0) return "bg-[#28543a]";
  return "bg-white/10";
}

function buildYearHeatmap(year, submissionCalendar) {
  const firstDay = new Date(Date.UTC(year, 0, 1));
  const lastDay = new Date(Date.UTC(year, 11, 31));
  const start = new Date(Date.UTC(year, 0, 1 - firstDay.getUTCDay()));
  const end = new Date(Date.UTC(year, 11, 31 + (6 - lastDay.getUTCDay())));
  const weeks = [];
  let week = [];

  for (let date = new Date(start); date <= end; date.setUTCDate(date.getUTCDate() + 1)) {
    const copy = new Date(date);
    const timestamp = String(Math.floor(copy.getTime() / 1000));
    const inYear = copy.getUTCFullYear() === year;
    const count = inYear ? submissionCalendar[timestamp] || 0 : 0;

    week.push({
      count,
      date: copy,
      inYear,
      timestamp,
    });

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  const days = weeks.flat().filter((day) => day.inYear);
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const active = days.filter((day) => day.count > 0).length;
  const best = days.reduce((max, day) => Math.max(max, day.count), 0);
  const monthLabels = weeks.map((daysInWeek, index) => {
    const monthStart = daysInWeek.find((day) => day.inYear && day.date.getUTCDate() === 1);

    if (monthStart) {
      return MONTHS[monthStart.date.getUTCMonth()];
    }

    return index === 0 ? MONTHS[0] : "";
  });

  const monthStartWeeks = weeks.map((daysInWeek) =>
    daysInWeek.some((day) => day.inYear && day.date.getUTCDate() === 1 && day.date.getUTCMonth() !== 0)
  );

  return { active, best, monthLabels, monthStartWeeks, total, weeks };
}

export default function LeetCodeActivity({ calendar }) {
  const submissionCalendar = calendar?.submissionCalendar || {};
  const years = calendar?.activeYears?.length ? calendar.activeYears : [new Date().getUTCFullYear()];
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const visibleYear = years.includes(selectedYear) ? selectedYear : years[years.length - 1];
  const heatmap = useMemo(
    () => buildYearHeatmap(visibleYear, submissionCalendar),
    [submissionCalendar, visibleYear]
  );

  return (
    <LeetCodeSection title="Activity" subtitle="Current streak, active years, and a full-year submission heat map.">
      <div className="grid gap-4 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="grid min-w-0 gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <Card className="relative overflow-hidden bg-[linear-gradient(135deg,#21140f,#151515)] p-4 transition hover:border-[#ff6a3d]/40">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ff6a3d]/20 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Fire Streak</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(calendar?.streak)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6a3d]/15 text-[#ff9a6d]">
                <Flame className="h-6 w-6" />
              </div>
            </div>
          </Card>
          <Card className="bg-[#151515] p-4 transition hover:border-[#28d17c]/30 hover:bg-[#1d1d1d]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Active Days</p>
              <CalendarDays className="h-4 w-4 text-[#28d17c]" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(calendar?.totalActiveDays)}</p>
          </Card>
          <Card className="bg-[#151515] p-4 transition hover:border-[#6b7cff]/30 hover:bg-[#1d1d1d]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Years</p>
              <Sparkles className="h-4 w-4 text-[#6b7cff]" />
            </div>
            <p className="mt-2 text-lg font-semibold text-white">{calendar?.activeYears?.join(", ") || "—"}</p>
          </Card>
        </div>

        <div className="min-w-0 space-y-3">
          <Card className="min-w-0 overflow-hidden bg-[#151515] p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white">{visibleYear} Heat Map</p>
                <p className="text-xs text-zinc-500">Full-year activity across every calendar day</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium transition ${
                      visibleYear === year
                        ? "border-[#ff6a3d]/40 bg-[#ff6a3d]/15 text-[#ffb088]"
                        : "border-white/10 bg-[#101010] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full overflow-x-auto overscroll-x-contain pb-2">
              <div className="w-max min-w-[760px]">
                <div
                  className="mb-2 grid gap-1 text-[10px] text-zinc-500"
                  style={{ gridTemplateColumns: `repeat(${heatmap.weeks.length}, minmax(0, 1fr))` }}
                >
                  {heatmap.monthLabels.map((label, index) => (
                    <span
                      key={`${label}-${index}`}
                      className={`h-3 ${heatmap.monthStartWeeks[index] ? "ml-2" : ""}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-1">
                  {heatmap.weeks.map((week, weekIndex) => (
                    <div
                      key={weekIndex}
                      className={`grid gap-1 ${heatmap.monthStartWeeks[weekIndex] ? "ml-2 border-l border-white/10 pl-2" : ""}`}
                    >
                      {week.map((day) => (
                        <div
                          key={day.timestamp}
                          title={`${formatNumber(day.count)} submissions on ${day.date.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`}
                          className={`h-2.5 w-2.5 rounded-[3px] transition hover:scale-150 ${
                            day.inYear ? heatCell(day.count) : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span>Less</span>
                {[0, 1, 5, 10, 20].map((count) => (
                  <span key={count} className={`h-2.5 w-2.5 rounded-[3px] ${heatCell(count)}`} />
                ))}
                <span>More</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{formatNumber(heatmap.active)} active days</span>
                <span>{formatNumber(heatmap.total)} submissions</span>
                <span>Best day {formatNumber(heatmap.best)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LeetCodeSection>
  );
}
