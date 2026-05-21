'use client';

/**
 * ServiceInfo — Scene 5 (The Stage Approaches)
 * ────────────────────────────────────────────
 * When + where + what to expect. Camera in the 3D scene reaches the front
 * of the room here; the stage detail (guitar, stool with mug, music stand
 * with Bible) resolves behind the content.
 *
 * Click-to-call phone numbers, Google Maps directions button, three short
 * "what to expect" cards (no dress code / recovery-friendly / come early or
 * late).
 */

import { serviceInfo, contact } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ServiceInfo() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.07 });

  return (
    <section
      ref={ref}
      id="service"
      className="section section-veil"
      aria-label="Service info"
    >
      <div className="container-editorial">
        <p className="eyebrow mb-6 reveal">{serviceInfo.eyebrow}</p>
        <h2 className="font-display text-display-lg text-balance text-[var(--color-bone)] reveal">
          {serviceInfo.headline}
        </h2>

        {/* What to expect */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {serviceInfo.whatToExpect.map((item) => (
            <div key={item.title} className="reveal">
              <h3 className="font-display text-[1.375rem] text-[var(--color-lamplight)]">
                {item.title}
              </h3>
              <p className="mt-3 text-body text-[var(--color-bone-soft)] text-pretty">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Address + phones */}
        <div className="mt-20 grid gap-12 md:grid-cols-2 border-t border-[var(--color-bone-soft)]/15 pt-12">
          <div className="reveal">
            <p className="eyebrow mb-3">Where to find us</p>
            <address className="not-italic font-display text-[1.375rem] text-[var(--color-bone)] leading-tight">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.postal}
            </address>
            <p className="mt-4 text-body-sm text-[var(--color-bone-soft)]/80">
              {serviceInfo.parking}
            </p>
            <div className="mt-6">
              <Button
                href={contact.address.mapUrl}
                external
                variant="secondary"
                size="sm"
              >
                Get Directions
              </Button>
            </div>
          </div>

          <div className="reveal">
            <p className="eyebrow mb-3">Reach out</p>
            <ul className="space-y-2">
              {contact.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="
                      font-display text-[1.375rem] text-[var(--color-bone)]
                      transition-colors duration-[var(--dur-base)]
                      hover:text-[var(--color-lamplight)]
                    "
                  >
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
