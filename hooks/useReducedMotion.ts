'use client';

import { useEffect, useState } from 'react';

/**
 * useReducedMotion
 * ────────────────
 * Returns true if the user has prefers-reduced-motion: reduce set.
 * Used to: (a) disable the R3F Canvas in favor of a static fallback,
 * (b) skip GSAP scroll choreography, (c) silence ambient motion.
 *
 * Reactive: updates if the user changes OS settings mid-session.
 */
export function useReducedMotion(): boolean {
  // SSR-safe default: assume no reduced-motion preference until we can ask.
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);

    // Newer browsers
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    // Safari < 14 fallback
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return prefersReduced;
}
