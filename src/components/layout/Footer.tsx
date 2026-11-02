import { ArrowUp } from 'lucide-react';
import { navItems, profile } from '@/content';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] pt-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <a href="#top" className="inline-block font-display text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
              {profile.name}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-4 max-w-sm leading-relaxed text-ink-400">{profile.footerTagline}</p>
            <SocialLinks className="mt-8" size="sm" />
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="kicker">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="link-underline text-sm text-ink-300 transition-colors hover:text-ink-50">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="kicker">Say hello</p>
            <a href={`mailto:${profile.email}`} className="link-underline mt-5 inline-block break-all text-sm text-ink-200 hover:text-ink-50">
              {profile.email}
            </a>
          </div>
        </div>

        {/* Oversized wordmark — decorative */}
        <p
          aria-hidden="true"
          className="mask-fade-b pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display text-[17vw] font-semibold leading-none tracking-tighter text-white/[0.035] lg:text-[13.5rem]"
        >
          katuwal
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-8 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.09] px-3.5 py-2 text-ink-300 transition-colors hover:border-accent/50 hover:text-accent"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
