'use client';

/**
 * Leadership — Pastor Justin + Kahala Jennings
 * ────────────────────────────────────────────
 * Profile-card layout: portrait sits beside (or above, on mobile) the name
 * and bio. Reads as "meet the pastors" — not as a separate art piece.
 * The portrait is treated cleanly (no tilt, no overlay) so faces stay sharp.
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
      <div className="container-editorial">
        <p className="eyebrow mb-10 reveal">{leadership.eyebrow}</p>

        {/* Profile-card grid: portrait left, name + bio right (stacks on mobile) */}
        <div className="grid gap-10 md:gap-14 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] items-start">

          {/* Portrait */}
          <div className="reveal mx-auto md:mx-0 w-full max-w-[340px]">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-[3px]"
              style={{
                boxShadow:
                  '0 30px 60px -25px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,163,104,0.15)',
              }}
            >
              <Image
                src={leadership.photo}
                alt={leadership.photoAlt}
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 90vw"
                className="object-cover object-center"
                style={{ filter: 'brightness(0.96) saturate(0.92)' }}
                priority
              />
              {/* Whisper-soft warm tint to unify with palette */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(217,163,104,0.06) 0%, rgba(217,163,104,0.10) 100%)',
                }}
              />
            </div>
          </div>

          {/* Name + bio */}
          <div className="md:pt-2">
            <h2 className="font-display text-display-md text-balance text-[var(--color-bone)] reveal">
              {leadership.headline}
            </h2>
            <p className="mt-2 text-body-sm text-[var(--color-lamplight)]/85 reveal">
              Lead Pastors · Open Door Fellowship
            </p>
            <p className="mt-6 text-body-lg text-[var(--color-bone-soft)] max-w-readable text-pretty reveal">
              {leadership.body}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
