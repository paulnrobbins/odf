'use client';

import { useEffect, useState } from 'react';

/**
 * useScrollProgress
 * ─────────────────
 * Returns the document scroll progress, 0..1, updated on every Lenis scroll tick.
 * Used by the 3D scene (Phase 3) to drive camera path through the 7-scene scroll score,
 * and by content sections to fade/slide based on their position in the page.
 *
 * Listens for the global `lenis-scroll` CustomEvent dispatched by LenisProvider.
 * Falls back to native scroll listener if Lenis isn't running (reduced-motion users).
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    // Lenis dispatches this from LenisProvider on each `scroll` event
    const onLenis = (e: Event) => {
      const detail = (e as CustomEvent<{ progress: number }>).detail;
      if (detail && typeof detail.progress === 'number') {
        setProgress(Math.min(1, Math.max(0, detail.progress)));
      } else {
        update();
      }
    };

    window.addEventListener('lenis-scroll', onLenis);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    update();

    return () => {
      window.removeEventListener('lenis-scroll', onLenis);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}
