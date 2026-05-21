'use client';

/**
 * Leadership — Pastor Justin + Kahala Jennings
 * ────────────────────────────────────────────
 * A quiet beat between Scenes 5 (Stage Approaches) and 6 (At the Cross).
 * Pattern A Billboard: the family portrait sits as a tilted plane next to
 * the copy, with the 10% warm overlay + grain treatment that unifies all
 * photos with the palette.
 *
 * The pastor photo is portrait orientation (the family stands close together,
 * a small child reaching up) — the layout treats it as a vertical card on
 * desktop and stacks above the copy on mobile.
 */

import Image from 'next/image';
import { leadership } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Leadership() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="leadership"
      className="section section-veil"
      aria-label="Meet your pastors"
    >
      <div className="container-editorial grid gap-12 lg:gap-20 lg:grid-cols-[1fr_auto] items-center">
        {/* Copy column */}
        <div>
          <p className="eyebrow mb-6 reveal">{leadership.eyebrow}</p>
          <h2 className="font-display text-display-lg text-balance text-[var(--color-bone)] reveal">
            {leadership.headline}
          </h2>
          <p className="mt-8 text-body-lg text-[var(--color-bone-soft)] max-w-readable reveal">
            {leadership.body}
          </p>
        </div>

        {/* Photo column — Pattern A Billboard treatment */}
        <div className="relative mx-auto w-full max-w-[420px] reveal">
          {/* The tilted plane container — pseudo-3D via CSS */}
          <div
            className="relative aspect-[3/5] overflow-hidden rounded-[2px]"
            style={{
              transform: 'perspective(1400px) rotateY(-4deg) rotateX(1.5deg)',
              boxShadow: '0 40px 80px -30px rgba(0, 0, 0, 0.7)',
            }}
          >
            <Image
              src={leadership.photo}
              alt={leadership.photoAlt}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
              style={{
                filter: 'brightness(0.92) saturate(0.88) contrast(1.02)',
              }}
            />
            {/* Warm amber overlay — 10% per the brief */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(180deg, rgba(217,163,104,0.12) 0%, rgba(217,163,104,0.06) 60%, rgba(217,163,104,0.16) 100%)',
              }}
            />
            {/* Bottom vignette — pulls type readable if any overlays land near edge */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(26,20,16,0.55) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
