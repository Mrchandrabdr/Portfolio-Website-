import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface TerminalLineProps {
  phrases: string[];
}

/**
 * A one-line "shell" that types through each phrase once, then rests on the last one
 * (finite motion — no endless loop to pause, per WCAG 2.2.2).
 */
export function TerminalLine({ phrases }: TerminalLineProps) {
  const reduced = usePrefersReducedMotion();
  const last = phrases[phrases.length - 1] ?? '';
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduced ? last : '');
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced || phrases.length === 0) {
      setText(last);
      setDone(true);
      return;
    }
    if (done) return;

    const phrase = phrases[index];
    const isLast = index === phrases.length - 1;
    let delay = deleting ? 28 : 55;
    if (!deleting && text === phrase) delay = 1900;
    if (deleting && text === '') delay = 300;

    const timer = window.setTimeout(() => {
      if (!deleting && text === phrase) {
        if (isLast) setDone(true);
        else setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, reduced, done, last]);

  return (
    <p className="inline-flex max-w-full items-center gap-2 rounded-lg border border-white/[0.07] bg-ink-900/70 px-3.5 py-2 font-mono text-[13px] text-ink-300 backdrop-blur">
      <span aria-hidden="true" className="text-accent">
        ~$
      </span>
      <span className="sr-only">Currently: {phrases.join(', ')}</span>
      <span aria-hidden="true" className="truncate">
        now <span className="text-ink-100">{text}</span>
      </span>
      <span aria-hidden="true" className={`-ml-1 inline-block h-4 w-[7px] bg-accent/80 ${done ? 'opacity-60' : 'animate-blink'}`} />
    </p>
  );
}
