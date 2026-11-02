import { ArrowUpRight, Star } from 'lucide-react';
import type { Project } from '@/types/content';
import { BrandIcon } from '@/components/ui/BrandIcon';
import { ProjectThumb } from './ProjectThumb';

export function ProjectCard({ project }: { project: Project }) {
  const isExternal = (url: string) => /^https?:\/\//.test(url);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/60 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
        <ProjectThumb project={project} />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-200 backdrop-blur">
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-950">
              <Star className="h-3 w-3" aria-hidden="true" /> Featured
            </span>
          )}
          {project.placeholder && (
            <span className="rounded-full border border-dashed border-white/25 bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300 backdrop-blur">
              Sample
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          {project.year && <span className="font-mono text-xs text-ink-500">{project.year}</span>}
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-ink-300">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-5 pt-6 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 text-ink-200 transition-colors hover:text-ink-50"
            >
              <BrandIcon platform="github" className="h-4 w-4" />
              Source<span className="sr-only"> code for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              {...(isExternal(project.liveUrl) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="link-underline inline-flex items-center gap-1.5 text-accent"
            >
              Live demo<span className="sr-only"> of {project.title}{isExternal(project.liveUrl) ? ' (opens in a new tab)' : ''}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          )}
          {!project.liveUrl && (
            <span className="font-mono text-xs text-ink-500">{project.repoUrl ? 'Demo coming soon' : 'Links coming soon'}</span>
          )}
        </div>
      </div>
    </article>
  );
}
