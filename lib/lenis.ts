/**
 * Lenis — smooth scroll
 * ─────────────────────
 * Lenis drives the entire scroll experience. GSAP ScrollTrigger reads from
 * Lenis-driven scroll. Per Part 6 of the system doc: native scroll-restoration
 * must be set to 'manual' in app/layout.tsx to prevent Lenis fighting the
 * browser on reload.
 */

'use client';

import Lenis from 'lenis';

export interface LenisInstance extends Lenis {}

export function createLenis(): Lenis {
  return new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    // Lenis disables native smooth automatically when running
  });
}

export { Lenis };
