import LeetCodeSection from "./LeetCodeSection";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { formatDateFromSeconds } from "./utils";

export default function LeetCodeSubmissions({ submissions }) {
  return (
    <LeetCodeSection title="Recent Submissions" subtitle="Latest accepted and failed attempts from the recent activity feed.">
      <div className="grid gap-2">
        {submissions?.slice(0, 12).map((submission) => (
          <Card
            key={submission.id}
            className="group flex flex-col gap-3 bg-[#151515] p-3 transition hover:-translate-y-0.5 hover:border-[#ff6a3d]/35 hover:bg-[#1d1d1d] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white transition group-hover:text-[#ffb088]">{submission.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                {submission.langName} · {formatDateFromSeconds(submission.timestamp)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant={submission.statusDisplay === "Accepted" ? "success" : "danger"}>
                {submission.statusDisplay}
              </Badge>
              <span className="rounded-md bg-[#101010] px-2 py-1 text-zinc-400">{submission.runtime || "—"}</span>
              <span className="rounded-md bg-[#101010] px-2 py-1 text-zinc-400">{submission.memory || "—"}</span>
            </div>
          </Card>
        ))}
      </div>
    </LeetCodeSection>
  );
}
