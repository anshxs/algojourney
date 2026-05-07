"use client";

import { useState } from "react";
import { ExternalLink, Loader2, Shuffle, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const DIFFICULTY_STYLES = {
  Easy: "border-[#28d17c]/30 bg-[#28d17c]/10 text-[#9ff2c4]",
  Medium: "border-[#f6c343]/30 bg-[#f6c343]/10 text-[#ffe08a]",
  Hard: "border-[#ff4d68]/30 bg-[#ff4d68]/10 text-[#ff9dad]",
};

export default function RandomQuestionCard() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomQuestion = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`https://leetcode-api-pied.vercel.app/random?difficulty=${difficulty}`);
      const data = await response.json();

      if (!response.ok || data?.detail) {
        throw new Error(data?.detail || "Unable to fetch question");
      }

      setQuestion(data);
    } catch (err) {
      setQuestion(null);
      setError(err.message || "Unable to fetch question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-3 overflow-hidden bg-[#121212]/90 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <div className="mb-3 flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff6a3d]/15 text-[#ff9a6d]">
          <Shuffle className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">Random Question</p>
          <p className="text-xs text-zinc-500">Pick a quick LeetCode drill</p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-1.5">
        {DIFFICULTIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setDifficulty(item)}
            className={`rounded-md border px-2 py-1 text-xs font-medium transition ${
              difficulty === item
                ? DIFFICULTY_STYLES[item]
                : "border-white/10 bg-[#101010] text-zinc-500 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={fetchRandomQuestion}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {isLoading ? "Finding..." : "Get random"}
      </Button>

      {error ? <p className="mt-3 text-xs text-[#ff9dad]">{error}</p> : null}

      {question ? (
        <div className="mt-3 rounded-lg border border-white/10 bg-[#0d0d0d] p-3 [animation:soft-in_220ms_ease-out]">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className={`rounded-md border px-2 py-1 text-[11px] font-medium ${DIFFICULTY_STYLES[question.difficulty] || DIFFICULTY_STYLES[difficulty]}`}>
              {question.difficulty}
            </span>
            <span className="text-xs text-zinc-500">#{question.frontend_id}</span>
          </div>
          <p className="line-clamp-3 break-words text-sm font-medium leading-5 text-white">{question.title}</p>
          <a
            href={question.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#ff6a3d]/25 bg-[#ff6a3d]/10 px-3 py-2 text-xs font-semibold text-[#ffb088] transition hover:bg-[#ff6a3d]/15"
          >
            Open problem
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      ) : null}
    </Card>
  );
}
