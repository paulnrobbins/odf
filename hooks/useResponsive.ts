'use client';

import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * useResponsive
 * ─────────────
 * Returns a boolean for whether the viewport is at-or-above the given breakpoint.
 * Used to: switch 3D quality tier, hide ambient effects on mobile, swap layouts.
 *
 * SSR-safe: returns false on first render, then settles after mount.
 */
export function useResponsive(min: Breakpoint = 'md'): boolean {
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const query = `(min-width: ${BREAKPOINTS[min]}px)`;
    const mq = window.matchMedia(query);

    setIsAbove(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsAbove(e.matches);

    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, [min]);

  return isAbove;
}

export { BREAKPOINTS };
