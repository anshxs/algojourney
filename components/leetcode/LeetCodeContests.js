import LeetCodeSection from "./LeetCodeSection";
import RatingChart from "../charts/RatingChart";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { formatDateFromSeconds, formatNumber } from "./utils";

export default function LeetCodeContests({ contestInfo }) {
  const ranking = contestInfo?.userContestRanking || {};
  const history = contestInfo?.userContestRankingHistory || [];
  const chartData = history.map((entry, index) => ({
    label: `${index + 1}`,
    name: entry.contest?.title,
    rating: entry.rating,
    rank: formatNumber(entry.ranking),
  }));

  return (
    <LeetCodeSection title="Contests" subtitle="Current contest standing and recent rating movement.">
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-w-0 space-y-4">
          <Card className="bg-[#151515] p-4 text-sm text-slate-300">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Rating", formatNumber(Math.round(ranking.rating || 0))],
                ["Global Ranking", formatNumber(ranking.globalRanking)],
                ["Participants", formatNumber(ranking.totalParticipants)],
                ["Top Percentage", `${ranking.topPercentage ?? "—"}%`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-[#101010] p-3">
                  <p className="text-slate-500">{label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </Card>
          <RatingChart data={chartData} color="#ff7418" />
        </div>

        <div className="grid min-w-0 gap-2">
          {history.map((entry) => (
            <Card key={`${entry.contest?.title}-${entry.contest?.startTime}`} className="bg-[#151515] p-3 transition hover:border-[#ff7418]/35 hover:bg-[#1d1d1d]">
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="break-words font-medium text-white">{entry.contest?.title}</p>
                  <p className="text-xs text-slate-500">{formatDateFromSeconds(entry.contest?.startTime)}</p>
                </div>
                <Badge variant={entry.trendDirection === "UP" ? "success" : "danger"}>
                  {entry.trendDirection}
                </Badge>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-4">
                <p className="rounded-md bg-[#101010] px-2 py-1">Rank: {formatNumber(entry.ranking)}</p>
                <p className="rounded-md bg-[#101010] px-2 py-1">Solved: {entry.problemsSolved}/{entry.totalProblems}</p>
                <p className="rounded-md bg-[#101010] px-2 py-1">Rating: {formatNumber(Math.round(entry.rating || 0))}</p>
                <p className="rounded-md bg-[#101010] px-2 py-1">Finish: {formatNumber(entry.finishTimeInSeconds)}s</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </LeetCodeSection>
  );
}
