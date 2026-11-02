import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projectFilters, projects, socials } from '@/content';
import type { ProjectCategory } from '@/types/content';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

type Filter = 'All' | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['All', projects.length]]);
    projects.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  const visible = useMemo(() => {
    const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
    // Featured first, keep author order otherwise.
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [filter]);

  const github = socials.find((s) => s.platform === 'github' && s.url);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            index="03"
            kicker="selected work"
            title="Things I’ve built — for learners, and for fun."
            description="A mix of teaching tools, coursework and side projects. Each one taught me something I now pass on to my students."
          />
          {github && (
            <Reveal>
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex shrink-0 items-center gap-1.5 text-sm text-ink-200 hover:text-ink-50"
              >
                All repositories on GitHub
                <span className="sr-only">(opens in a new tab)</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-12">
          <div role="group" aria-label="Filter projects by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {projectFilters.map((f) => {
              const count = counts.get(f) ?? 0;
              const active = f === filter;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 ease-out-expo',
                    active
                      ? 'border-accent/60 bg-accent text-ink-950'
                      : 'border-white/[0.09] bg-white/[0.02] text-ink-300 hover:border-white/20 hover:text-ink-50',
                  )}
                >
                  {f}
                  <span className={cn('font-mono text-[11px]', active ? 'text-ink-950/60' : 'text-ink-500')}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter === 'All' ? '' : ` in ${filter}`}.
        </p>

        {visible.length > 0 ? (
          <ul key={filter} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <li key={project.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-3xl border border-dashed border-white/[0.12] p-12 text-center text-ink-400">
            No projects in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
