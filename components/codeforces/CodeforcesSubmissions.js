import CodeforcesSection from "./CodeforcesSection";
import { Card } from "../ui/card";
import { formatDateFromSeconds, formatNumber } from "../leetcode/utils";

function verdictClass(verdict) {
  if (verdict === "OK") {
    return "bg-emerald-500/15 text-emerald-300";
  }

  return "bg-rose-500/15 text-rose-300";
}

export default function CodeforcesSubmissions({ stats }) {
  const submissions = stats?.result || [];
  const accepted = submissions.filter((submission) => submission.verdict === "OK").length;
  const uniqueSolved = new Set(
    submissions
      .filter((submission) => submission.verdict === "OK")
      .map((submission) => `${submission.problem?.contestId}-${submission.problem?.index}`)
  ).size;

  return (
    <CodeforcesSection title="Codeforces Submissions" subtitle="Latest submissions and quick stats from user.status.">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="bg-[#151515] p-4 transition hover:border-[#ff2f7d]/30 hover:bg-[#1d1d1d]">
          <p className="text-sm text-slate-500">Fetched</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(submissions.length)}</p>
        </Card>
        <Card className="bg-[#151515] p-4 transition hover:border-[#28d17c]/30 hover:bg-[#1d1d1d]">
          <p className="text-sm text-slate-500">Accepted</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(accepted)}</p>
        </Card>
        <Card className="bg-[#151515] p-4 transition hover:border-[#ff7418]/30 hover:bg-[#1d1d1d]">
          <p className="text-sm text-slate-500">Unique Solved</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(uniqueSolved)}</p>
        </Card>
      </div>

      <div className="grid gap-2">
        {submissions.slice(0, 12).map((submission) => (
          <Card
            key={submission.id}
            className="group flex flex-col gap-3 bg-[#151515] p-3 transition hover:-translate-y-0.5 hover:border-[#ff2f7d]/35 hover:bg-[#1d1d1d] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <p className="break-words font-medium text-white transition group-hover:text-[#ff8ab7]">
                {submission.problem?.index}. {submission.problem?.name}
              </p>
              <p className="mt-1 break-words text-xs text-slate-500">
                {submission.programmingLanguage} · {formatDateFromSeconds(submission.creationTimeSeconds)}
              </p>
              {submission.problem?.tags?.length ? (
                <p className="mt-2 break-words text-xs text-slate-500">{submission.problem.tags.slice(0, 4).join(", ")}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm sm:justify-end">
              <span className={`rounded-full px-2.5 py-1 ${verdictClass(submission.verdict)}`}>
                {submission.verdict || "UNKNOWN"}
              </span>
              <span className="rounded-md bg-[#101010] px-2 py-1 text-slate-400">{formatNumber(submission.problem?.rating)} rating</span>
              <span className="rounded-md bg-[#101010] px-2 py-1 text-slate-400">{formatNumber(submission.timeConsumedMillis)} ms</span>
            </div>
          </Card>
        ))}
      </div>
    </CodeforcesSection>
  );
}
