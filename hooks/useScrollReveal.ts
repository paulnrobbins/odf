'use client';

/**
 * useScrollReveal
 * ───────────────
 * Returns a ref to attach to a section root. When the section enters the
 * viewport (top reaches 78% of screen height), all descendants matching the
 * given selector (default `.reveal`) animate from opacity 0 / y+28 to their
 * natural state, staggered.
 *
 * Auto-cleans on unmount via gsap.context(). Honors prefers-reduced-motion
 * (content appears instantly with no animation).
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   return <section ref={ref}>
 *     <h2 className="reveal">…</h2>
 *     <p className="reveal">…</p>
 *   </section>
 */

import { useEffect, useRef } from 'react';
import { gsap, registerGsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface UseScrollRevealOptions {
  selector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {},
) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  const {
    selector = '.reveal',
    stagger = 0.09,
    y = 28,
    duration = 0.9,
    start = 'top 78%',
  } = options;

  useEffect(() => {
    if (reducedMotion) return;
    if (!ref.current) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const el = ref.current!;
      const targets = el.querySelectorAll(selector);
      if (targets.length === 0) return;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        ease: 'power2.out',
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none reverse',
        },
      });
    }, ref);

    return () => {
      ctx.revert();
      // Defensive cleanup of any ScrollTriggers attached to this section
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === ref.current)
        .forEach((st) => st.kill());
    };
  }, [reducedMotion, selector, stagger, y, duration, start]);

  return ref;
}
