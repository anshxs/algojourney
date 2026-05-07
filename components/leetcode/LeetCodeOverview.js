import LeetCodeSection from "./LeetCodeSection";
import DifficultyBreakdown from "./DifficultyBreakdown";
import MetricStrip from "./MetricStrip";
import ProgressRings from "./ProgressRings";
import { formatNumber } from "./utils";
import { Activity, Eye, MessageSquare, Trophy } from "lucide-react";

const LEETCODE_TOTALS = {
  All: 3920,
  Easy: 941,
  Medium: 2050,
  Hard: 929,
};

function findDifficulty(stats, difficulty) {
  return stats?.find((item) => item.difficulty === difficulty) || {};
}

export default function LeetCodeOverview({ userInfo, contestInfo, calendar }) {
  const profile = userInfo?.profile || {};
  const ranking = contestInfo?.userContestRanking || {};
  const accepted = userInfo?.submitStats?.acSubmissionNum || [];
  const easy = findDifficulty(accepted, "Easy");
  const medium = findDifficulty(accepted, "Medium");
  const hard = findDifficulty(accepted, "Hard");
  const totalSolved = findDifficulty(accepted, "All")?.count || 0;
  const difficultyItems = [
    { difficulty: "Easy", solved: easy.count || 0, total: LEETCODE_TOTALS.Easy },
    { difficulty: "Medium", solved: medium.count || 0, total: LEETCODE_TOTALS.Medium },
    { difficulty: "Hard", solved: hard.count || 0, total: LEETCODE_TOTALS.Hard },
  ];
  const metricItems = [
    { label: "Contests", value: formatNumber(ranking.attendedContestsCount), icon: Trophy },
    { label: "Active Days", value: formatNumber(calendar?.totalActiveDays), icon: Activity },
    { label: "Discuss", value: formatNumber(profile.categoryDiscussCount), icon: MessageSquare },
    { label: "Views", value: formatNumber(profile.postViewCount), icon: Eye },
  ];

  return (
    <LeetCodeSection title="Overview" subtitle="A quick snapshot of profile, problem-solving, and contest activity.">
      <div className="grid gap-4 xl:grid-cols-[21rem_1fr]">
        <div className="rounded-xl border border-white/10 bg-[linear-gradient(145deg,#181818,#101010)] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <ProgressRings
            totalSolved={totalSolved}
            totalQuestions={LEETCODE_TOTALS.All}
            easy={{ solved: easy.count || 0, total: LEETCODE_TOTALS.Easy }}
            medium={{ solved: medium.count || 0, total: LEETCODE_TOTALS.Medium }}
            hard={{ solved: hard.count || 0, total: LEETCODE_TOTALS.Hard }}
          />
        </div>
        <DifficultyBreakdown items={difficultyItems} />
      </div>
      <div className="mt-4">
        <MetricStrip items={metricItems} />
      </div>
    </LeetCodeSection>
  );
}
