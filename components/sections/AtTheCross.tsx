'use client';

/**
 * AtTheCross — Scene 6 (At the Cross)
 * ───────────────────────────────────
 * The conversion peak. Camera in the 3D scene is at the front of the room
 * looking up at the cross; the cross uplight scrubs from 1.4 → 3.8 intensity
 * across this scroll range, visibly glowing brighter as the user arrives.
 *
 * One large italic pull-quote in Fraunces — "We saved you a seat." — followed
 * by a short paragraph and two CTAs (Plan a Visit → #service anchor; Call Us
 * → tel: link).
 *
 * Uses section-veil-strong (deeper backing) because this is the emotional
 * peak and the type needs maximum readability.
 */

import { atTheCross } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function AtTheCross() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.12, duration: 1.1 });

  return (
    <section
      ref={ref}
      id="at-the-cross"
      className="section section-veil-strong relative overflow-hidden"
      aria-label="We saved you a seat"
    >
      <div className="container-editorial text-center">
        <p className="font-italic text-display-md text-[var(--color-lamplight-warm)] text-balance reveal">
          &ldquo;{atTheCross.pullQuote}&rdquo;
        </p>
        <p className="mt-10 text-body-lg text-[var(--color-bone-soft)] max-w-readable mx-auto text-pretty reveal">
          {atTheCross.body}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 reveal">
          {atTheCross.ctas.map((cta) => (
            <Button
              key={cta.label}
              href={cta.href}
              external={cta.href.startsWith('http')}
              variant={cta.primary ? 'primary' : 'secondary'}
              size="lg"
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
