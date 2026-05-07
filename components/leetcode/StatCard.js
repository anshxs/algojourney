import { Card } from "../ui/card";

export default function StatCard({ label, value, hint, icon: Icon, accent = "text-[#ff9a6d]" }) {
  return (
    <Card className="group bg-[#151515] p-3.5 transition hover:-translate-y-0.5 hover:border-[#ff6a3d]/35 hover:bg-[#1d1d1d]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-1.5 break-words text-2xl font-semibold text-white">{value}</p>
        </div>
        {Icon ? (
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#101010] ${accent} transition group-hover:scale-105`}>
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
      </div>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </Card>
  );
}
