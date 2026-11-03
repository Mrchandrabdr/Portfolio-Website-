import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, profile } from '@/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { LogoMark } from '@/components/ui/LogoMark';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { cn } from '@/lib/cn';

const sectionIds = navItems.map((n) => n.id);

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll, close on Escape, and keep focus inside the mobile menu while it's open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Hide the page behind the menu from assistive tech and pointer/keyboard.
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    background.forEach((el) => el.setAttribute('inert', ''));
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = [toggleRef.current, ...Array.from(panelRef.current.querySelectorAll<HTMLElement>('a, button'))].filter(
          (el): el is HTMLElement => !!el,
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth < 768) return;
      setOpen(false);
      document.querySelector<HTMLElement>('header a')?.focus();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      background.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo',
        scrolled || open ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Primary" className="container flex h-[var(--nav-h)] items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark className="h-10 w-10 transition-transform duration-300 ease-out-expo group-hover:-rotate-3 group-hover:scale-105" />
          <span className="sr-only">{profile.name}, back to top</span>
          <span aria-hidden="true" className="hidden font-mono text-xs text-ink-400 sm:inline">
            chandra<span className="text-accent">.</span>katuwal
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn('link-underline text-sm transition-colors duration-300', active === item.id ? 'text-ink-50' : 'text-ink-300 hover:text-ink-50')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-white/[0.12] px-4 py-2 text-sm text-ink-100 transition-all duration-300 hover:border-accent/60 hover:text-accent md:inline-flex"
        >
          Let’s talk
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-ink-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100svh-var(--nav-h))] overflow-y-auto border-t border-white/[0.06] bg-ink-950 md:hidden"
      >
        <nav aria-label="Mobile" className="container flex h-full flex-col justify-between py-8">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={item.id} className="animate-fade-up" style={{ animationDelay: `${i * 45}ms` }}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className="flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-3xl font-medium tracking-tight text-ink-100 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-xs text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-5">
            <a href={`mailto:${profile.email}`} className="block break-all text-ink-300 hover:text-ink-50">
              {profile.email}
            </a>
            <SocialLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}
