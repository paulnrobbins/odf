import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — merge Tailwind classes with conflict resolution.
 * Used everywhere components combine variant + custom classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * clamp — math helper used by scroll-progress hooks
 */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

/**
 * lerp — linear interpolation, used in GSAP custom easings + camera path math
 */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * mapRange — remap a value from one range to another, clamped at the boundaries.
 * Used to map scroll progress (0..1) to scene-specific sub-progress (e.g. 0.42..0.60 of the page).
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const t = clamp((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}
