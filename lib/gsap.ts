/**
 * GSAP + ScrollTrigger registration
 * ─────────────────────────────────
 * Per Part 6 of the system doc: GSAP plugins MUST be registered inside a
 * useEffect, never at module level. Module-level registration breaks in
 * Next.js production builds (SSR can't see `window`).
 *
 * Components import { registerGsap } and call it once inside useEffect.
 */

'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let registered = false;

export function registerGsap() {
  if (typeof window === 'undefined') return null;
  if (registered) return gsap;

  gsap.registerPlugin(ScrollTrigger);

  // Default easings tuned to the Warm Lived-In Cinema direction
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };
