"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const handleSubmit = (event) => {
    router.push(`/profile?leetcode=${leetcode.trim()}&codeforces=${codeforces.trim()}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_34%),linear-gradient(135deg,_#0f172a_0%,_#111827_50%,_#020617_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          <section className="flex items-center justify-center">
            <div
              className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Build your profile</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Fill in both usernames and we&apos;ll send you to the profile route with a shareable URL.
                </p>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">LeetCode username</span>
                  <input
                    value={leetcode}
                    onChange={(event) => setLeetcode(event.target.value)}
                    type="text"
                    placeholder="dxfgh"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:bg-white/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Codeforces username</span>
                  <input
                    value={codeforces}
                    onChange={(event) => setCodeforces(event.target.value)}
                    type="text"
                    placeholder="anshsx"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:bg-white/10"
                  />
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                View profile
              </button>
              
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}