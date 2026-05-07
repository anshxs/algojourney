import StatCard from "./StatCard";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { formatNumber } from "./utils";
import { Flame, Target, TrendingUp, Trophy } from "lucide-react";

export default function LeetCodeHeader({ userInfo, contestInfo, calendar }) {
  const profile = userInfo?.profile || {};
  const ranking = contestInfo?.userContestRanking || {};

  return (
    <Card className="overflow-hidden bg-[linear-gradient(135deg,#1d1d1d,#141414)] p-5 shadow-[0_22px_90px_rgba(0,0,0,0.36)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#ff2f7d,#ff7418)] p-[1px]">
            <img
              src={profile.userAvatar}
              alt={profile.realName || userInfo?.username || "LeetCode avatar"}
              className="h-20 w-20 rounded-2xl bg-[#111111] object-cover"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">LeetCode Profile</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">
              {profile.realName || userInfo?.username}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className="border-[#ff7418]/25 bg-[#ff7418]/10 text-[#ffb088]">@{userInfo?.username}</Badge>
              <Badge variant="muted">Rank {formatNumber(profile.ranking)}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-400">
              {profile.countryName ? <Badge variant="muted">{profile.countryName}</Badge> : null}
              {profile.school ? <Badge variant="muted">{profile.school}</Badge> : null}
              {profile.websites?.[0] ? (
                <a
                  href={profile.websites[0]}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-white/10 bg-[#202020] px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Website
                </a>
              ) : null}
            </div>
            {profile.aboutMe ? <p className="mt-3 max-w-2xl text-sm text-zinc-300">{profile.aboutMe}</p> : null}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[24rem]">
          <StatCard label="Global Rank" value={formatNumber(profile.ranking)} icon={Target} accent="text-[#6b7cff]" />
          <StatCard label="Contest Rating" value={formatNumber(Math.round(ranking.rating || 0))} icon={Trophy} accent="text-[#f6c343]" />
          <StatCard label="Contest Top %" value={ranking.topPercentage ?? "—"} hint="Lower is better" icon={TrendingUp} accent="text-[#28d17c]" />
          <StatCard label="Current Streak" value={formatNumber(calendar?.streak)} hint="Active coding days" icon={Flame} accent="text-[#ff6a3d]" />
        </div>
      </div>
    </Card>
  );
}
