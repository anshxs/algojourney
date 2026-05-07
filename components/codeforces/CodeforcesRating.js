import CodeforcesSection from "./CodeforcesSection";
import RatingChart from "../charts/RatingChart";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { formatDateFromSeconds, formatNumber } from "../leetcode/utils";

export default function CodeforcesRating({ rating }) {
  const contests = rating?.result || [];
  const chartData = contests.map((contest, index) => ({
    label: `${index + 1}`,
    name: contest.contestName,
    rating: contest.newRating,
    rank: formatNumber(contest.rank),
  }));

  return (
    <CodeforcesSection title="Codeforces Rating" subtitle="Recent rated contest changes.">
      {contests.length ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <RatingChart data={chartData} color="#ff2f7d" />
          <div className="grid gap-2">
            {contests.slice(-8).reverse().map((contest) => (
              <Card key={`${contest.contestId}-${contest.ratingUpdateTimeSeconds}`} className="bg-[#151515] p-3 transition hover:border-[#ff2f7d]/35 hover:bg-[#1d1d1d]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-white">{contest.contestName}</p>
                    <p className="text-xs text-slate-500">{formatDateFromSeconds(contest.ratingUpdateTimeSeconds)}</p>
                  </div>
                  <Badge variant="info">
                    {formatNumber(contest.oldRating)} to {formatNumber(contest.newRating)}
                  </Badge>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  <p className="rounded-md bg-[#101010] px-2 py-1">Rank: {formatNumber(contest.rank)}</p>
                  <p className="rounded-md bg-[#101010] px-2 py-1">Change: {formatNumber(contest.newRating - contest.oldRating)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400">No rated contests found.</p>
      )}
    </CodeforcesSection>
  );
}
