import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';

/**
 * Small floating button that appears after scrolling past the first screen.
 * Hides again once the footer (which has its own back-to-top link) is on screen.
 */
export function BackToTop() {
  const scrolled = useScrolled(900);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !footerVisible;

  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-ink-200 shadow-glass backdrop-blur-xl transition-all duration-500 ease-out-expo hover:border-accent/60 hover:text-accent sm:bottom-8 sm:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
