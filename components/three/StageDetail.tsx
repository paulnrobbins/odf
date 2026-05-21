'use client';

/**
 * StageDetail
 * ───────────
 * The objects that make the stage a *worship* stage instead of just a riser:
 *   • acoustic guitar on a simple metal stand (stage left)
 *   • wooden stool with a coffee mug on top (stage right)
 *   • music stand with a worn Bible open on it (centerish)
 *
 * All silhouettes — the camera passes near these in Scene 5 but never lingers
 * for forensic detail. Procedural geometry, no GLB hosting needed in v1.
 */

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const WARM_WOOD = '#5c3a20';
const DARK_WOOD = '#3a2818';
const METAL = '#1f1a16';
const MUG_CERAMIC = '#d9d1c2';
const BIBLE_LEATHER = '#2a1f17';

interface StageDetailProps {
  position?: [number, number, number];
}

export function StageDetail({ position = [0, 0, 0] }: StageDetailProps) {
  return (
    <group position={position}>
      <Guitar position={[-1.7, 0.20, 0.2]} />
      <StoolWithMug position={[1.6, 0.20, 0.3]} />
      <MusicStandWithBible position={[-0.05, 0.20, 0.55]} />
    </group>
  );
}

// ─────────────────────────────────────────────
// Acoustic guitar on a simple A-frame stand
// ─────────────────────────────────────────────
function Guitar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.3, 0]}>
      {/* Stand — two crossed thin bars forming an A-shape */}
      <mesh castShadow position={[0, 0.30, 0]} rotation={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.01, 0.01, 0.80, 8]} />
        <meshStandardMaterial color={METAL} roughness={0.45} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.30, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.01, 0.01, 0.80, 8]} />
        <meshStandardMaterial color={METAL} roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Cross-brace */}
      <mesh castShadow position={[0, 0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.16, 8]} />
        <meshStandardMaterial color={METAL} roughness={0.45} metalness={0.7} />
      </mesh>

      {/* Guitar body — flattened sphere, dark wood */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.42, 0]}
        rotation={[0.15, 0, 0]}
        scale={[0.20, 0.04, 0.16]}
      >
        <sphereGeometry args={[1, 18, 12]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.65} />
      </mesh>

      {/* Sound hole — small dark disk on the body face */}
      <mesh position={[0, 0.45, 0.155]} rotation={[1.42, 0, 0]}>
        <circleGeometry args={[0.035, 24]} />
        <meshBasicMaterial color="#0a0705" />
      </mesh>

      {/* Neck — long thin cylinder rising from body */}
      <mesh castShadow position={[0, 0.78, -0.02]} rotation={[-0.25, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.55, 10]} />
        <meshStandardMaterial color={WARM_WOOD} roughness={0.6} />
      </mesh>

      {/* Headstock — small angled block at top of neck */}
      <mesh castShadow position={[0, 1.04, -0.085]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.07, 0.10, 0.025]} />
        <meshStandardMaterial color={WARM_WOOD} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────
// Wooden stool with a ceramic mug on top
// ─────────────────────────────────────────────
function StoolWithMug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat — round disk */}
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
        <meshStandardMaterial color={WARM_WOOD} roughness={0.75} />
      </mesh>
      {/* Four splayed legs */}
      {([
        [+0.13, +0.12],
        [-0.13, +0.12],
        [+0.13, -0.12],
        [-0.13, -0.12],
      ] as Array<[number, number]>).map(([x, z], i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          position={[x, 0.22, z]}
          rotation={[
            z > 0 ? -0.12 : 0.12,
            0,
            x > 0 ? -0.12 : 0.12,
          ]}
        >
          <cylinderGeometry args={[0.012, 0.012, 0.46, 8]} />
          <meshStandardMaterial color={DARK_WOOD} roughness={0.7} />
        </mesh>
      ))}

      {/* Coffee mug on top — cylinder + torus handle */}
      <group position={[0.03, 0.51, 0.02]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.085, 16]} />
          <meshStandardMaterial color={MUG_CERAMIC} roughness={0.55} />
        </mesh>
        {/* Coffee inside — dark disk just below rim */}
        <mesh position={[0, 0.036, 0]}>
          <cylinderGeometry args={[0.041, 0.041, 0.002, 16]} />
          <meshStandardMaterial color="#1a0e08" roughness={0.35} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.022, 0.006, 8, 14, Math.PI]} />
          <meshStandardMaterial color={MUG_CERAMIC} roughness={0.55} />
        </mesh>
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────
// Music stand with a worn Bible open on it
// ─────────────────────────────────────────────
function MusicStandWithBible({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tripod base */}
      <mesh castShadow position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 12]} />
        <meshStandardMaterial color={METAL} roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Vertical pole */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.0, 10]} />
        <meshStandardMaterial color={METAL} roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Tilted reading plate */}
      <mesh castShadow receiveShadow position={[0, 1.10, -0.06]} rotation={[-0.55, 0, 0]}>
        <boxGeometry args={[0.42, 0.30, 0.012]} />
        <meshStandardMaterial color={METAL} roughness={0.5} metalness={0.6} />
      </mesh>

      {/* The Bible on the stand — worn leather book, slightly open */}
      <group position={[0, 1.12, -0.05]} rotation={[-0.55, 0, 0]}>
        {/* Bottom cover */}
        <mesh castShadow receiveShadow position={[0, -0.012, 0]}>
          <boxGeometry args={[0.30, 0.018, 0.20]} />
          <meshStandardMaterial color={BIBLE_LEATHER} roughness={0.85} />
        </mesh>
        {/* Pages — slightly raised, lighter */}
        <mesh receiveShadow position={[0, 0.003, 0]}>
          <boxGeometry args={[0.28, 0.012, 0.185]} />
          <meshStandardMaterial color="#e8dec7" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
