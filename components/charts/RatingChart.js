"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;

  return (
    <div className="rounded-lg border border-white/10 bg-[#181818] px-3 py-2 text-sm shadow-xl">
      <p className="font-medium text-white">{point?.name || label}</p>
      <p className="mt-1 text-slate-300">Rating: {Math.round(point?.rating || 0)}</p>
      {point?.rank ? <p className="text-slate-400">Rank: {point.rank}</p> : null}
    </div>
  );
}

export default function RatingChart({ data, color = "#38bdf8" }) {
  if (!data?.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-white/10 bg-[#151515] px-3 text-center text-sm text-zinc-400 sm:h-72">
        No rating history yet.
      </div>
    );
  }

  return (
    <div className="h-64 min-w-0 rounded-lg border border-white/10 bg-[#151515] p-2 [animation:soft-scale_320ms_ease-out] sm:h-72 sm:p-3">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <LineChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            minTickGap={18}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={44}
            domain={["dataMin - 50", "dataMax + 50"]}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.16)" }} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke={color}
            strokeWidth={3}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
            dot={{ r: 4, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: color, stroke: "#ffffff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
