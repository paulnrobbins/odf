'use client';

/**
 * DustMotes
 * ─────────
 * The one ambient effect used in this scene — slow-drifting motes concentrated
 * in the window-shaft area. Per the system doc: one signature effect, used
 * sparingly. Disabled entirely on mobile + for prefers-reduced-motion.
 *
 * Implementation: Points + buffer geometry, hand-animated in useFrame.
 * No physics, no shader complexity — just gentle vertical drift with wrap-around.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DustMotesProps {
  count?: number;
  enabled?: boolean;
}

export function DustMotes({ count = 80, enabled = true }: DustMotesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate initial positions + per-mote drift velocities (deterministic over
  // component lifetime; doesn't re-randomize on rerender).
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Concentrate motes in the window-shaft volume:
      // x: 0.5 → 5 (right side of room where the shaft cuts through)
      // y: 0 → 3.5 (floor to ceiling)
      // z: -2 → 4 (front-mid to behind camera)
      positions[i * 3]     = 0.5 + Math.random() * 4.5;
      positions[i * 3 + 1] = Math.random() * 3.5;
      positions[i * 3 + 2] = -2 + Math.random() * 6;

      // Slow drift: subtle horizontal sway, slight downward float (≈ Brownian)
      velocities[i * 3]     = (Math.random() - 0.5) * 0.0008;
      velocities[i * 3 + 1] = -Math.random() * 0.0006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0006;
    }

    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (!enabled || !pointsRef.current) return;

    const attr = pointsRef.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3]     += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around once a mote drifts below floor — re-spawn near ceiling
      if (arr[i * 3 + 1] < 0) {
        arr[i * 3 + 1] = 3.5;
        arr[i * 3]     = 0.5 + Math.random() * 4.5;
        arr[i * 3 + 2] = -2 + Math.random() * 6;
      }
    }
    attr.needsUpdate = true;
  });

  if (!enabled) return null;

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#e8b87a"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
