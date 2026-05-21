'use client';

/**
 * FoldingChair
 * ────────────
 * Procedural mismatched folding chair. The anchor object made literal — these
 * exact chairs are what fills ODF's actual worship space (see hero.jpg).
 *
 * Six meshes per chair: seat, angled back, 2 front legs, 2 rear legs (rear
 * extend up to support the backrest). Color varies per instance to feel
 * hand-placed and mismatched.
 *
 * Phase 5 optimization candidate: convert to InstancedMesh if mobile fps
 * drops. With ~48 chairs × 6 meshes = 288 draw calls — fine on most devices,
 * but instancing would drop that to ~7 draw calls (one per color group).
 */

import { useMemo } from 'react';

interface FoldingChairProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

const LEG_COLOR = '#2a2520';

export function FoldingChair({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#7a2e2e',
}: FoldingChairProps) {
  // Slight per-chair material variation for tactile feel
  const roughness = useMemo(() => 0.82 + Math.random() * 0.08, []);

  return (
    <group position={position} rotation={rotation}>
      {/* Seat — slim padded cushion */}
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[0.45, 0.025, 0.42]} />
        <meshStandardMaterial color={color} roughness={roughness} />
      </mesh>

      {/* Back — angled cushion */}
      <mesh castShadow receiveShadow position={[0, 0.72, -0.20]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[0.45, 0.32, 0.025]} />
        <meshStandardMaterial color={color} roughness={roughness} />
      </mesh>

      {/* Front legs (short, just up to seat) */}
      <mesh castShadow receiveShadow position={[-0.18, 0.22, 0.18]}>
        <cylinderGeometry args={[0.012, 0.012, 0.44, 8]} />
        <meshStandardMaterial color={LEG_COLOR} roughness={0.7} metalness={0.45} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.18, 0.22, 0.18]}>
        <cylinderGeometry args={[0.012, 0.012, 0.44, 8]} />
        <meshStandardMaterial color={LEG_COLOR} roughness={0.7} metalness={0.45} />
      </mesh>

      {/* Rear legs (extend up to support the backrest) */}
      <mesh castShadow receiveShadow position={[-0.18, 0.42, -0.16]}>
        <cylinderGeometry args={[0.012, 0.012, 0.84, 8]} />
        <meshStandardMaterial color={LEG_COLOR} roughness={0.7} metalness={0.45} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.18, 0.42, -0.16]}>
        <cylinderGeometry args={[0.012, 0.012, 0.84, 8]} />
        <meshStandardMaterial color={LEG_COLOR} roughness={0.7} metalness={0.45} />
      </mesh>
    </group>
  );
}
