"use client";

import { Flame } from "lucide-react";

const SIZE = 240;
const STROKE = 8;
const RADIUS = 100;
const FULL = 2 * Math.PI * RADIUS;
const TOTAL_ARC = FULL * 0.75;
const GAP = 16;
const EASY_ARC = (TOTAL_ARC - GAP * 2) * 0.33;
const MEDIUM_ARC = (TOTAL_ARC - GAP * 2) * 0.34;
const HARD_ARC = (TOTAL_ARC - GAP * 2) * 0.33;

function Ring({ rotate, solved, total, arc, color, lightColor, startOffset }) {
  const progress = total === 0 ? 0 : solved / total;
  const solvedLen = arc * progress;
  const unsolvedLen = arc - solvedLen;

  return (
    <>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={lightColor}
        strokeWidth={STROKE}
        strokeDasharray={`${unsolvedLen} ${FULL}`}
        strokeDashoffset={-startOffset - solvedLen}
        transform={`rotate(${rotate} ${SIZE / 2} ${SIZE / 2})`}
        strokeLinecap="round"
        className="opacity-80"
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeDasharray={`${solvedLen} ${FULL}`}
        strokeDashoffset={-startOffset}
        transform={`rotate(${rotate} ${SIZE / 2} ${SIZE / 2})`}
        strokeLinecap="round"
        className="[animation:ring-reveal_850ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
      />
    </>
  );
}

export default function ProgressRings({ easy, medium, hard, totalSolved, totalQuestions }) {
  const easyStart = 0;
  const mediumStart = EASY_ARC + GAP;
  const hardStart = EASY_ARC + MEDIUM_ARC + GAP * 2;
  const totalPercent = totalQuestions ? Math.round((totalSolved / totalQuestions) * 100) : 0;

  return (
    <div className="group relative flex items-center justify-center overflow-hidden rounded-xl p-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,61,0.16),transparent_56%)] opacity-80 transition group-hover:opacity-100" />
      <svg width={SIZE} height={SIZE} className="relative drop-shadow-[0_0_28px_rgba(255,106,61,0.2)]">
        <defs>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <Ring
          rotate={135}
          solved={easy.solved}
          total={easy.total}
          arc={EASY_ARC}
          color="#28d17c"
          lightColor="rgba(40,209,124,0.18)"
          startOffset={easyStart}
        />
        <Ring
          rotate={135}
          solved={medium.solved}
          total={medium.total}
          arc={MEDIUM_ARC}
          color="#f6c343"
          lightColor="rgba(246,195,67,0.18)"
          startOffset={mediumStart}
        />
        <Ring
          rotate={135}
          solved={hard.solved}
          total={hard.total}
          arc={HARD_ARC}
          color="#ff4d68"
          lightColor="rgba(255,77,104,0.18)"
          startOffset={hardStart}
        />
      </svg>

      <div className="absolute text-center">
        <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6a3d]/15 text-[#ff9a6d]">
          <Flame className="h-4 w-4" />
        </div>
        <p className="text-5xl font-semibold tracking-tight text-white">{totalSolved}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">of {totalQuestions}</p>
        <p className="mt-2 text-sm font-medium text-[#ff9a6d]">{totalPercent}% complete</p>
      </div>
    </div>
  );
}
