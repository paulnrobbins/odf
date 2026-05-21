/**
 * UpperRoomFallback — Sunday Morning Light
 * ────────────────────────────────────────
 * SSR-rendered base layer behind the R3F Canvas. Always renders (no
 * 'use client') so first paint shows something real even without JS.
 *
 * Light-theme treatment: photo at near-normal brightness, gentle cream wash
 * so the upper viewport (where the hero text lands) reads cleanly without
 * losing the photo entirely.
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
      {/* The real hero photo, pushed bright and desaturated so it reads as
          a light-warm backdrop rather than a dim interior */}
      <Image
        src={photos.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ filter: 'brightness(1.25) saturate(0.75) contrast(0.92)' }}
      />

      {/* Heavy cream wash — covers most of the photo's natural darkness;
          photo reads as a subtle warm texture rather than a literal scene */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(248,243,232,0.85) 0%, rgba(248,243,232,0.70) 35%, rgba(248,243,232,0.55) 65%, rgba(248,243,232,0.82) 100%)',
        }}
      />

      {/* Subtle warm corner glow — same as the OG image, ties the page together */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 85% 12%, rgba(217,163,104,0.10) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
