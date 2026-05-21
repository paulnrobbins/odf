'use client';

/**
 * Stage
 * ─────
 * The front of the Upper Room: a low platform, a single handmade wooden cross,
 * and the small-but-meaningful objects that make this a *worship* stage:
 * acoustic guitar, stool with coffee mug, music stand with a worn Bible.
 */

import { StageDetail } from './StageDetail';

interface StageProps {
  z?: number; // how far back the stage sits (default −7m)
}

export function Stage({ z = -7 }: StageProps) {
  return (
    <group position={[0, 0, z]}>
      {/* Platform — short, low, modest */}
      <mesh receiveShadow castShadow position={[0, 0.10, 0]}>
        <boxGeometry args={[5.4, 0.20, 2.4]} />
        <meshStandardMaterial color="#7a553a" roughness={0.68} />
      </mesh>

      {/* Platform edge trim (slightly lighter wood) */}
      <mesh receiveShadow position={[0, 0.205, 1.2]}>
        <boxGeometry args={[5.4, 0.02, 0.04]} />
        <meshStandardMaterial color="#9b6c47" roughness={0.55} />
      </mesh>

      {/* Wooden cross — vertical beam */}
      <mesh castShadow receiveShadow position={[0, 1.45, -0.85]}>
        <boxGeometry args={[0.10, 1.55, 0.12]} />
        <meshStandardMaterial color="#5c3a20" roughness={0.6} />
      </mesh>

      {/* Wooden cross — horizontal beam (positioned ~⅔ up the vertical) */}
      <mesh castShadow receiveShadow position={[0, 1.78, -0.85]}>
        <boxGeometry args={[0.72, 0.09, 0.10]} />
        <meshStandardMaterial color="#5c3a20" roughness={0.6} />
      </mesh>

      {/* Guitar / stool+mug / music stand+Bible — the things that make it
          *this* stage, not just any stage */}
      <StageDetail position={[0, 0, 0]} />
    </group>
  );
}
