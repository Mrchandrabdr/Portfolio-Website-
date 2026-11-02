import { useState } from 'react';
import { BookOpen, Check, Copy, Dumbbell, Eye, EyeOff, Users, type LucideIcon } from 'lucide-react';
import { teaching } from '@/content';
import type { TeachingArea } from '@/types/content';
import { CodePreview } from '@/components/projects/CodePreview';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const areaIcons: Record<TeachingArea['icon'], LucideIcon> = {
  notes: BookOpen,
  mentoring: Users,
  exercises: Dumbbell,
};

export function Teaching() {
  return (
    <section id="teaching" aria-labelledby="teaching-title" className="section">
      {/* subtle band to set the section apart */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.018] to-transparent" />

      <div className="container">
        <SectionHeading
          id="teaching-title"
          index="04"
          kicker="teaching & experience"
          title={
            <>
              Making the invisible <span className="text-accent">visible.</span>
            </>
          }
          description={teaching.intro}
        />

        <Reveal className="mt-12">
          <h3 className="sr-only">Subjects taught</h3>
          <ul className="flex flex-wrap gap-2">
            {teaching.subjects.map((s) => (
              <li key={s} className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-sm text-ink-200">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Approach timeline */}
          <div className="lg:col-span-6">
            <Reveal>
              <h3 className="kicker">My teaching approach</h3>
            </Reveal>
            <div className="relative mt-8">
              <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent" />
              <ol>
              {teaching.approach.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 80} className="relative grid grid-cols-[2rem_1fr] gap-5 pb-10 last:pb-0">
                  <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full border border-white/[0.12] bg-ink-950 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h4 className="text-lg font-semibold tracking-tight">{step.title}</h4>
                    <p className="mt-2 leading-relaxed text-ink-400">{step.description}</p>
                  </div>
                </Reveal>
              ))}
              </ol>
            </div>
          </div>

          {/* Exercise of the week */}
          <div className="lg:col-span-6">
            <Reveal className="lg:sticky lg:top-28">
              <ExerciseCard />
            </Reveal>
          </div>
        </div>

        {/* Areas: notes, mentoring, exercises */}
        <div className="mt-24 grid border-t border-white/[0.07] lg:grid-cols-3">
          {teaching.areas.map((area, i) => {
            const Icon = areaIcons[area.icon];
            return (
              <Reveal
                key={area.title}
                delay={i * 80}
                className="border-b border-white/[0.07] py-10 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{area.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {area.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-ink-200">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExerciseCard() {
  const { exercise } = teaching;
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exercise.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5">
        <div>
          <p className="kicker text-[10px]">{exercise.title}</p>
          <p className="mt-1 text-sm text-ink-100">{exercise.prompt}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] text-ink-300 transition-colors hover:border-white/20 hover:text-ink-50"
          aria-label={copied ? 'Code copied' : 'Copy code'}
        >
          {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <div className="overflow-x-auto bg-ink-950/60 px-5 py-5">
        <CodePreview code={exercise.code} />
      </div>
      <div className="border-t border-white/[0.06] px-5 py-4">
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          aria-expanded={revealed}
          aria-controls="exercise-answer"
          className="inline-flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-accent"
        >
          {revealed ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {revealed ? 'Hide answer' : 'Reveal answer'}
        </button>
        <p id="exercise-answer" hidden={!revealed} className="mt-3 text-sm leading-relaxed text-ink-300">
          {exercise.answer}
        </p>
      </div>
    </div>
  );
}
