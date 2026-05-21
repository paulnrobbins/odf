'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  asChild?: boolean;
}

const base =
  'relative inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight ' +
  'transition-[color,background-color,border-color,opacity,transform] duration-[var(--dur-base)] ' +
  'ease-[var(--ease-cinema)] focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[var(--color-lamplight)] focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[var(--color-walnut)] will-change-transform';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-lamplight)] text-[var(--color-walnut-deep)] ' +
    'hover:bg-[var(--color-lamplight-warm)] hover:-translate-y-px ' +
    'shadow-[0_0_0_0_rgba(217,163,104,0)] hover:shadow-[0_8px_32px_-12px_rgba(110,74,35,0.45)]',
  secondary:
    'border border-[var(--color-walnut)]/30 text-[var(--color-walnut)] ' +
    'hover:border-[var(--color-lamplight-deep)]/70 hover:text-[var(--color-lamplight-deep)] ' +
    'hover:-translate-y-px',
  ghost:
    'text-[var(--color-walnut-mid)] hover:text-[var(--color-lamplight-deep)] ' +
    'underline-offset-4 hover:underline',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[0.8125rem] rounded-full',
  md: 'h-11 px-6 text-[0.9375rem] rounded-full',
  lg: 'h-14 px-8 text-base rounded-full',
};

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', external, href, className, children, ...rest },
    ref,
  ) => {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a
        ref={ref}
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...externalProps}
        {...rest}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  },
);

Button.displayName = 'Button';
