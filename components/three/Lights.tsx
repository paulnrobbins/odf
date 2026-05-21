'use client';

/**
 * Lights — Sunday Morning Light theme
 * ───────────────────────────────────
 * Bright daylight worship room. Ambient is high so the chairs, stage, and
 * cross all read clearly from any angle. Subtle directional accents preserve
 * a sense of "warm sun through a window" without the prior candlelit dimness.
 *
 *   1. Ambient + hemisphere — does most of the work. The room reads as lit.
 *   2. Window shaft — still warm, but softer; reads as morning sun across the
 *      right wall.
 *   3. Overhead points — gentle warm fill down the center aisle, very low
 *      intensity since ambient already lifts everything.
 *   4. Cross spotlight — scrubs from 1.2 → 3.0 across Scene 6 to mark the
 *      arrival moment without overpowering the rest of the now-bright scene.
 */

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface LightsProps {
  mobile?: boolean;
}

const CROSS_INTENSITY_BASE = 1.2;
const CROSS_INTENSITY_PEAK = 3.0;
const SCENE_6_START = 0.75;
const SCENE_6_END = 0.92;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 2);
}

export function Lights({ mobile = false }: LightsProps) {
  const crossSpotRef = useRef<THREE.SpotLight>(null);
  const progress = useScrollProgress();

  useFrame(() => {
    if (!crossSpotRef.current) return;
    const local = Math.min(
      Math.max((progress - SCENE_6_START) / (SCENE_6_END - SCENE_6_START), 0),
      1,
    );
    const t = easeOut(local);
    crossSpotRef.current.intensity =
      CROSS_INTENSITY_BASE + (CROSS_INTENSITY_PEAK - CROSS_INTENSITY_BASE) * t;
  });

  return (
    <>
      {/* Very high ambient — keeps the whole scene cream-bright from any angle */}
      <ambientLight intensity={1.4} color="#fff4e0" />

      {/* Hemisphere — warm sky, cream-warm ground; lifts every surface */}
      <hemisphereLight args={['#fffaf0', '#d4b486', 1.0]} />

      {/* Window shaft — softer warmth, like sun across the right wall.
          Still casts shadows on desktop so the chairs have grounding. */}
      <spotLight
        position={[5, 4, 3]}
        target-position={[0, 0.5, 2]}
        angle={0.7}
        penumbra={0.85}
        intensity={4.5}
        color="#fce8c4"
        castShadow={!mobile}
        shadow-mapSize-width={mobile ? 512 : 1024}
        shadow-mapSize-height={mobile ? 512 : 1024}
        shadow-bias={-0.0005}
      />

      {/* Overhead string lights — subtle warmth, doesn't dominate the daylight */}
      <pointLight position={[0, 3.2, 1]}  intensity={0.5} color="#fde0b8" distance={6} decay={2} />
      <pointLight position={[0, 3.2, -2]} intensity={0.45} color="#fde0b8" distance={6} decay={2} />
      {!mobile && (
        <pointLight position={[0, 3.2, -5]} intensity={0.4} color="#fde0b8" distance={6} decay={2} />
      )}

      {/* Cross uplight — scrubs at Scene 6 to give the cross presence */}
      <spotLight
        ref={crossSpotRef}
        position={[0, 3.6, -6.4]}
        target-position={[0, 1.6, -7.85]}
        angle={0.45}
        penumbra={0.85}
        intensity={CROSS_INTENSITY_BASE}
        color="#fce8c4"
      />

      {/* Stage rim light from above-front — catches the stage objects */}
      <directionalLight
        position={[1, 3, -5]}
        intensity={0.35}
        color="#fce8c4"
      />
    </>
  );
}
