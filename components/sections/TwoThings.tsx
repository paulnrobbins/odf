'use client';

/**
 * TwoThings — Scene 3 (Two Things We Do)
 * ──────────────────────────────────────
 * The two named focal areas, each as a full Pattern A Billboard: photo tilted
 * into pseudo-3D space next to the copy, with the warm overlay treatment.
 * Photos alternate sides (left/right) row by row to create rhythm as the user
 * scrolls past.
 *
 * Scroll-triggered reveals fade each block up as it enters view.
 */

import Image from 'next/image';
import { twoThings } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function TwoThings() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.07 });

  return (
    <section
      ref={ref}
      id="two-things"
      className="section section-veil"
      aria-label="Two things we do"
    >
      <div className="container-editorial">
        <p className="eyebrow mb-6 reveal">{twoThings.eyebrow}</p>
        <h2 className="font-display text-display-lg text-balance text-[var(--color-bone)] reveal">
          {twoThings.headline}
        </h2>

        <div className="mt-20 space-y-28 md:space-y-36">
          {twoThings.items.map((item, idx) => {
            const photoOnRight = idx % 2 === 0;
            return (
              <article
                key={item.id}
                className={
                  'grid gap-10 md:gap-16 items-center md:grid-cols-2'
                }
              >
                {/* Copy block */}
                <div className={photoOnRight ? 'md:order-1' : 'md:order-2'}>
                  <p className="font-display text-display-sm text-[var(--color-lamplight)]/65 reveal">
                    {item.number}
                  </p>
                  <h3 className="font-display text-display-md text-[var(--color-bone)] mt-2 text-balance reveal">
                    {item.title}
                  </h3>
                  <p className="mt-6 text-body-lg text-[var(--color-bone-soft)] max-w-readable text-pretty reveal">
                    {item.body}
                  </p>
                </div>

                {/* Photo Billboard */}
                <div
                  className={
                    (photoOnRight ? 'md:order-2' : 'md:order-1') +
                    ' reveal'
                  }
                >
                  <div
                    className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2px]"
                    style={{
                      transform: photoOnRight
                        ? 'perspective(1600px) rotateY(-5deg) rotateX(1deg)'
                        : 'perspective(1600px) rotateY(5deg) rotateX(1deg)',
                      boxShadow: '0 40px 80px -30px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    <Image
                      src={item.photo}
                      alt={item.photoAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      style={{
                        filter: 'brightness(0.85) saturate(0.88) contrast(1.05)',
                      }}
                    />
                    {/* Warm amber overlay */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none mix-blend-overlay"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(217,163,104,0.14) 0%, rgba(217,163,104,0.06) 100%)',
                      }}
                    />
                    {/* Edge darkening to ground the plane in the walnut palette */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, transparent 60%, rgba(26,20,16,0.55) 100%)',
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
