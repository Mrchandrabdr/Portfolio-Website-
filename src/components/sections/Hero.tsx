import type { CSSProperties } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { profile } from '@/content';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { TerminalLine } from '@/components/hero/TerminalLine';
import { ButtonLink } from '@/components/ui/Button';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { SocialLinks } from '@/components/ui/SocialLinks';

const stagger = (i: number): CSSProperties => ({ animationDelay: `${120 + i * 90}ms` });

export function Hero() {
  const { headline, availability } = profile;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      <HeroBackground />

      <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {availability.available && (
            <p className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs font-medium text-ink-200 backdrop-blur" style={stagger(0)}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {availability.label}
            </p>
          )}

          <h1 id="hero-title" className="mt-6 lg:mt-7">
            <span className="block animate-fade-up font-sans text-lg font-normal text-ink-300 sm:text-xl" style={stagger(1)}>
              {profile.greeting}
            </span>
            <span className="mt-4 block animate-fade-up text-display-xl font-semibold" style={stagger(2)}>
              <span className="text-gradient">{headline.before}</span>{' '}
              <span className="font-normal text-accent">{headline.accent}</span>{' '}
              <span className="text-gradient">{headline.after}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-ink-300 sm:text-lg" style={stagger(3)}>
            {profile.intro}
          </p>

          <div className="mt-6 animate-fade-up" style={stagger(4)}>
            <TerminalLine phrases={profile.terminalPhrases} />
          </div>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3" style={stagger(5)}>
            <ButtonLink href="#projects">
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get In Touch
            </ButtonLink>
          </div>

          <div className="mt-8 flex animate-fade-up items-center gap-4" style={stagger(6)}>
            <span className="kicker hidden sm:inline">Find me on</span>
            <span aria-hidden="true" className="hidden h-px w-8 bg-ink-600 sm:inline-block" />
            <SocialLinks size="sm" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-fade-up sm:max-w-md lg:col-span-5 lg:ml-auto lg:max-w-[440px]" style={stagger(3)}>
          <PortraitFrame />
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 transition-colors hover:text-ink-100 md:flex [@media(max-height:880px)]:hidden"
      >
        <span aria-hidden="true" className="kicker text-[10px]">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-current pt-1.5" aria-hidden="true">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-current" />
        </span>
        <span className="sr-only">Scroll to About section</span>
      </a>
    </section>
  );
}

function PortraitFrame() {
  const [primary, secondary] = profile.heroBadges;
  return (
    <figure className="relative">
      {/* soft glow behind the frame */}
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_200deg,rgba(185,242,107,0.18),transparent_30%,rgba(110,231,216,0.12),transparent_70%)] blur-2xl" />

      <div className="glass overflow-hidden rounded-[1.75rem] p-2">
        <div className="flex items-center gap-2 px-3 pb-2.5 pt-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-3 truncate font-mono text-[11px] text-ink-400">~/chandra/portrait.jpg</span>
        </div>
        <ProfilePhoto
          src={profile.photo.hero}
          alt={profile.photo.alt}
          initials={profile.initials}
          priority
          className="aspect-[4/5] w-full rounded-[1.3rem]"
        />
      </div>

      <figcaption className="sr-only">{profile.name}</figcaption>

      {primary && (
        <div aria-hidden="true" className="glass absolute -left-4 bottom-10 rounded-2xl px-4 py-3 sm:-left-8">
          <p className="kicker text-[10px]">{primary.label}</p>
          <p className="mt-1 font-display text-sm font-medium text-ink-50">{primary.value}</p>
        </div>
      )}
      {secondary && (
        <div aria-hidden="true" className="glass absolute -right-3 top-16 rounded-2xl px-4 py-3 sm:-right-6">
          <p className="kicker text-[10px]">{secondary.label}</p>
          <p className="mt-1 font-mono text-sm text-accent">{secondary.value}</p>
        </div>
      )}
    </figure>
  );
}
