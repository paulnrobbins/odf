'use client';

/**
 * UpperRoomScene
 * ──────────────
 * The full 3D composition: room shell, chair grid, stage, lights, dust motes,
 * and the scroll-driven camera path covering Scene 1 (Threshold) and Scene 2
 * (Aisle Reveal) — scroll progress 0 → 0.25.
 *
 * Phase 4 will extend the camera path through the remaining scenes (3–7) and
 * add stage detail (guitar, stool, mug, music stand).
 *
 * Chair layout is deterministic — generated once via a small hash function so
 * positions/rotations are stable across rerenders but feel hand-placed.
 */

import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { FoldingChair } from './FoldingChair';
import { Stage } from './Stage';
import { Lights } from './Lights';
import { DustMotes } from './DustMotes';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface UpperRoomSceneProps {
  mobile?: boolean;
  motesEnabled?: boolean;
}

// Chair palette — heavily weighted to burgundy (matches the real ODF photo)
// with sage / navy / rust as occasional accents.
const CHAIR_PALETTE = [
  '#7a2e2e', '#7a2e2e', '#7a2e2e', '#7a2e2e', // burgundy (dominant)
  '#5c3a2f', // dark brown
  '#3a4554', // navy
  '#4a5240', // sage
  '#8a4a3c', // rust
];

// Tiny deterministic hash so chair placement is stable across renders.
// (No need for a heavy seedrandom library — this is good enough for jitter.)
function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Smoothstep ease for inter-segment blending — natural acceleration in + out
function easeInOut3(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─ Camera waypoints — one per scroll-score scene ─────────────────────────
// Position interpolates from back-of-room (z = +3.35) all the way to the
// stage (z = -4.2) and then reverses for the connection footer. Each
// waypoint marks a story beat from the scroll score in odf-church-brief.md.
const PATH: Array<{
  progress: number;
  pos: [number, number, number];
  look: [number, number, number];
}> = [
  // Scene 1 (0.00–0.08) — The Threshold: side-angled, low, one chair lit
  { progress: 0.00, pos: [0.55, 1.32, 3.35], look: [-0.25, 0.85, 0.6] },

  // Scene 2 (0.08–0.25) — The Aisle Reveal: pull centered, more rows visible
  { progress: 0.25, pos: [0.00, 1.55, 3.95], look: [0.00, 1.00, -3.2] },

  // Scene 3 (0.25–0.42) — Two Things We Do: advance down aisle, mid-room
  { progress: 0.42, pos: [0.00, 1.55, 2.30], look: [0.00, 1.05, -5.0] },

  // Scene 4 (0.42–0.60) — The Family: mid-room, string lights overhead
  { progress: 0.60, pos: [0.00, 1.50, 0.40], look: [0.00, 1.15, -6.4] },

  // Scene 5 (0.60–0.75) — Stage Approaches: front third, stage detail resolves
  { progress: 0.75, pos: [0.00, 1.45, -1.80], look: [0.00, 1.30, -7.4] },

  // Scene 6 (0.75–0.92) — At the Cross: tilt up, cross dominates frame
  { progress: 0.87, pos: [0.00, 1.30, -4.20], look: [0.00, 1.85, -7.85] },

  // Scene 7 (0.92–1.00) — The Connection: reverse-angle from the stage, empty seats waiting
  { progress: 1.00, pos: [0.00, 1.65, -5.50], look: [0.00, 1.30, 3.5] },
];

// Tiny vec3 lerp helper (avoids allocating a new Vector3 every frame)
function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
  out: THREE.Vector3,
) {
  out.x = a[0] + (b[0] - a[0]) * t;
  out.y = a[1] + (b[1] - a[1]) * t;
  out.z = a[2] + (b[2] - a[2]) * t;
  return out;
}

// Reusable Vector3 instances — created once, mutated in useFrame
const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();

