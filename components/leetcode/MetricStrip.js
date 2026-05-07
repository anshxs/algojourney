import { Card } from "../ui/card";

export default function MetricStrip({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.label} className="group bg-[#171717] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#ff6a3d]/35 hover:bg-[#202020] hover:shadow-[0_16px_50px_rgba(255,106,61,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-zinc-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
              {Icon ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#111111] text-zinc-400 transition group-hover:text-[#ff9a6d]">
                  <Icon className="h-5 w-5" />
                </div>
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
