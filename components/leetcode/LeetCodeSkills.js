import LeetCodeSection from "./LeetCodeSection";
import { Card } from "../ui/card";

function SkillGroup({ title, items }) {
  const top = Math.max(...(items || []).map((skill) => skill.problemsSolved), 1);

  return (
    <Card className="bg-[#151515] p-4">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items?.map((skill) => (
          <div
            key={skill.tagSlug}
            className="group rounded-lg border border-white/10 bg-[#101010] p-3 transition hover:border-[#ff6a3d]/35 hover:bg-[#181818]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-zinc-200 transition group-hover:text-white">{skill.tagName}</span>
              <span className="text-sm font-semibold text-[#ffb088]">{skill.problemsSolved}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#ff2f7d,#ff7418)] [animation:bar-grow_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
                style={{ width: `${Math.max(8, (skill.problemsSolved / top) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function LeetCodeSkills({ skills }) {
  return (
    <LeetCodeSection title="Skills" subtitle="Topic coverage grouped by fundamental, intermediate, and advanced tags.">
      <div className="grid gap-4 lg:grid-cols-3">
        <SkillGroup title="Fundamental" items={skills?.fundamental || []} />
        <SkillGroup title="Intermediate" items={skills?.intermediate || []} />
        <SkillGroup title="Advanced" items={skills?.advanced || []} />
      </div>
    </LeetCodeSection>
  );
}
