import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Editor-style section heading: a line number, a `// comment` kicker,
 * then a large display title.
 */
export function SectionHeading({ index, kicker, title, description, id, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-3xl', className)}>
      <p className="kicker flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-ink-600" />
        <span>
          <span aria-hidden="true" className="text-ink-500">// </span>
          {kicker}
        </span>
      </p>
      <h2 id={id} className="mt-5 text-display-lg font-semibold">
        {title}
      </h2>
      {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">{description}</p>}
    </Reveal>
  );
}
