import { Nav } from '@/components/layout/Nav';
import { UpperRoomFallback } from '@/components/three/UpperRoomFallback';
import { BackgroundCanvas } from '@/components/three/BackgroundCanvas';
import { Hero } from '@/components/sections/Hero';
import { TwoThings } from '@/components/sections/TwoThings';
import { Ministries } from '@/components/sections/Ministries';
import { ServiceInfo } from '@/components/sections/ServiceInfo';
import { Leadership } from '@/components/sections/Leadership';
import { AtTheCross } from '@/components/sections/AtTheCross';
import { Connection } from '@/components/sections/Connection';

/**
 * Home page — Phase 4 assembly
 * ────────────────────────────
 * Rendering order matters: the photo fallback sits at the very back as the
 * SSR-renderable base layer. The 3D Canvas mounts on top of it client-side
 * (dynamic import, ssr:false). Both are fixed-position and behind all content.
 *
 * Section order matches the scroll score: Hero → TwoThings → Ministries →
 * ServiceInfo → Leadership (the Justin + Kahala beat) → AtTheCross → Connection.
 */
export default function HomePage() {
  return (
    <>
      {/* Background scene — SSR photo first, R3F Canvas on top client-side */}
      <UpperRoomFallback />
      <BackgroundCanvas />

      <Nav />
      <main>
        <Hero />
        <TwoThings />
        <Ministries />
        <ServiceInfo />
        <Leadership />
        <AtTheCross />
        <Connection />
      </main>
    </>
  );
}
