"use client";

import {
  Trophy,
  Flame,
  CheckCircle2,
  Code2,
  Activity,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    label: "Easy",
    solved: 117,
    total: 941,
    color: "bg-emerald-500",
  },
  {
    label: "Medium",
    solved: 42,
    total: 2050,
    color: "bg-amber-500",
  },
  {
    label: "Hard",
    solved: 2,
    total: 929,
    color: "bg-rose-500",
  },
];

const recentSubmissions = [
  "Rotating the Box",
  "Combination Sum III",
  "Swap Nodes in Pairs",
  "Rotate Image",
  "Binary Tree Inorder Traversal",
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#0F0F11] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] text-4xl font-semibold">
              A
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight">
                  Arpit Rajput
                </h1>

                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                  Verified
                </div>
              </div>

              <p className="mt-2 text-sm text-white/50">
                Consistent progress over chaotic grinding.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                  LeetCode:{" "}
                  <span className="text-white">NoobMaster62</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                  Codeforces:{" "}
                  <span className="text-white">ArpitRajput</span>
                </div>
              </div>
            </div>
          </div>

          <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/[0.08]">
            Edit Profile
          </button>
        </section>

        {/* Main Content */}
        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Overview */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" />

                <h2 className="text-lg font-medium">Overview</h2>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <StatCard
                  icon={<CheckCircle2 size={16} />}
                  title="Solved"
                  value="161"
                  subtitle="Out of 3920 problems"
                />

                <StatCard
                  icon={<Trophy size={16} />}
                  title="Ranking"
                  value="976k"
                  subtitle="Global ranking"
                />

                <StatCard
                  icon={<Flame size={16} />}
                  title="Contribution"
                  value="369"
                  subtitle="Consistency points"
                />
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-indigo-400" />

                <h2 className="text-lg font-medium">
                  Difficulty Breakdown
                </h2>
              </div>

              <div className="mt-8 space-y-6">
                {stats.map((item) => {
                  const percentage = (item.solved / item.total) * 100;

                  return (
                    <div key={item.label}>
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{item.label}</h3>

                          <p className="text-sm text-white/40">
                            {item.solved} solved / {item.total}
                          </p>
                        </div>

                        <span className="text-sm text-white/50">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-indigo-400" />

                <h2 className="text-lg font-medium">
                  Recent Submissions
                </h2>
              </div>

              <div className="mt-8 space-y-3">
                {recentSubmissions.map((problem) => (
                  <div
                    key={problem}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 px-5 py-4 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <div>
                      <h3 className="font-medium text-white/90">
                        {problem}
                      </h3>

                      <p className="mt-1 text-sm text-white/40">
                        Accepted • Python3
                      </p>
                    </div>

                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      Accepted
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Codeforces */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Codeforces</h2>

                <div className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">
                  newbie
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-5xl font-semibold">418</h3>

                <p className="mt-2 text-sm text-white/40">
                  Current rating
                </p>
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="text-lg font-medium">Activity</h2>

              <div className="mt-8 grid grid-cols-7 gap-2">
                {Array.from({ length: 49 }).map((_, index) => {
                  const levels = [
                    "bg-white/5",
                    "bg-indigo-500/20",
                    "bg-indigo-500/40",
                    "bg-indigo-500/70",
                  ];

                  const random =
                    levels[Math.floor(Math.random() * levels.length)];

                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-md ${random}`}
                    />
                  );
                })}
              </div>

              <p className="mt-6 text-sm text-white/40">
                Consistent coding activity over time.
              </p>
            </div>

            {/* Topics */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <h2 className="text-lg font-medium">Most Solved Topics</h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Implementation",
                  "Strings",
                  "Math",
                  "Greedy",
                  "Binary Trees",
                  "Recursion",
                ].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-2 text-white/50">
        {icon}

        <span className="text-sm">{title}</span>
      </div>

      <h3 className="mt-4 text-4xl font-semibold">{value}</h3>

      <p className="mt-2 text-sm text-white/40">{subtitle}</p>
    </div>
  );
}