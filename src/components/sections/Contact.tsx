import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { activeSocials, profile } from '@/content';
import { ContactForm } from '@/components/contact/ContactForm';
import { BrandIcon } from '@/components/ui/BrandIcon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            index="06"
            kicker="contact"
            title={
              <>
                Let’s learn or build something <span className="text-accent">together.</span>
              </>
            }
            description="Whether you’re a student looking for guidance, an institution looking for an instructor, or someone with a project idea — my inbox is open."
          />

          <Reveal className="mt-12">
            <p className="kicker">Email</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="link-underline break-all font-display text-xl font-medium text-ink-50 transition-colors hover:text-accent sm:text-2xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] px-3 py-1.5 text-xs text-ink-300 transition-colors hover:border-white/20 hover:text-ink-50"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>
          </Reveal>

          <Reveal className="mt-10" delay={80}>
            <p className="kicker">Elsewhere</p>
            <ul className="mt-3 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {activeSocials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 text-ink-200 transition-colors hover:text-ink-50"
                  >
                    <span className="flex items-center gap-3">
                      <BrandIcon platform={s.platform} className="h-[18px] w-[18px] text-ink-400 transition-colors group-hover:text-accent" />
                      <span className="font-medium">{s.label}</span>
                      {s.handle && <span className="hidden font-mono text-xs text-ink-500 sm:inline">{s.handle}</span>}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className="group flex items-center justify-between gap-4 py-4 text-ink-200 transition-colors hover:text-ink-50">
                  <span className="flex items-center gap-3">
                    <Mail className="h-[18px] w-[18px] text-ink-400 transition-colors group-hover:text-accent" aria-hidden="true" />
                    <span className="font-medium">Email</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7 lg:pt-4" delay={120}>
          <h3 className="sr-only">Send a message</h3>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
