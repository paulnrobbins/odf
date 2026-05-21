'use client';

/**
 * Cursor
 * ──────
 * A subtle lamplight ring that follows the native cursor with smooth lerp
 * pursuit. The native cursor stays visible — this is enhancement, not
 * replacement (way more reliable: if the ring fails for any reason, the
 * native pointer is always there).
 *
 * On hover over interactive elements: ring scales up 1.6× and fills slightly.
 * Hidden on touch devices and for prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RING_LERP = 0.18;
const RING_SIZE = 36;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, label, [data-cursor="link"]';

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    // Start at viewport center so the ring is visible immediately on mount
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let rafId = 0;
    let visible = false;

    const showRing = () => {
      if (visible) return;
      visible = true;
      ring.style.opacity = '1';
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      showRing();

      const target = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      hovering = !!target?.closest(INTERACTIVE_SELECTOR);
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = '0';
    };

    const tick = () => {
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;
      const scale = hovering ? 1.6 : 1;
      ring.style.transform =
        `translate3d(${ringX - RING_SIZE / 2}px, ${ringY - RING_SIZE / 2}px, 0) scale(${scale})`;
      ring.style.backgroundColor = hovering ? 'rgba(110, 74, 35, 0.14)' : 'transparent';
      ring.style.borderColor = hovering ? 'rgba(58, 40, 32, 0.95)' : 'rgba(58, 40, 32, 0.75)';

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none transition-opacity duration-300"
      style={{
        zIndex: 200,
        width: RING_SIZE,
        height: RING_SIZE,
        borderRadius: '50%',
        border: '1.5px solid rgba(58, 40, 32, 0.75)',
        backgroundColor: 'transparent',
        opacity: 0,
        willChange: 'transform',
      }}
    />
  );
}
