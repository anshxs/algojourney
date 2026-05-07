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
    <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">

        <section className="flex items-center justify-center">

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
        </section>
      </div>
    </div>
  );
}