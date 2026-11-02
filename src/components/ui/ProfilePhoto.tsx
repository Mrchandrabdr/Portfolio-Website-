import { useState } from 'react';
import { cn } from '@/lib/cn';

interface ProfilePhotoProps {
  src: string;
  alt: string;
  initials: string;
  className?: string;
  priority?: boolean;
}

/**
 * Shows the photo at `src`. Until a real photo is added to /public/images
 * (or if it fails to load) an elegant initials monogram is rendered instead.
 */
export function ProfilePhoto({ src, alt, initials, className, priority = false }: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-ink-850', className)}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          width={840}
          height={1050}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700 ease-out-expo',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
      {!loaded && (
        <div role={failed ? 'img' : undefined} aria-label={failed ? alt : undefined} className="absolute inset-0 grid place-items-center">
          <div aria-hidden="true" className="grid-dots absolute inset-0 opacity-60" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(185,242,107,0.16),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(110,231,216,0.12),transparent_50%)]"
          />
          <span aria-hidden="true" className="relative font-display text-[clamp(4rem,12vw,7.5rem)] font-semibold tracking-tighter text-ink-50/90">
            {initials}
            <span className="text-accent">.</span>
          </span>
        </div>
      )}
    </div>
  );
}
