'use client';

/**
 * BackgroundCanvas
 * ────────────────
 * Client-side orchestrator for the 3D scene. Two responsibilities:
 *
 *   1. Dynamic-import the R3F Canvas with ssr:false (mandatory — Three.js
 *      cannot SSR; see Part 6 of the system doc).
 *   2. Honor prefers-reduced-motion by returning null, leaving just the
 *      static photo backdrop visible.
 *
 * The page renders <UpperRoomFallback /> first (SSR), then this component
 * mounts on top with the live Canvas.
 */

import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Dynamic import — never SSR'd, no loading flash (fallback is already visible)
const UpperRoomCanvas = dynamic(
  () => import('./UpperRoomCanvas').then((m) => m.UpperRoomCanvas),
  { ssr: false, loading: () => null },
);

export function BackgroundCanvas() {
  const reducedMotion = useReducedMotion();

  // Reduced motion: skip the Canvas entirely; the photo backdrop is enough.
  if (reducedMotion) return null;

  return <UpperRoomCanvas />;
}
