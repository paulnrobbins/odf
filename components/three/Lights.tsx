'use client';

/**
 * Lights
 * ──────
 * The whole scene's mood is carried by these lights. Three roles:
 *
 *   1. Side window shaft — the "shaft of side light" Scene 1 calls for.
 *      A spot light from the right, angled across the room, warm tungsten.
 *      Casts shadows on desktop. This is the dramatic light that picks out
 *      the foreground chair in Scene 1.
 *
 *   2. Overhead string lights — warm point lights spaced down the room.
 *      Subtle, atmospheric. Fall off at distance to keep the stage end darker.
 *
 *   3. Cross uplight — soft spot lighting the cross on the stage.
 *      Phase 4: intensity scrubs from 1.4 (default) to 3.8 (peak) as scroll
 *      progress moves through Scene 6 (0.75 → 0.92). The cross visibly
 *      glows brighter as the camera approaches it.
 *
 * Ambient is kept very low (≤0.1) so the directional lights do the actual
 * work. The room should feel dim and intimate, not flat-lit.
 */

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface LightsProps {
  mobile?: boolean;
}

const CROSS_INTENSITY_BASE = 1.4;
const CROSS_INTENSITY_PEAK = 3.8;
const SCENE_6_START = 0.75;
const SCENE_6_END = 0.92;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 2);
}

export function Lights({ mobile = false }: LightsProps) {
  const crossSpotRef = useRef<THREE.SpotLight>(null);
  const progress = useScrollProgress();

  // Scrub cross uplight intensity through Scene 6
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
      {/* Very low ambient — warm undertone, barely visible */}
      <ambientLight intensity={0.08} color="#3a2a1f" />

      {/*
        ─ Window shaft (Scene 1's defining light) ─
        Spot from the right side of the room, angled across to pick out the
        foreground chair. Wide penumbra for soft falloff.
      */}
      <spotLight
        position={[5, 4, 3]}
        target-position={[0, 0.5, 2]}
        angle={0.65}
        penumbra={0.75}
        intensity={6}
        color="#e8b87a"
        castShadow={!mobile}
        shadow-mapSize-width={mobile ? 512 : 1024}
        shadow-mapSize-height={mobile ? 512 : 1024}
        shadow-bias={-0.0005}
      />

      {/*
        ─ Overhead string lights ─
        Point lights down the length of the room, decaying so the stage end
        stays moody. Skip the deepest one on mobile to save fillrate.
      */}
      <pointLight position={[0, 3.2, 1]}  intensity={0.55} color="#d9a368" distance={6} decay={2} />
      <pointLight position={[0, 3.2, -2]} intensity={0.50} color="#d9a368" distance={6} decay={2} />
      {!mobile && (
        <pointLight position={[0, 3.2, -5]} intensity={0.42} color="#d9a368" distance={6} decay={2} />
      )}

      {/*
        ─ Cross uplight ─
        Soft warm glow on the cross. Intensity is scrubbed in useFrame above
        from 1.4 → 3.8 as scroll progress reaches Scene 6 (At the Cross).
      */}
      <spotLight
        ref={crossSpotRef}
        position={[0, 3.6, -6.4]}
        target-position={[0, 1.6, -7.85]}
        angle={0.42}
        penumbra={0.85}
        intensity={CROSS_INTENSITY_BASE}
        color="#e8b87a"
      />
    </>
  );
}
