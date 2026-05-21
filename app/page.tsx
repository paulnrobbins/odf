import { Nav } from '@/components/layout/Nav';
import { UpperRoomFallback } from '@/components/three/UpperRoomFallback';
import { BackgroundCanvas } from '@/components/three/BackgroundCanvas';
import { Hero } from '@/components/sections/Hero';
import { TwoThings } from '@/components/sections/TwoThings';
import { Ministries } from '@/components/sections/Ministries';
import { ServiceInfo } from '@/components/sections/ServiceInfo';
import { Leadership } from '@/components/sections/Leadership';
import { Beliefs } from '@/components/sections/Beliefs';
import { AtTheCross } from '@/components/sections/AtTheCross';
import { Connection } from '@/components/sections/Connection';

/**
 * Home page assembly
 * ──────────────────
 * Section order matches the scroll score:
 *   Hero → TwoThings → Ministries → ServiceInfo → Leadership → Beliefs →
 *   AtTheCross → Connection.
 *
 * The fixed 3D background (UpperRoomFallback photo + BackgroundCanvas R3F)
 * sits behind everything; the camera path through the 3D scene auto-scales
 * to total scroll length, so adding sections doesn't break the cinematic.
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
        <Beliefs />
        <AtTheCross />
        <Connection />
      </main>
    </>
  );
}
