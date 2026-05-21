'use client';

/**
 * Hero — Phase 3 (Scenes 1 + 2)
 * ─────────────────────────────
 * The hero now sits transparently over the fixed 3D scene + photo backdrop
 * mounted at the page root. Adds GSAP-driven entrance choreography on mount:
 * eyebrow → headline → subhead → scroll cue, staggered, restrained.
 *
 * Respects prefers-reduced-motion: when set, content appears immediately at
 * its final state with no animation.
 */

import { useEffect, useRef } from 'react';
import { hero } from '@/lib/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, registerGsap } from '@/lib/gsap';

export function Hero() {
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef  = useRef<HTMLParagraphElement>(null);
  const cueRef      = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    registerGsap();

    const targets = [
      eyebrowRef.current,
      headlineRef.current,
      subheadRef.current,
      cueRef.current,
    ].filter(Boolean);

    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y: 28 });

    const tl = gsap.timeline({ delay: 0.25 });
    tl.to(eyebrowRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out' }, '-=0.6')
      .to(subheadRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.75')
      .to(cueRef.current,      { opacity: 0.7, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-end section"
      aria-label="Hero"
    >
      <div
        className="container-wide w-full pb-[14vh] relative"
        style={{ zIndex: 10 }}
      >
        {/* White translucent panel behind the hero copy. Pure white (not
            cream) so it visibly stands out from the page's cream theme; 72%
            opacity keeps the 3D scene partially visible through it. */}
        <div
          className="relative rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 backdrop-blur-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.33)',
            boxShadow:
              '0 40px 80px -30px rgba(58, 40, 24, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
          }}
        >
          <p ref={eyebrowRef} className="eyebrow mb-6">
            {hero.eyebrow}
          </p>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-balance text-[var(--color-walnut)]"
          >
            {hero.headline}
          </h1>
          <p
            ref={subheadRef}
            className="mt-6 text-body-lg text-[var(--color-walnut-mid)]"
          >
            {hero.subhead}
          </p>
        </div>
      </div>

      {/* Scroll cue — sits at the bottom, very subtle */}
      <div
        ref={cueRef}
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2 text-[var(--color-walnut-mid)]/70
          pointer-events-none
        "
        style={{ zIndex: 10 }}
        aria-hidden
      >
        <span className="text-micro">SCROLL</span>
        <span className="block h-8 w-px bg-[var(--color-walnut)]/40 animate-drift" />
      </div>
    </section>
  );
}
