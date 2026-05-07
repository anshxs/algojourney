"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { formatNumber } from "./utils";

const DIFFICULTY_STYLES = {
  Easy: {
    color: "text-[#28d17c]",
    bar: "bg-[#28d17c]",
    glow: "hover:border-[#28d17c]/40 hover:shadow-[0_0_30px_rgba(40,209,124,0.12)]",
  },
  Medium: {
    color: "text-[#f6c343]",
    bar: "bg-[#f6c343]",
    glow: "hover:border-[#f6c343]/40 hover:shadow-[0_0_30px_rgba(246,195,67,0.12)]",
  },
  Hard: {
    color: "text-[#ff4d68]",
    bar: "bg-[#ff4d68]",
    glow: "hover:border-[#ff4d68]/40 hover:shadow-[0_0_30px_rgba(255,77,104,0.12)]",
  },
};

export default function DifficultyBreakdown({ items }) {
  const [active, setActive] = useState("Easy");

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const style = DIFFICULTY_STYLES[item.difficulty];
        const percent = item.total ? Math.round((item.solved / item.total) * 100) : 0;
        const isActive = active === item.difficulty;

        return (
          <Card
            key={item.difficulty}
            onMouseEnter={() => setActive(item.difficulty)}
            className={`cursor-default p-4 transition duration-200 hover:-translate-y-0.5 ${style.glow} ${isActive ? "bg-[#202020]" : "bg-[#171717]"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={`text-sm font-semibold ${style.color}`}>{item.difficulty}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {formatNumber(item.solved)}
                  <span className="text-sm font-normal text-zinc-500"> / {formatNumber(item.total)}</span>
                </p>
              </div>
              <span className="rounded-md border border-white/10 bg-[#111111] px-2.5 py-1 text-sm text-zinc-300">
                {percent}%
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full origin-left rounded-full ${style.bar} [animation:bar-grow_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
