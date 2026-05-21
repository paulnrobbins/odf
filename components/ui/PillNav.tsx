'use client';

import { service, routes } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * PillNav
 * ───────
 * The persistent service-time pill, top-right. Per the Phase 1 Better-Solution
 * Audit, ODF's prior site only mentions 10:30 a.m. once mid-page; making it
 * persistent reduces friction for first-time visitors.
 *
 * Tappable — scrolls to the on-page Service Info section.
 */
export function PillNav({ className }: { className?: string }) {
  return (
    <a
      href={routes.visit}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full',
        'border border-[var(--color-bone-soft)]/20 bg-[var(--color-walnut-mid)]/70 backdrop-blur-md',
        'px-4 py-2 text-[0.8125rem] font-medium tracking-tight',
        'text-[var(--color-bone)] transition-all duration-[var(--dur-base)] ease-[var(--ease-cinema)]',
        'hover:border-[var(--color-lamplight)]/50 hover:text-[var(--color-lamplight-warm)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-lamplight)]',
        className,
      )}
      aria-label={`${service.shortLabel} — Plan a Visit`}
    >
      <span
        aria-hidden
        className="block h-1.5 w-1.5 rounded-full bg-[var(--color-lamplight)] animate-flicker"
      />
      <span className="opacity-90">{service.shortLabel}</span>
      <span className="text-[var(--color-bone-soft)]/40">·</span>
      <span className="opacity-90 group-hover:opacity-100">Plan a Visit</span>
      <svg
        aria-hidden
        viewBox="0 0 10 10"
        className="h-2.5 w-2.5 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
      >
        <path
          d="M1 5h7M5 1l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
