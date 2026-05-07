import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-[#242424] text-slate-100",
        success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
        warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
        danger: "border-rose-400/20 bg-rose-400/10 text-rose-200",
        info: "border-sky-400/20 bg-sky-400/10 text-sky-200",
        muted: "border-white/10 bg-[#202020] text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
