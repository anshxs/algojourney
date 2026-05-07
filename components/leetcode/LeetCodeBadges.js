import LeetCodeSection from "./LeetCodeSection";
import { Card } from "../ui/card";
import { formatDate } from "./utils";

export default function LeetCodeBadges({ badgesInfo }) {
  const badges = badgesInfo?.badges || [];
  const upcoming = badgesInfo?.upcomingBadges || [];

  return (
    <LeetCodeSection title="Badges" subtitle="Earned annual badges and upcoming challenge placeholders.">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {badges.map((badge) => (
            <Card key={badge.id} className="group flex items-center gap-4 bg-[#151515] p-4 transition hover:-translate-y-0.5 hover:border-[#ff6a3d]/35 hover:bg-[#1d1d1d]">
              <div className="rounded-xl bg-[linear-gradient(135deg,#ff2f7d,#ff7418)] p-[1px]">
                <img src={badge.icon} alt={badge.displayName} className="h-14 w-14 rounded-xl bg-[#111111] object-cover" />
              </div>
              <div>
                <p className="font-medium text-white transition group-hover:text-[#ffb088]">{badge.displayName}</p>
                <p className="text-sm text-slate-400">{formatDate(badge.creationDate)}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          {upcoming.map((badge) => (
            <Card key={badge.name} className="bg-[#151515] p-4 transition hover:border-[#6b7cff]/35 hover:bg-[#1d1d1d]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">{badge.name}</p>
                <span className="rounded-md border border-white/10 bg-[#101010] px-2 py-1 text-xs text-zinc-400">{badge.progress}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#ff2f7d,#ff7418)] [animation:bar-grow_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </LeetCodeSection>
  );
}
