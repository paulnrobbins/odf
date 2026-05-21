'use client';

/**
 * ServiceInfo — Scene 5 (The Stage Approaches)
 * ────────────────────────────────────────────
 * When + where + what to expect, with a hero photo (Justin preaching) as the
 * visual anchor for "this is what a Sunday actually looks like." The photo
 * lands at the top of the section as a Pattern A billboard.
 */

import Image from 'next/image';
import { serviceInfo, contact, photos } from '@/lib/content';
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
        <h2 className="font-display text-display-lg text-balance text-[var(--color-walnut)] reveal">
          {serviceInfo.headline}
        </h2>

        {/* Hero shot — Justin preaching, the actual Sunday morning view */}
        <div className="mt-14 reveal">
          <div
            className="relative w-full aspect-[16/9] overflow-hidden rounded-[3px]"
            style={{
              transform: 'perspective(1800px) rotateX(1.5deg)',
              boxShadow:
                '0 50px 100px -40px rgba(0,0,0,0.75), 0 0 0 1px rgba(217,163,104,0.12)',
            }}
          >
            <Image
              src={photos.hero}
              alt="Sunday morning at Open Door Fellowship — Pastor Justin preaching to the congregation"
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover object-center"
              style={{ filter: 'brightness(1.02) saturate(0.94) contrast(1.02)' }}
            />
            {/* Warm tint to unify with the palette */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(180deg, rgba(217,163,104,0.10) 0%, rgba(217,163,104,0.04) 100%)',
              }}
            />
            {/* Bottom edge darken — anchors the floating plane visually */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(248,243,232,0.25) 100%)',
              }}
            />
          </div>
          <p className="mt-3 text-body-sm text-[var(--color-walnut-mid)]/65 text-center font-italic">
            A Sunday morning at Open Door Fellowship.
          </p>
        </div>

        {/* What to expect */}
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {serviceInfo.whatToExpect.map((item) => (
            <div key={item.title} className="reveal">
              <h3 className="font-display text-[1.375rem] text-[var(--color-lamplight-deep)]">
                {item.title}
              </h3>
              <p className="mt-3 text-body text-[var(--color-walnut-mid)] text-pretty">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Address + phones */}
        <div className="mt-20 grid gap-12 md:grid-cols-2 border-t border-[var(--color-walnut)]/15 pt-12">
          <div className="reveal">
            <p className="eyebrow mb-3">Where to find us</p>
            <address className="not-italic font-display text-[1.375rem] text-[var(--color-walnut)] leading-tight">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.region} {contact.address.postal}
            </address>
            <p className="mt-4 text-body-sm text-[var(--color-walnut-mid)]/85">
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
                      font-display text-[1.375rem] text-[var(--color-walnut)]
                      transition-colors duration-[var(--dur-base)]
                      hover:text-[var(--color-lamplight-deep)]
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
