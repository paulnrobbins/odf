/**
 * UpperRoomFallback
 * ─────────────────
 * SSR-rendered base layer. Always renders (no 'use client'), placed behind the
 * R3F Canvas. Three reasons it exists:
 *
 *   1. SSR: The Canvas is dynamic-imported with ssr:false, meaning the page
 *      would render empty server-side. Loading this fallback instead gives
 *      first paint something real to show.
 *   2. Reduced motion: When users prefer reduced motion, the Canvas never
 *      mounts. This photo stays as the permanent backdrop.
 *   3. Resilience: If JS fails or the Canvas crashes, the page still looks
 *      like a finished site.
 *
 * The photo is the real ODF service shot — same scene the 3D mockup is
 * inspired by. With the warm-tone overlay it sits cleanly under the typography.
 */

import Image from 'next/image';
import { photos } from '@/lib/content';

export function UpperRoomFallback() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    >
      {/* The real hero photo */}
      <Image
        src={photos.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{
          filter: 'brightness(0.55) saturate(0.85) contrast(1.05)',
        }}
      />

      {/* Warm walnut gradient overlay — unifies the photo with the palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(26,20,16,0.45) 0%, rgba(26,20,16,0.75) 60%, rgba(26,20,16,0.92) 100%)',
        }}
      />

      {/* Amber edge vignette — pulls focus toward center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(26,20,16,0.45) 90%)',
        }}
      />
    </div>
  );
}
