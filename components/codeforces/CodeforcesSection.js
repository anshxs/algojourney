import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CodeforcesSection({ title, subtitle, children }) {
  return (
    <Card as="section" className="overflow-hidden bg-[#171717]/95 shadow-[0_22px_80px_rgba(0,0,0,0.32)]">
      <CardHeader className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(255,47,125,0.06),rgba(107,124,255,0.05),transparent)] p-3 sm:p-4">
        <CardTitle className="flex min-w-0 items-center gap-2 text-base">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff2f7d] shadow-[0_0_18px_rgba(255,47,125,0.7)]" />
          {title}
        </CardTitle>
        {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent className="p-3 sm:p-4">{children}</CardContent>
    </Card>
  );
}
