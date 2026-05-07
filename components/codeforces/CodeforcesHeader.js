import StatCard from "../leetcode/StatCard";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { formatDateFromSeconds, formatNumber } from "../leetcode/utils";
import { Flame, Star, TrendingUp, Users } from "lucide-react";

export default function CodeforcesHeader({ info }) {
  const user = info?.result?.[0];

  if (!user) {
    return null;
  }

  return (
    <Card className="overflow-hidden bg-[linear-gradient(135deg,#1d1d1d,#141414)] p-5 shadow-[0_22px_90px_rgba(0,0,0,0.36)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#ff2f7d,#6b7cff)] p-[1px]">
            <img
              src={user.titlePhoto || user.avatar}
              alt={user.handle}
              className="h-20 w-20 rounded-2xl bg-[#111111] object-cover"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">Codeforces Profile</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">{user.handle}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge className="border-[#ff2f7d]/25 bg-[#ff2f7d]/10 text-[#ff8ab7]">{user.rank || "unrated"}</Badge>
              <Badge variant="muted">Max {user.maxRank || "unrated"}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-400">
              {user.firstName ? <span>{user.firstName}</span> : null}
              {user.organization ? <span>{user.organization}</span> : null}
              <span>Joined {formatDateFromSeconds(user.registrationTimeSeconds)}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[24rem]">
          <StatCard label="Rating" value={formatNumber(user.rating)} icon={TrendingUp} accent="text-[#ff2f7d]" />
          <StatCard label="Max Rating" value={formatNumber(user.maxRating)} icon={Flame} accent="text-[#ff7418]" />
          <StatCard label="Contribution" value={formatNumber(user.contribution)} icon={Star} accent="text-[#f6c343]" />
          <StatCard label="Friends" value={formatNumber(user.friendOfCount)} icon={Users} accent="text-[#6b7cff]" />
        </div>
      </div>
    </Card>
  );
}
