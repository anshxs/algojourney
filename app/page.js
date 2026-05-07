"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3, Code2, Flame, Trophy } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function Home() {
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const leetcodeHandle = leetcode.trim();
    const codeforcesHandle = codeforces.trim();
    const params = new URLSearchParams();

    if (leetcodeHandle) {
      params.set("leetcode", leetcodeHandle);
    }

    if (codeforcesHandle) {
      params.set("codeforces", codeforcesHandle);
    }

    router.push(`/profile?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#090909] bg-[radial-gradient(circle_at_20%_0%,rgba(255,47,125,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(255,116,24,0.14),transparent_32%),linear-gradient(180deg,#090909,#101010_48%,#080808)] px-4 py-5 text-zinc-100 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-5 lg:grid-cols-[1fr_26rem] lg:items-center">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#242424] px-3 py-2 text-sm text-zinc-300">
              <BarChart3 className="h-4 w-4 text-[#ff6a3d]" />
              AlgoJourney for Students
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Compact coding profile for LeetCode and Codeforces.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
              Choose your platforms, jump between sections from the floating sidebar, and avoid scrolling through one huge page.
            </p>

            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              <Card className="bg-[#171717]/90 p-4 transition hover:-translate-y-0.5 hover:border-[#ff6a3d]/35 hover:bg-[#202020]">
                <p className="text-xl font-semibold text-white">Tabs</p>
                <p className="mt-1 text-sm text-zinc-400">Switch platform</p>
              </Card>
              <Card className="bg-[#171717]/90 p-4 transition hover:-translate-y-0.5 hover:border-[#ff2f7d]/35 hover:bg-[#202020]">
                <p className="text-xl font-semibold text-white">Rail</p>
                <p className="mt-1 text-sm text-zinc-400">Jump sections</p>
              </Card>
              <Card className="bg-[#171717]/90 p-4 transition hover:-translate-y-0.5 hover:border-[#6b7cff]/35 hover:bg-[#202020]">
                <p className="text-xl font-semibold text-white">Graphs</p>
                <p className="mt-1 text-sm text-zinc-400">Rating trend</p>
              </Card>
            </div>

            <div className="mt-7 grid max-w-2xl gap-3 text-sm text-zinc-300 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[#ff2f7d]" />
                Practice stats
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#ff7418]" />
                Contest history
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-[#ff6a3d]" />
                Streak heat
              </div>
            </div>
          </section>

          <Card as="section" className="bg-[linear-gradient(145deg,#1c1c1c,#141414)] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.42)]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Build your student profile</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Add one or both handles. If a profile is missing, you can still use the other one.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">LeetCode handle</span>
                <input
                  value={leetcode}
                  onChange={(event) => setLeetcode(event.target.value)}
                  type="text"
                  placeholder="anshxs"
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#101010] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ff6a3d] focus:bg-[#151515] focus:shadow-[0_0_0_3px_rgba(255,106,61,0.12)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Codeforces handle</span>
                <input
                  value={codeforces}
                  onChange={(event) => setCodeforces(event.target.value)}
                  type="text"
                  placeholder="anshxs"
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#101010] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#ff6a3d] focus:bg-[#151515] focus:shadow-[0_0_0_3px_rgba(255,106,61,0.12)]"
                />
              </label>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[linear-gradient(135deg,#ff2f7d,#ff7418)] text-white shadow-[0_18px_50px_rgba(255,106,61,0.18)] hover:opacity-95"
              >
                Ignite dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <Card className="mt-6 bg-[#111111] p-4">
              <p className="text-sm font-medium text-white">What you’ll see</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-300">
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Problem solving</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Contest history</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#ff6a3d]/20 bg-[#ff6a3d]/10 px-3 py-1.5 text-[#ffb088]">
                  <Flame className="h-3.5 w-3.5" />
                  Submission streaks
                </span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Badges</span>
                <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Skills</span>
              </div>
            </Card>
          </Card>
        </div>
      </div>
    </main>
  );
}
