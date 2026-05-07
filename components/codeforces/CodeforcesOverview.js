import CodeforcesSection from "./CodeforcesSection";
import { Card } from "../ui/card";
import { formatNumber } from "../leetcode/utils";

function topEntries(map, count = 5) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count);
}

function BarList({ title, items, color = "bg-[#ff2f7d]" }) {
  const max = Math.max(...items.map(([, value]) => value), 1);

  return (
    <Card className="bg-[#151515] p-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="flex min-w-0 items-center justify-between gap-3 text-sm">
              <span className="truncate text-zinc-300">{label}</span>
              <span className="shrink-0 font-medium text-white">{formatNumber(value)}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full origin-left rounded-full ${color} [animation:bar-grow_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]`}
                style={{ width: `${Math.max(8, (value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function CodeforcesOverview({ stats }) {
  const submissions = stats?.result || [];
  const accepted = submissions.filter((submission) => submission.verdict === "OK");
  const verdicts = {};
  const languages = {};
  const tags = {};

  submissions.forEach((submission) => {
    verdicts[submission.verdict || "UNKNOWN"] = (verdicts[submission.verdict || "UNKNOWN"] || 0) + 1;
    languages[submission.programmingLanguage || "Unknown"] = (languages[submission.programmingLanguage || "Unknown"] || 0) + 1;
    submission.problem?.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  const uniqueSolved = new Set(
    accepted.map((submission) => `${submission.problem?.contestId}-${submission.problem?.index}`)
  ).size;
  const averageRating =
    accepted.reduce((sum, submission) => sum + (submission.problem?.rating || 0), 0) /
    Math.max(accepted.filter((submission) => submission.problem?.rating).length, 1);

  return (
    <CodeforcesSection title="Codeforces Insights" subtitle="Submission quality, language usage, and topic distribution.">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="bg-[#151515] p-4 transition hover:border-[#28d17c]/30 hover:bg-[#1d1d1d]">
          <p className="text-sm text-zinc-500">Accepted</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(accepted.length)}</p>
        </Card>
        <Card className="bg-[#151515] p-4 transition hover:border-[#ff7418]/30 hover:bg-[#1d1d1d]">
          <p className="text-sm text-zinc-500">Unique Solved</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(uniqueSolved)}</p>
        </Card>
        <Card className="bg-[#151515] p-4 transition hover:border-[#6b7cff]/30 hover:bg-[#1d1d1d]">
          <p className="text-sm text-zinc-500">Avg Solved Rating</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(Math.round(averageRating || 0))}</p>
        </Card>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <BarList title="Verdicts" items={topEntries(verdicts)} color="bg-[#ff2f7d]" />
        <BarList title="Languages" items={topEntries(languages)} color="bg-[#ff7418]" />
        <BarList title="Top Tags" items={topEntries(tags)} color="bg-[#6b7cff]" />
      </div>
    </CodeforcesSection>
  );
}
