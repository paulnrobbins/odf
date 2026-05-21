'use client';

/**
 * Connection — Scene 7 (The Connection)
 * ─────────────────────────────────────
 * Footer scene. Camera in the 3D scene is angled from the stage looking back
 * at the empty seats waiting (quiet reversal — the visitor was approaching;
 * now they're seated). Every off-ramp present: phones, address, ministry
 * cross-links, Facebook group.
 *
 * Uses section-veil-strong because this is the final beat and the type needs
 * to be unambiguous (legal, contact details).
 */

import { footer, contact, service } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Connection() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.07 });

  return (
    <section
      ref={ref}
      id="connection"
      className="section section-veil-strong pb-16 sm:pb-20"
      aria-label="Stay in touch"
    >
      <div className="container-wide">
        {/* Greeting + primary CTAs */}
        <div className="border-t border-[var(--color-walnut)]/15 pt-16">
          <p className="font-display text-display-sm text-balance max-w-3xl text-[var(--color-walnut)] reveal">
            {footer.greeting}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 reveal">
            {footer.ctas.map((cta) => (
              <Button
                key={cta.label}
                href={cta.href}
                external={cta.href.startsWith('http')}
                variant={cta.primary ? 'primary' : 'secondary'}
                size="md"
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Link columns + contact */}
        <div className="mt-20 grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="reveal">
            <p className="eyebrow mb-3">Open Door Fellowship</p>
            <address className="not-italic font-display text-[1.125rem] text-[var(--color-walnut)] leading-snug">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.postal}
            </address>
            <p className="mt-4 text-body-sm text-[var(--color-walnut-mid)]/85">
              {service.dayTime}
            </p>
            <ul className="mt-4 space-y-1">
              {contact.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="text-body-sm text-[var(--color-walnut-mid)]/85 hover:text-[var(--color-lamplight-deep)] transition-colors"
                  >
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.links.columns.map((col) => (
            <div key={col.heading} className="reveal">
              <p className="eyebrow mb-3">{col.heading}</p>
              <ul className="space-y-2">
                {col.items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="
                        text-body-sm text-[var(--color-walnut-mid)]/85
                        hover:text-[var(--color-lamplight-deep)]
                        transition-colors duration-[var(--dur-base)]
                      "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-20 pt-8 border-t border-[var(--color-walnut)]/10">
          <p className="text-micro text-[var(--color-walnut-mid)]/50">
            {footer.legal}
          </p>
        </div>
      </div>
    </section>
  );
}
