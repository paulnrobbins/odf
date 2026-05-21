'use client';

import { useEffect, useRef } from 'react';
import { createLenis, type LenisInstance } from '@/lib/lenis';
import { registerGsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * LenisProvider
 * ─────────────
 * Mounts a single Lenis smooth-scroll instance at the app root. Hooks it up to
 * GSAP ScrollTrigger so all scroll-scrubbed animations stay in sync. Dispatches
 * a global `lenis-scroll` CustomEvent on every tick so the scene + sections can
 * read scroll progress without each one creating its own listener.
 *
 * Skipped entirely when the user prefers reduced motion — falls back to native
 * scrolling so accessibility wins over polish.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<LenisInstance | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;

    // Browser scroll restoration would fight Lenis on reload — turn it off.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const gsap = registerGsap();
    const lenis = createLenis();
    lenisRef.current = lenis;

    // Bridge Lenis → GSAP ticker so ScrollTrigger updates inside the same frame
    if (gsap) {
      lenis.on('scroll', ScrollTrigger.update);

      const tick = (time: number) => {
        // GSAP gives us time in seconds; Lenis wants milliseconds
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Dispatch global progress event for hooks that don't own a Lenis ref
      lenis.on('scroll', () => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        window.dispatchEvent(
          new CustomEvent('lenis-scroll', { detail: { progress } }),
        );
      });

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    // Fallback path if GSAP failed to register: drive Lenis with native rAF
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
