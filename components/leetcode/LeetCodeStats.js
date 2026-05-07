import LeetCodeSection from "./LeetCodeSection";
import { formatNumber, getDifficultyTone } from "./utils";

const LEETCODE_TOTALS = {
  All: 3920,
  Easy: 941,
  Medium: 2050,
  Hard: 929,
};

export default function LeetCodeStats({ submitStats }) {
  const accepted = submitStats?.acSubmissionNum || [];
  const totals = submitStats?.totalSubmissionNum || [];

  return (
    <LeetCodeSection title="Submission Stats" subtitle="Accepted counts and total attempts split by difficulty.">
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111111]">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="bg-[#1d1d1d] text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium">Accepted</th>
              <th className="px-4 py-3 font-medium">Accepted Submissions</th>
              <th className="px-4 py-3 font-medium">Total Questions</th>
              <th className="px-4 py-3 font-medium">Total Submissions</th>
            </tr>
          </thead>
          <tbody>
            {accepted.map((entry, index) => {
              const totalEntry = totals[index] || {};
              const questionTotal = LEETCODE_TOTALS[entry.difficulty] || totalEntry.count;

              return (
                <tr key={entry.difficulty} className="border-t border-white/10 text-slate-200 transition hover:bg-white/[0.04]">
                  <td className={`px-4 py-3 font-medium ${getDifficultyTone(entry.difficulty)}`}>{entry.difficulty}</td>
                  <td className="px-4 py-3">{formatNumber(entry.count)}</td>
                  <td className="px-4 py-3">{formatNumber(entry.submissions)}</td>
                  <td className="px-4 py-3">{formatNumber(questionTotal)}</td>
                  <td className="px-4 py-3">{formatNumber(totalEntry.submissions)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </LeetCodeSection>
  );
}
