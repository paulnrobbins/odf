import Link from 'next/link';
import type { Metadata } from 'next';
import { UpperRoomFallback } from '@/components/three/UpperRoomFallback';
import { Button } from '@/components/ui/Button';
import { service, routes, contact } from '@/lib/content';

export const metadata: Metadata = {
  title: 'We saved you a seat | Open Door Fellowship',
  description: 'This page isn’t here, but a seat at Open Door Fellowship still is.',
  robots: { index: false, follow: true },
};

/**
 * 404 — Not Found
 * ───────────────
 * Stays in-brand. The same photo backdrop renders behind, so the page never
 * feels broken. Voice picks up the "saved you a seat" thread from the home
 * page: the page may be missing, but the invitation isn’t.
 */
export default function NotFound() {
  return (
    <>
      {/* Same SSR backdrop as the home page — keeps the visual continuity */}
      <UpperRoomFallback />

      <main className="relative min-h-[100svh] flex items-center justify-center px-gutter" style={{ zIndex: 10 }}>
        <div className="container-editorial text-center">
          <p className="eyebrow mb-6">404 · Page not found</p>

          <h1 className="font-display text-display-lg text-balance text-[var(--color-bone)]">
            We saved you a seat.
          </h1>

          <p className="mt-8 text-body-lg text-[var(--color-bone-soft)] max-w-readable mx-auto text-pretty">
            This page isn’t here right now — either we moved it or it hasn’t been built yet. Either
            way, the invitation still stands. {service.dayTime}, {contact.address.city}, Tennessee.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button href={routes.callPrimary} variant="secondary" size="lg">
              Call Us
            </Button>
          </div>

          <p className="mt-12 text-body-sm text-[var(--color-bone-soft)]/55">
            If you got here from a link on our site, would you let us know?{' '}
            <a
              href={routes.callPrimary}
              className="underline underline-offset-4 hover:text-[var(--color-lamplight)] transition-colors"
            >
              {contact.phones[0].display}
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
