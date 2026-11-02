import type { Project, ProjectCategory } from '@/types/content';
import { CodePreview } from './CodePreview';

const tints: Record<ProjectCategory, string> = {
  'Web Development': 'from-teal-400/25 via-teal-400/5',
  Python: 'from-yellow-300/20 via-yellow-300/5',
  'C++': 'from-sky-400/25 via-sky-400/5',
  Java: 'from-orange-400/20 via-orange-400/5',
  Other: 'from-lime-300/20 via-lime-300/5',
};

/** Real screenshot when `project.image` is set, otherwise a generated code-window preview. */
export function ProjectThumb({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        decoding="async"
        width={800}
        height={500}
        className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div aria-hidden="true" className={`relative h-full w-full bg-gradient-to-br ${tints[project.category]} to-transparent`}>
      <div className="grid-dots absolute inset-0 opacity-50" />
      <div className="absolute inset-x-5 bottom-0 top-14 overflow-hidden rounded-t-xl border border-b-0 border-white/[0.09] bg-ink-900/90 shadow-2xl shadow-black/50 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 sm:inset-x-7">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink-600" />
          <span className="h-2 w-2 rounded-full bg-ink-600" />
          <span className="h-2 w-2 rounded-full bg-ink-600" />
          <span className="ml-2 rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-ink-300">
            {project.snippet?.filename ?? `${project.id}.txt`}
          </span>
        </div>
        <div className="mask-fade-b px-3 py-3 [&_.code-block]:text-[11.5px] [&_.code-block]:leading-5">
          <CodePreview code={project.snippet?.code ?? `// ${project.title}`} />
        </div>
      </div>
    </div>
  );
}
