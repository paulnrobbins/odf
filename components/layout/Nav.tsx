'use client';

import Link from 'next/link';
import { nav } from '@/lib/content';
import { PillNav } from '@/components/ui/PillNav';

/**
 * Nav
 * ───
 * Top nav. Fixed, mix-blend so it stays legible over the 3D scene as it shifts
 * from dark walnut to amber lamp light during the scroll.
 *
 * Mobile: collapses primary links into a slim icon-button menu (Phase 5 polish
 * will animate the open/close; placeholder structure here for now).
 */
export function Nav() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        z-[var(--z-nav)]
        flex items-center justify-between
        px-gutter py-4 sm:py-5
        mix-blend-exclusion
        pointer-events-none
      "
    >
      {/* Wordmark — left */}
      <Link
        href="/"
        className="
          pointer-events-auto
          font-display text-[1.05rem] sm:text-[1.15rem] font-medium
          tracking-tight text-[var(--color-bone)]
          transition-colors duration-[var(--dur-base)]
          hover:text-[var(--color-lamplight)]
        "
        aria-label="Open Door Fellowship — Home"
      >
        Open Door Fellowship
      </Link>

      {/* Primary links — center, desktop only */}
      <nav className="hidden md:flex items-center gap-7 pointer-events-auto" aria-label="Primary">
        {nav.primary.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="
              text-[0.8125rem] tracking-tight font-medium
              text-[var(--color-bone)]/85
              transition-colors duration-[var(--dur-base)]
              hover:text-[var(--color-lamplight)]
            "
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Service-time pill — right */}
      <div className="pointer-events-auto">
        <PillNav />
      </div>
    </header>
  );
}
