import { Award, ExternalLink, Trophy } from 'lucide-react';
import { achievements, certifications, education } from '@/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="container">
        <SectionHeading
          id="education-title"
          index="05"
          kicker="education & certifications"
          title="Still a student — on purpose."
          description="Formal study keeps my fundamentals sharp; teaching keeps them honest."
        />

        <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Education timeline */}
          <div className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-white/[0.08]" />
            <ol>
            {education.map((item, i) => {
              const current = item.status === 'In progress';
              return (
                <Reveal as="li" key={item.degree} delay={i * 90} className="relative pb-14 pl-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border',
                      current ? 'border-accent bg-accent/15' : 'border-ink-500 bg-ink-950',
                    )}
                  >
                    {current && <span className="h-[5px] w-[5px] rounded-full bg-accent" />}
                  </span>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-xs text-ink-400">{item.period}</span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                        current ? 'bg-accent/15 text-accent' : 'bg-white/[0.06] text-ink-300',
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.degree}</h3>
                  <p className="mt-1.5 text-ink-200">
                    {item.institution}
                    {item.affiliation && <span className="text-ink-400"> · {item.affiliation}</span>}
                  </p>
                  {item.description && <p className="mt-4 max-w-xl leading-relaxed text-ink-400">{item.description}</p>}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-ink-300">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              );
            })}
            </ol>
          </div>

          {/* Certifications & achievements */}
          <div className="space-y-12 lg:col-span-5">
            {certifications.length > 0 && (
              <Reveal>
                <h3 className="kicker flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" aria-hidden="true" /> Certifications
                </h3>
                <ul className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  {certifications.map((c, i) => (
                    <li key={`${c.title}-${i}`} className="flex items-start justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium text-ink-50">
                          {c.url ? (
                            <a href={c.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1.5">
                              {c.title}
                              <ExternalLink className="h-3.5 w-3.5 text-ink-400" aria-hidden="true" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          ) : (
                            c.title
                          )}
                        </p>
                        <p className="mt-1 text-sm text-ink-400">{c.issuer}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-ink-500">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {achievements.length > 0 && (
              <Reveal delay={80}>
                <h3 className="kicker flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" aria-hidden="true" /> Technical achievements
                </h3>
                <ul className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  {achievements.map((a, i) => (
                    <li key={`${a.title}-${i}`} className="flex items-start justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium text-ink-50">{a.title}</p>
                        <p className="mt-1 text-sm text-ink-400">{a.description}</p>
                      </div>
                      {a.year && <span className="shrink-0 font-mono text-xs text-ink-500">{a.year}</span>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