export function UpperRoomScene({ mobile = false, motesEnabled = true }: UpperRoomSceneProps) {
  const { camera } = useThree();
  const progress = useScrollProgress();

  // ─ Build the chair grid ─
  const chairs = useMemo(() => {
    const items: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      color: string;
    }> = [];

    const ROWS = mobile ? 5 : 6;
    const CHAIRS_PER_SIDE = mobile ? 3 : 4;
    const ROW_SPACING = 0.95;
    const CHAIR_SPACING = 0.58;
    const AISLE_HALF = 0.55; // half-width of center aisle

    for (let row = 0; row < ROWS; row++) {
      const z = -row * ROW_SPACING;

      // Left side of aisle
      for (let i = 0; i < CHAIRS_PER_SIDE; i++) {
        const seed = row * 100 + i + 1;
        const x = -(AISLE_HALF + (i + 0.5) * CHAIR_SPACING);
        const rotJitter = (hash(seed) - 0.5) * 0.18;
        const xJitter = (hash(seed + 0.5) - 0.5) * 0.04;
        const zJitter = (hash(seed + 0.9) - 0.5) * 0.06;
        items.push({
          position: [x + xJitter, 0, z + zJitter],
          rotation: [0, 0.12 + rotJitter, 0], // slight inward angle toward stage
          color: CHAIR_PALETTE[Math.floor(hash(seed + 1.3) * CHAIR_PALETTE.length)],
        });
      }

      // Right side of aisle
      for (let i = 0; i < CHAIRS_PER_SIDE; i++) {
        const seed = row * 100 + i + 50;
        const x = AISLE_HALF + (i + 0.5) * CHAIR_SPACING;
        const rotJitter = (hash(seed) - 0.5) * 0.18;
        const xJitter = (hash(seed + 0.5) - 0.5) * 0.04;
        const zJitter = (hash(seed + 0.9) - 0.5) * 0.06;
        items.push({
          position: [x + xJitter, 0, z + zJitter],
          rotation: [0, -0.12 + rotJitter, 0], // inward angle toward stage
          color: CHAIR_PALETTE[Math.floor(hash(seed + 1.3) * CHAIR_PALETTE.length)],
        });
      }
    }

    return items;
  }, [mobile]);

  // ─ Scroll-driven camera path through all 7 scenes (Phase 4) ─
  useFrame(() => {
    // Find the current segment of the waypoint table and interpolate within it.
    // Allocating Vector3 instances inside useFrame is fine for a small path,
    // but we use module-level `_pos`/`_look` to keep GC pressure to zero.
    let i = 0;
    while (i < PATH.length - 1 && PATH[i + 1].progress < progress) i++;

    const a = PATH[i];
    const b = PATH[Math.min(i + 1, PATH.length - 1)];
    const segLen = b.progress - a.progress;
    const local = segLen > 0
      ? Math.min(Math.max((progress - a.progress) / segLen, 0), 1)
      : 0;
    const t = easeInOut3(local);

    lerp3(a.pos, b.pos, t, _pos);
    lerp3(a.look, b.look, t, _look);

    camera.position.copy(_pos);
    camera.lookAt(_look);
  });

  return (
    <>
      <Lights mobile={mobile} />

      {/* ─ Room shell ─ floor, side walls, back wall, ceiling suggestion ─ */}

      {/* Floor — wood plank */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -3]}>
        <planeGeometry args={[16, 28]} />
        <meshStandardMaterial color="#3a2818" roughness={0.95} />
      </mesh>

      {/* Back wall (behind the camera most of the time, but visible at high progress) */}
      <mesh position={[0, 1.8, 4.6]} receiveShadow>
        <planeGeometry args={[16, 4.5]} />
        <meshStandardMaterial color="#241a13" roughness={0.95} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-5.4, 1.8, -3]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 4.5]} />
        <meshStandardMaterial color="#241a13" roughness={0.95} />
      </mesh>
      <mesh position={[5.4, 1.8, -3]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, 4.5]} />
        <meshStandardMaterial color="#241a13" roughness={0.95} />
      </mesh>

      {/* Front wall (behind the stage) */}
      <mesh position={[0, 1.8, -9]} receiveShadow>
        <planeGeometry args={[16, 4.5]} />
        <meshStandardMaterial color="#1f1610" roughness={0.95} />
      </mesh>

      {/* Ceiling suggestion (dark) */}
      <mesh position={[0, 3.8, -3]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 22]} />
        <meshStandardMaterial color="#15100c" roughness={1} />
      </mesh>

      {/* ─ Chairs ─ */}
      {chairs.map((c, i) => (
        <FoldingChair
          key={i}
          position={c.position}
          rotation={c.rotation}
          color={c.color}
        />
      ))}

      {/* ─ Stage ─ */}
      <Stage z={-7.2} />

      {/* ─ Ambient dust in the window shaft ─ */}
      <DustMotes count={mobile ? 40 : 80} enabled={motesEnabled} />

      {/* ─ Distance fog — deepens the back of the room and saves us from
            having to fully build out the front wall in detail ─ */}
      <fog attach="fog" args={['#1a1410', 6, 18]} />
    </>
  );
}
