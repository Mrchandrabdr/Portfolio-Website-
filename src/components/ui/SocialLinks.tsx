import { activeSocials } from '@/content';
import { BrandIcon } from './BrandIcon';
import { cn } from '@/lib/cn';

interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function SocialLinks({ className, size = 'md' }: SocialLinksProps) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  return (
    <ul className={cn('flex items-center gap-2', className)} aria-label="Social profiles">
      {activeSocials.map((social) => (
        <li key={social.platform}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
            title={social.label}
            className={cn(
              box,
              'grid place-items-center rounded-full border border-white/10 bg-white/[0.02] text-ink-300 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent',
            )}
          >
            <BrandIcon platform={social.platform} className={size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'} />
          </a>
        </li>
      ))}
    </ul>
  );
}
