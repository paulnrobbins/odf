'use client';

/**
 * UpperRoomCanvas
 * ───────────────
 * The R3F Canvas wrapper. Fixed full-viewport, behind all content (negative
 * z-index, pointer-events: none so the page above stays scrollable).
 *
 * Configured for cinematic output:
 *   • ACESFilmic tone mapping — film-like color response, no clipping
 *   • Soft shadows on desktop (PCF)
 *   • DPR capped: [1, 2] desktop, [1, 1.5] mobile (perf budget)
 *   • alpha: false — fully opaque canvas, no transparency cost
 *   • high-performance GPU hint
 *
 * Mounts <UpperRoomScene /> inside <Suspense> so any future assets (textures,
 * GLTFs) load progressively without crashing the page.
 */

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense } from 'react';

import { UpperRoomScene } from './UpperRoomScene';
import { useResponsive } from '@/hooks/useResponsive';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function UpperRoomCanvas() {
  const isDesktop = useResponsive('md');
  const reducedMotion = useReducedMotion();

  // Adaptive DPR — sharper on desktop, restrained on mobile
  const dpr: [number, number] = isDesktop ? [1, 2] : [1, 1.5];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden
    >
      <Canvas
        shadows={isDesktop ? 'soft' : false}
        dpr={dpr}
        camera={{
          fov: 42,
          near: 0.1,
          far: 50,
          position: [0.55, 1.32, 3.35],
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.LinearToneMapping,
          toneMappingExposure: 1.4,
        }}
        onCreated={({ gl }) => {
          // Opt back into legacy light units — Three.js r155+ defaults to
          // physical units (candela), which makes intuitive intensities like
          // 1.0 absurdly dim. Legacy units give the bright daylight we want
          // without needing intensities of 30+ everywhere.
          // @ts-expect-error — useLegacyLights still exists in r169 for back-compat
          gl.useLegacyLights = true;
        }}
        style={{ background: '#f5eedd' }}
      >
        <Suspense fallback={null}>
          <UpperRoomScene
            mobile={!isDesktop}
            motesEnabled={!reducedMotion && isDesktop}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Default export so dynamic() can pick it up cleanly
export default UpperRoomCanvas;
