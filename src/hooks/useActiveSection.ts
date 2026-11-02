import { useEffect, useState } from 'react';

/** Returns the id of the section currently crossing the middle band of the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));

    // Clear the highlight when scrolled back into the hero.
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}
