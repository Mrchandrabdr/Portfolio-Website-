import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost';

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out-expo disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink-950 hover:shadow-glow active:scale-[0.98] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full',
  ghost:
    'border border-white/[0.12] bg-white/[0.03] text-ink-50 backdrop-blur hover:border-white/25 hover:bg-white/[0.07] active:scale-[0.98]',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = 'primary',
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...props}>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
