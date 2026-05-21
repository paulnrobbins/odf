'use client';

/**
 * Cursor
 * ──────
 * Custom dual-layer cursor: a small lamplight dot follows the pointer 1:1,
 * a larger thin ring follows with smooth lerp pursuit. Both scale up (and the
 * ring fills slightly) when hovering interactive elements.
 *
 * Hidden on touch devices (no pointer to follow) and reduced-motion users
 * (custom cursors are motion). Native cursor is replaced only when this
 * component mounts and is restored cleanly on unmount.
 */

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RING_LERP = 0.16;
const RING_SIZE = 32;
const DOT_SIZE = 6;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, label, [data-cursor="link"]';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hovering = false;
    let rafId = 0;

    // Hide the native cursor while ours is active
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Hover detection — checks the actual element under the cursor
      const target = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      hovering = !!target?.closest(INTERACTIVE_SELECTOR);
    };

    const onLeave = () => {
      // Move both elements far off-screen so they don't peek at the edges
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const tick = () => {
      // Dot follows exactly
      dot.style.transform = `translate3d(${mouseX - DOT_SIZE / 2}px, ${mouseY - DOT_SIZE / 2}px, 0)`;

      // Ring lerps toward cursor
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;
      const scale = hovering ? 1.5 : 1;
      ring.style.transform =
        `translate3d(${ringX - RING_SIZE / 2}px, ${ringY - RING_SIZE / 2}px, 0) scale(${scale})`;
      ring.style.backgroundColor = hovering ? 'rgba(217,163,104,0.12)' : 'transparent';
      ring.style.borderColor = hovering ? 'rgba(232,184,122,0.9)' : 'rgba(217,163,104,1)';

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.style.cursor = '';
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Dot — exact cursor position */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-200"
        style={{
          zIndex: 200,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          backgroundColor: 'var(--color-lamplight)',
          mixBlendMode: 'difference',
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Ring — lagging smooth pursuit */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none transition-[opacity] duration-200"
        style={{
          zIndex: 200,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: '50%',
          border: '1.5px solid var(--color-lamplight)',
          backgroundColor: 'transparent',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
