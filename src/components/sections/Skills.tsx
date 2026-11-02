import { Code, Globe, GraduationCap, Sparkles, Wrench, type LucideIcon } from 'lucide-react';
import { currentlyLearning, levelLabels, skillCategories } from '@/content';
import type { Skill, SkillCategoryIcon } from '@/types/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

const icons: Record<SkillCategoryIcon, LucideIcon> = {
  code: Code,
  globe: Globe,
  wrench: Wrench,
  graduation: GraduationCap,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="02"
          kicker="skills & technologies"
          title="The toolkit I teach with and build with."
          description="Grounded in fundamentals, practised daily. Indicators reflect how comfortable I am working — and teaching — with each one."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:gap-5">
          {skillCategories.map((category, i) => {
            const Icon = icons[category.icon];
            return (
              <Reveal key={category.title} delay={(i % 2) * 90}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 transition-colors duration-500 hover:border-white/[0.14] sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <header className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{category.title}</h3>
                      <p className="mt-1.5 text-sm text-ink-400">{category.description}</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-ink-900 text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </header>

                  <ul className="mt-8 space-y-4">
                    {category.skills.map((skill) => (
                      <SkillRow key={skill.name} skill={skill} />
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {currentlyLearning.length > 0 && (
          <Reveal className="mt-10 flex flex-wrap items-center gap-3">
            <span className="kicker inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Currently learning
            </span>
            <ul className="flex flex-wrap gap-2">
              {currentlyLearning.map((item) => (
                <li key={item} className="rounded-full border border-dashed border-white/[0.14] px-3 py-1 font-mono text-xs text-ink-300">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  const label = levelLabels[skill.level];
  return (
    <li className="group/skill flex items-center justify-between gap-4">
      <span className="min-w-0 text-[15px] text-ink-100">{skill.name}</span>
      <span className="flex shrink-0 items-center gap-3">
        {/* Visible label only where there's room; screen readers always get the sr-only copy. */}
        <span
          aria-hidden="true"
          className="hidden w-20 text-right font-mono text-[11px] text-ink-500 transition-colors group-hover/skill:text-ink-300 sm:inline md:hidden lg:inline"
        >
          {label}
        </span>
        <span className="sr-only">{label}</span>
        <span className="flex gap-1" role="img" aria-label={`${skill.level} out of 5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={cn(
                'h-1.5 w-5 rounded-full transition-colors duration-500',
                n <= skill.level ? 'bg-accent/80 group-hover/skill:bg-accent' : 'bg-white/[0.08]',
              )}
            />
          ))}
        </span>
      </span>
    </li>
  );
}
