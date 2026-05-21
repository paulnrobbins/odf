'use client';

/**
 * Ministries — Scene 4 (The Family)
 * ─────────────────────────────────
 * Three ministry cards using Pattern B (the Frame): sharp typography frames
 * the card; type carries the weight, not imagery. Each card links out to
 * that ministry's own website (kealohaministries.org for Aloha House and
 * Songs for Recovery; cupofjoeministries.org for Cup of Joe).
 *
 * Magnetic hover: cards subtly pull toward the cursor when nearby. Effect is
 * restrained (max ~6px translate) so it reads as intentional craft rather
 * than gimmickry. Disabled on touch devices and reduced-motion.
 */

import { useEffect, useRef } from 'react';
import { ministries } from '@/lib/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';

const MAGNET_STRENGTH_PX = 6;
const MAGNET_RADIUS_PX = 220;

export function Ministries() {
  const sectionRef = useScrollReveal<HTMLElement>({ stagger: 0.08 });
  const cardsRef = useRef<HTMLLIElement[]>([]);
  const reducedMotion = useReducedMotion();

  // Magnetic hover effect
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined') return;
    // Skip on touch-primary devices — magnetic hover only works with a pointer
    if (window.matchMedia('(hover: none)').matches) return;

    let rafId = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNET_RADIUS_PX) {
          const strength = 1 - dist / MAGNET_RADIUS_PX;
          const offsetX = (dx / MAGNET_RADIUS_PX) * MAGNET_STRENGTH_PX * strength;
          const offsetY = (dy / MAGNET_RADIUS_PX) * MAGNET_STRENGTH_PX * strength;
          card.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        } else if (card.style.transform) {
          card.style.transform = '';
        }
      });
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      // Reset transforms so revert is clean
      cardsRef.current.forEach((card) => {
        if (card) card.style.transform = '';
      });
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="ministries"
      className="section section-veil"
      aria-label="Ministries"
    >
      <div className="container-wide">
        <p className="eyebrow mb-6 reveal">{ministries.eyebrow}</p>
        <h2 className="font-display text-display-lg text-balance text-[var(--color-walnut)] reveal">
          {ministries.headline}
        </h2>
        <p className="mt-6 text-body-lg text-[var(--color-walnut-mid)] max-w-readable text-pretty reveal">
          {ministries.intro}
        </p>

        <ul className="mt-20 grid gap-6 md:grid-cols-3">
          {ministries.items.map((m, i) => (
            <li
              key={m.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="
                group reveal
                border border-[var(--color-walnut)]/15
                rounded-[var(--radius-card)]
                p-8
                bg-[var(--color-bone-bright)]/75 backdrop-blur-sm
                transition-[border-color,background-color,box-shadow]
                duration-[var(--dur-base)]
                ease-[var(--ease-cinema)]
                hover:border-[var(--color-lamplight-deep)]/60
                hover:bg-[var(--color-bone-bright)]/85
                hover:shadow-[0_20px_40px_-20px_rgba(110,74,35,0.20)]
              "
              style={{ willChange: 'transform' }}
            >
              <p className="eyebrow mb-3">{m.tag}</p>
              <h3 className="font-display text-[1.65rem] leading-tight text-[var(--color-walnut)]">
                {m.name}
              </h3>
              <p className="text-body-sm text-[var(--color-walnut-mid)]/75 mt-1">
                {m.location}
              </p>
              <p className="mt-6 text-body text-[var(--color-walnut-mid)] text-pretty">
                {m.body}
              </p>
              <div className="mt-8">
                <Button
                  href={m.href}
                  external={m.href.startsWith('http')}
                  variant="ghost"
                  size="sm"
                >
                  Visit Site →
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
