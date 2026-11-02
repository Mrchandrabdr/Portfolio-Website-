import { about, profile } from '@/content';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container">
        <SectionHeading id="about-title" index="01" kicker="about me" title={<>A teacher who codes, and a coder who teaches.</>} />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Photo + "now" panel */}
          <Reveal className="lg:col-span-5">
            <div className="mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none">
              <ProfilePhoto
                src={profile.photo.about}
                alt={profile.photo.aboutAlt}
                initials={profile.initials}
                className="aspect-[4/5] w-full rounded-3xl border border-white/[0.07]"
              />
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
                {about.now.map((item) => (
                  <div key={item.label} className="bg-ink-900 p-4">
                    <dt className="kicker text-[10px]">{item.label}</dt>
                    <dd className="mt-1.5 text-sm leading-snug text-ink-100">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Editorial copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink-50 sm:text-3xl">
                <span aria-hidden="true" className="mr-1 text-accent">“</span>
                {about.lead}
              </p>
            </Reveal>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-ink-300 sm:text-[17px]">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} as="p" delay={i * 60}>
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <h3 className="kicker">What drives me</h3>
              <ol className="mt-5 border-t border-white/[0.07]">
                {about.focus.map((item, i) => (
                  <li
                    key={item.title}
                    className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-white/[0.07] py-5 transition-colors duration-300 hover:bg-white/[0.015] sm:grid-cols-[3rem_minmax(0,16rem)_1fr]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                    />
                    <span className="pl-3 font-mono text-xs text-ink-500 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-base font-medium text-ink-50">{item.title}</span>
                    <span className="col-start-2 mt-1 text-sm leading-relaxed text-ink-400 sm:col-start-3 sm:mt-0">{item.description}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
