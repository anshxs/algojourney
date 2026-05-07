export function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatRating(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  return Number(value).toFixed(0);
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  return `${Number(value).toFixed(2)}%`;
}

export function formatDateFromSeconds(value) {
  if (!value) {
    return "—";
  }

  return new Date(Number(value) * 1000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDate(value) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getDifficultyTone(difficulty) {
  const tones = {
    Easy: "text-emerald-300",
    Medium: "text-amber-300",
    Hard: "text-rose-300",
    All: "text-slate-200",
  };

  return tones[difficulty] || "text-slate-200";
}

